// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.18/esri/copyright.txt for details.

define(["require","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","../kernel","dojo/uacss","dijit/_WidgetBase","../arcgis/AppProxyManager","../arcgis/utils","dojo/i18n!../nls/jsapi","dojo/Deferred","dojo/on","dojo/promise/all","dojo/query","dojo/string","dojo/dom-attr","dojo/dom-construct","dojo/store/Memory","dgrid/OnDemandGrid","dgrid/Selection","dgrid/editor","dojo/domReady!"],function(e,t,i,r,s,o,a,n,h,c,d,u,p,m,l,g,_,f,x,y,w){var v=i([a],{declaredClass:"esri.dijit.AppProxySettings",_creditDomains:[/demographics\w*\.arcgis\.com/i,/geoenrich\w*\.arcgis\.com/i,/route\w*\.arcgis\.com/i,/logistics\w*\.arcgis\.com/i,/analysis\w*\.arcgis\.com/i,/elevation\w*\.arcgis\.com/i],_premiumDomains:[/traffic\w*\.arcgis\.com/i,/landsat\w*\.arcgis\.com/i,/elevation\w*\.arcgis\.com/i,/geoenrich\w*\.arcgis\.com/i,/hydro\w*\.arcgis\.com/i,/naip\w*\.arcgis\.com/i,/livefeeds\w*\.arcgis\.com/i,/demographics\w*\.arcgis\.com/i,/landscape\w*\.arcgis\.com/i,/historical\w*\.arcgis\.com/i,/earthobs\w*\.arcgis\.com/i],defaults:{webmaps:[],proxyManagerOptions:{appid:""},proxies:[]},constructor:function(e){this.css={container:"esriAppProxySettings"};var t=r.mixin({},this.defaults,e);this.set(t),this.appProxyManager=new n(this.proxyManagerOptions),this.appProxyManager.loaded?this._init():u.once(this.appProxyManager,"load",r.hitch(this,function(){this._init()}))},startup:function(){this.inherited(arguments),this.loaded?this._createTable():u.once(this,"load",r.hitch(this,function(){this._createTable()}))},_queryForSecureServices:function(e){return h.getItem(e).then(r.hitch(this,this._parseMap)).then(r.hitch(this,function(e){var i=this._mapsProxies;return t.forEach(e,r.hitch(this,function(e){i.push(e)})),e}))},_loaded:function(){this.set("loaded",!0),this.emit("load")},_itemInApp:function(e,i){return t.some(this._mapsProxies,function(t){return t[e]===i.url?(t.title=i.title,!0):void 0})},_parseUrl:function(e){var t=document.createElement("a");return t.href=e,t},_consumesCredits:function(e){var i=t.some(this._creditDomains,function(t){return e.search(t)>-1});return i},_isPremium:function(e){var i=t.some(this._premiumDomains,function(t){return e.search(t)>-1});return i},_checkItem:function(e){var t=new d,i=this._parseUrl(e.url);return this._isPremium(i.host)?t.resolve({sourceUrl:e.url,id:e.id,title:e.title,proxyId:null,proxied:!1}):t.resolve(),t.promise},_parseMap:function(e){if(e&&e.itemData){var i=e.itemData.operationalLayers,s=[];return t.forEach(i,r.hitch(this,function(e){var t=this._itemInApp("sourceUrl",e);t||s.push(this._checkItem(e))})),p(s).then(function(e){var i=[];return t.forEach(e,function(e){e&&i.push(e)}),i})}var o=new d;return o.resolve(),o.promise},_getWebmapsProxies:function(){this._mapsProxies=this.proxies;for(var e=[],t=0,i=this.webmaps.length;i>t;t++)e.push(this._queryForSecureServices(this.webmaps[t]));return p(e)},_webmapsChanged:function(){var e=new d;return this.webmaps&&this.webmaps.length?this._getWebmapsProxies().then(r.hitch(this,function(){this.set("proxies",this._mapsProxies),e.resolve()})):e.resolve(),e.promise},_init:function(){var e=this.appProxyManager.proxies;t.forEach(e,r.hitch(this,function(e,t){if(!e.hasOwnProperty("title")){var i=this._parseUrl(e.sourceUrl);i&&i.host&&(e.title=l.substitute(c.widgets.appProxySettings.untitled,{url:i.host}))}e.hasOwnProperty("proxied")||(e.proxied=!0,e.id="AppProxy"+t)})),this.proxies=e,this.webmaps&&this.webmaps.length?this._webmapsChanged().then(r.hitch(this,function(){this._loaded()})):this._loaded()},_createTable:function(){this._memoryStore=new f({data:this.proxies});var t=_.create("div",{className:this.css.container},this.domNode),s=i([x,y]);this._grid=new s({store:this._memoryStore,selectionMode:"single",columns:{proxied:w({label:"",field:"proxied",editor:"checkbox"}),title:{label:c.widgets.appProxySettings.premiumContent,get:r.hitch(this,function(e){var t=e.title;return this._consumesCredits(e.sourceUrl)&&(t+=" ${url}"),t}),formatter:function(t){return l.substitute(t,{url:'<img width="16" height="16" src="'+e.toUrl("../css/images/item_type_icons/premiumcredits16.png")+'" />'})}}}},t),this._grid.startup(),this.own(u(this._grid,"dgrid-datachange",r.hitch(this,function(e){var t,i=e.cell,s=m("input",i.element);s&&s.length&&(t=s[0]),t&&g.set(t,"disabled",!0);var o=i.row.data,a=e.value;a?this.appProxyManager.createProxies([o]).then(r.hitch(this,function(e){this._updateProxy(o,a,t,e),this.emit("create-proxy",o)})):this.appProxyManager.deleteProxies([o]).then(r.hitch(this,function(){this._updateProxy(o,a,t),this.emit("delete-proxy",o)}))})))},_updateProxy:function(e,i,s,o){t.some(o,r.hitch(this,function(t){if(t.sourceUrl===e.sourceUrl){if(t.proxied=i,this._memoryStore){var s=r.mixin(e,{proxyId:t.proxyId});this._memoryStore.put(s,{overwrite:!0})}return!0}})),s&&g.set(s,"disabled",!1)},_setWebmapsAttr:function(e){var t=e.slice();this._set("webmaps",t),this._created&&this._memoryStore&&this._webmapsChanged()},_setProxiesAttr:function(e){var t=e.slice();this._set("proxies",t),this._created&&this._memoryStore&&(this._memoryStore.setData(this.proxies),this._grid.set("store",this._memoryStore))}});return o("extend-esri")&&r.setObject("dijit.AppProxySettings",v,s),v});