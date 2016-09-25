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

define(["require","exports","dojo/_base/kernel","dojo/_base/url","dojo/Deferred","../../kernel","../../config","../../request","../Logger","../urlUtils","./WorkerFallbackImpl"],function(e,t,o,r,n,s,i,a,c,d,l){function u(){if(!k){var e=void 0;try{e=new Worker(v)}catch(t){p.warn("Failed to create Worker. Fallback to execute module in main thread",event),e=new l}return f(e)}if(!w){var o=new r(v);i.defaults?i.defaults.io.corsEnabledServers.push(o.host):i.request.corsEnabledServers.push(o.host),w=a(v,{responseType:"text"})}return w.then(function(e){var t;try{t=new Worker(URL.createObjectURL(new Blob([e.data],{type:"text/javascript"})))}catch(o){p.warn("Failed to create Worker. Fallback to execute module in main thread",o),t=new l}return f(t)})}function f(e){function t(n){if(n&&n.data&&n.data.type){var s=n.data.type;"<worker-loaded>"===s?g(e,i):"<worker-configured>"===s&&(e.removeEventListener("message",t),e.removeEventListener("error",o),r.resolve(e))}}function o(r){r.preventDefault(),e.removeEventListener("message",t),e.removeEventListener("error",o),p.warn("Failed to create Worker. Fallback to execute module in main thread",r),e=new l,e.addEventListener("message",t),e.addEventListener("error",o)}var r=new n;return e.addEventListener("message",t),e.addEventListener("error",o),r.promise}function g(e,t){var r=JSON.parse(JSON.stringify(t)),n={async:!0,baseUrl:m,locale:o.locale,has:{"esri-cors":1,"dojo-test-sniff":0,"config-deferredInstrumentation":0},paths:{esri:"esri",dojo:"dojo",dojox:"dojox",dstore:"dstore",moment:"moment"}};e.postMessage({type:"<configure>",configure:{esriConfig:r,dojoConfig:n,loaderUrl:h}})}var p=c.getLogger("esri.core.workers"),v=d.makeAbsolute(e.toUrl("./worker.js")),h=d.makeAbsolute(e.toUrl("./worker-init.js")),m=d.makeAbsolute("../../../../../../",h)+"/",k=!d.hasSameOrigin(v,location.href),w=null,b=function(){function e(e,t,o){var r=this;this.connections=e,this.index=t,this.workerInitCallback=o,this.msgCount=0,this.outgoingJobs={},this.incomingJobs={},this.incomingStaticJobs={},u().then(function(e){r.worker=e,r.worker.addEventListener("message",r.message.bind(r)),r.worker.addEventListener("error",function(e){e.preventDefault(),p.error(e)}),r.workerInitCallback(r.index)})}return e.prototype.terminate=function(){this.worker.terminate()},e.prototype.openConnection=function(e,t){return this.invoke("<open-connection>",{path:e},void 0,t)},e.prototype.closeConnection=function(e){this.invoke("<close-connection>",void 0,void 0,e)},e.prototype.invoke=function(e,t,o,r){var s=this,i=++this.msgCount,a=new n(function(e){s.worker.postMessage({type:"<cancel>",id:i,connection:r,data:{reason:e}}),s.outgoingJobs[i]&&delete s.outgoingJobs[i]});return this.outgoingJobs[i]=a,this.worker.postMessage({type:e,id:i,connection:r,data:t},o),a.promise},e.prototype.message=function(e){var t=this;if(e&&e.data){var o=e.data.type;if(o){var r=e.data,n=e.data.id;if("<response>"===o&&n){var i=this.outgoingJobs[n];if(!i)return;delete this.outgoingJobs[n],r.error?i.reject(r.error):i.resolve(r.data)}else if("<cancel>"===o&&n){var a=this.incomingJobs[n];if(a&&a.cancel(r.data.reason),r.staticMsg){var c=this.incomingStaticJobs[n];c&&c.cancel(r.data.reason)}}else if("<static-message>"===o){var d=r.staticMsg,l=s.workerMessages[d];if(!l||"function"!=typeof l)return void this.worker.postMessage({type:"<static-message>",staticMsg:d,id:n,error:l+" message type is not available on the kernel!"});var u=l.call(this,r.data);this.incomingStaticJobs[n]=u,u.then(function(e){t.worker.postMessage({type:"<static-message>",staticMsg:d,id:n,data:e.data},e.buffers)}).otherwise(function(e){e||(e="Error encountered at method"+d),e.dojoType&&"cancel"===e.dojoType||t.worker.postMessage({type:"<static-message>",staticMsg:d,id:n,error:e})}).always(function(){delete t.incomingStaticJobs[n]})}else{var f=r.connection,g=this.connections[f];if(!g)return;var p=g.client;if(!p)return;var v=p[o];if("function"==typeof v){var h=v.call(p,r.data);this.incomingJobs[n]=h,h.then(function(e){t.worker.postMessage({type:"<response>",id:n,connection:f,error:e.error,data:e.data},e.buffers)}).otherwise(function(e){e||(e="Error encountered at method"+o),e.dojoType&&"cancel"===e.dojoType||t.worker.postMessage({type:"<response>",id:n,connection:f,error:e})}).always(function(){delete t.incomingJobs[n]})}}}}},e}();return b});