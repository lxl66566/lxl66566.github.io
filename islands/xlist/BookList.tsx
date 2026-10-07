/**
 * Island: `BookList` — legacy BookList.vue + BookListItem.vue on the
 * data-backed xlist stack. Title keeps the legacy `书名 - 作者` form; 标签
 * and 备注 render inline after the title like the migrated table.
 */
import { createMemo } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import bookData from '../../src/.vuepress/data/book_list';
import type { BookItemInputType } from '../../src/.vuepress/definition';
import type { IslandProps } from '../types';
import {
  a,
  b,
  cell,
  dateCell,
  orderBadge,
  rewatchBadge,
  STATUS_TONES,
  TAG_TONES,
  t,
} from './cells';
import { slotItems } from './items';
import { defaultBookOrder, durationString } from './order';
import type { XListItem } from './types';
import { XList } from './XList';

const COLUMNS = ['书名与作者', '阅读区间', '时长', '状态', '标签', '备注'];

function bookItem(item: BookItemInputType, key: string): XListItem {
  const tagBadges = [
    item.recommend ? b('推荐', TAG_TONES['推荐'] ?? 'note') : null,
    item.h_level === '无' ? b('无H', TAG_TONES['无H'] ?? 'note') : null,
    item.h_level === '重度' ? b('黄文', TAG_TONES['黄文'] ?? 'note') : null,
    item.tags?.japanese ? b('日轻', TAG_TONES['日轻'] ?? 'note') : null,
    item.tags?.namaniku ? b('生肉', TAG_TONES['生肉'] ?? 'note') : null,
    item.tags?.study ? b('学习', TAG_TONES['学习'] ?? 'note') : null,
  ].filter(part => part != null);
  const status = item.reading_status;
  const remark = cell([
    item.order ? orderBadge(item.order) : null,
    item.nth_time ? rewatchBadge(item.nth_time) : null,
    item.url ? a(item.url, '链接') : null,
  ]);
  return {
    key,
    title: item.name + (item.author ? ` - ${item.author}` : ''),
    cells: [
      dateCell(durationString(item.duration)),
      item.use_time === undefined ? cell([]) : cell([t(item.use_time)]),
      status
        ? cell([
            b(status.kind, STATUS_TONES[status.kind] ?? 'note'),
            status.extra === undefined ? null : t(status.extra),
          ])
        : cell([]),
      cell(tagBadges),
      remark,
    ],
  };
}

export default function BookList(props: IslandProps): SolidElement {
  const items = createMemo<XListItem[]>(() =>
    slotItems(
      props.childrenHtml ?? '',
      defaultBookOrder([...bookData]),
      item => item.valid_name ?? item.name,
      bookItem,
      'BookList',
    ),
  );
  return <XList items={items()} columns={COLUMNS} inlineCount={2} />;
}
