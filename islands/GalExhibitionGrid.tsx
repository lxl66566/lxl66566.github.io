/**
 * Island: `GalExhibitionGrid` — legacy GalExhibitionGrid.vue. `items` is a
 * JSON array of {src, alt, text, lnk}; one auto-fill grid wraps columns by
 * width (no fixed per-row count). The text link opens `lnk` in a new tab.
 */
import { For, type Element as SolidElement } from 'solid-js';

import type { IslandProps } from './types';

export interface ExhibitionItem {
  src: string;
  alt: string;
  text: string;
  lnk: string;
}

export default function GalExhibitionGrid(props: IslandProps): SolidElement {
  const items: ExhibitionItem[] = Array.isArray(props['items'])
    ? (props['items'] as ExhibitionItem[])
    : [];
  return (
    <div class="abs-exhibition">
      <For each={items}>
        {item => (
          <div class="abs-exhibition__item">
            <a href={item.lnk} target="_blank" rel="noopener noreferrer">
              {item.text}
            </a>
            <img src={item.src} alt={item.alt || item.text} loading="lazy" />
          </div>
        )}
      </For>
    </div>
  );
}
