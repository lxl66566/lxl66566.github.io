import{f as g,_ as b,r as R,o,c as a,t as f,h as y,w,b as D,i as k,j as M,k as j,F as h,l as m,g as A,a as S}from"./app-BzilSif_.js";const B=g({__name:"RouterJumper",props:{key:{},to:{},text:{}},setup(u,{expose:i}){i();const e={props:u};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}}),J=["href"];function L(u,i,t,e,s,d){const r=R("RouterLink");return e.props.to.startsWith("http://")||e.props.to.startsWith("https://")?(o(),a("a",{key:0,href:t.to,target:"_blank",class:"router-jumper-text"},f(t.text),9,J)):(o(),y(r,{key:t.key,to:t.to,class:"router-jumper-text"},{default:w(()=>[D(f(t.text),1)]),_:1},8,["to"]))}const E=b(B,[["render",L],["__scopeId","data-v-a7486da7"],["__file","RouterJumper.vue"]]),N=g({__name:"ArticleCell",props:{boxData:{},columnWidth:{default:200}},setup(u,{expose:i}){i();const t=u,e=k([]),s=k(null),d=t.boxData.map(_=>Math.max(..._.links.map(n=>n.text.length*16))),r=Math.max(t.columnWidth,...d);console.log("maxColumnWidth",r);const l=()=>{if(!s.value)return;const _=s.value.clientWidth-3,n=Math.max(Math.min(Math.floor(_/r),t.boxData.length),1);s.value.style.flexWrap=n>1?"nowrap":"wrap",e.value=Array.from({length:n},()=>({boxes:[],height:0})),t.boxData.forEach(p=>{const x=e.value.reduce((v,C,W)=>C.height<e.value[v].height?W:v,0);e.value[x].boxes.push(p),e.value[x].height+=p.links.length})};M(()=>{l(),window.addEventListener("resize",l)}),j(()=>t.boxData,l);const c={props:t,columns:e,containerRef:s,textWidths:d,maxColumnWidth:r,updateColumns:l,RouterJumper:E};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}}),V={class:"container",ref:"containerRef"},F={key:0},I={class:"links"};function O(u,i,t,e,s,d){return o(),a("div",V,[(o(!0),a(h,null,m(e.columns,(r,l)=>(o(),a("div",{class:"column",key:l},[(o(!0),a(h,null,m(r.boxes,(c,_)=>(o(),a("fieldset",{class:"box",key:_},[c.field?(o(),a("legend",F,f(c.field),1)):A("v-if",!0),S("ul",null,[(o(!0),a(h,null,m(c.links,(n,p)=>(o(),a("li",I,[(o(),y(e.RouterJumper,{key:p,to:n.url,text:n.text},null,8,["to","text"]))]))),256))])]))),128))]))),128))],512)}const $=b(N,[["render",O],["__scopeId","data-v-f6206630"],["__file","ArticleCell.vue"]]);export{$ as A};
