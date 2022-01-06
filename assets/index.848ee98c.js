import{o as e,c as t,a as s,w as i,p as a,b as o,d as r,t as n,n as d,F as l,r as c,e as u,f as h,g as p,h as g,v as m,i as v,j as k,k as y}from"./vendor.80871c24.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var w=(e,t)=>{for(const[s,i]of t)e[s]=i;return e};const b=e=>(a("data-v-5095e762"),e=e(),o(),e),f={id:"login-view"},S={class:"card"},I=b((()=>s("h1",null,"Quote Bracket",-1))),G=b((()=>s("br",null,null,-1)));const $={computed:{},methods:{handleDiscordLogin(){let e=new URLSearchParams;if(e.set("response_type","token"),e.set("client_id",this.discord.client.id),e.set("scope",this.discord.auth.scopes.join(" ")),e.set("redirect_uri",window.location.origin+window.location.pathname),this.discord.auth.useState){let t=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);sessionStorage.setItem("qb-auth-state",t),e.set("state",t)}window.location.href=`${this.discord.auth.base}?${e.toString()}`},handleGuildID(){this.$emit("change-state","id-entry")}}};var D=w(Object.assign($,{setup:function(a){return(a,o)=>(e(),t("div",f,[s("div",S,[I,s("button",{onClick:o[0]||(o[0]=i(((...e)=>a.handleDiscordLogin&&a.handleDiscordLogin(...e)),["stop"])),class:"discord-login"}," Login With Discord "),G,s("button",{onClick:o[1]||(o[1]=i(((...e)=>a.handleGuildID&&a.handleGuildID(...e)),["stop"])),class:"server-id-login"}," Enter a Server ID ")])]))}}),[["__scopeId","data-v-5095e762"]]);const B=["tabindex"],L={key:0},q={key:1,class:"guild-card"},C=["src","alt"],_=["onClick"],x={class:"guild-card"},O=["src","alt"];var H=w({emits:["setGuild"],props:{options:{required:!0,type:Array},defaultOption:{required:!1,type:Number,default:0},tabindex:{required:!1,type:Number,default:0}},data:()=>({selected:null,open:!1}),methods:{handleSelect(e){this.$emit("setGuild",e),this.selected=e,this.open=!1}},mounted(){var e;(null==(e=this.options)?void 0:e.length)&&null!==this.defaultOption&&(this.selected=this.options[this.defaultOption],this.$emit("setGuild",this.selected))}},[["render",function(a,o,h,p,g,m){return e(),t("div",{class:"custom-select",tabindex:h.tabindex,onBlur:o[1]||(o[1]=e=>g.open=!1)},[s("div",{class:d(["selected",{open:g.open}]),onClick:o[0]||(o[0]=i((e=>g.open=!g.open),["stop"]))},[null===g.selected?(e(),t("span",L," Select a Server ")):(e(),t("div",q,[s("img",{class:"guild-icon",src:`https://cdn.discordapp.com/icons/${g.selected.id}/${g.selected.icon}.png`,alt:`${g.selected.name}'s Server Icon`},null,8,C),r(" "+n(g.selected.name),1)]))],2),s("div",{class:d(["items",{selectHide:!g.open}])},[(e(!0),t(l,null,c(h.options,((a,o)=>(e(),t("div",{class:"item",key:o,onClick:i((e=>m.handleSelect(a)),["stop"])},[s("div",x,[a.icon?(e(),t("img",{key:0,class:"guild-icon",src:`https://cdn.discordapp.com/icons/${a.id}/${a.icon}.png`,alt:`${a.name}'s Server Icon`},null,8,O)):u("",!0),r(" "+n(a.name),1)])],8,_)))),128))],2)],40,B)}],["__scopeId","data-v-691298a4"]]);const Q=e=>(a("data-v-99e1eb7c"),e=e(),o(),e),P={id:"guild-select"},U={class:"card"},j=Q((()=>s("h1",null,"Quote Bracket",-1))),E={key:0},N={key:1},R=Q((()=>s("br",null,null,-1)));const F={data:()=>({userGuilds:[],loading:!0,selectedGuild:null,message:"Loading Your Servers...",errored:!1}),methods:{loadHistory(){this.$emit("set-guild",this.selectedGuild.id),this.$emit("change-state","view-history")},selectGuild(e){this.selectedGuild=e}},async mounted(){let e=sessionStorage.getItem("qb-auth-token");try{var t=await p.get(`${this.discord.api.base}${this.discord.api.getGuilds}`,{headers:{Authorization:`Bearer ${e}`}})}catch(a){return this.message="Error Getting Your Server List From Discord",void(this.errored=!0)}let s=t.data;if(200<=t.status&&t.status<300){try{t=await p.post(`${this.private.api}/guilds/compare`,t.data.map((e=>e.id)))}catch(a){return this.message="Error Comparing Server Lists",void(this.errored=!0)}let e=t.data;if(1===e.length)return this.$emit("set-guild",e[0]),void this.$emit("change-state","view-history");for(var i of s)e.includes(i.id)&&this.userGuilds.push(i);this.loading=!1}}};var M=w(Object.assign(F,{setup:function(a){return(a,o)=>(e(),t("div",P,[s("div",U,[j,a.loading?(e(),t("div",E,[s("h2",null,n(a.message),1),a.errored?(e(),t("button",{key:0,onClick:o[0]||(o[0]=i((e=>a.$emit("change-state","login")),["stop"]))}," Go Back ")):u("",!0)])):(e(),t("div",N,[h(H,{options:a.userGuilds,"default-option":null,onSetGuild:a.selectGuild},null,8,["options","onSetGuild"]),R,null!==a.selectedGuild?(e(),t("button",{key:0,onClick:o[1]||(o[1]=i(((...e)=>a.loadHistory&&a.loadHistory(...e)),["stop"]))}," Load History ")):u("",!0)]))])]))}}),[["__scopeId","data-v-99e1eb7c"]]);const W=e=>(a("data-v-60c5e1f8"),e=e(),o(),e),A={id:"guild-id-input"},z={class:"card"},T=W((()=>s("h1",null,"Quote Bracket",-1))),V=W((()=>s("p",null,[r(" Enter a server ID in the box below in order to load the quote bracket history. If you need help finding out how to get the server's ID, you can read Discord's help article about getting IDs here: "),s("a",{href:"https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-"}," Where can I find my User/Server/Message ID? ")],-1))),Y={class:"flex-row"},K={key:0},J={class:"flex-row"};const X={data:()=>({guildID:""}),computed:{hasError(){return null!=this.guildID.match(/[^0-9]/g)}},methods:{goBack(){this.$emit("change-state","login")},loadHistory(){this.$emit("set-guild",this.guildID),this.$emit("change-state","view-history")}},async mounted(){}};var Z=w(Object.assign(X,{setup:function(a){return(a,o)=>(e(),t("div",A,[s("div",z,[T,s("div",null,[V,s("div",Y,[g(s("input",{type:"text",name:"Server ID",id:"server-id","onUpdate:modelValue":o[0]||(o[0]=e=>v(guildID)?guildID.value=e:null)},null,512),[[m,a.guildID]])]),a.hasError?(e(),t("div",K," The server ID you entered is invalid, please make sure that you entered it correctly. ")):u("",!0),s("div",J,[s("button",{onClick:o[1]||(o[1]=i(((...e)=>a.goBack&&a.goBack(...e)),["stop"]))}," Cancel "),a.guildID&&!a.hasError?(e(),t("button",{key:0,onClick:o[2]||(o[2]=i(((...e)=>a.loadHistory&&a.loadHistory(...e)),["stop"]))}," Load History ")):u("",!0)])])])]))}}),[["__scopeId","data-v-60c5e1f8"]]);const ee=e=>(a("data-v-43b8754c"),e=e(),o(),e),te={id:"history"},se={class:"card"},ie=ee((()=>s("h2",null,"Quote Bracket History",-1))),ae={key:0},oe={class:"flex-row controls"},re=["disabled"],ne=["disabled"],de=["disabled"],le=["disabled"],ce={class:"quotes"},ue={class:"text"},he={class:"metadata flex-row"},pe={class:"votes"},ge={key:0,class:"streak"},me={key:1},ve=[ee((()=>s("p",null," There was an error loading the quote bracket information. Please wait a minute and then try again. If the issue continues, let Oliver know. ",-1)))];const ke={props:{gid:{required:!0}},data:()=>({history:[],page:0}),computed:{bracket(){return this.history[this.page]},isFirst(){return this.page===this.history.length-1},isLast(){return 0===this.page},date(){return new Date(this.bracket.date).toLocaleString()},winners(){let e=-1,t=[];for(var s in this.bracket.quotes){let i=this.bracket.quotes[s];i.votes===e?t.push(s):i.votes>e&&(e=i.votes,t=[s])}return t}},methods:{quoteClasses(e){return this.winners.includes(`${e}`)?["winner"]:[]},updateQuery(){let e=new URL(window.location.href);e.searchParams.set("page",this.page),history.replaceState(null,null,e)},oldestBracket(){this.page=0,this.updateQuery()},olderBracket(){this.page--,this.updateQuery()},newerBracket(){this.page++,this.updateQuery()},newestBracket(){this.page=this.history.length-1,this.updateQuery()},resetGuild(){window.location.search="",this.$emit("set-guild",null),this.$emit("change-state","login")}},async mounted(){let e=new URLSearchParams(window.location.search);try{let t=await p.get(`${this.private.api}/${this.gid}/history`);200===t.status&&(this.history=t.data),e.has("page")?(this.page=parseInt(e.get("page")),this.updateQuery()):this.newestBracket()}catch(t){}}};var ye=w(Object.assign(ke,{setup:function(a){return(a,o)=>(e(),t("div",te,[s("div",se,[ie,a.bracket?(e(),t("div",ae,[s("div",oe,[s("button",{class:"no-mobile",disabled:a.isFirst,onClick:o[0]||(o[0]=i(((...e)=>a.newestBracket&&a.newestBracket(...e)),["stop"]))}," Newest ",8,re),s("button",{disabled:a.isFirst,onClick:o[1]||(o[1]=i(((...e)=>a.newerBracket&&a.newerBracket(...e)),["stop"]))}," Newer ",8,ne),s("span",null,n(a.date),1),s("button",{disabled:a.isLast,onClick:o[2]||(o[2]=i(((...e)=>a.olderBracket&&a.olderBracket(...e)),["stop"]))}," Older ",8,de),s("button",{class:"no-mobile",disabled:a.isLast,onClick:o[3]||(o[3]=i(((...e)=>a.oldestBracket&&a.oldestBracket(...e)),["stop"]))}," Oldest ",8,le)]),s("div",ce,[(e(!0),t(l,null,c(a.bracket.quotes,((i,o)=>(e(),t("div",{class:d(["quote",a.quoteClasses(o)]),key:o},[s("span",ue,n(i.text),1),s("div",he,[s("span",pe,"Votes: "+n(i.votes),1),i.win_streak>0?(e(),t("span",ge," Win Streak: "+n(i.win_streak),1)):u("",!0)])],2)))),128))])])):(e(),t("div",me,ve)),s("button",{onClick:o[4]||(o[4]=i(((...e)=>a.resetGuild&&a.resetGuild(...e)),["stop"]))}," Pick a Different Server ")])]))}}),[["__scopeId","data-v-43b8754c"]]);const we={data:()=>({state:"login",gid:null}),methods:{setGuild(e){if(this.gid=e,e){let t=new URL(window.location.href);t.searchParams.set("gid",e),window.history.replaceState(null,null,t)}}},mounted(){let e=new URLSearchParams(window.location.search);if(e.has("gid"))return this.gid=e.get("gid"),void(this.state="view-history");let t=new URLSearchParams(window.location.hash);t.has("access_token")&&(this.discord.auth.useState?sessionStorage.getItem("qb-auth-state")===t.get("state")?(console.info("State compare success"),sessionStorage.setItem("qb-auth-token",t.get("access_token")),sessionStorage.removeItem("qb-auth-state"),window.location.hash=""):(console.error("State compare failed"),window.location.hash=""):sessionStorage.setItem("qb-auth-token",t.get("access_token"))),sessionStorage.getItem("qb-auth-token")&&(this.state="guild-select")}};let be=y(Object.assign(we,{setup:function(t){return(t,s)=>"login"===t.state?(e(),k(D,{key:0,class:"inner-view",onChangeState:s[0]||(s[0]=e=>t.state=e)})):"guild-select"===t.state?(e(),k(M,{key:1,class:"inner-view",onSetGuild:s[1]||(s[1]=e=>t.setGuild(e)),onChangeState:s[2]||(s[2]=e=>t.state=e)})):"id-entry"===t.state?(e(),k(Z,{key:2,class:"inner-view",onSetGuild:s[3]||(s[3]=e=>t.setGuild(e)),onChangeState:s[4]||(s[4]=e=>t.state=e)})):"view-history"===t.state?(e(),k(ye,{key:3,class:"inner-view",gid:t.gid,onSetGuild:s[5]||(s[5]=e=>t.setGuild(e)),onChangeState:s[6]||(s[6]=e=>t.state=e)},null,8,["gid"])):u("",!0)}}));be.mixin({data:()=>({discord:{client:{id:"863968565353906226"},auth:{base:"https://discord.com/api/oauth2/authorize",scopes:["identify","guilds"],useState:!0},api:{base:"https://discord.com/api/v9",getGuilds:"/users/@me/guilds"}},private:{api:"http://vps.oliver.akins/quote-bracket"}}),methods:{},computed:{}}),be.mount("#app");
