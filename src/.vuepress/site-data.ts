// Site-wide data derived per scan by the framework's onScan hook: homepage
// taxonomy (article count + category/tag chips), the /timeline/ archive
// list, and the HomeProjects desc cells' inline-markdown HTML. The return
// value is JSON-serialized into `virtual:absolute-press/site-data`, which
// islands import. Content edits re-run the hook in dev without a server
// restart; projects.ts desc edits still need one (the data module hangs
// off the vite config graph).
import fs from 'node:fs';

import { createInlineMarkdownRenderer } from 'absolute-press';
import type { SiteScanContext, SiteScanPage } from 'absolute-press';

import { featuredProjects, projectGroups } from './data/projects';

/** A single category/tag name with its article count. */
export interface TaxonomyEntry {
  name: string;
  count: number;
}

/** Aggregated site taxonomy consumed by the HomeProfile island. */
export interface SiteTaxonomy {
  /** Article pages: every content page but the locale home and /hide/. */
  pages: number;
  categories: TaxonomyEntry[];
  tags: TaxonomyEntry[];
}

/** One row of the /timeline/ archive (islands/Timeline.tsx). */
export interface TimelineEntry {
  /** Display title: frontmatter title > first H1 > relPath without .md. */
  title: string;
  /** Canonical clean route (URL-encoded), verbatim SiteScanPage.route. */
  route: string;
  /** Frontmatter date as ISO; null when absent or unparsable. */
  createdAt: string | null;
}

/** Shape of `virtual:absolute-press/site-data` on this site. */
export interface SiteData {
  taxonomy: SiteTaxonomy;
  /** Site-wide article list for /timeline/, newest first, /hide/ excluded. */
  timeline: TimelineEntry[];
  /** Raw project desc -> framework-rendered inline HTML. */
  projectDescHtml: Record<string, string>;
}

// /hide/ stays published but unlisted everywhere (nav/seo excludes in
// vite.config.ts); the taxonomy count and the timeline share one article
// set so the rail number matches the archive rows.
const HIDE_PREFIX = '/hide/';

/** Locale home (bare index/README at the content root) is not an article. */
function isArticle(page: SiteScanPage): boolean {
  if (
    !page.relPath.includes('/') &&
    /^(index|readme)\.md$/i.test(page.relPath)
  ) {
    return false;
  }
  return !page.route.startsWith(HIDE_PREFIX);
}

/**
 * Display title for a page. The framework derives titles at render time
 * (frontmatter title > first H1 > relPath, see its buildArticles), but
 * onScan runs before rendering and its page inventory carries no titles —
 * the timeline mirrors that precedence with a targeted source read.
 */
function titleOf(page: SiteScanPage): string {
  const fmTitle = page.rawFrontmatter.title;
  if (typeof fmTitle === 'string' && fmTitle !== '') return fmTitle;
  return firstHeading(page.filePath) ?? page.relPath.replace(/\.md$/, '');
}

/**
 * First ATX H1 text of a page, skipping the frontmatter block (yaml
 * comments pose as headings) and fenced code blocks. null when the body
 * has no `# ` heading.
 */
function firstHeading(filePath: string): string | null {
  let source: string;
  try {
    source = fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
  const lines = source.split(/\r?\n/);
  let i = 0;
  if (lines[0] === '---') {
    while (++i < lines.length && lines[i] !== '---' && lines[i] !== '...') {
      // consume the frontmatter block
    }
    i++;
  }
  let fence = ''; // opening marker of the open code fence, '' when closed
  for (; i < lines.length; i++) {
    const line = lines[i]!;
    const marks = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (fence !== '') {
      // Close only on a bare fence line of the same marker, at least as
      // long as the opener (commonmark fence semantics, info strings off).
      if (
        marks &&
        marks[1]![0] === fence[0] &&
        marks[1]!.length >= fence.length &&
        line.trim() === marks[1]
      ) {
        fence = '';
      }
    } else if (marks) {
      fence = marks[1]!;
    } else {
      const heading = /^ {0,3}#\s+(.+?)\s*#*\s*$/.exec(line);
      if (heading) return headingText(heading[1]!);
    }
  }
  return null;
}

/**
 * H1 raw text as displayed: markdown links keep only their text, backslash
 * escapes resolve (`\_` -> `_`). Covers the shapes this site's headings
 * actually use (one link heading in coding/solidjs.md, escaped underscores
 * in the home title).
 */
function headingText(raw: string): string {
  return raw
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\\([\\`*_{}[\]()#+.!-])/g, '$1');
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

/** Newest first, undated last, route as tiebreak — the framework's buildArticles order. */
function byDateDesc(a: TimelineEntry, b: TimelineEntry): number {
  if (a.createdAt && b.createdAt) {
    return b.createdAt.localeCompare(a.createdAt);
  }
  if (a.createdAt) return -1;
  if (b.createdAt) return 1;
  return a.route.localeCompare(b.route);
}

/**
 * onScan hook: runs once per scan (startup, build, dev resyncs and content
 * edits) over the framework-normalized page list — no site-side content
 * walking beyond the timeline title reads above.
 */
export function siteScan(ctx: SiteScanContext): SiteData {
  // Locale home = a bare index/README at the locale content root; every
  // other page (directory indexes included) counts as an article.
  const articles = ctx.pages.filter(isArticle);
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
    timeline: articles
      .map(page => ({
        title: titleOf(page),
        route: page.route,
        createdAt: page.createdAt,
      }))
      .toSorted(byDateDesc),
    projectDescHtml: Object.fromEntries(
      [
        ...featuredProjects,
        ...projectGroups.flatMap(group => group.projects),
      ].map(project => [project.desc, renderInline.render(project.desc)]),
    ),
  };
}
