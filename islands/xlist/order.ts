/**
 * Legacy display orders and small formatters, ported verbatim from the old
 * vue components / migration-era conversion tooling so the interactive
 * tables keep the exact row order and cell text of the migrated markdown.
 */

const CHINESE_DIGITS = [
  '零',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
];

/** 1 -> 一, 12 -> 十二 (legacy NumberToChinese util). */
export function numberToChinese(num: number): string {
  let rest = num;
  return Array.from(Array(num).keys())
    .reduce((acc: string[]) => {
      const digit = rest % 10;
      if (digit !== 0) acc.push(CHINESE_DIGITS[digit] ?? String(digit));
      rest = Math.floor(rest / 10);
      return acc;
    }, [])
    .toReversed()
    .join('');
}

export interface DateDuration {
  start?: string;
  end?: string;
}

/** {start,end} -> `start ~ end`; start === end -> `start`; string passes through. */
export function durationString(
  duration: DateDuration | string | undefined,
): string {
  if (duration === undefined) return '';
  if (typeof duration === 'string') return duration;
  if (duration.start === duration.end && duration.start) return duration.start;
  return `${duration.start ?? '?'} ~ ${duration.end ?? '?'}`;
}

const dateDurationCompare = (
  a: DateDuration | undefined,
  b: DateDuration | undefined,
): number => {
  if (a && b && a.end && b.end) return a.end.localeCompare(b.end);
  if (a && a.end) return -1;
  if (b && b.end) return 1;
  return 0;
};

/** Legacy GalList default order: status groups (游玩中/中断/无/已停止), duration desc. */
export function defaultGalOrder<
  T extends { playing_status?: string; duration?: DateDuration },
>(list: readonly T[]): T[] {
  const grouped = new Map<string, T[]>();
  for (const item of list) {
    const key = item.playing_status ?? 'null';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)?.push(item);
  }
  const order = ['游玩中', '中断', 'null', '已停止'];
  return order.flatMap(key =>
    (grouped.get(key) ?? []).toSorted((x, y) => {
      if (x.duration && y.duration)
        return -dateDurationCompare(x.duration, y.duration);
      if (y.duration) return 1;
      if (x.duration) return -1;
      return 0;
    }),
  );
}

const bookPattern = /^[<>=\\?]+|[<>=\\?]+$/g;

const bookDurationCompare = (
  a: DateDuration | string | undefined,
  b: DateDuration | string | undefined,
): number => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.replace(bookPattern, '').localeCompare(b.replace(bookPattern, ''));
  }
  if (typeof a === 'string') return -1;
  if (typeof b === 'string') return 1;
  if (a?.end && b?.end) return a.end.localeCompare(b.end);
  if (a?.end) return 1;
  if (b?.end) return -1;
  if (a?.start && b?.start) return a.start.localeCompare(b.start);
  if (a?.start) return 1;
  if (b?.start) return -1;
  return 0;
};

type BookDuration = DateDuration | string;

/** Legacy BookList default order: status groups, duration asc. */
export function defaultBookOrder<
  T extends { reading_status?: { kind?: string }; duration?: BookDuration },
>(list: readonly T[]): T[] {
  const grouped = new Map<string, T[]>();
  for (const item of list) {
    const key = item.reading_status?.kind ?? 'null';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)?.push(item);
  }
  const order = ['在读', '等待连载', '中断', 'null', '已停更', '已放弃'];
  return order.flatMap(key =>
    (grouped.get(key) ?? []).toSorted((x, y) => {
      if (x.duration && y.duration)
        return -bookDurationCompare(x.duration, y.duration);
      if (y.duration) return 1;
      if (x.duration) return -1;
      return 0;
    }),
  );
}

/** Natural title order: base-insensitive, digit runs compared numerically. */
export function compareTitles(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}
