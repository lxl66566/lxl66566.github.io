import { readFileSync } from 'node:fs';

import { presetWind4, type Theme } from '@unocss/preset-wind4';
import { defineConfig, type UserConfig } from 'unocss';

// Site-level compat styles (migrated from the old vuepress scss) ride the
// uno preflight, which lands in the entry's render-blocking css on every
// page in both dev and build. The framework ships its css in cascade layers
// (see .agents/skills/css-cascade/SKILL.md in the framework repo): uno must
// emit real layers too, or its reset (layer `base`) would stay unlayered and
// outrank the framework typography. cssLayerName returns null for
// `preflights` so the site css itself is emitted UNLAYERED — unlayered rules
// beat every layer, which is exactly the override contract site css needs.
const siteCss = readFileSync(
  new URL('./styles/site.css', import.meta.url),
  'utf8',
);

const config: UserConfig<Theme> = defineConfig({
  presets: [presetWind4()],
  outputToCssLayers: {
    cssLayerName: layer => (layer === 'preflights' ? null : layer),
  },
  preflights: [
    {
      getCSS: () => siteCss,
    },
  ],
});

export default config;
