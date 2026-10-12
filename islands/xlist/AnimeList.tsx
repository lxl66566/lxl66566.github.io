import { slotItems, XList } from 'absolute-press/client';
import type { XListItem, XListPart } from 'absolute-press/client';
/**
 * Island: `AnimeList` — legacy AnimeList.vue on the data-backed xlist
 * stack. Badges hang off the title.
 */
import { createMemo } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import animeData from '../../src/.vuepress/data/anime_list';
import type { AnimeItemInputType } from '../../src/.vuepress/definition';
import type { IslandProps } from '../types';
import { b, cell, dateCell, orderBadge, rewatchBadge, t } from './cells';
import { durationString } from './order';

const COLUMNS = ['番名', '观看区间'];

function animeItem(item: AnimeItemInputType, key: string): XListItem {
  const badges = [
    item.watch_times ? rewatchBadge(item.watch_times) : null,
    item.order ? orderBadge(item.order) : null,
    item.r18 ? b('里', 'danger') : null,
    item.extra ? b('番外', 'info') : null,
  ].filter((part): part is XListPart => part != null);
  return {
    key,
    title: item.name,
    ...(badges.length > 0 ? { titleParts: [t(item.name), ...badges] } : {}),
    cells: [dateCell(durationString(item.duration))],
    // Title parts are not indexed by XList; keep the markers searchable.
    ...(badges.length > 0 ? { searchExtra: cell(badges).text } : {}),
  };
}

export default function AnimeList(props: IslandProps): SolidElement {
  const items = createMemo<XListItem[]>(() =>
    slotItems(
      props.childrenHtml ?? '',
      [...animeData],
      item => item.valid_name ?? item.name,
      animeItem,
      'AnimeList',
    ),
  );
  return <XList items={items()} columns={COLUMNS} sortable={false} />;
}
