/**
 * Assemble xlist items: pair the typed data rows with the `@@@` slot bodies
 * parsed from the build-time static table. Slot keys follow assignSlotKeys;
 * slots matching no data item are dropped loudly (legacy parity).
 */
import { assignSlotKeys } from './slotKey';
import { parseStaticChildren } from './static';
import type { XListItem } from './types';

export function slotItems<T>(
  childrenHtml: string,
  data: readonly T[],
  baseKey: (item: T) => string,
  build: (item: T, key: string) => XListItem,
  label: string,
): XListItem[] {
  const slots = parseStaticChildren(childrenHtml);
  const keyed = assignSlotKeys(data, baseKey);
  const keys = new Set(keyed.map(entry => entry.key));
  const bodies = new Map<string, string>();
  for (const slot of slots) {
    if (!keys.has(slot.key)) {
      console.warn(
        `[${label}] slot "${slot.key}" matches no data item (dropped)`,
      );
      continue;
    }
    bodies.set(slot.key, slot.bodyHtml);
  }
  return keyed.map(({ item, key }) => ({
    ...build(item, key),
    bodyHtml: bodies.get(key) ?? '',
  }));
}
