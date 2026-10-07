#!/usr/bin/env node
/**
 * Ongoing sync check: the TS data modules (src/.vuepress/data/*_list.ts) are
 * the live source for the xlist islands' meta cells, while the markdown keeps
 * only `@@@ <slot-key>` bodies. This script verifies both sides still agree —
 * per block, the expected slot-key sequence (page order + assignSlotKeys, the
 * SAME dedup rule the component imports) must match the md slots one-for-one:
 *
 *   node utils/xlist-sync.mjs [page ...]     # diff report, exit 1 on drift
 *
 * A TS edit (add/remove/reorder/valid_name) without the matching md slot
 * edit — or a typo'd md key, which the component would silently drop — shows
 * up as drift here.
 */
import fs from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VUEPRESS = path.join(ROOT, 'src', '.vuepress');

/* -- legacy TS module loader (strip types, stage, dynamic import) ---------- */

const stagingDir = fs.mkdtempSync(path.join(os.tmpdir(), 'xlist-sync-'));
const staged = new Map();

function stageModule(resolved) {
  if (staged.has(resolved)) return;
  const source = fs.readFileSync(resolved, 'utf8');
  const js = stripTypeScriptTypes(source, { mode: 'transform' }).replaceAll(
    /(from\s+)(['"])(\.[^'"]+)\.js\2/g,
    "$1'$3.mjs'",
  );
  const rel = path.relative(VUEPRESS, resolved);
  const target = path.join(stagingDir, rel.replace(/\.ts$/, '.mjs'));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, js);
  staged.set(resolved, target);
}

function walkTs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkTs(full);
    else if (entry.name.endsWith('.ts')) stageModule(full);
  }
}
walkTs(VUEPRESS);
// The slot-key dedup rule must be the SAME module the component imports.
const slotKeyModule = path.join(ROOT, 'islands', 'xlist', 'slotKey.ts');
stageModule(slotKeyModule);
const { assignSlotKeys } = await import(
  pathToFileURL(staged.get(slotKeyModule)).href
);

async function loadLegacyModule(file) {
  const resolved = path.resolve(file);
  stageModule(resolved);
  return import(pathToFileURL(staged.get(resolved)).href);
}

/* -- ports of the legacy sort helpers (islands/xlist/order.ts) ------------- */

const dateDurationCompare = (a, b) => {
  if (a && b && a.end && b.end) return a.end.localeCompare(b.end);
  if (a && a.end) return -1;
  if (b && b.end) return 1;
  return 0;
};

function defaultGalOrder(list) {
  const grouped = new Map();
  for (const item of list) {
    const key = item.playing_status ?? 'null';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  }
  const order = ['游玩中', '中断', 'null', '已停止'];
  return order.flatMap(key =>
    (grouped.get(key) ?? []).toSorted((x, y) => {
      if (x.duration && y.duration)
        return -dateDurationCompare(x.duration, y.duration);
      if (y.duration) return 1;
      if (x.duration) return -1;
      return 0;
    }),
  );
}

const bookPattern = /^[<>=\\?]+|[<>=\\?]+$/g;
const bookDurationCompare = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.replace(bookPattern, '').localeCompare(b.replace(bookPattern, ''));
  }
  if (typeof a === 'string') return -1;
  if (typeof b === 'string') return 1;
  if (a.end && b.end) return a.end.localeCompare(b.end);
  if (a.end) return 1;
  if (b.end) return -1;
  if (a.start && b.start) return a.start.localeCompare(b.start);
  if (a.start) return 1;
  if (b.start) return -1;
  return 0;
};

function defaultBookOrder(list) {
  const grouped = new Map();
  for (const item of list) {
    const key = item.reading_status?.kind ?? 'null';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  }
  const order = ['在读', '等待连载', '中断', 'null', '已停更', '已放弃'];
  return order.flatMap(key =>
    (grouped.get(key) ?? []).toSorted((x, y) => {
      if (x.duration && y.duration)
        return -bookDurationCompare(x.duration, y.duration);
      if (y.duration) return 1;
      if (x.duration) return -1;
      return 0;
    }),
  );
}

/* -- markdown parsing (framework splitEntries subset) ---------------------- */

const FENCE_RE = /^ {0,3}(`{3,}|~{3,})/;
const DELIMITER_RE = /^ {0,3}@@@(?!@)[ \t]*(.*)$/;
const TAG_RE =
  /^<(GalList|BookList|AnimeList|JobList|CryptoList|SpeedupList)((?:\s[^>]*)?)>$/;

/** The `list="..."` prop of a job island open tag, if any. */
const listProp = openTag => /list="([^"]*)"/.exec(openTag)?.[1] ?? null;

/**
 * Collect the `@@@` slot keys of one island block (lines[startLine-1] is the
 * open tag; scanning stops at its closing tag). Fence-aware; no meta lines
 * exist in the migrated format.
 */
function parseIslandBlock(lines, startLine, closer) {
  const entries = [];
  let fence = null;
  let index = startLine;
  for (; index < lines.length; index++) {
    const line = lines[index];
    const fenceRun = FENCE_RE.exec(line)?.[1];
    if (
      fence &&
      fenceRun &&
      fenceRun.charAt(0) === fence.ch &&
      fenceRun.length >= fence.len
    ) {
      fence = null;
      continue;
    }
    if (!fence && fenceRun) {
      fence = { ch: fenceRun.charAt(0), len: fenceRun.length };
      continue;
    }
    if (fence) continue;
    if (line.startsWith(`</${closer}>`)) break;
    const delimiter = DELIMITER_RE.exec(line);
    if (delimiter) {
      entries.push({ key: (delimiter[1] ?? '').trim(), line: index + 1 });
    }
  }
  return { entries, endLine: index };
}

/* -- page configs ---------------------------------------------------------- */

const PAGES = [
  {
    file: 'src/hobbies/galgame.md',
    name: 'galgame',
    islandName: 'GalList',
    load: async () =>
      (await loadLegacyModule(path.join(VUEPRESS, 'data', 'galgame_list.ts')))
        .default,
    order: defaultGalOrder,
    slotKey: item => item.valid_name ?? item.name,
  },
  {
    file: 'src/hobbies/books.md',
    name: 'books',
    islandName: 'BookList',
    load: async () =>
      (await loadLegacyModule(path.join(VUEPRESS, 'data', 'book_list.ts')))
        .default,
    order: defaultBookOrder,
    slotKey: item => item.valid_name ?? item.name,
  },
  {
    file: 'src/hobbies/anime.md',
    name: 'anime',
    islandName: 'AnimeList',
    load: async () =>
      (await loadLegacyModule(path.join(VUEPRESS, 'data', 'anime_list.ts')))
        .default,
    order: list => list,
    slotKey: item => item.valid_name ?? item.name,
  },
  {
    file: 'src/gossip/job.md',
    name: 'job',
    islandName: 'JobList',
    // Two islands on one page, selected by their `list="..."` prop.
    load: async () => {
      const mod = await loadLegacyModule(
        path.join(VUEPRESS, 'data', 'job_list.ts'),
      );
      return {
        job_list_2024_autumn: mod.job_list_2024_autumn,
        job_list_2024_spring: mod.job_list_2024_spring,
      };
    },
    blockList: (dataset, openTag) => dataset[listProp(openTag)],
    order: list => list,
    slotKey: item => item.name,
  },
  {
    file: 'src/articles/money.md',
    name: 'money',
    islandName: 'CryptoList',
    load: async () =>
      (await loadLegacyModule(path.join(VUEPRESS, 'data', 'crypto_list.ts')))
        .default,
    order: list => list,
    slotKey: item => item.valid_name ?? item.name,
  },
  {
    file: 'src/articles/speedup.md',
    name: 'speedup',
    islandName: 'SpeedupList',
    load: async () =>
      (await loadLegacyModule(path.join(VUEPRESS, 'data', 'speedup_list.ts')))
        .default,
    order: list => list,
    slotKey: item => item.valid_name,
  },
];

/* -- main ------------------------------------------------------------------ */

const onlyNames = process.argv.slice(2);
let drift = 0;

const targets = PAGES.filter(
  page => onlyNames.length === 0 || onlyNames.includes(page.name),
);
const loadedDatasets = await Promise.all(targets.map(page => page.load()));

for (const [pageIndex, page] of targets.entries()) {
  const mdPath = path.join(ROOT, page.file);
  const lines = fs
    .readFileSync(mdPath, 'utf8')
    .replace(/\r\n?/g, '\n')
    .split('\n');

  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const tag = TAG_RE.exec(lines[i]);
    if (tag) {
      const islandName = tag[1];
      if (islandName !== page.islandName) {
        console.log(
          `[sync] ${page.name}: unexpected island <${islandName}> at line ${i + 1}`,
        );
        drift += 1;
      }
      const { entries, endLine } = parseIslandBlock(lines, i + 1, islandName);
      blocks.push({
        entries,
        openTag: lines[i],
        start: i + 1,
        end: endLine + 1,
      });
      i = endLine;
    }
  }

  const dataset = loadedDatasets[pageIndex];
  const resolveList = page.blockList ?? (() => dataset);
  let pageEntries = 0;
  for (let b = 0; b < blocks.length; b++) {
    const { entries, openTag } = blocks[b];
    const list = resolveList(dataset, openTag);
    if (list === undefined) {
      console.log(
        `[sync] ${page.name} block#${b + 1}: no data list for "${listProp(openTag) ?? page.islandName}"`,
      );
      drift += 1;
      continue;
    }
    const ordered = page.order([...list]);
    if (ordered.length !== entries.length) {
      console.log(
        `[sync] ${page.name} block#${b + 1}: ${entries.length} md slot(s) vs ${ordered.length} data items — COUNT MISMATCH`,
      );
      drift += 1;
      continue;
    }
    const expectedKeys = assignSlotKeys(ordered, page.slotKey).map(
      entry => entry.key,
    );
    for (let e = 0; e < entries.length; e++) {
      pageEntries += 1;
      if (entries[e].key !== expectedKeys[e]) {
        console.log(
          `[sync] ${page.name} block#${b + 1} slot#${e + 1} (${entries[e].line}): md key "${entries[e].key}" != data "${expectedKeys[e]}"`,
        );
        drift += 1;
      }
    }
  }

  console.log(`[sync] ${page.name}: ${pageEntries} slot(s) checked`);
}

console.log(
  drift === 0
    ? '[sync] all pages in sync'
    : `[sync] ${drift} drift item(s) found`,
);
process.exit(drift === 0 ? 0 : 1);
