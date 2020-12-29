!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){const n="undefined"!=typeof window&&void 0!==window.document;e.exports={convertToArrayIfNeeded:e=>Array.isArray(e)?e:[e],isBrowser:n}},function(e,t,n){e.exports=n(5)},function(e,t,n){(function(t){const{isBrowser:r}=n(0),i=!r&&!1,o=i&&t.env.MONDAY_COM_PROTOCOL||"https",s=i&&t.env.MONDAY_COM_DOMAIN||"monday.com",a=`${o}://api.${s}/v2`,c=`${o}://auth.${s}/oauth2/authorize`,u=`${o}://auth.${s}/oauth2/token`;e.exports={MONDAY_DOMAIN:s,MONDAY_PROTOCOL:o,MONDAY_API_URL:a,MONDAY_OAUTH_URL:c,MONDAY_OAUTH_TOKEN_URL:u}}).call(this,n(6))},function(e,t,n){var r,i;const{isBrowser:o}=n(0),s=n(o?4:12);"undefined"!=typeof self&&self,void 0===(i="function"==typeof(r=function(){return window.mondaySdk=s,s})?r.call(t,n,t,e):r)||(e.exports=i)},function(e,t,n){const r=n(1),{MONDAY_OAUTH_URL:i}=n(2),{convertToArrayIfNeeded:o}=n(0),{initScrollHelperIfNeeded:s}=n(9),{initBackgroundTracking:a}=n(10),c=[];class u{constructor(e={}){this._clientId=e.clientId,this._apiToken=e.apiToken,this.listeners={},this.setClientId=this.setClientId.bind(this),this.setToken=this.setToken.bind(this),this.api=this.api.bind(this),this.listen=this.listen.bind(this),this.get=this.get.bind(this),this.execute=this.execute.bind(this),this.oauth=this.oauth.bind(this),this._receiveMessage=this._receiveMessage.bind(this),this.storage={instance:{setItem:this.setStorageInstanceItem.bind(this),getItem:this.getStorageInstanceItem.bind(this),deleteItem:this.deleteStorageInstanceItem.bind(this)}},window.addEventListener("message",this._receiveMessage,!1),e.withoutScrollHelper||s(),a(this)}setClientId(e){this._clientId=e}setToken(e){this._apiToken=e}api(e,t={}){const n={query:e,variables:t.variables},i=t.token||this._apiToken;return i?r.execute(n,i):new Promise((e,t)=>{this._localApi("api",{params:n}).then(t=>{e(t.data)}).catch(e=>t(e))})}listen(e,t,n){o(e).forEach(e=>{this._addListener(e,t),this._localApi("listen",{type:e,params:n})})}get(e,t){return this._localApi("get",{type:e,params:t})}execute(e,t){return this._localApi("execute",{type:e,params:t})}track(e,t){return this.execute("track",{name:e,data:t})}oauth(e={}){const t=e.clientId||this._clientId;if(!t)throw new Error("clientId is required");const n=`${e.mondayOauthUrl||i}?client_id=${t}`;window.location=n}setStorageInstanceItem(e,t,n={}){return this._localApi("storage",{method:"set",key:e,value:t,options:n,segment:"instance"})}getStorageInstanceItem(e,t={}){return this._localApi("storage",{method:"get",key:e,options:t,segment:"instance"})}deleteStorageInstanceItem(e,t={}){return this._localApi("storage",{method:"delete",key:e,options:t,segment:"instance"})}_localApi(e,t){return new Promise((r,i)=>{const o=this._generateRequestId(),s=this._clientId,a=n(11).version;window.parent.postMessage({method:e,args:t,requestId:o,clientId:s,version:a},"*"),this._addListener(o,e=>{if(e.errorMessage){const t=new Error(e.errorMessage);t.data=e.data,i(t)}else r(e)})})}_receiveMessage(e){const{method:t,type:n,requestId:r}=e.data;let i=[...this.listeners[t]||c,...this.listeners[n]||c,...this.listeners[r]||c];i&&i.forEach(t=>{try{t(e.data)}catch(e){console.error("Message callback error: ",e)}})}_addListener(e,t){this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(t)}_generateRequestId(){return Math.random().toString(36).substr(2,9)}_removeEventListener(){window.removeEventListener("message",this._receiveMessage,!1)}_clearListeners(){this.listeners=[]}}e.exports=function(e={}){return new u(e)}},function(e,t,n){const{MONDAY_API_URL:r,MONDAY_OAUTH_TOKEN_URL:i}=n(2),o=n(7);e.exports={execute:async function(e,t,n={}){if(!t&&n.url!==i)throw new Error("Token is required");const s=`${n.url||r}${n.path||""}`;let a=await function(e,t,n,r={}){return o.nodeFetch(e,{method:r.method||"POST",body:JSON.stringify(t||{}),headers:{Authorization:n,"Content-Type":"application/json"}})}(s,e,t,n);try{return await a.json()}catch(e){throw new Error("Could not parse JSON from monday.com's GraphQL API response")}},COULD_NOT_PARSE_JSON_RESPONSE_ERROR:"Could not parse JSON from monday.com's GraphQL API response"}},function(e,t){var n,r,i=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(e){n=o}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var c,u=[],l=!1,d=-1;function h(){l&&c&&(l=!1,c.length?u=c.concat(u):d=-1,u.length&&p())}function p(){if(!l){var e=a(h);l=!0;for(var t=u.length;t;){for(c=u,u=[];++d<t;)c&&c[d].run();d=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new f(e,t)),1!==u.length||l||a(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(e,t,n){const r=n(8);e.exports={nodeFetch:function(e,t={}){return r(e,t)}}},function(e,t,n){"use strict";var r=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r)return r;throw new Error("unable to locate global object")}();e.exports=t=r.fetch,t.default=r.fetch.bind(r),t.Headers=r.Headers,t.Request=r.Request,t.Response=r.Response},function(e,t){let n=!1;e.exports={initScrollHelperIfNeeded:function(){if(n)return;n=!0;const e=document.createElement("style");e.appendChild(document.createTextNode('body::before { content: ""; position: fixed; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none; z-index: 2147483647; /* mondaySdk css - can be disabled with: mondaySdk({withoutScrollHelper: true }) */ }')),(document.head||document.getElementsByTagName("head")[0]).appendChild(e)}}},function(e,t){let n=!1;e.exports={initBackgroundTracking:e=>{if(n)return;n=!0;const t=()=>{e.track("ping")};t(),setInterval(t,3e5)}}},function(e){e.exports=JSON.parse('{"name":"monday-sdk-js","version":"0.1.1","private":false,"repository":"https://github.com/mondaycom/monday-sdk-js","main":"src/index.js","author":"talharamati <tal@monday.com>","license":"MIT","files":["LICENSE","README.md","dist/","src/","server-sdk.js"],"dependencies":{"@types/source-map":"^0.5.2","node-fetch":"^2.6.0"},"devDependencies":{"@babel/cli":"^7.6.0","@babel/core":"^7.6.0","@babel/node":"^7.6.1","@babel/preset-env":"^7.6.0","@babel/preset-react":"^7.0.0","@babel/register":"^7.6.0","babel-loader":"^8.0.6","chai":"^4.2.0","eslint":"^6.8.0","jsdom":"^16.2.0","mocha":"^7.1.0","prettier":"^1.19.1","sinon":"^9.0.0","sinon-chai":"^3.5.0","webpack":"^4.38.0","webpack-cli":"^3.3.6","webpack-dev-server":"^3.7.2"},"scripts":{"start":"webpack-dev-server","build":"webpack --mode=production --env.WEBPACK_BUILD=true","test":"mocha \'./src/**/*-test.js\'","test:watch":"mocha \'./src/**/*-test.js\' --watch","precommit":"yarn lint && yarn style-check","lint":"eslint \'./src/**/*.*\'","style-check":"prettier --check \'./src/**/*.js\'"}}')},function(e,t,n){const r=n(1),{oauthToken:i}=n(13);class o{constructor(e={}){this._token=e.token,this.setToken=this.setToken.bind(this),this.api=this.api.bind(this)}setToken(e){this._token=e}async api(e,t={}){const n={query:e,variables:t.variables},i=t.token||this._token;if(!i)throw new Error("Should send 'token' as an option or call mondaySdk.setToken(TOKEN)");return await r.execute(n,i)}oauthToken(e,t,n){return i(e,t,n)}}e.exports=function(e={}){return new o(e)}},function(e,t,n){const{execute:r}=n(1),{MONDAY_OAUTH_TOKEN_URL:i}=n(2);e.exports={oauthToken:(e,t,n)=>r({code:e,client_id:t,client_secret:n},null,{url:i})}}]);