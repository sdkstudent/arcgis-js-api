// COPYRIGHT © 2015 Esri
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
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.

define(["../../declare","dojo/_base/fx","dojo/_base/lang","dojo/aspect","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/fx","dojo/has","dojox/gesture/swipe","dojox/mvc/Templated","dojo/text!./templates/InfographicsCarousel.html","./Infographic","dojo/on","dojo/dom-class","./InfographicsOptions","./theme","../../tasks/geoenrichment/GeoenrichmentTask","../../tasks/geoenrichment/GeometryStudyArea","./config","../_EventedWidget","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/form/Select"],function(t,e,i,s,n,o,r,a,h,d,l,u,c,_,p,g,f,y,m,v,A){function C(t,i,r){function h(t,i,s,n,o){var a={};return a[i]={start:s,end:n},o&&(a[i].units=o),e.animateProperty({node:t,properties:a,duration:r})}if(i&&r){var d=t.cloneNode(!0);t.parentNode.insertBefore(d,t);var l;if(!o.isBodyLtr())switch(i){case S:i=b;break;case b:i=S}switch(i){case R:l=a.combine([h(d,"opacity",1,0),h(t,"opacity",0,1)]);break;case S:l=a.combine([h(d,"left",0,-100,"%"),h(t,"left",100,0,"%")]);break;case b:l=a.combine([h(d,"left",0,100,"%"),h(t,"left",-100,0,"%")])}s.after(l,"onEnd",function(){n.destroy(d)}),l.play()}}var R="f",S="sf",b="sb",x=t(d.Swipe,{_process:function(t,e,i){i._locking=i._locking||{},i._locking[this.defaultEvent]||this.isLocked(i.currentTarget)||(i._locking[this.defaultEvent]=!0,this[e](t.data,i))}}),I=t([],{_swipe:null,_node:null,_rtl:null,_ltr:null,_distance:50,constructor:function(t,e,s,n){this._node=t,this._rtl=e,this._ltr=s,n&&(this._distance=n),this._swipe=new x,_(this._node,this._swipe,function(){}),_(this._node,this._swipe.end,i.hitch(this,"_end"))},_end:function(t){var e=t.dx;Math.abs(e)<this._distance||(0>e&&this._rtl?this._rtl():this._ltr&&this._ltr())}}),P=t("esri.dijit.geoenrichment.InfographicsCarousel",[l,A],{templateString:u,studyArea:null,outSR:null,studyAreaTitle:null,selectedIndex:0,options:null,expanded:!0,returnGeometry:!1,animDuration:200,_items:null,_loading:null,_infographic:null,_getCountryPromise:null,_countryForStudyArea:!1,_pendingAnimation:null,_pendingReload:!0,_eventMap:{resize:["size"],"data-ready":["provider"],"data-error":["error"]},postCreate:function(){this.inherited(arguments),setTimeout(i.hitch(this,this._onResize),0),h("touch")&&new I(this._container,i.hitch(this,"_slideForward"),i.hitch(this,"_slideBack")),h("esri-touch")&&_(this.domNode,"touchmove",function(t){t.stopPropagation()})},startup:function(){this.inherited(arguments),this.options||this.set("options",new g)},_setReturnGeometryAttr:function(t){this._set("returnGeometry",t),this._infographic.set("returnGeometry",t)},_setStudyAreaAttr:function(t){this._countryForStudyArea=!1,this._set("studyArea",t),this._getCountryPromise||(this._infographic.get("countryID")?this._infographic.set("studyArea",t):this._getCountry()),this._updateSubtitle()},_setOutSR:function(t){this._set("outSR",t),this._infographic.set("outSR",t)},_getCountry:function(){if(!this._getCountryPromise){var t=new y(v.server);t.token=v.token;var e=this.get("studyArea");this._getCountryPromise=t.getCountries(e.geometry),this._getCountryPromise.always(i.hitch(this,function(){this._getCountryPromise=null})),this._getCountryPromise.then(i.hitch(this,this._onGetCountryComplete,e),i.hitch(this,this._onDataError))}},_onGetCountryComplete:function(t,e){this.studyArea===t&&(this._countryForStudyArea=!0),this._infographic.set("countryID",e[0]),this._infographic.set("studyArea",this.studyArea),this._getReports()},_setStudyAreaTitleAttr:function(t){this._set("studyAreaTitle",t),this._updateSubtitle()},_updateSubtitle:function(){var t;t=this.studyArea instanceof m?"polygon"==this.studyArea.geometry.type?this.studyAreaTitle?this.studyAreaTitle:"${name}":this.studyAreaTitle?"<div>${address}</div><div>"+this.studyAreaTitle+" (${name})</div>":"<div>${address}</div><div>${name}</div>":"<div>${address}</div><div>${name}</div>",this._infographic.set("subtitle",t)},_setOptionsAttr:function(t){this._set("options",t),this._getReports(),f.set(this.domNode,this.options.theme)},_getReports:function(){if(this.options){var t=this._infographic.get("countryID");t&&(this._pendingReload=!0,this._showProgress(),this.options.getItems(t).then(i.hitch(this,this._fillReports),i.hitch(this,this._onDataError)))}},_fillReports:function(t){this._items=[],this._select.removeOption(this._select.getOptions());for(var e=0;e<t.length;e++)if(t[e].isVisible){var i=t[e];this._items.push(i),this._select.addOption({value:(this._items.length-1).toString(),label:i.title})}this._infographic.set("cacheLimit",this._items.length),this._titlePane.style.visibility="",this._updateSelection(),this._infographic.set("studyAreaOptions",this.options.studyAreaOptions)},_setExpandedAttr:function(t){this._set("expanded",t),t?p.remove(this.domNode,"Collapsed"):p.add(this.domNode,"Collapsed"),this._infographic.set("expanded",t),this._pendingReload=!0},_setSelectedIndexAttr:function(t){this.selectedIndex!=t&&(this._set("selectedIndex",t),this._updateSelection())},_updateSelection:function(){if(this._items){this._pendingAnimation||(this._pendingAnimation=R),this._pendingReload=!0;var t=this._items[this.selectedIndex];this._select.set("value",this.selectedIndex),this._infographic.set("type",t.type),this._infographic.set("variables",t.variables)}},_onDataReady:function(t){var e=!1,i=t.getData(),s=i.features.length;if(s>0)for(var n=i.features[0],o=0;o<i.fields.length;o++)if(i.fields[o].fullName&&n.attributes[i.fields[o].name]){e=!0;break}e?(C(this._infographic.domNode,this._pendingAnimation,this.animDuration),this._pendingAnimation=null,this.onDataReady(t)):this._countryForStudyArea||(this._infographic.set("variables",null),t.stop(),this._getCountry())},onDataReady:function(){},_onDataLoad:function(){this._getCountryPromise||(this._hideProgress(),this.onDataLoad())},onDataLoad:function(){},_onDataError:function(t){this._hideProgress(),this.onDataError(t)},onDataError:function(){},_showProgress:function(){this._pendingReload?(r.set(this._reloadProgress,"display",""),this._pendingReload=!1):r.set(this._updateProgress,"display","")},_hideProgress:function(){r.set(this._reloadProgress,"display","none"),r.set(this._updateProgress,"display","none")},_slideBack:function(){this._pendingAnimation=b,this._infographic.set("effect","slideBack");var t=this.get("selectedIndex")-1;0>t&&(t=this._items.length-1),this.set("selectedIndex",t)},_slideForward:function(){this._pendingAnimation=S;var t=this.get("selectedIndex")+1;t>=this._items.length&&(t=0),this.set("selectedIndex",t)},_onSelectChange:function(){this.set("selectedIndex",+this._select.get("value"))},_onResize:function(){this.onResize([this.domNode.scrollWidth,this.domNode.scrollHeight])},onResize:function(){},_getCountryIDAttr:function(){return this._infographic.get("countryID")}});return P});