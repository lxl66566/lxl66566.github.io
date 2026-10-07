// Build-time taxonomy aggregation for the homepage profile rail: counts
// article pages and frontmatter `category` / `tag` values across the content
// tree, mirroring the framework's archive pages (locale home excluded, bare
// string or array frontmatter both accepted). Runs once at vite-config time;
// content edits show up on the next dev-server restart / build.
import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

/** A single category/tag name with its article count. */
export interface TaxonomyEntry {
  name: string;
  count: number;
}

/** Aggregated site taxonomy consumed by the HomeProfile island. */
export interface SiteTaxonomy {
  /** Article pages: every content markdown file but the locale home. */
  pages: number;
  categories: TaxonomyEntry[];
  tags: TaxonomyEntry[];
}

/** Frontmatter list fields accept a bare string or an array (framework parity). */
function toList(value: unknown): string[] {
  if (typeof value === 'string') return value.trim() === '' ? [] : [value];
  if (Array.isArray(value))
    return value.filter(
      (item): item is string => typeof item === 'string' && item.trim() !== '',
    );
  return [];
}

function walkMarkdown(dir: string, out: string[]): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdown(full, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full);
  }
}

function countBy(files: string[], field: 'category' | 'tag'): TaxonomyEntry[] {
  const counts = new Map<string, number>();
  for (const file of files) {
    for (const name of toList(matter.read(file).data[field])) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }
  return counts
    .entries()
    .map(([name, count]) => ({ name, count }))
    .toArray()
    .toSorted(
      (a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-Hans-CN'),
    );
}

/** Scan the content tree; exported for the vite config's virtual module. */
export function scanTaxonomy(contentDir: string): SiteTaxonomy {
  const files: string[] = [];
  walkMarkdown(contentDir, files);
  const localeHome = path.resolve(contentDir, 'index.md');
  const pages = files.filter(file => path.resolve(file) !== localeHome);
  return {
    pages: pages.length,
    categories: countBy(pages, 'category'),
    tags: countBy(pages, 'tag'),
  };
}
