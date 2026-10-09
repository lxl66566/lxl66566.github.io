/**
 * Island: `Timeline` — the /timeline/ archive. Every article as a
 * `date · title` row, grouped by year (newest year first). Data is the
 * siteScan timeline derivation (src/.vuepress/site-data.ts, /hide/
 * excluded); the framework profile card/drawer counts share the same
 * article set (profile.exclude in vite.config.ts), so the rail number
 * matches the row count here.
 */
import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import siteData from 'virtual:absolute-press/site-data';

import type { TimelineEntry } from '../src/.vuepress/site-data';
import type { IslandProps } from './types';

interface YearGroup {
  /** ISO year of the group's entries; '' for the undated trailing group. */
  year: string;
  entries: TimelineEntry[];
}

/** Fold the date-sorted list into adjacent year groups. */
function groupByYear(entries: TimelineEntry[]): YearGroup[] {
  const groups: YearGroup[] = [];
  for (const entry of entries) {
    const year = entry.createdAt?.slice(0, 4) ?? '';
    const last = groups.at(-1);
    if (last && last.year === year) last.entries.push(entry);
    else groups.push({ year, entries: [entry] });
  }
  return groups;
}

const groups = groupByYear(siteData.timeline);

export default function Timeline(_props: IslandProps): JSX.Element {
  return (
    <div class="abs-timeline">
      <For each={groups}>
        {group => (
          <section class="abs-timeline__group">
            <div class="abs-timeline__label">
              <b>{group.year === '' ? '未注明日期' : group.year}</b>
              <span class="abs-timeline__count">{group.entries.length}</span>
            </div>
            <ul class="abs-timeline__list">
              <For each={group.entries}>
                {entry => (
                  <li>
                    <a class="abs-timeline__link" href={entry.route}>
                      <time
                        class="abs-timeline__date"
                        datetime={entry.createdAt ?? undefined}
                      >
                        {entry.createdAt?.slice(0, 10) ?? '—'}
                      </time>
                      <span class="abs-timeline__title">{entry.title}</span>
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </section>
        )}
      </For>
    </div>
  );
}
