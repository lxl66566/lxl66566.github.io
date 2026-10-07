// Ambient declarations for the site's config-time virtual modules, provided
// by the site-taxonomy / project-desc-html plugins in vite.config.ts. The
// file stays a script (no top-level import/export) so `declare module` is an
// ambient declaration.
type SiteTaxonomy = import('./taxonomy').SiteTaxonomy;

declare module 'virtual:site-taxonomy' {
  const taxonomy: SiteTaxonomy;
  export default taxonomy;
}

declare module 'virtual:project-desc-html' {
  /** Project desc (raw markdown) -> framework-rendered inline HTML. */
  const descHtml: Record<string, string>;
  export default descHtml;
}
