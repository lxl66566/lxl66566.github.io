/**
 * Island: `ArticleCell` — legacy ArticleCell.vue + RouterJumper.vue. Renders
 * a responsive masonry of link boxes. `<ArticleCell name="articles" />`
 * renders a site section data module (the single source shared with that
 * section's navbar panel); explicit `boxData` still wins for ad-hoc boxes.
 * Internal relative urls (no scheme) become same-tab links; external urls
 * open in a new tab.
 *
 * Styling is plain uno utilities (the .abs-article-cell hook classes stay
 * for DOM identification): nothing here competes with framework prose
 * rules, and the box restates the fieldset padding/border the wind4
 * preflight zeroes. Link color/hover needs no classes — the framework's
 * `#ap-content a` rules already supply exactly the legacy look.
 */
import {
  createEffect,
  createSignal,
  For,
  Show,
  type Element as SolidElement,
} from 'solid-js';

import articleSections from '../src/.vuepress/data/article';
import gossipSections from '../src/.vuepress/data/gossip';
import learningSections from '../src/.vuepress/data/learning';
import type { IslandProps } from './types';

interface ArticleCellLink {
  text: string;
  url: string;
}

interface ArticleCellBox {
  links: ArticleCellLink[];
  field?: string;
}

/** Named section data modules — keep in sync with vite.config.ts tweaks. */
const SECTION_DATA: Record<string, ArticleCellBox[]> = {
  articles: articleSections,
  gossip: gossipSections,
  learning: learningSections,
};

interface Column {
  boxes: ArticleCellBox[];
  height: number;
}

const isExternal = (url: string): boolean =>
  url.startsWith('http://') || url.startsWith('https://');

export default function ArticleCell(props: IslandProps): SolidElement {
  const name = props['name'];
  const boxData: ArticleCellBox[] = Array.isArray(props['boxData'])
    ? (props['boxData'] as ArticleCellBox[])
    : typeof name === 'string' && SECTION_DATA[name]
      ? SECTION_DATA[name]!
      : articleSections;
  const columnWidth =
    typeof props['columnWidth'] === 'number' ? props['columnWidth'] : 200;

  let containerRef: HTMLDivElement | undefined;
  const [columns, setColumns] = createSignal<Column[]>([]);

  // Same layout heuristic as the legacy component: each box goes to the
  // column with the fewest links; text width participates in the estimate.
  const textWidths = boxData.map(box =>
    box.links.length > 0
      ? Math.max(...box.links.map(link => link.text.length * 16))
      : 0,
  );
  // Box chrome (fieldset padding, ul indent, box margins, border) rides on
  // the longest link: without it wide pages over-column and every link wraps
  // mid-sentence, which is what made the grid read cramped next to legacy.
  const BOX_CHROME = 70;
  const maxColumnWidth = Math.max(columnWidth, ...textWidths) + BOX_CHROME;

  const updateColumns = (): void => {
    const el = containerRef;
    if (!el) return;
    const availableWidth = el.clientWidth - 3;
    const columnCount = Math.max(
      Math.min(Math.floor(availableWidth / maxColumnWidth), boxData.length),
      1,
    );
    el.style.flexWrap = columnCount > 1 ? 'nowrap' : 'wrap';
    const next: Column[] = Array.from({ length: columnCount }, () => ({
      boxes: [],
      height: 0,
    }));
    for (const box of boxData) {
      let target = 0;
      next.forEach((column, index) => {
        if (column.height < next[target]!.height) target = index;
      });
      next[target]!.boxes.push(box);
      next[target]!.height += box.links.length;
    }
    setColumns(next);
  };

  // Solid 2.0 mount-once pattern (two-phase createEffect, constant compute).
  createEffect(
    () => 0,
    () => {
      updateColumns();
      window.addEventListener('resize', updateColumns);
      return () => window.removeEventListener('resize', updateColumns);
    },
  );

  return (
    <div class="abs-article-cell flex h-auto max-w-full" ref={containerRef}>
      <For each={columns()}>
        {column => (
          <div class="abs-article-cell__column flex max-w-full flex-1 flex-col">
            <For each={column.boxes}>
              {box => (
                <fieldset class="abs-article-cell__box m-[5px] rounded-[5px] border-2 border-[color:var(--c-accent)] px-[0.85rem] pt-[0.4rem] pb-[0.8rem]">
                  <Show when={box.field !== undefined}>
                    <legend class="px-[0.4rem] text-[1.3rem] leading-[1.2] text-[color:var(--c-accent)]">
                      {box.field}
                    </legend>
                  </Show>
                  <ul>
                    <For each={box.links}>
                      {link => (
                        <li class="break-all whitespace-normal">
                          <Show
                            when={isExternal(link.url)}
                            fallback={<a href={link.url}>{link.text}</a>}
                          >
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.text}
                            </a>
                          </Show>
                        </li>
                      )}
                    </For>
                  </ul>
                </fieldset>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}
