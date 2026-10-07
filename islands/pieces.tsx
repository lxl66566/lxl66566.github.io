/**
 * Shared building blocks for site islands, ported from the legacy vue
 * components (src/.vuepress/components). Styled parts keep their `abs-*`
 * hook classes; visual styles live in styles/site.css and uno utilities,
 * both reusing the framework's --c-* theme variables.
 */
import type { JSX } from '@solidjs/web';
import { createSignal } from 'solid-js';

/** Join truthy class names (framework's cx is not exported publicly). */
export function cx(...parts: (string | false | undefined)[]): string {
  return parts
    .filter(part => part !== '' && part != null && part !== false)
    .join(' ');
}

/** FA icon tuple (width, height, ligatures, unicode, path d) as shipped by
 * the @fortawesome packages' inline svg data; multi-path icons ship the d
 * as an array of subpath strings. */
export type FaIconTuple = readonly [
  number,
  number,
  readonly string[],
  string,
  string | readonly string[],
];

/** Single FA glyph from tuple data (site rule: icons never animate). */
export function FaIconSvg(props: {
  icon: FaIconTuple;
  class?: string;
}): JSX.Element {
  const [width, height, , , pathD] = props.icon;
  const d = typeof pathD === 'string' ? pathD : pathD.join(' ');
  return (
    <svg
      class={props.class}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/**
 * Legacy `dtlslong` equivalent: content clamped to two lines with a right
 * fade; clicking expands/collapses. Short content is never marked foldable
 * (detected once after mount, like the old ResizeObserver component).
 */
export function Fold(props: { children: JSX.Element }): JSX.Element {
  let contentRef: HTMLSpanElement | undefined;
  const [foldable, setFoldable] = createSignal(false);
  const [expanded, setExpanded] = createSignal(false);
  const check = (): void => {
    const el = contentRef;
    if (!el || expanded()) return;
    setFoldable(el.scrollHeight > el.clientHeight + 1);
  };
  queueMicrotask(check);
  return (
    <span
      class={cx(
        'abs-fold',
        foldable() && 'is-foldable',
        expanded() && 'is-expanded',
      )}
      onClick={() => {
        if (foldable()) setExpanded(!expanded());
      }}
    >
      <span class="abs-fold__content" ref={contentRef}>
        {props.children}
      </span>
    </span>
  );
}
