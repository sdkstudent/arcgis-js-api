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

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel","./TimeInfo","../geometry/Extent"],function(e,t,n,i,s,a){var l=function(e,t){var n;for(n=0;n<e.length;n++)if(t(e[n]))return n;return-1},r=e(null,{declaredClass:"esri.layers.WCSCoverageDescription",version:null,id:null,description:null,lonLatEnvelope:null,extent:null,supportedFormats:null,supportedInterpolations:null,bandInfo:null,timeInfo:null,multidimensionalInfo:null,resolution:null,columns:null,rows:null,nativeCoverageDescription:null,_useEPSGAxis:!1,_REVERSED_LAT_LONG_RANGES:[[4001,4999],[2044,2045],[2081,2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3058,3059],[3068,3068],[3114,3118],[3126,3138],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3416,3416],[20004,20032],[20064,20092],[21413,21423],[21473,21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,27492],[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,31259],[31275,31279],[31281,31290],[31466,31700]],constructor:function(e,n){this.version=n,this._parse=t.hitch(this,this._parse),e&&t.mixin(this,this._parse(e,n))},_parse:function(e,t){var n,i,s;switch(this.version=t,t){case"1.0.0":n=this._parse100(e),this._useEPSGAxis=!1,this.id=n.name,this.description=n.description||n.label,this.lonLatEnvelope=n.lonLatEnvelope,this.extent=n.domainSet.spatialDomain.envelope,this.supportedFormats=n.supportedFormats,i=n.domainSet,s=n.rangeSet,n.supportedInterpolations&&n.supportedInterpolations.length>0&&(this.supportedInterpolations=n.supportedInterpolations.map(function(e){var t=null;return e.toLowerCase().indexOf("nearest")>-1?t=0:e.toLowerCase().indexOf("linear")>-1?t=1:e.toLowerCase().indexOf("cubic")>-1&&(t=2),t}).filter(function(e){return null!==e}));break;case"1.1.0":case"1.1.1":case"1.1.2":n=this._parse110(e),this.id=n.identifier,this.description=n["abstract"]||n.title,this.extent=n.domain.spatialDomain.envelope,this.supportedFormats=n.supportedFormats,i=n.domain,s=n.range,n.range[0].supportedInterpolations&&n.range[0].supportedInterpolations.length>0&&(this.supportedInterpolations=n.range[0].supportedInterpolations.map(function(e){var t=null;return e.toLowerCase().indexOf("nearest")>-1?t=0:e.toLowerCase().indexOf("linear")>-1?t=1:e.toLowerCase().indexOf("bicubic")>-1&&(t=2),t}).filter(function(e){return null!==e}));break;case"2.0.1":n=this._parse201(e),this._useEPSGAxis=!0,this.id=n.coverageId,this.description=n.description||n.coverageId,this.extent=n.boundedBy.envelope,this.supportedFormats=n.serviceParameters.supportedFormats,i=n.domainSet,s=n.rangeType;break;default:throw"unsupported WCS version "+t}this.nativeCoverageDescription=n,this.resolution=n.resolution,this.columns=i.columns||i.spatialDomain.columns,this.rows=i.rows||i.spatialDomain.rows,this.bandInfo=this._getBandInfo(s),this.timeInfo=this._getTimeInfo(n),this.multidimensionalInfo=this._getMultidimensionalInfo(n)},_getElements:function(e,t){if(!e)return null;if(!t)return e;var n=t;return t.indexOf("/")>-1?(n=t.slice(0,t.indexOf("/")),t=t.slice(t.indexOf("/")+1)):t="",t?this._getElement(e,n).getElementsByTagNameNS("*",t):e.getElementsByTagNameNS("*",n)},_getElement:function(e,t){if(!e)return null;if(!t)return e;var n=t;t.indexOf("/")>-1?(n=t.slice(0,t.indexOf("/")),t=t.slice(t.indexOf("/")+1)):t="";var i=this._getElements(e,n);return i.length>0?t?this._getElement(i[0],t):i[0]:null},_getElementValue:function(e,t){var n,i=this._getElement(e,t);return i?(n=i.textContent||i.text||i.nodeValue||i.innerText,n?n.trim():null):null},_getElementValues:function(e,t){var n,i,s=this._getElements(e,t),a=[];for(i=0;i<s.length;i++)n=s[i].textContent||s[i].text||s[i].nodeValue||s[i].innerText,n&&(n=n.trim(),""!==n&&a.push(n));return a},_checkTagName:function(e,t){if(null===e||null===t||null===e.tagName||void 0===e.tagName)return!1;var n=e.tagName.toLowerCase(),i=t.toLowerCase();return n===i||n.indexOf(":"+i)>0},_parseTimeResolution:function(e){if(!e)return{resolution:null,units:null};var t,n,i,s=e.toUpperCase(),a=["Y","M","D"],r=["H","M","S"],o=["Years","Months","Days","Hours","Minutes","Seconds"];return-1===s.indexOf("PT")?(s=s.slice(1),i=l(a,function(e){return s.indexOf(e)>-1}),i>-1&&(t=o[i]),n=parseFloat(s.substring(0,s.length-1))):(s=s.slice(2),i=l(r,function(e){return s.indexOf(e)>-1}),t=o[3+i],n=parseFloat(s.substring(0,s.length-1))),{resolution:n,units:t}},_getMultidimensionalInfo:function(e){var n,i,s=this.version,a=[];if(0===s.indexOf("1.1"))i=e.range.filter(function(e){return-1===e.identifier.toLowerCase().indexOf("field_1")&&!e.axis.some(function(e){return"band"===e.identifier.toLowerCase()})}),i&&i.length>0&&(i.forEach(function(e){var t=e.axis.map(function(e){var t={name:e.identifier.trim(),field:e.identifier.trim(),unit:e.valuesUnit?e.valuesUnit.trim():"",hasRegularIntervals:!1,values:e.values.map(function(e){return parseFloat(e.trim())})};return t.extent=[Math.min.apply(null,t.values),Math.max.apply(null,t.values)],t});a.push({name:e.identifier.trim(),description:e.description?e.description.trim():"",unit:"",dimensions:t})}),a.length>0&&(n={variables:a}));else if(0===s.indexOf("2.0")&&(i=[],e.rangeType.forEach(function(e){i=i.concat(e.filter(function(e){return-1===e.name.toLowerCase().indexOf("band")}))}),i&&i.length>0)){var l,r,o,u,m,p=[],h=.01,d=function(e){var t,n="";return Math.abs(e-1/24)<1/24*h?(t=1,n="Hours"):Math.abs(e-1)<1*h?(t=1,n="Days"):1>e?(t=Math.round(24*e),n="Hours"):e>28-h&&31+h>e?(t=1,n="Months"):Math.round(e/30)<12?(t=Math.round(e/30)<12,n="Months"):e>365-h&&366+h>e&&(t=1,n="Years"),{interval:t,intervalUnit:n}},g=e.boundedBy;for(l=2;l<e.domainSet.axisLabels.length;l++)r=(g.uomLabels&&g.uomLabels.length)>l?g.uomLabels[l]:"",u=e.domainSet.axisLabels[l].toLowerCase().indexOf("time")>-1||"iso8601"===r.toLowerCase(),o=u?d(e.domainSet.offset[l]):{interval:e.domainSet.offset[l],intervalUnit:r},m={name:e.domainSet.axisLabels[l].trim(),field:e.domainSet.axisLabels[l].trim(),unit:g.uomLabels&&g.uomLabels.length>l?g.uomLabels[l].trim():"",hasRegularIntervals:!0},t.mixin(m,o),u?m.extent=[(new Date).setTime(24*(e.boundedBy.envelopeAllDims.mins[l]-25569)*3600*1e3),(new Date).setTime(24*(e.boundedBy.envelopeAllDims.maxs[l]-25569)*3600*1e3)]:m.extent=[g.envelopeAllDims.mins[l],g.envelopeAllDims.maxs[l]],p.push(m);i.forEach(function(e){a.push({name:e.name.trim(),description:e.description.trim(),unit:e.uom.trim(),dimensions:p})}),a.length>0&&(n={variables:a})}return n},_getBandInfo:function(e){var t,n,i,s=!1;switch(this.version){case"1.0.0":for(t=0;t<e.length&&!s;t++)for(n=0;n<e[t].axis.length;n++)if("band"===e[t].axis[n].name.toLowerCase()){i=e[t].axis[n].values,s=!0;break}break;case"1.1.0":case"1.1.1":case"1.1.2":for(t=0;t<e.length&&!s;t++)for(n=0;n<e[t].axis.length;n++)if("band"===e[t].axis[n].identifier.toLowerCase()){i=e[t].axis[n].values,s=!0;break}break;case"2.0.1":for(t=0;t<e[0].length;t++)e[0][t].name.toLowerCase().indexOf("band")>-1&&(i=i||[],i.push(e[0][t].name))}return i},_useLatLong:function(e){var t,n;for(n=0;n<this._REVERSED_LAT_LONG_RANGES.length;n++){var i=this._REVERSED_LAT_LONG_RANGES[n];if(e>=i[0]&&e<=i[1]){t=!0;break}}return t},_getTimeInfo:function(e){var t,n,i;switch(this.version){case"1.0.0":case"1.1.0":case"1.1.1":case"1.1.2":n=(e.domainSet||e.domain).temporalDomain,n&&(t=new s({timeExtent:[n.begin,n.end],interval:n.resolution,intervalUnit:n.unit}));break;case"2.0.1":i=l(e.domainSet.axisLabels,function(e){return e.toLowerCase().indexOf("time")>-1}),i>-1&&(t=new s({startTimeField:e.domainSet.axisLabels[i],timeExtent:[(new Date).setTime(24*(e.boundedBy.envelopeAllDims.mins[i]-25569)*3600*1e3),(new Date).setTime(24*(e.boundedBy.envelopeAllDims.maxs[i]-25569)*3600*1e3)]}))}return t},_parse100:function(e){var n,i,s={name:null,label:null,lonLatEnvelope:null,supportedFormats:null,supportedCRSs:null,domainSet:null,rangeSet:null,description:null,metadataLink:null,supportedInterpolations:null},l=e.childNodes.length,r=this._checkTagName,o=t.hitch(this,function(e){var t=this._getElementValues(e,"requestResponseCRSs").map(function(e){return e.split(":")[1]}),n=this._getElementValues(e,"nativeCRSs").map(function(e){return e.split(":")[1]});return{requestResponseCRSs:t,nativeCRSs:n}}),u=t.hitch(this,function(e){var t,n=this._getElementValues(e,"interpolationMethod"),i=e.getAttribute("default");return t=void 0!==i||null!==i?[i].concat(n.filter(function(e){return e.toLowerCase()!==i.toLowerCase()})):n}),m=t.hitch(this,function(e){var t=this._getElements(e,"pos"),n=this._getElementValue(t[0]).split(" "),i=this._getElementValue(t[1]).split(" "),s=new a({xmin:parseFloat(n[0]),ymin:parseFloat(n[1]),xmax:parseFloat(i[0]),ymax:parseFloat(i[1]),spatialReference:{wkid:4326}});return s}),p=t.hitch(this,function(e){var t,n,i,s,a,l,r,o,u,m=[],p=this._getElements(e,"RangeSet");for(r=0;r<p.length;r++){for(t={},t.name=this._getElementValue(p[r],"name"),t.label=this._getElementValue(p[r],"label"),t.axis=[],n=this._getElements(p[r],"AxisDescription"),o=0;o<n.length;o++){if(i={},i.name=this._getElementValue(n[o],"name"),i.label=this._getElementValue(n[o],"label"),s=[],s=this._getElementValues(n[o],"singleValue"),0===s.length&&(a=this._getElementValue(n[o],"min"),l=this._getElementValue(n[o],"max"),null!==a&&null!==l))for(u=parseInt(a,10);u<=parseInt(l,10);u++)s.push(u);i.values=s,t.axis.push(i)}m.push(t)}return m}),h=t.hitch(this,function(e){var n={},i={},s=this._getElement(e,"spatialDomain"),l=this._getElement(s,"Envelope"),r=l.getAttribute("srsName").split(":")[1],o=this._getElements(l,"pos"),u=this._getElementValue(o[0]).split(" "),m=this._getElementValue(o[1]).split(" ");i.envelope=new a({xmin:parseFloat(u[0]),ymin:parseFloat(u[1]),xmax:parseFloat(m[0]),ymax:parseFloat(m[1]),spatialReference:{wkid:parseInt(r,10)}});var p=this._getElement(s,"RectifiedGrid"),h=this._getElementValue(p,"low").split(" "),d=this._getElementValue(p,"high").split(" "),g=parseInt(d[0],10)-parseInt(h[0],10)+1,f=parseInt(d[1],10)-parseInt(h[1],10)+1,c=this._getElementValue(s,"origin/pos").split(" "),_=this._getElements(s,"offsetVector"),v=parseFloat(this._getElementValue(_[0]).split(" ")[0]),E=parseFloat(this._getElementValue(_[0]).split(" ")[1]);i.columns=g,i.rows=f,i.offset={x:v,y:E},i.origin={x:parseFloat(c[0]),y:parseFloat(c[1])},n.spatialDomain=i;var x,b={begin:null,end:null},V=[],S=this._getElement(e,"temporalDomain");if(S){var w=this._getElements(S,"timeposition");if(w.length>0){for(x=0;x<w.length;x++)V.push(new Date(this._getElementValue(w[x])));b.begin=V[0],b.end=V[V.length-1],b.values=V}else{var L=this._getElement(S,"timePeriod");if(L){b.begin=new Date(this._getElementValue(L,"beginPosition")),b.end=new Date(this._getElementValue(L,"endPosition"));var C=this._getElementValue(L,"timeResolution");b=t.mixin(b,this._parseTimeResolution(C))}}n.temporalDomain=b}return n});for(n=0;l>n;n++)i=e.childNodes[n],r(i,"description")?s.description=this._getElementValue(i):r(i,"name")?s.name=this._getElementValue(i):r(i,"label")?s.label=this._getElementValue(i):r(i,"supportedFormats")?s.supportedFormats=this._getElementValues(i,"formats"):r(i,"supportedCRSs")?s.supportedCRSs=o(i):r(i,"supportedInterpolations")?s.supportedInterpolations=u(i):r(i,"lonLatEnvelope")?s.lonLatEnvelope=m(i):r(i,"rangeSet")?s.rangeSet=p(i):r(i,"domainSet")&&(s.domainSet=h(i),s.resolution=s.domainSet.spatialDomain.offset);return s},_parse110:function(e){var n,i,s={title:null,"abstract":null,identifier:null,supportedFormats:null,supportedCRSs:null,domain:null,range:null,metadata:null},l=e.childNodes.length,r=this._checkTagName,o=t.hitch(this,function(e){var t,n,i,s,a,l=[],r=this._getElements(e,"Field");for(t=0;t<r.length;t++){for(i={},i.identifier=this._getElementValue(r[t],"Identifier"),i.description=this._getElementValue(r[t],"Description"),i.definition=this._getElementValue(r[t],"Definition"),i.Abstract=this._getElementValue(r[t],"Abstract"),i.Title=this._getElementValue(r[t],"Title"),i.supportedInterpolations=this._getElementValues(r[t],"InterpolationMethod"),i.axis=[],a=this._getElements(r[t],"Axis"),n=0;n<a.length;n++)s={},s.identifier=a[n].getAttribute("identifier"),s.valuesUnit=this._getElementValue(a[n],"valuesUnit"),s.dataType=this._getElementValue(a[n],"DataType"),s.values=this._getElementValues(a[n],"Key"),i.axis.push(s);l.push(i)}return l}),u=t.hitch(this,function(e){var n,i,s,l,r,o,u={},m={},p=this._getElement(e,"SpatialDomain"),h=this._getElement(p,"GridCRS"),d=this._getElementValue(h,"GridBaseCRS"),g=this._getElementValue(h,"GridOrigin").split(" "),f=this._getElementValue(h,"GridOffsets").split(" "),c=this._getElements(p,"BoundingBox");for(n=0;n<c.length;n++)"urn:ogc:def:crs:OGC::imageCRS"===c[n].getAttribute("crs")?(l=this._getElementValue(c[n],"LowerCorner").split(" "),r=this._getElementValue(c[n],"UpperCorner").split(" "),i=parseInt(r[0],10)-parseInt(l[0],10)+1,s=parseInt(r[1],10)-parseInt(l[1],10)+1):c[n].getAttribute("crs").indexOf("EPSG")>0&&(o=c[n].getAttribute("crs").split("::")[1],l=this._getElementValue(c[n],"LowerCorner").split(" "),r=this._getElementValue(c[n],"UpperCorner").split(" "),m.envelope=new a({xmin:parseFloat(l[0]),ymin:parseFloat(l[1]),xmax:parseFloat(r[0]),ymax:parseFloat(r[1]),spatialReference:{wkid:parseInt(o,10)}}));var _=i>s,v=m.envelope.xmax-m.envelope.xmin>m.envelope.ymax-m.envelope.ymin;this._useLatLong(o)&&(_===v?this._useEPSGAxis=!1:(this._useEPSGAxis=!0,m.envelope=new a({xmin:m.envelope.ymin,ymin:m.envelope.xmin,xmax:m.envelope.ymax,ymax:m.envelope.xmax,spatialReference:{wkid:parseInt(o,10)}}))),m.columns=i,m.rows=s,m.origin={x:parseFloat(g[0]),y:parseFloat(g[1])},m.offset={x:parseFloat(f[0]),y:parseFloat(f[1])},m.gridBaseCRS=d,u.spatialDomain=m;var E={begin:null,end:null},x=[],b=this._getElement(e,"temporalDomain");if(b){var V=this._getElements(b,"timeposition");if(V.length>0){for(n=0;n<V.length;n++)x.push(new Date(this._getElementValue(V[n])));E.begin=x[0],E.end=x[x.length-1],E.values=x}else{var S=this._getElements(b,"timePeriod");if(S.length>0){E.begin=new Date(this._getElementValue(S[0],"beginPosition")),E.end=new Date(this._getElementValue(S[0],"endPosition"));var w=this._getElementValue(S[0],"timeResolution");E=t.mixin(E,this._parseTimeResolution(w))}}u.temporalDomain=E}return u});for(n=0;l>n;n++)i=e.childNodes[n],r(i,"Title")?s.title=this._getElementValue(i):r(i,"Abstract")?s["abstract"]=this._getElementValue(i):r(i,"Identifier")?s.identifier=this._getElementValue(i):r(i,"SupportedFormat")?(s.supportedFormats||(s.supportedFormats=[]),s.supportedFormats.push(this._getElementValue(i))):r(i,"SupportedCRS")?(s.supportedCRSs||(s.supportedCRSs=[]),s.supportedCRSs.push(this._getElementValue(i))):r(i,"Range")?s.range=o(i):r(i,"Domain")&&(s.domain=u(i),s.resolution=s.domain.spatialDomain.offset);return s},_parse201:function(e){var n,i,s={coverageId:null,boundedBy:null,domainSet:null,rangeType:null,serviceParameters:null,coverageFunction:null,extension:null},l=e.childNodes.length,r=function(e){return parseFloat(e)},o=function(e){return parseInt(e,10)},u=this._checkTagName,m=t.hitch(this,function(e){var t={envelope:null,axisLabels:null,uomLabels:null,envelopeAllDims:null},n=this._getElement(e,"Envelope"),i=n.getAttribute("srsName"),s=i.slice(i.lastIndexOf("/")+1),l=n.getAttribute("axisLabels"),o=this._getElementValue(n,"lowerCorner").split(" ").map(r),u=this._getElementValue(n,"upperCorner").split(" ").map(r);"x"===l[0]?t.envelope=new a({xmin:o[0],ymin:o[1],xmax:u[0],ymax:u[1],spatialReference:{wkid:parseInt(s,10)}}):t.envelope=new a({xmin:o[1],ymin:o[0],xmax:u[1],ymax:u[0],spatialReference:{wkid:parseInt(s,10)}}),t.axisLabels=l,t.envelopeAllDims={mins:o,maxs:u};var m=n.getAttribute("uomLabels").trim().split(" ");return t.uomLabels=m.length?m:null,t}),p=t.hitch(this,function(e){var t,n,i,s,a,l,r=[],o=this._getElements(e,"DataRecord"),u=function(e){return e.map(function(e){return parseFloat(e)})};for(s=0;s<o.length;s++){for(t=this._getElements(o[s],"field"),n=[],a=0;a<t.length;a++)i={},i.name=t[a].getAttribute("name"),i.description=this._getElementValue(t[a],"description"),i.uom=this._getElement(t[a],"uom").getAttribute("code"),l=this._getElementValue(t[a],"interval").split(" "),i.allowedValues=u(l),n.push(i);r.push(n)}return r}),h=t.hitch(this,function(e){var t,n={},i=this._getElement(e,"RectifiedGrid"),s=this._getElementValue(i,"low").split(" ").map(o),a=this._getElementValue(i,"high").split(" ").map(o),l=[];for(t=0;t<s.length;t++)l.push(a[t]-s[t]+1);var u=this._getElementValue(i,"axisLabels").split(" "),m=this._getElementValue(i,"origin/pos").split(" ").map(r),p=this._getElements(i,"offsetVector"),h=[];for(t=0;t<p.length;t++)h.push(parseFloat(this._getElementValue(p[t]).split(" ")[t]));var d=["x","lon","long","longitude","east"];return d.some(function(e){return e===u[0].toLowerCase()})?(n.columns=l[0],n.rows=l[1],n._resolution={x:h[0],y:h[1]}):(n.columns=l[1],n.rows=l[0],n._resolution={y:h[0],x:h[1]}),n.gridSamples=l,n.axisLabels=u,n.offset=h,n.origin=m,n});for(n=0;l>n;n++)i=e.childNodes[n],u(i,"coverageId")?s.coverageId=this._getElementValue(i):u(i,"ServiceParameters")?s.serviceParameters={supportedFormats:this._getElementValues(i,"nativeFormat")}:u(i,"boundedBy")?s.boundedBy=m(i):u(i,"rangeType")?s.rangeType=p(i):u(i,"domainSet")&&(s.domainSet=h(i),s.resolution=s.domainSet._resolution);return s}});return n("extend-esri")&&t.setObject("layers.WCSCoverageDescription",r,i),r});