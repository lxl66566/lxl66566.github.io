import { readFileSync } from 'node:fs';

import { presetWind4, type Theme } from '@unocss/preset-wind4';
import { defineConfig, type UserConfig } from 'unocss';

// Site-level compat styles (migrated from the old vuepress scss) ride the
// uno preflight, which lands in the entry's render-blocking css on every
// page in both dev and build.
const siteCss = readFileSync(
  new URL('./styles/site.css', import.meta.url),
  'utf8',
);

const config: UserConfig<Theme> = defineConfig({
  presets: [presetWind4()],
  preflights: [
    {
      getCSS: () => siteCss,
    },
  ],
});

export default config;
