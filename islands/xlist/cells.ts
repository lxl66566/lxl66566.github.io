/**
 * Cell factories for the xlist islands: typed data -> XListCell descriptors.
 * Badge tones and the score thresholds port the framework's content
 * heuristics (BADGE_WORDS / legacy score classes), but here every tone comes
 * from a typed field, not from string matching.
 */
import { numberToChinese } from './order';
import type { BadgeTone, XListCell, XListPart } from './types';

const toneClass = (tone: BadgeTone): string => `is-${tone}`;

/** text part */
export const t = (text: string): XListPart => ({ kind: 'text', text });
/** badge part */
export const b = (text: string, tone: BadgeTone): XListPart => ({
  kind: 'badge',
  text,
  cls: toneClass(tone),
});
/** link part */
export const a = (href: string, text: string): XListPart => ({
  kind: 'link',
  href,
  text,
});
/** foldable text part (legacy dtlslong) */
export const fold = (text: string): XListPart => ({ kind: 'fold', text });

/** `#N` order badge (legacy OrderBadge tone mapping). */
export const orderBadge = (order: number): XListPart =>
  b(`#${order}`, orderTone(order));

/** `N刷` rewatch badge, same tone mapping as the order badge. */
export const rewatchBadge = (times: number): XListPart =>
  b(`${numberToChinese(times)}刷`, orderTone(times));

/** Build a cell; computes the search text and applies the flags. */
export function cell(
  parts: (XListPart | null | undefined)[],
  opts: { date?: boolean } = {},
): XListCell {
  const present = parts.filter((part): part is XListPart => part != null);
  const text = present.map(part => part.text).join('');
  const isEmpty =
    present.length === 1 &&
    present[0] !== undefined &&
    present[0].kind === 'text' &&
    present[0].text === '-';
  return { parts: present, text, empty: isEmpty, date: opts.date };
}

/** Bare-number score cell: >= 10 bold green, <= 0 red, undefined -> `-`. */
export function scoreCell(value: number | undefined): XListCell {
  const result = cell([value === undefined ? t('-') : t(String(value))]);
  if (value !== undefined) {
    result.sortValue = value;
    if (value >= 10) result.score = 'is-high-score';
    else if (value <= 0) result.score = 'is-low-score';
  }
  return result;
}

/** Date-like text cell (`2026-09-24 ~ ?`): CSS keeps it on one line. */
export function dateCell(text: string): XListCell {
  return cell(text === '' ? [] : [t(text)], { date: text !== '' });
}

/** Legacy OrderBadge tones: 1 tip / 2 warning / 3 danger / 4 info / rest note. */
export function orderTone(n: number): BadgeTone {
  switch (n) {
    case 1:
      return 'success';
    case 2:
      return 'warning';
    case 3:
      return 'danger';
    case 4:
      return 'info';
    default:
      return 'note';
  }
}

/** Legacy status badge tones (old Badge type mapping). */
export const STATUS_TONES: Record<string, BadgeTone> = {
  游玩中: 'success',
  在读: 'success',
  中断: 'warning',
  等待连载: 'warning',
  已停止: 'danger',
  已停更: 'danger',
  已放弃: 'danger',
};

/** Legacy tag badge tones (galgame/books/anime keyword pills). */
export const TAG_TONES: Record<string, BadgeTone> = {
  推荐: 'success',
  生肉: 'success',
  无H: 'success',
  黄文: 'danger',
  学习: 'danger',
  猎奇重口: 'danger',
  惊悚: 'warning',
  血腥: 'warning',
  日轻: 'info',
  非严格: 'note',
};
