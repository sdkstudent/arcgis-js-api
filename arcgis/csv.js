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

define(["dojo/_base/lang","dojo/_base/array","dojo/_base/Deferred","dojo/sniff","dojo/number","dojox/data/CsvStore","../kernel","../config","../request","../SpatialReference","../geometry/jsonUtils","../geometry/webMercatorUtils"],function(e,t,i,n,r,a,o,s,l,f,u,c){function d(e){var i=[","," ",";","|","	"],n=0,r="";return t.forEach(i,function(t){var i=e.split(t).length;i>n&&(n=i,r=t)}),r}function h(e,t){if(!e||"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))return!1;var i=!0;if(n("chrome")&&/\d+\W*$/.test(t)){var r=t.match(/[a-zA-Z]{2,}/);if(r){for(var a=!1,o=0,s=r.length,l=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i;!a&&s>=o&&!(a=!l.test(r[o]));)o++;i=!a}}return i}function p(i,n,o){var s=i.indexOf("\n"),l=e.trim(i.substr(0,s)),f=n.columnDelimiter;f||(f=d(l));var u=new a({data:i,separator:f});return u.fetch({onComplete:function(i,a){var s=0,l={layerDefinition:n.layerDefinition,featureSet:{features:[],geometryType:"esriGeometryPoint"}},f=l.layerDefinition.objectIdField,c=l.layerDefinition.fields;f||t.some(c,function(e){return"esriFieldTypeOID"===e.type?(f=e.name,!0):!1})||(c.push({name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1}),f="__OBJECTID");var d,p,m=u._attributes,g=[],y=[];if(t.forEach(c,function(e){"esriFieldTypeDate"===e.type?g.push(e.name):("esriFieldTypeDouble"===e.type||"esriFieldTypeInteger"===e.type)&&y.push(e.name)}),n.locationInfo&&"coordinates"===n.locationInfo.locationType?(d=n.locationInfo.latitudeFieldName,p=n.locationInfo.longitudeFieldName):t.forEach(m,function(e){var i;i=t.indexOf(w,e.toLowerCase()),-1!==i&&(d=e),i=t.indexOf(O,e.toLowerCase()),-1!==i&&(p=e)}),!d||!p){var x="File does not seem to contain fields with point coordinates.";return setTimeout(function(){console.error(x)},1),void(o&&o(null,new Error(x)))}-1===t.indexOf(y,d)&&y.push(d),-1===t.indexOf(y,p)&&y.push(p);var v;e.isArray(n.outFields)&&-1===t.indexOf(n.outFields,"*")&&(v=n.outFields),t.forEach(m,function(e){t.some(c,function(t){return e===t.name})||c.push({name:e,alias:e,type:e===d||e===p?"esriFieldTypeDouble":"esriFieldTypeString"})});var b=0,T=i.length;for(b;T>b;b++){var N=i[b],F=u.getAttributes(N),S={};t.forEach(F,function(e){if(e&&(e===d||e===p||!v||t.indexOf(v,e)>-1)){var i=e;if(0===e.length&&t.forEach(c,function(t,i){t.name==="attribute_"+(i-1)&&(e="attribute_"+(i-1))}),t.indexOf(g,e)>-1){var n=u.getValue(N,i),a=new Date(n);S[e]=h(a,n)?a.getTime():null}else if(t.indexOf(y,e)>-1){var o=r.parse(u.getValue(N,i));e!==d&&e!==p||!(isNaN(o)||Math.abs(o)>181)?isNaN(o)?S[e]=null:S[e]=o:(o=parseFloat(u.getValue(N,i)),isNaN(o)?S[e]=null:S[e]=o)}else S[e]=u.getValue(N,i)}}),S[f]=s,s++;var _=S[d],D=S[p];if(null!=D&&null!=_&&!isNaN(_)&&!isNaN(D)){v&&-1===t.indexOf(v,d)&&delete S[d],v&&-1===t.indexOf(v,p)&&delete S[p];var k={geometry:{x:D,y:_,spatialReference:{wkid:4326}},attributes:S};l.featureSet.features.push(k)}}l.layerDefinition.name="csv",o&&o(l)},onError:function(e){console.error("Error fetching items from CSV store: ",e),o&&o(null,e)}}),!0}function m(i,n,r,a,o,l){0===i.length&&o(null);var f=u.getGeometryType(n),d=[];t.forEach(i,function(e){var t=new f(e);t.spatialReference=r,d.push(t)},this);var h=[102113,102100,3857];if(r.wkid&&4326===r.wkid&&a.wkid&&t.indexOf(h,a.wkid)>-1)t.forEach(d,function(e){e.xmin?(e.xmin=Math.max(e.xmin,-180),e.xmax=Math.min(e.xmax,180),e.ymin=Math.max(e.ymin,-89.99),e.ymax=Math.min(e.ymax,89.99)):e.rings?t.forEach(e.rings,function(e){t.forEach(e,function(e){e[0]=Math.min(Math.max(e[0],-180),180),e[1]=Math.min(Math.max(e[1],-89.99),89.99)},this)},this):e.paths?t.forEach(e.paths,function(e){t.forEach(e,function(e){e[0]=Math.min(Math.max(e[0],-180),180),e[1]=Math.min(Math.max(e[1],-89.99),89.99)},this)},this):e.x&&(e.x=Math.min(Math.max(e.x,-180),180),e.y=Math.min(Math.max(e.y,-89.99),89.99))},this),i=[],t.forEach(d,function(e){var t=c.geographicToWebMercator(e);102100!==a.wkid&&(t.spatialReference=a),i.push(t.toJson())},this),o(i);else if(null!==r.wkid&&t.indexOf(h,r.wkid)>-1&&null!==a.wkid&&4326===a.wkid)i=[],t.forEach(d,function(e){i.push(c.webMercatorToGeographic(e).toJson())},this),o(i);else{var p=function(e,n){e&&e.length===i.length?(i=[],t.forEach(e,function(e){e&&(e.rings&&e.rings.length>0&&e.rings[0].length>0&&e.rings[0][0].length>0&&!isNaN(e.rings[0][0][0])&&!isNaN(e.rings[0][0][1])||e.paths&&e.paths.length>0&&e.paths[0].length>0&&e.paths[0][0].length>0&&!isNaN(e.paths[0][0][0])&&!isNaN(e.paths[0][0][1])||e.xmin&&!isNaN(e.xmin)&&e.ymin&&!isNaN(e.ymin)||e.x&&!isNaN(e.x)&&e.y&&!isNaN(e.y))?i.push(e.toJson()):i.push(null)},this),o(i)):l(e,n)};s.defaults.geometryService?s.defaults.geometryService.project(d,a,e.hitch(this,p),l):o(null)}}function g(e,i){var n=[102113,102100,3857];return e&&i&&e.wkid===i.wkid&&e.wkt===i.wkt?!0:e&&i&&e.wkid&&i.wkid&&t.indexOf(n,e.wkid)>-1&&t.indexOf(n,i.wkid)>-1?!0:!1}function y(i,n,r,a){if(i.featureSet&&0!==i.featureSet.features.length){if(g(r,n))return void a(i);var o,s=function(e){var n=[];t.forEach(i.featureSet.features,function(t,i){e[i]&&(t.geometry=e[i],n.push(t))},this),a(i)},l=function(e,t){console.error("error projecting featureSet ("+i.layerDefinition.name+"). Final try."),a(i)},c=function(t,a){console.error("error projecting featureSet ("+i.layerDefinition.name+"). Try one more time."),m(o,i.featureSet.geometryType,n,r,e.hitch(this,s),e.hitch(this,l))};i.featureSet.features&&i.featureSet.features.length>0?(o=[],t.forEach(i.featureSet.features,function(e){if(e.geometry.toJson)o.push(e.geometry);else{var t=u.getGeometryType(i.featureSet.geometryType);o.push(new t(e.geometry))}}),n.toJson||(n=new f(n)),r.toJson||(r=new f(r)),m(o,i.featureSet.geometryType,n,r,e.hitch(this,s),e.hitch(this,c))):a(i)}}function x(t){var n=new i,r=function(e,t){t?n.errback(t):n.callback(e)},a={url:t.url,handleAs:"text",load:function(i){p(i,t,e.hitch(this,r))},error:function(e){n.errback(e),console.error("error: "+e)}};return t.url.indexOf("arcgis.com")>-1&&t.url.indexOf("/content/items")>-1&&t.url.indexOf("/data")>-1&&(a.headers={"Content-Type":""}),l(a,{usePost:!1}),n}function v(t,n,r){var a=new i,o=function(e){a.callback(e)};return r||(r=new f({wkid:4326})),y(t,r,n,e.hitch(this,o)),a}function b(i){var n=i.layerDefinition.fields,r={esriFieldTypeDouble:1,esriFieldTypeSingle:1},a={esriFieldTypeInteger:1,esriFieldTypeSmallInteger:1},o={esriFieldTypeDate:1},s=null,l=t.map(n,e.hitch(this,function(t){"NAME"===t.name.toUpperCase()&&(s=t.name);var i="esriFieldTypeOID"!==t.type&&"esriFieldTypeGlobalID"!==t.type&&"esriFieldTypeGeometry"!==t.type,n=null;if(i){var l=t.name.toLowerCase(),f=",stretched value,fnode_,tnode_,lpoly_,rpoly_,poly_,subclass,subclass_,rings_ok,rings_nok,";(f.indexOf(","+l+",")>-1||l.indexOf("area")>-1||l.indexOf("length")>-1||l.indexOf("shape")>-1||l.indexOf("perimeter")>-1||l.indexOf("objectid")>-1||l.indexOf("_")===l.length-1||l.indexOf("_i")===l.length-2&&l.length>1)&&(i=!1),t.type in a?n={places:0,digitSeparator:!0}:t.type in r?n={places:2,digitSeparator:!0}:t.type in o&&(n={dateFormat:"shortDateShortTime"})}return e.mixin({},{fieldName:t.name,label:t.alias,isEditable:!0,tooltip:"",visible:i,format:n,stringFieldOption:"textbox"})})),f={title:s?"{"+s+"}":"",fieldInfos:l,description:null,showAttachments:!1,mediaInfos:[]};return f}var w=["lat","latitude","y","ycenter","latitude83","latdecdeg","point-y","lat_dd"],O=["lon","lng","long","longitude","x","xcenter","longitude83","longdecdeg","point-x","long_dd"],T={latFieldStrings:w,longFieldStrings:O,buildCSVFeatureCollection:x,projectFeatureCollection:v,generateDefaultPopupInfo:b,_getSeparator:d,_isValidDate:h,_processCsvData:p,_projectGeometries:m,_sameSpatialReference:g,_projectFeatureSet:y};return n("extend-esri")&&e.setObject("arcgis.csv",T,o),T});