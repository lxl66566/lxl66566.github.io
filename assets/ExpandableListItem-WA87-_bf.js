import{f as u,k as o,l as m,n as p,_ as v,o as c,c as x,a as l,i as _,p as g,d as b,w as h,q as E,g as C,T as k,F as y}from"./app-CST2w-Ku.js";const B=u({__name:"ExpandableListItem",props:{extra_tr_class:{},expandable:{type:Boolean}},setup(n,{expose:d}){d();const s=n,e=o(!1),a=o(0),t=o(null),f=async()=>{s.expandable&&(e.value=!e.value,await p(),e.value&&t.value?a.value=t.value.offsetHeight:a.value=0)};m(()=>{e.value&&p(()=>{var i;a.value=((i=t.value)==null?void 0:i.offsetHeight)||0})});const r={props:s,isExpanded:e,expandedHeight:a,expandContentRef:t,toggleExpand:f};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}}),H={colspan:"99"},I={ref:"expandContentRef",class:"expand-content-inner"};function S(n,d,s,e,a,t){return c(),x(y,null,[l("tr",{onClick:e.toggleExpand,class:g(["list-item",[...e.props.extra_tr_class||[],{expanded:e.isExpanded,expandable:e.props.expandable}]])},[_(n.$slots,"list-content",{},void 0,!0)],2),b(k,{name:"expand"},{default:h(()=>[e.isExpanded?(c(),x("tr",{key:0,class:"expanded-content",style:E({height:e.expandedHeight+"px"})},[l("td",H,[l("div",I,[_(n.$slots,"expanded-content",{},void 0,!0)],512)])],4)):C("v-if",!0)]),_:3})],64)}const L=v(B,[["render",S],["__scopeId","data-v-94c12d8b"],["__file","ExpandableListItem.vue"]]);export{L as E};