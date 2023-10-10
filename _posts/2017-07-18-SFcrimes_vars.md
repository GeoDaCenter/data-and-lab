---
layout: post
title: "San Francisco Crime Incidents (2012)"
date: 2017-07-18 16:52:16
image: /assets/img/
description:
main-class: 'crime'
color:
tags:
- crime
- points
- 500-5,000
- ESDA
- open data
- Anselin lab
categories:
twitter_text:
introduction: "Incidents of robberies, drugs/narcotics possession or sale, vehicle theft, and vandalism in San Francisco (06-12/2012)."
---
<div id="root" data-geojson="../data/SFcartheft_july12.geojson"></div>

<br>



[DOWNLOAD DATA](../data/SFCrime_July_Dec2012.zip)

Incidents of robberies, drugs/narcotics possession or sale, vehicle theft, and vandalism for July 1 to December 31, 2012. Sources: 2010 Census (population) and ["Crime Incidents from 1 Jan 2003", City of San Francisco Open Data Portal](https://data.sfgov.org/Public-Safety/Map-Crime-Incidents-from-1-Jan-2003/gxxq-x39z) (crimes).

* Year = 2012

**Car thefts:**
* Observations = 3,384
* Variables = 13

**Drugs:**
* Observations = 3,897
* Variables = 13

**Robberies:**
* Observations = 2,761
* Variables = 13

**Vandalism:**
* Observations = 3,430
* Variables = 13

**Data Source:** 
San Francisco Police Department Crime Incident Reporting System. Retrieved from: [http://www.sfgov.org](http://www.sfgov.org). Crime Incidents source: [https://data.sfgov.org/Public-Safety/Crime-Incidents/snsg-xkfg](https://data.sfgov.org/Public-Safety/Crime-Incidents/snsg-xkfg). SFPD Plots source: [https://data.sfgov.org/Public-Safety/SFPD-Crime-Reporting-Plots-Zipped-Shapefile-Format/5aii-qc4e](https://data.sfgov.org/Public-Safety/SFPD-Crime-Reporting-Plots-Zipped-Shapefile-Format/5aii-qc4e)

**License:**
* Creative Commons license (CC0 1.0 Universal). [http://creativecommons.org/publicdomain/zero/1.0/legalcode](http://creativecommons.org/publicdomain/zero/1.0/legalcode)

**Data Extracted on January 10, 2013:**
* Incidents of robberies, drugs/narcotics possession or sale, vehicle theft, and vandalism for July 1 to December 31, 2012 (4 separate point shapefiles).
* One polygons shapefile for SFPD reporting plots that these data were aggregated to.

**Projection:**

Projected Coordinate System:	NAD_1983_StatePlane_California_III_FIPS_0403_Feet
Projection:	Lambert_Conformal_Conic
False_Easting:	6561666.66666667
False_Northing:	1640416.66666667
Central_Meridian:	-120.50000000
Standard_Parallel_1:	37.06666667
Standard_Parallel_2:	38.43333333
Latitude_Of_Origin:	36.50000000
Linear Unit: 	Foot_US

Geographic Coordinate System:	GCS_North_American_1983
Datum: 	D_North_American_1983
Prime Meridian: 	Greenwich
Angular Unit: 	Degree

| **Variable** | **Description** |
|--
|	IncidntNum	|	Unique identifier for each incident report	|
|	X_pr	|	Projected X-coordinates	|
|	Y_pr	|	Projected Y-coordinates	|
|	Category	|	Crime classification (robberies, drugs/narcotics possession or sale, vehicle theft, and vandalism)	|
|	Descript	|	Description of the crime	|
|	DayOfWeek	|	Day of the week that crime was reported	|
|	Date	|	Date of the report	|
|	Time	|	Time of report	|
|	PdDistrict	|	Police district	|
|	Resolution	|	Outcome of the report, e.g. None, Arrest, Unfounded, etc	|
|	Location	|	Street address where the crime occurred	|
|	X	|	X-Coordinates of crime location	|
|	Y	|	Y-Coordinates of crime location	|


Prepared by ([Center for Spatial Data Science](https://spatial.uchicago.edu/))
Last updated July 3, 2017. Data provided "as is," no warranties.
