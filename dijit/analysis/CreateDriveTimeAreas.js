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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/number","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./utils","./TrafficTime","dojo/i18n!../../nls/jsapi","dojo/text!./templates/CreateDriveTimeAreas.html"],function(e,t,i,s,a,n,r,o,l,h,u,c,d,p,m,y,f,_,g,v,b,L,k,D,S,C,U,I,T,O,w,N,x,j,M,A,F,V){var P=t([y,f,_,g,v,N,x],{declaredClass:"esri.dijit.analysis.CreateDriveTimeAreas",templateString:V,widgetsInTemplate:!0,inputLayer:null,inputType:null,outputLayerName:null,breakValues:null,overlapPolicy:"Overlap",distanceDefaultUnits:"Miles",travelMode:"Driving",i18n:null,toolName:"CreateDriveTimeAreas",helpFileName:"CreateDriveTimeAreas",resultParameter:"DriveTimeAreasLayer",constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,F.bufferTool),i.mixin(this.i18n,F.driveTimes)},postCreate:function(){this.inherited(arguments),p.add(this._form.domNode,"esriSimpleForm"),this._breakValuesInput.set("validator",i.hitch(this,this.validateDistance)),this.outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this.breakValues=[],this.breakValues.push(this._breakValuesInput.get("value")),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_toUpperFirstLetter:function(e){return e.slice(0,1).toUpperCase()+e.slice(1)},_handleShowCreditsClick:function(e){e.preventDefault();var t={};this._form.validate()&&(t.InputLayer=n.toJson(M.constructAnalysisInputLyrObj(this.inputLayer)),t.BreakValues=n.toJson(this.get("breakValues")),t.Breakunits=this.get("breakUnits"),t.OverlapPolicy=this.get("overlapPolicy"),this._trafficTimeWidget.get("checked")&&(t.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(t.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),this.returnFeatureCollection||(t.OutputName=n.toJson({serviceProperties:{name:this.outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.context=n.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,t).then(i.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},_handleSaveBtnClick:function(e){var t,i,s={},a={};this._form.validate()&&(this._saveBtn.set("disabled",!0),s.InputLayer=n.toJson(M.constructAnalysisInputLyrObj(this.inputLayer)),s.BreakValues=this.get("breakValues"),s.Breakunits=this.get("breakUnits"),s.OverlapPolicy=this.get("overlapPolicy"),i=this._drivingModeSelect.getOptions(this._drivingModeSelect.get("value")),s.travelMode=i&&n.toJson(i.travelMode),this._trafficTimeWidget.get("checked")&&(s.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(s.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),this.returnFeatureCollection||(s.OutputName=n.toJson({serviceProperties:{name:this.outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(s.context=n.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),s.context=n.toJson(t)),a.jobParams=s,a.itemParams={description:l.substitute(this.i18n.itemDescription,{layername:this.inputLayer.name,distance_field:s.Distances||s.Field,units:s.Units}),tags:l.substitute(this.i18n.itemTags,{layername:this.inputLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(a.itemParams.folder=this.get("folderId")),this.execute(a))},_handleResultLyrInputChange:function(e){this.set("outputLayerName",e)},_handleDistValueChange:function(){this.set("outputLayerName")},_handleDistUnitsChange:function(e){this.set("breakUnits",e),this.set("outputLayerName"),this.validateDistance()},_handleDistanceTypeChange:function(e){var t,i,s,a;a=this._drivingModeSelect.getOptions(this._drivingModeSelect.get("value")),w.isDefined(a)?(t=a.modei18nKey,i=a.units.toLowerCase(),this.set("travelMode",a.travelMode.name)):(s=e.split("-"),t=s[0].toLowerCase(),i=s[1]?s[1].toLowerCase():"distance",this.set("travelMode",s[0])),i&&(h.set(this._useTrafficLabelRow,"display","time"===i&&"driving"===t?"":"none"),this._trafficTimeWidget.set("disabled","time"!==i&&"driving"!==t),this._trafficTimeWidget.set("reset","time"!==i&&"driving"!==t)),"time"===i?(this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes,selected:"selected"},{value:"Hours",label:this.i18n.hours}]),this.set("breakUnits",this._distanceUnitsSelect.get("value"))):(this.get("distanceDefaultUnits")&&this.set("breakUnits",this.get("distanceDefaultUnits")),this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this._distanceUnitsSelect.set("value",this.breakUnits)),this.set("outputLayerName"),this.validateDistance()},_handleOverlapPolicyChange:function(e,t){this.set("overlapPolicy",t),p.remove(this._Overlap,"selected"),p.remove(this._Dissolve,"selected"),p.remove(this._Split,"selected"),p.add(e,"selected")},_save:function(){},_buildUI:function(){var e=!0;h.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),M.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(!this.get("inputLayer")&&this.get("inputLayers")&&this.set("inputLayer",this.inputLayers[0]),M.populateAnalysisLayers(this,"inputLayer","inputLayers")),M.addReadyToUseLayerOption(this,[this._analysisSelect]),this.outputLayerName&&(this.outputLayerInput.set("value",this.outputLayerName),e=!1),h.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(e){this.folderStore=e,M.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),this.distanceDefaultUnits&&this._distanceUnitsSelect.set("value",this.distanceDefaultUnits),h.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),M.populateTravelModes({selectWidget:this._drivingModeSelect,widget:this,separator:"-",selectDefaultMode:!0}),this._handleDistanceTypeChange("Driving-Time"),this.inputLayer&&this._updateAnalysisLayerUI(e),this._loadConnections()},_updateAnalysisLayerUI:function(e){this.inputLayer&&(u.set(this._driveTimeDescription,"innerHTML",l.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name})),e&&this.set("outputLayerName"))},_handleAnalysisLayerChange:function(e){if("browse"===e){var t=this._browsedlg.browseItems.get("query");t.custom=['tags:"point"'],this._browsedlg.browseItems.set("query",t),this._browsedlg.show()}else"browselayers"===e?(this.showGeoAnalyticsParams&&(t=this._browseLyrsdlg.browseItems.get("query"),t.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",t)),this._browseLyrsdlg.browseItems.plugIn.geometryTypes=["esriGeometryPoint"],this._browseLyrsdlg.show()):(this.inputLayer=this.inputLayers[e],this.outputLayerName=null,this._updateAnalysisLayerUI(!0))},_handleBrowseItemsSelect:function(e){e&&e.selection&&M.addAnalysisReadyLayer({item:e.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:e.dialog||this._browsedlg,widget:this}).always(i.hitch(this,this._updateAnalysisLayerUI,!0))},validateTime:function(){},validateDistance:function(){var e,t,a,n,r=this,o=[];return this.set("breakValues"),n=M.getMaxInputByMode({type:this._drivingModeSelect.get("value").replace("-",""),units:this._distanceUnitsSelect.get("value")}),e=i.trim(this._breakValuesInput.get("value")).split(" "),0===e.length?!1:(s.forEach(e,function(e){return e=m.parse(e),isNaN(e)?(o.push(0),!1):e>n?(o.push(0),!1):(t=m.format(e,{locale:"root"}),w.isDefined(t)?w.isDefined(t)||(t=m.format(e,{locale:"en-us"})):t=m.format(e,{locale:"en"}),w.isDefined(t)&&(a=i.trim(t).match(/\D/g)),void(a&&s.forEach(a,function(e){"."===e||","===e?o.push(1):"-"===e&&"polygon"===r.inputType?o.push(1):o.push(0)})))}),-1!==s.indexOf(o,0)?(this._breakValuesInput.focus(),!1):!0)},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!1)),a.connect(this._drivingModeSelect,"onChange",i.hitch(this,"_handleDistanceTypeChange")),a.connect(this._Overlap,"onclick",i.hitch(this,"_handleOverlapPolicyChange",this._Overlap,"Overlap")),a.connect(this._Dissolve,"onclick",i.hitch(this,"_handleOverlapPolicyChange",this._Dissolve,"Dissolve")),a.connect(this._Split,"onclick",i.hitch(this,"_handleOverlapPolicyChange",this._Split,"Split"))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(e){w.isDefined(e)&&"esriGeometryPoint"===e.geometryType&&(this.inputLayer=e)},_getInputLayerAttr:function(){return this.inputLayer},_setInputLayersAttr:function(e){this.inputLayers=e},_setOverlapPolicyAttr:function(e){this.overlapPolicy=e},_getOverlapPolicyAttr:function(){return this.overlapPolicy},_setBreakValuesAttr:function(e){e&&(this.breakValues=e);var t=i.trim(this._breakValuesInput.get("value")).split(" "),a=[];s.forEach(t,function(e){a.push(m.parse(e))}),this.breakValues=a},_getBreakValuesAttr:function(){return this.breakValues},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_getTravelModeAttr:function(){return this.travelMode},_setTravelModeAttr:function(e){this._set("travelMode",e)},validateServiceName:function(e){return M.validateServiceName(e,{textInput:this.outputLayerInput})},_setBreakUnitsAttr:function(e){this.breakUnits=e},_getBreakUnitsAttr:function(){return this.breakUnits},_setDistanceDefaultUnitsAttr:function(e){this.distanceDefaultUnits=e},_getDistanceDefaultUnitsAttr:function(){return this.distanceDefaultUnits},_setOutputLayerNameAttr:function(e){var t,i,a,n,r,o,h,u,c;if(a=["Seconds","Minutes","Hours","Miles","Meters","Kilometers","Feet","Yards"],r=[this.i18n.seconds,this.i18n.minutes,this.i18n.hours,this.i18n.miles,this.i18n.meters,this.i18n.kilometers,this.i18n.feet,this.i18n.yards],o=this._distanceUnitsSelect.getOptions(this._distanceUnitsSelect.get("value")).label,u=this._drivingModeSelect.getOptions(this._drivingModeSelect.get("value")),c=this.i18n.other,e)this.outputLayerName=e,this.outputLayerInput.set("value",e);else if(this._breakValuesInput){if(!this.outputLayerName&&this.inputLayer)this.outputLayerName=l.substitute(this.i18n.outputModeLayerName,{mode:c,layername:this.inputLayer.name,breakValues:this._breakValuesInput.get("value"),breakUnits:o});else{this.outputLayerName=this.outputLayerInput.get("value"),h=[this.i18n.driving,this.i18n.trucking,this.i18n.walking];var d=this.outputLayerName.substr(0,this.outputLayerName.indexOf(" "));d!==c&&(this.outputLayerName=this.outputLayerName.replace(d,c)),-1!==this.outputLayerName.lastIndexOf("(")&&(t=this.outputLayerName.substring(0,this.outputLayerName.lastIndexOf("(")),n=l.trim(this.outputLayerName.substring(this.outputLayerName.lastIndexOf(" "),this.outputLayerName.lastIndexOf(")"))),-1!==s.indexOf(r,n)&&(i=t+"(${breakValues} ${breakUnits})",this.outputLayerName=l.substitute(i,{breakValues:this._breakValuesInput.get("value"),breakUnits:o})))}this.outputLayerInput.set("value",this.outputLayerName)}},_connect:function(e,t,i){this._pbConnects.push(a.connect(e,t,i))}});return r("extend-esri")&&i.setObject("dijit.analysis.CreateDriveTimeAreas",P,O),P});