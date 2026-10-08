/**
 * Island: `HomeProjects` — homepage project shelf below the markdown body
 * (分类货架 layout): featured cards on top, then one foldable shelf row per
 * project group. Data is the single-source module
 * src/.vuepress/data/projects.ts.
 */
import {
  faBoxArchive,
  faDice,
  faGamepad,
  faRobot,
  faScrewdriverWrench,
  faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import type { JSX } from '@solidjs/web';
import { createSignal, For } from 'solid-js';
// Scan-time rendered desc HTML (src/.vuepress/site-data.ts onScan): the
// framework's inline markdown pipeline runs over every desc, keyed by the
// raw desc string.
import siteData from 'virtual:absolute-press/site-data';

import {
  featuredProjects,
  projectGroups,
  type FeaturedProject,
  type Project,
  type ProjectGroup,
} from '../src/.vuepress/data/projects';
import { FaIconSvg } from './pieces';
import type { IslandProps } from './types';

const descHtml = siteData.projectDescHtml;

/**
 * Desc span with framework-rendered inline markdown. Unrendered strings
 * (fresh desc before a dev-server restart) fall back to plain text.
 */
function DescSpan(props: { desc: string; class: string }): JSX.Element {
  const html = descHtml[props.desc];
  return html !== undefined ? (
    <span class={props.class} innerHTML={html} />
  ) : (
    <span class={props.class}>{props.desc}</span>
  );
}

/** Tooltip text: rendered desc HTML stripped back to plain text. */
function descText(desc: string): string {
  return (descHtml[desc] ?? desc)
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:amp|lt|gt|quot);/g, ch =>
      ch === '&amp;' ? '&' : ch === '&lt;' ? '<' : ch === '&gt;' ? '>' : `"`,
    );
}

/** Shelf row glyphs, keyed by the data module's group names. */
const GROUP_ICONS: Record<string, (typeof faGamepad)['icon']> = {
  'Galgame 工具': faGamepad.icon,
  小工具: faScrewdriverWrench.icon,
  其他项目: faShuffle.icon,
  'Telegram Bots': faRobot.icon,
  游戏: faDice.icon,
  Garbage: faBoxArchive.icon,
};

/** Featured card: whole card links to the repo. */
function FeaturedCard(props: { project: FeaturedProject }): JSX.Element {
  return (
    <a
      class="abs-projects__featured"
      href={props.project.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.project.img && (
        <img
          class="abs-projects__thumb"
          src={props.project.img}
          alt={`${props.project.name} 截图`}
          loading="lazy"
        />
      )}
      <span class="abs-projects__feat-name">{props.project.name}</span>
      <span class="abs-projects__feat-stack">{props.project.stack}</span>
      <DescSpan desc={props.project.desc} class="abs-projects__feat-desc" />
    </a>
  );
}

/** Shelf mini card: name links the repo, desc clamps to two lines. */
function MiniCard(props: { project: Project }): JSX.Element {
  return (
    <li>
      <a
        class="abs-projects__card"
        href={props.project.url}
        target="_blank"
        rel="noopener noreferrer"
        title={descText(props.project.desc)}
      >
        <span class="abs-projects__name">{props.project.name}</span>
        <DescSpan desc={props.project.desc} class="abs-projects__desc" />
      </a>
    </li>
  );
}

/** One foldable shelf row; group names map to GROUP_ICONS. */
function Shelf(props: { group: ProjectGroup }): JSX.Element {
  const [open, setOpen] = createSignal(!props.group.collapsed);
  return (
    <section class="abs-projects__group" data-open={open() ? '' : undefined}>
      <button
        class="abs-projects__group-head"
        aria-expanded={open() ? 'true' : 'false'}
        onClick={() => setOpen(!open())}
      >
        {GROUP_ICONS[props.group.name] && (
          <FaIconSvg
            icon={GROUP_ICONS[props.group.name]!}
            class="abs-projects__group-icon"
          />
        )}
        <span class="abs-projects__group-name">{props.group.name}</span>
        <span class="abs-projects__group-count">
          {props.group.projects.length}
        </span>
        <svg
          class="abs-projects__chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      <div class="abs-projects__reveal">
        <div class="abs-projects__body">
          <ul class="abs-projects__grid">
            <For each={props.group.projects}>
              {project => <MiniCard project={project} />}
            </For>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function HomeProjects(_props: IslandProps): JSX.Element {
  return (
    <div class="abs-projects">
      <div class="abs-projects__featured-grid">
        <For each={featuredProjects}>
          {project => <FeaturedCard project={project} />}
        </For>
      </div>
      <For each={projectGroups}>{group => <Shelf group={group} />}</For>
    </div>
  );
}
