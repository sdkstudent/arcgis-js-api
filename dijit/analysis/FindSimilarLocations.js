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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/fx/easing","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ToggleButton","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/form/NumberSpinner","dijit/Dialog","dojox/form/CheckedMultiSelect","../../kernel","../../lang","../../layers/FeatureLayer","./AnalysisBase","./_AnalysisOptions","./utils","./CreditEstimator","./ExpressionForm","../../geometry/Extent","../../geometry/ScreenPoint","../../symbols/CartographicLineSymbol","../../symbols/SimpleMarkerSymbol","../../symbols/SimpleLineSymbol","../../symbols/SimpleFillSymbol","../../tasks/query","../../renderers/jsonUtils","dojo/i18n!../../nls/jsapi","dojo/text!./templates/FindSimilarLocations.html"],function(e,t,s,i,n,a,r,o,l,h,u,c,d,y,p,m,_,L,f,g,S,b,F,x,w,I,A,C,v,j,O,M,R,T,k,N,E,P,D,B,H,G,Q,U,q,J,Y,V,z,W,X,K,Z){var $=t([L,f,g,S,b,B,D],{declaredClass:"esri.dijit.analysis.FindSimilarLocations",templateString:Z,widgetsInTemplate:!0,i18n:null,returnProcessInfo:!0,toolName:"FindSimilarLocations",helpFileName:"FindSimilarLocations",resultParameter:"similarResultLayer",primaryActionButttonClass:"esriAnalysisSubmitButton",inputLayer:null,searchLayer:null,inputQuery:null,searchLayers:[],analysisFields:[],numberOfResults:0,enableInputSelection:!0,selectionLayer:null,_isAttrFlag:!1,constructor:function(e){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),this._expression=null},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,a.disconnect),delete this._pbConnects,delete this._mapClickHandle},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,K.findSimilarLocations),s.mixin(this.i18n,K.expressionGrid)},postCreate:function(){this.inherited(arguments),_.add(this._form.domNode,"esriSimpleForm"),c.set(this._attrSelect.selectNode,"width","80%"),this._bigdataUX=[this._matchMethodRowLabel,this._matchMethodRow,this._appendFieldLabelRow,this._appendFieldRow],this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e}),this.selectionLayer&&(this.selectionLayer.clearSelection(),this.map.removeLayer(this.selectionLayer),this.selectionLayer=null),this._mapClickHandle&&delete this._mapClickHandle,this._attrSelect.reset()},clear:function(){this.selectionLayer&&(this.selectionLayer.clearSelection(),this.map.removeLayer(this.selectionLayer),this.selectionLayer=null),this._attrSelect.reset(),this._mapClickHandle&&delete this._mapClickHandle},_buildJobParams:function(){var e,t,s={};return this.showGeoAnalyticsParams?(t=H.constructAnalysisInputLyrObj(this.inputLayer,this.showGeoAnalyticsParams),this.get("inputQuery")&&(t.filter=this.inputQuery),s.inputLayer=r.toJson(t),s.searchLayer=r.toJson(H.constructAnalysisInputLyrObj(this.get("searchLayer"),this.showGeoAnalyticsParams)),s.mostOrLeastSimilar=this._mostSimSelect.get("value"),s.numberOfResults=this.get("numberOfResults"),s.analysisFields=this.get("analysisFields").toString(),s.appendFields=this.get("appendFields").toString(),s.matchMethod=this._fieldValueCheck.get("checked")?"AttributeValues":"AttributeProfiles"):(s.inputLayer=r.toJson(H.constructAnalysisInputLyrObj(this.inputLayer)),this.get("inputQuery")&&(s.inputQuery=this.inputQuery),s.searchLayer=r.toJson(H.constructAnalysisInputLyrObj(this.get("searchLayer"))),s.analysisFields=this.get("analysisFields"),s.numberOfResults=this.get("numberOfResults"),s.returnProcessInfo=this.returnProcessInfo),this.returnFeatureCollection||(s.OutputName=r.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(s.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(e={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),s.context=r.toJson(e)),console.log(s),s},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var e,t={};t.jobParams=this._buildJobParams(),t.itemParams={description:e,tags:u.substitute(this.i18n.itemTags,{analysisLayerName:this.inputLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),this.showGeoAnalyticsParams&&(this.resultParameter="output"),console.log(t),this.execute(t)}},_handleShowCreditsClick:function(e){e.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(s.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()}))},_save:function(){},_buildUI:function(){var e,t=!0;this._loadConnections(),this.signInPromise.then(s.hitch(this,H.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(!this.get("inputLayer")&&this.get("inputLayers")&&this.set("inputLayer",this.inputLayers[0]),H.populateAnalysisLayers(this,"inputLayer","inputLayers")),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),c.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,function(e){this.folderStore=e,H.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),c.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),c.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this.searchLayers&&i.forEach(this.searchLayers,function(e,t){this._candidateSelect.addOption({value:t+1,label:e.name})},this),H.addReadyToUseLayerOption(this,[this._analysisSelect,this._candidateSelect]),H.updateDisplay(this._bigdataUX,this.get("showGeoAnalyticsParams"),"table-row"),this.showGeoAnalyticsParams?(c.set(this._addFieldsSelect.selectNode,"width","80%"),d.set(this._outputLblNum,"innerHTML",this.i18n.eightLabel),d.set(this._topLabel,"innerHTML",this.i18n.theLabel),d.set(this._outputHelp,"esriHelpTopic","outputName"),c.set(this._ranksInput.domNode,"width","22%"),e=this._ranksInput.get("constraints"),e.max=1e4,this._ranksInput.set("constraints",e)):(d.set(this._outputLblNum,"innerHTML",this.i18n.sixLabel),c.set(this._mostSimSelect.domNode,"display","none"),c.set(this._mostSimLabel,"display","none"),d.set(this._topLabel,"innerHTML",this.i18n.justShowTop)),this._selectBtn.set("disabled",!this.enableInputSelection),this._queryBtn.set("disabled",!this.enableInputSelection),this.inputLayer&&this._updateAnalysisLayerUI(t),this._expressionForm.on("add-expression",s.hitch(this,this._handleExpressionFormAdd)),this._expressionForm.on("cancel-expression",s.hitch(this,this._handleExpressionFormCancel))},_updateAnalysisLayerUI:function(e){if(this.inputLayer){d.set(this._toolDescription,"innerHTML",u.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name}));var t,s=this._candidateSelect.getOptions(),n=!1,a=!1;this._isAnalysisSelect&&(n=i.some(s,function(e,t){return e.label===this.inputLayer.title},this),n||(t=s.splice(s.length-2,2),a=i.some(this.searchLayers,function(e){return e&&e.analysisReady&&this.inputLayer.analysisReady&&e.itemId===this.inputLayer.itemId},this),a||this.searchLayers.push(this.inputLayer),t.unshift({value:this.searchLayers.length,label:this.inputLayer.title}),this._candidateSelect.addOption(t))),"featureClass"!==this.inputLayer.type&&this.set("selectionLayer"),this._selectBtn.set("disabled","featureClass"===this.inputLayer.type),this._expressionForm.set("showUnique","featureClass"!==this.inputLayer.type),this.set("analysisFields"),this.set("appendFields"),e&&(this.outputLayerName=u.substitute(this.i18n.outputLayerName,{analysisLayerName:this.inputLayer.name})),this._outputLayerInput.set("value",this.outputLayerName),this._expressionForm.set("showFirstRow",!1),this._expressionForm.set("firstOperands",[this.inputLayer]),this._expressionForm.set("inputOperands",[this.inputLayer]),this._expressionForm.set("selectedFirstOperand",this.inputLayer),this._expressionForm.init()}},_handleAnalysisLayerChange:function(e){"browse"===e?(this._isAnalysisSelect=!0,this._browsedlg.show()):"browselayers"===e?(this.showGeoAnalyticsParams&&(p=this._browseLyrsdlg.browseItems.get("query"),p.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",p)),this._isAnalysisSelect=!0,this._browseLyrsdlg.show()):(this.inputLayer=this.inputLayers[e],this.selectionLayer&&(this.clear(),this.set("inputQuery",null),this._expression=null,d.set(this._filterLabel,"innerHTML","")),this._updateAnalysisLayerUI(!0))},_handleBrowseItemsSelect:function(e){e&&e.selection&&H.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.inputLayers:this.searchLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._candidateSelect,posIncrement:this._isAnalysisSelect?0:1,browseDialog:e.dialog||this._browsedlg,widget:this}).always(s.hitch(this,function(){this._isAnalysisSelect&&(this._handleAnalysisLayerChange(this._analysisSelect.get("value")),this._isAnalysisSelect=!1)}))},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setSearchLayersAttr:function(e){this.searchLayers=e},_getSearchLayersAttr:function(){return this.searchLayers},_setSearchLayerAttr:function(e){this.searchLayer=e},_getSearchLayerAttr:function(){var e=this._candidateSelect.get("value");return this._candidateSelect&&"search"!==e?this.searchLayer=this.searchLayers[this._candidateSelect.get("value")-1]:("search"===e||"browse"===e)&&(this.searchLayer=null),this.searchLayer},_setInputLayerAttr:function(e){this.inputLayer=e},_getInputLayerAttr:function(){return this.inputLayer},_setInputLayersAttr:function(e){this.inputLayers=e},_setEnableInputSelectionAttr:function(e){this.enableInputSelection=e},_getEnableInputSelectionAttr:function(){return this.enableInputSelection},_setAnalysisFieldsAttr:function(){var e,t;this.get("inputLayer")&&this.get("searchLayer")&&0!==this.inputLayer.fields.length&&0!==this.searchLayer.fields.length&&(t=this.inputLayer.fields,e=i.map(this.searchLayer.fields,function(e){return e.name}),t=i.filter(t,function(t){return-1===i.indexOf(e,t.name)||-1===i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],t.type)||t.name===this.inputLayer.objectIdField&&t.name===this.searchLayer.objectIdField?void 0:!0},this),t=i.map(t,function(e){return{value:e.name,label:E.isDefined(e.alias)&&""!==e.alias?e.alias:e.name}}),this._attrSelect&&(this._attrSelect.removeOption(this._attrSelect.get("options")),this._attrSelect.addOption(t)),this.analysisFields=t)},_getAnalysisFieldsAttr:function(){return this._attrSelect&&(this.analysisFields=this._attrSelect.get("value")),this.analysisFields},_setAppendFieldsAttr:function(){var e,t;this.get("inputLayer")&&this.get("searchLayer")&&0!==this.inputLayer.fields.length&&0!==this.searchLayer.fields.length&&(t=this.inputLayer.fields,e=i.map(this.searchLayer.fields,function(e){return e.name}),t=i.filter(t,function(t){return-1===i.indexOf(e,t.name)||-1===i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],t.type)||t.name===this.inputLayer.objectIdField&&t.name===this.searchLayer.objectIdField?void 0:!0},this),t=i.map(t,function(e){return{value:e.name,label:E.isDefined(e.alias)&&""!==e.alias?e.alias:e.name}}),this._addFieldsSelect&&(this._addFieldsSelect.removeOption(this._attrSelect.get("options")),this._addFieldsSelect.addOption(t)),this.appendFields=t)},_getAppendFieldsAttr:function(){return this._addFieldsSelect&&(this.appendFields=this._addFieldsSelect.get("value")),this.appendFields},_setInputQueryAttr:function(e){this.inputQuery=e},_getInputQueryAttr:function(){return this.inputQuery},_setNumberOfResultsAttr:function(e){this.numberOfResults=e},_getNumberOfResultsAttr:function(){return this.numberOfResults},_getInputQueryObjAttr:function(){var e=null;return this.get("InputQuery")&&(e={},e.operator="",e.layer=0,e.where=this.inputQuery),this.inputQueryObj=e,this.inputQueryObj},_setSelectionLayerAttr:function(){this.get("inputLayer")&&(this.selectionLayer=new P(this.inputLayer.url&&!this.inputLayer._collection?this.inputLayer.url:this.inputLayer.toJson(),{outFields:["*"],mode:this.inputLayer.url&&!this.inputLayer._collection?P.MODE_SELECTION:P.MODE_SNAPSHOT}),this.selectionLayer.setRenderer(null),this.selectionLayer.on("selection-complete",s.hitch(this,this._handleInputLayerSelectionComplete)),this.selectionLayer.loaded?this._onSelectionLayerLoad(this.inputLayer,this.selectionLayer):this.selectionLayer.on("load",s.hitch(this,this._onSelectionLayerLoad,this.inputLayer,this.selectionLayer)))},_onSelectionLayerLoad:function(e,t){var i;e.renderer&&(t.setRenderer(X.fromJson(e.renderer.toJson())),E.isDefined(e.renderer.isMaxInclusive)&&(t.renderer.isMaxInclusive=e.renderer.isMaxInclusive)),t.setScaleRange(e.minScale,e.maxScale),this._connect(e,"onScaleRangeChange",s.hitch(this,function(e,t){e.setScaleRange(t.minScale,t.maxScale)},t,e)),this.map.addLayer(t),"esriGeometryPoint"===t.geometryType||"esriGeometryMultPoint"===t.geometryType?(i=new Y,i.setStyle(Y.STYLE_TARGET),i._setDim(16,16,0),i.setOutline(new J(V.STYLE_SOLID,new n([0,255,255]),2,J.CAP_ROUND,J.JOIN_ROUND)),i.setColor(new n([0,0,0,0])),t.setSelectionSymbol(i)):"esriGeometryPolyline"===t.geometryType?t.setSelectionSymbol(new V(V.STYLE_SOLID,new n([0,255,255]),2)):"esriGeometryPolygon"===t.geometryType&&t.setSelectionSymbol(new z(z.STYLE_NULL,new V(V.STYLE_SOLID,new n([0,255,255]),2),new n([0,0,0,0])))},validateServiceName:function(e){return H.validateServiceName(e,{textInput:this._outputLayerInput})},_setPrimaryActionButttonClassAttr:function(e){this.primaryActionButttonClass=e},_getPrimaryActionButttonClassAttr:function(){return this.primaryActionButttonClass},_connect:function(e,t,s){this._pbConnects.push(a.connect(e,t,s))},validate:function(){this.get("searchLayer")&&this.get("inputLayer")&&this.get("inputLayer").id===this.get("searchLayer").id&&!this.get("inputQuery")?(this._showMessages(this.i18n.reqSelectionMsg),this.set("disableRunAnalysis",!0)):this.get("searchLayer")&&0===this._attrSelect.getOptions().length?(this._showMessages(this.i18n.noFieldMatchMsg),this.set("disableRunAnalysis",!0)):(this._handleCloseMsg(),this.set("disableRunAnalysis",!1))},_handleCandidateChange:function(e){"browse"===e?(this._isAnalysisSelect=!1,this._browsedlg.show()):"browselayers"===e?(this.showGeoAnalyticsParams&&(p=this._browseLyrsdlg.browseItems.get("query"),p.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",p)),this._isAnalysisSelect=!1,this._browseLyrsdlg.show()):"search"===e?(this._attrSelect&&this._attrSelect.removeOption(this._attrSelect.get("options")),this.analysisFields=[]):(this.set("analysisFields"),this.set("appendFields"),this.validate())},_handleQueryButtonClick:function(){this._expDialog.set("title",this.i18n.query),this._selectBtn.set("checked",!1),this._isAttrFlag=!0,this._expressionForm.set("showUnique",this.inputLayer&&"featureClass"!==this.inputLayer.type),this._expression?(this._expressionForm.set("action","edit"),this._expressionForm.set("expression",this._expression.expression)):this._expressionForm.set("action","add"),this._expDialog.show()},_handleExpressionFormAdd:function(e){if(this.selectionLayer&&this.selectionLayer.clearSelection(),"add"===e.action||"edit"===e.action){d.set(this._filterLabel,"innerHTML",u.trim(e.expression._attributeText)),this._expression=e;var t;t=new W,t.returnGeometry=!0,t.where=e.expression.where,this.selectionLayer&&this.selectionLayer.selectFeatures(t,P.SELECTION_ADD)}this._expDialog.hide(),this.set("inputQuery",e.expression.where),this.validate()},_handleExpressionFormCancel:function(){this._expDialog.hide()},_handleTopRankRadioChange:function(e){this._ranksInput.set("disabled",!e),e&&this.set("numberOfResults",this._ranksInput.get("value"))},_handleAllRankRadioChange:function(e){e&&this.set("numberOfResults",0)},_handleTopRankInputChange:function(e){this.set("numberOfResults",e)},_handleSelectionButtonClick:function(e){e&&!this._mapClickHandle?(this._mapClickHandle=this.map.on("click",s.hitch(this,this._handleMapClick)),this.emit("selecttool-activate",{}),this._isAttrFlag=!1):(this._mapClickHandle.remove(),this._mapClickHandle=null,this.emit("selecttool-deactivate",{}))},_handleMapClick:function(e){var t,n,a,r,o,l,h,u;!this._isAttrFlag&&this._expression&&this.selectionLayer.clearSelection(),n=6,h=this.inputLayer.renderer,h&&"esri.renderer.SimpleRenderer"===h.declaredClass?(u=h.symbol,u.xoffset&&(n=Math.max(n,Math.abs(u.xoffset))),u.yoffset&&(n=Math.max(n,Math.abs(u.yoffset)))):!h||"esri.renderer.UniqueValueRenderer"!==h.declaredClass&&"esri.renderer.ClassBreaksRenderer"!==h.declaredClass||i.forEach(h.infos,function(e){u=e.symbol,u.xoffset&&(n=Math.max(n,Math.abs(u.xoffset))),u.yoffset&&(n=Math.max(n,Math.abs(u.yoffset)))}),t=e.screenPoint,a=this.map.toMap(new q(t.x-n,t.y+n)),r=this.map.toMap(new q(t.x+n,t.y-n)),o=new U(a.x,a.y,r.x,r.y,this.map.spatialReference),l=new W,l.returnGeometry=!0,l.geometry=o,l.where=this.inputLayer.getDefinitionExpression(),this.inputLayer.queryFeatures(l).then(s.hitch(this,function(e){if(e){var t,s,n,a;a=[],t=[],this.selectionLayer&&this.selectionLayer.getSelectedFeatures().length>0&&(n=i.map(this.selectionLayer.getSelectedFeatures(),function(e){return e.attributes[this.selectionLayer.objectIdField]},this)),i.forEach(e.features,function(e){n?n&&-1===i.indexOf(n,e.attributes[this.selectionLayer.objectIdField])?t.push(e.attributes[this.selectionLayer.objectIdField]):a.push(e.attributes[this.selectionLayer.objectIdField]):t.push(e.attributes[this.selectionLayer.objectIdField])},this),t.length>0&&(s=new W,s.returnGeometry=!0,s.objectIds=t,this.selectionLayer.selectFeatures(s,P.SELECTION_ADD)),a.length>0&&(s=new W,s.returnGeometry=!0,s.objectIds=a,this.selectionLayer.selectFeatures(s,P.SELECTION_SUBTRACT))}}))},_showMessages:function(e){d.set(this._bodyNode,"innerHTML",e),o.fadeIn({node:this._errorMessagePane,easing:m.quadIn,onEnd:s.hitch(this,function(){c.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),o.fadeOut({node:this._errorMessagePane,easing:m.quadOut,onEnd:s.hitch(this,function(){c.set(this._errorMessagePane,{display:"none"})})}).play()},_handleInputLayerSelectionComplete:function(e){var t,s,n=this.selectionLayer.getSelectedFeatures();!this._isAttrFlag&&n.length>0&&(s="",t=i.map(n,function(e){return s+=this.selectionLayer.objectIdField+" = "+e.attributes[this.selectionLayer.objectIdField]+" OR ",e.attributes[this.selectionLayer.objectIdField]},this),s=s.substring(0,s.lastIndexOf(" OR ")),d.set(this._filterLabel,"innerHTML",u.substitute(this.i18n.selectedFeaturesLabel,{total:n.length})),this.set("inputQuery",s),this._expression=null,this.validate()),this._isAttrFlag||0!==n.length||(d.set(this._filterLabel,"innerHTML",""),this.set("inputQuery",null),this._expression=null,this.validate())}});return l("extend-esri")&&s.setObject("dijit.analysis.FindSimilarLocations",$,N),$});