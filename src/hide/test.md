# test

这是一个隐藏的测试页面，用于测试博客的一些新功能。

::: chart test

```json
{
	type: "line",
	data: {
		labels: [1,2],
		datasets: [
			{
				label: "My First Dataset",
				data: [3,4],
			},
		],
	},
};
```

:::

::: echarts title

```js
myChart.setOption({
  xAxis: {
    name: "原分数",
  },
  yAxis: {
    name: "映射分数",
  },
  series: [
    {
      data: [
        [1, 2],
        [2, 3],
      ],
      type: "line",
    },
  ],
});
```

:::
