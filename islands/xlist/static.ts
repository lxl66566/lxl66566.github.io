/**
 * Parse the build-time static children of an entry-list island (framework
 * `renderEntryListChildren` output): one title row (`ap-xlist__item`, title
 * cell = the `@@@` key) plus one full-width body row per entry. DOM-level
 * splitting, so `@@@` text inside entry code fences can never confuse it.
 */
export interface StaticEntry {
  key: string;
  bodyHtml: string;
}

export function parseStaticChildren(childrenHtml: string): StaticEntry[] {
  const doc = new DOMParser().parseFromString(childrenHtml, 'text/html');
  const root = doc.querySelector('.ap-xlist');
  const itemRows = [...(root?.querySelectorAll('.ap-xlist__item') ?? [])];
  const bodyRows = [
    ...(root?.querySelectorAll('.ap-xlist__item-expanded') ?? []),
  ];
  return itemRows.map((el, index) => ({
    key: el.querySelector('.ap-xlist__item-title')?.textContent?.trim() ?? '',
    bodyHtml:
      bodyRows[index]?.querySelector('.ap-xlist__item-body')?.innerHTML ?? '',
  }));
}

/** Plain text of one HTML fragment (tags stripped) — search index input. */
export function htmlText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent ?? '').trim();
}
