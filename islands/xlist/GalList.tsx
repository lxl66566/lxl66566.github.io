/**
 * Island: `GalList` — legacy GalList.vue + GalListItem.vue on the site's
 * data-backed xlist stack: galgame_list.ts is the single data source, entry
 * bodies come from the `@@@` slot pipeline, and every cell is built from
 * typed fields (no content heuristics).
 */
import { createMemo } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import galData from '../../src/.vuepress/data/galgame_list';
import type { GalItemInputType } from '../../src/.vuepress/definition';
import type { IslandProps } from '../types';
import {
  a,
  b,
  cell,
  dateCell,
  orderBadge,
  rewatchBadge,
  scoreCell,
  STATUS_TONES,
  TAG_TONES,
  t,
} from './cells';
import { slotItems } from './items';
import { defaultGalOrder, durationString } from './order';
import type { XListFilter, XListItem } from './types';
import { XList } from './XList';

const COLUMNS = [
  '游戏名',
  '时长',
  '游玩区间',
  '剧情',
  '画风',
  '程序',
  '感染力',
  '备注',
];

/** Legacy GalList checkbox: 非严格 = 非视觉小说类，不以选择支为主要玩法。 */
const STRICT_FILTER: XListFilter = {
  id: 'not_strict',
  label: '仅显示严格定义的 galgame',
  hint: '非严格定义的 galgame 指非视觉小说类，不以选择支作为主要玩法的 galgame。',
};

function galItem(item: GalItemInputType, key: string): XListItem {
  const status = item.playing_status;
  const tagFlags = [
    [item.namaniku, '生肉'],
    [item.tag?.all_ages, '无H'],
    [item.tag?.thrill, '惊悚'],
    [item.tag?.blood, '血腥'],
    [item.tag?.bizarre, '猎奇重口'],
    [item.tag?.not_strict, '非严格'],
  ] as const;
  const remark = cell([
    item.order ? orderBadge(item.order) : null,
    item.nth_time ? rewatchBadge(item.nth_time) : null,
    ...tagFlags
      .filter(([flag]) => flag)
      .map(([, word]) => b(word, TAG_TONES[word] ?? 'note')),
    item.url ? a(item.url, '资源') : null,
  ]);
  return {
    key,
    title: item.name,
    searchExtra: (item.other_names ?? []).join('/'),
    filterFlags: item.tag?.not_strict ? [STRICT_FILTER.id] : undefined,
    cells: [
      cell([
        item.use_time === undefined ? null : t(item.use_time),
        status ? b(status, STATUS_TONES[status] ?? 'note') : null,
      ]),
      dateCell(durationString(item.duration)),
      scoreCell(item.score?.story),
      scoreCell(item.score?.visual),
      scoreCell(item.score?.program),
      scoreCell(item.score?.thrill),
      remark,
    ],
  };
}

export default function GalList(props: IslandProps): SolidElement {
  const items = createMemo<XListItem[]>(() =>
    slotItems(
      props.childrenHtml ?? '',
      defaultGalOrder([...galData]),
      item => item.valid_name ?? item.name,
      galItem,
      'GalList',
    ),
  );
  return (
    <XList
      items={items()}
      columns={COLUMNS}
      inlineCount={1}
      filters={[STRICT_FILTER]}
    />
  );
}
