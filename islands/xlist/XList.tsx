import { hydrateIslands } from 'absolute-press/client';
/**
 * Shared interactive table behind the site xlist islands (data-backed
 * ExpandableList replacement): typed items in, header-click sorting (title +
 * numeric columns) / search / expandable rows out. Reuses the framework's
 * `ap-xlist__*` DOM contract and the styles ported into styles/site.css.
 *
 * Row bodies come from the build-time entry-list pipeline (`@@@` slot
 * bodies); after any filter/sort rebuild, nested islands inside bodies are
 * re-hydrated — same mechanism as the framework's ExpandableList.
 */
import { createEffect, createMemo, createSignal, For, Show } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import { Fold } from '../pieces';
import { compareTitles } from './order';
import { htmlText } from './static';
import type { XListItem, XListPart, XListProps } from './types';

/** Active header sort: `title` or a visible meta column index + direction. */
interface SortState {
  col: 'title' | number;
  dir: 'asc' | 'desc';
}

/** First click direction: titles read naturally ascending, scores descending
 * (legacy GalList SortIndicator cycled none -> desc -> asc -> none). */
const firstDir = (col: SortState['col']): 'asc' | 'desc' =>
  col === 'title' ? 'asc' : 'desc';

let uidSeq = 0;

interface IndexedItem {
  /** Stable position in the items array: expand-state + aria ids. */
  id: number;
  item: XListItem;
  /** Precomputed search haystack. */
  haystack: string;
  /** bodyHtml text content, computed once. */
  bodyText: string;
}

function PartView(props: { part: XListPart }): SolidElement {
  switch (props.part.kind) {
    case 'badge':
      return (
        <span class={`ap-xlist__badge ${props.part.cls}`}>
          {props.part.text}
        </span>
      );
    case 'link':
      return (
        <a href={props.part.href} target="_blank" rel="noopener noreferrer">
          {props.part.text}
        </a>
      );
    case 'fold':
      return <Fold>{props.part.text}</Fold>;
    default:
      return <>{props.part.text}</>;
  }
}

/** Render a cell's parts with legacy spacing (badges carry their own margin). */
function PartsView(props: { parts: readonly XListPart[] }): SolidElement {
  return (
    <For each={props.parts}>
      {(part, index) => (
        <>
          <Show
            when={index() > 0 && props.parts[index() - 1]?.kind !== 'badge'}
          >
            {' '}
          </Show>
          <PartView part={part} />
        </>
      )}
    </For>
  );
}

/** Legacy SortIndicator port: stacked triangles, the active one accent-lit. */
function Sorter(props: {
  label: string;
  dir: 'asc' | 'desc' | 'none';
  onToggle: () => void;
}): SolidElement {
  return (
    <button
      type="button"
      class="ap-xlist__sorter"
      onClick={props.onToggle}
      title="点击切换排序"
    >
      <span class="ap-xlist__sorter-label">{props.label}</span>
      <span class="ap-xlist__sorter-icons" aria-hidden="true">
        <span
          class={`ap-xlist__sorter-tri is-up${props.dir === 'asc' ? ' is-active' : ''}`}
        />
        <span
          class={`ap-xlist__sorter-tri is-down${props.dir === 'desc' ? ' is-active' : ''}`}
        />
      </span>
    </button>
  );
}

export function XList(props: XListProps): SolidElement {
  const uid = `ap-xlist-${++uidSeq}`;

  const indexed = createMemo<IndexedItem[]>(() =>
    props.items.map((item, id) => {
      const bodyText =
        item.bodyHtml === undefined ? '' : htmlText(item.bodyHtml);
      const haystack =
        `${item.key}\n${item.title}\n${item.cells.map(cell => cell.text).join('\n')}\n${bodyText}\n${item.searchExtra ?? ''}`.toLowerCase();
      return { id, item, haystack, bodyText };
    }),
  );

  const metaCount = () => Math.max(0, (props.columns?.length ?? 1) - 1);
  const inlineCount = () =>
    Math.min(props.inlineCount ?? 0, Math.max(0, metaCount()));
  const visibleMetaCount = () => metaCount() - inlineCount();

  const [query, setQuery] = createSignal('');
  const [sort, setSort] = createSignal<SortState | null>(null);
  const [open, setOpen] = createSignal<ReadonlySet<number>>(new Set());
  const [hiddenFilters, setHiddenFilters] = createSignal<ReadonlySet<string>>(
    new Set(),
  );

  const terms = createMemo(() =>
    query()
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(term => term !== ''),
  );

  /** Visible meta columns where every cell is scored or an empty `-`
   * placeholder sort numerically (galgame's 剧情/画风/程序/感染力). */
  const sortableColumns = createMemo(() => {
    const sortable = new Set<number>();
    for (let col = 0; col < visibleMetaCount(); col++) {
      let ranked = 0;
      let ok = true;
      for (const entry of indexed()) {
        const cell = entry.item.cells[col];
        if (cell === undefined) {
          ok = false;
          break;
        }
        if (cell.sortValue !== undefined) ranked += 1;
        else if (!cell.empty) {
          ok = false;
          break;
        }
      }
      if (ok && ranked > 0) sortable.add(col);
    }
    return sortable;
  });

  const columnSortDir = (col: SortState['col']): 'asc' | 'desc' | 'none' => {
    const state = sort();
    return state !== null && state.col === col ? state.dir : 'none';
  };

  /** `th[aria-sort]` value of one sortable column's current direction. */
  const ariaSort = (
    col: SortState['col'],
  ): 'ascending' | 'descending' | undefined => {
    const dir = columnSortDir(col);
    return dir === 'asc'
      ? 'ascending'
      : dir === 'desc'
        ? 'descending'
        : undefined;
  };

  /** Cycle one header: first click sorts (asc for titles, desc for scores —
   * legacy SortIndicator order), second flips, third returns to default. */
  const cycleSort = (col: SortState['col']): void => {
    const state = sort();
    if (state === null || state.col !== col) {
      setSort({ col, dir: firstDir(col) });
      return;
    }
    if (state.dir === firstDir(col)) {
      setSort({ col, dir: state.dir === 'asc' ? 'desc' : 'asc' });
      return;
    }
    setSort(null);
  };

  const filtered = createMemo(() => {
    const needle = terms();
    const searched =
      needle.length === 0
        ? indexed()
        : indexed().filter(entry =>
            needle.every(term => entry.haystack.includes(term)),
          );
    // Exclusion filters hide flagged rows before sorting; the count line
    // keeps showing visible / total (hidden rows stay accounted for).
    const hidden = hiddenFilters();
    const base =
      hidden.size === 0
        ? searched
        : searched.filter(
            entry =>
              !(entry.item.filterFlags ?? []).some(flag => hidden.has(flag)),
          );
    const state = sort();
    if (state === null) return base;
    if (state.col === 'title') {
      return base.toSorted((x, y) =>
        state.dir === 'asc'
          ? compareTitles(x.item.title, y.item.title)
          : compareTitles(y.item.title, x.item.title),
      );
    }
    const col = state.col;
    return base.toSorted((x, y) => {
      const xValue = x.item.cells[col]?.sortValue;
      const yValue = y.item.cells[col]?.sortValue;
      // Unscored rows sink regardless of direction (legacy parity).
      if (xValue === undefined && yValue === undefined) return 0;
      if (yValue === undefined) return -1;
      if (xValue === undefined) return 1;
      return state.dir === 'asc' ? xValue - yValue : yValue - xValue;
    });
  });

  const collapsible = () => props.collapsible ?? true;
  const sortable = () => props.sortable ?? true;
  const expandable = (entry: IndexedItem): boolean =>
    collapsible() && (entry.item.bodyHtml?.trim() ?? '') !== '';

  const isOpen = (id: number): boolean => open().has(id);
  const toggle = (id: number): void => {
    const next = new Set(open());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpen(next);
  };

  const toggleFilter = (id: string, on: boolean): void => {
    const next = new Set(hiddenFilters());
    if (on) next.add(id);
    else next.delete(id);
    setHiddenFilters(next);
  };

  const hasExpandable = () => indexed().some(entry => expandable(entry));

  /** Split cells into table columns + title-inline content. */
  const cellsOf = (
    entry: IndexedItem,
  ): { visible: typeof entry.item.cells; inline: typeof entry.item.cells } => {
    const cut = entry.item.cells.length - inlineCount();
    return {
      visible: entry.item.cells.slice(0, cut),
      inline: entry.item.cells.slice(cut),
    };
  };

  let rootRef: HTMLDivElement | undefined;
  // Rows rebuilt by the <For> (filter/sort re-entry) carry fresh island
  // placeholders; re-hydrate once the DOM settles (framework parity).
  createEffect(
    () =>
      filtered()
        .map(entry => entry.item.key)
        .join(','),
    () => {
      queueMicrotask(() => {
        if (rootRef) hydrateIslands(rootRef);
      });
    },
  );

  return (
    <div class="ap-xlist" ref={rootRef}>
      <div class="ap-xlist__toolbar">
        <Show when={props.searchable ?? true}>
          <input
            class="ap-xlist__search"
            type="search"
            placeholder="搜索条目…"
            aria-label="搜索条目…"
            value={query()}
            onInput={e => setQuery(e.currentTarget.value)}
          />
        </Show>
        <Show when={props.filters !== undefined && props.filters.length > 0}>
          <For each={props.filters}>
            {filter => (
              <label
                class={`ap-xlist__filter${hiddenFilters().has(filter.id) ? ' is-active' : ''}`}
                title={filter.hint}
              >
                <input
                  type="checkbox"
                  checked={hiddenFilters().has(filter.id)}
                  onChange={e =>
                    toggleFilter(filter.id, e.currentTarget.checked)
                  }
                />
                <span>{filter.label}</span>
              </label>
            )}
          </For>
        </Show>
        <span class="ap-xlist__count" role="status">
          {`${filtered().length} / ${indexed().length} 条`}
        </span>
      </div>
      <Show when={collapsible() && hasExpandable()}>
        <p class="ap-xlist__hint">点击表格行可以展开详细内容哦！</p>
      </Show>
      <Show
        when={filtered().length > 0}
        fallback={
          <p class="ap-xlist__empty" role="status">
            没有匹配的条目
          </p>
        }
      >
        <div class="ap-xlist__scroll">
          <table
            class={`ap-xlist__table${visibleMetaCount() >= 4 ? ' ap-xlist__table--wide' : ''}`}
          >
            <colgroup>
              <col class="ap-xlist__col-title" />
              <For each={Array.from({ length: visibleMetaCount() })}>
                {() => <col class="ap-xlist__col-meta" />}
              </For>
            </colgroup>
            <Show when={props.columns}>
              <thead>
                <tr class="ap-xlist__head-row">
                  <th
                    class="ap-xlist__th ap-xlist__th--title"
                    scope="col"
                    aria-sort={sortable() ? ariaSort('title') : undefined}
                  >
                    <Show when={sortable()} fallback={props.columns?.[0] ?? ''}>
                      <Sorter
                        label={props.columns?.[0] ?? ''}
                        dir={columnSortDir('title')}
                        onToggle={() => cycleSort('title')}
                      />
                    </Show>
                  </th>
                  <For
                    each={(props.columns ?? []).slice(
                      1,
                      1 + visibleMetaCount(),
                    )}
                  >
                    {(header, col) => (
                      <th
                        class="ap-xlist__th"
                        scope="col"
                        aria-sort={
                          sortableColumns().has(col())
                            ? ariaSort(col())
                            : undefined
                        }
                      >
                        <Show
                          when={sortableColumns().has(col())}
                          fallback={header}
                        >
                          <Sorter
                            label={header}
                            dir={columnSortDir(col())}
                            onToggle={() => cycleSort(col())}
                          />
                        </Show>
                      </th>
                    )}
                  </For>
                </tr>
              </thead>
            </Show>
            <tbody>
              <For each={filtered()}>
                {(entry, _index) => {
                  const expandableRow = () => expandable(entry);
                  const { visible, inline } = cellsOf(entry);
                  const rowId = () => entry.id;
                  return (
                    <>
                      <tr
                        class={`ap-xlist__row${expandableRow() ? ' is-expandable' : ''}${entry.item.offer ? ' is-offer' : ''}${isOpen(rowId()) ? ' is-open' : ''}`}
                        onClick={
                          expandableRow()
                            ? (e: MouseEvent) => {
                                if (
                                  (e.target as HTMLElement).closest('a, button')
                                )
                                  return;
                                toggle(rowId());
                              }
                            : undefined
                        }
                      >
                        <td
                          class="ap-xlist__cell ap-xlist__title"
                          // Deep-link parity with the static h6 anchor, which
                          // hydration replaces.
                          id={entry.item.key}
                        >
                          <Show
                            when={expandableRow()}
                            fallback={
                              <span class="ap-xlist__title-text">
                                <Show
                                  when={entry.item.titleParts}
                                  fallback={entry.item.title}
                                >
                                  {parts => <PartsView parts={parts() ?? []} />}
                                </Show>
                              </span>
                            }
                          >
                            <button
                              type="button"
                              class="ap-xlist__toggle"
                              aria-expanded={isOpen(rowId()) ? 'true' : 'false'}
                              aria-controls={`${uid}-${rowId()}`}
                              onClick={() => toggle(rowId())}
                            >
                              {entry.item.title}
                            </button>
                          </Show>
                          <Show when={inline.length > 0}>
                            <span class="ap-xlist__title-inline">
                              <PartsView
                                parts={inline.flatMap(cell => cell.parts)}
                              />
                            </span>
                          </Show>
                        </td>
                        <For each={visible}>
                          {cell => (
                            <td
                              class={`ap-xlist__cell ap-xlist__item-meta${cell.score ? ` ${cell.score}` : ''}${cell.empty ? ' is-empty' : ''}${cell.date ? ' is-date' : ''}`}
                            >
                              <PartsView parts={cell.parts} />
                            </td>
                          )}
                        </For>
                      </tr>
                      <Show when={expandableRow()}>
                        <tr
                          class={`ap-xlist__reveal-row${isOpen(rowId()) ? ' is-open' : ''}`}
                        >
                          <td
                            class="ap-xlist__reveal-cell"
                            colspan={visibleMetaCount() + 1}
                          >
                            <div
                              class="ap-xlist__reveal"
                              id={`${uid}-${rowId()}`}
                            >
                              <div class="ap-xlist__body">
                                <div
                                  class="ap-xlist__body-inner"
                                  innerHTML={entry.item.bodyHtml}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </Show>
                    </>
                  );
                }}
              </For>
            </tbody>
          </table>
        </div>
      </Show>
    </div>
  );
}
