---
date: 2023-03-20
icon: markdown
category:
  - 教程
---

# Markdown

> 本文章写于早期，质量并不高，建议阅读其他教程。

Markdown 是被广泛使用的轻量级标记语言。

推荐教程：[younghz.github.io/Markdown/](http://younghz.github.io/Markdown/)

## 速查

标题：1-6 个 `#` 加空格加标题。`#` 数量对应标题等级（大小）。例如：

`### 这是三级标题`

### 这是三级标题

---

换行：多给一个空行，或者在末尾加两个空格再换行。有些 Markdown 渲染器可能不需要。

---

引用：
\> 一级引用
\>\> 二级引用

> 一级引用
>
> > 二级引用

---

代码块[^1]：（部分渲染器有语法高亮功能，可以在头部的 \`\`\` 后加上语言。）
[^1]: 本博客的代码块功能颇多，详见[此处](https://theme-hope.vuejs.press/zh/cookbook/vuepress/markdown.html#代码块)

\```python<br/>
print("123")<br/>
\```

```python
print("123")
```

---

分割线：连续的三个 `*` 或者 `_`

---

列表（注意符号后面要有一个空格）：

```markdown
- 无序列表 1
- 无序列表 2
  - 前面加 Tab 可分级
    - 再分级

1. 有序列表 1
2. 有序列表 2 3. 有序列表 3
```

- 无序列表 1
- 无序列表 2
  - 前面加 Tab 可分级
    - 再分级

1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

---

文本样式

<!-- prettier-ignore -->
|样式|样例|效果|
| :--: | :--: | :--: |
|斜体|`*斜体*`|*斜体*|
|粗体|`**粗体**`|**粗体**|
|删除线|`~~删除~~`|~~删除~~|
|标记|\`等宽标记\`|`等宽标记`|
|链接|`[百度](https://www.baidu.com/)`|[百度](https://www.baidu.com/)|
|图片|`![加载失败时显示此处文字](https://s2.loli.net/2023/03/20/bn4zcdBPgXKq5DH.jpg)`|![加载失败时显示此处文字](https://s2.loli.net/2023/03/20/bn4zcdBPgXKq5DH.jpg)|
|转义|`\*不是斜体\*`|\*不是斜体\*|

---

表格：

<!-- prettier-ignore -->
```markdown
|靠左内容|居中内容|靠右内容|
| :- | :-: | -:|
|L|M|R|
```

<!-- prettier-ignore -->
|靠左内容|居中内容|靠右内容|
| :- | :-: | -:|
|L|M|R|

---

## 其他

1. 有时候没有渲染出想要的效果，不妨前后加个空格或空行试试。
2. Markdown 支持 HTML，所以也可以进行如下操作：

```markdown
<div style="text-align: center">居中</div>
<text style="color:red;">红色字体</text>
强制添加空格&nbsp;&nbsp;&nbsp;&nbsp;，&lt;尖括号&gt;
```

<div style="text-align: center">居中</div>
<text style="color:red;">红色字体</text>

强制添加空格&nbsp;&nbsp;&nbsp;&nbsp;，&lt;尖括号&gt;

## external

1. [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
