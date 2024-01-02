import{_ as n,o as s,c as a,e as t}from"./app-34ce8aff.js";const p={},e=t(`<h1 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> test</h1><p>这是一个隐藏的测试页面，用于测试博客的一些新功能。</p><p>::: chart test</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
	type<span class="token operator">:</span> <span class="token string">&quot;line&quot;</span><span class="token punctuation">,</span>
	data<span class="token operator">:</span> <span class="token punctuation">{</span>
		labels<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
		datasets<span class="token operator">:</span> <span class="token punctuation">[</span>
			<span class="token punctuation">{</span>
				label<span class="token operator">:</span> <span class="token string">&quot;My First Dataset&quot;</span><span class="token punctuation">,</span>
				data<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><p>::: echarts title</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>myChart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;原分数&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;映射分数&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;line&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>`,8),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","test.html.vue"]]);export{r as default};
