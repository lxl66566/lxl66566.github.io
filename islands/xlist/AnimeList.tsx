/**
 * Island: `AnimeList` — legacy AnimeList.vue on the data-backed xlist
 * stack. 里/番外 stay plain text (the legacy table never badged them).
 */
import { createMemo } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import animeData from '../../src/.vuepress/data/anime_list';
import type { AnimeItemInputType } from '../../src/.vuepress/definition';
import type { IslandProps } from '../types';
import { cell, dateCell, orderBadge, rewatchBadge, t } from './cells';
import { slotItems } from './items';
import { durationString } from './order';
import type { XListItem } from './types';
import { XList } from './XList';

const COLUMNS = ['番名', '观看区间', '备注'];

function animeItem(item: AnimeItemInputType, key: string): XListItem {
  return {
    key,
    title: item.name,
    cells: [
      dateCell(durationString(item.duration)),
      cell([
        item.watch_times ? rewatchBadge(item.watch_times) : null,
        item.order ? orderBadge(item.order) : null,
        item.r18 ? t('里') : null,
        item.extra ? t('番外') : null,
      ]),
    ],
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
  return <XList items={items()} columns={COLUMNS} />;
}
