// Ambient declaration for the framework's site-data virtual module, fed by
// the onScan hook in src/.vuepress/site-data.ts. The file stays a script
// (no top-level import/export) so `declare module` is an ambient
// declaration.
type SiteData = import('./site-data').SiteData;

declare module 'virtual:absolute-press/site-data' {
  const siteData: SiteData;
  export default siteData;
}
