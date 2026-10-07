/**
 * Slot keys: `@@@ KEY` delimiter text matching a data item, mirroring the
 * legacy vue named-slot convention (valid_name ?? name). Duplicate base keys
 * (series entries sharing one valid_name) get a `#k` suffix in raw-array
 * order; the SAME rule must run in the component and in any markdown
 * rewrite tool, so keep it in this module only.
 */

/** Assign unique slot keys over the raw data array order. */
export function assignSlotKeys<T>(
  items: readonly T[],
  baseKey: (item: T) => string,
): { item: T; key: string }[] {
  const used = new Set<string>();
  const counts = new Map<string, number>();
  return items.map(item => {
    const base = baseKey(item);
    let key = base;
    if (used.has(key)) {
      const seen = (counts.get(base) ?? 1) + 1;
      counts.set(base, seen);
      let suffix = seen;
      while (used.has(`${base}#${suffix}`)) suffix += 1;
      key = `${base}#${suffix}`;
      counts.set(base, suffix);
    } else {
      counts.set(base, 1);
    }
    used.add(key);
    return { item, key };
  });
}
