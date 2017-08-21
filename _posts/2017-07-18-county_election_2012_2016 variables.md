---
layout: post
title: "County elections 2012/16"
date: 2017-07-18 16:42:16
image: /assets/img/
description:
main-class: 'ELECTIONS'
color:
tags:
- polygon
- elections
- open data
- Rates
- Space-time
categories:
twitter_text:
introduction: "US Presidential Election results in 2012 and 2016, by county Election results"
---
<script>
  var map = L.map('map');
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', { <!--this is the URL for the County_election_2012/16 Geojson-->
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

  // load GeoJSON from an external file
  // load GeoJSON from an external file
  $.getJSON("../data/County_election_2012/16.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
    var json = L.geoJson(data);
    json.addTo(map);
    map.fitBounds(json.getBounds());
  });

</script>

Data provided "as is", no warranties.

 US Presidential Election results in 2012 and 2016, by county
 Election results from this Git repository [https://github.com/tonmcg/County\_Level\_Election\_Results\_12-16](https://github.com/tonmcg/County_Level_Election_Results_12-16)

 County facts from Kaggle: [https://www.kaggle.com/benhamner/2016-us-election](https://www.kaggle.com/benhamner/2016-us-election)


 Type = polygon shape file

 Variables = 84

 Observations = 3108

 Year = 2007-2016

 Spatial resolution = low

 Topic = elections

 Type of sample data = open data

 Rates

 Space-time

|Variable name|Description|
|---|---|
|PST045214|Population, 2014 estimate
|PST040210|Population, 2010 (April 1) estimates base
|PST120214|Population, percent change - April 1, 2010 to July 1, 2014
|POP010210|Population, 2010
|AGE135214|Persons under 5 years, percent, 2014
|AGE295214|Persons under 18 years, percent, 2014
|AGE775214|Persons 65 years and over, percent, 2014
|SEX255214|Female persons, percent, 2014
|RHI125214|White alone, percent, 2014
|RHI225214|Black or African American alone, percent, 2014
|RHI325214|American Indian and Alaska Native alone, percent, 2014
|RHI425214|Asian alone, percent, 2014
|RHI525214|Native Hawaiian and Other Pacific Islander alone, percent, 2014
|RHI625214|Two or More Races, percent, 2014
|RHI725214|Hispanic or Latino, percent, 2014
|RHI825214|White alone, not Hispanic or Latino, percent, 2014
|POP715213|Living in same house 1 year & over, percent, 2009-2013
|POP645213|Foreign born persons, percent, 2009-2013
|POP815213|Language other than English spoken at home, pct age 5+, 2009-2013
|EDU635213|High school graduate or higher, percent of persons age 25+, 2009-2013
|EDU685213|Bachelor's degree or higher, percent of persons age 25+, 2009-2013
|VET605213|Veterans, 2009-2013
|LFE305213|Mean travel time to work (minutes), workers age 16+, 2009-2013
|HSG010214|Housing units, 2014
|HSG445213|Homeownership rate, 2009-2013
|HSG096213|Housing units in multi-unit structures, percent, 2009-2013
|HSG495213|Median value of owner-occupied housing units, 2009-2013
|HSD410213|Households, 2009-2013
|HSD310213|Persons per household, 2009-2013
|INC910213|Per capita money income in past 12 months (2013 dollars), 2009-2013
|INC110213|Median household income, 2009-2013
|PVY020213|Persons below poverty level, percent, 2009-2013
|BZA010213|Private nonfarm establishments, 2013
|BZA110213|Private nonfarm employment, 2013
|BZA115213|Private nonfarm employment, percent change, 2012-2013
|NES010213|Nonemployer establishments, 2013
|SBO001207|Total number of firms, 2007
|SBO315207|Black-owned firms, percent, 2007
|SBO115207|American Indian- and Alaska Native-owned firms, percent, 2007
|SBO215207|Asian-owned firms, percent, 2007
|SBO515207|Native Hawaiian- and Other Pacific Islander-owned firms, percent, 2007
|SBO415207|Hispanic-owned firms, percent, 2007
|SBO015207|Women-owned firms, percent, 2007
|MAN450207|Manufacturers shipments, 2007 (\$1,000)
|WTN220207|Merchant wholesaler sales, 2007 (\$1,000)
|RTN130207|Retail sales, 2007 (\$1,000)
|RTN131207|Retail sales per capita, 2007
|AFN120207|Accommodation and food services sales, 2007 (\$1,000)
|BPS030214|Building permits, 2014
|LND110210|Land area in square miles, 2010
|POP060210|Population per square mile, 2010
|Demvotes16|Votes for Democratic candidate in 2016 presidential election
|GOPvotes16|Votes for Republican candidate in 2016 presidential election
|total\_2016|Total number of votes cast in 2016 presidential election
|pct\_dem\_16|Votes for Democratic candidate as percent of total votes
|pct\_gop\_16|Votes for Republican candidate as percent of total votes
|diff\_2016|Difference between the number of votes for Republican and Democratic candidates
|pct\_pt\_16|The number in diff\_2016 expressed as a percent of the total votes. Negative if fewer votes were cast for the Democratic candidate
|total\_2012|Total number of votes cast in 2012 presidential election
|Demvotes12|Votes for Democratic candidate as percent of total votes
|GOPvotes12|Votes for Republican candidate as percent of total votes
|pct\_dem\_12|Votes for Democratic candidate as percent of total votes
|pct\_gop\_12|Votes for Republican candidate as percent of total votes
|diff\_2012|Difference between the number of votes for Republican and Democratic candidates
|pct\_pt\_12|The number in diff\_2012 expressed as a percent of the total votes. Negative if fewer votes were cast for the Democratic candidate|

Prepared by [Center for Spatial Data Science](http://www.spatial.uchicago.edu).

Updated July 10, 2017
