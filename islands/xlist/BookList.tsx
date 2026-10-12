import { slotItems, XList } from 'absolute-press/client';
import type { XListItem } from 'absolute-press/client';
/**
 * Island: `BookList` — legacy BookList.vue + BookListItem.vue on the
 * data-backed xlist stack. Title keeps the legacy `书名 - 作者` form: a
 * recommend star leads, the name itself is the url link; 标签 and 备注
 * render inline after the title like the migrated table.
 */
import { createMemo } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import bookData from '../../src/.vuepress/data/book_list';
import { HLevel, type BookItemInputType } from '../../src/.vuepress/definition';
import type { IslandProps } from '../types';
import {
  a,
  b,
  br,
  cell,
  dateCell,
  icon,
  orderBadge,
  rewatchBadge,
  STATUS_TONES,
  TAG_TONES,
  t,
} from './cells';
import { defaultBookOrder, durationString } from './order';

const COLUMNS = ['书名与作者', '阅读区间', '时长', '状态', '标签', '备注'];

/** Legacy BookListItem recommend star: amber FA star glyph before the name. */
const RECOMMEND_STAR =
  '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';

function bookItem(item: BookItemInputType, key: string): XListItem {
  const tagBadges = [
    item.h_level === HLevel.NONE ? b('无H', TAG_TONES['无H'] ?? 'note') : null,
    item.h_level === HLevel.HIGH
      ? b('黄文', TAG_TONES['黄文'] ?? 'note')
      : null,
    item.tags?.japanese ? b('日轻', TAG_TONES['日轻'] ?? 'note') : null,
    item.tags?.namaniku ? b('生肉', TAG_TONES['生肉'] ?? 'note') : null,
    item.tags?.study ? b('学习', TAG_TONES['学习'] ?? 'note') : null,
  ].filter(part => part != null);
  const status = item.reading_status;
  const remark = cell([
    item.order ? orderBadge(item.order) : null,
    item.nth_time ? rewatchBadge(item.nth_time) : null,
  ]);
  const title = item.name + (item.author ? ` - ${item.author}` : '');
  return {
    key,
    title,
    // Legacy title cell: the star leads, the name itself is the link.
    ...(item.recommend || item.url
      ? {
          titleParts: [
            item.recommend
              ? icon(RECOMMEND_STAR, { title: '推荐', cls: 'abs-book-star' })
              : null,
            item.url ? a(item.url, title) : t(title),
          ].filter(part => part != null),
        }
      : {}),
    cells: [
      dateCell(durationString(item.duration)),
      item.use_time === undefined ? cell([]) : cell([t(item.use_time)]),
      status
        ? cell([
            b(status.kind, STATUS_TONES[status.kind] ?? 'note'),
            status.extra === undefined ? null : br(),
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
  return (
    <XList items={items()} columns={COLUMNS} inlineCount={2} sortable={false} />
  );
}
