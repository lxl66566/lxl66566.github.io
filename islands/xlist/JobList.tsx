/**
 * Island: `JobList` — legacy JobList.vue on the data-backed xlist stack.
 * One island per hiring season: `<JobList list="job_list_2024_autumn">`.
 * Rows with an offer keep the legacy green highlight.
 */
import { createMemo } from 'solid-js';
import type { Element as SolidElement } from 'solid-js';

import {
  job_list_2024_autumn,
  job_list_2024_spring,
} from '../../src/.vuepress/data/job_list';
import type { JobItemInputType } from '../../src/.vuepress/definition';
import type { IslandProps } from '../types';
import { cell, dateCell, t } from './cells';
import { slotItems } from './items';
import type { XListItem } from './types';
import { XList } from './XList';

const COLUMNS = ['公司', '岗位', '渠道', '投递时间', '状态'];

const LISTS: Record<string, JobItemInputType[]> = {
  job_list_2024_autumn,
  job_list_2024_spring,
};

/** Island props plus the `list` attribute picking the hiring season. */
interface JobListProps extends IslandProps {
  /** Data list key in `LISTS` (`<JobList list="job_list_2024_autumn" />`). */
  list?: string;
}

function jobItem(item: JobItemInputType, key: string): XListItem {
  return {
    key,
    title: item.name,
    offer: item.offer === true,
    cells: [
      cell([t(item.job)]),
      cell([t(item.by)]),
      dateCell(item.time),
      cell([t(`${item.result}${item.offer ? ' + offer' : ''}`)]),
    ],
  };
}

export default function JobList(props: JobListProps): SolidElement {
  const items = createMemo<XListItem[]>(() => {
    const list = LISTS[String(props.list ?? '')] ?? [];
    return slotItems(
      props.childrenHtml ?? '',
      list,
      item => item.name,
      jobItem,
      'JobList',
    );
  });
  return <XList items={items()} columns={COLUMNS} />;
}
