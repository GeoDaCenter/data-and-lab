---
layout: post
title: 'Chicago Carjackings'
date: 2023-10-11 12:29:00
image: /assets/img/
description:
main-class: 'textbook'
color:
tags:
  - points
  - 5,000+
  - textbook
  - ESDA
  - open data
categories:
twitter_text:
geojson: '../data/Chi_Carjackings.geojson'
introduction: 'Point locations of carjackings in Chicago, 2001-2022'
---

[DOWNLOAD DATA](../data/Chi_Carjackings.zip)

Point locations of carjackings (vehicular hijackings) in Chicago, IL, 2001-2022.

Source: Chicago Open Data Portal

- Observations = 18,546 (18,405 with coordinates)
- Variables = 22 in the CSV, 16 in the shapefile and GeoJSON
- Years = 2001-2022 (2022 partial)

The download contains the same incidents in two formats:

- `Chicago_Carjackings.shp` (with `.shx`, `.dbf`, `.prj`) and `Chicago_Carjackings.geojson`: 18,405 geocoded incidents as points, 16 variables.
- `Chicago_carjackings.csv`: all 18,546 incidents, 22 variables. The 141 incidents the police department never geocoded (coordinates recorded as `NA`) are in this file only.

**Overview of data**

|**Variable**|**Description**|
|---|---|
|ID|unique identifier|
|Case _mber|case number|
|Date|date of incident|
|IUCR|Illinois Uniform Crime Reporting code (325 = vehicular hijacking, 326 = aggravated vehicular hijacking)|
|Descr_tion|incident description|
|Locat_tion|type of location (e.g., street, gas station)|
|Beat|Police beat code|
|District|Police district code|
|Ward|Ward code|
|Commu_Area|Community area code|
|FBI Code|FBI uniform crime reporting code|
|X Coo_nate|X coordinates (projected NAD83 Illinois State Plane East, US survey feet, EPSG:3435)|
|Y Coo_nate|Y coordinates (projected NAD83 Illinois State Plane East, US survey feet, EPSG:3435)|
|Latitude|Latitude in decimal degrees|
|Longitude|Longitude in decimal degrees|
|Year|year of incident|

The CSV keeps the field names used by the Chicago Data Portal (`Case Number`, `Day`, `Description`, `Location Description`, `Community Area`, `X Coordinate`, `Y Coordinate`). It also contains `Block`, `Primary Type`, `Arrest`, `Domestic`, `Updated On` and `Location`, which are not carried in the shapefile and GeoJSON. See `carjacking_variables.xlsx` in the download for the full list of both.

Prepared by ([Center for Spatial Data Science](https://spatial.uchicago.edu/)). Last updated Oct 31, 2026. Data provided "as is," no warranties.
