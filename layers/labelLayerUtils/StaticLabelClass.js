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

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../../kernel","../../geometry/Extent","../../geometry/Point","../../geometry/Polygon"],function(e,t,i,a,n,s,r){var h=e(null,{declaredClass:"esri.layers.labelLayerUtils.StaticLabel",constructor:function(){this._preparedLabels=[],this._placedLabels=[],this._extent=null,this._xmin=0,this._xmax=0,this._ymin=0,this._ymax=0,this._scale=1,this._LINE_STEP_CONST=1.5,this._POLYGON_X_STEP_CONST=1,this._POLYGON_Y_STEP_CONST=.75,this._OVERRUN=2},setMap:function(e,t){this._labelLayer=t,this._map=e,this._xmin=e.extent.xmin,this._xmax=e.extent.xmax,this._ymin=e.extent.ymin,this._ymax=e.extent.ymax,this._scale=(this._xmax-this._xmin)/e.width},_process:function(e){var t,i,a,n,h,o,l,_,g,c,f;for(this._preparedLabels=e,this._placedLabels=[],t=this._preparedLabels.length-1;t>=0;t--){i=this._preparedLabels[t],l=i.labelWidth,_=i.labelHeight,g=i.options,c=g&&g.lineLabelPlacement?g.lineLabelPlacement:"PlaceAtCenter",f=g&&g.lineLabelPosition?g.lineLabelPosition:"Above",n=g&&g.labelRotation?g.labelRotation:!0,h=i.angle*(Math.PI/180),o=g&&g.howManyLabels?g.howManyLabels:"OneLabel";var m=[];if("point"===i.geometry.type)this._generatePointPositions(i.geometry.x,i.geometry.y,i.text,h,l,_,i.symbolWidth,i.symbolHeight,g,m);else if("multipoint"===i.geometry.type)for(a=0;a<i.geometry.points.length;a++)this._generatePointPositions(i.geometry.points[a][0],i.geometry.points[a][1],i.text,h,l,_,i.symbolWidth,i.symbolHeight,g,m);else if("polyline"===i.geometry.type)if("PlaceAtStart"===c)this._generateLinePositionsPlaceAtStart(i.geometry,!0,i.text,l,_,2*i.symbolHeight+_,c,f,n,m);else if("PlaceAtEnd"===c)this._generateLinePositionsPlaceAtEnd(i.geometry,!0,i.text,l,_,2*i.symbolHeight+_,c,f,n,m);else{var u=[],p=i.geometry.getExtent(),y=this._map.extent;if(p.getWidth()<l*this._scale/this._OVERRUN&&p.getHeight()<l*this._scale/this._OVERRUN)continue;if(.5*p.getWidth()<y.getWidth()&&.5*p.getHeight()<y.getHeight()){var v=.1*Math.min(this._map.width,this._map.height)*this._scale;this._generateLinePositionsPlaceAtCenter(i.geometry,!1,v,i.text,l,_,2*i.symbolHeight+_,c,f,n,u)}else{var x=.2*Math.min(this._map.width,this._map.height)*this._scale;this._generateLinePositionsPlaceAtCenter(i.geometry,!0,x,i.text,l,_,2*i.symbolHeight+_,c,f,n,u)}this._postSorting(y,u,m)}else if("polygon"===i.geometry.type){var b=[];for(a=0;a<i.geometry.rings.length;a++){var P=i.geometry.rings[a];if(r.prototype.isClockwise(P)){var d=this._calcRingExtent(P);d.xmax-d.xmin<4*l*this._scale/this._OVERRUN&&d.ymax-d.ymin<4*_*this._scale/this._OVERRUN||b.push(P)}}for(b.sort(function(e,t){return t.length-e.length}),a=0;a<b.length;a++)this._generatePolygonPositionsForManyLabels(b[a],i.geometry.spatialReference,i.text,h,l,_,m)}for(a=0;a<m.length;a++){var L=m[a].x,M=m[a].y;void 0!==m[a].angle&&(h=m[a].angle);var R=this._findPlace(i,i.text,L,M,h,l,_);if("OneLabel"===o&&R&&this._labelLayer._isWithinScreenArea(new s(L,M,i.geometry.spatialReference)))break}}return this._placedLabels},_generatePointPositions:function(e,t,i,a,n,s,r,h,o,l){var _,g,c,f,m;switch(m=o&&o.pointPriorities?o.pointPriorities:"AboveRight",c=(r+n)*this._scale,f=(h+s)*this._scale,m.toLowerCase()){case"aboveleft":_=e-c,g=t+f;break;case"abovecenter":_=e,g=t+f;break;case"aboveright":_=e+c,g=t+f;break;case"centerleft":_=e-c,g=t;break;case"centercenter":_=e,g=t;break;case"centerright":_=e+c,g=t;break;case"belowleft":_=e-c,g=t-f;break;case"belowcenter":_=e,g=t-f;break;case"belowright":_=e+c,g=t-f;break;default:return}l.push({x:_,y:g})},_generateLinePositionsPlaceAtStart:function(e,t,i,a,n,s,r,h,o,l){var _,g,c,f,m,u,p,y,v,x=a*this._scale,b=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale;for(_=0;_<e.paths.length;_++){var P=e.paths[_],d=x,L=0;for(g=0;g<P.length-1;g++)c=P[g][0],f=P[g][1],m=P[g+1][0],u=P[g+1][1],p=m-c,y=u-f,v=Math.sqrt(p*p+y*y),L+v>d?(L=this._generatePositionsOnLine(e.spatialReference,t,d,b,L,c,f,m,u,i,a,n,s,h,o,l),d=b):L+=v}},_generateLinePositionsPlaceAtEnd:function(e,t,i,a,n,s,r,h,o,l){var _,g,c,f,m,u,p,y,v,x=a*this._scale,b=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale;for(_=0;_<e.paths.length;_++){var P=e.paths[_],d=x,L=0;for(g=P.length-2;g>=0;g--)c=P[g+1][0],f=P[g+1][1],m=P[g][0],u=P[g][1],p=m-c,y=u-f,v=Math.sqrt(p*p+y*y),L+v>d?(L=this._generatePositionsOnLine(e.spatialReference,t,d,b,L,c,f,m,u,i,a,n,s,h,o,l),d=b):L+=v}},_generateLinePositionsPlaceAtCenter:function(e,t,i,a,n,s,r,h,o,l,_){var g,c,f,m,u,p,y,v,x,b;for(g=0;g<e.paths.length;g++){var P=e.paths[g];if(!(P.length<2)){if(2==P.length){var d=P[0],L=P[1],M=d[0],R=d[1],w=L[0],S=L[1],E=(w-M)*(w-M)+(S-R)*(S-R);b=Math.atan2(S-R,w-M);var O=Math.cos(b),A=Math.sin(b);P=[];for(var N=M,C=R;E>(N-M)*(N-M)+(C-R)*(C-R);)P.push([N,C]),N+=i/2*O,C+=i/2*A;P.push(L)}var I=0;for(c=0;c<P.length-1;c++)m=P[c][0],u=P[c][1],p=P[c+1][0],y=P[c+1][1],v=p-m,x=y-u,I+=Math.sqrt(v*v+x*x);var k=0;for(c=0;c<P.length-1;c++){m=P[c][0],u=P[c][1],p=P[c+1][0],y=P[c+1][1],v=p-m,x=y-u;var W=Math.sqrt(v*v+x*x);if(k+W>I/2)break;k+=W}c==P.length-1&&c--,m=P[c][0],u=P[c][1],p=P[c+1][0],y=P[c+1][1],v=p-m,x=y-u;var H=I/2-k;b=Math.atan2(x,v);var T=m+H*Math.cos(b),q=u+H*Math.sin(b),F=this._angleAndShifts(m,u,p,y,r,o,l);_.push({x:T+F.shiftX,y:q+F.shiftY,angle:F.angle});var U=T,X=q;for(k=0,f=c;f<P.length-1;f++)f==c?(m=U,u=X):(m=P[f][0],u=P[f][1]),p=P[f+1][0],y=P[f+1][1],v=p-m,x=y-u,W=Math.sqrt(v*v+x*x),k+W>i?k=this._generatePositionsOnLine(e.spatialReference,t,i,i,k,m,u,p,y,a,n,s,r,o,l,_):k+=W;for(k=0,f=c;f>=0;f--)f==c?(m=U,u=X):(m=P[f+1][0],u=P[f+1][1]),p=P[f][0],y=P[f][1],v=p-m,x=y-u,W=Math.sqrt(v*v+x*x),k+W>i?k=this._generatePositionsOnLine(e.spatialReference,t,i,i,k,m,u,p,y,a,n,s,r,o,l,_):k+=W}}},_generatePositionsOnLine:function(e,t,i,a,s,r,h,o,l,_,g,c,f,m,u,p){for(var y=o-r,v=l-h,x=Math.atan2(v,y),b=r,P=h,d=b,L=P,M=i;;){var R=M-s;if(b+=R*Math.cos(x),P+=R*Math.sin(x),!this._belongs(b,P,r,h,o,l)){var w=o-d,S=l-L;return Math.sqrt(w*w+S*S)}var E=this._angleAndShifts(r,h,o,l,f,m,u),O=b+E.shiftX,A=P+E.shiftY;t?this._labelLayer._isWithinScreenArea(new n(O,A,O,A,e))&&p.push({x:O,y:A,angle:E.angle}):p.push({x:O,y:A,angle:E.angle}),d=b,L=P,s=0,M=a}},_postSorting:function(e,t,i){if(e&&t.length>0){for(var a=.5*(e.xmin+e.xmax),n=.5*(e.ymin+e.ymax),s=0,r=t[0].x,h=t[0].y,o=Math.sqrt((r-a)*(r-a)+(h-n)*(h-n)),l=t[0].angle,_=0;_<t.length;_++){var g=t[_].x,c=t[_].y,f=Math.sqrt((g-a)*(g-a)+(c-n)*(c-n));o>f&&(s=_,r=g,h=c,o=f,l=t[_].angle)}i.push({x:r,y:h,angle:l})}},_belongs:function(e,t,i,a,n,s){if(n==i&&s==a)return!1;if(n>i){if(e>n||i>e)return!1}else if(n>e||e>i)return!1;if(s>a){if(t>s||a>t)return!1}else if(s>t||t>a)return!1;return!0},_angleAndShifts:function(e,t,i,a,n,s,r){for(var h=i-e,o=a-t,l=Math.atan2(o,h);l>Math.PI/2;)l-=Math.PI;for(;l<-(Math.PI/2);)l+=Math.PI;var _=Math.sin(l),g=Math.cos(l),c=0,f=0;"Above"==s&&(c=n*_*this._scale,f=n*g*this._scale),"Below"==s&&(c=-n*_*this._scale,f=-n*g*this._scale);var m=[];return m.angle=r?-l:0,m.shiftX=-c,m.shiftY=f,m},_generatePolygonPositionsForManyLabels:function(e,t,i,a,n,s,r){var h=this._findCentroidForRing(e),o=h[0],l=h[1],_=this._calcRingExtent(e),g=_.xmin,c=_.ymin,f=_.xmax,m=_.ymax,u=(f-g)/(this._map.width*this._scale),p=(m-c)/(this._map.height*this._scale);if(!(u>10&&p>10)){var y=!0;(f-g>this._map.width*this._scale||m-c>this._map.height*this._scale)&&(y=!1);var v=this._map.width*this._scale*(y?.1875:.5),x=this._map.height*this._scale*(y?.1875:.5),b=!0,P=!0,d=0,L=l;do{var M=d%2?-1:1;if(L+=M*d*x,this._scanRingByX(i,t,e,o,L,g,f,v,r))return;c>L&&(b=!1),L>m&&(P=!1),d++}while(b||P)}},_scanRingByX:function(e,t,i,a,s,r,h,o,l){var _=!0,g=!0,c=0,f=a,m=1e3;do{var u=c%2?-1:1;f+=u*c*o;var p=this._movePointInsideRing(i,f,s),y=this._labelLayer._isWithinScreenArea(new n(p,s,p,s,t)),v=this._isPointWithinRing(e,i,p,s);if(y&&v)return l.push({x:p,y:s}),!0;if(r>f&&(_=!1),f>h&&(g=!1),c++,m--,0>=m)return!0}while(_||g);return!1},_movePointInsideRing:function(e,t,i){for(var a=[],n=e.length-1,s=e[0][1],r=e[n][1],h=s>=r?1:-1,o=0;n>=o;o++){var l=o,_=o+1;o==n&&(_=0);var g=e[l][0],c=e[l][1],f=e[_][0],m=e[_][1],u=m>=c?1:-1;if(i>=c&&m>=i||i>=m&&c>=i){if(i!=c&&i!=m){a.push((i-c)*(f-g)/(m-c)+g),h=u;continue}if(i==c&&i!=m){h!=u&&a.push(g),h=u;continue}if(i!=c&&i==m){a.push(f),h=u;continue}if(i==c&&i==m){1==h&&a.push(g),a.push(f),h=u;continue}}}a.sort(function(e,t){return e-t});var p=a.length;if(p>0){var y=0,v=0;for(o=0;p-1>o;o+=2){var x=Math.abs(a[o+1]-a[o]);x>y&&(y=x,v=o)}var b=a[v],P=a[v+1];t=(b+P)/2}return t},_calcRingExtent:function(e){var t,i;for(i=new n,t=0;t<e.length-1;t++){var a=e[t][0],s=e[t][1];(void 0===i.xmin||a<i.xmin)&&(i.xmin=a),(void 0===i.ymin||s<i.ymin)&&(i.ymin=s),(void 0===i.xmax||a>i.xmax)&&(i.xmax=a),(void 0===i.ymax||s>i.ymax)&&(i.ymax=s)}return i},_isPointWithinPolygon:function(e,t,i,a){var n;for(n=0;n<t.rings.length;n++){var s=t.rings[n];if(this._isPointWithinRing(e,s,i,a))return!0}return!1},_isPointWithinRing:function(e,t,i,a){var n,s,r,h,o,l=[],_=t.length;for(n=0;_-1>n;n++)if(s=t[n][0],r=t[n][1],h=t[n+1][0],o=t[n+1][1],s!=h||r!=o){if(r==o){if(a!=r)continue;l.push(s)}if(s==h)o>r&&a>=r&&o>a&&l.push(s),r>o&&r>=a&&a>o&&l.push(s);else{var g=(h-s)/(o-r)*(a-r)+s;h>s&&g>=s&&h>g&&l.push(g),s>h&&s>=g&&g>h&&l.push(g)}}for(l.sort(function(e,t){return e-t}),n=0;n<l.length-1;n++)if(s=l[n],h=l[n+1],i>=s&&h>i)return n%2?!1:!0;return!1},_findCentroidForRing:function(e){for(var t=e.length,i=[0,0],a=0,n=e[0][0],s=e[0][1],r=1;t-1>r;r++){var h=e[r][0],o=e[r][1],l=e[r+1][0],_=e[r+1][1],g=(h-n)*(_-s)-(l-n)*(o-s);i[0]+=g*(n+h+l),i[1]+=g*(s+o+_),a+=g}return i[0]/=3*a,i[1]/=3*a,i},_findCentroidForFeature:function(e){for(var t=0,i=[0,0],a=0,n=0;n<e.rings.length;n++){var s=e.rings[n],r=s.length;a+=r;for(var h=s[0][0],o=s[0][1],l=1;r-1>l;l++){var _=s[l][0],g=s[l][1],c=s[l+1][0],f=s[l+1][1],m=(_-h)*(f-o)-(c-h)*(g-o);i[0]+=m*(h+_+c),i[1]+=m*(o+g+f),t+=m}}return i[0]/=3*t,i[1]/=3*t,i},_findPlace:function(e,t,i,a,s,h,o){if(isNaN(i)||isNaN(a))return!1;for(var l=0;l<this._placedLabels.length;l++){var _=this._placedLabels[l].angle,g=this._placedLabels[l].x,c=this._placedLabels[l].y,f=this._placedLabels[l].width*this._scale,m=this._placedLabels[l].height*this._scale,u=g-i,p=c-a;if(0===s&&0===_){if(this._findPlace2(-h*this._scale,-o*this._scale,h*this._scale,o*this._scale,u-f,p-m,u+f,p+m))return!1}else{var y=new n(-h*this._scale,-o*this._scale,h*this._scale,o*this._scale,null),v=0,x=1;0!==s&&(v=Math.sin(s),x=Math.cos(s));var b=u*x-p*v,P=u*v+p*x,d=_-s,L=Math.sin(d),M=Math.cos(d),R=-f*M- -m*L,w=-f*L+-m*M,S=+f*M- -m*L,E=+f*L+-m*M,O=b+R,A=P-w,N=b+S,C=P-E,I=b-R,k=P+w,W=b-S,H=P+E,T=new r;if(T.addRing([[O,A],[N,C],[I,k],[W,H],[O,A]]),y.intersects(T))return!1}}for(;s>Math.PI/2;)s-=Math.PI;for(;s<-(Math.PI/2);)s+=Math.PI;var q={};return q.layer=e,q.text=t,q.angle=s,q.x=i,q.y=a,q.width=h,q.height=o,this._placedLabels.push(q),!0},_findPlace2:function(e,t,i,a,n,s,r,h){return(e>=n&&r>=e||i>=n&&r>=i||n>=e&&i>=r)&&(t>=s&&h>=t||a>=s&&h>=a||s>=t&&a>=h)?!0:!1}});return h});