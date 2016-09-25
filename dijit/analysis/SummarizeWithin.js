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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/fx/easing","dojo/NodeList","dojo/NodeList-dom","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/form/DateTextBox","dijit/form/NumberTextBox","dijit/form/TimeTextBox","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./utils","dojo/i18n!../../nls/jsapi","dojo/text!./templates/SummarizeWithin.html"],function(e,t,s,i,a,n,r,o,h,l,u,m,y,c,d,p,_,g,L,b,S,w,v,f,T,R,I,A,P,M,N,x,C,j,U,G,W,k,B,F,q,O,D){var H=t([L,b,S,w,v,B,k],{declaredClass:"esri.dijit.analysis.SummarizeWithin",templateString:D,widgetsInTemplate:!0,sumWithinLayer:null,summaryLayers:null,summaryFields:null,outputLayerName:null,summarizeMetric:!0,summaryLayer:null,groupByField:null,minorityMajority:!1,percentPoints:!1,i18n:null,toolName:"SummarizeWithin",helpFileName:"SummarizeWithin",resultParameter:"resultLayer",constructor:function(e){this._pbConnects=[],this._statsRows=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,O.summarizeWithinTool)},postCreate:function(){this.inherited(arguments),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_handleShowCreditsClick:function(e){e.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(s.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()}))},_buildJobParams:function(){var e,t,s,i={};return e=this.summaryLayers[this._layersSelect.get("value")],i.summaryLayer=n.toJson(q.constructAnalysisInputLyrObj(e,this.showGeoAnalyticsParams)),this.showGeoAnalyticsParams?("polygon"===this.binType?i.sumWithinLayer=n.toJson(q.constructAnalysisInputLyrObj(this.sumWithinLayer),this.showGeoAnalyticsParams):(i.binType=this.binType.toUpperCase(),i.binSize=this._binsInput.get("value"),i.binSizeUnit=this._binUnits.get("value")),this._isTimeInstantLayer&&(this.get("timeReference")&&(i.timeStepReference=this.get("timeReference")),this._timeIntervalInput.get("value")&&(i.timeStepInterval=this._timeIntervalInput.get("value"),i.timeStepIntervalUnit=this._timeIntervalUnits.get("value")),this._timeRepeatInput.get("value")&&(i.timeStepRepeat=this._timeRepeatInput.get("value"),i.timeStepRepeatUnit=this._timeRepeatUnits.get("value")))):(i.sumWithinLayer=n.toJson(q.constructAnalysisInputLyrObj(this.sumWithinLayer)),i.sumShape=this._sumMetricCheck.get("checked"),("esriGeometryPoint"!==e.geometryType||"esriGeometryMultipoint"!==e.geometryType)&&(i.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(i.groupByField=this._groupBySelect.get("value"),this.resultParameter=["resultLayer","groupBySummary"],i.minorityMajority=this.get("minorityMajority"),i.percentShape=this.get("percentPoints"))),i.summaryFields=n.toJson(this.get("summaryFields")),this.returnFeatureCollection||(i.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.context=n.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),i.context=n.toJson(t)),s=this._spatialRefInput.get("value"),this.showGeoAnalyticsParams&&(t={},s&&(t.processSR={wkid:parseInt(s,10)}),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),i.context=n.toJson(t)),this.showGeoAnalyticsParams&&(this.resultParameter="output"),i},_handleSaveBtnClick:function(){if(this._form.validate()){if(!this.showGeoAnalyticsParams&&!this._sumMetricCheck.get("checked")&&0===this.get("summaryFields").length)return void this._showMessages(this.i18n.statsRequiredMsg);this._saveBtn.set("disabled",!0);var e,t={};e=this.summaryLayers[this._layersSelect.get("value")],t.jobParams=this._buildJobParams(),this._saveBtn.set("disabled",!1);var s=this.sumWithinLayer?this.sumWithinLayer.name:"";t.itemParams={description:l.substitute(this.i18n.itemDescription,{sumWithinLayerName:s,summaryLayerName:e.name}),tags:l.substitute(this.i18n.itemTags,{sumWithinLayerName:s,summaryLayerName:e.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),this.showGeoAnalyticsParams&&this._datastoreSelect&&(t.isSpatioTemporalDataStore="spatialtemporal"===this._datastoreSelect.get("value")),console.log(t),this.execute(t)}},_initializeShapeUnits:function(e){this._prevGeometryType&&this._prevGeometryType===e||(this._shapeUnitsSelect.removeOption(this._shapeUnitsSelect.getOptions()),u.set(this._shapeUnitsSelect.domNode,"display","esriGeometryPoint"===e||"esriGeometryMultipoint"===e?"none":""),"esriGeometryPolygon"===e?(u.set(this._shapeUnitsSelect.domNode,"width","49%"),this._shapeUnitsSelect.addOption([{value:"SquareMiles",label:this.i18n.sqMiles},{value:"SquareKilometers",label:this.i18n.sqKm},{value:"SquareMeters",label:this.i18n.sqMeters},{value:"Hectares",label:this.i18n.hectares},{value:"Acres",label:this.i18n.acres}]),"Kilometers"===this.get("shapeUnits")&&this.set("shapeUnits","SquareKilometers")):"esriGeometryPolyline"===e&&(u.set(this._shapeUnitsSelect.domNode,"width","39%"),this._shapeUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters},{value:"Yards",label:this.i18n.yards}]),"SquareKilometers"===this.get("shapeUnits")&&this.set("shapeUnits","Kilometers")),this._shapeUnitsSelect.set("value",this.get("shapeUnits")),this._prevGeometryType=e)},_handleShapeUnitsChange:function(e){this.set("shapeUnits",e)},_handleLayerChange:function(e){var t;if("browse"===e){var s=this._browsedlg.browseItems.get("query");s.custom=[],this._browsedlg.browseItems.set("query",s),this._isAnalysisSelect=!1,this._browsedlg.show()}else if("browselayers"===e)this.showGeoAnalyticsParams&&(s=this._browseLyrsdlg.browseItems.get("query"),s.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",s)),this._browseLyrsdlg.browseItems.plugIn.geometryTypes=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"],this._isAnalysisSelect=!1,this._browseLyrsdlg.show();else if(t=this.summaryLayers[e],t&&(this._initializeShapeUnits(t.geometryType),this._setSumLyrLabels(t),this.set("groupBySelect",this.groupByField),this._removeStatsRows(),this._createStatsRow(),this.showGeoAnalyticsParams)){this._isTimeInstantLayer=q.isTimeInstantLayer(t);var a=new _([this._timeStepsLabelRow,this._intervalLabelRow,this._intervalRow,this._repeatLabelRow,this._repeatRow,this._timeRefRow,this._timeLabelRow,this._timeStepLabelNo]),n=[this._timeIntervalInput,this._timeIntervalUnits,this._timeRepeatInput,this._timeRepeatUnits,this._timeRefDay,this._timeRefTime];i.forEach(n,function(e){e.set("disabled",!this._isTimeInstantLayer)},this),a.toggleClass("esriAnalysisTextDisabled",!this._isTimeInstantLayer)}},_handleAttrSelectChange:function(e){var t,i,a,n;"0"!==e&&(t=this.get("statisticSelect"),n=this.getOptions(e),n&&n.type&&q.addStatisticsOptions({selectWidget:t,type:n.type,showGeoAnalyticsParams:this.showGeoAnalyticsParams}),"0"!==t.get("value")&&(t.get("isnewRowAdded")||(i=t.get("removeTd"),u.set(i,"display","block"),a=t.get("referenceWidget"),s.hitch(a,a._createStatsRow()),t.set("isnewRowAdded",!0))))},_handleStatsValueUpdate:function(e,t,i){var a,n,r;this.get("attributeSelect")&&(a=this.get("attributeSelect"),a.get("value")&&"0"!==a.get("value")&&i&&"0"!==i&&(this.get("isnewRowAdded")||(n=this.get("removeTd"),u.set(n,"display","block"),r=this.get("referenceWidget"),s.hitch(r,r._createStatsRow()),r._sumMetricCheck.set("disabled",!1),this.set("isnewRowAdded",!0))))},_handleGroupBySelectChange:function(e){var t="0"===e;d.toggle(this._minmajorityLabel,"esriAnalysisTextDisabled",t),d.toggle(this._percentPointsLabel,"esriAnalysisTextDisabled",t),this._percentPointsCheck.set("disabled",t),this._minmajorityCheck.set("disabled",t)},_handleRefTimeChange:function(e){this._timeRefDay.set("required",e&&!this._timeRefDay.get("value"))},_save:function(){},_setValidators:function(){this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this.get("showGeoAnalyticsParams")&&(this._timeIntervalInput.set("isInRange",s.hitch(this._timeIntervalInput,q.isGreaterThanZero)),this._timeRepeatInput.set("isInRange",s.hitch(this._timeRepeatInput,q.isGreaterThanZero)),this._binsInput.set("isInRange",s.hitch(this._binsInput,q.isGreaterThanZero)),this._timeIntervalInput.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._timeRepeatInput.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._binsInput.set("rangeMessage",this.i18n.greaterThanZeroMsg))},_buildUI:function(){var e=!0;d.add(this._form.domNode,"esriSimpleForm"),this._setValidators(),this._bigdataUX=[this._timeStepsLabelRow,this._intervalLabelRow,this._intervalRow,this._repeatLabelRow,this._repeatRow,this._timeRefRow,this._timeLabelRow,this._timeStepLabelNo,this._binsTypeRow,this._sumGeomTypeRow,this._srLabelRow,this._srInputRow,this._selectDataStore,this._datastoreLabelRow,this._chooseBinSizeLblRow,this._choosePolyLblRow],this._standardUX=[this._sumShapeRow,this._groupByLabelRow,this._groupBySelectRow,this._minmajorityRow,this._percentPointsRow,this._groupByLabelNo],q.updateDisplay(this._standardUX,!this.get("showGeoAnalyticsParams"),"table-row"),q.updateDisplay(this._bigdataUX,this.get("showGeoAnalyticsParams"),"table-row"),q.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(!this.get("sumWithinLayer")&&this.get("sumWithinLayers")&&this.set("sumWithinLayer",this.sumWithinLayers[0]),q.populateAnalysisLayers(this,"sumWithinLayer","sumWithinLayers")),this.showGeoAnalyticsParams?(m.set(this._spatialRefLabel,"innerHTML",this.i18n.fiveLabel),m.set(this._datastoreLabel,"innerHTML",this.i18n.sixLabel),m.set(this._outputLbl,"innerHTML",this.i18n.sevenLabel),this.distanceDefaultUnits&&this._binUnits.set("value",this.distanceDefaultUnits)):(m.set(this._statsLblNo,"innerHTML",this.i18n.threeLabel),m.set(this._groupByLabelNo,"innerHTML",this.i18n.fourLabel),m.set(this._outputLbl,"innerHTML",this.i18n.fiveLabel)),this.sumWithinLayer&&m.set(this._aggregateToolDescription,"innerHTML",l.substitute(this.i18n.summarizeDefine,{sumWithinLayerName:this.sumWithinLayer.name})),q.addReadyToUseLayerOption(this,[this._analysisSelect,this._layersSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this._sumMetricCheck.set("checked",this.summarizeMetric),this._sumMetricCheck.set("disabled",this.summarizeMetric),this.shapeUnits&&this._shapeUnitsSelect.set("value",this.shapeUnits||this._shapeUnitsSelect.get("value")),i.forEach(this.summaryFields,function(e){var t=e.split(" ");this._currentAttrSelect.set("value",t[0]),s.hitch(this._currentAttrSelect,this._handleAttrSelectChange,t[0])(),this._currentStatsSelect.set("value",t[1]),s.hitch(this._currentStatsSelect,this._handleStatsValueUpdat,"value","",t[1])()},this),u.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,function(e){this.folderStore=e,q.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),u.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),this.set("groupBySelect",this.groupByField),this.minorityMajority&&this._minmajorityCheck.set("checked",this.minorityMajority),this.percentPoints&&this._percentPointsCheck.set("checked",this.percentPoints),u.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none"),this._loadConnections(),this.showGeoAnalyticsParams&&this._handleSumGeomTypeChange("polygon"),this._updateAnalysisLayerUI(e)},_setSumLyrLabels:function(e){e&&(this.sumWithinLayer&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:e.name,sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),m.set(this._addStatsLabel,"innerHTML",l.substitute(this.i18n.addStats,{summaryLayerName:e.name})),this._initializeShapeUnits(e.geometryType),"esriGeometryPolygon"===e.geometryType&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoly),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPolygon")),-1!==i.indexOf(["esriGeometryPoint","esriGeometryMultipoint"],e.geometryType)&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoint),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPoint")),"esriGeometryPolyline"===e.geometryType&&(m.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricLine),m.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsLine")))},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1)),this.showGeoAnalyticsParams&&(this._connect(this._polygon,"onclick",s.hitch(this,"_handleSumGeomTypeChange","polygon")),this._connect(this._square,"onclick",s.hitch(this,"_handleSumGeomTypeChange","square")),this._connect(this._hexagon,"onclick",s.hitch(this,"_handleSumGeomTypeChange","hexagon")))},_createStatsRow:function(){var t,i,n,r,o,h,l,u;return u=this.summaryLayers[this._layersSelect.get("value")],t=y.create("tr",null,this._afterStatsRow,"before"),n=y.create("td",{style:{width:"49%",maxWidth:"100px"}},t),i=y.create("td",{style:{width:"50%",maxWidth:"104px"}},t),r=new A({maxHeight:200,"class":"esriLeadingMargin1 mediumInput esriTrailingMargin025 attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},y.create("select",null,n)),q.addAttributeOptions({selectWidget:r,layer:u,allowStringType:this.showGeoAnalyticsParams}),o=new A({"class":"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},y.create("select",null,i)),q.addStatisticsOptions({selectWidget:o,showGeoAnalyticsParams:this.showGeoAnalyticsParams}),r.set("statisticSelect",o),r.set("showGeoAnalyticsParams",this.showGeoAnalyticsParams),a.connect(r,"onChange",this._handleAttrSelectChange),l=y.create("td",{"class":"shortTextInput removeTd",style:{display:"none",maxWidth:"12px"}},t),h=y.create("a",{title:this.i18n.removeAttrStats,"class":"closeIcon statsRemove",innerHTML:"<img src='"+e.toUrl("./images/close.gif")+"' border='0''/>"},l),a.connect(h,"onclick",s.hitch(this,this._handleRemoveStatsBtnClick,t)),this._statsRows.push(t),o.set("attributeSelect",r),o.set("removeTd",l),o.set("isnewRowAdded",!1),o.set("referenceWidget",this),o.watch("value",this._handleStatsValueUpdate),this._currentStatsSelect=o,this._currentAttrSelect=r,!0},_handleRemoveStatsBtnClick:function(e){this._removeStatsRow(e),0===this.get("summaryFields").length&&(this._sumMetricCheck.set("disabled",!0),this._sumMetricCheck.set("checked",!0))},_removeStatsRows:function(){i.forEach(this._statsRows,this._removeStatsRow,this),this._statsRows=[]},_removeStatsRow:function(e){i.forEach(f.findWidgets(e),function(e){e.destroyRecursive()}),y.destroy(e)},_handleAnalysisLayerChange:function(e){if("browse"===e){var t=this._browsedlg.browseItems.get("query");t.custom=['tags:"polygon"'],this._browsedlg.browseItems.set("query",t),this._isAnalysisSelect=!0,this._browsedlg.show()}else"browselayers"===e?(this.showGeoAnalyticsParams&&(t=this._browseLyrsdlg.browseItems.get("query"),t.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",t)),this._browseLyrsdlg.browseItems.plugIn.geometryTypes=["esriGeometryPolygon"],this._isAnalysisSelect=!0,this._browseLyrsdlg.show()):(this.sumWithinLayer=this.sumWithinLayers[e],this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(e){var t,s,a=this.summaryLayers[this._layersSelect.get("value")],n=this._layersSelect.get("value");if(e&&this.get("sumWithinLayer")&&a&&(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:a.name,sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this.summaryLayers&&this.sumWithinLayer&&(t=i.some(this._layersSelect.getOptions(),function(e){return"browse"===e.value},this),s=i.some(this._layersSelect.getOptions(),function(e){return"browselayers"===e.value},this),this._layersSelect.removeOption(this._layersSelect.getOptions()),i.forEach(this.summaryLayers,function(e,t){var s=!0;e.url&&this.sumWithinLayer.url&&e.url!==this.sumWithinLayer.url?s=!1:this.sumWithinLayer===e||e.analysisReady&&this.sumWithinLayer.analysisReady||(s=!1),s||(this._layersSelect.addOption({value:t,label:e.name}),n===t&&this._layersSelect.set("value",t))},this),(this.get("showReadyToUseLayers")||this.get("showBrowseLayers")||t||s)&&this._layersSelect.addOption({type:"separator",value:""}),this.get("showReadyToUseLayers")&&t&&this._layersSelect.addOption({value:"browse",label:this.i18n.browseAnalysisTitle}),this.get("showBrowseLayers")&&s&&this._layersSelect.addOption({value:"browselayers",label:this.i18n.browseLayers}),this._handleLayerChange(this._layersSelect.get("value")),this.showGeoAnalyticsParams))if("polygon"===this.binType&&this.sumWithinLayer){var r=this.summaryLayers[this._layersSelect.get("value")];this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:r?r.name:"",sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)}else"square"===this.binType?(this.outputLayerName=l.substitute(this.i18n.outputSquareType,{summaryLayerName:r?r.name:""}),this._outputLayerInput.set("value",this.outputLayerName)):"hexagon"===this.binType&&(this.outputLayerName=l.substitute(this.i18n.outputHexType,{summaryLayerName:r?r.name:""}),this._outputLayerInput.set("value",this.outputLayerName))},_handleBrowseItemsSelect:function(e){e&&e.selection&&q.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.sumWithinLayers:this.summaryLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:e.dialog||this._browsedlg,widget:this}).always(s.hitch(this,this._updateAnalysisLayerUI,!0))},_handleSumGeomTypeChange:function(e){var t,s="polygon"===e,i="square"===e?this.i18n.selectSqBinSizeLbl:"hexagon"===e?this.i18n.selectHexBinSizeLbl:"";d.toggle(this._polygon,"selected",s),d.toggle(this._square,"selected","square"===e),d.toggle(this._hexagon,"selected","hexagon"===e),u.set(this._selectAnalysisRow,"display",s?"table-row":"none"),u.set(this._choosePolyLblRow,"display",s?"table-row":"none"),u.set(this._chooseBinSizeLblRow,"display",s?"none":"table-row"),u.set(this._binsTypeRow,"display",s?"none":"table-row"),this._analysisSelect.set("required",s),this._binsInput.set("required",!s),this._binUnits.set("required",!s),this.binType=e,s||m.set(this._binSizeLabel,"innerHTML",i),t=this.summaryLayers[this._layersSelect.get("value")],"polygon"===this.binType&&this.sumWithinLayer?(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{summaryLayerName:t?t.name:"",sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)):"square"===this.binType?(this.outputLayerName=l.substitute(this.i18n.outputSquareType,{summaryLayerName:t?t.name:""}),this._outputLayerInput.set("value",this.outputLayerName)):"hexagon"===this.binType&&(this.outputLayerName=l.substitute(this.i18n.outputHexType,{summaryLayerName:t?t.name:""}),this._outputLayerInput.set("value",this.outputLayerName))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setSumWithinLayersAttr:function(e){W.isDefined(e)&&(e=i.filter(e,function(e,t){return"esriGeometryPolygon"===e.geometryType}),this.sumWithinLayers=e)},_setSumWithinLayerAttr:function(e){W.isDefined(e)&&"esriGeometryPolygon"===e.geometryType&&(this.sumWithinLayer=e)},_setSummaryLayersAttr:function(e){this.summaryLayers=e},_setLayersAttr:function(e){this.summaryLayers=[]},_setSummaryFieldsAttr:function(e){this.summaryFields=e},_getSummaryFieldsAttr:function(){var e,t,s="",i=[];return c(".statsSelect",this.domNode).forEach(function(a){if(e=f.byNode(a),t=e.get("attributeSelect"),"0"!==t.get("value")&&"0"!==e.get("value"))if(this.showGeoAnalyticsParams){var n={};n.statisticType=e.get("value"),n.onStatisticField=t.get("value"),i.push(n)}else s+=t.get("value")+" "+e.get("value")+";",i.push(t.get("value")+" "+e.get("value"))},this),i},_setGroupBySelectAttr:function(e){var t=this.summaryLayers[this._layersSelect.get("value")],s=W.isDefined(t)?t.fields:[];this._groupBySelect.getOptions().length>0&&this._groupBySelect.removeOption(this._groupBySelect.getOptions()),this._groupBySelect.addOption({value:"0",label:this.i18n.attribute}),i.forEach(s,function(e,s){-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeString","esriFieldTypeDate"],e.type)&&e.name!==t.objectIdField&&this._groupBySelect.addOption({value:e.name,label:W.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this),e&&this._groupBySelect.set("value",e),this._handleGroupBySelectChange(this._groupBySelect.get("value"))},_setMinorityMajorityAttr:function(e){this.minorityMajority=e},_getMinorityMajorityAttr:function(e){return this._minmajorityCheck&&(this.minorityMajority=this._minmajorityCheck.get("checked")),this.minorityMajority},_setPercentPointsAttr:function(e){this.percentPoints=e},_getPercentPointsAttr:function(e){return this._percentPointsCheck&&(this.percentPoints=this._percentPointsCheck.get("checked")),this.percentPoints},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setShapeUnitsAttr:function(e){this.shapeUnits=e},_getShapeUnitsAttr:function(){return this.shapeUnits},validateServiceName:function(e){return q.validateServiceName(e,{textInput:this._outputLayerInput})},_connect:function(e,t,s){this._pbConnects.push(a.connect(e,t,s))},_showMessages:function(e){m.set(this._bodyNode,"innerHTML",e),r.fadeIn({node:this._errorMessagePane,easing:p.quadIn,onEnd:s.hitch(this,function(){u.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),r.fadeOut({node:this._errorMessagePane,easing:p.quadOut,onEnd:s.hitch(this,function(){u.set(this._errorMessagePane,{display:"none"})})}).play()}});return o("extend-esri")&&s.setObject("dijit.analysis.SummarizeWithin",H,G),H});