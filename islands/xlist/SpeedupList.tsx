/**
 * Island: `SpeedupList` — legacy SpeedupList.vue on the data-backed xlist
 * stack. One row may cover several games (`names`); valid_name keys the
 * slot bodies.
 */
import { createMemo } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import speedupData from '../../src/.vuepress/data/speedup_list';
import type { SpeedupItemType } from '../../src/.vuepress/definition';
import type { IslandProps } from '../types';
import { cell, t } from './cells';
import { slotItems } from './items';
import type { XListItem } from './types';
import { XList } from './XList';

const COLUMNS = ['游戏名', '游戏引擎', '存档格式', '成功拆包加速'];

function speedupItem(item: SpeedupItemType, key: string): XListItem {
  return {
    key,
    title: item.names.join(' / '),
    cells: [
      cell(item.engine === undefined ? [] : [t(item.engine)]),
      cell(item.save_format === undefined ? [] : [t(item.save_format)]),
      cell([
        t(
          item.speedupable === true
            ? '✅'
            : item.speedupable === false
              ? '❌'
              : '❔',
        ),
      ]),
    ],
  };
}

export default function SpeedupList(props: IslandProps): SolidElement {
  const items = createMemo<XListItem[]>(() =>
    slotItems(
      props.childrenHtml ?? '',
      [...speedupData],
      item => item.valid_name,
      speedupItem,
      'SpeedupList',
    ),
  );
  return <XList items={items()} columns={COLUMNS} />;
}
