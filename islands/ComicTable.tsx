/**
 * Island: `ComicTable` — legacy ComicTable.vue + nhentai.vue + OrderBadge.vue
 * + dtlslong.vue on the site's shared xlist table. Imports the comic data
 * file (default-exported ComicItemType[]) directly and renders the score
 * table. Plain mode: no expandable bodies (the data has no slot prose).
 */
import type { Element as SolidElement } from 'solid-js';

import comicData from '../src/.vuepress/data/comic';
import {
  TwoScoreCompare,
  type ComicItemType,
} from '../src/.vuepress/definition';
import { a, b, cell, fold, orderTone, t } from './xlist/cells';
import type { XListItem } from './xlist/types';
import { XList } from './xlist/XList';

const COLUMNS = ['nh-id', '画风', '剧情', '备注'];

function comicItem(item: ComicItemType): XListItem {
  // Legacy: nhentai link when no otherlink and id is set; otherlink wins.
  const parts = [
    item.otherlink !== undefined && item.otherlink !== ''
      ? a(item.otherlink, item.id)
      : item.id !== ''
        ? a(`https://nhentai.net/g/${item.id}`, item.id)
        : null,
    item.bak !== undefined ? t(' | ') : null,
    item.bak !== undefined ? a(item.bak, 'bak') : null,
    item.order !== undefined
      ? b(String(item.order), orderTone(item.order))
      : null,
  ].filter(part => part !== null);
  return {
    key: item.id,
    title: item.id,
    titleParts: parts,
    cells: [
      cell([t(String(item.aScore))]),
      cell([t(String(item.bScore))]),
      cell(item.info === undefined ? [] : [fold(item.info)]),
    ],
  };
}

const data = comicData.toSorted((x, y) => TwoScoreCompare(x, y));

export default function ComicTable(): SolidElement {
  return (
    <div class="abs-comictable">
      <div>本子总数：{data.length}</div>
      <XList
        items={data.map(comicItem)}
        columns={COLUMNS}
        searchable={false}
        sortable={false}
        collapsible={false}
      />
    </div>
  );
}
