/**
 * Island: `SubWork` — sub-work / sub-section label inside entry-list slot
 * bodies (`<SubWork order="6">雪おんな</SubWork>`). Slot bodies must not use
 * real headings: heading-level crawlers (Algolia docsearch) slice records by
 * headings, so one in-body heading becomes the breadcrumb ancestor of every
 * later entry on the page. The label renders as a styled non-heading row
 * instead.
 *
 * Children are the title (inline markdown, kept as static text for crawlers
 * and the client-side xlist search); `order` is a plain integer (rendered as
 * a `第 N 部` chip) or any other string rendered verbatim (`S2`/`FD`/`剧场版`
 * ...); `alias` is a muted byname. All styling lives on the
 * `[data-ap-island]` container in styles/site.css so the no-JS static
 * children and the hydrated markup share one appearance.
 */
import type { Element as SolidElement } from 'solid-js';

import type { IslandProps } from './types';

/** Prop value as display text: finite numbers coerce (JSON `:order="1"`),
 * everything else non-string and the empty string drops out. */
function text(value: unknown): string | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return typeof value === 'string' && value !== '' ? value : undefined;
}

/** Order chip label: plain integers become `第 N 部`, anything else passes. */
function orderLabel(value: unknown): string | undefined {
  const raw = text(value);
  return raw === undefined
    ? undefined
    : /^\d+$/.test(raw)
      ? `第 ${raw} 部`
      : raw;
}

export default function SubWork(props: IslandProps): SolidElement {
  const order = orderLabel(props['order']);
  const alias = text(props['alias']);
  return (
    <>
      {order !== undefined && <span class="ap-subwork__order">{order}</span>}
      <span class="ap-subwork__title" innerHTML={props.childrenHtml ?? ''} />
      {alias !== undefined && <span class="ap-subwork__alias">{alias}</span>}
    </>
  );
}
