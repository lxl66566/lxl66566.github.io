---
date: 2024-03-02
icon: markdown
category:
  - 编程
tag:
  - 编程语言
---

# MDX

试用 MDX 的起因是想尝试基于 MDX 的文档，因为据说其与 vuepress 一样具有很高的可扩展性。但 [mdxjs](https://mdxjs.com/) 的文档非常傻逼，因此我将尝试按照我自己的观点来讲 MDX。

说实话，MDX 里面的东西太少，甚至可能不足以开一篇博文专门介绍。。这个页面大概只是我的怨念凝聚吧。

## 几句话

我尝试用几句话解释完 MDX。

1. 你可以在 MDX 正文里直接使用 [markdown](../articles/markdown.md) 语法 & jsx 语法。
2. jsx 函数需要 export.
   - 返回值的普通 js 函数：用花括号调用。
   - 返回 DOM 的 jsx 函数：用 DOM 标签调用，函数中参数和使用都需要花括号。
3. MDX 本身也可以被当成 DOM 组件调用。

## example

### 简单小例子

```jsx
<!-- 普通 js 函数 -->
export function e(s) {
  return btoa(s);
}

<!-- jsx 函数，开头需要大写 -->
export function E2({ s }) {
  return <>{btoa(s)}</>;
}

##### btoa {e("123456")}

<E2 s="123456" />
```

效果：

::: details

##### btoa MTIzNDU2

MTIzNDU2

:::

### 现实使用

```jsx
export function MyTableComponent({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>名字</th>
          <th>课程</th>
          <th>打分</th>
          <th>评价</th>
          <th>联系方式</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.course}</td>
            <td>{item.grade}</td>
            <td>{item.evaluation}</td>
            <td>{item.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

# hello

<MyTableComponent
  data={[
    {
      name: "John Doe",
      course: "Mathematics",
      grade: "A",
      evaluation: "Excellent student",
      contact: "123-456-7890",
    },
    {
      name: "Jane Smith",
      course: "Science",
      grade: "B",
      evaluation: "Good effort",
      contact: "987-654-3210",
    },
  ]}
/>

```
