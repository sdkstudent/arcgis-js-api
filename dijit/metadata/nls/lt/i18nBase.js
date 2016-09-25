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

define({general:{cancel:"Atšaukti",close:"Užverti",none:"Nėra",ok:"Gerai",other:"Kita",stamp:"Spaudas",now:"Dabar",choose:"Pasirinkite vieną:"},editor:{noMetadata:"Šio elemento metaduomenų nėra.",xmlViewOnly:"Redaktorius nepalaiko su šiuo elementu susijusių meta duomenų. Meta duomenys turi būti ArcGIS formato.",editorDialog:{caption:"Metaduomenys",captionPattern:"{title} metaduomenys"},primaryToolbar:{view:"Peržiūrėti",viewXml:"Peržiūrėti XML",edit:"Redaguoti",initializing:"Įkeliama...",startingEditor:"Paleidžiamas redaktorius...",loadingDocument:"Įkeliamas dokumentas...",updatingDocument:"Atnaujinamas dokumentas...",generatingView:"Kuriama peržiūra...",errors:{errorGeneratingView:"Kuriant peržiūrą įvyko klaida",errorLoadingDocument:"Įkeliant dokumentą įvyko klaida."}},changesNotSaved:{prompt:"Jūsų dokumente yra keitimų, kurių nebuvo įrašyti.",dialogTitle:"Uždaryti metaduomenų redaktorių",closeButton:"Užverti"},download:{caption:"Atsiųsti",dialogTitle:"Atsiųsti",prompt:"Spustelėkite čia, kad atsisiųstumėte failą."},load:{caption:"Atverti",dialogTitle:"Atverti",typeTab:"Naujas dokumentas",fileTab:"Atverti failą",templateTab:"Šablonas",itemTab:"Jūsų elementas",filePrompt:"Pasirinkite vietinį ArcGIS meta duomenų XML failą. Meta duomenys turi būti ArcGIS formato.",templatePrompt:"Kurti meta duomenis.",pullItem:"Užpildykite metaduomenis elemento aprašu.",importWarning:"Pasirinktas failo formatas nėra ArcGIS. Nusiųsti meta duomenys turi būti ArcGIS formato.",loading:"Įkeliama...",noMetadata:"Šio elemento metaduomenis galima sukurti pasirinkus vieną iš toliau nurodytų parinkčių.",unrecognizedMetadata:"Redaktorius nepalaiko su šiuo elementu susietų metaduomenų tipo. Palaikomus metaduomenis galima sukurti pasirinkus vieną iš toliau nurodytų parinkčių.",errorLoading:"Įkeliant įvyko klaida.",warnings:{badFile:"Pasirinkto failo negalima įkelti.",notAnXml:"Pasirinktas failas nėra XML failas.",notSupported:"Šio tipo failas nepalaikomas."}},save:{caption:"Įrašyti",dialogTitle:"Įrašyti metaduomenis",working:"Įrašomi metaduomenys...",errorSaving:"Įvyko klaida, jūsų metaduomenys nebuvo įrašyti.",saveDialog:{pushCaption:"Pakeisti elementą"}},saveAndClose:{caption:"Išsaugoti ir uždaryti"},saveDraft:{caption:"Įrašyti vietinę kopiją",dialogTitle:"Įrašyti vietinę kopiją"},validate:{caption:"Tikrinti",dialogTitle:"Tikrinimas",docIsValid:"Jūsų dokumentas yra teisingas."},del:{caption:"Pašalinti",dialogTitle:"Pašalinti metaduomenis",prompt:"Ar tikrai norite ištrinti šiuos metaduomenis?",working:"Šalinami metaduomenys...",errorDeleting:"Įvyko klaida, jūsų metaduomenys nebuvo pašalinti."},transform:{caption:"Transformuoti",dialogTitle:"Transformuoti į",prompt:"",working:"Transformuojama...",errorTransforming:"Transformuojant dokumentą įvyko klaida."},errorDialog:{dialogTitle:"Įvyko klaida"}},arcgis:{portal:{metadataButton:{caption:"Metaduomenys"}}},calendar:{button:"Kalendorius...",title:"Kalendorius"},geoExtent:{button:"Nustatyti geografinę aprėptį...",title:"Geografinė aprėptis",navigate:"Naršyti",draw:"Piešti stačiakampį",drawHint:"Paspauskite pradėti ir atleiskite pabaigti."},hints:{date:"(yyyy arba yyyy-mm arba yyyy-mm-dd)",dateTime:"(yyyy-mm-ddThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(yyyy arba yyyy-mm arba yyyy-mm-dd arba yyyy-mm-ddThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(atskirkite kableliu arba nauja eilute)",fgdcDate:"(yyyy arba yyyy-mm arba yyyy-mm-dd)",fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(įveskite sveikąjį skaičių)",latitude:"(dešimtainiai laipsniai)",longitude:"(dešimtainiai laipsniai)",number:"(įveskite skaičių)",numberGreaterThanZero:"(įveskite > 0 skaičių)"},isoTopicCategoryCode:{caption:"Temų kategorijos",boundaries:"Administracinės ir valstybių ribos",farming:"Žemės ūkis ir ūkininkavimas",climatologyMeteorologyAtmosphere:"Atmosfera ir klimatas",biota:"Biologija ir ekologija",economy:"Verslas ir ekonomika",planningCadastre:"Kadastras",society:"Kultūra, visuomenė ir demografija",elevation:"Aukštis ir išvestiniai produktai",environment:"Aplinka ir paveldosauga",structure:"Infrastruktūra ir statiniai",geoscientificInformation:"Geologiniai ir geofiziniai",health:"Sveikatos apsauga ir ligos",imageryBaseMapsEarthCover:"Vaizdai ir pagrindo žemėlapiai",inlandWaters:"Vidaus vandens ištekliai",location:"Vietovės ir geodeziniai tinklai",intelligenceMilitary:"Karinis",oceans:"Vandenynai ir upių žiotys",transportation:"Transporto tinklai",utilitiesCommunication:"Inžinerinės komunikacijos"},multiplicity:{moveElementDown:"Perkelti skiltį žemyn",moveElementUp:"Perkelti skiltį aukštyn",removeElement:"Pašalinti skiltį",repeatElement:"Pakartoti skiltį"},optionalNode:{switchTip:"Įtraukti arba išskirti šią skiltį."},serviceTypes:{featureService:"Elementų paslauga",mapService:"Žemėlapių paslauga",imageService:"Vaizdų paslauga",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} – {message}",patternWithHint:"{label} – {message} {hint}",ok:"Gerai",empty:"Ši reikšmė privaloma.",date:"Reikšmė turi būti data.",integer:"Reikšmė turi būti sveikas skaičius.",number:"Reikšmė turi būti skaičius.",other:"Netinkama reikšmė."},validationPane:{clearMessages:"Išvalyti pranešimus",prompt:"(spustelėkite ant kiekvieno toliau pateikiamo pranešimo ir įveskite nurodytame lauke būtiną informaciją)"}});