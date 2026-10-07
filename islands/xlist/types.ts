/**
 * Shared contracts for the site xlist islands (data-backed ExpandableList
 * replacements): TS data + typed cell descriptors + `@@@` slot bodies from
 * the build-time entry-list pipeline.
 */
/** One inline piece of a meta cell. */
export type XListPart =
  | { kind: 'text'; text: string }
  | { kind: 'badge'; text: string; cls: string }
  | { kind: 'link'; href: string; text: string }
  | { kind: 'fold'; text: string };

/** Badge tone class suffix (`is-<tone>`), ported from the legacy badges. */
export type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'note';

/** One meta cell: ordered inline parts + presentation flags. */
export interface XListCell {
  parts: XListPart[];
  /** Pure text of every part (search index). */
  text: string;
  /** Date-like content keeps one-line width (CSS `is-date`). */
  date?: boolean;
  /** `-` placeholder renders dimmed (CSS `is-empty`). */
  empty?: boolean;
  /** Bare-number score emphasis (legacy high/low score colors). */
  score?: 'is-high-score' | 'is-low-score';
  /**
   * Numeric header-sort key (score columns). A column is sortable when every
   * cell carries a key or is an empty placeholder; cells without a key sink
   * to the bottom in both directions (legacy GalList score sort).
   */
  sortValue?: number;
}

/** One table row: typed data projected into cells + slot body HTML. */
export interface XListItem {
  /** Slot key (`@@@` delimiter text matching the data item). */
  key: string;
  title: string;
  /**
   * Rich title content (link/badge) for plain tables whose first column is
   * not a plain label (av/comic 番号). Falls back to plain `title` text.
   */
  titleParts?: XListPart[];
  /** Meta cells in column order (inline cells included; XList splits). */
  cells: XListCell[];
  /** Slot body HTML from the build-time entry-list pipeline. */
  bodyHtml?: string;
  /** Search-only text (hidden aliases) beyond cells/body. */
  searchExtra?: string;
  /** Legacy JobList green-row highlight. */
  offer?: boolean;
  /** Exclusion-group ids this row belongs to (see `XListProps.filters`). */
  filterFlags?: string[];
}

/** One toolbar exclusion filter (galgame's 严格定义 toggle). */
export interface XListFilter {
  /** Matches `XListItem.filterFlags` entries; active id hides flagged rows. */
  id: string;
  label: string;
  /** Native tooltip on the label explaining what gets hidden. */
  hint?: string;
}

export interface XListProps {
  items: XListItem[];
  /** Header labels: entry 0 names the title column, the rest meta columns. */
  columns?: string[];
  /** Trailing meta cells rendered inline inside the title cell. @default 0 */
  inlineCount?: number;
  /** Search box. @default true */
  searchable?: boolean;
  /** Header-click sorting (title column + numeric columns). @default true */
  sortable?: boolean;
  /** Expandable rows with body slots. @default true */
  collapsible?: boolean;
  /**
   * Toolbar exclusion filters: checking one hides rows whose `filterFlags`
   * carry its id (galgame's 仅显示严格定义的 galgame). The count line keeps
   * showing visible / total so hidden rows stay accounted for.
   */
  filters?: readonly XListFilter[];
}
