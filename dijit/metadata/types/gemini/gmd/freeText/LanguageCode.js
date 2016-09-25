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

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../../../../base/Descriptor","../../../../form/InputSelectOne","../../../../form/Options","../../../../form/Option","../../../../form/iso/CodeListAttribute","../../../../form/iso/CodeListValueAttribute","../../../../form/iso/CodeListElement","dojo/text!./templates/LanguageCode.html","../../../../../../kernel"],function(e,t,o,i,r,a,n,s,d,m,f,l){var g=e(i,{templateString:f});return o("extend-esri")&&t.setObject("dijit.metadata.types.gemini.gmd.freeText.LanguageCode",g,l),g});