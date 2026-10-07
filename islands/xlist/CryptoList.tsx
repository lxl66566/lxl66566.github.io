/**
 * Island: `CryptoList` — legacy CryptocurrencyExchangeList.vue on the
 * data-backed xlist stack. 官网 renders inline after the name like the
 * migrated table.
 */
import { createMemo } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import cryptoData from '../../src/.vuepress/data/crypto_list';
import type { CryptocurrencyExchangeListItemType } from '../../src/.vuepress/definition';
import type { IslandProps } from '../types';
import { a, cell, t } from './cells';
import { slotItems } from './items';
import type { XListItem } from './types';
import { XList } from './XList';

const COLUMNS = [
  '名称',
  '类型',
  '大陆支付',
  '大陆KYC',
  'TV',
  '海外节点',
  '费率',
  '官网',
];

const boolMark = (value: boolean | undefined): string =>
  value === undefined ? '-' : value ? '✅' : '❌';

function cryptoItem(
  item: CryptocurrencyExchangeListItemType,
  key: string,
): XListItem {
  const fee = item['基础合约手续费'];
  return {
    key,
    title: item.name,
    cells: [
      cell([t(item.exchange_type)]),
      cell([t(boolMark(item['大陆支付方式']))]),
      cell([t(boolMark(item['允许大陆KYC']))]),
      cell([t(boolMark(item.TradingView))]),
      cell([t(item['海外节点兼容性'])]),
      cell([t(`${fee['挂单'] ?? '-'}%~${fee['吃单'] ?? '-'}%`)]),
      cell(item.url === undefined ? [] : [a(item.url, '官网')]),
    ],
  };
}

export default function CryptoList(props: IslandProps): SolidElement {
  const items = createMemo<XListItem[]>(() =>
    slotItems(
      props.childrenHtml ?? '',
      [...cryptoData],
      item => item.valid_name ?? item.name,
      cryptoItem,
      'CryptoList',
    ),
  );
  return <XList items={items()} columns={COLUMNS} inlineCount={1} />;
}
