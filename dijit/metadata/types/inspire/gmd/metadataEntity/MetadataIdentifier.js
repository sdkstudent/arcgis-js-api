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

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../../../../base/Descriptor","../../../iso/gmd/metadataEntity/MetadataFileIdentifier","../../../iso/gmd/metadataEntity/MetadataHierarchy","./MetadataLanguage","dojo/text!./templates/MetadataIdentifier.html","../../../../../../kernel"],function(t,e,a,d,i,n,r,o,s){var m=t(d,{templateString:o});return a("extend-esri")&&e.setObject("dijit.metadata.types.inspire.gmd.metadataEntity.MetadataIdentifier",m,s),m});