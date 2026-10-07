/**
 * Island: `HomeProfile` — the homepage profile rail. On desktop (>=1280px)
 * it renders as a fixed card in the TOC lane; site CSS hides the framework
 * TOC there via :has on this island's placeholder, which reverts by itself
 * once client-side navigation leaves the page. Below 1280px the same DOM
 * flows as a card above the article body. Taxonomy numbers come from the
 * virtual:site-taxonomy module (vite.config.ts scans content frontmatter at
 * config time).
 */
import {
  faBilibili,
  faGithub,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import type { JSX } from '@solidjs/web';
import taxonomy from 'virtual:site-taxonomy';

import type { TaxonomyEntry } from '../src/.vuepress/taxonomy';
import { FaIconSvg } from './pieces';
import type { IslandProps } from './types';

const AUTHOR_URL = '/gossip/author.html';
const ARTICLES_URL = '/articles/index.html';

interface SocialLink {
  title: string;
  url: string;
  icon: typeof faGithub;
}

const SOCIAL_LINKS: SocialLink[] = [
  { title: 'GitHub', url: 'https://github.com/lxl66566', icon: faGithub },
  { title: 'Telegram', url: 'https://t.me/ab5_x', icon: faTelegram },
  {
    title: 'Bilibili',
    url: 'https://space.bilibili.com/346365047',
    icon: faBilibili,
  },
];

/** Framework archive route for a category/tag name (base is ''). */
const archiveHref = (kind: 'category' | 'tag', name: string): string =>
  `/${kind}/${encodeURIComponent(name)}.html`;

function Chip(props: {
  entry: TaxonomyEntry;
  kind: 'category' | 'tag';
}): JSX.Element {
  return (
    <li>
      <a
        class="abs-home-rail__chip"
        data-tag={props.kind === 'tag' ? '' : undefined}
        href={archiveHref(props.kind, props.entry.name)}
        title={`${props.entry.name}（${props.entry.count}）`}
      >
        {props.entry.name}
        {props.kind === 'category' && (
          <span class="abs-home-rail__count">{props.entry.count}</span>
        )}
      </a>
    </li>
  );
}

/** Stats entry: number over label; anchors scroll to the rail's own lists. */
function Stat(props: {
  href: string;
  value: number;
  label: string;
}): JSX.Element {
  return (
    <a href={props.href}>
      <b>{props.value}</b>
      <span>{props.label}</span>
    </a>
  );
}

export default function HomeProfile(_props: IslandProps): JSX.Element {
  return (
    <aside class="abs-home-rail">
      <div class="abs-home-rail__card">
        <a
          class="abs-home-rail__avatar"
          href={AUTHOR_URL}
          aria-label="关于作者"
        >
          <img src="/logo.jpg" alt="绝对值_x 的头像" />
        </a>
        <a class="abs-home-rail__name" href={AUTHOR_URL}>
          绝对值_x
        </a>
        <div class="abs-home-rail__stats">
          <Stat href={ARTICLES_URL} value={taxonomy.pages} label="文章" />
          <Stat
            href="#abs-home-cats"
            value={taxonomy.categories.length}
            label="分类"
          />
          <Stat
            href="#abs-home-tags"
            value={taxonomy.tags.length}
            label="标签"
          />
        </div>
        <div class="abs-home-rail__social">
          {SOCIAL_LINKS.map(link => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.title}
              title={link.title}
            >
              <FaIconSvg icon={link.icon.icon} class="abs-home-rail__icon" />
            </a>
          ))}
        </div>
        <section class="abs-home-rail__group" id="abs-home-cats">
          <span class="abs-home-rail__label">分类</span>
          <ul class="abs-home-rail__chips">
            {taxonomy.categories.map(entry => (
              <Chip entry={entry} kind="category" />
            ))}
          </ul>
        </section>
        <section class="abs-home-rail__group" id="abs-home-tags">
          <span class="abs-home-rail__label">标签</span>
          <ul class="abs-home-rail__chips">
            {taxonomy.tags.map(entry => (
              <Chip entry={entry} kind="tag" />
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
