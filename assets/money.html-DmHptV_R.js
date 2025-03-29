import{E as m}from"./ExpandableListItem-BJT5w4WO.js";import{g as s,h as g,_ as p,o as t,c as i,i as d,n as f,t as l,f as x,u as b,a as u,d as e,w as A,b as E,F as y,j as v,p as w,k,r as h,e as o}from"./app-kshw7BBZ.js";const T=s({__name:"Explain",props:{explanation:{},position:{default:"top"}},setup(B,{expose:D}){D();const n=B,F=g(!1),a={props:n,showTooltip:F};return Object.defineProperty(a,"__isScriptSetup",{enumerable:!1,value:!0}),a}});function X(B,D,n,F,a,r){return t(),i("span",{class:"explain",onMouseenter:D[0]||(D[0]=C=>F.showTooltip=!0),onMouseleave:D[1]||(D[1]=C=>F.showTooltip=!1)},[d(B.$slots,"default",{},void 0,!0),F.showTooltip?(t(),i("div",{key:0,class:f(["tooltip",{"tooltip-top":F.props.position==="top"}])},l(F.props.explanation),3)):x("v-if",!0)],32)}const S=p(T,[["render",X],["__scopeId","data-v-a1716b23"],["__file","Explain.vue"]]);var c=(B=>(B.CEX="CEX",B.DEX="DEX",B))(c||{});const K=s({__name:"CryptocurrencyExchangeList",setup(B,{expose:D}){D();const a={ExchangeType:c,boolToString:r=>r===void 0?"-":r?"✅":"❌",data:[{name:"欧易 OKX",valid_name:"欧易",url:"https://www.okx.com/join/48817502",exchange_type:"CEX",大陆支付方式:!0,允许大陆KYC:!0,TradingView:!0,海外节点兼容性:"极好",基础合约手续费:{挂单:.02,吃单:.05}},{name:"币安",url:"https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00ERNEBHOA",exchange_type:"CEX",大陆支付方式:!0,允许大陆KYC:!0,TradingView:!0,海外节点兼容性:"差",基础合约手续费:{挂单:.02,吃单:.05}},{name:"MEXC",exchange_type:"CEX",大陆支付方式:!1,允许大陆KYC:!1,TradingView:!0,海外节点兼容性:"差",基础合约手续费:{挂单:.01,吃单:.04}},{name:"Gate.io",valid_name:"gateio",exchange_type:"CEX",大陆支付方式:!1,允许大陆KYC:!1,TradingView:!0,海外节点兼容性:"一般",基础合约手续费:{挂单:.02,吃单:.05}},{name:"bybit",exchange_type:"CEX",大陆支付方式:!1,允许大陆KYC:!0,TradingView:!0,海外节点兼容性:"差",基础合约手续费:{挂单:.02,吃单:.055}},{name:"火币 htx",valid_name:"htx",url:"https://www.htx.com/invite/zh-cn/1f?invite_code=bwca9223",exchange_type:"CEX",大陆支付方式:!0,允许大陆KYC:!0,TradingView:!0,海外节点兼容性:"好",基础合约手续费:{挂单:.02,吃单:.05}},{name:"hyperliquid",url:"https://app.hyperliquid.xyz/",exchange_type:"DEX",大陆支付方式:!1,TradingView:!0,海外节点兼容性:"极好",基础合约手续费:{挂单:.01,吃单:.035}}],useSlots:b,ExpandableListItem:m,Explain:S};return Object.defineProperty(a,"__isScriptSetup",{enumerable:!1,value:!0}),a}}),O=B=>(w("data-v-1353a868"),B=B(),k(),B),V=O(()=>u("th",null,"名称",-1)),I={key:0},P=["href"];function z(B,D,n,F,a,r){return t(),i("div",null,[u("table",null,[u("thead",null,[u("tr",null,[V,u("th",null,[e(F.Explain,{explanation:"CEX（中心化交易所 或 DEX（去中心化交易所）"},{default:A(()=>[E("类型")]),_:1})]),u("th",null,[e(F.Explain,{explanation:"支持支付宝、微信、大陆银行卡中的任意一项"},{default:A(()=>[E("大陆支付方式?")]),_:1})]),u("th",null,[e(F.Explain,{explanation:"使用大陆身份证可以通过身份验证"},{default:A(()=>[E("允许大陆KYC?")]),_:1})]),u("th",null,[e(F.Explain,{explanation:"一个好用的看盘工具，必备"},{default:A(()=>[E("TradingView?")]),_:1})]),u("th",null,[e(F.Explain,{explanation:"用户的海外 IP 地址支持。本人主要看重日本和香港节点的支持度"},{default:A(()=>[E("海外节点兼容性")]),_:1})]),u("th",null,[e(F.Explain,{explanation:"挂单 ~ 吃单，这里记录的是没有任何交易量的新人手续费"},{default:A(()=>[E("基础合约手续费")]),_:1})])])]),u("tbody",null,[(t(),i(y,null,v(F.data,C=>e(F.ExpandableListItem,{expandable:F.useSlots()[C.valid_name??C.name]!=null},{"list-content":A(()=>[u("td",null,[C.url?(t(),i("a",{key:1,href:C.url,target:"_blank"},l(C.name),9,P)):(t(),i("span",I,l(C.name),1))]),u("td",null,l(C.exchange_type),1),u("td",null,l(F.boolToString(C.大陆支付方式)),1),u("td",null,l(F.boolToString(C.允许大陆KYC)),1),u("td",null,l(F.boolToString(C.TradingView)),1),u("td",null,l(C.海外节点兼容性),1),u("td",null,l(C.基础合约手续费.挂单+"% ~ "+C.基础合约手续费.吃单+"%"),1)]),"expanded-content":A(()=>[d(B.$slots,C.valid_name??C.name,{},void 0,!0)]),_:2},1032,["expandable"])),64))])])])}const L=p(K,[["render",z],["__scopeId","data-v-1353a868"],["__file","CryptocurrencyExchangeList.vue"]]),N=s({__name:"money.html",setup(B,{expose:D}){D();const n={get CryptocurrencyExchangeList(){return L}};return Object.defineProperty(n,"__isScriptSetup",{enumerable:!1,value:!0}),n}}),q=o('<h1 id="理财-加密货币与区块链" tabindex="-1"><a class="header-anchor" href="#理财-加密货币与区块链"><span>理财，加密货币与区块链</span></a></h1><p>或许跟我的教育有一些关系，我一直很重视金钱观念。这里将会放一些我的理财记录和加密货币心得。</p><h2 id="历史" tabindex="-1"><a class="header-anchor" href="#历史"><span>历史</span></a></h2><details class="hint-container details"><summary>早期回忆</summary><p>小时候的我还挺悲惨的，压岁钱被大人拿去“保管”，零花钱也要做家务赚。不过这也促进了我的金钱观的形成。</p><p>最早接触理财是小学的时候，那时候还在用存折。一段时间后去银行存取钱，上面会打印一项“利息”，虽然只有几分钱，但是至少让我知道，钱是会增值的。基于此现象，我也去了解了通货膨胀等概念。</p><p>过了一阵子，小学开始搞“爱心账户”，鼓励家长存一笔钱到邮政银行，把利息当成捐款捐给有需要的人。家长给我存了 100，然后学校给捐款的小朋友在公众场合发了证书。现在想起来自己也太善良了，而且小学这样的举动是隐式强迫，因为没有捐款的家庭和孩子会无意识间被差别对待。</p><p>然后就知道了活期存款利率很低，定期存款利率高，所以把自己平常存的钱存入了定期。小学的理财方式也就只有这些了。</p><p>对了，想起来小学有一次校外活动，去郊区的中国银行参加了一个认识理财模拟投资的活动。就是那一次活动，让我认识到活期，定期，基金，股票，保险这五种理财名词及其特点。</p></details><h3 id="余额宝-零钱通" tabindex="-1"><a class="header-anchor" href="#余额宝-零钱通"><span>余额宝/零钱通</span></a></h3>',5),Y=o('<p>从初中到现在大学毕业，我的余额宝里都有一笔不算多的钱，用作活期资金。支付宝开通了自动转入余额宝，我根本就不需要去管，非常自在。</p><p>不过在大学期间，余额宝的收益率变化很大。我有几次更换产品，换到了其他利率更高的基金，结果发现每一个基金都不能长期维持高利率，一段时间后利率都会下跌。并且更换产品会丢失几天的利息，算下来甚至亏得更多，我很讨厌。</p><p>并且这段时间余额宝的利率一直在降低。到了 2025 年，余额宝的利率已经降到了年化 1.2%，实在是太低了。因此我不再将余额宝作为一个理财方式。</p><p>微信零钱通是后来模仿余额宝的同性质的产品。利率也都差不多，这里不再多说。</p><h3 id="黄金" tabindex="-1"><a class="header-anchor" href="#黄金"><span>黄金</span></a></h3><p>高中毕业的暑假，我使用支付宝购买黄金理财。支付宝啥都能买，确实方便。当时的金价才 366/g。之后俄乌战争时又加仓了一次，现在已经涨到 679/g 了，我还是打算再多留一留。</p><h3 id="基金" tabindex="-1"><a class="header-anchor" href="#基金"><span>基金</span></a></h3><p>买入黄金的同时我也在尝试基金。凭着高中那点贫乏的认知和信息量，我买了一些“感觉有看头”的基金板块，然后没有任何悬念地亏了。于是我再也不碰基金。</p><h3 id="债券" tabindex="-1"><a class="header-anchor" href="#债券"><span>债券</span></a></h3><p>还是高中暑假，去开了个证券账户，专门用于认购新债和国债。因为收益和风险综合因素我并没有从事正常的债券交易。新债就是抽签认购，正式发行后卖掉，平均能拿到 20% 收益。不过抽签看概率，这玩意概率不算大，并且一次限量 1000 元，因此赚得不多。</p><p>国债逆回购是我的处理“新债未中签的剩余资金”的手段，0 风险的债券，收益比余额宝高一点，高出不到年化 1%。节假日前国债的收益会增多一些。</p><p>然而后来疫情期间及其后，新债就变得非常少。同时，与余额宝利率下降相同，2025 年国债的利率也降低了许多；并且这玩意不像余额宝那样放着不用管：国债必须每个周期去手动买，也不能当活钱花。因此我退出。</p><h2 id="加密货币交易" tabindex="-1"><a class="header-anchor" href="#加密货币交易"><span>加密货币交易</span></a></h2><p>2025 年年初，因为国内环境利率下降得过于厉害，以 v2ex 一个帖子作为契机，我入坑了加密货币。</p>',14),M=o('<h3 id="前置知识" tabindex="-1"><a class="header-anchor" href="#前置知识"><span>前置知识</span></a></h3><ul><li>由于<a href="https://www.gov.cn/zhengce/zhengceku/2021-10/08/content_5641404.htm" target="_blank" rel="noopener noreferrer">中国将加密货币交易定为非法</a>，加密货币的兑换有一些困难。加密货币的充值与提现一般使用 C2C 交易，也就是找到一个和你意愿相反的人（你买他卖或反之）进行两手交易。一般情况下这是够的，但是数额过大时可能需要肉身出国，去香港/日本这些加密货币合法的国家或地区进行提现。网上有很多攻略，这里不再赘述。 <ul><li>虽然 C2C 理论上可以绕过监管，但是支付宝和微信在遇到疑似这样的 C2C 交易时会警告。因此尽量减少交易频率，极端的话应该将加密货币交易隐藏在多单普通转账之中。</li></ul></li><li>USDT 是最广泛使用的稳定币，1:1 兑换美元，常常用来做加密货币交易的中间币种与合约本位。USDC 是另一家机构的稳定币，监管更好，安全性更高，但是推出时间靠后，市场流动性较低。</li><li>加密货币价值来源于共识。因此不要投山寨币，因为他们的共识不够稳定，风险太大。包括感兴趣的话可以了解一下 Luna “算法稳定币”的暴雷历史。</li><li>加密货币交易是零和博弈，本质与赌博相近。要做理智的投资者，<a href="https://zhuanlan.zhihu.com/p/614267699" target="_blank" rel="noopener noreferrer">不要做赌徒</a>。</li><li>股市和加密货币的相关性：正相关，如果加密货币投资者受到股市惊吓，也会选择抛售。例如 Deepseek 爆火当天，NVIDIA 暴跌带动加密货币小跌。（不过恢复得也很快）</li></ul><h3 id="交易所" tabindex="-1"><a class="header-anchor" href="#交易所"><span>交易所</span></a></h3><p>使用中心化交易所是必须的，只有中心化交易所才可以在法币（人民币）和加密货币中进行交换。在获得加密货币资产后，玩家就可以任意选择中心化（CEX）或去中心化（DEX）交易所了。</p>',4),j=u("p",null,"全中文支持，C2C 支持支付宝和微信，优秀的前端 UI，还有深度技术的 web3 项目。",-1),H=u("ul",null,[u("li",null,"老牌交易所，但是自从赵长鹏出事后我就对其印象不佳。"),u("li",null,"入坑加密货币后注册过，结果不支持日本 IP，更换 IP 后还说 IP 存在风险，无法开通合约账户，需要 KYC 验证。直接跑路。")],-1),Z=u("ul",null,[u("li",null,"现货费率很低，但是要求 KYC，不支持中国地区。")],-1),R=u("ul",null,[u("li",null,"TradingView 不适配黑夜模式"),u("li",null,"有网页卡死的情况"),u("li",null,"身份验证中出现无法识别身份证，未知原因认证失败的情况。")],-1),U=u("ul",null,[u("li",null,"全球第二大的交易所，活动多，还有虚拟卡能用。但是不支持香港地区。"),u("li",null,"2025 年初发生了 ETH 被盗事件。")],-1),$=u("ul",null,[u("li",null,"也对大陆用户友好，但是我个人没啥好感。"),u("li",null,"页面优化稍差"),u("li",null,"策略机器人只有网格，太少了")],-1),G=u("ul",null,[u("li",null,[E("2024 年火爆的"),u("strong",null,"去中心化"),E("交易所。需要把法币换成 USDC，提币到钱包再转到 hyperliquid 内。")]),u("li",null,"优点是费率低，并且可以高回报地跟单。"),u("li",null,"有一些 bot 带单的我觉得非常值得尝试。（与其自己研究不如直接吃成果，对方拿分成，winwin）"),u("li",null,[E("去中心化交易所还是有点问题，2025 年初"),u("a",{href:"https://www.panewslab.com/zh/sqarticledetails/kbpj88hq.html",target:"_blank",rel:"noopener noreferrer"},"两次被攻击"),E("。")])],-1),J=o('<h4 id="奖励与活动" tabindex="-1"><a class="header-anchor" href="#奖励与活动"><span>奖励与活动</span></a></h4><p>交易所会经常发关于新币和活动的公告，可以关注一下：</p><ul><li><a href="https://www.okx.com/zh-hans/help/section/announcements-latest-announcements" target="_blank" rel="noopener noreferrer">OKX 公告</a><ul><li>我自己用 RSSHub 做了 <a href="https://docs.rsshub.app/zh/routes/finance#%E6%AC%A7%E6%98%93-okx" target="_blank" rel="noopener noreferrer">OKX 的公告订阅</a>，欢迎使用。</li></ul></li></ul><h3 id="开始交易" tabindex="-1"><a class="header-anchor" href="#开始交易"><span>开始交易</span></a></h3><p>交易前有一些基础知识，建议搜索学习。</p><ul><li>区块链与挖矿相关知识</li><li>现货，合约与期权 概念+原理</li><li>买入和卖出，杠杆、做多和做空</li><li>术语：仓位相关</li></ul><p>新手建议：</p><ul><li>先玩小额小杠杆，摸一摸交易所的操作。别搞太大，并且要有亏的心理预期（一下亏好多还是有点难受的），保持理性。</li><li>先玩 BTC, ETH, SOL 三大币，小币种之后再说。 <ul><li>主要小币种的涨势/跌势是没有道理、没有极限、没有稳定性的。</li><li>即使是三大币种也有相当高的稳定性差距，BTC 的稳定性和后面那两个不是同一个等级的，更不容易爆仓。</li></ul></li><li>关注币圈资讯，了解最新动向。 <ul><li><a href="https://t.me/ChannelPANews" target="_blank" rel="noopener noreferrer">ChannelPANews</a></li></ul></li><li>注意投资的比例管理。经历了几次惨痛的教训后，我建议将大部分钱留在 0 风险的简单赚币里吃利息，只拿出 30% 左右的金额进行合约或现货买卖。一次性投入过多钱进行交易的后果就是遇到抄底机会时手头资金不足，错过机会。</li></ul><h4 id="现货-vs-合约" tabindex="-1"><a class="header-anchor" href="#现货-vs-合约"><span>现货 vs 合约</span></a></h4><p>现货交易中不存在杠杆（其实有，不过杠杆是通过“借币”的形式实现的，而不是真正意义上的杠杆）。相比之下，合约交易允许使用杠杆，使得你可以用较少的资金撬动更大的利益。此外，现货交易的手续费通常是合约交易的两倍左右。因此，我建议主要进行合约交易。</p><p>然而，现货交易在某些情况下具有优势，例如当你需要<strong>加密货币本身</strong>时。比如你可能需要 ETH 来进行质押，或者需要 SOL 来购买 NFT。不过，对于加密货币的新手和投机者，这些选项可以暂时不予考虑。</p><p>合约交易时千万要记住：<strong>小心爆仓</strong>。由于整个币圈是恐惧与贪婪并存的，一旦遇上契机，暴涨/暴跌会被放大，价格变化远比想象中要大。因此一定要谨慎设置杠杆与止损，确保预估强平价是合理的。</p><h4 id="做多-vs-做空" tabindex="-1"><a class="header-anchor" href="#做多-vs-做空"><span>做多 vs 做空</span></a></h4><p>做空和做多看起来平等，但是做空的性价比实际上是不如做多的。</p><ol><li>理论（不考虑杠杆）：做空最大盈利一倍，而做多最大盈利为正无穷。 <ul><li>做空就是向交易所借货币而立即卖成钱，然后在币价下降时买入等量货币还给交易所。极限一点，币价跌到 0，无需还币给交易所，但是盈利也就只有借来的那么多钱。</li></ul></li><li>大部分的资金都在现货交易，而交易所不允许普通用户现货做空。</li></ol><p>不过理论是理论，实际是实际，也不要被理论限制了做空的步伐。</p><h3 id="手动交易" tabindex="-1"><a class="header-anchor" href="#手动交易"><span>手动交易</span></a></h3><p>手动交易的策略一搜一大把，网上太多高人指点了，自行分辨正确与否。一般人用得比较多的有：</p><ul><li>各种均线的组合：比较简单的有 MACD、三重移动平均，复杂的有看 6、7 条均线的关系的。</li><li>机构数据 <ul><li><a href="https://www.coinglass.com/zh" target="_blank" rel="noopener noreferrer">coinglass</a></li></ul></li><li>新闻：美国公布的数据、政策会影响币价。而在公布前，由于未来走势的不确定性，很多人会选择把币换成钱先观望，这时就会先跌一波。</li></ul><h4 id="止盈止损" tabindex="-1"><a class="header-anchor" href="#止盈止损"><span>止盈止损</span></a></h4><p>手动交易里，为自己的每一笔订单设置止盈止损是很重要的 <s>（你也不想在呼呼大睡的时候爆仓吧）</s>。具体的止盈止损怎么划定，一般是看压力位 + 经验与手感 + 你想做长线还是短线。前期多投小额试水是有用的，可以积攒很多止盈止损的手感。</p><p>我习惯 OKX 里直接在下单 K 线图上拖出止盈止损线，这样比较直观，也是我说“手感”的由来。</p><h3 id="策略交易" tabindex="-1"><a class="header-anchor" href="#策略交易"><span>策略交易</span></a></h3><p>如果你的风险承受能力很低，或者平常没有时间一直盯盘，一定要试试策略交易。一般交易所会提供一些开箱即用的免费策略。</p><h4 id="网格" tabindex="-1"><a class="header-anchor" href="#网格"><span>网格</span></a></h4><p>交易所策略里，我最喜欢的就是合约网格了。合约网格简直是永远的神，用最简单的算法捞到最强的收益/风险比。网格的原理很简单，向上突破则做空，向下跌破则做多，所以只要货币价格在一定范围内振荡，网格策略就一定会赚。</p><ul><li>根据网格的原理，我们需要投价格变动较大的币种。（但是要小心爆仓）</li><li>OKX 的网格可以选择 <em>做空网格</em>，<em>做多网格</em> 和 <em>中性网格</em>。区别是入场时是否持有空仓/多仓。一般来说，短期网格选中性即可；长期网格需要自行判断做多和做空，它们带有明确的倾向性，风险与下场做空/做多差别不大，需要注意。</li><li><s>网格碰上小币种说不定会亏，但是做三大币种几乎是稳赚。</s>（打脸了）</li><li>网格区间的设置： <ul><li>短期网格一般设为日 k 线穿过挂单线 20 次以上，一日套利 10 次以上的值。OKX 可以打开挂单线进行估算，其实它给的 AI 参数就挺好的。</li></ul></li><li>关于减小风险： <ul><li>玩策略不用太纠结于两三天的得失，至少也得等 10 天后再看收益。当然，如果策略的杠杆开比较高（10x-20x），可以经常看看 <em>预估强平价</em>，跟币价波动做个对比，如果感觉怕了就补点保证金。</li><li>如果做小币种网格，还可以把等差网格换成等比网格，进一步降低风险。</li><li><blockquote><p>20250203 ETH 暴跌 30%，把我爆了。所以之后我更加注意杠杆倍率和网格区间，更愿意做小倍率宽区间网格，并且配合马丁格尔预设兜底回血。</p></blockquote></li></ul></li></ul><p>我现在已经把普通做多/做空单换成对应趋势的网格挂单。这样做的优点有：</p><ul><li>能够吃到波动收益。</li><li>手动交易经常出现 <em>抄底后币价还在狂跌，暂时止损想要再次抄底时，又发现币价又已经回升</em> 的现象。换成做多网格策略可以避免这样不理智的行为，因为接下来跌得越多就意味着套利次数越多，赚得也越多。</li><li>仓位增加和释放是缓慢的，减少了一次性挂单的风险。</li><li>OKX 的网格策略会自己进行仓位管理，接近强平价时还会停止挂单，并发出警告，能够略微减小爆仓风险。</li><li>虽然赚得更少，但不会少于直接挂单的 1/2；并且如上所述，风险降低了多于 1/2，综合收益/风险比是更高的。</li></ul><p>缺点有：</p><ul><li>填写参数需要时间，可能会错过最佳抄底/抄顶时机。（完美 timing 只有几秒钟，但是 OKX 切换币种后，填写好的参数会消失）</li><li>如果网格密度计算错误，可能造成大量手续费支出。</li></ul><h4 id="马丁格尔" tabindex="-1"><a class="header-anchor" href="#马丁格尔"><span>马丁格尔</span></a></h4><p>马丁格尔策略是一种资金管理策略，其会在输时不断加仓，而在赢时一次性卖出。由于交易市场波动，赢的概率总是存在的，因此马丁格尔被人称为“必胜”（除非爆仓或缺少加仓资金）。</p><p>根据原理，马丁格尔策略更适合用于赌球、赌马等胜率较为平等的场合（在这些离散场合也称为倍投）。币圈的马丁格尔泛用性比前者会弱一些，因为币价可能永远也无法回到盈利段，被套牢。因此币圈使用马丁格尔策略需要对当前大走势有着正确的判断，一旦判断正确，盈利能力将会非常强。</p><h4 id="自定义策略" tabindex="-1"><a class="header-anchor" href="#自定义策略"><span>自定义策略</span></a></h4><p>许多人脑子里可能都有一些未经测试的交易策略，写出并实现这些策略算是幻想家的浪漫。这时候可以考虑自定义策略。</p>',36),W=u("em",null,"OKX - 更多 - 使用 TradingView 交易",-1),Q=u("a",{href:"https://cn.tradingview.com/",target:"_blank",rel:"noopener noreferrer"},"TradingView",-1),uu=o('<p>我们也可以通过 webhook 将 TradingView 接入交易所以自动触发交易。不过，webhook 自动交易是要购买订阅的，$12.95/month。所以如果没有好策略 + 足够的本金，还是见仁见智吧。</p><h3 id="炒新币" tabindex="-1"><a class="header-anchor" href="#炒新币"><span>炒新币</span></a></h3><blockquote><p>Trump 币发行时，我是第一次接触新币，亏了一点钱（后来通过策略赚回来了）。之后又摸了几次新币，有了点经验。</p></blockquote><p>炒新币有着较高的风险；关于新币资质，能上 CEX 交易所的新币一般都不会太差（并非绝对），不像 pump.fun 的土狗 meme 币，那个<a href="https://www.panewslab.com/zh/sqarticledetails/8sih61h5.html" target="_blank" rel="noopener noreferrer">纯纯庞氏骗局</a>，千万别碰。</p><ol><li>集合竞价阶段就可以出价买入新币，但是我不建议此时买入。有一些人在其他交易所拥有此币种现货，他们可以在开放前将币转到 CEX 交易所，趁机在交易所上新买入需求多时高价出掉自己的货币，所以新币刚开盘的几秒钟价格一般是会跌很多的。</li><li>接着可能是一段上涨期，此时 CEX 交易所尚未开启合约交易，现货只能买不能卖，会导致币价短时间内上涨，然后开始波动。币的吸金程度不同，上涨的峰值来得也有快慢，例如 Trump 用了几个小时，其他小币种用的时间更短。（但是后面的长跌基本都是一致的） <ul><li>OKX 新币现货不能同时挂全仓止盈和全仓止损单，没法自动设置高赔率单，还是挺难受的，我不倾向于参加此次交易。</li></ul></li><li>新币合约上线后，就开始了长跌流程。所以此时做空是较好的选择。 <ul><li>新币合约刚上线时，下的单很可能被吞掉，甚至包括止损单，至少我在 OKX 里有被吞过，所以合约初期需要非常谨慎。</li></ul></li></ol><p>至于合约期过了顶点后要不要参加投机交易，我玩了一段时间后只能说，量化大舞台，有胆你就来。</p><ol><li>这时候交易都是以秒为单位的，基本上都是 bot 1s 内完成判断 + 交易，我拉下单线和止盈止损线的速度完全不够。 <ul><li>不过现在的目的是打过 bot，而 bot 遵循算法，一定程度上是有迹可循的。</li></ul></li><li>主导币价走向的一般是大单，当你看到大单的瞬间基本上就失去了机会，只有连着的几个大单中间手快插进去交易可能还能赚点。</li><li>手操即使遵守高赔率的策略，也很容易亏，需要时刻注意自己的收支。</li><li>还有，别忘了使用低延迟的代理。</li></ol><p>即使不做短期高频交易而是直接做大空，赚得也不算太多，因为币价波动太大，为了防止爆仓，杠杆不能开太高。那这时候要怎么办呢？还记得前面说网格策略适合交易波动性大的币种吗？刚好新币的波动性大，这时候狠狠上做空网格就行了。我一般会把 2x, 3x, 5x, 10x 的网格都套上，也算是分摊一些风险。包括马丁格尔策略也可以直接在新币上使用，毕竟我们知道了新币的总体趋势。这样就大概能把新币上的所有油水榨出来了。</p><p>当然也并不是每个新币都必定会长跌，一些有潜力的 layer1 链可能会不跌反涨，把你的网格和马丁顶爆仓，比如 IP 和 KAITO。</p><h2 id="挖矿" tabindex="-1"><a class="header-anchor" href="#挖矿"><span>挖矿</span></a></h2><p>不一定亲自挖，但至少得对挖矿有一定了解。这里主要是关于 PoW 的币种，其他方式暂时不在考虑范围内。</p><p>挖矿前的调研：</p><ol><li>能赚吗，能赚多少？<a href="https://minerstat.com/coins?lang=zh" target="_blank" rel="noopener noreferrer">挖矿收益计算器</a></li><li>用什么矿池？<a href="https://miningpoolstats.stream/" target="_blank" rel="noopener noreferrer">MiningPoolStats</a></li></ol><h2 id="区块链与合约" tabindex="-1"><a class="header-anchor" href="#区块链与合约"><span>区块链与合约</span></a></h2><p>接下来的内容就不是关于如何赚钱的了，而是关于加密货币底层原理与技术的讨论。不过我也是新手，难免遇到错漏，还望指正。</p><h3 id="学习资料" tabindex="-1"><a class="header-anchor" href="#学习资料"><span>学习资料</span></a></h3><ul><li><a href="https://yeasy.gitbook.io/blockchain_guide" target="_blank" rel="noopener noreferrer">yeasy/区块链技术指南</a></li><li><a href="https://www.helius.dev/blog/the-solana-programming-model-an-introduction-to-developing-on-solana" target="_blank" rel="noopener noreferrer">The Solana Programming Model: An Introduction to Developing on Solana</a></li></ul>',17);function Fu(B,D,n,F,a,r){const C=h("heimu"),_=h("RouteLink");return t(),i("div",null,[q,u("p",null,[E("初中的时候让我爸给我开了一个支付宝帐号，然后钱存在余额宝。当时的中国经济正是飞速发展的时代，余额宝给的利率也高。"),e(C,null,{default:A(()=>[E("现在回想起来，我当时整天感叹，因为身份证、银行卡、手机号都绑定在一起，我那个年龄凭个人是拿不到的，因此大多同龄人都错失了理财的机会。")]),_:1})]),Y,u("p",null,[E("从过往的投资经历来看，我个人还是非常保守的 "),e(C,null,{default:A(()=>[E("虽然在证券公司的调查里填写的都是激进型以绕开投资限制")]),_:1}),E("。因此在加密货币投资初期我也使用了非常保守的策略。")]),M,u("p",null,[E("所有交易所在中国一般需要使用"),e(_,{to:"/articles/proxy/"},{default:A(()=>[E("科学上网")]),_:1}),E("访问，这是没办法的。")]),e(F.CryptocurrencyExchangeList,null,{欧易:A(()=>[j]),币安:A(()=>[H]),MEXC:A(()=>[Z]),gateio:A(()=>[R]),bybit:A(()=>[U]),htx:A(()=>[$]),hyperliquid:A(()=>[G]),_:1}),J,u("p",null,[E("OKX 里不能自定义策略，我们需要借助第三方平台："),W,E("。"),Q,E(" 是另一个公司的平台，提供了 pinescript 脚本的编写、运行和一键回测，我们可以编写并测试自己的策略的利率。"),e(C,null,{default:A(()=>[E("花一晚上折腾了几个策略，没一个打得过网格的，哭")]),_:1})]),uu])}const Au=p(N,[["render",Fu],["__file","money.html.vue"]]),Bu=JSON.parse('{"path":"/articles/money.html","title":"理财，加密货币与区块链","lang":"zh-CN","frontmatter":{"date":"2025-01-31T00:00:00.000Z","icon":"brands fa-bitcoin","category":["教程","经历"],"tag":["金融","横评"],"description":"理财，加密货币与区块链 或许跟我的教育有一些关系，我一直很重视金钱观念。这里将会放一些我的理财记录和加密货币心得。 历史 早期回忆 小时候的我还挺悲惨的，压岁钱被大人拿去“保管”，零花钱也要做家务赚。不过这也促进了我的金钱观的形成。 最早接触理财是小学的时候，那时候还在用存折。一段时间后去银行存取钱，上面会打印一项“利息”，虽然只有几分钱，但是至少让我...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/money.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"理财，加密货币与区块链"}],["meta",{"property":"og:description","content":"理财，加密货币与区块链 或许跟我的教育有一些关系，我一直很重视金钱观念。这里将会放一些我的理财记录和加密货币心得。 历史 早期回忆 小时候的我还挺悲惨的，压岁钱被大人拿去“保管”，零花钱也要做家务赚。不过这也促进了我的金钱观的形成。 最早接触理财是小学的时候，那时候还在用存折。一段时间后去银行存取钱，上面会打印一项“利息”，虽然只有几分钱，但是至少让我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-29T16:46:55.000Z"}],["meta",{"property":"article:tag","content":"金融"}],["meta",{"property":"article:tag","content":"横评"}],["meta",{"property":"article:published_time","content":"2025-01-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-29T16:46:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"理财，加密货币与区块链\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-01-31T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-29T16:46:55.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"历史","slug":"历史","link":"#历史","children":[{"level":3,"title":"余额宝/零钱通","slug":"余额宝-零钱通","link":"#余额宝-零钱通","children":[]},{"level":3,"title":"黄金","slug":"黄金","link":"#黄金","children":[]},{"level":3,"title":"基金","slug":"基金","link":"#基金","children":[]},{"level":3,"title":"债券","slug":"债券","link":"#债券","children":[]}]},{"level":2,"title":"加密货币交易","slug":"加密货币交易","link":"#加密货币交易","children":[{"level":3,"title":"前置知识","slug":"前置知识","link":"#前置知识","children":[]},{"level":3,"title":"交易所","slug":"交易所","link":"#交易所","children":[]},{"level":3,"title":"开始交易","slug":"开始交易","link":"#开始交易","children":[]},{"level":3,"title":"手动交易","slug":"手动交易","link":"#手动交易","children":[]},{"level":3,"title":"策略交易","slug":"策略交易","link":"#策略交易","children":[]},{"level":3,"title":"炒新币","slug":"炒新币","link":"#炒新币","children":[]}]},{"level":2,"title":"挖矿","slug":"挖矿","link":"#挖矿","children":[]},{"level":2,"title":"区块链与合约","slug":"区块链与合约","link":"#区块链与合约","children":[{"level":3,"title":"学习资料","slug":"学习资料","link":"#学习资料","children":[]}]}],"git":{"createdTime":1738343421000,"updatedTime":1743266815000,"contributors":[{"name":"lxl66566","email":"lxl66566@gmail.com","commits":14}]},"readingTime":{"minutes":18.55,"words":5564},"filePathRelative":"articles/money.md","localizedDate":"2025年1月31日","excerpt":"\\n","autoDesc":true}');export{Au as comp,Bu as data};
