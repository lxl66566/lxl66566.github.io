/**
 * Island: `Dated` — legacy `<dated date="YYYYMMDD"/>` signature line
 * (src/.vuepress/components/dated.vue). Renders a right-aligned italic
 * "—— YYYY-MM-DD" row. Styling is plain uno utilities (the .abs-dated
 * hook class stays for DOM identification).
 */
import type { Element as SolidElement } from 'solid-js';

import type { IslandProps } from './types';

/** "20240327" -> "2024-03-27" (already dashed input passes through). */
function dashDate(raw: string): string {
  return raw.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
}

export default function Dated(props: IslandProps): SolidElement {
  const raw = typeof props['date'] === 'string' ? props['date'] : '';
  const date = dashDate(raw);
  return (
    <div class="abs-dated my-2 text-right italic">
      ——
      <time datetime={date}>{date}</time>
    </div>
  );
}
