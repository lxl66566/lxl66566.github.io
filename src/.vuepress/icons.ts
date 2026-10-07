// Frontmatter icon registry for the site config.
// Scans content markdown for `icon:` frontmatter values (the three legacy
// vuepress-theme-hope spellings: bare name, `brands fa-x`, `regular fa-x`)
// and resolves each to a `<pack>/<name>` key backed by the Font Awesome free
// packages' inline svg data. The framework validates frontmatter icons
// against this map at build time, so scanning keeps the map in sync with
// content without a hand-maintained table.
import fs from 'node:fs';
import path from 'node:path';

import * as faBrands from '@fortawesome/free-brands-svg-icons';
import * as faRegular from '@fortawesome/free-regular-svg-icons';
import * as faSolid from '@fortawesome/free-solid-svg-icons';

export type IconPack = 'brands' | 'regular' | 'solid';

/** Structural subset of an FA icon export we consume. */
interface FaIconData {
  icon: readonly [number, number, readonly string[], string, string];
}

type IconRegistry = Record<string, FaIconData | undefined>;

function buildRegistry(mod: object): IconRegistry {
  const registry: IconRegistry = {};
  for (const [key, value] of Object.entries(mod)) {
    if (key.startsWith('fa')) registry[key] = value as FaIconData;
  }
  return registry;
}

const REGISTRIES: Record<IconPack, IconRegistry> = {
  brands: buildRegistry(faBrands),
  regular: buildRegistry(faRegular),
  solid: buildRegistry(faSolid),
};

/** Kebab FA name -> package export key (`circle-info` -> `faCircleInfo`). */
function exportKey(name: string): string {
  const pascal = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  return `fa${pascal}`;
}

function lookup(pack: IconPack, name: string): FaIconData | undefined {
  return REGISTRIES[pack][exportKey(name)];
}

/** Complete svg markup (FaIcon keeps the author's viewBox when given a full
 * `<svg>` string, so FA's non-square canvases render correctly). */
function toSvg(data: FaIconData): string {
  const [width, height, , , pathD] = data.icon;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"` +
    ` fill="currentColor"><path d="${pathD}"/></svg>`
  );
}

/**
 * Legacy icon value -> (pack, name). Old values: bare `code` (theme prefix
 * was `fas fa-`), `brands fa-telegram`, `regular fa-snowflake`.
 */
function parseLegacyValue(value: string): { pack?: IconPack; name: string } {
  const match = /^(brands|regular|solid)?\s*(?:fa-)?(.+)$/.exec(value);
  if (!match) return { name: value };
  return { pack: match[1] as IconPack | undefined, name: match[2] ?? value };
}

export interface IconResolution {
  /** Registered key (`solid/code`, `brands/telegram`, ...). */
  key: string;
  pack: IconPack;
  name: string;
  /** Legacy frontmatter value it came from. */
  legacy: string;
  /** Set when the bare-name default pack (solid) lacked the glyph. */
  fallbackFrom?: IconPack;
}

export interface IconScan {
  resolutions: IconResolution[];
  /** Legacy values whose glyph does not exist in any FA free package. */
  missing: IconResolution[];
  /** Legacy value -> file list (relative posix paths). */
  usage: Map<string, string[]>;
}

const FRONTMATTER_ICON_RE = /^icon:\s*["']?([^\n"']*)["']?\s*$/m;

/** Read just the frontmatter block (icon lives at the top of every file). */
function frontmatterOf(file: string): string {
  const head = fs.readFileSync(file, 'utf8').slice(0, 4096);
  if (!head.startsWith('---')) return '';
  const end = head.indexOf('\n---', 3);
  return end === -1 ? '' : head.slice(0, end);
}

function walkMd(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMd(full, out);
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

/**
 * Scan `contentDir` for frontmatter icons and resolve them against the FA
 * free packages. Bare names prefer `solid` (the old theme prefix), falling
 * back to `regular` then `brands` for names FA only ships there (recorded
 * as `fallbackFrom`).
 */
export function scanIcons(contentDir: string): IconScan {
  const byKey = new Map<string, IconResolution>();
  const missing = new Map<string, IconResolution>();
  const usage = new Map<string, string[]>();

  for (const file of walkMd(contentDir)) {
    const match = FRONTMATTER_ICON_RE.exec(frontmatterOf(file));
    const legacy = match?.[1]?.trim();
    if (!legacy) continue;

    const rel = path.relative(contentDir, file).split(path.sep).join('/');
    usage.set(legacy, [...(usage.get(legacy) ?? []), rel]);

    const resolved = byKey.get(legacy) ?? missing.get(legacy);
    if (resolved) continue;

    const { pack, name } = parseLegacyValue(legacy);
    // Already-migrated full keys (`solid/code`) register 1:1.
    const newFormat = /^(solid|regular|brands)\/(.+)$/.exec(legacy);
    if (newFormat) {
      const newPack = newFormat[1] as IconPack;
      const newName = newFormat[2] ?? '';
      const data = lookup(newPack, newName);
      const resolution: IconResolution = {
        key: legacy,
        pack: newPack,
        name: newName,
        legacy,
      };
      (data ? byKey : missing).set(legacy, resolution);
      continue;
    }
    if (pack) {
      const data = lookup(pack, name);
      const resolution: IconResolution = {
        key: `${pack}/${name}`,
        pack,
        name,
        legacy,
      };
      (data ? byKey : missing).set(legacy, resolution);
      continue;
    }
    // Bare name: solid first (old theme prefix was `fas fa-`), then the
    // alternate free packs.
    const fallbackOrder: IconPack[] = ['solid', 'regular', 'brands'];
    const hit = fallbackOrder.find(p => lookup(p, name) !== undefined);
    if (!hit) {
      missing.set(legacy, {
        key: `solid/${name}`,
        pack: 'solid',
        name,
        legacy,
      });
      continue;
    }
    byKey.set(legacy, {
      key: `${hit}/${name}`,
      pack: hit,
      name,
      legacy,
      fallbackFrom: hit === 'solid' ? undefined : 'solid',
    });
  }

  return {
    resolutions: [...byKey.values()],
    missing: [...missing.values()],
    usage,
  };
}

/** Site-config `icons` map; throws listing unresolvable names so a broken
 * build points at the exact legacy values instead of failing validation
 * deep inside the framework. */
export function collectIcons(contentDir: string): Record<string, string> {
  const { resolutions, missing } = scanIcons(contentDir);
  if (missing.length > 0) {
    const list = missing.map(m => `${m.legacy} (no FA free glyph)`).join(', ');
    throw new Error(`[icons] unresolvable frontmatter icons: ${list}`);
  }
  const icons: Record<string, string> = {};
  for (const resolution of resolutions) {
    icons[resolution.key] = toSvg(lookup(resolution.pack, resolution.name)!);
  }
  return icons;
}
