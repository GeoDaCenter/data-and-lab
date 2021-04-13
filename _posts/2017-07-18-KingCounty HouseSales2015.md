---
layout: post
title: "2014-15 Home Sales in King County, WA"
date: 2017-07-18 16:31:16
image: /assets/img/
description: 
main-class: 'housing'
color:
tags:
- housing
- points
- 5,000+
- regression
- open data
categories:
twitter_text:
introduction: "Home sale prices for Seattle and King County, WA (2014-2015)."
---

<script>
var map = L.map('map');
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', { <!--this is the URL for the Nepal Geojson-->
maxZoom: 18,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.light'
}).addTo(map);

map.scrollWheelZoom.disable();
map.touchZoom.disable();
var enableMapInteraction = function () {
map.scrollWheelZoom.enable();
map.touchZoom.enable();
}
$('#map').on('click touch', enableMapInteraction);
$('#map').on('mouseout', function(){ map.scrollWheelZoom.disable();});

var smallIcon = L.icon({
iconUrl: 'http://www.hckrecruitment.nic.in/images/blue.png',
iconSize: [16, 16], // size of the icon
});

function onEachFeature(feature, layer) {
//console.log(feature);
var txt = "";
for (var fname in feature.properties) {
txt += fname;
txt += " : ";
txt += feature.properties[fname];
txt += "<br/>";
}
layer.bindPopup(txt);
}


// load GeoJSON from an external file
// load GeoJSON from an external file
$.getJSON("../data/KingCountyHouseSales2015.geojson",function(data){
// add GeoJSON layer to the map once the file is loaded
    var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#0D0887",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var json = L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        
        return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: onEachFeature
    });
    json.addTo(map);
    map.fitBounds(json.getBounds());
  });
  
</script>

[DOWNLOAD DATA](../data/kingcounty.zip)

Home sales prices and characteristics for Seattle and King County, WA (May 2014 - 2015) and its corresponding shape file with the zip code zones for King County.

* Observations = 21,613
* Variables = 21
* Years = 2014-2015

**Source:** 
[House Sales in King County, USA](https://www.kaggle.com/harlfoxem/housesalesprediction). Predict house price using regression. The shape file with the zip code zones for King County was retrieved from [King county GIS Open Data ](https://gis-kingcounty.opendata.arcgis.com/datasets/zipcodes-for-king-county-and-surrounding-area-shorelines-zipcode-shore-area). Additional information of the variables descriptions can be found in [King County Home Sales  analysis](https://rstudio-pubs-static.s3.amazonaws.com/155304_cc51f448116744069664b35e7762999f.html).


King county housing file description:

|**Variable**|**Description**|
|:-------|:----------|
|id| Identification|
|date|Date sold|
|price|Sale price|
|bedrooms|Number of bedrooms|
|bathrooms|Number of bathrooms|
|sqft\_liv|Size of living area in square feet|
|sqft\_lot|Size of the lot in square feet|
|floors|Number of floors|
|waterfront|'1' if the property has a waterfront, '0' if not.|
|view|An index from 0 to 4 of how good the view of the property was |
|condition|Condition of the house, ranked from 1 to 5|
|grade|Classification by construction quality which refers to the types of materials used and the quality of workmanship. Buildings of better quality (higher grade) cost more to build per unit of measure and command higher value. Additional information in: [KingCounty](http://info.kingcounty.gov/assessor/esales/Glossary.aspx?type=r)|
|sqft\_above|Square feet above ground|
|sqft\_basmt|Square feet below ground|
|yr\_built|Year built|
|yr\_renov|Year renovated. '0' if never renovated|
|zipcode|5 digit zip code|
|lat | Latitude |
|long | Longitude| 
|squft\_liv15|Average size of interior housing living space for the closest 15 houses, in square feet	|
|squft\_lot15|Average size of land lots for the closest 15 houses, in square feet	|
|Shape_leng	|	Polygon length in meters  |
|Shape_Area	|	Polygon area in meters |

King county zones file description:

|**Variable**|**Description**|
|:-------|:----------|
|OBJECTID|	ID code	|
|ZIP|	Zip code |
|COUNTY|	County code	|
|ZIP_TYPE|	Zip code type: standard or PO box	|
|Shape_Leng|	Polygon length	|
|Shape_Area|	Polygon area	|


Prepared by the [Center for Spatial Data Science](http://spatial.uchicago.edu/). August 14, 2020. Data provided "as is," no warranties.

