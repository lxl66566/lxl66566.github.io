#!/usr/bin/env node
/**
 * One-shot e2e check for the xlist migration (run against dist/): serves the
 * build, drives headless chromium through every migrated page (unlocking the
 * password gates), and asserts hydration + interactions. Screenshots land in
 * dist-shots/ for visual review; console errors/warnings fail the run.
 *
 *   node utils/xlist-e2e.mjs           # needs a prior pnpm build
 *
 * Playwright comes from the framework repo's node_modules (not a site dep).
 */
/* eslint-disable no-await-in-loop -- browser steps are inherently sequential */
import fs from 'node:fs';
import http from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SHOTS = path.join(ROOT, 'dist-shots');
const FRAMEWORK_PKG = 'C:/programs/typescript/absolute/package.json';

/* -- static server ---------------------------------------------------------- */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(DIST, pathname);
  if (pathname.endsWith('/')) file = path.join(file, 'index.html');
  else if (!path.extname(file)) file += '.html';
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, {
      'content-type':
        MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
    });
    res.end(data);
  });
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

/* -- browser ----------------------------------------------------------------- */

const { chromium } = createRequire(FRAMEWORK_PKG)('playwright');
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});

fs.mkdirSync(SHOTS, { recursive: true });

const issues = [];
let shotSeq = 0;

/**
 * One page drive. `expect` is an async callback receiving the page (after
 * gate unlock + island hydration) for page-specific assertions.
 */
const PAGES = [
  {
    name: 'galgame',
    url: '/hobbies/galgame.html',
    rows: 183,
    expect: async page => {
      await xlistChecks(page, 'galgame', 183);
      // Search narrows the table; count label follows.
      await page.fill('.ap-xlist__search', 'GINKA');
      await page.waitForTimeout(150);
      await rowsAre(page, 1, 'galgame search GINKA');
      const label = await page.textContent('.ap-xlist__count');
      if (label.trim() !== '1 / 183 条') {
        issues.push(`galgame: count label after search is "${label.trim()}"`);
      }
      await shot(page, 'galgame-search');
      await page.fill('.ap-xlist__search', '');
      await page.waitForTimeout(150);
      // Title header cycles asc -> desc -> default.
      await titleSortCycles(page, 'galgame', '游戏名');
      // 剧情 header sorts numerically: desc first, then asc, then default;
      // unscored rows sink in both directions.
      await scoreSortCycles(page, 'galgame', '剧情', 2);
      // Expand the first row: reveal row opens with body prose.
      await page.click('.ap-xlist__toggle');
      await page.waitForTimeout(450);
      const reveal = page.locator('.ap-xlist__reveal-row.is-open');
      if ((await reveal.count()) !== 1) {
        issues.push(
          `galgame: ${await reveal.count()} open reveal rows after click`,
        );
      } else {
        const body = (await reveal.textContent())?.trim() ?? '';
        if (body === '') issues.push('galgame: open reveal row has empty body');
      }
      await shot(page, 'galgame-expanded');
      await page.click('.ap-xlist__toggle');
      // Strict-only toggle hides 非严格-flagged rows; the count keeps the
      // full total (visible / total).
      const filters = await page.locator('.ap-xlist__filter').count();
      if (filters !== 1) {
        issues.push(`galgame: ${filters} toolbar filter(s) (expected 1)`);
      } else {
        await page.click('.ap-xlist__filter');
        await page.waitForTimeout(150);
        const strictRows = await page.locator('.ap-xlist__row').count();
        if (strictRows <= 0 || strictRows >= 183) {
          issues.push(`galgame: strict filter left ${strictRows} rows`);
        }
        const strictLabel = await page.textContent('.ap-xlist__count');
        if (strictLabel.trim() !== `${strictRows} / 183 条`) {
          issues.push(
            `galgame: count label under strict filter is "${strictLabel.trim()}"`,
          );
        }
        const flagged = await page
          .locator('.ap-xlist__row .ap-xlist__badge', {
            hasText: '非严格',
          })
          .count();
        if (flagged !== 0) {
          issues.push(
            `galgame: ${flagged} 非严格 badge(s) survive the strict filter`,
          );
        }
        await shot(page, 'galgame-strict');
        await page.click('.ap-xlist__filter');
        await page.waitForTimeout(150);
        await rowsAre(page, 183, 'galgame after unchecking strict filter');
      }
    },
  },
  {
    name: 'books',
    url: '/hobbies/books.html',
    rows: 105,
    expect: async page => {
      await xlistChecks(page, 'books', 105);
      await shot(page, 'books-top');
      // Rows toggle individually (the 全部展开/收起 buttons are gone).
      await page.click('.ap-xlist__toggle');
      await page.waitForTimeout(450);
      const openCount = await page
        .locator('.ap-xlist__reveal-row.is-open')
        .count();
      if (openCount !== 1) {
        issues.push(`books: ${openCount} open reveals after row click`);
      }
      await page.click('.ap-xlist__row.is-open .ap-xlist__toggle');
      await page.waitForTimeout(300);
      const closed = await page
        .locator('.ap-xlist__reveal-row.is-open')
        .count();
      if (closed !== 0) {
        issues.push(`books: ${closed} open reveals after second click`);
      }
    },
  },
  {
    name: 'anime',
    url: '/hobbies/anime.html',
    rows: 45,
    expect: async page => {
      await xlistChecks(page, 'anime', 45);
      await shot(page, 'anime-top');
    },
  },
  {
    name: 'job',
    url: '/gossip/job.html',
    password: '2003',
    // Two JobList islands on one page, 17 rows total.
    expect: async page => {
      const lists = page.locator('.ap-xlist');
      if ((await lists.count()) !== 2) {
        issues.push(`job: ${await lists.count()} xlist roots (expected 2)`);
        return;
      }
      const rows = await page.locator('.ap-xlist__row').count();
      if (rows !== 17) issues.push(`job: ${rows} rows (expected 17)`);
      // Offer rows keep their green highlight (5 in the current data).
      const offers = await page.locator('.ap-xlist__row.is-offer').count();
      if (offers !== 5) issues.push(`job: ${offers} offer rows (expected 5)`);
      await lists.nth(0).scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollBy(0, -70));
      await page.waitForTimeout(120);
      await shot(page, 'job-autumn');
      await lists.nth(1).scrollIntoViewIfNeeded();
      await shot(page, 'job-spring');
    },
  },
  {
    name: 'money',
    url: '/articles/money.html',
    rows: 8,
    expect: async page => {
      await xlistChecks(page, 'money', 8);
      await shot(page, 'money-top');
    },
  },
  {
    name: 'speedup',
    url: '/articles/speedup.html',
    rows: 25,
    expect: async page => {
      await xlistChecks(page, 'speedup', 25);
      await shot(page, 'speedup-top');
    },
  },
  {
    name: 'videos',
    url: '/hobbies/NSFW/videos.html',
    password: '0721',
    // AvTable is client-only: two plain tables (最高/普通) in .abs-avtable.
    expect: async page => {
      const tables = page.locator('.abs-avtable .ap-xlist__table');
      if ((await tables.count()) !== 2) {
        issues.push(
          `videos: ${await tables.count()} avtable tables (expected 2)`,
        );
        return;
      }
      const rows = await page.locator('.abs-avtable .ap-xlist__row').count();
      if (rows <= 0) issues.push('videos: no rows rendered');
      const total = await page
        .locator('.abs-avtable > div')
        .first()
        .textContent();
      console.log(`[e2e] videos: ${rows} rows, header "${total.trim()}"`);
      await shot(page, 'videos-top');
      await page.locator('h2:has-text("普通")').scrollIntoViewIfNeeded();
      await shot(page, 'videos-normal');
    },
  },
  {
    name: 'comic',
    url: '/hobbies/NSFW/comic.html',
    password: '0721',
    expect: async page => {
      const rows = await page.locator('.abs-comictable .ap-xlist__row').count();
      if (rows <= 0) issues.push('comic: no rows rendered');
      console.log(`[e2e] comic: ${rows} rows`);
      await shot(page, 'comic-top');
    },
  },
];

/* -- shared helpers ---------------------------------------------------------- */

/** Title text of the FIRST row (toggle or plain span — non-expandable rows
 * render no toggle, so `.ap-xlist__toggle` alone would skip them). */
async function firstRowTitle(page) {
  return (
    await page
      .locator(
        '.ap-xlist__row td.ap-xlist__title :is(.ap-xlist__toggle, .ap-xlist__title-text)',
      )
      .first()
      .textContent()
  )?.trim();
}

async function rowsAre(page, expected, what) {
  const rows = await page.locator('.ap-xlist__row').count();
  if (rows !== expected)
    issues.push(`${what}: ${rows} rows (expected ${expected})`);
}

function headerSorter(page, label) {
  return page
    .locator('.ap-xlist__th', { hasText: label })
    .locator('.ap-xlist__sorter');
}

/**
 * Title header cycles asc -> desc -> default. Titles come from the rendered
 * toggle/title-text spans (the exact sort keys), so the asc head must equal
 * the min and the desc head the max.
 */
async function titleSortCycles(page, name, label) {
  const firstDefault = await firstRowTitle(page);
  // Sort the extracted titles INSIDE the page: Node's ICU collates CJK
  // differently from the browser, and the expected order must match the
  // component's localeCompare exactly.
  const sorted = await page.$$eval(
    '.ap-xlist__row td.ap-xlist__title :is(.ap-xlist__toggle, .ap-xlist__title-text)',
    els =>
      els
        .map(e => e.textContent.trim())
        .toSorted((a, b) =>
          a.localeCompare(b, undefined, {
            numeric: true,
            sensitivity: 'base',
          }),
        ),
  );
  const sorter = headerSorter(page, label);
  await sorter.click();
  await page.waitForTimeout(150);
  const firstAsc = await firstRowTitle(page);
  if (firstAsc !== sorted[0]) {
    issues.push(
      `${name}: title asc first row "${firstAsc}" != min "${sorted[0]}"`,
    );
  }
  await sorter.click();
  await page.waitForTimeout(150);
  const firstDesc = await firstRowTitle(page);
  if (firstDesc !== sorted.at(-1)) {
    issues.push(
      `${name}: title desc first row "${firstDesc}" != max "${sorted.at(-1)}"`,
    );
  }
  await sorter.click();
  await page.waitForTimeout(150);
  if ((await firstRowTitle(page)) !== firstDefault) {
    issues.push(`${name}: third title click did not restore default order`);
  }
}

/**
 * Numeric header (visible meta column `colIndex`) cycles desc -> asc ->
 * default with the legacy rule: unscored (`-`) rows sink in both directions,
 * so the desc head carries the max score and the asc head the min.
 */
async function scoreSortCycles(page, name, label, colIndex) {
  const firstDefault = await firstRowTitle(page);
  const visibleScores = () =>
    page.$$eval(
      '.ap-xlist__row',
      (rows, index) =>
        rows.map(row => {
          const cell = row.querySelectorAll('td.ap-xlist__item-meta')[index];
          return cell?.textContent?.trim() ?? '';
        }),
      colIndex,
    );
  const ranked = (await visibleScores())
    .filter(text => text !== '-')
    .map(Number);
  const sorter = headerSorter(page, label);
  await sorter.click();
  await page.waitForTimeout(150);
  const aria = await page
    .locator('.ap-xlist__th', { hasText: label })
    .getAttribute('aria-sort');
  if (aria !== 'descending') {
    issues.push(`${name}: ${label} aria-sort after first click is "${aria}"`);
  }
  const descHead = (await visibleScores())[0];
  if (Number(descHead) !== Math.max(...ranked)) {
    issues.push(
      `${name}: ${label} desc first score ${descHead} != max ${Math.max(...ranked)}`,
    );
  }
  await sorter.click();
  await page.waitForTimeout(150);
  const ascHead = (await visibleScores())[0];
  if (Number(ascHead) !== Math.min(...ranked)) {
    issues.push(
      `${name}: ${label} asc first score ${ascHead} != min ${Math.min(...ranked)}`,
    );
  }
  await sorter.click();
  await page.waitForTimeout(150);
  if ((await firstRowTitle(page)) !== firstDefault) {
    issues.push(`${name}: third ${label} click did not restore default order`);
  }
}

async function shot(page, name) {
  await page.screenshot({ path: path.join(SHOTS, `${++shotSeq}-${name}.png`) });
}

async function xlistChecks(page, name, expectedRows) {
  await rowsAre(page, expectedRows, name);
  const search = await page.locator('.ap-xlist__search').count();
  if (search !== 1) issues.push(`${name}: ${search} search inputs`);
  const selects = await page.locator('.ap-xlist__sort').count();
  if (selects !== 0) issues.push(`${name}: ${selects} sort select(s) remain`);
  const buttons = await page.locator('.ap-xlist__btn').count();
  if (buttons !== 0) {
    issues.push(`${name}: ${buttons} expand-all button(s) remain`);
  }
  const sorters = await page.locator('.ap-xlist__sorter').count();
  if (sorters < 1) issues.push(`${name}: ${sorters} sortable header(s)`);
  const hint = await page.locator('.ap-xlist__hint').count();
  if (hint !== 1) issues.push(`${name}: ${hint} hint lines`);
  const expandable = await page.locator('.ap-xlist__row.is-expandable').count();
  if (expandable === 0) issues.push(`${name}: no expandable rows`);
  // Bring the table into the viewport (sticky navbar offset) so top shots
  // actually show it.
  await page.evaluate(() => {
    document.querySelector('.ap-xlist')?.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -70);
  });
  await page.waitForTimeout(120);
}

for (const spec of PAGES) {
  const page = await context.newPage();
  const consoleIssues = [];
  const envNoise = [];
  page.on('console', msg => {
    if (msg.type() !== 'error' && msg.type() !== 'warning') return;
    // Resource-load failures are judged by the response listener (with URL);
    // the bare console line adds nothing.
    if (msg.text().startsWith('Failed to load resource')) return;
    consoleIssues.push(`${msg.type()}: ${msg.text()}`);
  });
  page.on('pageerror', err => consoleIssues.push(`pageerror: ${err.message}`));
  // Non-2xx responses: 4xx/5xx on the local server is a broken asset and
  // counts; failures on external hosts (giscus/analytics/algolia — no network
  // or no discussion in this offline run) are environment noise.
  page.on('response', res => {
    if (res.status() >= 400) {
      const entry = `${res.status()} ${res.url()}`;
      if (res.url().startsWith(base)) consoleIssues.push(`asset ${entry}`);
      else envNoise.push(entry);
    }
  });
  try {
    await page.goto(`${base}${spec.url}`, { waitUntil: 'load' });
    if (spec.password) {
      await page.waitForSelector('.ap-gate__input', { timeout: 15000 });
      await page.fill('.ap-gate__input', spec.password);
      await page.click('.ap-gate__submit');
    }
    await page.waitForSelector('.ap-xlist', { timeout: 15000 });
    await page.waitForTimeout(250);
    await spec.expect(page);
    for (const line of consoleIssues) {
      issues.push(`${spec.name} console ${line}`);
    }
    console.log(`[e2e] ${spec.name}: ok`);
  } catch (err) {
    issues.push(`${spec.name}: FAILED — ${err.message.split('\n')[0]}`);
    console.log(`[e2e] ${spec.name}: FAILED`);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

console.log(
  issues.length === 0 ? '[e2e] ALL OK' : `[e2e] ${issues.length} issue(s):`,
);
for (const issue of issues) console.log(`  - ${issue}`);
process.exit(issues.length === 0 ? 0 : 1);
