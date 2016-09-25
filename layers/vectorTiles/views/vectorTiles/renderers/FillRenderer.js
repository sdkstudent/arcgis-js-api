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

define(["require","exports","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/mat3","../../../core/libs/gl-matrix/vec4","../../../core/libs/gl-matrix/vec3","dojo/text!./shaders/solidFillShader.vs.glsl","dojo/text!./shaders/solidFillShader.fs.glsl","dojo/text!./shaders/patternFillShader.vs.glsl","dojo/text!./shaders/patternFillShader.fs.glsl","dojo/text!./shaders/fillOutlineShader.vs.glsl","dojo/text!./shaders/fillOutlineShader.fs.glsl","../../webgl/Program","../../webgl/VertexArrayObject","../GeometryUtils"],function(t,r,i,e,o,l,a,n,s,f,_,u,m,h,g){var d=1/65536,p=function(){function t(){this._outlineAttributeLocations={a_pos:0,a_offset:1,a_xnormal:2},this._fillAttributeLocations={a_pos:0},this._initialized=!1,this._viewProjMat=i.create(),this._offsetVector=l.create(),this._patternMatrix=e.create(),this._color=o.create(),this._outlineColor=o.create()}return t.prototype.render=function(t,r,o,l,a,n,s,f,_,u){this._initialized||this._initialize(t);var m=s.getPaintValue("fill-pattern",o),h=void 0!==m;if(!h||0!==a){var p=s.getPaintValue("fill-antialias",o)&&!h,c=s.getPaintValue("fill-opacity",o),x=s.getPaintValue("fill-color",o),v=!1;if(!h){var y=x[3]*c;1===y&&0===a&&(v=!0),1>y&&1===a&&(v=!0)}if(v||0!==a){var P=n.tileTransform.transform,b=512,V=n.coordRange/b,A=s.getPaintValue("fill-translate",o);if(0!==A[0]||0!==A[1]){i.copy(this._viewProjMat,n.tileTransform.transform);var O=A[0],M=A[1],j=0,F=0,U=(1<<n.key.level)/Math.pow(2,o)*V,w=s.getPaintValue("fill-translate-anchor",o);if(1===w){var z=Math.sin(g.C_DEG_TO_RAD*-l),C=Math.cos(g.C_DEG_TO_RAD*-l);j=U*(O*C-M*z),F=U*(O*z+M*C)}else j=U*O,F=U*M;this._offsetVector[0]=j,this._offsetVector[1]=F,this._offsetVector[2]=0,i.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),P=this._viewProjMat}var T=this._getTrianglesVAO(t,n);if(T){if(t.bindVAO(T),h){if(1===a){var E=f.getMosaicItemPosition(m,!0);if(E){var S=512,L=n.coordRange/S,U=L/Math.pow(2,Math.round(o)-n.key.level)/u;e.identity(this._patternMatrix);var B=1/(E.size[0]*U),D=1/(E.size[1]*U);this._patternMatrix[0]=B,this._patternMatrix[4]=D,f.bind(t,9729,0),t.bindProgram(this._patternFillProgram),this._patternFillProgram.setUniformMatrix4fv("u_transformMatrix",P),this._patternFillProgram.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord),this._patternFillProgram.setUniform1f("u_depth",s.z),this._patternFillProgram.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix),this._patternFillProgram.setUniform1f("u_opacity",c),this._patternFillProgram.setUniform2f("u_pattern_tl",E.tl[0],E.tl[1]),this._patternFillProgram.setUniform2f("u_pattern_br",E.br[0],E.br[1]),this._patternFillProgram.setUniform1i("u_texture",0),t.drawElements(4,r.triangleElementCount,5125,12*r.triangleElementStart)}}}else v&&(this._color[0]=x[0],this._color[1]=x[1],this._color[2]=x[2],this._color[3]=x[3]*c,t.bindProgram(this._solidFillProgram),this._solidFillProgram.setUniformMatrix4fv("u_transformMatrix",P),this._solidFillProgram.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord),this._solidFillProgram.setUniform1f("u_depth",s.z+d),this._solidFillProgram.setUniform4fv("u_color",this._color),t.drawElements(4,r.triangleElementCount,5125,12*r.triangleElementStart)),t.bindVAO();if(p&&r.outlineElementCount>0){if(1!==a)return;var R=s.getPaintValue("fill-outline-color",o);if(0===R[3]){if(1!==this._color[3])return;R=x}var G=.75/u;this._outlineColor[0]=R[0],this._outlineColor[1]=R[1],this._outlineColor[2]=R[2],this._outlineColor[3]=R[3]*c;var I=this._getOutlineVAO(t,n);if(!I)return;t.bindVAO(I),t.bindProgram(this._outlineProgram),this._outlineProgram.setUniformMatrix4fv("u_transformMatrix",P),this._outlineProgram.setUniformMatrix4fv("u_extrudeMatrix",_),this._outlineProgram.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord),this._outlineProgram.setUniform1f("u_depth",s.z),this._outlineProgram.setUniform1f("u_outline_width",G),this._outlineProgram.setUniform4fv("u_color",this._outlineColor),t.drawElements(4,r.outlineElementCount,5125,12*r.outlineElementStart),t.bindVAO()}}}}},t.prototype._initialize=function(t){if(this._initialized)return!0;var r={a_pos:0},i=new m(t,a,n,r);if(!i)return!1;var e={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]},o=new m(t,s,f,this._fillAttributeLocations);if(!o)return!1;var l=new m(t,_,u,this._outlineAttributeLocations),h={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]};return this._solidFillProgram=i,this._patternFillProgram=o,this._trianglesVertexAttributes=e,this._outlineProgram=l,this._outlineVertexAttributes=h,this._initialized=!0,!0},t.prototype._getTrianglesVAO=function(t,r){if(r.polygonTrianglesVertexArrayObject)return r.polygonTrianglesVertexArrayObject;var i=r.polygonTrianglesVertexBuffer,e=r.polygonTrianglesIndexBuffer;return i&&e?(r.polygonTrianglesVertexArrayObject=new h(t,this._fillAttributeLocations,this._trianglesVertexAttributes,{geometry:i},e),r.polygonTrianglesVertexArrayObject):null},t.prototype._getOutlineVAO=function(t,r){if(r.polygonOutlineVertexArrayObject)return r.polygonOutlineVertexArrayObject;var i=r.polygonOutlinesVertexBuffer,e=r.polygonOutlinesIndexBuffer;return i&&e?(r.polygonOutlineVertexArrayObject=new h(t,this._outlineAttributeLocations,this._outlineVertexAttributes,{geometry:i},e),r.polygonOutlineVertexArrayObject):null},t}();return p});