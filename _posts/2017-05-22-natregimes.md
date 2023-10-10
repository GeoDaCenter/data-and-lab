---
layout: post
title: "Homicides + Socio-Economics (1960-90)"
date: 2017-07-18 16:10:16
image: /assets/img/
description:
main-class: 'crime'
color:
tags:
- crime
- polygons
- space-time
- 500-5,000
- larger areas
- ESDA
- regression
- research
- Census
categories:
twitter_text:
introduction: "Homicides and selected socio-economic characteristics for continental U.S. counties (1960-1990). "
---
<div id="root" data-geojson="../data/natregimes.geojson"></div>

<br>


[DOWNLOAD DATA](../data/natregimes.zip)


Homicides and selected socio-economic characteristics for continental U.S. counties. Data for four decennial census years: 1960, 1970, 1980 and 1990.

* Observations = 3,085
* Variables = 73
* Projection: unprojected, lat-lon


**Source:** S. Messner, L. Anselin, D. Hawkins, G. Deane, S. Tolnay, R. Baller (2000). An Atlas of the Spatial Patterning of County-Level Homicide, 1960-1990. Pittsburgh, PA, [National Consortium on Violence Research (NCOVR)](http://www.ncovr.heinz.cmu.edu/).

**Reference:** Baller, R., L. Anselin, S. Messner, G. Deane and D. Hawkins (2001). Structural covariates of US county homicide rates: incorporating spatial effects. Criminology 39, 561-590.



| **Variable**                         |**Description**                       |
|---|---|
| NAME                                 | county name                          |
| STATE\_NAME                          | state name                           |
| STATE\_FIPS                          | state fips code (character)          |
| CNTY\_FIPS                           | county fips code (character)         |
| FIPS                                 | combined state and county fips code (character)                            |
| STFIPS                               | state fips code (numeric)            |
| COFIPS                               | county fips code (numeric)           |
| FIPSNO                               | fips code as numeric variable        |
| SOUTH                                | dummy variable for Southern counties  (South = 1)                          |
| HR\*\*                               | homicide rate per 100,000 (1960,     1970, 1980, 1990)                     |
| HC\*\*                               | homicide count, three year average centered on 1960, 1970, 1980, 1990      |
| PO\*\*                               | county population, 1960, 1970, 1980, 1990                                  |
| RD\*\*                               | resource deprivation 1960, 1970,     1980, 1990 (principal component, see  Codebook for details)|
| PS\*\*                               | population structure 1960, 1970,     1980, 1990 (principal component, see Codebook for details) |
| UE\*\*                               | unemployment rate 1960, 1970, 1980,   1990                                 |
| DV\*\*                               | divorce rate 1960, 1970, 1980, 1990  (% males over 14 divorced)            |
| MA\*\*                               | median age 1960, 1970, 1980, 1990                                          |
| POL\*\*                              | log of population 1960, 1970, 1980,   1990                                 |
| DNL\*\*                              | log of population density 1960,   1970, 1980, 1990                         |
| MFIL\*\*                             | log of median family income 1960,     1970, 1980, 1990                     |
| FP\*\*                               | % families below poverty 1960, 1970, 1980, 1990 (see Codebook for details) |
| BLK\*\*                              | % black 1960, 1970, 1980, 1990                                             |
| GI\*\*                               | Gini index of family income           inequality 1960, 1970, 1980, 1990    |
| FH\*\*                               | % female headed households 1960,      1970, 1980, 1990                     |
| WEST                                 | West region dummy                                                          |


Prepared by Luc Anselin. Last updated October 4, 2003. Data provided "as is," no warranties.