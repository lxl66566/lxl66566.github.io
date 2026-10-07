# markdown 转换规范（vuepress-theme-hope → absolute）

本文档是 md 转换作业的**唯一依据**。按目录作业的 agent 必须逐节核对；每个模式给出识别特征（rg/grep 命令）、旧写法 → 新写法对照、边界情况与验证方法。

- 框架语法参考：`node_modules/absolute` 源码内 `docs/content/guide/markdown.md`（容器/tabs/代码块）、`docs/content/guide/islands.md`（island 语法、ExpandableList、`@@@`/`@@` 条目语法）。
- 站点 island 注册表：`vite.config.ts` 的 `config.islands`；实现源码在仓库根 `islands/`。样式在 `styles/site.css`。
- **仍在用的工具**只有 `utils/xlist-sync.mjs`（§9.1 校验）与 `utils/xlist-e2e.mjs`（§9.2 e2e）。迁移期一次性脚本（convert-xlist / rewrite-icons / icons-report / xlist-columns / xlist-extract-legacy / xlist-restore-slots / xlist-to-slots）与历史记录文档（LEGACY-CLEANUP.md、icons-mapping.md）已在迁移收尾后删除；下文保留的对应命令仅为历史档案，不可再执行。

## 0. 作业流程与总规则

1. 每个文件转换前先跑「识别特征」命令列出命中；转换后必须复跑确认为 0（或仅剩本文标注「保留」的模式）。
2. **已完成、直接跳过的文件**（试点，勿重复处理）：
   `src/hobbies/galgame.md`、`src/hobbies/books.md`、`src/articles/speedup.md`、`src/gossip/job.md`、`src/gossip/consider.md`、`src/gossip/author.md`、`src/gossip/pc_hardware.md`、`src/gossip/README.md`、`src/articles/index.md`、`src/learning/README.md`、`src/hobbies/snack.md`、`src/learning/japanese.md`、`src/hide/personal_details.md`、`src/farraginous/reciter.md`、`src/coding/Rust/index.md`（仅修死链）。
3. **禁区**：`src/hobbies/NSFW/comic.md` 内容禁止读取（其 frontmatter icon 已由脚本盲改写，`<ComicTable/>` 标签无需改动）；`src/hobbies/NSFW/videos.md` 可改标签但不读数据文件。
4. **HTML 注释里的旧组件标签不得转成 PascalCase**（构建期 island 扫描不识别注释，大写标签会在注释内被提取）。遇到时删除该注释内的标签行，或保留小写原样。
5. **代码围栏/行内代码里的旧标签原样保留**（构建期扫描会跳过围栏，如 `blog/log.md` 里的 `<OrderBadge`、`<ZoomedImg` 出现在 sed 脚本示例中，禁止改动）。
6. frontmatter 只保留 `date` / `category` / `tag` / `icon` / `feed` 五个键；icon 批量改写已完成，无需再动。
7. 收尾验证：`pnpm build` 全绿（死链检查会拦截坏的 `.md` 相对链接）；`pnpm check && pnpm lint && pnpm fmt:check`。

## 1. frontmatter icon —— 已完成，禁改

全站 158 个文件的 `icon:` 已按 `docs-migration/icons-mapping.md` 改写为 `solid/<name>` / `regular/<name>` / `brands/<name>` 全称 key；`NSFW/comic.md` 已盲改为 `solid/book-tanakh`。识别特征：

```bash
grep -rn --include='*.md' -E '^icon: (?!(solid|regular|brands)/)' src
```

应无输出（ fenced code 内的示例除外）。

## 2. `<template #xxx>` 列表组件 → ExpandableList（脚本为主）

> **历史记录。** 这六个列表页此后又整体切换到站点 xlist island（TS 数据 + `@@@` 插槽，`@@ meta` 行已移除），见 §9。本节的 meta 行/`@@@` 标题等规则对框架 `ExpandableList` 本身仍然有效。

覆盖组件：`GalList` / `BookList` / `AnimeList` / `JobList` / `SpeedupList` / `CryptocurrencyExchangeList`。

识别特征：

```bash
grep -rn --include='*.md' -E '<(GalList|BookList|AnimeList|JobList|SpeedupList|CryptocurrencyExchangeList)' src
```

剩余待转：0（`src/hobbies/anime.md` 的 AnimeList、`src/articles/money.md` 的 CryptocurrencyExchangeList 均已完成）。

### 2.1 用脚本转换

```bash
node utils/convert-xlist.mjs src/hobbies/anime.md          # 预览到 stdout
node utils/convert-xlist.mjs src/hobbies/anime.md --write  # 写回
```

脚本自动完成：按旧组件的默认排序输出全部数据行为 `@@@ 条目`；每个 `<template #名字>` 的内容原样填入同名条目；数据项的列信息（时长/区间/评分/状态等）生成 `@@ meta` 行；无插槽的数据行生成 meta-only 条目。

> **⚠️ 历史教训（2026-10 已修复）**：脚本警告 `slot "x" matches no data item (dropped)` 时按「旧站本就渲染不出来」丢弃是**错误假设**。旧 vue 组件按 `valid_name ?? name` 在渲染期查插槽，同名多条数据共用一个插槽；转换期匹配失败也可能只是名称漂移（如 廃村少女2→廢村少女2），丢弃会**丢失旧站实际展示的正文**。galgame 因此丢了 61+1 条评价，已用 `node utils/xlist-restore-slots.mjs --write` 从 code 分支模板全量找回（含 heimu/Badge/furigana → 现行标记的转换）。

转换后**必须手工补两件事**：

1. **删除 `<script setup>` 块**（只含旧组件/数据 import，转换后全部失效）：

   旧：
   ```md
   <script setup lang="ts">
   import BookList from "@BookList";
   import links from "@@book_list";
   </script>
   ```
   新：（整块删除，包括前后多余空行各留一个）

2. **数据里的相对链接补 `.html` 后缀**——只有 JobList/ArticleCell 类数据带站内相对 url；列表组件的数据 url 均为外链，脚本生成的 meta 无需处理。

### 2.2 GalList 完整改造示例（galgame.md 实录，128 插槽已全部按此转换）

旧（`<GalList>` 内 128 个 `<template #作品名>`，作品名 = 数据项的 `valid_name ?? name`）：

```md
<GalList>
<template #DRACURIOT>

我也忘了资源从哪来的……（原样保留的 md 内容）

- 列表也是原样

</template>
<template #次元凸破恋战姬>

- ……

</template>
</GalList>
```

新：

```md
<ExpandableList :columns='["游戏名","时长","游玩区间","剧情","画风","程序","感染力","备注"]'>

@@@ DRACU-RIOT!
@@  | 2026-09-24 ~ ? |  |  |  |  | 游玩中

我也忘了资源从哪来的……（原样保留的 md 内容）

- 列表也是原样

@@@ 次元凸破恋战姬
@@ （meta 行，由数据项生成）

- ……

@@@ 只有数据没有插槽的作品
@@ 23h | 2020.08 ~ 2020.09 | 8 | 7 | - | 8 | 已停止

</ExpandableList>
```

要点：

- `@@@ 标题` 单行纯文本；紧跟的 `@@ meta` 行是行内 markdown，渲染为表格行的 meta 列单元格。meta 只在 `@@@` 行的下一行生效，且每条最多一行。
- meta 用 `|` 切分成多列（`\|` 是转义竖线、行内代码里的 `|` 不切分）；不带 `|` 的单段 meta 渲染为单列，向后兼容。各行列数以全表最大值对齐，短的行由框架补空单元格。
- `:columns='["列头1", …]'`（JSON 数组）传入表头：第 1 项是标题列，其余依次对应 meta 分列；不传则不渲染表头行。本站 6 个列表均已传入（见 `utils/xlist-columns.mjs` 内 CONFIGS）。
- 列语义沿用旧 vue 组件的表格列（Gal：游戏名/时长/游玩区间/剧情/画风/程序/感染力/备注；Book：书名与作者/作者/阅读区间/时长/状态/标签/备注；Anime：番名/观看区间/备注；Job：公司/岗位/渠道/投递时间/状态；Speedup：游戏名/游戏引擎/存档格式/成功拆包加速；Crypto：名称/类型/大陆支付/大陆KYC/TV/海外节点/费率/官网）。无法归入固定列的内容（状态/#order/n刷/标签/链接等）进末尾「备注」列，段内顺序保持。
- 又名沿用旧站行为：只参与搜索、不展示。别名以 `<span hidden>…</span>` 留在「备注」列（多个用 `/` 连接），站内搜索靠单元格文本命中。
- 纯数字评分单元格沿用旧站规则：≥10 加粗显绿、≤0 显红。
- 条目顺序 = 旧组件默认排序（Gal：游玩中→中断→无状态→已停止，组内按结束日期降序；Book：在读→等待连载→中断→无状态→已停更→已放弃），脚本已复刻，手改时保持。
- 缺失值沿用旧表的 `-` / `?` 写法（空列直接留空，两个 `|` 之间不写内容）。
- meta 改写脚本：`node utils/xlist-columns.mjs <file.md> [--write]`（把旧的 `·` 串联 meta 切成 `|` 列并补 `:columns`；含条目数与段完整性校验）。
- `<ExpandableList>` 可选 props：`:searchable="false"`、`:sortable="false"`；本站不需要。

### 2.3 验证

```bash
grep -n '<template #\|<GalList\|<BookList\|<AnimeList\|<JobList\|<SpeedupList\|<CryptocurrencyExchangeList\|script setup' <file>
node utils/convert-xlist.mjs <file>   # 应报 no convertible list blocks
pnpm build                             # ExpandableList 条目在构建期独立渲染，坏 md 会直接报错
```

## 3. 已注册的站点 island（PascalCase 标签）

| island | 旧组件 | md 动作 |
| --- | --- | --- |
| `ExpandableList` | GalList/BookList/AnimeList/JobList/SpeedupList/CryptocurrencyExchangeList | 见 §2（后被 §9 的站点 island 取代） |
| `ArticleCell` | ArticleCell + RouterJumper | 数据内联为 JSON（§3.1） |
| `GalExhibitionGrid` | GalExhibitionGrid | 数据内联为 JSON（§3.2） |
| `Dated` | dated | 小写改大写（§3.3） |
| `Reciter` | reciter | `<reciter/>` → `<Reciter/>`，删 script 块 |
| `AvTable` / `ComicTable` | 同名组件 | **无需改动**（标签已是 PascalCase，数据在 island 内部 import） |
| `ZoomedImg` | ZoomedImg | **无需改动**（框架内建 island，md 原样使用；`alt`/`src`/`scale`/`:mask` 均框架支持） |
| `TelegramLink` / `RSSLink` | 同名组件 | 无 md 用法，无需处理 |

### 3.1 ArticleCell：`:box-data` 表达式 → 内联 JSON

识别特征：`grep -rn --include='*.md' 'ArticleCell' src`（剩余 0 个未转换）。

旧（`articles/index.md`，数据来自 alias `@@article`）：

```md
<ArticleCell :box-data="links" />

<script setup lang="ts">
import ArticleCell from "@ArticleCell";
import links from "@@article";
</script>
```

新（迁移期把 `src/.vuepress/data/article.ts` 的数组压成一行 JSON；站内相对 url 补 `.html`，外链原样）：

```md
<ArticleCell :box-data='[{"field":"Linux 相关","links":[{"text":"前言","url":"./linux/index.html"},{"text":"基础","url":"./linux/basic.html"}]},…]'/>
```

现状（迁移后收敛）：三个分区页都走数据模块——`<ArticleCell name="articles|learning|gossip" />`（island 内部 import `data/` 下对应模块，`name` 缺省为 articles）；这些模块同时是 navbar 对应下拉分区的唯一数据源（vite.config.ts `toSectionNavItems` 构建期派生 tweak items，框架校验链接并回填图标），增删分区/文章只改数据模块。

边界：

- 数据文件：`data/article.ts`（articles/index.md）、`data/gossip.ts`（gossip/README.md）、`data/learning.ts`（learning/README.md）。
- is 规则：url 无 scheme 且无扩展名 → 追加 `.html`；`http(s)://` 原样。
- JSON 用**单引号包属性**、内部全部双引号（island 属性解析规则：`:` 前缀 = JSON，值可用 `'…'` 包裹）。
- 数据里的中文键/值原样保留（JSON 支持 UTF-8）。

### 3.2 GalExhibitionGrid：`:items` 表达式 → 内联 JSON

旧（数据定义在同文件底部 `<script setup>` 里）：

```md
<GalExhibitionGrid :items="exhibition_data"/>
…
<script setup lang="ts">
const exhibition_data = [
  { text: "矛盾", alt: "水葬銀貨のイストリア", lnk: "https://vndb.org/v20471", src: "https://t.vndb.org/cv.t/98/116698.jpg" },
];
</script>
```

新（删除整个 script 块，数据压成一行）：

```md
<GalExhibitionGrid :items='[{"text":"矛盾","alt":"水葬銀貨のイストリア","lnk":"https://vndb.org/v20471","src":"https://t.vndb.org/cv.t/98/116698.jpg"}]'/>
```

仅 `src/hobbies/galgame.md` 使用（已完成）。

### 3.3 Dated：`<dated date="YYYYMMDD"/>` → `<Dated date="YYYYMMDD"/>`

识别特征：`grep -rn --include='*.md' '<dated ' src`（全部转换完成；`blog/log.md` 的两处在代码围栏内，**禁止改**）。

规则：

- 标签独占一行（前后空行）时直接改大写。
- **行内用法移到所在段落之后的独立行**（island 占位是块级 div，行内会截断段落）：

  旧：`（而且两年后的 AI 二次元图还过不了图灵测试。）<dated date="20241204"/>`
  新：
  ```md
  （而且两年后的 AI 二次元图还过不了图灵测试。）

  <Dated date="20241204"/>
  ```
- 日期格式 `YYYYMMDD` 原样传给 island（组件负责加连字符）。
- HTML 注释内的实例保留小写不动（见 §0.4）。

## 4. 纯 HTML 替换（无 island，行内安全）

以下模式全部出现在表格单元格/列表项等**行内上下文**，禁止用 island（island 占位是块级 div，会破坏表格）。用 sed 或手工替换；推荐命令：

```bash
sed -i \
  -e 's|<Badge text="\([^"]*\)" type="\([^"]*\)" */>|<span class="abs-badge" data-type="\2">\1</span>|g' \
  -e 's|<Badge type="\([^"]*\)" text="\([^"]*\)" */>|<span class="abs-badge" data-type="\1">\2</span>|g' \
  -e 's|<Badge text="\([^"]*\)" */>|<span class="abs-badge">\1</span>|g' \
  -e 's|<dtls>\([^<]*\)</dtls>|<details class="abs-dtls"><summary>点击展开</summary>\1</details>|g' \
  -e 's|<dtlslong>\(.*\)</dtlslong>|<details class="abs-dtlslong"><summary>\1</summary></details>|g' \
  -e 's|<furigana f="\([^"]*\)">\([^<]*\)</furigana>|<ruby>\2<rp>(</rp><rt>\1</rt><rp>)</rp></ruby>|g' \
  <file>
```

Badge 旧写法的 `/>` 前可能带空格（`<Badge text="x" type="y" />`），sed 模式用 `" */>` 兼容两种。`dtlslong` 的捕获用贪婪 `\(.*\)`：单元格内容可能含 `<br/>` 等标签，`\([^<]*\)` 会在第一个 `<` 处截断。

### 4.1 Badge / OrderBadge → `<span class="abs-badge">`

旧 → 新：

```md
<Badge text="工业" type="danger"/>   →  <span class="abs-badge" data-type="danger">工业</span>
<Badge text="特定个体"/>             →  <span class="abs-badge">特定个体</span>
<OrderBadge :order=2 />              →  <span class="abs-badge" data-type="warning">2</span>
<OrderBadge text="三刷" :order=3 />  →  <span class="abs-badge" data-type="danger">三刷</span>
```

OrderBadge 颜色映射（写进 data-type）：`1→tip`、`2→warning`、`3→danger`、`4→info`、其他→无 data-type（note 灰）。属性顺序两种都可能出现（`text` 在前或 `type` 在前），sed 已覆盖；其余属性顺序手工处理。

全部转换完成（art.md 3 处真实用法已处理；blog/log.md 在围栏内禁改）。

### 4.2 dtls（内联折叠）→ 原生 `<details>`

- **块级用法**（`<dtls alt="标题">` 后跟多行 md 内容再 `</dtls>`）→ 框架容器：

  旧：
  ```md
  <dtls alt="我不会自发学习这些语言">

  因为它们的各方面[都很烂](../gossip/fuckxxx.md)。

  </dtls>
  ```
  新：
  ```md
  ::: details 我不会自发学习这些语言
  因为它们的各方面[都很烂](../gossip/fuckxxx.md)。
  :::
  ```
  无 alt 时标题缺省为「点击展开」（`<dtls>` 单开一行即无 alt）。识别：`grep -rn --include='*.md' -E '<dtls[ >]' src`，`alt="` 存在 → 取其值做标题；多行内容必须走 `::: details`（details 原生标签无法承载多行块级 md）。

- **行内用法**（表格单元格内 `<dtls>内容</dtls>` 单行）→：

  ```md
  <details class="abs-dtls"><summary>点击展开</summary>内容</details>
  ```

### 4.3 dtlslong（两行截断点击展开）→ `<details class="abs-dtlslong">`

```md
<dtlslong>很长的评价文本</dtlslong>  →  <details class="abs-dtlslong"><summary>很长的评价文本</summary></details>
```

全部 37 处都是单行内容、表格单元格内，sed 一把过；`summary` 里是行内 markdown（粗体/删除线照常渲染）。全部转换完成。

### 4.4 furigana（注音）→ 原生 ruby

```md
<furigana f="たい">体</furigana>  →  <ruby>体<rp>(</rp><rt>たい</rt><rp>)</rp></ruby>
```

剩余 0 处（japanese.md、galgame.md 已完成）。新写法如再出现，按同款 sed 处理。

### 4.5 Av（番号外链）→ 行内 markdown 链接

`<Av bg="番号" />`（旧 Av.vue）渲染为 missav.ai 外链、文本为大写番号（`u` 属性追加 `-uncensored-leak` 后缀）。纯行内链接，转成普通 md 链接，不用 island：

```md
- <Av bg="fc2-ppv-3470313" />  →  - [FC2-PPV-3470313](https://missav.ai/fc2-ppv-3470313)
```

仅 `hobbies/NSFW/videos.md` 使用（14 处，已完成）；同文件底部 `import Av/AvTable` 的 `<script setup>` 块一并删除（`<AvTable />` 标签本身保留）。

## 5. 保留原样的透传写法（禁止转换）

| 写法 | 处理 | 原因 |
| --- | --- | --- |
| `<text style="color:red">…</text>`（84 处，多在 galgame.md） | 原样保留 | 未知元素 + 内联样式，浏览器按红色行内文本渲染，与旧站一致 |
| `<br>` / `<div class="subtitle">` / `<span style>` | 原样保留 | html: true 透传；`.subtitle` 样式在 site.css |
| 原生 `<details><summary>`（5 文件） | 原样保留 | 原生元素，浏览器直接渲染折叠 |
| `#:~:text=` 链接（3 处） | 原样保留 | 框架不动 URL hash，Text Fragment 有效 |
| 站内锚点 `./x.md#中文锚点` | 原样保留 | 框架 slug 与 VuePress 逐字一致，构建期自动重写为 `.html` |
| 图片 `=300x` / `=400x` 尺寸语法 | 原样保留 | 框架内建（markdown-it-imsize 双语法已启用；全站仅 src 侧写法，无 alt 侧旧式） |
| `::: tabs` / `::: code-tabs` + `@tab` / `@tab:active` / `::: tabs#id` | 原样保留 | 与框架语法完全一致（uno.md 的 29 个 `::: tabs#card` 无需动） |
 | ```` ```mermaid ```` 围栏（hide/personal_details.md） | 原样保留 | 框架客户端自动升级为 Mermaid island（含 YAML frontmatter title），无需改写 |
| `<iframe>` 于 `blog/withvuepress2.md`（2 处） | 原样保留 | 引用已不存在的 `/charts/animation.html`，是记叙旧站行为的史料，非真实图表 |
| `<VPIcon>` | 无 | 全站 0 使用 |

### 5.1 heimu 黑幕 —— 已替换为框架原生语法

旧写法三种形态：裸 `<heimu>x</heimu>`（75 处）、`<span class="heimu">x</span>` 与
`<span class="heimu" title="你知道的太多了">x</span>`（共 87 处，title 全部为默认文案）。
已全量替换为框架原生 `!!x!!`（50 个文件 162 处，脚本跳过 frontmatter / 围栏 / 行内代码）。
框架按页面 locale 在构建期烘焙默认悬浮提示（zh「你知道的太多了」/ en "You know too much"），
内部照常解析行内 markdown，样式与旧站 moegirl 黑幕一致（框架 theme.css）。

边界情况：

- 行内代码里的字面示例原样保留（如 `blog/withvuepress2.md` 记叙旧站用法处）。
- 内部含行内代码、删除线、HTML 透传（如 `<span class="abs-badge">`）的条目直接替换：
  `!!` 内部解析行为与旧 inline HTML 透传一致。
- 原生 `<details>` 块内不解析 markdown（html_block）：旧 HTML span 靠透传仍能渲染黑幕，
  `!!` 则必须处于 markdown 区域。summary 行与正文之间必须有空行（hide/memories.md
  有一处漏行已补）。

识别特征（应为 0 命中，代码示例除外）：

```bash
grep -rn --include='*.md' -E '<heimu[ >]|class="heimu"' src
```

## 6. iframe 图表 → G2Plot island

识别特征：`grep -rn --include='*.md' '<iframe' src`。全部转换完成（vpn 1 处、sports 3 处、rhythm_games 10 处）。

每个 iframe 的 `src="/charts/<name>.html"` 指向 `src/.vuepress/public/charts/<name>.html`——一个自包含的 G2Plot 页面。转换步骤：

1. 打开 chart html，提取 `const data = […]`（逐点原样）与 `new <Kind>("container", {…})` 的第二个参数（options）。
2. `Kind` 决定 island 的 `type`（`Line`→`line`、`Column`→`column`、`Pie`→`pie`、`Scatter`→`scatter`…）；`options.height` 取 **iframe 的 height 属性值**（与旧站嵌 ingress 的高度一致，不读 chart html 里的容器样式）。
3. 生成 island 标签（块级、独占一段）：

旧（`gossip/author.md`）：

```md
<iframe frameborder="no" src="/charts/sense_persentage_of_my_life.html" width="100%" height="280" loading="lazy"></iframe>
```

新：

```md
<G2Plot
  type="line"
  :data='[{"name":"感受艺术","时刻":"20220217","占比":69},…]'
  :options='{"xField":"时刻","yField":"占比","seriesField":"name","smooth":true,"legend":{"position":"top"},"slider":{"start":0,"end":1},"height":280}'/>
```

规则：

- `:data` / `:options` 都是 JSON，单引号包裹、压成一行（长 JSON 已由框架支持，属性解析窗口 64KB）。
- options 全量透传给 G2Plot 构造器：注释掉的选项可丢弃；`slider`/`legend`/`animation` 等原样保留；`data` 键不要写进 options（island 分开传）。
- 暗色主题由 island 自动处理（chart html 里的 `prefers-color-scheme` 样式块不需要搬）。
- 转换后原 iframe 行删除；public/charts/*.html 保留在仓库里不删（其他未转换页可能还在引用）。
- 图表数据必须与源文件**逐点一致**，禁止凭记忆重录。

### 6.1 数据变换与动态 options 的忠实求值

chart html 里常见两类 JS 逻辑，island 标签是纯 JSON、无法携带代码，必须在转换时**忠实求值成字面量**：

- **数据变换函数**（如 sports_times.html 的 `detimes(item, rate)`）：按函数逻辑对原始数据逐条计算出结果行，把结果数组原样内联进 `:data`。不得简化、抽样或重算。
- **引用 data 的 options**（如 `annotations` 的 `start: [data[0].时刻, "96"]`、`end: [data[data.length - 1].时刻, "96"]`，或 `slider` 的脚本计算值）：把表达式按数据实际取值求出具体标量，内联进 `:options`。上例求值后为 `"start":["20220530","96"]`、`"end":["20230921","96"]`（取该图数据的首/末行时刻）。

求值后的数字保留源文件的精度（浮点原样照抄，禁止四舍五入）。

### 6.2 相邻成对 iframe 之间补空行

旧 md 里两个 iframe 常常紧邻两行（如 rhythm_games.md 的 reform/malody 成对图）。转换后每个 `<G2Plot …/>` 是块级 island 占位，**相邻两个 island 标签之间必须留一个空行**，否则 markdown 把两个标签解析进同一段落，island 扫描与渲染都会出错。

## 7. `::: echarts` → G2Plot island

识别特征：`grep -rn --include='*.md' '::: echarts' src` —— 全站仅 1 处（`gossip/pc_hardware.md`），**已转换完成**，作为样例：

旧（echarts option：dataset.source + 每系列自带 data）：

````md
::: echarts

```js
const option = {
  xAxis: { type: "value", name: "CPU 功耗 (w)" },
  series: [{ name: "5950X", type: "line", data: [[90, 11650], …] }, …],
};
```

:::
````

新：

```md
<G2Plot
  type="scatter"
  :data='[{"cpu":"5950X","功耗":90,"hashrate":11650},…]'
  :options='{"xField":"功耗","yField":"hashrate","seriesField":"cpu","meta":{"功耗":{"alias":"CPU 功耗 (w)"},"hashrate":{"alias":"randomx hashrate (h)"}},"legend":{"position":"top"},"height":500}'/>
```

映射要点：echarts 的 `xAxis.name`/`yAxis.name` → G2Plot `meta.<field>.alias`；`series[].name` → 数据行的分组字段（`seriesField`）；逐系列 `data` 数组平铺成对象数组，数值原样。echarts 特有能力（encode/symbol）G2Plot 无对应时允许降级（该例用 scatter 替代平滑折线）。

## 8. 收尾检查清单（每个文件）

```bash
# 旧组件标签清零（除本文「保留」列表）
grep -n -E '<(GalList|BookList|AnimeList|JobList|SpeedupList|CryptocurrencyExchangeList|dated |furigana|dtls[ >]|dtlslong|reciter|OrderBadge|Badge)' <file>
# 旧 alias import / script 块清零
grep -n -E '<script setup|@@(article|gossip|learning|job_list|book_list|anime_list|galgame_list)' <file>
pnpm build     # 全站构建 + 死链检查
```

构建警告中「未知 HTML 标签透传」类信息可忽略（text 等有意保留）；试点文件不允许出现 island JSON 解析错误或死链。

## 9. 列表页第二阶段：ExpandableList → 站点 xlist island（C-slot，已完成）

六个列表页（galgame/books/anime/job/money/speedup）在 §2 迁到框架 `ExpandableList` 后，又整体切换为站点自有 island（`islands/xlist/`）。目标架构：

- **meta 列只活在 TS 数据模块**（`src/.vuepress/data/*_list.ts`，唯一活数据源）；列语义、默认排序、badge/评分着色等展示逻辑在站点组件里。
- **markdown 只保留 `@@@ <slot-key>` 插槽正文**，不再有 `@@ meta` 行与 `:columns` 属性。
- 构建期由框架 entry-list 管线（`vite.config.ts` 的 `entryListIslands` 名单）渲染静态表格骨架（无 JS/SEO 降级），客户端组件解析骨架 + TS 数据重建完整表格。

md 侧现状（6 页 383 条）：

| island | 页面 | 条目 |
| --- | --- | --- |
| `<GalList>` | hobbies/galgame.md | 183 |
| `<BookList>` | hobbies/books.md | 105 |
| `<AnimeList>` | hobbies/anime.md | 45 |
| `<JobList list="job_list_2024_autumn">` / `…spring">` | gossip/job.md | 17（两块） |
| `<CryptoList>` | articles/money.md | 8 |
| `<SpeedupList>` | articles/speedup.md | 25 |

slot key 规则：`valid_name ?? name`（speedup 用 `valid_name`、job 用 `name`），重名自动加 `#k` 后缀；规则单一来源 `islands/xlist/slotKey.ts`，组件与脚本共用同一模块，禁止在别处复刻。

交互行为（`islands/xlist/XList.tsx`，六个 island 共用）：搜索框 + 表头点击排序 + 行展开，**没有排序下拉，也没有 全部展开/收起 按钮**。可排序列 = 标题列（升→降→默认循环）+ 数值列（`scoreCell` 写入 `sortValue`，galgame 的 剧情/画风/程序/感染力；降→升→默认循环，复刻老 SortIndicator），未评分（`-`）条目在两个方向上都沉底；数值列的判定是「整列每个单元格要么有 `sortValue` 要么是空占位」，因此新 island 想加数值排序只需用 `scoreCell` 建列。`AvTable`/`ComicTable` 传 `sortable={false}` 时表头退回纯文本。

工具栏另有一组排除过滤器（`XListProps.filters` + `XListItem.filterFlags`，纯数据驱动、无谓词函数）：勾选某项即隐藏 `filterFlags` 带对应 id 的行，计数仍显示 可见/全量；目前仅 galgame 使用（复刻旧 GalList 的「仅显示严格定义的 galgame」checkbox，flag `not_strict`，tooltip 保留旧 hint 文案）。

> galgame 有 62 条评价正文曾在 §2 的转换中被误丢，2026-10 已从 code 分支 `<template>` 恢复（`utils/xlist-restore-slots.mjs`，可重复运行：只填空 slot，不动已有正文）。

`AvTable`/`ComicTable` 同期重写为同一 xlist 表格的 plain 模式（无搜索/排序/展开，数据全部在 island 内部 import），md 标签与数据文件零改动。

### 9.1 日常增改条目

1. TS 数据模块加/改记录（meta 列由它渲染）。
2. md 里加/改 `@@@ <slot-key>` 段，key 必须与组件按数据算出的完全一致。
3. `node utils/xlist-sync.mjs [page]` 校验两侧同步（条目数 + key 序列；漂移即退出码 1）。
4. 漂移的行为：数据有 md 无 → 条目照常渲染、无正文；md 有数据无 → 运行时 console.warn `slot "x" matches no data item (dropped)`，该段丢弃。`node utils/xlist-to-slots.mjs [page] --write` 可按当前数据全量重建 6 页 slot（一次性迁移脚本，重跑前先回退 md）。

### 9.2 验证

```bash
node utils/xlist-sync.mjs                # 应报 all pages in sync（383 slots）
pnpm build && node utils/xlist-e2e.mjs   # 水合/搜索/排序/展开 e2e（截图落 dist-shots/，勿提交）
```

