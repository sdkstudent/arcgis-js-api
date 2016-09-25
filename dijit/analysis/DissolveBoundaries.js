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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojox/form/CheckedMultiSelect","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/RadioButton","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./utils","dojo/i18n!../../nls/jsapi","dojo/text!./templates/DissolveBoundaries.html"],function(e,t,s,i,a,o,n,r,l,d,h,u,c,m,p,y,_,g,v,f,S,b,w,L,F,A,x,I,j,C,k,D,N,R,T,O,B,E){var U=t([y,_,g,v,f,R,N],{declaredClass:"esri.dijit.analysis.DissolveBoundaries",templateString:E,widgetsInTemplate:!0,inputLayer:null,dissolveFields:null,summaryFields:null,outputLayerName:null,i18n:null,toolName:"DissolveBoundaries",helpFileName:"DissolveBoundaries",resultParameter:"DissolvedLayer",constructor:function(e){this._pbConnects=[],this._statsRows=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,B.dissolveBoundaries)},postCreate:function(){this.inherited(arguments),m.add(this._form.domNode,"esriSimpleForm"),d.set(this._dissolveFieldsSelect.selectNode,"width","75%"),this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_handleAreasChange:function(){this._dissolveFieldsSelect.set("disabled",this._sameAttributeAreasCheck.get("checked")!==!0)},_handleBrowseItemsSelect:function(e){e&&e.selection&&O.addAnalysisReadyLayer({item:e.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:e.dialog||this._browsedlg,widget:this}).always(s.hitch(this,this._updateAnalysisLayerUI,!0))},_handleShowCreditsClick:function(e){if(e.preventDefault(),this._form.validate()){var t={};t.InputLayer=o.toJson(O.constructAnalysisInputLyrObj(this.inputLayer)),t.SummaryFields=o.toJson(this.get("summaryFields")),this.returnFeatureCollection||(t.OutputName=o.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this._sameAttributeAreasCheck.get("checked")===!0&&(t.DissolveFields=o.toJson(this.get("dissolveFields"))),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,t).then(s.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()}))}},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var e,t={},s={};t.InputLayer=o.toJson(O.constructAnalysisInputLyrObj(this.inputLayer)),t.SummaryFields=o.toJson(this.get("summaryFields")),this.returnFeatureCollection||(t.OutputName=o.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this._sameAttributeAreasCheck.get("checked")===!0&&(t.DissolveFields=o.toJson(this.get("dissolveFields"))),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(e={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),t.context=o.toJson(e)),s.jobParams=t,s.itemParams={description:this.i18n.itemDescription,tags:l.substitute(this.i18n.itemTags,{layername:this.inputLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(s.itemParams.folder=this.get("folderId")),this.execute(s)}},_handleAttrSelectChange:function(e){var t,i,a;"0"!==e&&(t=this.get("statisticSelect"),"0"!==t.get("value")&&(t.get("isnewRowAdded")||(i=t.get("removeTd"),d.set(i,"display","block"),a=t.get("referenceWidget"),s.hitch(a,a._createStatsRow()),t.set("isnewRowAdded",!0))))},_handleStatsValueUpdate:function(e,t,i){var a,o,n;this.get("attributeSelect")&&(a=this.get("attributeSelect"),"0"!==a.get("value")&&"0"!==i&&(this.get("isnewRowAdded")||(o=this.get("removeTd"),d.set(o,"display","block"),n=this.get("referenceWidget"),s.hitch(n,n._createStatsRow()),this.set("isnewRowAdded",!0))))},_save:function(){},_buildUI:function(){var e=!0;this._loadConnections(),O.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(!this.get("inputLayer")&&this.get("inputLayers")&&this.set("inputLayer",this.inputLayers[0]),O.populateAnalysisLayers(this,"inputLayer","inputLayers")),O.addReadyToUseLayerOption(this,[this._analysisSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this.inputLayer&&this._updateAnalysisLayerUI(e),d.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,function(e){this.folderStore=e,O.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),d.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),d.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none")},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1))},_updateAnalysisLayerUI:function(e){if(this.inputLayer){h.set(this._dissolveBoundariesDescription,"innerHTML",l.substitute(this.i18n.dissolveBoundariesDefine,{layername:this.inputLayer.name})),(!this.outputLayerName||e)&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name}));var t=this.inputLayer.fields,a=[],o=!1;this._dissolveFieldsSelect.removeOption(this._dissolveFieldsSelect.getOptions()),i.forEach(t,function(e,t){-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeString"],e.type)&&(null!==this.dissolveFields&&(o=-1!==this.dissolveFields.indexOf(e.name)),a.push({value:e.name,label:D.isDefined(e.alias)&&""!==e.alias?e.alias:e.name,selected:o}))},this),this._dissolveFieldsSelect.addOption(a),this._dissolveFieldsSelect.set("disabled",this._sameAttributeAreasCheck.get("checked")!==!0)}this.outputLayerName&&this._outputLayerInput.set("value",this.outputLayerName),this._createStatsRow(),i.forEach(this.summaryFields,function(e){var t=e.split(" ");this._currentAttrSelect.set("value",t[0]),s.hitch(this._currentAttrSelect,this._handleAttrSelectChange,t[0])(),this._currentStatsSelect.set("value",t[1]),s.hitch(this._currentStatsSelect,this._handleStatsValueUpdate,"value","",t[1])()},this)},_handleAnalysisLayerChange:function(e){if("browse"===e){var t=this._browsedlg.browseItems.get("query");t.custom=['tags:"polygon"'],this._browsedlg.browseItems.set("query",t),this._isAnalysisSelect=!1,this._browsedlg.show()}else"browselayers"===e?(this.showGeoAnalyticsParams&&(t=this._browseLyrsdlg.browseItems.get("query"),t.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",t)),this._browseLyrsdlg.browseItems.plugIn.geometryTypes=["esriGeometryPolygon"],this._isAnalysisSelect=!1,this._browseLyrsdlg.show()):(this.inputLayer=this.inputLayers[e],this._dissolveFields=null,this._removeStatsRows(),this._updateAnalysisLayerUI(!0))},_createStatsRow:function(){var t,i,o,n,r,l,d;return t=u.create("tr",null,this._afterStatsRow,"before"),o=u.create("td",{style:{width:"45%",maxWidth:"100px"}},t),i=u.create("td",{style:{width:"55%",maxWidth:"104px"}},t),n=new A({maxHeight:200,"class":"esriLeadingMargin1 mediumInput esriTrailingMargin025 attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},u.create("select",null,o)),this.set("attributes",{selectWidget:n,inputLayer:this.inputLayer}),r=new A({"class":"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},u.create("select",null,i)),this.set("statistics",{selectWidget:r}),n.set("statisticSelect",r),a.connect(n,"onChange",this._handleAttrSelectChange),d=u.create("td",{"class":"shortTextInput removeTd",style:{display:"none",maxWidth:"12px"}},t),l=u.create("a",{title:this.i18n.removeAttrStats,"class":"closeIcon statsRemove",innerHTML:"<img src='"+e.toUrl("./images/close.gif")+"' border='0''/>"},d),a.connect(l,"onclick",s.hitch(this,this._removeStatsRow,t)),this._statsRows.push(t),r.set("attributeSelect",n),r.set("removeTd",d),r.set("isnewRowAdded",!1),r.set("referenceWidget",this),r.watch("value",this._handleStatsValueUpdate),this._currentStatsSelect=r,this._currentAttrSelect=n,!0},_removeStatsRow:function(e){i.forEach(S.findWidgets(e),function(e){e.destroyRecursive()}),u.destroy(e)},_removeStatsRows:function(){i.forEach(this._statsRows,this._removeStatsRow,this),this._statsRows=[]},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(e){D.isDefined(e)&&"esriGeometryPolygon"===e.geometryType&&(this.inputLayer=e)},_setInputLayersAttr:function(e){this.inputLayers=i.filter(e,function(e){return"esriGeometryPolygon"===e.geometryType})},_setAttributesAttr:function(e){if(e.inputLayer){var t,s,a;t=e.inputLayer,s=e.selectWidget,a=t.fields,s.addOption({value:"0",label:this.i18n.attribute}),i.forEach(a,function(e){-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)&&e.name!==t.objectIdField&&s.addOption({value:e.name,label:D.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this)}},_setStatisticsAttr:function(e){var t=e.selectWidget;t.addOption({value:"0",label:this.i18n.statistic}),t.addOption({value:"SUM",label:this.i18n.sum}),t.addOption({value:"MIN",label:this.i18n.minimum}),t.addOption({value:"MAX",label:this.i18n.maximum}),t.addOption({value:"MEAN",label:this.i18n.average}),t.addOption({value:"STDDEV",label:this.i18n.standardDev})},_setDissolveFieldsAttr:function(e){this.dissolveFields=e},_getDissolveFieldsAttr:function(){var e="",t=[];return this._dissolveFieldsSelect.getOptions().forEach(function(s){s.selected===!0&&"0"!==s.value&&(e+=s.value+";",t.push(s.value))}),t},_setSummaryFieldsAttr:function(e){this.summaryFields=e},_getSummaryFieldsAttr:function(){var e,t,s="",i=[];return c(".statsSelect",this.domNode).forEach(function(a){e=S.byNode(a),t=e.get("attributeSelect"),"0"!==t.get("value")&&"0"!==e.get("value")&&(s+=t.get("value")+" "+e.get("value")+";",i.push(t.get("value")+" "+e.get("value")))}),i},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},validateServiceName:function(e){return O.validateServiceName(e,{textInput:this._outputLayerInput})},_connect:function(e,t,s){this._pbConnects.push(a.connect(e,t,s))}});return n("extend-esri")&&s.setObject("dijit.analysis.DissolveBoundaries",U,k),U});