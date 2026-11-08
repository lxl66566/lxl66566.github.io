import { XList } from 'absolute-press/client';
import type { XListItem } from 'absolute-press/client';
/**
 * Island: `AvTable` — legacy AvTable.vue + SortableTable.vue + Av.vue on the
 * site's shared xlist table. Imports the av data file (default-exported
 * AvItemType[]) directly, sorts by TwoScoreCompare and splits into 最高/普通
 * tables. 番名 renders as its own fold column; 评价 lives in the expandable
 * fold body, so rows without 评价 are not expandable. Site css drops the
 * title column's width: 100% claim so the surplus goes to the 番名 column;
 * nowrap keeps the 番号 token on one line.
 */
import { Show, type Element as SolidElement } from 'solid-js';

import avData from '../src/.vuepress/data/av';
import { TwoScoreCompare, type AvItemType } from '../src/.vuepress/definition';
import { partitionInPlace } from '../src/.vuepress/utils/PartitionArray';
import { a, cell, fold, t } from './xlist/cells';

const COLUMNS = ['番号', '颜值', '演技', '番名'];

/** Text-node HTML escape (`&`, `<`, `>`), same semantics as the framework's
 * build-time escapeHtml — bodyHtml lands in innerHTML, so data must not inject
 * markup. */
const escapeHtml = (s: string): string =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/** Fold body: labeled paragraph for 评价. */
function avBody(item: AvItemType): string {
  return item.say === undefined
    ? ''
    : `<p><strong>评价</strong> ${escapeHtml(item.say)}</p>`;
}

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
    ],
    bodyHtml: avBody(item),
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
    <XList items={props.rows.map(avItem)} columns={COLUMNS} sortable={false} />
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
