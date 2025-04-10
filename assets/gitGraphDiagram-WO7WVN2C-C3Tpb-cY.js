import{s as Q}from"./chunk-VSLJSFIP-C9vTSMlO.js";import{c as X}from"./chunk-4KE642ED-ahFc8w6N.js";import{p as Z}from"./radar-MK3ICKWK-KPFLJ5ZN-BN1g9LMi.js";import{m as d,c as tt,b as et,B as rt,F as at,w as it,v as nt,t as w,H as ot,i as st,a as ct,l as ht,h as dt,g as L,n as lt,E as mt,p as $t,r as gt}from"./mermaid.esm.min-8uXcpmlf.js";import"./chunk-5ZJXQJOJ-ZgMdFAF7.js";import"./app-DjPa-OFf.js";var p={NORMAL:0,REVERSE:1,HIGHLIGHT:2,MERGE:3,CHERRY_PICK:4},yt=$t.gitGraph,G=d(()=>lt({...yt,...mt().gitGraph}),"getConfig"),c=new Q(()=>{let e=G(),t=e.mainBranchName,a=e.mainBranchOrder;return{mainBranchName:t,commits:new Map,head:null,branchConfig:new Map([[t,{name:t,order:a}]]),branches:new Map([[t,null]]),currBranch:t,direction:"LR",seq:0,options:{}}});function S(){return gt({length:7})}d(S,"getID");function K(e,t){let a=Object.create(null);return e.reduce((n,r)=>{let i=t(r);return a[i]||(a[i]=!0,n.push(r)),n},[])}d(K,"uniqBy");var pt=d(function(e){c.records.direction=e},"setDirection"),ft=d(function(e){w.debug("options str",e),e=e==null?void 0:e.trim(),e=e||"{}";try{c.records.options=JSON.parse(e)}catch(t){w.error("error while parsing gitGraph options",t.message)}},"setOptions"),xt=d(function(){return c.records.options},"getOptions"),ut=d(function(e){let t=e.msg,a=e.id,n=e.type,r=e.tags;w.info("commit",t,a,n,r),w.debug("Entering commit:",t,a,n,r);let i=G();a=L.sanitizeText(a,i),t=L.sanitizeText(t,i),r=r==null?void 0:r.map(o=>L.sanitizeText(o,i));let s={id:a||c.records.seq+"-"+S(),message:t,seq:c.records.seq++,type:n??p.NORMAL,tags:r??[],parents:c.records.head==null?[]:[c.records.head.id],branch:c.records.currBranch};c.records.head=s,w.info("main branch",i.mainBranchName),c.records.commits.set(s.id,s),c.records.branches.set(c.records.currBranch,s.id),w.debug("in pushCommit "+s.id)},"commit"),bt=d(function(e){let t=e.name,a=e.order;if(t=L.sanitizeText(t,G()),c.records.branches.has(t))throw new Error(`Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ${t}")`);c.records.branches.set(t,c.records.head!=null?c.records.head.id:null),c.records.branchConfig.set(t,{name:t,order:a}),_(t),w.debug("in createBranch")},"branch"),wt=d(e=>{let t=e.branch,a=e.id,n=e.type,r=e.tags,i=G();t=L.sanitizeText(t,i),a&&(a=L.sanitizeText(a,i));let s=c.records.branches.get(c.records.currBranch),o=c.records.branches.get(t),l=s?c.records.commits.get(s):void 0,$=o?c.records.commits.get(o):void 0;if(l&&$&&l.branch===t)throw new Error(`Cannot merge branch '${t}' into itself.`);if(c.records.currBranch===t){let h=new Error('Incorrect usage of "merge". Cannot merge a branch to itself');throw h.hash={text:`merge ${t}`,token:`merge ${t}`,expected:["branch abc"]},h}if(l===void 0||!l){let h=new Error(`Incorrect usage of "merge". Current branch (${c.records.currBranch})has no commits`);throw h.hash={text:`merge ${t}`,token:`merge ${t}`,expected:["commit"]},h}if(!c.records.branches.has(t)){let h=new Error('Incorrect usage of "merge". Branch to be merged ('+t+") does not exist");throw h.hash={text:`merge ${t}`,token:`merge ${t}`,expected:[`branch ${t}`]},h}if($===void 0||!$){let h=new Error('Incorrect usage of "merge". Branch to be merged ('+t+") has no commits");throw h.hash={text:`merge ${t}`,token:`merge ${t}`,expected:['"commit"']},h}if(l===$){let h=new Error('Incorrect usage of "merge". Both branches have same head');throw h.hash={text:`merge ${t}`,token:`merge ${t}`,expected:["branch abc"]},h}if(a&&c.records.commits.has(a)){let h=new Error('Incorrect usage of "merge". Commit with id:'+a+" already exists, use different custom Id");throw h.hash={text:`merge ${t} ${a} ${n} ${r==null?void 0:r.join(" ")}`,token:`merge ${t} ${a} ${n} ${r==null?void 0:r.join(" ")}`,expected:[`merge ${t} ${a}_UNIQUE ${n} ${r==null?void 0:r.join(" ")}`]},h}let m=o||"",g={id:a||`${c.records.seq}-${S()}`,message:`merged branch ${t} into ${c.records.currBranch}`,seq:c.records.seq++,parents:c.records.head==null?[]:[c.records.head.id,m],branch:c.records.currBranch,type:p.MERGE,customType:n,customId:!!a,tags:r??[]};c.records.head=g,c.records.commits.set(g.id,g),c.records.branches.set(c.records.currBranch,g.id),w.debug(c.records.branches),w.debug("in mergeBranch")},"merge"),Bt=d(function(e){let t=e.id,a=e.targetId,n=e.tags,r=e.parent;w.debug("Entering cherryPick:",t,a,n);let i=G();if(t=L.sanitizeText(t,i),a=L.sanitizeText(a,i),n=n==null?void 0:n.map(l=>L.sanitizeText(l,i)),r=L.sanitizeText(r,i),!t||!c.records.commits.has(t)){let l=new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');throw l.hash={text:`cherryPick ${t} ${a}`,token:`cherryPick ${t} ${a}`,expected:["cherry-pick abc"]},l}let s=c.records.commits.get(t);if(s===void 0||!s)throw new Error('Incorrect usage of "cherryPick". Source commit id should exist and provided');if(r&&!(Array.isArray(s.parents)&&s.parents.includes(r)))throw new Error("Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit.");let o=s.branch;if(s.type===p.MERGE&&!r)throw new Error("Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified.");if(!a||!c.records.commits.has(a)){if(o===c.records.currBranch){let g=new Error('Incorrect usage of "cherryPick". Source commit is already on current branch');throw g.hash={text:`cherryPick ${t} ${a}`,token:`cherryPick ${t} ${a}`,expected:["cherry-pick abc"]},g}let l=c.records.branches.get(c.records.currBranch);if(l===void 0||!l){let g=new Error(`Incorrect usage of "cherry-pick". Current branch (${c.records.currBranch})has no commits`);throw g.hash={text:`cherryPick ${t} ${a}`,token:`cherryPick ${t} ${a}`,expected:["cherry-pick abc"]},g}let $=c.records.commits.get(l);if($===void 0||!$){let g=new Error(`Incorrect usage of "cherry-pick". Current branch (${c.records.currBranch})has no commits`);throw g.hash={text:`cherryPick ${t} ${a}`,token:`cherryPick ${t} ${a}`,expected:["cherry-pick abc"]},g}let m={id:c.records.seq+"-"+S(),message:`cherry-picked ${s==null?void 0:s.message} into ${c.records.currBranch}`,seq:c.records.seq++,parents:c.records.head==null?[]:[c.records.head.id,s.id],branch:c.records.currBranch,type:p.CHERRY_PICK,tags:n?n.filter(Boolean):[`cherry-pick:${s.id}${s.type===p.MERGE?`|parent:${r}`:""}`]};c.records.head=m,c.records.commits.set(m.id,m),c.records.branches.set(c.records.currBranch,m.id),w.debug(c.records.branches),w.debug("in cherryPick")}},"cherryPick"),_=d(function(e){if(e=L.sanitizeText(e,G()),c.records.branches.has(e)){c.records.currBranch=e;let t=c.records.branches.get(c.records.currBranch);t===void 0||!t?c.records.head=null:c.records.head=c.records.commits.get(t)??null}else{let t=new Error(`Trying to checkout branch which is not yet created. (Help try using "branch ${e}")`);throw t.hash={text:`checkout ${e}`,token:`checkout ${e}`,expected:[`branch ${e}`]},t}},"checkout");function N(e,t,a){let n=e.indexOf(t);n===-1?e.push(a):e.splice(n,1,a)}d(N,"upsert");function W(e){let t=e.reduce((r,i)=>r.seq>i.seq?r:i,e[0]),a="";e.forEach(function(r){r===t?a+="	*":a+="	|"});let n=[a,t.id,t.seq];for(let r in c.records.branches)c.records.branches.get(r)===t.id&&n.push(r);if(w.debug(n.join(" ")),t.parents&&t.parents.length==2&&t.parents[0]&&t.parents[1]){let r=c.records.commits.get(t.parents[0]);N(e,t,r),t.parents[1]&&e.push(c.records.commits.get(t.parents[1]))}else{if(t.parents.length==0)return;if(t.parents[0]){let r=c.records.commits.get(t.parents[0]);N(e,t,r)}}e=K(e,r=>r.id),W(e)}d(W,"prettyPrintCommitHistory");var Et=d(function(){w.debug(c.records.commits);let e=Y()[0];W([e])},"prettyPrint"),Ct=d(function(){c.reset(),dt()},"clear"),Lt=d(function(){return[...c.records.branchConfig.values()].map((e,t)=>e.order!==null&&e.order!==void 0?e:{...e,order:parseFloat(`0.${t}`)}).sort((e,t)=>(e.order??0)-(t.order??0)).map(({name:e})=>({name:e}))},"getBranchesAsObjArray"),kt=d(function(){return c.records.branches},"getBranches"),Tt=d(function(){return c.records.commits},"getCommits"),Y=d(function(){let e=[...c.records.commits.values()];return e.forEach(function(t){w.debug(t.id)}),e.sort((t,a)=>t.seq-a.seq),e},"getCommitsArray"),Mt=d(function(){return c.records.currBranch},"getCurrentBranch"),vt=d(function(){return c.records.direction},"getDirection"),Pt=d(function(){return c.records.head},"getHead"),U={commitType:p,getConfig:G,setDirection:pt,setOptions:ft,getOptions:xt,commit:ut,branch:bt,merge:wt,cherryPick:Bt,checkout:_,prettyPrint:Et,clear:Ct,getBranchesAsObjArray:Lt,getBranches:kt,getCommits:Tt,getCommitsArray:Y,getCurrentBranch:Mt,getDirection:vt,getHead:Pt,setAccTitle:nt,getAccTitle:it,getAccDescription:at,setAccDescription:rt,setDiagramTitle:et,getDiagramTitle:tt},Rt=d((e,t)=>{X(e,t),e.dir&&t.setDirection(e.dir);for(let a of e.statements)It(a,t)},"populate"),It=d((e,t)=>{let a={Commit:d(n=>t.commit(At(n)),"Commit"),Branch:d(n=>t.branch(Gt(n)),"Branch"),Merge:d(n=>t.merge(Ot(n)),"Merge"),Checkout:d(n=>t.checkout(qt(n)),"Checkout"),CherryPicking:d(n=>t.cherryPick(Ht(n)),"CherryPicking")}[e.$type];a?a(e):w.error(`Unknown statement type: ${e.$type}`)},"parseStatement"),At=d(e=>({id:e.id,msg:e.message??"",type:e.type!==void 0?p[e.type]:p.NORMAL,tags:e.tags??void 0}),"parseCommit"),Gt=d(e=>({name:e.name,order:e.order??0}),"parseBranch"),Ot=d(e=>({branch:e.branch,id:e.id??"",type:e.type!==void 0?p[e.type]:void 0,tags:e.tags??void 0}),"parseMerge"),qt=d(e=>e.branch,"parseCheckout"),Ht=d(e=>{var t;return{id:e.id,targetId:"",tags:((t=e.tags)==null?void 0:t.length)===0?void 0:e.tags,parent:e.parent}},"parseCherryPicking"),zt={parse:d(async e=>{let t=await Z("gitGraph",e);w.debug(t),Rt(t,U)},"parse")},D=ot(),x=D==null?void 0:D.gitGraph,P=10,R=40,k=4,T=2,A=8,E=new Map,C=new Map,H=30,O=new Map,z=[],v=0,y="LR",St=d(()=>{E.clear(),C.clear(),O.clear(),v=0,z=[],y="LR"},"clear"),V=d(e=>{let t=document.createElementNS("http://www.w3.org/2000/svg","text");return(typeof e=="string"?e.split(/\\n|\n|<br\s*\/?>/gi):e).forEach(a=>{let n=document.createElementNS("http://www.w3.org/2000/svg","tspan");n.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),n.setAttribute("dy","1em"),n.setAttribute("x","0"),n.setAttribute("class","row"),n.textContent=a.trim(),t.appendChild(n)}),t},"drawText"),J=d(e=>{let t,a,n;return y==="BT"?(a=d((r,i)=>r<=i,"comparisonFunc"),n=1/0):(a=d((r,i)=>r>=i,"comparisonFunc"),n=0),e.forEach(r=>{var s,o;let i=y==="TB"||y=="BT"?(s=C.get(r))==null?void 0:s.y:(o=C.get(r))==null?void 0:o.x;i!==void 0&&a(i,n)&&(t=r,n=i)}),t},"findClosestParent"),Dt=d(e=>{let t="",a=1/0;return e.forEach(n=>{let r=C.get(n).y;r<=a&&(t=n,a=r)}),t||void 0},"findClosestParentBT"),Nt=d((e,t,a)=>{let n=a,r=a,i=[];e.forEach(s=>{let o=t.get(s);if(!o)throw new Error(`Commit not found for key ${s}`);o.parents.length?(n=jt(o),r=Math.max(n,r)):i.push(o),Ft(o,n)}),n=r,i.forEach(s=>{Kt(s,n,a)}),e.forEach(s=>{let o=t.get(s);if(o!=null&&o.parents.length){let l=Dt(o.parents);n=C.get(l).y-R,n<=r&&(r=n);let $=E.get(o.branch).pos,m=n-P;C.set(o.id,{x:$,y:m})}})},"setParallelBTPos"),Wt=d(e=>{var n;let t=J(e.parents.filter(r=>r!==null));if(!t)throw new Error(`Closest parent not found for commit ${e.id}`);let a=(n=C.get(t))==null?void 0:n.y;if(a===void 0)throw new Error(`Closest parent position not found for commit ${e.id}`);return a},"findClosestParentPos"),jt=d(e=>Wt(e)+R,"calculateCommitPosition"),Ft=d((e,t)=>{let a=E.get(e.branch);if(!a)throw new Error(`Branch not found for commit ${e.id}`);let n=a.pos,r=t+P;return C.set(e.id,{x:n,y:r}),{x:n,y:r}},"setCommitPosition"),Kt=d((e,t,a)=>{let n=E.get(e.branch);if(!n)throw new Error(`Branch not found for commit ${e.id}`);let r=t+a,i=n.pos;C.set(e.id,{x:i,y:r})},"setRootPosition"),_t=d((e,t,a,n,r,i)=>{if(i===p.HIGHLIGHT)e.append("rect").attr("x",a.x-10).attr("y",a.y-10).attr("width",20).attr("height",20).attr("class",`commit ${t.id} commit-highlight${r%A} ${n}-outer`),e.append("rect").attr("x",a.x-6).attr("y",a.y-6).attr("width",12).attr("height",12).attr("class",`commit ${t.id} commit${r%A} ${n}-inner`);else if(i===p.CHERRY_PICK)e.append("circle").attr("cx",a.x).attr("cy",a.y).attr("r",10).attr("class",`commit ${t.id} ${n}`),e.append("circle").attr("cx",a.x-3).attr("cy",a.y+2).attr("r",2.75).attr("fill","#fff").attr("class",`commit ${t.id} ${n}`),e.append("circle").attr("cx",a.x+3).attr("cy",a.y+2).attr("r",2.75).attr("fill","#fff").attr("class",`commit ${t.id} ${n}`),e.append("line").attr("x1",a.x+3).attr("y1",a.y+1).attr("x2",a.x).attr("y2",a.y-5).attr("stroke","#fff").attr("class",`commit ${t.id} ${n}`),e.append("line").attr("x1",a.x-3).attr("y1",a.y+1).attr("x2",a.x).attr("y2",a.y-5).attr("stroke","#fff").attr("class",`commit ${t.id} ${n}`);else{let s=e.append("circle");if(s.attr("cx",a.x),s.attr("cy",a.y),s.attr("r",t.type===p.MERGE?9:10),s.attr("class",`commit ${t.id} commit${r%A}`),i===p.MERGE){let o=e.append("circle");o.attr("cx",a.x),o.attr("cy",a.y),o.attr("r",6),o.attr("class",`commit ${n} ${t.id} commit${r%A}`)}i===p.REVERSE&&e.append("path").attr("d",`M ${a.x-5},${a.y-5}L${a.x+5},${a.y+5}M${a.x-5},${a.y+5}L${a.x+5},${a.y-5}`).attr("class",`commit ${n} ${t.id} commit${r%A}`)}},"drawCommitBullet"),Yt=d((e,t,a,n)=>{var r;if(t.type!==p.CHERRY_PICK&&(t.customId&&t.type===p.MERGE||t.type!==p.MERGE)&&(x!=null&&x.showCommitLabel)){let i=e.append("g"),s=i.insert("rect").attr("class","commit-label-bkg"),o=i.append("text").attr("x",n).attr("y",a.y+25).attr("class","commit-label").text(t.id),l=(r=o.node())==null?void 0:r.getBBox();if(l&&(s.attr("x",a.posWithOffset-l.width/2-T).attr("y",a.y+13.5).attr("width",l.width+2*T).attr("height",l.height+2*T),y==="TB"||y==="BT"?(s.attr("x",a.x-(l.width+4*k+5)).attr("y",a.y-12),o.attr("x",a.x-(l.width+4*k)).attr("y",a.y+l.height-12)):o.attr("x",a.posWithOffset-l.width/2),x.rotateCommitLabel))if(y==="TB"||y==="BT")o.attr("transform","rotate(-45, "+a.x+", "+a.y+")"),s.attr("transform","rotate(-45, "+a.x+", "+a.y+")");else{let $=-7.5-(l.width+10)/25*9.5,m=10+l.width/25*8.5;i.attr("transform","translate("+$+", "+m+") rotate(-45, "+n+", "+a.y+")")}}},"drawCommitLabel"),Ut=d((e,t,a,n)=>{var r;if(t.tags.length>0){let i=0,s=0,o=0,l=[];for(let $ of t.tags.reverse()){let m=e.insert("polygon"),g=e.append("circle"),h=e.append("text").attr("y",a.y-16-i).attr("class","tag-label").text($),f=(r=h.node())==null?void 0:r.getBBox();if(!f)throw new Error("Tag bbox not found");s=Math.max(s,f.width),o=Math.max(o,f.height),h.attr("x",a.posWithOffset-f.width/2),l.push({tag:h,hole:g,rect:m,yOffset:i}),i+=20}for(let{tag:$,hole:m,rect:g,yOffset:h}of l){let f=o/2,u=a.y-19.2-h;if(g.attr("class","tag-label-bkg").attr("points",`
      ${n-s/2-k/2},${u+T}  
      ${n-s/2-k/2},${u-T}
      ${a.posWithOffset-s/2-k},${u-f-T}
      ${a.posWithOffset+s/2+k},${u-f-T}
      ${a.posWithOffset+s/2+k},${u+f+T}
      ${a.posWithOffset-s/2-k},${u+f+T}`),m.attr("cy",u).attr("cx",n-s/2+k/2).attr("r",1.5).attr("class","tag-hole"),y==="TB"||y==="BT"){let b=n+h;g.attr("class","tag-label-bkg").attr("points",`
        ${a.x},${b+2}
        ${a.x},${b-2}
        ${a.x+P},${b-f-2}
        ${a.x+P+s+4},${b-f-2}
        ${a.x+P+s+4},${b+f+2}
        ${a.x+P},${b+f+2}`).attr("transform","translate(12,12) rotate(45, "+a.x+","+n+")"),m.attr("cx",a.x+k/2).attr("cy",b).attr("transform","translate(12,12) rotate(45, "+a.x+","+n+")"),$.attr("x",a.x+5).attr("y",b+3).attr("transform","translate(14,14) rotate(45, "+a.x+","+n+")")}}}},"drawCommitTags"),Vt=d(e=>{switch(e.customType??e.type){case p.NORMAL:return"commit-normal";case p.REVERSE:return"commit-reverse";case p.HIGHLIGHT:return"commit-highlight";case p.MERGE:return"commit-merge";case p.CHERRY_PICK:return"commit-cherry-pick";default:return"commit-normal"}},"getCommitClassType"),Jt=d((e,t,a,n)=>{let r={x:0,y:0};if(e.parents.length>0){let i=J(e.parents);if(i){let s=n.get(i)??r;return t==="TB"?s.y+R:t==="BT"?(n.get(e.id)??r).y-R:s.x+R}}else return t==="TB"?H:t==="BT"?(n.get(e.id)??r).y-R:0;return 0},"calculatePosition"),Qt=d((e,t,a)=>{var s,o;let n=y==="BT"&&a?t:t+P,r=y==="TB"||y==="BT"?n:(s=E.get(e.branch))==null?void 0:s.pos,i=y==="TB"||y==="BT"?(o=E.get(e.branch))==null?void 0:o.pos:n;if(i===void 0||r===void 0)throw new Error(`Position were undefined for commit ${e.id}`);return{x:i,y:r,posWithOffset:n}},"getCommitPosition"),F=d((e,t,a)=>{if(!x)throw new Error("GitGraph config not found");let n=e.append("g").attr("class","commit-bullets"),r=e.append("g").attr("class","commit-labels"),i=y==="TB"||y==="BT"?H:0,s=[...t.keys()],o=(x==null?void 0:x.parallelCommits)??!1,l=d((m,g)=>{var u,b;let h=(u=t.get(m))==null?void 0:u.seq,f=(b=t.get(g))==null?void 0:b.seq;return h!==void 0&&f!==void 0?h-f:0},"sortKeys"),$=s.sort(l);y==="BT"&&(o&&Nt($,t,i),$=$.reverse()),$.forEach(m=>{var f;let g=t.get(m);if(!g)throw new Error(`Commit not found for key ${m}`);o&&(i=Jt(g,y,i,C));let h=Qt(g,i,o);if(a){let u=Vt(g),b=g.customType??g.type,I=((f=E.get(g.branch))==null?void 0:f.index)??0;_t(n,g,h,u,I,b),Yt(r,g,h,i),Ut(r,g,h,i)}y==="TB"||y==="BT"?C.set(g.id,{x:h.x,y:h.posWithOffset}):C.set(g.id,{x:h.posWithOffset,y:h.y}),i=y==="BT"&&o?i+R:i+R+P,i>v&&(v=i)})},"drawCommits"),Xt=d((e,t,a,n,r)=>{let i=(y==="TB"||y==="BT"?a.x<n.x:a.y<n.y)?t.branch:e.branch,s=d(l=>l.branch===i,"isOnBranchToGetCurve"),o=d(l=>l.seq>e.seq&&l.seq<t.seq,"isBetweenCommits");return[...r.values()].some(l=>o(l)&&s(l))},"shouldRerouteArrow"),q=d((e,t,a=0)=>{let n=e+Math.abs(e-t)/2;if(a>5)return n;if(z.every(i=>Math.abs(i-n)>=10))return z.push(n),n;let r=Math.abs(e-t);return q(e,t-r/5,a+1)},"findLane"),Zt=d((e,t,a,n)=>{var f,u,b,I,j;let r=C.get(t.id),i=C.get(a.id);if(r===void 0||i===void 0)throw new Error(`Commit positions not found for commits ${t.id} and ${a.id}`);let s=Xt(t,a,r,i,n),o="",l="",$=0,m=0,g=(f=E.get(a.branch))==null?void 0:f.index;a.type===p.MERGE&&t.id!==a.parents[0]&&(g=(u=E.get(t.branch))==null?void 0:u.index);let h;if(s){o="A 10 10, 0, 0, 0,",l="A 10 10, 0, 0, 1,",$=10,m=10;let M=r.y<i.y?q(r.y,i.y):q(i.y,r.y),B=r.x<i.x?q(r.x,i.x):q(i.x,r.x);y==="TB"?r.x<i.x?h=`M ${r.x} ${r.y} L ${B-$} ${r.y} ${l} ${B} ${r.y+m} L ${B} ${i.y-$} ${o} ${B+m} ${i.y} L ${i.x} ${i.y}`:(g=(b=E.get(t.branch))==null?void 0:b.index,h=`M ${r.x} ${r.y} L ${B+$} ${r.y} ${o} ${B} ${r.y+m} L ${B} ${i.y-$} ${l} ${B-m} ${i.y} L ${i.x} ${i.y}`):y==="BT"?r.x<i.x?h=`M ${r.x} ${r.y} L ${B-$} ${r.y} ${o} ${B} ${r.y-m} L ${B} ${i.y+$} ${l} ${B+m} ${i.y} L ${i.x} ${i.y}`:(g=(I=E.get(t.branch))==null?void 0:I.index,h=`M ${r.x} ${r.y} L ${B+$} ${r.y} ${l} ${B} ${r.y-m} L ${B} ${i.y+$} ${o} ${B-m} ${i.y} L ${i.x} ${i.y}`):r.y<i.y?h=`M ${r.x} ${r.y} L ${r.x} ${M-$} ${o} ${r.x+m} ${M} L ${i.x-$} ${M} ${l} ${i.x} ${M+m} L ${i.x} ${i.y}`:(g=(j=E.get(t.branch))==null?void 0:j.index,h=`M ${r.x} ${r.y} L ${r.x} ${M+$} ${l} ${r.x+m} ${M} L ${i.x-$} ${M} ${o} ${i.x} ${M-m} L ${i.x} ${i.y}`)}else o="A 20 20, 0, 0, 0,",l="A 20 20, 0, 0, 1,",$=20,m=20,y==="TB"?(r.x<i.x&&(a.type===p.MERGE&&t.id!==a.parents[0]?h=`M ${r.x} ${r.y} L ${r.x} ${i.y-$} ${o} ${r.x+m} ${i.y} L ${i.x} ${i.y}`:h=`M ${r.x} ${r.y} L ${i.x-$} ${r.y} ${l} ${i.x} ${r.y+m} L ${i.x} ${i.y}`),r.x>i.x&&(o="A 20 20, 0, 0, 0,",l="A 20 20, 0, 0, 1,",$=20,m=20,a.type===p.MERGE&&t.id!==a.parents[0]?h=`M ${r.x} ${r.y} L ${r.x} ${i.y-$} ${l} ${r.x-m} ${i.y} L ${i.x} ${i.y}`:h=`M ${r.x} ${r.y} L ${i.x+$} ${r.y} ${o} ${i.x} ${r.y+m} L ${i.x} ${i.y}`),r.x===i.x&&(h=`M ${r.x} ${r.y} L ${i.x} ${i.y}`)):y==="BT"?(r.x<i.x&&(a.type===p.MERGE&&t.id!==a.parents[0]?h=`M ${r.x} ${r.y} L ${r.x} ${i.y+$} ${l} ${r.x+m} ${i.y} L ${i.x} ${i.y}`:h=`M ${r.x} ${r.y} L ${i.x-$} ${r.y} ${o} ${i.x} ${r.y-m} L ${i.x} ${i.y}`),r.x>i.x&&(o="A 20 20, 0, 0, 0,",l="A 20 20, 0, 0, 1,",$=20,m=20,a.type===p.MERGE&&t.id!==a.parents[0]?h=`M ${r.x} ${r.y} L ${r.x} ${i.y+$} ${o} ${r.x-m} ${i.y} L ${i.x} ${i.y}`:h=`M ${r.x} ${r.y} L ${i.x-$} ${r.y} ${o} ${i.x} ${r.y-m} L ${i.x} ${i.y}`),r.x===i.x&&(h=`M ${r.x} ${r.y} L ${i.x} ${i.y}`)):(r.y<i.y&&(a.type===p.MERGE&&t.id!==a.parents[0]?h=`M ${r.x} ${r.y} L ${i.x-$} ${r.y} ${l} ${i.x} ${r.y+m} L ${i.x} ${i.y}`:h=`M ${r.x} ${r.y} L ${r.x} ${i.y-$} ${o} ${r.x+m} ${i.y} L ${i.x} ${i.y}`),r.y>i.y&&(a.type===p.MERGE&&t.id!==a.parents[0]?h=`M ${r.x} ${r.y} L ${i.x-$} ${r.y} ${o} ${i.x} ${r.y-m} L ${i.x} ${i.y}`:h=`M ${r.x} ${r.y} L ${r.x} ${i.y+$} ${l} ${r.x+m} ${i.y} L ${i.x} ${i.y}`),r.y===i.y&&(h=`M ${r.x} ${r.y} L ${i.x} ${i.y}`));if(h===void 0)throw new Error("Line definition not found");e.append("path").attr("d",h).attr("class","arrow arrow"+g%A)},"drawArrow"),te=d((e,t)=>{let a=e.append("g").attr("class","commit-arrows");[...t.keys()].forEach(n=>{let r=t.get(n);r.parents&&r.parents.length>0&&r.parents.forEach(i=>{Zt(a,t.get(i),r,t)})})},"drawArrows"),ee=d((e,t)=>{let a=e.append("g");t.forEach((n,r)=>{var f;let i=r%A,s=(f=E.get(n.name))==null?void 0:f.pos;if(s===void 0)throw new Error(`Position not found for branch ${n.name}`);let o=a.append("line");o.attr("x1",0),o.attr("y1",s),o.attr("x2",v),o.attr("y2",s),o.attr("class","branch branch"+i),y==="TB"?(o.attr("y1",H),o.attr("x1",s),o.attr("y2",v),o.attr("x2",s)):y==="BT"&&(o.attr("y1",v),o.attr("x1",s),o.attr("y2",H),o.attr("x2",s)),z.push(s);let l=n.name,$=V(l),m=a.insert("rect"),g=a.insert("g").attr("class","branchLabel").insert("g").attr("class","label branch-label"+i);g.node().appendChild($);let h=$.getBBox();m.attr("class","branchLabelBkg label"+i).attr("rx",4).attr("ry",4).attr("x",-h.width-4-((x==null?void 0:x.rotateCommitLabel)===!0?30:0)).attr("y",-h.height/2+8).attr("width",h.width+18).attr("height",h.height+4),g.attr("transform","translate("+(-h.width-14-((x==null?void 0:x.rotateCommitLabel)===!0?30:0))+", "+(s-h.height/2-1)+")"),y==="TB"?(m.attr("x",s-h.width/2-10).attr("y",0),g.attr("transform","translate("+(s-h.width/2-5)+", 0)")):y==="BT"?(m.attr("x",s-h.width/2-10).attr("y",v),g.attr("transform","translate("+(s-h.width/2-5)+", "+v+")")):m.attr("transform","translate(-19, "+(s-h.height/2)+")")})},"drawBranches"),re=d(function(e,t,a,n,r){return E.set(e,{pos:t,index:a}),t+=50+(r?40:0)+(y==="TB"||y==="BT"?n.width/2:0),t},"setBranchPosition"),ae=d(function(e,t,a,n){if(St(),w.debug("in gitgraph renderer",e+`
`,"id:",t,a),!x)throw new Error("GitGraph config not found");let r=x.rotateCommitLabel??!1,i=n.db;O=i.getCommits();let s=i.getBranchesAsObjArray();y=i.getDirection();let o=st(`[id="${t}"]`),l=0;s.forEach(($,m)=>{var I;let g=V($.name),h=o.append("g"),f=h.insert("g").attr("class","branchLabel"),u=f.insert("g").attr("class","label branch-label");(I=u.node())==null||I.appendChild(g);let b=g.getBBox();l=re($.name,l,m,b,r),u.remove(),f.remove(),h.remove()}),F(o,O,!1),x.showBranches&&ee(o,s),te(o,O),F(o,O,!0),ct.insertTitle(o,"gitTitleText",x.titleTopMargin??0,i.getDiagramTitle()),ht(void 0,o,x.diagramPadding,x.useMaxWidth)},"draw"),ie={draw:ae},ne=d(e=>`
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  ${[0,1,2,3,4,5,6,7].map(t=>`
        .branch-label${t} { fill: ${e["gitBranchLabel"+t]}; }
        .commit${t} { stroke: ${e["git"+t]}; fill: ${e["git"+t]}; }
        .commit-highlight${t} { stroke: ${e["gitInv"+t]}; fill: ${e["gitInv"+t]}; }
        .label${t}  { fill: ${e["git"+t]}; }
        .arrow${t} { stroke: ${e["git"+t]}; }
        `).join(`
`)}

  .branch {
    stroke-width: 1;
    stroke: ${e.lineColor};
    stroke-dasharray: 2;
  }
  .commit-label { font-size: ${e.commitLabelFontSize}; fill: ${e.commitLabelColor};}
  .commit-label-bkg { font-size: ${e.commitLabelFontSize}; fill: ${e.commitLabelBackground}; opacity: 0.5; }
  .tag-label { font-size: ${e.tagLabelFontSize}; fill: ${e.tagLabelColor};}
  .tag-label-bkg { fill: ${e.tagLabelBackground}; stroke: ${e.tagLabelBorder}; }
  .tag-hole { fill: ${e.textColor}; }

  .commit-merge {
    stroke: ${e.primaryColor};
    fill: ${e.primaryColor};
  }
  .commit-reverse {
    stroke: ${e.primaryColor};
    fill: ${e.primaryColor};
    stroke-width: 3;
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${e.primaryColor};
    fill: ${e.primaryColor};
  }

  .arrow { stroke-width: 8; stroke-linecap: round; fill: none}
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`,"getStyles"),oe=ne,$e={parser:zt,db:U,renderer:ie,styles:oe};export{$e as diagram};
