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

define(["require","module","dojo/_base/kernel","dojo/_base/declare","dojo/_base/connect","dojo/_base/Deferred","dojo/_base/lang","dojo/_base/array","dojo/_base/event","dojo/_base/unload","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/sniff","dijit/registry","dojox/gfx/matrix","./kernel","./config","./basemaps","./lang","./Evented","./fx","./deferredUtils","./tileUtils","./urlUtils","./PluginTarget","./geometry/Point","./geometry/ScreenPoint","./geometry/Extent","./geometry/Rect","./geometry/mathUtils","./geometry/scaleUtils","./geometry/screenUtils","./geometry/webMercatorUtils","./layers/GraphicsLayer","./layers/TileInfo","./layers/LOD","./layers/ArcGISTiledMapServiceLayer","./layers/MapImageLayer","./layers/OpenStreetMapLayer","./layers/VectorTileLayer","./dijit/Popup","./plugins/popupManager","dojo/uacss"],function(e,t,i,n,s,a,r,o,h,l,d,_,c,p,u,f,m,g,y,x,v,L,b,w,E,z,R,I,M,D,A,S,C,W,T,P,O,H,F,U,k,j,Z,N,B){function G(e,t){var i=e.lods;i.sort(function(e,t){return e.scale>t.scale?-1:e.scale<t.scale?1:0});var n=[];i=o.filter(i,function(e){return-1===K(n,e.scale)?(n.push(e.scale),!0):void 0});var s,a=t.lods=[];o.forEach(i,function(e,t){s=a[t]=new U(e),s.level=t}),t.tileInfo=new F(ee(e,{lods:a}))}var V,$=P.toMapPoint,J=P.toScreenPoint,q=s.connect,X=s.disconnect,Q=r.hitch,Y=f.set,K=o.indexOf,ee=r.mixin,te=0,ie=v.defaults.map,ne=ie.layerNamePrefix,se=ie.graphicsLayerNamePrefix,ae=new RegExp("^"+ne+"(\\d+)$"),re=new RegExp("^"+se+"(\\d+)$"),oe=function(){},he=1e6,le=.75,de=.25,_e=3,ce=20,pe=40,ue=n([w,M],{declaredClass:"esri._CoreMap",resizeDelay:300,invalidExtent:"Map does not have a valid extent.",invalidGeometry:"Geometry (wkid: ${geometry}) cannot be converted to spatial reference of the map (wkid: ${map})",unknownBasemap:'Unable to find basemap definition for: "${basemapName}". Try one of these: ${list}',invalidBasemap:'Unable to add basemap: "${basemapName}".',unknownLayerType:'Unknown basemap layer type: "${type}" found in basemap definition for: "${basemapName}".',visible:!0,_eventMap:{"basemap-change":!0,"extent-change":["extent","delta","levelChange","lod"],"layer-add":["layer"],"layer-add-result":["layer","error"],"layer-remove":["layer"],"layer-reorder":["layer","index"],"layer-resume":["layer"],"layer-suspend":["layer"],"layers-add-result":["layers"],"layers-removed":!0,"layers-reordered":["layerIds"],load:["map"],pan:["extent","delta"],"pan-end":["extent","delta"],"pan-start":["extent","screenPoint"],reposition:["x","y"],resize:["extent","width","height"],scale:["matrix","immediate"],"time-extent-change":["timeExtent"],"before-unload":["map"],unload:["map"],"update-end":["error"],"update-start":!0,zoom:["extent","zoomFactor","anchor"],"zoom-end":["extent","zoomFactor","anchor","level"],"zoom-start":["extent","zoomFactor","anchor","level"],click:!0,"dbl-click":!0,"key-down":!0,"key-up":!0,"mouse-down":!0,"mouse-drag":!0,"mouse-drag-end":!0,"mouse-drag-start":!0,"mouse-move":!0,"mouse-out":!0,"mouse-over":!0,"mouse-up":!0,"mouse-wheel":!0,"basic-tap":!0,"double-tap":!0,"pinch-end":!0,"pinch-move":!0,"pinch-start":!0,"processed-double-tap":!0,"processed-tap":!0,"swipe-end":!0,"swipe-move":!0,"swipe-start":!0,tap:!0,"two-finger-tap":!0},constructor:function(t,i){var n=this;this.registerConnectEvents(),ee(this,{_internalLayerIds:[],_layers:[],_layerDivs:[],_layerSize:0,_connects:[],_zoomAnimDiv:null,_zoomAnim:null,_layersDiv:null,_firstLayerId:null,_delta:null,_cursor:null,_ratioW:1,_ratioH:1,_params:null,cursor:null,layerIds:[],graphicsLayerIds:[],graphics:null,_labels:null,loaded:!1,__panning:!1,__zooming:!1,__container:null,root:null,__LOD:null,__tileInfo:null,__visibleRect:null,__visibleDelta:null,_rids:[]});var s=this.container=d.byId(t),a=this.id=_.get(s,"id")||g.getUniqueId(this.declaredClass);c.add(s,"map");var r=u.getContentBox(s),o=c.add,h=p.create;this.position=new A(0,0),this._reposition();var f=this.width=r.w>0?r.w:ie.width,m=this.height=r.h>0?r.h:ie.height,y=this.root=h("div",{id:a+"_root",style:{width:f+"px",height:m+"px",direction:"ltr"}});o(y,"esriMapContainer");var x=this.__container=h("div",{id:a+"_container"},y);Y(x,"position","absolute"),o(x,"esriMapContainer"),s.appendChild(y);var v=this._params=ee({slider:!0,nav:!1,zoom:-1,minZoom:-1,maxZoom:-1,scale:-1,minScale:0,maxScale:0,showInfoWindowOnClick:!0,displayGraphicsOnPan:!0,wrapAround180:!0,fitExtent:!1,optimizePanAnimation:!0},i||{});this.wrapAround180=v.wrapAround180,this.optimizePanAnimation=v.optimizePanAnimation,b.isDefined(v.resizeDelay)&&(this.resizeDelay=v.resizeDelay),v.lods&&(G({rows:512,cols:512,dpi:96,format:"JPEG",compressionQuality:75,origin:{x:-180,y:90},spatialReference:{wkid:4326},lods:v.lods},v),this.__tileInfo=v.tileInfo),this.extent=v.extent,this._extentUtil({mapCenter:v.center,targetLevel:v.zoom,targetScale:v.scale}),this.__visibleRect=new C(0,0,f,m),this.__visibleDelta=new C(0,0,f,m);var L=this._layersDiv=h("div",{id:a+"_layers"});if(o(L,"esriMapLayers"),x.appendChild(L),this._zoomAnimDiv=h("div",{style:{position:"absolute"}}),v.infoWindow)this.infoWindow=v.infoWindow;else{var w=this.infoWindow=new B(v.popupOptions,h("div"));w.startup(),w._ootb=!0,Y(w.domNode,"zIndex",pe)}v.showLabels&&(e(["./layers/LabelLayer"],function(e){V=e,n._createLabelLayer()}),this.on("load",function(){n._createLabelLayer()})),this.addPlugin(this._getAbsMid("./plugins/popupManager"),{enabled:v.showInfoWindowOnClick}),this._zoomStartHandler=Q(this,this._zoomStartHandler),this._zoomingHandler=Q(this,this._zoomingHandler),this._zoomEndHandler=Q(this,this._zoomEndHandler),this._panningHandler=Q(this,this._panningHandler),this._panEndHandler=Q(this,this._panEndHandler),this._endTranslate=Q(this,this._endTranslate),this._timedResize=Q(this,this._timedResize),this._execResize=Q(this,this._execResize),this._processLabelLayers=Q(this,this._processLabelLayers),this._updateLabelLayers=Q(this,this._updateLabelLayers),this.resize=Q(this,this.resize),l.addOnWindowUnload(this,this.destroy)},_getAbsMid:function(i){return e.toAbsMid?e.toAbsMid(i):t.id.replace(/\/[^\/]*$/gi,"/")+i},_cleanUp:function(){var e=this.infoWindow;e&&(e._ootb&&e.destroy?e.destroy():e.unsetMap(this),delete this.infoWindow),X(this._tsTimeExtentChange_connect),this.removePlugin("./plugins/popupManager"),p.destroy(this.root),this.root=null},_addLayer:function(e,t,i){if(e.id){var n=e.id.match(e instanceof H?re:ae);n&&n[1]&&(n=Number(n[1]),n>=te&&(te=n+1))}var s=e.id||(e instanceof H?se:ne)+te++;e.id=s,this._layers[s]=e;var a,r;if((t===this.layerIds||t===this.graphicsLayerIds)&&(a=this._layerSize,this._layerSize++),e._isRefLayer="top"===i,i=!b.isDefined(i)||0>i||i>t.length||"top"===i?t.length:i,0===a&&(this._firstLayerId=s),!e._isRefLayer)for(;(r=this.getLayer(t[i-1]))&&r._isRefLayer;)i--;t.splice(i,0,s);var o=Q(this,this._addLayerHandler),h=this,l=this._connects,d=function(){e.loaded?h._onLoadFix?(h._onLoadFix=!1,setTimeout(function(){o(e)},0)):o(e):(h["_"+s+"_addtoken_load"]=q(e,"onLoad",h,"_addLayerHandler"),h["_"+s+"_addtoken_err"]=q(e,"onError",h,function(i){o(e,i,t)}))};return this.loaded||0===a||e.loaded&&-1===K(this.graphicsLayerIds,s)?d():l.push(q(this,"onLoad",d)),e},_addLayerHandler:function(e,t,i){var n,s,a,r,o=this.id,h=e.id,l=K(e instanceof H?this.graphicsLayerIds:this.layerIds,h),d=l,_=!1,c=this._params;if(X(this["_"+h+"_addtoken_load"]),X(this["_"+h+"_addtoken_err"]),t)return delete this._layers[h],void(-1!==l&&(i.splice(l,1),this.onLayerAddResult(e,t)));if(-1===l&&(l=K(this._internalLayerIds,h),d=ce+l,_=!0),h===this._firstLayerId){if(s=e.spatialReference,a=this.extent&&this.extent.spatialReference,!a||a.equals(s)||!e.tileInfo&&e.url||(a=null),n=this.spatialReference=a||s,this.wrapAround180=this.wrapAround180&&n&&n._isWrappable()?!0:!1,e.tileInfo&&(this.__tileInfo?(r=this.__tileInfo.lods,this.__tileInfo=ee({},e.tileInfo),this.__tileInfo.lods=r):(G(ee({},e.tileInfo),c),this.__tileInfo=c.tileInfo)),this.wrapAround180){var p=this.__tileInfo,u=n._getInfo();(!p||Math.abs(u.origin[0]-p.origin.x)>u.dx)&&(this.wrapAround180=!1),this.wrapAround180&&p&&R._addFrameInfo(p,u)}if(c.units=e.units,r=this.__tileInfo&&this.__tileInfo.lods,r&&r.length){var f,m=c.minScale,g=c.maxScale,y=-1,x=-1,v=!1,L=!1;for(f=0;f<r.length;f++)m>0&&!v&&m>=r[f].scale&&(y=r[f].level,v=!0),g>0&&!L&&g>=r[f].scale&&(x=f>0?r[f-1].level:-1,L=!0);for(-1===c.minZoom&&(c.minZoom=0===m?r[0].level:y),-1===c.maxZoom&&(c.maxZoom=0===g?r[r.length-1].level:x),f=0;f<r.length;f++)c.minZoom===r[f].level&&(c.minScale=r[f].scale),c.maxZoom===r[f].level&&(c.maxScale=r[f].scale)}else c.minZoom=c.maxZoom=c.zoom=-1}if(e instanceof H){if(!this._gc){this._gc=new H._GraphicsContainer;var b=this._gc._setMap(this,this._layersDiv);b.id=o+"_gc"}var w=e._setMap(this,this._gc._surface);w.id=o+"_"+h,this._layerDivs[h]=w,this._reorderLayers(this.graphicsLayerIds)}else{var E=e._setMap(this,this._layersDiv,d,this.__LOD);E.id=o+"_"+h,this._layerDivs[h]=E,this._reorderLayers(this.layerIds),_||-1===e.declaredClass.indexOf("VETiledLayer")||this._onBingLayerAdd(e)}if(h===this._firstLayerId&&(this.graphics=new H({id:o+"_graphics",displayOnPan:c.displayGraphicsOnPan}),this._addLayer(this.graphics,this._internalLayerIds,ce)),e===this.graphics){var z,I,M=this._layers[this._firstLayerId],D=c.zoom,A=c.scale,C=c.center,W=M.initialExtent||M.fullExtent;if(this._firstLayerId=null,this.extent&&(this.extent=this._convertGeometry(this,this.extent)),!this.extent&&W&&(C&&(C=this._convertGeometry(W,C)),C&&(W=W.centerAt(C),C=null)),I=this.extent||W&&new S(W.toJson()),I&&(D>-1?I=this.__getExtentForLevel(D,null,I).extent:A>0&&(I=T.getExtentForScale(this,A,I))),!I)return void console.log("Map: "+this.invalidExtent);z=this._fixExtent(I,c.fitExtent),this.extent=z.extent,this.__LOD=z.lod,this.__setExtent(this.extent),this.loaded=!0,this.attr("data-loaded",""),this.infoWindow.setMap(this),this.onLoad(this)}_||(this.onLayerAdd(e),this.onLayerAddResult(e)),X(this[h+"_addLayerHandler_connect"])},_convertGeometry:function(e,t){var i=e&&e.spatialReference,n=t&&t.spatialReference;return i&&n&&!i.equals(n)&&(i._canProject(n)?i.isWebMercator()?t=O.geographicToWebMercator(t):4326===i.wkid&&(t=O.webMercatorToGeographic(t,!0)):(console.log("Map: "+b.substitute({geometry:n.wkid||n.wkt,map:i.wkid||i.wkt},this.invalidGeometry)),t=null)),t},_reorderLayers:function(e){var t=this.onLayerReorder,i=p.place,n=this._layerDivs,s=this._layers,a=this._gc?this._gc._surface.getEventSource():null;if(e===this.graphicsLayerIds)o.forEach(e,function(e,r){var o=n[e];o&&(i(o.getEventSource(),a,r),t(s[e],r))});else{var r,h=this.graphics,l=h?h.id:null,d=this._layersDiv;o.forEach(e,function(e,a){r=n[e],e!==l&&r&&(i(r,d,a),t(s[e],a))}),this._mapImageLyr&&this._placeMapImageLyr(),a&&(a=m("ie")<9?a.parentNode:a,i(a,a.parentNode,e.length))}this.onLayersReordered([].concat(e))},_zoomStartHandler:function(){this.__zoomStart(this._zoomAnimDiv.startingExtent,this._zoomAnimDiv.anchor)},_zoomingHandler:function(e){var t=parseFloat(e.left),i=parseFloat(e.top),n=new S(t,i-parseFloat(e.height),t+parseFloat(e.width),i,this.spatialReference),s=this.extent.getWidth()/n.getWidth();this.__zoom(n,s,this._zoomAnimDiv.anchor)},_zoomEndHandler:function(){var e=this._zoomAnimDiv,t=e.extent,i=this.extent.getWidth()/t.getWidth(),n=e.anchor,s=e.newLod,a=e.levelChange;e.extent=e.anchor=e.levelChange=e.startingExtent=e.newLod=this._delta=this._zoomAnim=null,this.__zoomEnd(t,i,n,s,a)},_panningHandler:function(e){if(isNaN(parseFloat(e.left))||isNaN(parseFloat(e.top))){var t=Math.round,i=this._panAnim.node;e.left=-1*(this._delta.x-t(this.width/2))+"px",e.top=-1*(this._delta.y-t(this.height/2))+"px",f.set(i,"left",e.left),f.set(i,"top",e.top)}var n=new A(parseFloat(e.left),parseFloat(e.top)),s=this.toMap(n);this.onPan(this.extent.offset(this.extent.xmin-s.x,this.extent.ymax-s.y),n)},_panEndHandler:function(e){this.__panning=!1;var t=Math.round,i=new A(-t(parseFloat(e.style.left)),-t(parseFloat(e.style.top))),n=i.x,s=i.y,a=this.__visibleRect,r=this.__visibleDelta;a.x+=-n,a.y+=-s,r.x+=-n,r.y+=-s,Y(this._zoomAnimDiv,{left:"0px",top:"0px"});var o=this.extent,h=this._ratioW,l=this._ratioH;o=new S(o.xmin+n/h,o.ymin-s/l,o.xmax+n/h,o.ymax-s/l,this.spatialReference),i.setX(-i.x),i.setY(-i.y),this._delta=this._panAnim=null,this._updateExtent(o),this.onPanEnd(o,i),this._fireExtChg([o,i,!1,this.__LOD])},_fixExtent:function(e,t){for(var i=this._reshapeExtent(e),n=1+de;t===!0&&(i.extent.getWidth()<e.getWidth()||i.extent.getHeight()<e.getHeight())&&i.lod.level>0&&_e>=n;)i=this._reshapeExtent(e.expand(n)),n+=de;return i},_getFrameWidth:function(){var e=-1,t=this.spatialReference._getInfo();if(this.__LOD){var i=this.__LOD._frameInfo;i&&(e=i[3])}else t&&(e=Math.round(2*t.valid[1]/(this.extent.getWidth()/this.width)));return e},_fixAspectRatio:function(e){var t=e.getWidth(),i=e.getHeight(),n=t/i,s=this.width/this.height,a=0,r=0;return this.width>this.height?t>i?s>n?a=i*s-t:r=t/s-i:a=i*s-t:this.width<this.height?i>t&&s>n?a=i*s-t:r=t/s-i:i>t?a=i-t:t>i&&(r=t/s-i),a&&(e.xmin-=a/2,e.xmax+=a/2),r&&(e.ymin-=r/2,e.ymax+=r/2),e},_reshapeExtent:function(e){return e=this._fixAspectRatio(e),this._getAdjustedExtent(e)},_getAdjustedExtent:function(e){if(this.__tileInfo)return R.getCandidateTileInfo(this,this.__tileInfo,e);var t=T.getScale(this,e),i=this.getMinScale(),n=this.getMaxScale(),s=!i||i>=t,a=!n||t>=n;return s?a||(e=T.getExtentForScale(this,n,e)):e=T.getExtentForScale(this,i,e),{extent:e}},_onBingLayerAdd:function(e){this["__"+e.id+"_vis_connect"]=s.connect(e,"onVisibilityChange",this,"_toggleBingLogo"),this._toggleBingLogo(e.visible)},_onBingLayerRemove:function(e){s.disconnect(this["__"+e.id+"_vis_connect"]),delete this["__"+e.id+"_vis_connect"];var t=this.layerIds,i=o.some(t,function(t){return e=this._layers[t],e&&e.visible&&-1!==e.declaredClass.indexOf("VETiledLayer")},this);this._toggleBingLogo(i)},_toggleBingLogo:function(t){if(t&&!this._bingLogo){var i={left:this._mapParams&&this._mapParams.nav?"25px":""};6===m("ie")&&(i.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='crop', src='"+e.toUrl("./images/map/bing-logo-lg.png")+"')");var n=this._bingLogo=p.create("div",{style:i},this.root);c.add(n,"bingLogo-lg")}else!t&&this._bingLogo&&(p.destroy(this._bingLogo),delete this._bingLogo)},__panStart:function(e,t){var i=this._zoomAnim,n=this._panAnim;if(i&&i._active)i.stop(),i._fire("onEnd",[i.node]);else if(n&&n._active){n.stop(),this._panAnim=null;var s=n.curve.getValue(n._getStep()),a=Math.round(parseFloat(s.left)),r=Math.round(parseFloat(s.top)),o=this.navigationManager._dragOrigin;return this.__pan(a,r),void(o&&(o.x-=a,o.y-=r))}this.__panning=!0,this.onPanStart(this.extent,new A(e,t))},__pan:function(e,t){var i=this.extent,n=this._ratioW,s=this._ratioH;this.onPan(new S(i.xmin-e/n,i.ymin+t/s,i.xmax-e/n,i.ymax+t/s,this.spatialReference),new A(e,t))},__panEnd:function(e,t){var i=this.__visibleRect,n=this.__visibleDelta;i.x+=e,i.y+=t,n.x+=e,n.y+=t;var s=new A(e,t),a=this.extent,r=this._ratioW,o=this._ratioH;a=new S(a.xmin-e/r,a.ymin+t/o,a.xmax-e/r,a.ymax+t/o,this.spatialReference),this.__panning=!1,this._updateExtent(a),this.onPanEnd(a,s),this._fireExtChg([a,s,!1,this.__LOD])},__zoomStart:function(e,t){this.__zooming=!0,this.onZoomStart(e,1,t,this.__LOD?this.__LOD.level:null)},__zoom:function(e,t,i){this.onZoom(e,t,i)},__zoomEnd:function(e,t,i,n,s){Y(this._layersDiv,{left:"0px",top:"0px"}),this._delta=new A(0,0),this.__visibleRect.x=this.__visibleRect.y=0,e=new S(e),this.__LOD=n,this._ratioW=this.width/e.getWidth(),this._ratioH=this.height/e.getHeight();var a=this._delta;this._delta=null,this.__zooming=!1,this._updateExtent(e,s),this.onZoomEnd(e,t,i,n?n.level:null),this._fireExtChg([e,a,s,n])},_extentUtil:function(e,t,i,n,s){var o,h,l,d,_,c,p,u,f,m,g,y,x,v=new a,L=this.width,w=this.height;e&&(o=e.numLevels,h=e.targetLevel,g=b.isDefined(h),l=e.factor,d=e.mapAnchor,_=e.screenAnchor,c=e.mapCenter,y=e.levelOrFactor,p=e.targetScale,u=b.isDefined(p)&&p>0),t&&(f=t.dx,m=t.dy,c=t.mapCenter),r.isArray(c)&&(c=new D(c));var E,z,R,I,M=this._panAnim,C=this._stopAnim(),W=C?C.divExtent:this.extent,P=this.__tileInfo,O=this._params;if(!this.loaded)return i?(W&&(i=this._convertGeometry(W,i)),i&&(this.extent=i,O.zoom=O.scale=-1,O.center=null)):(c||g||u)&&(c&&(W?(c=this._convertGeometry(W,c),c&&(this.extent=W.centerAt(c),O.center=null)):O.center=c),g&&h>-1?(O.zoom=h,O.scale=-1):u&&(O.scale=p,O.zoom=-1)),v.resolve(),v;if(c&&(c=this._convertGeometry(this,c),!c))return v.reject(),v;if(d&&(d=this._convertGeometry(this,d),!d))return v.reject(),v;if(i&&(i=this._convertGeometry(this,i),!i))return v.reject(),v;if(M&&d&&_&&(d=$(this.extent,L,w,_)),C&&d&&_&&(d=$(C.divExtent,L,w,_)),g)if(P){var H=this.getMinZoom(),F=this.getMaxZoom();H>h?h=H:h>F&&(h=F),o=h-(C?C.level:this.getLevel())}else o=h>0?-1:1,x=y?h:null;if(i);else if(b.isDefined(o)){var U;if(P){var k=C?C.level:this.getLevel();U=this.__getExtentForLevel(k+o,c,W).extent}else{var j=C?C.end:this.extent;U=j.expand(x||(o>0?.5*o:2*-o)),x&&c&&(U=U.centerAt(c))}if(U)if(c)i=U;else{var Z=d||W.getCenter(),N=U.getWidth(),B=U.getHeight(),G=Z.x>=W.xmin&&Z.x<=W.xmax?(Z.x-W.xmin)/W.getWidth():.5,V=Z.y>=W.ymin&&Z.y<=W.ymax?(Z.y-W.ymin)/W.getHeight():.5;E=Z.x-G*N,z=Z.y-V*B,i=new S(E,z,E+N,z+B,this.spatialReference)}}else if(u)i=T.getExtentForScale(this,p,W);else if(b.isDefined(l))i=W.expand(l);else if(f||m)if(C){var q=C.end,X=q.getCenter(),Q=J(q,L,w,X);Q.x+=f,Q.y+=m,Q=$(q,L,w,Q),i=q.offset(Q.x-X.x,Q.y-X.y)}else{var Y=new A(L/2+f,w/2+m),K=$(W,L,w,Y);R=W.getWidth(),I=W.getHeight(),E=K.x-R/2,z=K.y-I/2,i=new S(E,z,E+R,z+I,this.spatialReference)}if(!i)if(c){var ee=C?C.end:W;R=ee.getWidth(),I=ee.getHeight(),E=c.x-R/2,z=c.y-I/2,i=new S(E,z,E+R,z+I,this.spatialReference)}else C&&(i=C.end);return i?(this._extentDfd&&-1===this._extentDfd.fired&&(this._extentDfd.then(null,oe),this._extentDfd.reject()),this._extentDfd=v,this.__setExtent(i,null,_,n,C,s)):v.reject(),v},__setExtent:function(e,t,i,n,s,a){try{if(this._firstLayerId)return void(this.extent=e);var r=!0,o=this.spatialReference,h=s?s.divExtent:this.extent,l=this._fixExtent(e,n||!1);e=l.extent;var d=e.getWidth(),_=e.getHeight(),c=Math.round;if(h){var p=c(h.getWidth()*he),u=c(d*he),f=c(h.getHeight()*he),g=c(_*he);r=p!==u||f!==g}var y,x,v,L,b=s&&s.rect,w=s&&s.divExtent;if(ie.zoomDuration&&r&&h){w=w||new S(h),b=b||{left:h.xmin,top:h.ymax,width:h.getWidth(),height:h.getHeight()},x={left:e.xmin,top:e.ymax,width:d,height:_},v=b.width/x.width,L=b.height/x.height;var z=new D(e.xmin,e.ymax,o),R=new D(e.xmin,e.ymin,o),I=new D(this.extent.xmin,this.extent.ymax,o),M=new D(this.extent.xmin,this.extent.ymin,o);y=W.getLineIntersection(I,z,M,R,o),y||s||(r=!1)}this._ratioW=this.width/d,this._ratioH=this.height/_;var T=this._zoomAnimDiv;if(r)if(Y(this._layersDiv,{left:"0px",top:"0px"}),t=new A(0,0),this.__visibleRect.x=this.__visibleRect.y=0,b&&x){this._delta=t,T.id="_zAD",T.startingExtent=w,T.extent=e,T.levelChange=r,T.newLod=l.lod,i?T.anchor=i:!y&&s?T.anchor=s.anchor:T.anchor=J(this.extent,this.width,this.height,y);var P=this.extent.getWidth()/e.getWidth(),O=1>P?1/P:P,H=O>1024;m("chrome")&&H?(this.__zoomStart(w,T.anchor),this.__zoom(w,1,T.anchor),this._fireOnScale(1,T.anchor,!0),this.__zoomEnd(e,P,T.anchor,l.lod,r)):(this._zoomAnim=E.resize({node:T,start:b,end:x,duration:ie.zoomDuration,rate:ie.zoomRate,beforeBegin:s?null:this._zoomStartHandler,onAnimate:this._zoomingHandler,onEnd:this._zoomEndHandler}).play(),this._fireOnScale(P,T.anchor,a))}else this._updateExtent(e,r,a),this._fireExtChg([this.extent,t,r,this.__LOD=l.lod]);else if(!this.__panning)if(this.loaded===!1||a)this._updateExtent(e,r,a),this._fireExtChg([this.extent,t,r,this.__LOD=l.lod]);else{this.__panning=!0,b=new C(0,0,this.width,this.height,this.spatialReference).getCenter(),b.x=c(b.x),b.y=c(b.y);var F=this._delta=this.toScreen(e.getCenter()),U=Math.abs(b.x-F.x),k=Math.abs(b.y-F.y);this.optimizePanAnimation&&(U>2*this.width||k>2*this.height)?(this.__panStart(0,0),this.__pan(0,0),this.__visibleRect.x=this.__visibleRect.y=this.__visibleDelta.x=this.__visibleDelta.y=0,this.__panning=!1,this._delta=null,this._updateExtent(e,!1,a),this.onPanEnd(this.extent,new A(0,0)),this._fireExtChg([this.extent,new A(0,0),!0,this.__LOD])):(this.onPanStart(this.extent,new A(0,0)),this._panAnim=E.slideTo({node:T,left:b.x-F.x,top:b.y-F.y,duration:ie.panDuration,rate:ie.panRate,onAnimate:this._panningHandler,onEnd:this._panEndHandler}),this._panAnim.play())}}catch(j){console.log(j.stack),console.error(j)}},_fireOnScale:function(e,t,i){if("css-transforms"===this.navigationMode){var n=this.__visibleDelta;this.onScale(y.scaleAt(e,{x:-1*(this.width/2-(t.x-n.x)),y:-1*(this.height/2-(t.y-n.y))}),i)}},_stopAnim:function(){var e=this._zoomAnim,t=this._panAnim;if(e&&e._active){e.stop();var i=e.curve.getValue(e._getStep()),n=parseFloat(i.left),s=parseFloat(i.top),a=e.node;return{anchor:a.anchor,start:a.startingExtent,end:a.extent,level:a.newLod&&a.newLod.level,rect:i,divExtent:new S(n,s-parseFloat(i.height),n+parseFloat(i.width),s,this.spatialReference)}}t&&t._active&&(t.stop(),t._fire("onEnd",[t.node]))},__getExtentForLevel:function(e,t,i){var n=this.__tileInfo,s=n&&n.lods;if(e=b.isDefined(e)?e:0,i=i||this.extent,t=t||i&&i.getCenter(),s){if(!t)return void console.log("Map: "+this.invalidExtent);var a=this.getMinZoom(),r=this.getMaxZoom();e>r&&(e=r),a>e&&(e=a);var o=s[e],h=this.width*o.resolution/2,l=this.height*o.resolution/2;return{extent:new S(t.x-h,t.y-l,t.x+h,t.y+l,t.spatialReference),lod:o}}return i?(e=!e||1>e?1:e,{extent:i.expand(e).centerAt(t)}):void console.log("Map: "+this.invalidExtent)},_jobs:0,_incr:function(){1===++this._jobs&&(this.updating=!0,this.attr("data-updating",""),this.onUpdateStart())},_decr:function(){var e=--this._jobs;e?0>e&&(this._jobs=0):(this.updating=!1,this.attr("data-updating"),this.onUpdateEnd())},_fireEvent:function(e,t){this[e]&&this[e].apply(this,t)},_updateExtent:function(e,t,i){this.extent=e,(t||i)&&this._setClipRect();var n=this.spatialReference;n&&(n.isWebMercator()?this.geographicExtent=O.webMercatorToGeographic(this._getAvailExtent(),!0):4326===n.wkid&&(this.geographicExtent=new S(this._getAvailExtent().toJson())))},_fireExtChg:function(e){this.attr("data-zoom",this.getZoom()),this.attr("data-scale",this.getScale()),this._fireEvent("onExtentChange",e);var t=this._extentDfd;t&&(delete this._extentDfd,t.resolve())},attr:function(e,t){var i=this.container;return i&&(null==t?i.removeAttribute(e):i.setAttribute(e,t)),this},onUpdateStart:function(){},onUpdateEnd:function(){},onLoad:function(){this._setClipRect()},onBeforeUnload:function(){},onUnload:function(){},onExtentChange:function(e,t,i){},onTimeExtentChange:function(){},onLayerAdd:function(){},onLayerAddResult:function(){},onLayersAddResult:function(){},onLayerRemove:function(){},onLayersRemoved:function(){},onLayerReorder:function(){},onLayersReordered:function(){},onLayerSuspend:function(){},onLayerResume:function(){},onPanStart:function(){},onPan:function(){},onPanEnd:function(){},onScale:function(){},onZoomStart:function(){},onZoom:function(){},onZoomEnd:function(){},onResize:function(){this._setClipRect()},onReposition:function(){},destroy:function(){this._destroyed||(this.onBeforeUnload(this),this.removeAllLayers(),this._cleanUp(),clearTimeout(this._resizeT),this._gc&&this._gc._cleanUp(),this._destroyed=!0,this.onUnload(this))},setCursor:function(e){Y(this.__container,"cursor",this.cursor=e)},setMapCursor:function(e){this.setCursor(this._cursor=e)},resetMapCursor:function(){this.setCursor(this._cursor)},setInfoWindow:function(e){var t=this.infoWindow;t&&t.unsetMap(this),this.infoWindow=e,this.loaded&&e&&e.setMap(this)},setInfoWindowOnClick:function(e){var t=this._params;t.showInfoWindowOnClick=e,this.popupManager&&this.popupManager.set("enabled",e)},getInfoWindowAnchor:function(e){return this.infoWindow&&this.infoWindow._getAnchor&&this.infoWindow._getAnchor(e)||"upperright"},toScreen:function(e,t){return J(this.extent,this.width,this.height,e,t)},toMap:function(e){return $(this.extent,this.width,this.height,e)},addLayer:function(e,t){return e&&!this.getLayer(e.id)&&this._addLayer(e,e instanceof H?this.graphicsLayerIds:this.layerIds,t),e},addLayers:function(e){var t,i,n=[],a=e.length,r=e.length,h=function(i,r){-1!==o.indexOf(e,i)&&(a--,n.push({layer:i,success:!r,error:r}),a||(s.disconnect(t),this.onLayersAddResult(n)))};for(t=s.connect(this,"onLayerAddResult",h),i=0;r>i;i++)this.addLayer(e[i]);return this},removeLayer:function(e,t){var i=e.id,n=e instanceof H?this.graphicsLayerIds:this.layerIds,s=K(n,i);s>=0&&(n.splice(s,1),e instanceof H?(X(this["_gl_"+e.id+"_click_connect"]),e.loaded&&e._unsetMap(this,this._gc._surface)):e.loaded&&(e._unsetMap(this,this._layersDiv),-1!==e.declaredClass.indexOf("VETiledLayer")&&this._onBingLayerRemove(e)),delete this._layers[i],delete this._layerDivs[i],t||this._reorderLayers(n),this.onLayerRemove(e))},removeAllLayers:function(){var e,t=this.layerIds;for(e=t.length-1;e>=0;e--)this.removeLayer(this._layers[t[e]],1);for(t=this.graphicsLayerIds,e=t.length-1;e>=0;e--)this.removeLayer(this._layers[t[e]],1);this.onLayersRemoved()},reorderLayer:function(e,t){r.isString(e)&&(i.deprecated(this.declaredClass+": Map.reorderLayer(/*String*/ id, /*Number*/ index) deprecated. Use Map.reorderLayer(/*Layer*/ layer, /*Number*/ index).",null,"v2.0"),e=this.getLayer(e));var n,s=e.id,a=e instanceof H?this.graphicsLayerIds:this.layerIds;0>t?t=0:t>=a.length&&(t=a.length-1),n=K(a,s),-1!==n&&n!==t&&(a.splice(n,1),a.splice(t,0,s),this._reorderLayers(a))},getLayer:function(e){return this._layers[e]},setExtent:function(e,t){e=new S(e.toJson());var i,n=e.getWidth(),s=e.getHeight();return i=0===n&&0===s?this.centerAt(new D({x:e.xmin,y:e.ymin,spatialReference:e.spatialReference&&e.spatialReference.toJson()})):this._extentUtil(null,null,e,t)},centerAt:function(e){return this._extentUtil(null,{mapCenter:e})},centerAndZoom:function(e,t){return this._extentUtil({targetLevel:t,mapCenter:e,levelOrFactor:!0})},getScale:function(){return this.__LOD?this.__LOD.scale:T.getScale(this)},getResolution:function(){return this.__LOD?this.__LOD.resolution:this.extent?this.extent.getWidth()/this.width:0},getResolutionInMeters:function(){return this.getResolution()*T.getUnitValueForSR(this.spatialReference)},getMinScale:function(){return this._params.minScale},getMaxScale:function(){return this._params.maxScale},setScale:function(e){return this._extentUtil({targetScale:e})},getLayersVisibleAtScale:function(e){var t=[];return e=e||this.getScale(),e&&o.forEach(this.layerIds.concat(this.graphicsLayerIds),function(i){i=this.getLayer(i),i.isVisibleAtScale(e)&&t.push(i)},this),t},getNumLevels:function(){var e=this.getMinZoom(),t=this.getMaxZoom();return e===t&&0>e?0:t-e+1},getLevel:function(){return this.__LOD?this.__LOD.level:-1},setLevel:function(e){return e>-1?this._extentUtil({targetLevel:e}):void 0},getZoom:function(){return this.getLevel()},setZoom:function(e){return this.setLevel(e)},getMinZoom:function(){return this._params.minZoom},getMaxZoom:function(){return this._params.maxZoom},setBasemap:function(e){var t,i="Map.setBasemap: ";if(r.isObject(e)?(t=e,e=t.title):t=L&&L[e],t){this._basemapDfd&&-1===this._basemapDfd.fired&&this._basemapDfd.cancel();var n=[],h=[],l=0;if(o.forEach(t.baseMapLayers||t.layers,function(t){var s,a,r={id:t.id,displayLevels:t.displayLevels,opacity:b.isDefined(t.opacity)?t.opacity:null,visible:b.isDefined(t.visibility)?t.visibility:null};if(t.type)switch(t.type){case"OpenStreetMap":s=new Z(r);break;case"VectorTile":a=I._ensureProperProtocolForAGOResource(t.url),s=new N(a,r);break;default:console.log(i+b.substitute({basemapName:e,type:t.type},this.unknownLayerType))}else a=I.normalize(t.url),s=new k(a,r);s&&(n.push(s),h.push(t),t.isReference||l++)},this),!n.length||!l)return void console.log(i+b.substitute({basemapName:e},this.invalidBasemap));var d={basemapName:e,infos:h,layers:n};if(!this.loaded)return void this._basemapLoaded(d);var _=this,c=new a(z._dfdCanceller),p=function(e){c._pendingLayers--;var t=o.indexOf(d.layers,this);if(t>-1){var i=c._layerEvents[t];i&&(s.disconnect(i[0]),s.disconnect(i[1]))}c._pendingLayers<=0&&(delete c._layerEvents,delete _._basemapDfd,c.fired<0&&c.callback(d))};this._basemapDfd=c,c._pendingLayers=0,c._layerEvents={},o.forEach(n,function(e,t){e&&(c._pendingLayers++,e.loaded?p(e):c._layerEvents[t]=[s.connect(e,"onLoad",e,p),s.connect(e,"onError",e,p)])}),c.addCallback(Q(this,this._basemapLoaded))}else{var u,f=[];for(u in L)f.push(u);console.log(i+b.substitute({basemapName:e,list:f.join(",")},this.unknownBasemap))}},_basemapLoaded:function(e){var t,i=e.layers,n=e.infos,s=0,a=!0;this.loaded&&(o.forEach(i,function(e,t){e.loaded&&(n[t].isReference||s++)}),a=s),a&&(this.basemapLayerIds&&(t={basemapName:this._basemap,infos:L&&L[this._basemap]&&L[this._basemap].baseMapLayers},t.basemapName||(o.forEach(this.basemapLayerIds,function(e){var i=this.getLayer(e);return i instanceof Z?(t.basemapName="osm",t.infos=L&&L.osm&&L.osm.baseMapLayers,!1):void 0},this),t.basemapName||(t=null))),this._removeBasemap(),this._basemap=e.basemapName,this.basemapLayerIds=this._addBasemap(i,n),this.attr("data-basemap",this.getBasemap()),this.emit("basemap-change",{current:e,previous:t}))},_addBasemap:function(e,t){var i=[],n=[],s=0;return o.forEach(e,function(e,a){t[a].isReference?i.push(e):(this.addLayer(e,s++),n.push(e.id))},this),i.length&&o.forEach(i,function(e){e.attr("data-reference",!0),this.addLayer(e,"top"),n.push(e.id)},this),n},_removeBasemap:function(){var e,t=this.basemapLayerIds;t&&t.length&&o.forEach(t,function(t){e=this.getLayer(t),e&&this.removeLayer(e)},this)},getBasemap:function(){return this._basemap||""},translate:function(e,t){if(e=e||0,t=t||0,!this._txTimer){this._tx=this._ty=0;var i=this.toScreen(this.extent.getCenter());this.__panStart(i.x,i.y)}this._tx+=e,this._ty+=t,this.__pan(this._tx,this._ty),clearTimeout(this._txTimer),this._txTimer=setTimeout(this._endTranslate,150)},_endTranslate:function(){clearTimeout(this._txTimer),this._txTimer=null;var e=this._tx,t=this._ty;this._tx=this._ty=0,this.__panEnd(e,t)},setTimeExtent:function(e){this.timeExtent=e;var t=e?new e.constructor(e.toJson()):null;this.onTimeExtentChange(t)},setTimeSlider:function(e){this.timeSlider&&(X(this._tsTimeExtentChange_connect),this._tsTimeExtentChange_connect=null,this.timeSlider=null),e&&(this.timeSlider=e,this.setTimeExtent(e.getCurrentTimeExtent()),this._tsTimeExtentChange_connect=q(e,"onTimeExtentChange",this,"setTimeExtent"))},setVisibility:function(e){if(this.visible!==e){if(this.visible=e,e||(this._display=this.container.style.display),this.container.style.display=e?this._display:"none",this.autoResize){var t=e?"resume":"pause";this._rszSignal[t](),this._oriSignal[t]()}e&&this.resize()}return this},resize:function(e){clearTimeout(this._resizeT),this._destroyed||(e===!0?this._execResize():this._resizeT=setTimeout(this._execResize,this.resizeDelay))},_timedResize:function(){this._resizeT||this._execResize()},_execResize:function(){clearTimeout(this._resizeT),this._resizeT=null,this.reposition(),this._resize(),this.autoResize&&this._startResizeTimer()},_resize:function(){var e=this.width,t=this.height,i=f.get(this.container,"display"),n=u.getContentBox(this.container);if(!("none"===i||n.w<=0||n.h<=0||e===n.w&&t===n.h)){var s=this._zoomAnim||this._panAnim;s&&(s.stop(),s._fire("onEnd",[s.node])),Y(this.root,{width:(this.width=n.w)+"px",height:(this.height=n.h)+"px"});var a=this.width,r=this.height;this.attribution&&this.attribution.domNode&&f.set(this.attribution.domNode,"maxWidth",Math.floor(a*this._mapParams.attributionWidth)+"px"),this.__visibleRect.update(this.__visibleRect.x,this.__visibleRect.y,a,r),this.__visibleDelta.update(this.__visibleDelta.x,this.__visibleDelta.y,a,r);var o=new C(this.extent),h=new C(o.x,o.y,o.width*(a/e),o.height*(r/t),this.spatialReference).getExtent();this.onResize(h,a,r),this._extentUtil(null,null,h,null,!0)}},reposition:function(){
var e=this.position,t=e.x,i=e.y;this._reposition(),e=this.position,(t!==e.x||i!==e.y)&&this.onReposition(e.x,e.y)},_reposition:function(){var e=u.position(this.container,!0),t=u.getPadBorderExtents(this.container);this.position.update(e.x+t.l,e.y+t.t)},_setClipRect:function(){delete this._clip;var e=m("ie")<=7||void 0===m("ie")&&m("trident")>=7?"rect(auto,auto,auto,auto)":"auto";if(this.wrapAround180){var t=this.width,i=this.height,n=this._getFrameWidth(),s=t-n;if(s>0){var a=s/2;e="rect(0px,"+(a+n)+"px,"+i+"px,"+a+"px)";var r=this.extent.getWidth(),o=r*(n/t);this._clip=[(r-o)/2,o]}}Y(this.__container,"clip",e)},_getAvailExtent:function(){var e=this.extent,t=this._clip;if(t){if(!e._clip){var i=new C(e);i.width=t[1],i.x=i.x+t[0],e._clip=i.getExtent()}return e._clip}return e},_fixedPan:function(e,t){return this._extentUtil(null,{dx:e,dy:t})},panUp:function(){return this._fixedPan(0,this.height*-le)},panUpperRight:function(){return this._fixedPan(this.width*le,this.height*-le)},panRight:function(){return this._fixedPan(this.width*le,0)},panLowerRight:function(){return this._fixedPan(this.width*le,this.height*le)},panDown:function(){return this._fixedPan(0,this.height*le)},panLowerLeft:function(){return this._fixedPan(this.width*-le,this.height*le)},panLeft:function(){return this._fixedPan(this.width*-le,0)},panUpperLeft:function(){return this._fixedPan(this.width*-le,this.height*-le)},enableSnapping:function(t){if(t=t||{},"esri.SnappingManager"===t.declaredClass)this.snappingManager=t;else{var i=["./SnappingManager"],n=te++,s=this;this._rids&&this._rids.push(n),e(i,function(e){var i=s._rids?o.indexOf(s._rids,n):-1;-1!==i&&(s._rids.splice(i,1),s.snappingManager=new e(r.mixin({map:s},t)))})}return this.snappingManager},disableSnapping:function(){this.snappingManager&&this.snappingManager.destroy(),this.snappingManager=null},_createLabelLayer:function(){!this._labels&&V&&this.loaded&&(this._labels=new V({id:"_internal_LabelLayer"}),this._labels._setMap(this,this._gc._surface),this._processLabelLayers(),this.on("layers-reordered",this._processLabelLayers))},_processLabelLayers:function(){null==this._labelProcessor&&(this._labelProcessor=setTimeout(this._updateLabelLayers,0))},_updateLabelLayers:function(){this._labelProcessor=null,this._labels&&(this._labels.removeAllFeatureLayers(),o.forEach(this.graphicsLayerIds,function(e){var t=this.getLayer(e);"function"==typeof t.applyEdits?this._labels.addFeatureLayer(t):"esri.layers.WFSLayer"===t.declaredClass&&this._labels.addFeatureLayer(t)},this))},_getMapImageLyr:function(){return this.loaded&&!this._mapImageLyr&&(this._mapImageLyr=new j,this._mapImageLyr._setMap(this,this._layersDiv),this._placeMapImageLyr()),this._mapImageLyr},_placeMapImageLyr:function(){for(var e,t,i=this.layerIds,n=this._layerDivs,s=!1,a=i.length-1;a>=0;a--){var r=i[a];if(t=this.getLayer(r),e=n[r],t&&e&&!t._isReference){p.place(this._mapImageLyr._div,e,"after"),s=!0;break}}s||p.place(this._mapImageLyr._div,this._layersDiv,"first")}});return m("extend-esri")&&(x._CoreMap=ue),ue});