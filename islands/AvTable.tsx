/**
 * Island: `AvTable` — legacy AvTable.vue + SortableTable.vue + Av.vue on the
 * site's shared xlist table. Imports the av data file (default-exported
 * AvItemType[]) directly, sorts by TwoScoreCompare and splits into 最高/普通
 * tables. Plain mode: no expandable bodies (the data has no slot prose).
 */
import { Show, type Element as SolidElement } from 'solid-js';

import avData from '../src/.vuepress/data/av';
import { TwoScoreCompare, type AvItemType } from '../src/.vuepress/definition';
import { partitionInPlace } from '../src/.vuepress/utils/PartitionArray';
import { a, cell, fold, t } from './xlist/cells';
import type { XListItem } from './xlist/types';
import { XList } from './xlist/XList';

const COLUMNS = ['番号', '颜值', '演技', '番名', '评价'];

/** missav link for a 番号 (`u` appends the uncensored-leak suffix). */
function avHref(item: AvItemType): string {
  return `https://missav.ai/${item.id}${item.u === true ? '-uncensored-leak' : ''}`;
}

function avItem(item: AvItemType): XListItem {
  const label = item.id.toUpperCase();
  return {
    key: item.id,
    title: label,
    titleParts: [
      item.otherlink !== undefined
        ? a(item.otherlink, label)
        : a(avHref(item), label),
    ],
    cells: [
      cell([t(String(item.aScore))]),
      cell([t(String(item.bScore))]),
      cell(item.name === undefined ? [] : [fold(item.name)]),
      cell(item.say === undefined ? [] : [fold(item.say)]),
    ],
  };
}

// Legacy comment: partitionInPlace consumes/reverses the array, so the sort
// is inverted to keep the highest scores first (ties: aScore wins).
const data = avData.toSorted((x, y) => -TwoScoreCompare(x, y));
// Capture before partitionInPlace, which consumes the array.
const total = data.length;
const [top, normal] = partitionInPlace(
  data,
  item =>
    item.aScore + item.bScore >= 18 || item.aScore >= 10 || item.bScore >= 10,
);

function AvRows(props: { rows: AvItemType[] }): SolidElement {
  return (
    <XList
      items={props.rows.map(avItem)}
      columns={COLUMNS}
      searchable={false}
      sortable={false}
      collapsible={false}
    />
  );
}

export default function AvTable(): SolidElement {
  return (
    <div class="abs-avtable">
      <div>番号总数：{total}</div>
      <h2>最高</h2>
      <Show when={top.length > 0}>
        <AvRows rows={top} />
      </Show>
      <h2>普通</h2>
      <Show when={normal.length > 0}>
        <AvRows rows={normal} />
      </Show>
    </div>
  );
}
