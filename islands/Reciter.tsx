/**
 * Island: `Reciter` — legacy reciter.vue (绝对值_x 的背词器). Radio groups
 * for language/dictionary, a word-count slider, and a button that draws
 * random words from a remote notebook JSON and opens dictionary links.
 * Styling is plain uno utilities (the .abs-reciter/.abs-radio hook classes
 * stay for DOM identification); no framework prose rule competes here.
 */
import {
  createEffect,
  createSignal,
  For,
  Show,
  type Element as SolidElement,
} from 'solid-js';

import { cx } from './pieces';
import type { IslandProps } from './types';

interface RadioOption {
  label: string;
  value: string;
}

/** Notebook JSON served from the wordsreciter repo (jsdelivr). */
interface NoteBook {
  english: { default: string[] };
  japanese: { default: string[] };
}

const LANGUAGE_OPTIONS: RadioOption[] = [
  { label: 'English', value: 'english' },
  { label: '日本語', value: 'japanese' },
];

const ENGLISH_OPTIONS: RadioOption[] = [
  {
    label: 'Cambridge Dictionary',
    value: 'https://dictionary.cambridge.org/dictionary/english/{}',
  },
  {
    label: "Oxford Learner's Dictionaries",
    value: 'https://www.oxfordlearnersdictionaries.com/definition/english/{}',
  },
  {
    label: 'Oxford Advanced American Dictionary',
    value:
      'https://www.oxfordlearnersdictionaries.com/definition/american_english/{}',
  },
  {
    label: 'Merriam Webster',
    value: 'https://www.merriam-webster.com/dictionary/{}',
  },
  { label: '百度翻译', value: 'https://fanyi.baidu.com/#en/zh/{}' },
  {
    label: 'Collins Dictionary',
    value: 'https://www.collinsdictionary.com/dictionary/english/{}',
  },
];

const JAPANESE_OPTIONS: RadioOption[] = [
  { label: 'Weblio 辞書国語辞典', value: 'https://www.weblio.jp/content/{}' },
  { label: 'goo 辞書', value: 'https://dictionary.goo.ne.jp/srch/jn/{}/m6u/' },
  {
    label: '広辞苑無料検索',
    value: 'https://sakura-paris.org/dict/広辞苑/prefix/{}/',
  },
];

const NOTEBOOK_URL =
  'https://cdn.jsdelivr.net/gh/lxl66566/wordsreciter@notebook/notebook.json';

interface AnswerItem {
  word: string;
  url: string;
}

function randomOf<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)] as T;
}

function RadioButtons(radioProps: {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}): SolidElement {
  return (
    <div class="abs-radio-group flex flex-wrap gap-[0.6rem]">
      <For each={radioProps.options}>
        {option => (
          <label
            class={cx(
              'abs-radio flex cursor-pointer items-center',
              option.value === radioProps.value && 'is-selected font-bold',
            )}
          >
            <input
              type="radio"
              value={option.value}
              checked={option.value === radioProps.value}
              onChange={() => radioProps.onChange(option.value)}
            />
            {option.label}
          </label>
        )}
      </For>
    </div>
  );
}

export default function Reciter(_props: IslandProps): SolidElement {
  const [language, setLanguage] = createSignal<'english' | 'japanese'>(
    'english',
  );
  const [englishWebsite, setEnglishWebsite] = createSignal(
    ENGLISH_OPTIONS[0]!.value,
  );
  const [japaneseWebsite, setJapaneseWebsite] = createSignal(
    JAPANESE_OPTIONS[0]!.value,
  );
  const [selectNum, setSelectNum] = createSignal(3);
  const [opendirectly, setOpendirectly] = createSignal(false);
  const [notebook, setNotebook] = createSignal<NoteBook>({
    english: { default: [] },
    japanese: { default: [] },
  });
  const [answer, setAnswer] = createSignal<AnswerItem[]>([]);

  // Solid 2.0 mount-once pattern (two-phase createEffect, constant compute).
  createEffect(
    () => 0,
    () => {
      void fetch(NOTEBOOK_URL)
        .then(res => res.json() as Promise<NoteBook>)
        .then(json => {
          setNotebook(json);
          return undefined;
        })
        .catch((e: unknown) => {
          console.error('[reciter] fetch notebook failed', e);
        });
    },
  );

  const website = (): string =>
    language() === 'english' ? englishWebsite() : japaneseWebsite();

  const clickRecite = (): void => {
    const book = notebook()[language()].default;
    if (book.length === 0) return;
    const next: AnswerItem[] = [];
    for (let i = 0; i < selectNum(); ++i) {
      const word = randomOf(book);
      const url = website().replaceAll('{}', word);
      next.push({ word, url });
      if (opendirectly()) window.open(url, '_blank');
    }
    setAnswer(answer().concat(next));
  };

  return (
    <div class="abs-reciter">
      <h2>绝对值_x 的背词器</h2>
      <fieldset>
        <legend>语言</legend>
        <RadioButtons
          options={LANGUAGE_OPTIONS}
          value={language()}
          onChange={v => setLanguage(v === 'japanese' ? 'japanese' : 'english')}
        />
      </fieldset>
      <fieldset>
        <legend>网址</legend>
        <Show
          when={language() === 'english'}
          fallback={
            <RadioButtons
              options={JAPANESE_OPTIONS}
              value={japaneseWebsite()}
              onChange={setJapaneseWebsite}
            />
          }
        >
          <RadioButtons
            options={ENGLISH_OPTIONS}
            value={englishWebsite()}
            onChange={setEnglishWebsite}
          />
        </Show>
      </fieldset>
      <div class="abs-reciter__row px-[0.3rem] py-[0.45rem]">
        <span>个数：</span>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={selectNum()}
          class="accent-[color:var(--c-accent)]"
          onInput={e => setSelectNum(Number(e.currentTarget.value))}
        />
        <span>{selectNum()}</span>
      </div>
      <div class="abs-reciter__row px-[0.3rem] py-[0.45rem]">
        <input
          type="checkbox"
          checked={opendirectly()}
          onChange={e => setOpendirectly(e.currentTarget.checked)}
        />
        <span>是否直接打开网页（若勾选，请开启“弹出窗口和重定向”权限）</span>
      </div>
      <div class="abs-reciter__row px-[0.3rem] py-[0.45rem]">
        <button
          type="button"
          class="cursor-pointer rounded-[0.375rem] border-0 bg-[color:var(--c-accent)] px-4 py-[0.35rem] text-[color:var(--c-bg)] transition-[filter] duration-[140ms] ease-[ease-out] hover:brightness-[1.08]"
          onClick={clickRecite}
        >
          背！
        </button>
      </div>
      <fieldset class="abs-reciter__answers wrap-anywhere">
        <For each={answer()}>
          {answ => (
            <span>
              <a href={answ.url} target="_blank" rel="noopener noreferrer">
                {answ.word}
              </a>
              &emsp;
            </span>
          )}
        </For>
      </fieldset>
    </div>
  );
}
