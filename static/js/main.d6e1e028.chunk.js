(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{2:function(e,t,n){e.exports={header:"BlogHeader_header__-iJ_t",inputWrapper:"BlogHeader_inputWrapper__1rlnY",inputWrapperIn:"BlogHeader_inputWrapperIn__2bOcy",input:"BlogHeader_input__3XQlA",searchButton:"BlogHeader_searchButton__3LR6e",cancelButton:"BlogHeader_cancelButton__3Eif5"}},22:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(7);var c,l=function(){return r.createElement("div",{className:"loading"},r.createElement("span",null,"Loading..."))};!function(e){e.ARTICLES_FETCH="ARTICLES_FETCH",e.ARTICLES_FETCH_RESPONSE="ARTICLES_FETCH_RESPONSE",e.ARTICLES_FETCH_ERROR="ARTICLES_FETCH_ERROR",e.ARTICLES_FETCH_ALL="ARTICLES_FETCH_ALL",e.ARTICLES_FETCH_ALL_RESPONSE="ARTICLES_FETCH_ALL_RESPONSE",e.ARTICLES_FETCH_ALL_ERROR="ARTICLES_FETCH_ALL_ERROR",e.AXIOS_ACTION="shared/middleware/axios",e.DIABLO_HERO_FETCH_ALL="DIABLO_HERO_FETCH_ALL",e.DIABLO_HERO_FETCH_ALL_RESPONSE="DIABLO_HERO_FETCH_ALL_RESPONSE",e.DIABLO_HERO_FETCH_ALL_ERROR="DIABLO_HERO_FETCH_ALL_ERROR"}(c||(c={}));var o,i=c;!function(e){e.NOT_STARTED="NOT_STARTED",e.LOADING="LOADING",e.DONE="DONE",e.ERROR="ERROR"}(o||(o={}));var u=o;function s(e){return{type:i.AXIOS_ACTION,payload:e}}var E=function(e,t,n){var r=t(n).payload,a=r.data,c=r.method,l=void 0===c?"get":c,o=r.url,i=r.initActionType,u=r.successActionType,s=r.failedActionType;function E(t){e({type:s,data:a,error:t})}e({type:i}),fetch(o,{body:a,method:l}).then(function(t){t.json().then(function(t){e({type:u,data:t})},E)},E)},p=function(){return(p=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},m={fetchStatus:u.NOT_STARTED},f=function(e){return e.fetchStatus===u.DONE||e.fetchStatus===u.ERROR};function _(e,t){switch(t.type){case i.ARTICLES_FETCH:return p({},e,{fetchStatus:u.LOADING});case i.ARTICLES_FETCH_RESPONSE:return p({},e,{article:t.data,fetchStatus:u.DONE});case i.ARTICLES_FETCH_ERROR:return p({},e,{fetchStatus:u.ERROR});default:return e}}function h(e){return s({url:e+".json",initActionType:i.ARTICLES_FETCH,successActionType:i.ARTICLES_FETCH_RESPONSE,failedActionType:i.ARTICLES_FETCH_ERROR})}var d=function(e){var t=r.useReducer(_,m),n=t[0],a=t[1];return r.useEffect(function(){e.location&&e.location.pathname&&E(a,h,e.location.pathname)},[e.location]),f(n)?n.article?r.createElement("article",{className:"blog-entry"},r.createElement("span",{className:"blog-entry-date"},n.article.date),r.createElement("h1",{className:"blog-entry-title"},n.article.title),r.createElement("div",{className:"blog-entry-content",dangerouslySetInnerHTML:{__html:n.article.content}})):r.createElement("article",null,"There was an error retrieving article"):r.createElement(l,null)},R=n(1);var T=function(e){var t=e.article;return r.createElement("article",{key:t.title},r.createElement("h3",null,r.createElement(R.a,{to:t.id},t.title)),r.createElement("span",{className:"date"},t.date))},L=function(){return(L=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},g={articles:{},fetchStatus:u.LOADING},A=function(e){return Object.keys(e.articles).map(function(t){return e.articles[t]})},O=function(e){return e.fetchStatus===u.DONE||e.fetchStatus===u.ERROR};function S(e,t){switch(t.type){case i.ARTICLES_FETCH_ALL:return L({},e,{fetchStatus:u.LOADING});case i.ARTICLES_FETCH_ALL_RESPONSE:var n=t.data.reduce(function(e,t){return e[t.id]=t,e},{});return L({},e,{articles:n,fetchStatus:u.DONE});case i.ARTICLES_FETCH_ALL_ERROR:return L({},e,{fetchStatus:u.ERROR});default:return e}}function v(){return s({url:"/articles/list.json",initActionType:i.ARTICLES_FETCH_ALL,successActionType:i.ARTICLES_FETCH_ALL_RESPONSE,failedActionType:i.ARTICLES_FETCH_ALL_ERROR})}var C=n(2),y=n.n(C),w=function(e){var t=r.useState(!1),n=t[0],a=t[1],c=r.useRef(null);var l=r.createElement("div",{className:y.a.inputWrapper,ref:c},r.createElement("input",{onChange:function(t){e.onFilter(t.target.value)},className:y.a.input,autoFocus:!0,placeholder:"Search..."}),r.createElement("button",{onClick:function(){e.onFilter(""),c.current&&c.current.classList.remove(y.a.inputWrapperIn),setTimeout(function(){a(!1)},350)},className:y.a.cancelButton,type:"button"},"Cancel"));return r.createElement("div",{className:y.a.header},n&&l,r.createElement("h2",null,"Blog ",r.createElement("button",{onClick:function(){a(!0),setTimeout(function(){c.current&&c.current.classList.add(y.a.inputWrapperIn)},0)},className:y.a.searchButton,type:"button"},"Search")))};var I,N=function(){var e=r.useReducer(S,g),t=e[0],n=e[1],a=r.useState(""),c=a[0],o=a[1];r.useEffect(function(){E(n,v)},[]);var i=A(t).filter(function(e){return new RegExp(c,"i").test(e.title)});return r.createElement("section",{className:"article-list blog"},r.createElement(w,{onFilter:o}),!O(t)&&r.createElement(l,null),i.map(function(e){return r.createElement(T,{key:e.title,article:e})}))},H=(I=function(e,t){return(I=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}I(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={hasError:!1},t}return H(t,e),t.getDerivedStateFromError=function(){return{hasError:!0}},t.prototype.componentDidCatch=function(){},t.prototype.render=function(){return this.state.hasError?r.createElement("h1",null,"Something went wrong."):this.props.children},t}(r.Component);var F=function(e){var t=new Date(e.article.pubDate.replace(" ","T"));return r.createElement("article",{key:e.article.title,className:"article-list-item"},r.createElement("h3",null,r.createElement("a",{href:e.article.link,target:"_blank"},e.article.title)),r.createElement("span",{className:"date"},t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()),r.createElement("p",{dangerouslySetInnerHTML:{__html:e.article.description}}))},k=function(){return(k=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};var D=function(e){var t=r.useState([]),n=t[0],a=t[1];return r.useEffect(function(){var t=["https://api.rss2json.com/v1/api.json?","rss_url="+encodeURIComponent(e.url),"api_key=nlzxnnxh5caeaemhefqniyymygaowzk3002byhfh"];fetch(t.join("&")).then(function(e){return e.json()}).then(function(e){var t=e.items.map(function(e){var t=[{regex:/<img.+?[\/]?>/gi,replacement:""},{regex:/(<a.+?)>/gi,replacement:'$1 target="_blank">'}].reduce(function(e,t){return e.replace(t.regex,t.replacement)},e.description);return k({},e,{description:t})});a(t)})},[]),r.createElement("section",{className:"article-list "+e.className},r.createElement("h2",null,e.title),0===n.length&&r.createElement(l,null),n.map(function(e){return r.createElement(F,{key:e.title,article:e})}))};var B=function(e){return r.createElement("div",{className:"home"},r.createElement(b,null,r.createElement(N,null)),r.createElement(b,null,r.createElement(D,{title:"IMSA",url:"https://www.imsa.com/rss.xml",className:"imsa"})),r.createElement(b,null,r.createElement(D,{title:"Autosport IMSA",url:"https://www.autosport.com/rss/feed/imsa",className:"autosport"})))};var j=function(e){return r.createElement("div",null,r.createElement("h2",null,"My Bad"),r.createElement("p",null,"You have found a path that I didn't account for."),r.createElement(R.a,{to:"/"},"Home"))},P="?redirect=";var x=function(){return r.useEffect(function(){var e=window.location.search;0===e.indexOf(P)&&Object(R.c)(e.replace(""+P,""),{replace:!0})},[]),r.createElement("div",{className:"wrapper"},r.createElement("header",null,r.createElement("nav",null,r.createElement("ul",null,r.createElement("li",null,r.createElement(R.a,{to:"/"},r.createElement("span",null,"Grant R. Klinsing"))),r.createElement("li",null,r.createElement("a",{href:"http://github.com/kagd",target:"_blank"},r.createElement("span",null,"Github"))),r.createElement("li",null,r.createElement("a",{href:"http://twitter.com/gklinsing",target:"_blank"},r.createElement("span",null,"Twitter"))),r.createElement("li",null,r.createElement("a",{href:"https://www.linkedin.com/in/grantklinsing",target:"_blank"},r.createElement("span",null,"LinkedIn")))))),r.createElement("section",{className:"main",id:"main",role:"main"},r.createElement(R.b,null,r.createElement(B,{path:"/"}),r.createElement(d,{path:"/articles/*"}),r.createElement(j,{path:"*"}))),r.createElement("footer",null,r.createElement("a",{href:"http://iracingbanner.com'"},r.createElement("img",{src:"http://iracingbanner.com/banner/style2/r/rsci2/370089.png"}))))},W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function G(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}n(22);a.render(r.createElement(x,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location.toString()).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="/service-worker.js";W?function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):G(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):G(e)})}}()},9:function(e,t,n){e.exports=n(24)}},[[9,2,1]]]);
//# sourceMappingURL=main.d6e1e028.chunk.js.map