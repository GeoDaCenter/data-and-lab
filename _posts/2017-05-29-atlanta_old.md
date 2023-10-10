---
layout: post
title: "Atlanta Homicides 1980s-90s"
date: 2017-05-29 15:00:57
image: '/assets/img/'
description:
main-class: 'crime'
color:
tags:
- crime
- polygons
- rates
- space-time
- <500
- ESDA
- regression
- research
categories:
twitter_text:
introduction: '1980s-90s homicides and socio-economics in Atlanta, GA'
---
<div id="root" data-geojson="../data/atlanta.geojson"></div>

<br>



[DOWNLOAD DATA](../data/atlanta_hom.zip)


Homicides and selected socio-economic characteristics for counties surrounding Atlanta, GA. Data aggregated for three time periods: 1979-84 (steady decline in homicides), 1984-88 (stable period), and 1988-93 (steady increase in homicides). Download the file [here](../data/atlanta_hom.zip).

* Projection: unprojected, lat-lon
* Observations = 90
* Variables = 23
* Years 1980s-90s


**Source**
S. Messner, L. Anselin, D. Hawkins, G. Deane, S. Tolnay, R. Baller (2000). An Atlas of the Spatial Patterning of County-Level Homicide, 1960-1990. Pittsburgh, PA, [National Consortium on Violence Research (NCOVR)](https://www.nttac.org/index.cfm?event=projectDetails&id=339).

|**Variable**|**Description**|
|---|---|
|NAME | County name|
|STATE_NAME | State name|
|STATE_FIPS | State FIPS code (character)|
|CNTY_FIPS | County FIPS code (character)|
|FIPS | Combined state and county FIPS code (character)|
|STFIPS | State FIPS code |
|COFIPS | County FIPS code |
|FIPSNO | FIPS code as numeric variable|
|HR7983 | Homicide rate per 100,000 (1979-83)|
|HR8487 | Homicide rate per 100,000 (1984-87)|
|HR8895 | Homicide rate per 100,000 (1988-95)|
|HC7983 | Homicide count (1979-83)|
|HC8487 | Homicide count (1984-87)|
|HC8895 | Homicide count (1988-95)|
|PO7983 | Population total (1979-83)|
|PO8487 | Population total (1984-87)|
|PO8895 | Population total (1988-95)|
|PE77 | Police expenditures per capita, 1977|
|PE82 | Police expenditures per capita, 1982|
|PE87 | Police expenditures per capita, 1987|
|RDAC80 | Resource deprivation/affluence composite variable, 1980|
|RDAC85 | Resource deprivation/affluence composite variable, 1985|
|RDAC90 | Resource deprivation/affluence composite variable, 1990|

Prepared by Luc Anselin. Last updated September 10, 2004. Data provided "as is," no warranties.
