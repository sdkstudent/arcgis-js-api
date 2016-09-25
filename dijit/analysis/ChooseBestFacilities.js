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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/fx/easing","dojo/number","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/form/NumberSpinner","dijit/form/NumberTextBox","dijit/form/TimeTextBox","dijit/form/DateTextBox","dijit/layout/StackContainer","dojox/mvc/at","../../kernel","../../lang","../../graphic","./AnalysisBase","./_AnalysisOptions","./AnalysisToolItem","./CreditEstimator","./utils","./TrafficTime","../../toolbars/draw","../PopupTemplate","../../layers/FeatureLayer","../../symbols/PictureMarkerSymbol","dojo/i18n!../../nls/jsapi","dojo/text!./templates/ChooseBestFacilities.html"],function(e,t,i,a,s,n,l,o,d,c,r,h,u,y,_,m,p,g,C,L,f,v,b,F,T,x,S,w,R,q,D,O,N,A,M,k,E,I,j,P,U,H,B,z,G,W,J,V,Z,K,Y,Q,X){var $=t([C,L,f,v,b,B,H],{declaredClass:"esri.dijit.analysis.ChooseBestFacilities",templateString:X,esriDijitPath:e.toUrl(".."),widgetsInTemplate:!0,outputLayerName:null,distanceDefaultUnits:"Miles",i18n:null,toolName:"ChooseBestFacilities",helpFileName:"ChooseBestFacilities",resultParameter:["allocatedDemandLocationsLayer","allocationLinesLayer","assignedFacilitiesLayer"],getResultLyrInfos:!0,constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),a.forEach(this._pbConnects,n.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,Q.common),i.mixin(this.i18n,Q.bufferTool),i.mixin(this.i18n,Q.driveTimes),i.mixin(this.i18n,Q.planRoutesTool),i.mixin(this.i18n,Q.toolbars),i.mixin(this.i18n,Q.chooseBestFacilitiesTool)},postCreate:function(){this.inherited(arguments);var e={};e.root="toolContainer esriCBLfirstGoal",this._goalNode1.set("cssClass",e),m.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){this._stackContainer.startup()},_handleModeCrumbClick:function(e){e.preventDefault(),this._onClose(!0)},_onClose:function(e){if(this._stackContainer.get("selectedChildWidget")===this._mainPane&&e!==!1){this._toolTitle.innerHTML=this.i18n.chooseBestFacilities,h.set(this._toolTd,"display","table-cell"),this._stackContainer.selectChild(this._firstPane),u.set(this._closeBtn,"title",this.i18n.close),u.set(this._toolDescNode,"esriHelpTopic","toolDescription");var t=["allocateIcon","minimizeIcon","maximizeIcon","maximizelimIcon","percentageIcon"];a.forEach(t,function(e){m.contains(this._toolIcon,e)&&m.remove(this._toolIcon,e)},this),m.add(this._toolIcon,"chooseBestFacilitiesIcon")}else this.emit("close",{save:!e})},clear:function(){},_buildJobParams:function(){var e,t,i={};return i.goal=this.get("goal"),i.demandLocationsLayer=l.toJson(W.constructAnalysisInputLyrObj(this.demandLocationLayer)),this.get("demandField")&&"attribute"===this.get("demandType")?i.demandField=this.get("demandField"):i.demand=this.get("demand"),this.get("maxTravelRangeField")&&"attribute"===this.get("maxTravelRangeType")?(i.maxTravelRangeField=this.get("maxTravelRangeField"),i.maxTravelRangeUnits=this.get("maxTravelRangeUnits")):this.get("maxTravelRange")&&(i.maxTravelRange=parseFloat(this.get("maxTravelRange"),10),i.maxTravelRangeUnits=this.get("maxTravelRangeUnits")),i.travelDirection=this.get("travelDirection"),t=this._travelModeSelect.getOptions(this._travelModeSelect.get("value")),i.travelMode=t&&l.toJson(t.travelMode),this._trafficTimeWidget.get("checked")&&(i.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(i.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),"NONE"!==this._requiredFacilitiesLayerSelect.get("value")&&this.requiredFacilitiesLayer&&(i.requiredFacilitiesLayer=l.toJson(W.constructAnalysisInputLyrObj(this.requiredFacilitiesLayer)),("Allocate"===i.goal||"MaximizeCapacitatedCoverage"===i.goal)&&(this.get("requiredFacilitiesCapacityField")&&"attribute"===this.get("requiredCapacityType")?i.requiredFacilitiesCapacityField=this.get("requiredFacilitiesCapacityField"):this.get("requiredFacilitiesCapacity")&&"constant"===this.get("requiredCapacityType")&&(i.requiredFacilitiesCapacity=parseFloat(this.get("requiredFacilitiesCapacity"),10)))),"Allocate"!==i.goal&&this.candidateFacilitiesLayer&&(i.candidateFacilitiesLayer=l.toJson(W.constructAnalysisInputLyrObj(this.candidateFacilitiesLayer)),"PercentCoverage"!==i.goal&&(i.candidateCount=this._candidatesInput.get("value")),"MaximizeCapacitatedCoverage"===i.goal&&(this.get("candidateFacilitiesCapacityField")&&"attribute"===this.get("candidateCapacityType")?i.candidateFacilitiesCapacityField=this.get("candidateFacilitiesCapacityField"):this.get("candidateFacilitiesCapacity")&&"constant"===this.get("candidateCapacityType")&&(i.candidateFacilitiesCapacity=parseFloat(this.get("candidateFacilitiesCapacity"),10)))),"PercentCoverage"===this.get("goal")&&(i.percentDemandCoverage=this._percentDemandCoverageValue.get("value")),this.returnFeatureCollection||(i.OutputName=l.toJson({serviceProperties:{name:this.get("outputLayerName")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.context=l.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(e={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),i.context=l.toJson(e)),console.log(i),i},_handleShowCreditsClick:function(e){if(e.preventDefault(),this._candidateFacilityLyrSelect.get("disabled")&&this._candidateFacilityLyrSelect.get("required")&&this._candidateFacilityLyrSelect.set("disabled",!1),this._form.validate()){var t=this._buildJobParams();this.getCreditsEstimate(this.toolName,t).then(i.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()}))}},_handleSaveBtnClick:function(e){var t={};this._candidateFacilityLyrSelect.get("disabled")&&this._candidateFacilityLyrSelect.get("required")&&this._candidateFacilityLyrSelect.set("disabled",!1),this._form.validate()&&(this._saveBtn.set("disabled",!1),t.jobParams=this._buildJobParams(),t.itemParams={},this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),this.execute(t))},_handleResultLyrInputChange:function(e){this.set("outputLayerName",e)},_handleModeChange:function(e){var t,i,a;a=this._travelModeSelect.getOptions(this._travelModeSelect.get("value")),P.isDefined(a)?(t="Time"===a.units,i="Time"===a.units&&"driving"===a.modei18nKey):(t=-1!==e.indexOf("Time"),i="DrivingTime"===e),h.set(this._useTrafficLabelRow,"display",i?"":"none"),t?(this._maxTravelRangeUnitsSelect.removeOption(this._maxTravelRangeUnitsSelect.getOptions()),this._maxTravelRangeUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes,selected:"selected"},{value:"Hours",label:this.i18n.hours}]),this.set("maxTravelRangeUnits",this._maxTravelRangeUnitsSelect.get("value"))):(this.get("distanceDefaultUnits")&&this.set("maxTravelRangeUnits",this.get("distanceDefaultUnits")),this._maxTravelRangeUnitsSelect.removeOption(this._maxTravelRangeUnitsSelect.getOptions()),this._maxTravelRangeUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this._maxTravelRangeUnitsSelect.set("value",this.maxTravelRangeUnits))},_handleDistUnitsChange:function(){},_handleDistValueChange:function(){},_handleTravelAttrChange:function(){},_save:function(){},_buildUI:function(){var e,t=!0;this._loadConnections(),this.signInPromise.then(i.hitch(this,W.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),h.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),h.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(e){this.folderStore=e,W.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),h.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),this.get("showSelectAnalysisLayer")&&(!this.get("demandLocationLayer")&&this.get("demandLocationLayers")&&this.set("demandLocationLayer",this.demandLocationLayers[0]),W.populateAnalysisLayers(this,"demandLocationLayer","demandLocationLayers")),W.addReadyToUseLayerOption(this,[this._analysisSelect]);var s=this.on("travelmodes-added",i.hitch(this,function(){this._handleModeChange(this._travelModeSelect.get("value")),s.remove(),s=null}));W.populateTravelModes({selectWidget:this._travelModeSelect,widget:this,enableTravelModes:this.get("enableTravelModes"),selectDefaultMode:!0}),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),this.demandLocationLayer&&a.some(this.demandLocationLayers,function(e,t){return e===this.demandLocationlayer?(this._analysisSelect.set("value",t),!0):void 0},this),e=[{value:"Allocate",label:this.i18n.allocate},{value:"MinimizeImpedance",label:this.i18n.minimizeImpedance},{value:"MaximizeCoverage",label:this.i18n.maximizeCoverage},{value:"MaximizeCapacitatedCoverage",label:this.i18n.maximizeCapacitatedCoverage},{value:"PercentCoverage",label:this.i18n.percentCoverage}],this._constant1Value.set("value",I(this,"demand")),this._attributeSelect1.set("value",I(this,"demandField")),this._attributeSelect3.set("value",I(this,"requiredFacilitiesCapacityField")),this._attributeSelect4.set("value",I(this,"candidateFacilitiesCapacityField")),this._maxTravelRangeField.set("value",I(this,"maxTravelRange")),this._maxTravelRangeFieldSelect.set("value",I(this,"maxTravelRangeField")),this._maxTravelRangeUnitsSelect.set("value",I(this,"maxTravelRangeUnits")),this._constant3Value.set("value",I(this,"requiredFacilitiesCapacity")),this._constant4Value.set("value",I(this,"candidateFacilitiesCapacity")),this._candidatesInput.set("value",I(this,"candidateCount")),this._percentDemandCoverageValue.set("value",I(this,"percentDemandCoverage")),this._stackContainer=new E({doLayout:!1},this._stackDiv),this._stackContainer.addChild(this._firstPane),this._stackContainer.addChild(this._mainPane),this._handleDemandTypeChange("facility"),this.demandLocationLayer&&this._handleAnalysisLayerChange(this._analysisSelect.get("value"))},_updateAnalysisLayerUI:function(e){if(P.isDefined(this.demandLocationLayer)&&P.isDefined(this.demandLocationLayer.queryCount)&&(W.getLayerFeatureCount(this.demandLocationLayer,{}).then(i.hitch(this,function(e){this._demandLocationLayerCount=e,u.set(this._numDemandLabel,"innerHTML",r.substitute(this.i18n.demandLabel,{numberOf:e}))}),function(e){console.log(e)}),e&&(this.outputLayerName=r.substitute(this.i18n.outputLayerName,{demandLayer:this.demandLocationLayer.name}))),this.outputLayerName&&this._outputLayerInput.set("value",this.outputLayerName),this.featureLayers){var t=[],s=a.some(this._requiredFacilitiesLayerSelect.getOptions(),function(e){return"NONE"===e.value},this);this._requiredFacilitiesLayerSelect.removeOption(this._requiredFacilitiesLayerSelect.getOptions()),this._candidateFacilityLyrSelect.removeOption(this._candidateFacilityLyrSelect.getOptions()),s&&(this._requiredFacilitiesLayerSelect.addOption({value:"NONE",label:this.i18n.noneReqOption}),this._requiredFacilitiesLayerSelect.addOption({type:"separator",value:""})),a.forEach(this.featureLayers,function(e,i){t.push({value:i+1,label:e.name})},this),this._requiredFacilitiesLayerSelect.addOption(t),this._candidateFacilityLyrSelect.addOption(t),this._handleFacilityLayerChange(this._requiredFacilitiesLayerSelect.get("value")),this._handleCandFacilityLayerChange(this._candidateFacilityLyrSelect.get("value"))}this._updateExtentLabels(),this._handleExtentCheckChange(this.showChooseExtent);var n=P.isDefined(this.demandLocationLayer),l=P.isDefined(this.requiredFacilitiesLayer),o=P.isDefined(this.candidateFacilitiesLayer),d=this.get("goal"),c="MaximizeCapacitatedCoverage"===d;l&&P.isDefined(this.requiredFacilitiesLayer.queryCount)&&W.getLayerFeatureCount(this.requiredFacilitiesLayer,{}).then(i.hitch(this,function(e){u.set(this._numFacilitiesLabel,"innerHTML",r.substitute(this.i18n.facilitiesNumLabel,{numberOf:e}))}),function(e){console.log(e)}),o&&P.isDefined(this.candidateFacilitiesLayer.queryCount)&&W.getLayerFeatureCount(this.candidateFacilitiesLayer,{}).then(i.hitch(this,function(e){u.set(this._candFacilitiesLabel,"innerHTML",r.substitute(this.i18n.candidateNumLabel,{numberOf:e}))}),function(e){console.log(e)}),n&&(this._maxTravelRangeFieldSelect.removeOption(this._maxTravelRangeFieldSelect.getOptions()),this._populateAttributeSelect(this._maxTravelRangeFieldSelect,this.demandLocationLayer.fields,!1,this._attribute2,this._handleCapacityTypeChange),this.maxTravelRangeField&&this._maxTravelRangeFieldSelect.getOptions().length>0&&this._maxTravelRangeFieldSelect.set("value",this.maxTravelRangeField),this._populateAttributeSelect(this._attributeSelect1,this.demandLocationLayer.fields,!0,this._attribute1,this._handleDemandCapacityTypeChange)),l&&this._populateAttributeSelect(this._attributeSelect3,this.requiredFacilitiesLayer.fields,!1,this._attribute3,this._handleRequiredCapacityTypeChange),o&&this._populateAttributeSelect(this._attributeSelect4,this.candidateFacilitiesLayer.fields,!1,this._attribute4,this._handleCandidateCapacityTypeChange),this._handleDemandCapacityTypeChange("constant"),this._handleCapacityTypeChange(c?"constant":"unlimited"),this._handleRequiredCapacityTypeChange(c?"constant":"unlimited"),this._handleCandidateCapacityTypeChange(c?"constant":"unlimited")},_handleGoalChange:function(e){var t,i="Allocate"===e,s="PercentCoverage"===e,n="MaximizeCoverage"===e,l="MaximizeCapacitatedCoverage"===e,o={value:"NONE",label:this.i18n.noneReqOption};if(h.set(this._candidateLabelRow,"display",i?"none":"table-row"),h.set(this._candidateCountLabelRow,"display",i||s?"none":"table-row"),h.set(this._candidateCountRow,"display",i||s?"none":"table-row"),h.set(this._candidatePercentLabelRow,"display",s?"table-row":"none"),h.set(this._candidatePercentRow,"display",s?"table-row":"none"),h.set(this._candidateCapacityLabelRow,"display",l?"table-row":"none"),h.set(this._candidateCapacityRow,"display",l?"table-row":"none"),h.set(this._candidateCapacityRow,"display",l?"table-row":"none"),h.set(this._candidateLyrSelectRow,"display",i?"none":"table-row"),h.set(this._candidateLyrLabelRow,"display",i?"none":"table-row"),h.set(this._candFacilityNumRow,"display",i?"none":"table-row"),h.set(this._candFacilityNumExtentRow,"display",i?"none":"table-row"),h.set(this._unlimited2,"display",n?"none":"block"),m.toggle(this._unlimited2,"selected",!n),m.toggle(this._constant2,"selected",n),h.set(this._unlimited3,"display",l?"none":"block"),m.toggle(this._unlimited3,"selected",!l),m.toggle(this._constant3,"selected",l),h.set(this._unlimited4,"display",l?"none":"block"),m.toggle(this._unlimited4,"selected",!l),m.toggle(this._constant4,"selected",l),h.set(this._reqdCapLabelRow,"display",i||l?"table-row":"none"),h.set(this._reqdCapAttrRow,"display",i||l?"table-row":"none"),this._handleCapacityTypeChange(n?"constant":"unlimited"),this._handleRequiredCapacityTypeChange(l?"constant":"unlimited"),this._handleCandidateCapacityTypeChange(l?"constant":"unlimited"),t=this._requiredFacilitiesLayerSelect.getOptions(),t=a.filter(t,function(e){return P.isDefined(e.value)?e:void 0}),i)this._requiredFacilitiesLayerSelect.removeOption(o),this._requiredFacilitiesLayerSelect.removeOption({type:"separator",value:""}),this._requiredFacilitiesLayerSelect.set("required",!0),this._candidateFacilityLyrSelect.set("required",!1);else{var d=a.some(t,function(e){return e.value===o.value},this);d||(this._requiredFacilitiesLayerSelect.removeOption(t),this._requiredFacilitiesLayerSelect.addOption(o),this._requiredFacilitiesLayerSelect.addOption({type:"separator",value:""}),this._requiredFacilitiesLayerSelect.addOption(t)),this._requiredFacilitiesLayerSelect.set("value",o.value),this._requiredFacilitiesLayerSelect.set("required",!1),this._candidateFacilityLyrSelect.set("required",!0)}u.set(this._labelFive,"innerHTML",i?this.i18n.fourLabel:this.i18n.fiveLabel)},_handleAnalysisLayerChange:function(e){var t,i,s;if("browse"===e){var n=this._browsedlg.browseItems.get("query");n.custom=['tags:"point"'],this._browsedlg.browseItems.set("query",n),this._isAnalysisSelect=!0,this._browsedlg.show()}else"browselayers"===e?(this.showGeoAnalyticsParams&&(n=this._browseLyrsdlg.browseItems.get("query"),n.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",n)),this._browseLyrsdlg.browseItems.plugIn.geometryTypes=["esriGeometryPoint"],this._isAnalysisSelect=!0,this._browseLyrsdlg.show()):(i=this.featureLayers.slice(),this.demandLocationLayer!==this.demandLocationLayers[e]&&(t=this.demandLocationLayers[e],s=a.some(i,function(e){return e===this.demandLocationLayer},this),s||i.push(this.demandLocationLayer),this.demandLocationLayer=t),this.set("featureLayers",i),this._updateAnalysisLayerUI(!0))},_handlePrevBtnClick:function(){this._stackContainer.selectChild(this._firstPane)},_handleNextBtnClick:function(){this._stackContainer.selectChild(this._mainPane)},_handleGoalSelect:function(e){var t;this._prevTool&&m.remove(this._prevTool._toolCtr,"toolSelected"),"allocateToExistingFacilities"===e.helpTopic?t="Allocate":"minimizeTravel"===e.helpTopic?t="MinimizeImpedance":"maximizeCoverage"===e.helpTopic?t="MaximizeCoverage":"maximizeCoverageWithCapacity"===e.helpTopic?t="MaximizeCapacitatedCoverage":"coverAPercentageOfDemand"===e.helpTopic&&(t="PercentCoverage"),this.set("goal",t),m.add(e._toolCtr,"toolSelected"),this._prevTool=e,this._toolTitle.innerHTML=e.name,m.remove(this._toolIcon,"chooseBestFacilitiesIcon"),m.add(this._toolIcon,e._toolIconClass),this._stackContainer.selectChild(this._mainPane),u.set(this._closeBtn,"title",this.i18n.back),u.set(this._toolDescNode,"esriHelpTopic",e.helpTopic),this._handleGoalChange(t)},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!1)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!0)),n.connect(this._facilitytodemand,"onclick",i.hitch(this,this._handleDemandTypeChange,"facility")),n.connect(this._demandtofacility,"onclick",i.hitch(this,this._handleDemandTypeChange,"demand")),n.connect(this._constant1,"onclick",i.hitch(this,this._handleDemandCapacityTypeChange,"constant")),this._attribute1._clickHandle=n.connect(this._attribute1,"onclick",i.hitch(this,this._handleDemandCapacityTypeChange,"attribute")),n.connect(this._constant2,"onclick",i.hitch(this,this._handleCapacityTypeChange,"constant")),n.connect(this._unlimited2,"onclick",i.hitch(this,this._handleCapacityTypeChange,"unlimited")),this._attribute2._clickHandle=n.connect(this._attribute2,"onclick",i.hitch(this,this._handleCapacityTypeChange,"attribute")),n.connect(this._constant3,"onclick",i.hitch(this,this._handleRequiredCapacityTypeChange,"constant")),n.connect(this._unlimited3,"onclick",i.hitch(this,this._handleRequiredCapacityTypeChange,"unlimited")),this._attribute3._clickHandle=n.connect(this._attribute3,"onclick",i.hitch(this,this._handleRequiredCapacityTypeChange,"attribute")),this._attribute4._clickHandle=n.connect(this._attribute4,"onclick",i.hitch(this,this._handleCandidateCapacityTypeChange,"attribute")),n.connect(this._constant4,"onclick",i.hitch(this,this._handleCandidateCapacityTypeChange,"constant")),n.connect(this._unlimited4,"onclick",i.hitch(this,this._handleCandidateCapacityTypeChange,"unlimited")),this.own(this._goalNode1.on("tool-select",i.hitch(this,this._handleGoalSelect)),this._goalNode2.on("tool-select",i.hitch(this,this._handleGoalSelect)),this._goalNode3.on("tool-select",i.hitch(this,this._handleGoalSelect)),this._goalNode4.on("tool-select",i.hitch(this,this._handleGoalSelect)),this._goalNode5.on("tool-select",i.hitch(this,this._handleGoalSelect)),this.watch("candidateFacilitiesLayer",i.hitch(this,this._candidateLyrWatchHandle)),this.watch("requiredFacilitiesLayer",i.hitch(this,this._requiredLyrWatchHandle)))},_candidateLyrWatchHandle:function(e,t,s){this.featureLayers.length>1&&a.forEach(this.featureLayers,function(e,i){t&&t.name===e.name&&!this._requiredFacilitiesLayerSelect.getOptions(i+1+"")&&this._requiredFacilitiesLayerSelect.addOption({value:i+1,label:e.name}),s&&s.name===e.name&&this._requiredFacilitiesLayerSelect.removeOption(i+1+"")},this);var n=P.isDefined(this.candidateFacilitiesLayer),l=!n&&0===this._candidateFacilityLyrSelect.getOptions().length;n&&(this._populateAttributeSelect(this._attributeSelect4,this.candidateFacilitiesLayer.fields,!1,this._attribute4,this._handleCandidateCapacityTypeChange),this._updateExtentLabels()),n&&P.isDefined(this.candidateFacilitiesLayer.queryCount)&&W.getLayerFeatureCount(this.candidateFacilitiesLayer,{}).then(i.hitch(this,function(e){u.set(this._candFacilitiesLabel,"innerHTML",r.substitute(this.i18n.candidateNumLabel,{numberOf:e}))}),function(e){console.log(e)});var o=this.get("goal"),d="Allocate"===o,c="PercentCoverage"===o,y="MaximizeCapacitatedCoverage"===o;h.set(this._candFacilityNumRow,"display",d||l?"none":"table-row"),h.set(this._candFacilityNumExtentRow,"display",d||l?"none":"table-row"),h.set(this._candidateCapacityLabelRow,"display",!l&&y?"table-row":"none"),h.set(this._candidateCapacityRow,"display",!l&&y?"table-row":"none"),h.set(this._candidateCountLabelRow,"display",l||d||c?"none":"table-row"),h.set(this._candidateCountRow,"display",l||d||c?"none":"table-row"),this._handleCandidateCapacityTypeChange(y?"constant":"unlimited")},_requiredLyrWatchHandle:function(e,t,s){var n=P.isDefined(this.requiredFacilitiesLayer),l=!1;a.forEach(this.featureLayers,function(e,i){t&&t.name===e.name&&!this._candidateFacilityLyrSelect.getOptions(i+1+"")&&(l=!0,this._candidateFacilityLyrSelect.addOption({value:i+1,label:e.name})),s&&s.name===e.name&&(l=!0,this._candidateFacilityLyrSelect.removeOption(i+1+""),this._fixEmptySelect(this._candidateFacilityLyrSelect))},this),l&&this._handleCandFacilityLayerChange(this._candidateFacilityLyrSelect.get("value")),n&&(this._populateAttributeSelect(this._attributeSelect3,this.requiredFacilitiesLayer.fields,!1,this._attribute3,this._handleRequiredCapacityTypeChange),this._handleRequiredCapacityTypeChange("MaximizeCapacitatedCoverage"===this.goal?"constant":"unlimited"),this._updateExtentLabels()),n&&P.isDefined(this.requiredFacilitiesLayer.queryCount)&&W.getLayerFeatureCount(this.requiredFacilitiesLayer,{}).then(i.hitch(this,function(e){u.set(this._numFacilitiesLabel,"innerHTML",r.substitute(this.i18n.facilitiesNumLabel,{numberOf:e}))}),function(e){console.log(e)})},_removeSelHandle:function(e){e._clickHandle&&(n.disconnect(e._clickHandle),e._clickHandle=null)},_addSelHandle:function(e,t){e._clickHandle||(e._clickHandle=n.connect(e,"onclick",i.hitch(this,t,"attribute")))},_handleBrowseItemsSelect:function(e){e&&e.selection&&W.addAnalysisReadyLayer({item:e.selection,layers:this.demandLocationLayers,layersSelect:this._analysisSelect,browseDialog:e.dialog||this._browsedlg,widget:this}).always(i.hitch(this,function(){this._handleAnalysisLayerChange(this._analysisSelect.get("value"))}))},_handleFacilityLayerChange:function(e){var t=this.get("goal"),i="Allocate"===t,a="MaximizeCapacitatedCoverage"===t;this.set("requiredFacilitiesLayer","NONE"!==e?this.featureLayers[e-1]:null),h.set(this._reqdFacilityNumRow,"display","NONE"!==e?"table-row":"none"),h.set(this._reqdFacilityNumExtentRow,"display","NONE"!==e?"table-row":"none"),h.set(this._reqdCapLabelRow,"display",i||a&&"NONE"!==e?"table-row":"none"),h.set(this._reqdCapAttrRow,"display",i||a&&"NONE"!==e?"table-row":"none")},_handleCandFacilityLayerChange:function(e){this.set("candidateFacilitiesLayer",e?this.featureLayers[e-1]:null),this._candidateFacilityLyrSelect.set("disabled","number"!=typeof e)},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setDemandLocationLayerAttr:function(e){P.isDefined(e)&&"esriGeometryPoint"===e.geometryType&&(this.demandLocationLayer=e)},_getDemandLocationLayerAttr:function(){return this.demandLocationLayer},_setDemandLocationLayersAttr:function(e){this.demandLocationLayers=a.filter(e,function(e){return P.isDefined(e)&&"esriGeometryPoint"===e.geometryType?!0:void 0},this)},_setFeatureLayersAttr:function(e){this.featureLayers=a.filter(e,function(e){return this.demandLocationLayer?P.isDefined(e)&&e.id!==this.demandLocationLayer.id&&"esriGeometryPoint"===e.geometryType?!0:void 0:!0},this)},_getFeatureLayersAttr:function(e){return this.featureLayers},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},validateServiceName:function(e){return W.validateServiceName(e,{textInput:this._outputLayerInput})},_setMapAttr:function(e){this.map=e,this._startToolbar=new V(this.map),this._endToolbar=new V(this.map),n.connect(this._startToolbar,"onDrawEnd",i.hitch(this,this._addStartFeatures)),n.connect(this._endToolbar,"onDrawEnd",i.hitch(this,this._addEndFeatures)),this.map.on("extent-change",i.hitch(this,this._updateExtentLabels))},_getMapAttr:function(){return this.map},_setDistanceDefaultUnitsAttr:function(e){this.distanceDefaultUnits=e},_getDistanceDefaultUnitsAttr:function(){return this.distanceDefaultUnits},_getOutputLayerNameAttr:function(){return this._outputLayerInput&&(this.outputLayerName=this._outputLayerInput.get("value")),this.outputLayerName},_setOutputLayerNameAttr:function(e){this.outputLayerName=e},_setGoalsAttr:function(e){this._set("goals",e)},_setGoalAttr:function(e){this._set("goal",e)},_setDemandAttr:function(e){this._set("demand",e)},_setDemandFieldAttr:function(e){this._set("demandField",e)},_setMaxTravelRangeAttr:function(e){this._set("maxTravelRange",e)},_setMaxTravelRangeFieldAttr:function(e){this._set("maxTravelRangeField",e)},_setMaxTravelRangeUnitsAttr:function(e){this._set("maxTravelRangeUnits",e)},_setTravelModeAttr:function(e){this._set("travelMode",e)},_setTimeZoneForTimeOfDayAttr:function(e){this._set("timeZoneForTimeOfDay",e)},_setTimeOfDayAttr:function(e){this._set("timeOfDay",e)},_setTravelDirectionAttr:function(e){this._set("travelDirection",e)},_setRequiredFacilitiesLayerAttr:function(e){this._set("requiredFacilitiesLayer",e)},_setRequiredFacilitiesCapacityAttr:function(e){this._set("requiredFacilitiesCapacity",e)},_setRequiredFacilitiesCapacityFieldAttr:function(e){this._set("requiredFacilitiesCapacityField",e)},_setCandidateFacilitiesLayerAttr:function(e){this._set("candidateFacilitiesLayer",e)},_setCandidateCountAttr:function(e){this._set("candidateCount",e)},_setCandidateFacilitiesCapacityAttr:function(e){this._set("candidateFacilitiesCapacity",e)},_setCandidateFacilitiesCapacityFieldAttr:function(e){this._set("candidateFacilitiesCapacityField",e)},_setPercentDemandCoverageAttr:function(e){this._set("percentDemandCoverage",e)},_setShowRequiredFacilitiesAttr:function(e){this._set("showRequiredFacilities",e)},_connect:function(e,t,i){this._pbConnects.push(n.connect(e,t,i))},_handleExtentCheckChange:function(e){m.toggle(this._numDemandExtentLabel,"disabled",!e),m.toggle(this._numFacilitiesExtentLabel,"disabled",!e),m.toggle(this._candFacilitiesExtentLabel,"disabled",!e)},_updateExtentLabels:function(){var e={};e={geometry:this.map.extent.getExtent()},P.isDefined(this.demandLocationLayer)&&P.isDefined(this.demandLocationLayer.queryCount)&&W.getLayerFeatureCount(this.demandLocationLayer,e).then(i.hitch(this,function(e){u.set(this._numDemandExtentLabel,"innerHTML",r.substitute(this.i18n.demandExtentLabel,{numberOf:e}))}),function(e){console.log(e)}),P.isDefined(this.requiredFacilitiesLayer)&&P.isDefined(this.requiredFacilitiesLayer.queryCount)&&W.getLayerFeatureCount(this.requiredFacilitiesLayer,e).then(i.hitch(this,function(e){u.set(this._numFacilitiesExtentLabel,"innerHTML",r.substitute(this.i18n.facilitiesExtentLabel,{numberOf:e}))}),function(e){console.log(e)}),P.isDefined(this.candidateFacilitiesLayer)&&P.isDefined(this.candidateFacilitiesLayer.queryCount)&&W.getLayerFeatureCount(this.candidateFacilitiesLayer,e).then(i.hitch(this,function(e){u.set(this._candFacilitiesExtentLabel,"innerHTML",r.substitute(this.i18n.candidateExtentLabel,{numberOf:e}))}),function(e){console.log(e)})},_handleDemandCapacityTypeChange:function(e){this.set("demandType",e),m.contains(this._constant1,"selected")&&m.remove(this._constant1,"selected"),m.contains(this._attribute1,"selected")&&m.remove(this._attribute1,"selected"),"attribute"===e?(m.add(this._attribute1,"selected"),h.set(this._attribute1row,"display","table-row"),h.set(this._constant1row,"display","none"),this.get("demandField")||this.set("demandField",this._attributeSelect1.get("value"))):"constant"===e&&(m.add(this._constant1,"selected"),h.set(this._attribute1row,"display","none"),h.set(this._constant1row,"display","table-row"),this.get("demand")||this.set("demand",1),this.set("demandField",null))},_handleCapacityTypeChange:function(e){this.set("maxTravelRangeType",e),m.contains(this._constant2,"selected")&&m.remove(this._constant2,"selected"),m.contains(this._attribute2,"selected")&&m.remove(this._attribute2,"selected"),m.contains(this._unlimited2,"selected")&&m.remove(this._unlimited2,"selected"),"attribute"===e?(m.add(this._attribute2,"selected"),h.set(this._atrconstrow,"display","table-row"),h.set(this._maxTravelRangeFieldSelect.domNode,"display","block"),h.set(this._maxTravelRangeField.domNode,"display","none"),this.get("maxTravelRangeField")||this.set("maxTravelRangeField",this._maxTravelRangeFieldSelect.get("value"))):"constant"===e?(m.add(this._constant2,"selected"),h.set(this._atrconstrow,"display","table-row"),h.set(this._maxTravelRangeFieldSelect.domNode,"display","none"),h.set(this._maxTravelRangeField.domNode,"display","block"),this.get("maxTravelRange")||this.set("maxTravelRange",1),this.set("maxTravelRangeField",null)):"unlimited"===e&&(m.add(this._unlimited2,"selected"),h.set(this._atrconstrow,"display","none"),h.set(this._maxTravelRangeFieldSelect.domNode,"display","none"),h.set(this._maxTravelRangeField.domNode,"display","none"),this.set("maxTravelRange",null),this.set("maxTravelRangeField",null))},_handleRequiredCapacityTypeChange:function(e){this.set("requiredCapacityType",e),m.contains(this._constant3,"selected")&&m.remove(this._constant3,"selected"),m.contains(this._attribute3,"selected")&&m.remove(this._attribute3,"selected"),m.contains(this._unlimited3,"selected")&&m.remove(this._unlimited3,"selected"),"attribute"===e?(m.add(this._attribute3,"selected"),h.set(this._attribute3row,"display","table-row"),h.set(this._constant3row,"display","none"),this.get("requiredFacilitiesCapacityField")||this.set("requiredFacilitiesCapacityField",this._attributeSelect3.get("value"))):"constant"===e?(m.add(this._constant3,"selected"),h.set(this._attribute3row,"display","none"),h.set(this._constant3row,"display","table-row"),this.get("requiredFacilitiesCapacity")||this.set("requiredFacilitiesCapacity",1),this.set("requiredFacilitiesCapacityField",null)):"unlimited"===e&&(m.add(this._unlimited3,"selected"),h.set(this._attribute3row,"display","none"),h.set(this._constant3row,"display","none"),this.set("requiredFacilitiesCapacity",null),this.set("requiredFacilitiesCapacityField",null))},_handleCandidateCapacityTypeChange:function(e){this.set("candidateCapacityType",e),
m.contains(this._constant4,"selected")&&m.remove(this._constant4,"selected"),m.contains(this._attribute4,"selected")&&m.remove(this._attribute4,"selected"),m.contains(this._unlimited4,"selected")&&m.remove(this._unlimited4,"selected"),"attribute"===e?(m.add(this._attribute4,"selected"),h.set(this._attribute4row,"display","table-row"),h.set(this._constant4row,"display","none"),this.get("candidateFacilitiesCapacityField")||this.set("candidateFacilitiesCapacityField",this._attributeSelect4.get("value"))):"constant"===e?(m.add(this._constant4,"selected"),h.set(this._attribute4row,"display","none"),h.set(this._constant4row,"display","table-row"),this.get("candidateFacilitiesCapacity")||this.set("candidateFacilitiesCapacity",1),this.set("candidateFacilitiesCapacityField",null)):"unlimited"===e&&(m.add(this._unlimited4,"selected"),h.set(this._attribute4row,"display","none"),h.set(this._constant4row,"display","none"),this.set("candidateFacilitiesCapacity",null),this.set("candidateFacilitiesCapacityField",null))},_handleDemandTypeChange:function(e){m.remove(this._facilitytodemand,"selected"),m.remove(this._demandtofacility,"selected"),"facility"===e?(m.add(this._facilitytodemand,"selected"),this.set("travelDirection","FacilityToDemand")):"demand"===e&&(m.add(this._demandtofacility,"selected"),this.set("travelDirection","DemandToFacility"))},_handleRequiredFacilityCheckChange:function(e){},_showMessages:function(e){u.set(this._bodyNode,"innerHTML",e),o.fadeIn({node:this._errorMessagePane,easing:p.quadIn,onEnd:i.hitch(this,function(){h.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),o.fadeOut({node:this._errorMessagePane,easing:p.quadOut,onEnd:i.hitch(this,function(){h.set(this._errorMessagePane,{display:"none"})})}).play()},_populateAttributeSelect:function(e,t,s,n,l){var o=[];e.removeOption(e.getOptions()),a.forEach(t,function(e){var t=-1!==a.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type);if(s&&(t=t||-1!==a.indexOf(["Deliveries","Demand","Pickups","Weight"],e.name)),t){var i=P.isDefined(e.alias)&&""!==e.alias?e.alias:e.name;i=this.i18n[i]||i,o.push({value:e.name,label:i})}},this),0===o.length?(e.set("value",null),e.set("disabled",!0),m.add(n,"disabled"),this._removeSelHandle(n),_(".dijitSelectLabel",e.id).forEach(function(e){e.innerHTML=""}),m.contains(n,"selected")&&(m.remove(n,"selected"),i.hitch(this,l,s?"constant":"unlimited")())):(m.remove(n,"disabled"),this._addSelHandle(n,l),e.set("disabled",!1),e.addOption(o))},_fixEmptySelect:function(e){0===e.getOptions().length&&_(".dijitSelectLabel",e.id).forEach(function(e){e.innerHTML=""})}});return d("extend-esri")&&i.setObject("dijit.analysis.ChooseBestFacilities",$,j),$});