// Site-wide data derived per scan by the framework's onScan hook: homepage
// taxonomy (article count + category/tag chips) and the HomeProjects desc
// cells' inline-markdown HTML. The return value is JSON-serialized into
// `virtual:absolute-press/site-data`, which islands import. Content edits
// re-run the hook in dev without a server restart; projects.ts desc edits
// still need one (the data module hangs off the vite config graph).
import { createInlineMarkdownRenderer } from 'absolute-press';
import type { SiteScanContext } from 'absolute-press';

import { featuredProjects, projectGroups } from './data/projects';

/** A single category/tag name with its article count. */
export interface TaxonomyEntry {
  name: string;
  count: number;
}

/** Aggregated site taxonomy consumed by the HomeProfile island. */
export interface SiteTaxonomy {
  /** Article pages: every content page but the locale home. */
  pages: number;
  categories: TaxonomyEntry[];
  tags: TaxonomyEntry[];
}

/** Shape of `virtual:absolute-press/site-data` on this site. */
export interface SiteData {
  taxonomy: SiteTaxonomy;
  /** Raw project desc -> framework-rendered inline HTML. */
  projectDescHtml: Record<string, string>;
}

function countBy(
  pages: SiteScanContext['pages'],
  field: 'category' | 'tag',
): TaxonomyEntry[] {
  const counts = new Map<string, number>();
  for (const page of pages) {
    for (const name of page.frontmatter[field] ?? []) {
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

/**
 * onScan hook: runs once per scan (startup, build, dev resyncs and content
 * edits) over the framework-normalized page list — no site-side content
 * walking or frontmatter parsing.
 */
export function siteScan(ctx: SiteScanContext): SiteData {
  // Locale home = a bare index/README at the locale content root; every
  // other page (directory indexes included) counts as an article.
  const articles = ctx.pages.filter(
    page =>
      page.relPath.includes('/') ||
      !/^(index|readme)\.md$/i.test(page.relPath),
  );
  const renderInline = createInlineMarkdownRenderer({
    // ResolvedConfig keeps no top-level lang; the default locale comes first.
    lang: ctx.config.locales[0]!.lang,
  });
  return {
    taxonomy: {
      pages: articles.length,
      categories: countBy(articles, 'category'),
      tags: countBy(articles, 'tag'),
    },
    projectDescHtml: Object.fromEntries(
      [
        ...featuredProjects,
        ...projectGroups.flatMap(group => group.projects),
      ].map(project => [project.desc, renderInline.render(project.desc)]),
    ),
  };
}
