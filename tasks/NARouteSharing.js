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
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/json","dojo/Deferred","dojo/_base/lang","dojo/i18n!../nls/jsapi","dojo/number","../request","../renderers/SimpleRenderer","../renderers/UniqueValueRenderer","../symbols/PictureMarkerSymbol","../symbols/SimpleMarkerSymbol","../symbols/SimpleLineSymbol","../arcgis/Portal","../tasks/RouteParameters","../tasks/RouteResult","../SpatialReference","../tasks/FeatureSet","../tasks/GeometryService","../tasks/ProjectParameters"],function(e,t,i,r,s,a,o,n,l,d,u,c,p,m,f,b,M,h,T){var g=e(null,{declaredClass:"esri.tasks.NARouteSharing",portal:null,firstStopSymbol:{angle:0,xoffset:0,yoffset:9,type:"esriPMS",width:17,height:24,imageData:"PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJzdmdfMyIgc3ByZWFkTWV0aG9kPSJwYWQiIGN4PSIwLjM4MTUzIiBjeT0iMC4yOTY4OCIgcj0iMC41Ij48c3RvcCBzdG9wLWNvbG9yPSIjNmJjMjc4IiBzdG9wLW9wYWNpdHk9IjAuOTg4MjgxIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjMmU5ZjNkIiBzdG9wLW9wYWNpdHk9IjAuOTkyMTg4IiBvZmZzZXQ9IjEiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48Zz48ZyBzdHJva2U9Im51bGwiIGlkPSJzdmdfMSI+PHBhdGggc3Ryb2tlPSIjMWM1ZTI0IiBzdHJva2Utb3BhY2l0eT0iMC43IiBmaWxsPSJ1cmwoI3N2Z18zKSIgc3Ryb2tlLWxpbmVqb2luPSJudWxsIiBzdHJva2UtbGluZWNhcD0ibnVsbCIgZD0ibTAuNTYyMTIsMTAuNjM0NTIxYzAsLTUuNTY0OSA0LjQ1NjcxMSwtMTAuMDcyNDYgOS45NTg4MjgsLTEwLjA3MjQ2YzUuNTAyMTA2LDAgOS45NTg4MjgsNC41MDc1NyA5Ljk1ODgyOCwxMC4wNzI0NmMwLDIuNzgyNDUgLTEuMTE0MTgsNS4zMDA1NyAtMi45MTYxMTYsNy4xMjMwNzNjLTAuOTAwOTY4LDAuOTExMjQ2IC0yLjk0MDQwOCwyLjI2NjE2MSAtNC43NDEzNDgsNC43MTI0NWMtMS44MDA5MjksMi40NDYyODkgLTIuMTkxMDQzLDYuMDM2ODc1IC0yLjI0NTYxNSw2LjAzNDUxNWMtMC4wNTQ1NjIsLTAuMDAyMzYgLTAuOTg1NzY3LC0zLjc3MjU1NCAtMi41OTczMzEsLTYuMTkzMzY1Yy0xLjYxMTU4NCwtMi40MjA4MSAtMy42MDAxNDEsLTMuNjQyMzU0IC00LjUwMTEwOSwtNC41NTM2Yy0xLjgwMTk0NiwtMS44MjI1MDIgLTIuOTE2MTE2LC00LjM0MDYyMyAtMi45MTYxMTYsLTcuMTIzMDczbDAsMGwtMC4wMDAwMjEsMHoiIGlkPSJzdmdfMiIvPjwvZz48ZWxsaXBzZSByeT0iNCIgcng9IjQiIGlkPSJzdmdfODciIGN5PSIxMC4zNDM3NSIgY3g9IjEwLjUiIHN0cm9rZS1vcGFjaXR5PSJudWxsIiBzdHJva2Utd2lkdGg9Im51bGwiIHN0cm9rZT0iIzFjNWUyNCIgZmlsbD0iI2ZmZmZmZiIvPjwvZz48L3N2Zz4=",contentType:"image/svg+xml"},interimStopSymbol:{angle:0,xoffset:0,yoffset:9,type:"esriPMS",width:17,height:24,imageData:"PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogPGRlZnM+DQogIDxyYWRpYWxHcmFkaWVudCBpZD0ic3ZnXzMiIHNwcmVhZE1ldGhvZD0icGFkIiBjeD0iMC4zODE1MyIgY3k9IjAuMjk2ODgiIHI9IjAuNSI+DQogICA8c3RvcCBzdG9wLWNvbG9yPSIjNjdBN0U0IiBzdG9wLW9wYWNpdHk9IjAuOTg4MjgxIiBvZmZzZXQ9IjAiLz4NCiAgIDxzdG9wIHN0b3AtY29sb3I9IiMxQjgxRDIiIHN0b3Atb3BhY2l0eT0iMC45OTIxODgiIG9mZnNldD0iMSIvPg0KICA8L3JhZGlhbEdyYWRpZW50Pg0KIDwvZGVmcz4NCiA8Zz4NCiAgPHRpdGxlPjE8L3RpdGxlPg0KICA8ZyBzdHJva2U9Im51bGwiIGlkPSJzdmdfMSI+DQogICA8cGF0aCBzdHJva2U9IiMxYzVlMjQiIHN0cm9rZS1vcGFjaXR5PSIwLjciIGZpbGw9InVybCgjc3ZnXzMpIiBzdHJva2UtbGluZWpvaW49Im51bGwiIHN0cm9rZS1saW5lY2FwPSJudWxsIiBkPSJtMC41NjIxMiwxMC42MzQ1MjFjMCwtNS41NjQ5IDQuNDU2NzExLC0xMC4wNzI0NiA5Ljk1ODgyOCwtMTAuMDcyNDZjNS41MDIxMDYsMCA5Ljk1ODgyOCw0LjUwNzU3IDkuOTU4ODI4LDEwLjA3MjQ2YzAsMi43ODI0NSAtMS4xMTQxOCw1LjMwMDU3IC0yLjkxNjExNiw3LjEyMzA3M2MtMC45MDA5NjgsMC45MTEyNDYgLTIuOTQwNDA4LDIuMjY2MTYxIC00Ljc0MTM0OCw0LjcxMjQ1Yy0xLjgwMDkyOSwyLjQ0NjI4OSAtMi4xOTEwNDMsNi4wMzY4NzUgLTIuMjQ1NjE1LDYuMDM0NTE1Yy0wLjA1NDU2MiwtMC4wMDIzNiAtMC45ODU3NjcsLTMuNzcyNTU0IC0yLjU5NzMzMSwtNi4xOTMzNjVjLTEuNjExNTg0LC0yLjQyMDgxIC0zLjYwMDE0MSwtMy42NDIzNTQgLTQuNTAxMTA5LC00LjU1MzZjLTEuODAxOTQ2LC0xLjgyMjUwMiAtMi45MTYxMTYsLTQuMzQwNjIzIC0yLjkxNjExNiwtNy4xMjMwNzNsMCwwbC0wLjAwMDAyMSwweiIgaWQ9InN2Z18yIi8+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==",contentType:"image/svg+xml"},lastStopSymbol:{angle:0,xoffset:0,yoffset:9,type:"esriPMS",width:17,height:24,imageData:"PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IHI9IjAuNSIgY3k9IjAuMzU1NDciIGN4PSIwLjMzMjAzIiBzcHJlYWRNZXRob2Q9InBhZCIgaWQ9InN2Z182Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3Atb3BhY2l0eT0iMC45OTYwOSIgc3RvcC1jb2xvcj0iI2U0ODY2NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1vcGFjaXR5PSIwLjk5NjA5IiBzdG9wLWNvbG9yPSIjYzkzYTE2Ii8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PGc+PGcgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzEiPjxwYXRoIHN0cm9rZT0iIzg0MjMwYSIgc3Ryb2tlLW9wYWNpdHk9IjAuNyIgZmlsbD0idXJsKCNzdmdfNikiIHN0cm9rZS1saW5lam9pbj0ibnVsbCIgc3Ryb2tlLWxpbmVjYXA9Im51bGwiIGQ9Im0wLjU2MjEyLDEwLjYzNDUyYzAsLTUuNTY0OSA0LjQ1NjcxLC0xMC4wNzI0NiA5Ljk1ODgzLC0xMC4wNzI0NmM1LjUwMjEsMCA5Ljk1ODgzLDQuNTA3NTcgOS45NTg4MywxMC4wNzI0NmMwLDIuNzgyNDUgLTEuMTE0MTgsNS4zMDA1NyAtMi45MTYxMiw3LjEyMzA3Yy0wLjkwMDk3LDAuOTExMjUgLTIuOTQwNDEsMi4yNjYxNiAtNC43NDEzNSw0LjcxMjQ1Yy0xLjgwMDkzLDIuNDQ2MjkgLTIuMTkxMDQsNi4wMzY4OCAtMi4yNDU2MSw2LjAzNDUyYy0wLjA1NDU2LC0wLjAwMjM2IC0wLjk4NTc3LC0zLjc3MjU2IC0yLjU5NzMzLC02LjE5MzM3Yy0xLjYxMTU5LC0yLjQyMDgxIC0zLjYwMDE0LC0zLjY0MjM1IC00LjUwMTExLC00LjU1MzZjLTEuODAxOTUsLTEuODIyNSAtMi45MTYxMiwtNC4zNDA2MiAtMi45MTYxMiwtNy4xMjMwN2wwLDBsLTAuMDAwMDIsMHoiIGlkPSJzdmdfMiIvPjwvZz48cmVjdCBpZD0ic3ZnXzkiIGhlaWdodD0iOCIgd2lkdGg9IjgiIHk9IjYuNSIgeD0iNi40OSIgc3Ryb2tlLW9wYWNpdHk9Im51bGwiIHN0cm9rZS13aWR0aD0ibnVsbCIgc3Ryb2tlPSIjODQyMzBhIiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvc3ZnPg==",contentType:"image/svg+xml"},unlocatedStopSymbol:{angle:0,xoffset:0,yoffset:9,type:"esriPMS",width:17,height:24,imageData:"PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IHI9IjAuNSIgY3k9IjAuMzU1NDciIGN4PSIwLjMzMjAzIiBzcHJlYWRNZXRob2Q9InBhZCIgaWQ9InN2Z18xMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLW9wYWNpdHk9IjAuOTkyMTkiIHN0b3AtY29sb3I9IiNlMmUyZTIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3Atb3BhY2l0eT0iMC45ODQzOCIgc3RvcC1jb2xvcj0iIzllOWU5ZSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxnPjxnIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18xIj48cGF0aCBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS1vcGFjaXR5PSIwLjciIGZpbGw9InVybCgjc3ZnXzEwKSIgc3Ryb2tlLWxpbmVqb2luPSJudWxsIiBzdHJva2UtbGluZWNhcD0ibnVsbCIgZD0ibTAuNTYyMTIsMTAuNjM0NTJjMCwtNS41NjQ5IDQuNDU2NzEsLTEwLjA3MjQ2IDkuOTU4ODMsLTEwLjA3MjQ2YzUuNTAyMSwwIDkuOTU4ODMsNC41MDc1NyA5Ljk1ODgzLDEwLjA3MjQ2YzAsMi43ODI0NSAtMS4xMTQxOCw1LjMwMDU3IC0yLjkxNjEyLDcuMTIzMDdjLTAuOTAwOTcsMC45MTEyNSAtMi45NDA0MSwyLjI2NjE2IC00Ljc0MTM1LDQuNzEyNDVjLTEuODAwOTMsMi40NDYyOSAtMi4xOTEwNCw2LjAzNjg4IC0yLjI0NTYxLDYuMDM0NTJjLTAuMDU0NTYsLTAuMDAyMzYgLTAuOTg1NzcsLTMuNzcyNTYgLTIuNTk3MzMsLTYuMTkzMzdjLTEuNjExNTksLTIuNDIwODEgLTMuNjAwMTQsLTMuNjQyMzUgLTQuNTAxMTEsLTQuNTUzNmMtMS44MDE5NSwtMS44MjI1IC0yLjkxNjEyLC00LjM0MDYyIC0yLjkxNjEyLC03LjEyMzA3bDAsMGwtMC4wMDAwMiwweiIgaWQ9InN2Z18yIi8+PC9nPjxyZWN0IHRyYW5zZm9ybT0icm90YXRlKC00NSAxMC41LDEwLjUpICIgc3Ryb2tlPSIjZTJlMmUyIiBpZD0ic3ZnXzExIiBoZWlnaHQ9IjEwIiB3aWR0aD0iMiIgeT0iNS42IiB4PSI5LjUiIHN0cm9rZS13aWR0aD0iMCIgZmlsbD0iIzY2NjY2NiIvPjxyZWN0IHRyYW5zZm9ybT0icm90YXRlKDQ1IDEwLjUsMTAuNSkgIiBzdHJva2U9IiNlMmUyZTIiIGlkPSJzdmdfMTIiIGhlaWdodD0iMTAiIHdpZHRoPSIyIiB5PSI1LjYiIHg9IjkuNSIgc3Ryb2tlLXdpZHRoPSIwIiBmaWxsPSIjNjY2NjY2Ii8+PC9nPjwvc3ZnPg==",contentType:"image/svg+xml"},waypointSymbol:{color:[255,255,255,255],size:10,angle:0,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSCircle",outline:{color:[20,89,127,255],width:2.5,type:"esriSLS",style:"esriSLSSolid"}},directionSymbol:{color:[0,122,194,255],width:6,type:"esriSLS",style:"esriSLSSolid"},directionEventSymbol:{color:[100,255,100,255],size:8,type:"esriSMS",style:"esriSMSCircle",outline:{color:[0,69,0,255],width:1,type:"esriSLS",style:"esriSLSSolid"}},routeSymbol:{color:[20,89,127,255],width:8,type:"esriSLS",style:"esriSLSSolid"},_geometryService:null,_jsonStringFieldSize:1048576,constructor:function(e){e&&(this.portal=new p.Portal(e))},getFolders:function(){return this.portal?this.portal.signIn().then(r.hitch(this,function(){return this.portal.getPortalUser().getFolders()},!1)).then(r.hitch(this,function(e){var t=this.portal.getPortalUser(),i=e||[];return i.splice(0,0,{created:t.created,portal:this.portal,title:t.username+" ("+s.networkAnalysis.sharing.rootFolder+")",url:t.userContentUrl}),i})):[]},canCreateItem:function(){var e=new i;return this.portal?this.portal.signIn().then(r.hitch(this,function(){e.resolve((this.portal.getPortalUser().privileges||[]).indexOf("portal:user:createItem")>-1)}),e.reject):e.reject(new Error("No URL to a Portal instance or ArcGIS Online was specified at construction time.")),e.promise},toMinutes:function(e,t,i){switch(e=e||0,t){case"esriNAUSeconds":e/=Math.pow(60,i?-1:1);break;case"esriNAUHours":e*=Math.pow(60,i?-1:1);break;case"esriNAUDays":e*=Math.pow(1440,i?-1:1)}return e},fromMinutes:function(e,t){return this.toMinutes(e,t,!0)},toMeters:function(e,t,i){switch(e=e||0,(t||"").replace("esriNAU","esri")){case"esriInches":e*=Math.pow(.0254,i?-1:1);break;case"esriFeet":e*=Math.pow(.3048,i?-1:1);break;case"esriYards":e*=Math.pow(.9144,i?-1:1);break;case"esriMiles":e*=Math.pow(1609.34,i?-1:1);break;case"esriNauticalMiles":e*=Math.pow(1851.995396854,i?-1:1);break;case"esriMillimeters":e/=Math.pow(1e3,i?-1:1);break;case"esriCentimeters":e/=Math.pow(100,i?-1:1);break;case"esriKilometers":e*=Math.pow(1e3,i?-1:1);break;case"esriDecimeters":e/=Math.pow(10,i?-1:1)}return e},fromMeters:function(e,t){return this.toMeters(e,t,!0)},toGeolocalTime:function(e,t){return void 0===e||null===e?void 0:e+60*(t||0)*1e3},toUTCTime:function(e,t){return-22091616e5===e&&(e=void 0),null!==t&&void 0!==t?e-60*t*1e3:e},getUTCOffset:function(e,t){return null!==t&&void 0!==t&&t>0?(e-t)/60/1e3:void 0},getAttributeUnits:function(e,t){for(var i,r=t.networkDataset.networkAttributes,s=0;s<r.length;s++)if(r[s].name===e&&"esriNAUTCost"===r[s].usageType){i=r[s].units;break}return i},load:function(e,a){var n=new i,l=a,d=r.hitch(this,this.fromMeters),u=r.hitch(this,this.fromMinutes);return this.portal?this.portal.signIn().then(r.hitch(this,function(){var i=this.portal.getPortalUser(),a=i.userContentUrl.replace(/\/users\/.+\/?$/,"/items/");o({url:a+e,content:{f:"json"},callbackParamName:"callback"}).then(r.hitch(this,function(c){o({url:a+e+"/data",content:{f:"json"},callbackParamName:"callback"}).then(r.hitch(this,function(e){var a=function(t){for(var i=0;i<e.layers.length;i++)if(e.layers[i].layerDefinition.name===t)return e.layers[i]},o=a("Directions").featureSet.features,p=a("DirectionEvents").featureSet.features,h=a("Stops").featureSet.features,T=a("RouteInfo").featureSet.features[0],g=T.attributes,y=T.geometry.spatialReference,I=t.parse(g.AnalysisSettings),S=I.travelMode.timeAttributeName,N=I.travelMode.distanceAttributeName,D=this.getAttributeUnits(S,l),L=this.getAttributeUnits(N,l),v=l.directionsLengthUnits,j=g.Messages,w=[],A={directions:{routeId:1,routeName:g.RouteName,summary:{totalLength:this.fromMeters(g.TotalMeters,v),totalTime:this.fromMinutes(g.TotalMinutes,D),totalDriveTime:this.fromMinutes(g.TotalMinutes-g.TotalWaitMinutes,D),envelope:a("RouteInfo").layerDefinition.extent},spatialReference:y,geometryType:"esriGeometryPolyline",features:r.hitch(this,function(){for(var e=[],i=function(e){var t=e,i=o[t].geometry,r=function(e){for(;!i&&(0>e&&t>0||e>0&&t<o.length-1);){t+=e;var r=o[t].geometry;if(r&&r.paths&&r.paths[0])return i={paths:[[r.paths[0][e>0?0:r.paths[0].length-1],r.paths[0][e>0?0:r.paths[0].length-1]]],spatialReference:y}}return i};return r(1)||r(-1)},s=r.hitch(this,function(e){for(var i=[],r=0;r<p.length;r++)p[r].attributes.DirectionSequence===e&&(i.push({ETA:this.toGeolocalTime(p[r].attributes.ArrivalTime,p[r].attributes.UTCOffset),arriveTimeUTC:null===p[r].attributes.UTCOffset?void 0:p[r].attributes.ArrivalTime,strings:t.parse(p[r].attributes.EventMessages)||[],point:{x:p[r].geometry.x,y:p[r].geometry.y}}),p[r].attributes.EventText&&i[i.length-1].strings.splice(0,0,{string:p[r].attributes.EventText,stringType:"esriDSTGeneral"}));return i}),a=0;a<o.length;a++){var n={attributes:{length:this.fromMeters(o[a].attributes.Meters,v),time:this.fromMinutes(o[a].attributes.Minutes,D),text:o[a].attributes.DirectionText,ETA:this.toGeolocalTime(o[a].attributes.ArrivalTime,o[a].attributes.UTCOffset),arriveTimeUTC:null===o[a].attributes.UTCOffset?void 0:o[a].attributes.ArrivalTime,maneuverType:o[a].attributes.ManeuverType,_stopSequence:o[a].attributes.StopSequence},geometry:i(a)||h[0]&&h[0].geometry&&{paths:[[[h[0].geometry.x,h[0].geometry.y]]],spatialReference:y},strings:t.parse(o[a].attributes.ManeuverMessages||"[]"),events:s(a)};0===n.strings.length&&delete n.strings,e.push(n)}return e})()},stops:r.hitch(this,function(){for(var e=[],i=0;i<h.length;i++){var s=h[i].attributes,a={geometry:h[i].geometry,attributes:{ObjectID:s.__OBJECTID,Name:s.Name,RouteName:null,Sequence:s.Sequence,TimeWindowStart:s.TimeWindowStart,TimeWindowEnd:s.TimeWindowEnd,ArriveCurbApproach:s.ArrivalCurbApproach,DepartCurbApproach:s.DepartureCurbApproach,CurbApproach:s.CurbApproach,Status:s.Status,ArriveTime:this.toGeolocalTime(s.ArrivalTime,s.ArrivalUTCOffset),DepartTime:this.toGeolocalTime(s.DepartureTime,s.DepartureUTCOffset),ArriveTimeUTC:s.ArrivalTime,DepartTimeUTC:s.DepartureTime,isWaypoint:1===s.LocationType}},o=a.attributes;o["Attr_"+S]=this.fromMinutes(s.ServiceMinutes,D),o["Attr_"+N]=this.fromMeters(s.ServiceMeters,L),r.mixin(o,t.parse(s.ServiceOtherCosts||"{}")),o["Cumul_"+S]=this.fromMinutes(s.CumulativeMinutes,D),o["Cumul_"+N]=this.fromMeters(s.CumulativeMeters,L),r.mixin(o,t.parse(s.CumulativeOtherCosts||"{}")),e.push(a)}return e})(),routeName:g.RouteName,spatialReference:y},O=!1,E=r.mixin({returnStops:!0,returnDirections:!0,returnRoutes:!1,ignoreInvalidLocations:!0,outputLines:"esriNAOutputLineTrueShape",directionsOutputType:"complete",directionsLengthUnits:v,doNotLocateOnRestrictedElements:!0,outSpatialReference:new b(y),stops:new M(function(){return{spatialReference:y,geometryType:"esriGeometryPoint",features:function(){for(var e=[],i=0;i<h.length;i++){var s=h[i].attributes,a={geometry:h[i].geometry,attributes:{CurbApproach:s.CurbApproach,Name:s.Name,Sequence:s.Sequence,isWaypoint:1===s.LocationType,TimeWindowStart:s.TimeWindowStart,TimeWindowEnd:s.TimeWindowEnd}};a.attributes["Attr_"+S]=u(s.ServiceMinutes,D),a.attributes["Attr_"+N]=d(s.ServiceMeters,L),r.mixin(a.attributes,t.parse(s.ServiceOtherCosts)),e.push(a),O=O||s.TimeWindowStart>0}return e}()}}())},I);E.useTimeWindows=O,D&&L||w.push({message:s.networkAnalysis.sharing.costAttributeMissing,messageType:"Warning"}),"1.0"!==g.Version&&w.push({message:s.networkAnalysis.sharing.differentVersion,messageType:"Warning"}),n.resolve({routeParameters:r.mixin(new m,E),solveResult:{barriers:[],polygonBarriers:[],polylineBarriers:[],messages:t.parse(j||"[]"),routeResults:[new f(A)]},loadMessages:w,isItemOwner:i.username===c.owner,title:c.title,ownerFolder:c.ownerFolder})}),n.reject)}),n.reject)}),n.reject):n.reject(new Error("No URL to a Portal instance or ArcGIS Online was specified at construction time.")),n.promise},store:function(e,t){var s=new i;return e?e.directions&&e.directions&&e.directions.length?e.stops&&e.stops.length?e.extent?e.routeInfo?e.folder?e.name?this.portal?this.portal.signIn().then(r.hitch(this,function(){var i=this._getRouteId();this._addOrUpdateItem(this._populateLayerInfo(i,e),e,i,t).then(s.resolve,s.reject)}),s.reject):s.reject(new Error("No URL to a Portal instance or ArcGIS Online was specified at construction time.")):s.reject(new Error("Layer name is required.")):s.reject(new Error("Folder Url is required.")):s.reject(new Error("RouteInfo are required.")):s.reject(new Error("Extent is required.")):s.reject(new Error("Stops are required.")):s.reject(new Error("Directions are required.")):s.reject(new Error("Missing required parameters.")),s.promise},createFeatureCollection:function(e){var t=new i;if(e)if(e.directions&&e.directions&&e.directions.length)if(e.stops&&e.stops.length)if(e.extent)if(e.routeInfo)if(e.name){var r=this._getRouteId();t.resolve({title:e.name,layerInfo:this._populateLayerInfo(r,e)})}else t.reject(new Error("Layer name is required."));else t.reject(new Error("RouteInfo are required."));else t.reject(new Error("Extent is required."));else t.reject(new Error("Stops are required."));else t.reject(new Error("Directions are required."));else t.reject(new Error("Missing required parameters."));return t.promise},_addOrUpdateItem:function(e,n,l,d){return r.hitch(this,function(){var e=new i;if(!this._geometryService&&this.portal&&this.portal.helperServices.geometry&&(this._geometryService=new h(this.portal.helperServices.geometry.url)),this._geometryService&&n.extent){var t=new T;t.outSR=new b(4326),t.geometries=[n.extent],this._geometryService.project(t).then(r.hitch(this,function(t){var i;t&&t[0]&&(i=t[0].xmin+","+t[0].ymin+","+t[0].xmax+","+t[0].ymax),e.resolve(i)}),e.resolve)}else e.resolve();return e.promise})().then(r.hitch(this,function(i){var l=d?n.folder+"/items/"+d+"/update":n.folder+"/addItem";return o({url:l,content:{text:t.stringify(e),extent:i,title:n.name,type:"Feature Collection",typeKeywords:"Data, Feature Collection, Multilayer, Route Layer",description:s.networkAnalysis.sharing.itemSnippet+" "+n.name+r.hitch(this,function(){for(var t=function(t){for(var i=0;i<e.layers.length;i++)if(e.layers[i].layerDefinition.name===t)return e.layers[i].featureSet.features;return[]},i=t("Directions"),o=t("Stops"),n=t("RouteInfo")[0].attributes,l=function(e){if(void 0!==e)for(var t=0;t<o.length;t++)if(o[t].attributes.Sequence===e)return o[t].attributes;return{}},d="english"===this.portal.getPortalUser().units?"esriMiles":"esriMeters",u=function(e){return a.format(e,{places:2,locale:"root"})},c=r.hitch(this,function(e){return u(this.fromMeters(e,d))+" "+("esriMiles"===d?s.networkAnalysis.sharing.Miles:s.networkAnalysis.sharing.Meters)}),p="<br><br><b>"+s.networkAnalysis.sharing.routeInfoLayer+"</b><ul><li>"+u(n.TotalMinutes)+" "+s.networkAnalysis.sharing.Minutes+"</li><li>"+c(n.TotalMeters)+"</li>"+(void 0!==n.StartTime?"<li>"+s.networkAnalysis.sharing.StartTime+" "+new Date(n.StartTime).toString()+"</li>":"")+"</ul><b>"+s.networkAnalysis.sharing.directionsLayer+"</b><ol>",m=0;m<i.length;m++){var f=l(i[m].attributes.StopSequence);p+='<li><img style="display:inline-block;margin:-3px 15px;" src="js/jsapi/esri/dijit/images/Directions/maneuvers/'+(null===f.ArrivalCurbApproach&&null!==f.DepartureCurbApproach?"esriDMTStopOrigin":null!==f.ArrivalCurbApproach&&null===f.DepartureCurbApproach?"esriDMTStopDestination":i[m].attributes.ManeuverType)+'.png"><span>'+i[m].attributes.DirectionText+"</span><br><span>"+u(i[m].attributes.Minutes)+" "+s.networkAnalysis.sharing.Minutes+"&nbsp;&middot;&nbsp;"+c(i[m].attributes.Meters)+"</span></li>"}return p+"</li>"})(),tags:s.networkAnalysis.sharing.itemTags,snippet:s.networkAnalysis.sharing.itemSnippet+" "+n.name,thumbnailUrl:n.thumbnail,licenseInfo:s.widgets.directions.printDisclaimer,f:"json"},callbackParamName:"callback"},{usePost:!0})}))},_getRouteId:function(){for(var e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",t="",i=0;32>i;i++)t+=e[Math.floor(Math.random()*e.length)];return t},_populateLayerInfo:function(e,t){var i={visibility:!0,layers:[],visibleLayers:[0,3],opacity:1};return this._addRouteInfoToLayerInfo(i,e,t.routeInfo,t.extent),this._addDirectionsToLayerInfo(i,e,t.directions,t.extent),this._addDirectionEventsToLayerInfo(i,e,t.directionEvents,t.extent),this._addStopsToLayerInfo(i,e,t.stops,t.extent),i},_addStopsToLayerInfo:function(e,t,i,a){var o=s.networkAnalysis,n={type:"codedValue",name:"esriNACurbApproachType",codedValues:[{name:o.enums.esriNACurbApproachType.esriNAEitherSideOfVehicle,code:0},{name:o.enums.esriNACurbApproachType.esriNARightSideOfVehicle,code:1},{name:o.enums.esriNACurbApproachType.esriNALeftSideOfVehicle,code:2},{name:o.enums.esriNACurbApproachType.esriNANoUTurn,code:3}]},c=this._generateFeatureCollectionTemplate("Stops",o.sharing.stopsLayer,"esriGeometryPoint"),p=c.layerDefinition.fields,m=i[0].attributes.ArrivalTime>0;p.push(this._createField("CurbApproach",o.fields.stops.CurbApproach,"integer",!1,n)),p.push(this._createField("ArrivalCurbApproach",o.fields.stops.ArrivalCurbApproach,"integer",!0,n)),p.push(this._createField("DepartureCurbApproach",o.fields.stops.DepartureCurbApproach,"integer",!0,n)),p.push(this._createField("Name",o.fields.stops.Name,"string",!0)),p.push(this._createField("Sequence",o.fields.stops.Sequence,"integer",!0)),p.push(this._createField("Status",o.fields.stops.Status,"integer",!0,{type:"codedValue",name:"esriNAObjectStatus",codedValues:[{name:o.enums.esriNAObjectStatus.esriNAObjectStatusOK,code:0},{name:o.enums.esriNAObjectStatus.esriNAObjectStatusNotLocated,code:1},{name:o.enums.esriNAObjectStatus.esriNAObjectStatusElementNotLocated,code:2},{name:o.enums.esriNAObjectStatus.esriNAObjectStatusElementNotTraversable,code:3},{name:o.enums.esriNAObjectStatus.esriNAObjectStatusInvalidFieldValues,code:4},{name:o.enums.esriNAObjectStatus.esriNAObjectStatusNotReached,code:5},{name:o.enums.esriNAObjectStatus.esriNAObjectStatusTimeWindowViolation,code:6}]})),p.push(this._createField("LocationType",o.fields.stops.LocationType,"integer",!0,{type:"codedValue",name:"esriNALocationType",codedValues:[{name:o.enums.esriNALocationType.stop,code:0},{name:o.enums.esriNALocationType.waypoint,code:1}]})),p.push(this._createField("TimeWindowStart",o.fields.stops.TimeWindowStart,"date",!1)),p.push(this._createField("TimeWindowEnd",o.fields.stops.TimeWindowEnd,"date",!1)),p.push(this._createField("ServiceMinutes",o.fields.stops.ServiceMinutes,"double",!1)),p.push(this._createField("ServiceMeters",o.fields.stops.ServiceMeters,"double",!1)),p.push(this._createField("ServiceOtherCosts",o.fields.stops.ServiceOtherCosts,"string",!1,null,this._jsonStringFieldSize)),p.push(this._createField("CumulativeMinutes",o.fields.stops.CumulativeMinutes,"double",!0)),p.push(this._createField("CumulativeMeters",o.fields.stops.CumulativeMeters,"double",!0)),p.push(this._createField("CumulativeOtherCosts",o.fields.stops.CumulativeOtherCosts,"string",!1,null,this._jsonStringFieldSize)),p.push(this._createField("LateMinutes",o.fields.stops.LateMinutes,"double",!1)),p.push(this._createField("WaitMinutes",o.fields.stops.WaitMinutes,"double",!1)),p.push(this._createField("ArrivalTime",o.fields.stops.ArrivalTime,"date",m)),p.push(this._createField("DepartureTime",o.fields.stops.DepartureTime,"date",m)),p.push(this._createField("ArrivalUTCOffset",o.fields.stops.ArrivalUTCOffset,"integer",m)),p.push(this._createField("DepartureUTCOffset",o.fields.stops.DepartureUTCOffset,"integer",m));var f,b=0;for(f=0;f<i.length;f++){var M=i[f],h=M.geometry;c.featureSet.features.push({geometry:h.toJson?h.toJson():h,attributes:r.mixin(M.attributes,{__OBJECTID:b++})})}c.layerDefinition.extent=a.toJson?a.toJson():a;var T=new l(new d(i.length<=2?this.firstStopSymbol:this.interimStopSymbol),"Sequence");for(f=0;f<i.length;f++){var g=i[f].attributes,y=null,I=o.enums.esriNALocationType.stop;1===g.LocationType?(y=new u(this.waypointSymbol),I=o.enums.esriNALocationType.waypoint):null===g.ArrivalCurbApproach&&null===g.DepartureCurbApproach?(y=new d(this.unlocatedStopSymbol),I=o.enums.esriNALocationType.stop+" : "+o.enums.esriNAObjectStatus.esriNAObjectStatusNotReached):null===g.ArrivalCurbApproach&&null!==g.DepartureCurbApproach?y=new d(this.firstStopSymbol):null!==g.ArrivalCurbApproach&&null===g.DepartureCurbApproach&&(y=new d(this.lastStopSymbol)),y&&T.addValue({value:g.Sequence,symbol:y,label:I})}c.layerDefinition.drawingInfo.renderer=T.toJson(),c.popupInfo={title:"{Name}",fieldInfos:[{fieldName:"Name",label:o.fields.stops.Name,isEditable:!0,tooltip:"",visible:!0,stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"Sequence",label:o.fields.stops.Sequence,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ArrivalTime",label:o.fields.stops.ArrivalTime,isEditable:!0,tooltip:"",visible:m,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ArrivalUTCOffset",label:o.fields.stops.ArrivalUTCOffset,isEditable:!1,tooltip:"",visible:m,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DepartureTime",label:o.fields.stops.DepartureTime,isEditable:!0,tooltip:"",visible:m,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DepartureUTCOffset",label:o.fields.stops.DepartureUTCOffset,isEditable:!1,tooltip:"",visible:m,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"CurbApproach",label:o.fields.stops.CurbApproach,isEditable:!0,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"ArrivalCurbApproach",label:o.fields.stops.ArrivalCurbApproach,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DepartureCurbApproach",label:o.fields.stops.DepartureCurbApproach,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Status",label:o.fields.stops.Status,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"LocationType",label:o.fields.stops.LocationType,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TimeWindowStart",label:o.fields.stops.TimeWindowStart,isEditable:!0,tooltip:"",visible:!1,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"TimeWindowEnd",label:o.fields.stops.TimeWindowEnd,isEditable:!0,tooltip:"",visible:!1,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"ServiceMinutes",label:o.fields.stops.ServiceMinutes,isEditable:!0,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"ServiceMeters",label:o.fields.stops.ServiceMeters,isEditable:!0,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"ServiceOtherCosts",label:o.fields.stops.ServiceOtherCosts,isEditable:!0,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"CumulativeMinutes",label:o.fields.stops.CumulativeMinutes,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"CumulativeMeters",label:o.fields.stops.CumulativeMeters,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"CumulativeOtherCosts",label:o.fields.stops.CumulativeOtherCosts,isEditable:!0,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"LateMinutes",label:o.fields.stops.LateMinutes,isEditable:!1,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"WaitMinutes",label:o.fields.stops.WaitMinutes,isEditable:!1,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1}],description:null,showAttachments:!1,mediaInfos:[]},e.layers.push(c)},_addDirectionsToLayerInfo:function(e,t,i,a){var o=s.networkAnalysis,l=o.enums.esriDirectionsManeuverType,d=this._generateFeatureCollectionTemplate("Directions",o.sharing.directionsLayer,"esriGeometryPolyline"),u=d.layerDefinition.fields,p=i[0]&&i[0].attributes&&i[0].attributes.ArrivalTime>0;u.push(this._createField("Sequence",o.fields.directions.Sequence,"integer")),u.push(this._createField("StopSequence",o.fields.directions.StopSequence,"integer")),u.push(this._createField("ArrivalTime",o.fields.directions.ArrivalTime,"date",p)),u.push(this._createField("UTCOffset",o.fields.directions.UTCOffset,"integer",p)),u.push(this._createField("ManeuverType",o.fields.directions.ManeuverType,"string",!0,{type:"codedValue",name:"esriDirectionsManeuverType",codedValues:[{name:l.esriDMTBearLeft,code:"esriDMTBearLeft"},{name:l.esriDMTBearRight,code:"esriDMTBearRight"},{name:l.esriDMTDepart,code:"esriDMTDepart"},{name:l.esriDMTDoorPassage,code:"esriDMTDoorPassage"},{name:l.esriDMTElevator,code:"esriDMTElevator"},{name:l.esriDMTEndOfFerry,code:"esriDMTEndOfFerry"},{name:l.esriDMTEscalator,code:"esriDMTEscalator"},{name:l.esriDMTFerry,code:"esriDMTFerry"},{name:l.esriDMTForkCenter,code:"esriDMTForkCenter"},{name:l.esriDMTForkLeft,code:"esriDMTForkLeft"},{name:l.esriDMTForkRight,code:"esriDMTForkRight"},{name:l.esriDMTHighwayChange,code:"esriDMTHighwayChange"},{name:l.esriDMTHighwayExit,code:"esriDMTHighwayExit"},{name:l.esriDMTHighwayMerge,code:"esriDMTHighwayMerge"},{name:l.esriDMTPedestrianRamp,code:"esriDMTPedestrianRamp"},{name:l.esriDMTRampLeft,code:"esriDMTRampLeft"},{name:l.esriDMTRampRight,code:"esriDMTRampRight"},{name:l.esriDMTRoundabout,code:"esriDMTRoundabout"},{name:l.esriDMTSharpLeft,code:"esriDMTSharpLeft"},{name:l.esriDMTSharpRight,code:"esriDMTSharpRight"},{name:l.esriDMTStairs,code:"esriDMTStairs"},{name:l.esriDMTStop,code:"esriDMTStop"},{name:l.esriDMTStraight,code:"esriDMTStraight"},{name:l.esriDMTTripItem,code:"esriDMTTripItem"},{name:l.esriDMTTurnLeft,code:"esriDMTTurnLeft"},{name:l.esriDMTTurnLeftLeft,code:"esriDMTTurnLeftLeft"},{name:l.esriDMTTurnLeftRight,code:"esriDMTTurnLeftRight"},{name:l.esriDMTTurnRight,code:"esriDMTTurnRight"},{name:l.esriDMTTurnRightLeft,code:"esriDMTTurnRightLeft"},{name:l.esriDMTTurnRightRight,code:"esriDMTTurnRightRight"},{name:l.esriDMTUnknown,code:"esriDMTUnknown"},{name:l.esriDMTUTurn,code:"esriDMTUTurn"}]})),u.push(this._createField("Meters",o.fields.directions.Meters,"double",!0)),u.push(this._createField("Minutes",o.fields.directions.Minutes,"double",!0)),u.push(this._createField("DirectionText",o.fields.directions.DirectionText,"string",!0,null,2048)),u.push(this._createField("ManeuverMessages",o.fields.directions.ManeuverMessages,"string",!1,null,this._jsonStringFieldSize));for(var m=0,f=0;f<i.length;f++){var b=i[f],M=b.geometry;d.featureSet.features.push({geometry:M&&M.toJson?M.toJson():M,attributes:r.mixin(b.attributes,{__OBJECTID:m++})})}d.layerDefinition.extent=a.toJson?a.toJson():a;var h=new n(new c(this.directionSymbol));d.layerDefinition.drawingInfo.renderer=h.toJson(),d.popupInfo={title:"{Text}",fieldInfos:[{fieldName:"ManeuverType",label:o.fields.directions.ManeuverType,isEditable:!1,tooltip:"",visible:!0,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DirectionText",label:o.fields.directions.DirectionText,isEditable:!1,tooltip:"",visible:!0,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Sequence",label:o.fields.directions.Sequence,isEditable:!1,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"StopSequence",label:o.fields.directions.StopSequence,isEditable:!1,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ArrivalTime",label:o.fields.directions.ArrivalTime,isEditable:!0,tooltip:"",visible:p,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"UTCOffset",label:o.fields.directions.UTCOffset,isEditable:!1,tooltip:"",visible:p,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Meters",label:o.fields.directions.Meters,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Minutes",label:o.fields.directions.Minutes,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ManeuverMessages",label:o.fields.directions.ManeuverMessages,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1}],description:null,showAttachments:!1,mediaInfos:[]},e.layers.push(d)},_addDirectionEventsToLayerInfo:function(e,t,i,a){var o=s.networkAnalysis,l=this._generateFeatureCollectionTemplate("DirectionEvents",o.sharing.directionEventsLayer,"esriGeometryPoint"),d=l.layerDefinition.fields,c=i[0]&&i[0].attributes&&i[0].attributes.ArrivalTime>0;
d.push(this._createField("ArrivalTime",o.fields.directionEvents.ArrivalTime,"date",c)),d.push(this._createField("UTCOffset",o.fields.directionEvents.UTCOffset,"integer",c)),d.push(this._createField("DirectionSequence",o.fields.directionEvents.DirectionSequence,"integer")),d.push(this._createField("Sequence",o.fields.directionEvents.Sequence,"integer")),d.push(this._createField("EventText",o.fields.directionEvents.EventText,"string",!0,null,2048)),d.push(this._createField("EventMessages",o.fields.directionEvents.EventMessages,"string",!1,null,this._jsonStringFieldSize));for(var p=0,m=0;m<i.length;m++){var f=i[m],b=f.geometry;l.featureSet.features.push({geometry:b&&b.toJson?b.toJson():b,attributes:r.mixin(f.attributes,{__OBJECTID:p++})})}l.layerDefinition.extent=a.toJson?a.toJson():a;var M=new n(new u(this.directionEventSymbol));l.layerDefinition.drawingInfo.renderer=M.toJson(),l.popupInfo={title:o.sharing.directionEventsLayer,fieldInfos:[{fieldName:"EventText",label:o.fields.directionEvents.EventText,isEditable:!1,tooltip:"",visible:!0,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ArrivalTime",label:o.fields.directionEvents.ArrivalTime,isEditable:!0,tooltip:"",visible:c,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"UTCOffset",label:o.fields.directionEvents.UTCOffset,isEditable:!1,tooltip:"",visible:c,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DirectionSequence",label:o.fields.directionEvents.DirectionSequence,isEditable:!1,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Sequence",label:o.fields.directionEvents.Sequence,isEditable:!1,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"EventMessages",label:o.fields.directionEvents.EventMessages,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1}],description:null,showAttachments:!1,mediaInfos:[]},e.layers.push(l)},_addRouteInfoToLayerInfo:function(e,t,i,a){var o=s.networkAnalysis,l=this._generateFeatureCollectionTemplate("RouteInfo",o.sharing.routeInfoLayer,"esriGeometryPolyline"),d=l.layerDefinition.fields,u=void 0!==i.attributes.StartTime&&null!==i.attributes.StartTime;d.push(this._createField("Version",o.fields.routeInfo.Version,"string")),d.push(this._createField("RouteName",o.fields.routeInfo.RouteName,"string",!0,null,1024)),d.push(this._createField("TotalMinutes",o.fields.routeInfo.TotalMinutes,"double",!0)),d.push(this._createField("TotalMeters",o.fields.routeInfo.TotalMeters,"double",!0)),d.push(this._createField("TotalLateMinutes",o.fields.routeInfo.TotalLateMinutes,"double")),d.push(this._createField("TotalWaitMinutes",o.fields.routeInfo.TotalWaitMinutes,"double")),d.push(this._createField("OtherCosts",o.fields.routeInfo.OtherCosts,"string",!1,null,this._jsonStringFieldSize)),d.push(this._createField("StartTime",o.fields.routeInfo.StartTime,"date",u)),d.push(this._createField("StartUTCOffset",o.fields.routeInfo.StartUTCOffset,"integer",u)),d.push(this._createField("EndTime",o.fields.routeInfo.EndTime,"date",u)),d.push(this._createField("EndUTCOffset",o.fields.routeInfo.EndUTCOffset,"integer",u)),d.push(this._createField("Messages",o.fields.routeInfo.Messages,"string",!1,null,this._jsonStringFieldSize)),d.push(this._createField("AnalysisSettings",o.fields.routeInfo.AnalysisSettings,"string",!1,null,this._jsonStringFieldSize));var p=i.geometry;l.featureSet.features.push({geometry:p&&p.toJson?p.toJson():p,attributes:r.mixin(i.attributes,{__OBJECTID:0,Version:"1.0"})}),l.layerDefinition.extent=a.toJson?a.toJson():a;var m=new n(new c(this.routeSymbol));l.layerDefinition.drawingInfo.renderer=m.toJson(),l.popupInfo={title:o.sharing.routeInfoLayer,fieldInfos:[{fieldName:"Version",label:o.fields.routeInfo.Version,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"RouteName",label:o.fields.routeInfo.RouteName,isEditable:!1,tooltip:"",visible:!0,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TotalMinutes",label:o.fields.routeInfo.TotalMinutes,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TotalMeters",label:o.fields.routeInfo.TotalMeters,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TotalLateMinutes",label:o.fields.routeInfo.TotalLateMinutes,isEditable:!1,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TotalWaitMinutes",label:o.fields.routeInfo.TotalWaitMinutes,isEditable:!1,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"OtherCosts",label:o.fields.routeInfo.OtherCosts,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"StartTime",label:o.fields.routeInfo.StartTime,isEditable:!1,tooltip:"",visible:u,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"StartUTCOffset",label:o.fields.routeInfo.StartUTCOffset,isEditable:!1,tooltip:"",visible:u,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"EndTime",label:o.fields.routeInfo.EndTime,isEditable:!1,tooltip:"",visible:u,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"EndUTCOffset",label:o.fields.routeInfo.EndUTCOffset,isEditable:!1,tooltip:"",visible:u,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Messages",label:o.fields.routeInfo.Messages,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"SolverSettings",label:o.fields.routeInfo.SolverSettings,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1}],description:null,showAttachments:!1,mediaInfos:[]},e.layers.push(l)},_generateFeatureCollectionTemplate:function(e,t,i){return{layerDefinition:{name:e,title:t,geometryType:i,objectIdField:"__OBJECTID",type:"Feature Layer",typeIdField:"",drawingInfo:{fixedSymbols:!0},fields:[{name:"__OBJECTID",alias:"OBJECTID",type:"esriFieldTypeOID",editable:!1,nullable:!1,domain:null}],types:[],capabilities:"Query,Update"},featureSet:{features:[],geometryType:i}}},_createField:function(e,t,i,r,s,a){return"integer"===i?{name:e,alias:t,type:"esriFieldTypeInteger",editable:!0,nullable:!0,visible:!!r,domain:s}:"double"===i?{name:e,alias:t,type:"esriFieldTypeDouble",editable:!0,nullable:!0,visible:!!r,domain:s}:"date"===i?{name:e,alias:t,type:"esriFieldTypeDate",length:36,editable:!0,nullable:!0,visible:!!r,domain:s}:{name:e,alias:t,type:"esriFieldTypeString",length:a||255,editable:!0,nullable:!0,visible:!!r,domain:s}}});return g});