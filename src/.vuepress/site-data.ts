// Site-wide data derived per scan by the framework's onScan hook: the
// HomeProjects desc cells' inline-markdown HTML. The return value is
// JSON-serialized into `virtual:absolute-press/site-data`, which islands
// import. Content edits re-run the hook in dev without a server restart;
// projects.ts desc edits still need one (the data module hangs off the
// vite config graph).
import { createInlineMarkdownRenderer } from 'absolute-press';
import type { SiteScanContext } from 'absolute-press';

import { featuredProjects, projectGroups } from './data/projects';

/** Shape of `virtual:absolute-press/site-data` on this site. */
export interface SiteData {
  /** Raw project desc -> framework-rendered inline HTML. */
  projectDescHtml: Record<string, string>;
}

/**
 * onScan hook: runs once per scan (startup, build, dev resyncs and content
 * edits) over the framework-normalized page list.
 */
export function siteScan(ctx: SiteScanContext): SiteData {
  const renderInline = createInlineMarkdownRenderer({
    // ResolvedConfig keeps no top-level lang; the default locale comes first.
    lang: ctx.config.locales[0]!.lang,
  });
  return {
    projectDescHtml: Object.fromEntries(
      [
        ...featuredProjects,
        ...projectGroups.flatMap(group => group.projects),
      ].map(project => [project.desc, renderInline.render(project.desc)]),
    ),
  };
}
