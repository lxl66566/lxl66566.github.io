// Frontmatter icon registry for the site config: every Font Awesome free
// glyph under its full `<pack>/<name>` key (site convention: content
// frontmatter uses full keys exclusively), backed by the packages' inline
// svg data. The registry is static — no content scan — and the framework's
// build-time validation rejects any frontmatter key that is not a real
// FA free glyph.
import * as faBrands from '@fortawesome/free-brands-svg-icons';
import * as faRegular from '@fortawesome/free-regular-svg-icons';
import * as faSolid from '@fortawesome/free-solid-svg-icons';

export type IconPack = 'brands' | 'regular' | 'solid';

/** Structural subset of an FA icon export we consume. */
interface FaIconData {
  icon: readonly [number, number, readonly string[], string, string];
}

/** Package export key -> complete svg markup (FaIcon keeps the author's
 * viewBox when given a full `<svg>` string, so FA's non-square canvases
 * render correctly). */
function svgOf(mod: object): Record<string, string> {
  const svgs: Record<string, string> = {};
  for (const [key, value] of Object.entries(mod)) {
    // The packs also export themselves whole (`fas`/`far`/`fab`); only the
    // per-icon entries carry an `icon` array.
    const data = value as FaIconData | null;
    if (!key.startsWith('fa') || !data?.icon) continue;
    const [width, height, , , pathD] = data.icon;
    svgs[key] =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"` +
      ` fill="currentColor"><path d="${pathD}"/></svg>`;
  }
  return svgs;
}

/** Export key -> registered icon name (`faCircleInfo` -> `circle-info`). */
function iconName(key: string): string {
  return key
    .replace(/^fa/, '')
    // Two-step camel-to-kebab: acronym-led names (`faICursor` -> `i-cursor`)
    // split at the caps-run boundary first.
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/** Site-config `icons` map: `<pack>/<name>` -> svg markup for every FA free
 * glyph; the framework validates content keys against it and subsets the
 * per-page payload. */
export function allIcons(): Record<string, string> {
  const packs: Record<IconPack, object> = {
    solid: faSolid,
    regular: faRegular,
    brands: faBrands,
  };
  const icons: Record<string, string> = {};
  for (const [pack, mod] of Object.entries(packs)) {
    for (const [key, svg] of Object.entries(svgOf(mod))) {
      icons[`${pack}/${iconName(key)}`] = svg;
    }
  }
  return icons;
}
