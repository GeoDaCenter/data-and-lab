---
layout: post
title: "2008 Cincinnati Crime + Socio-Demographics"
date: 2017-07-18 16:45:16
image: /assets/img/
description:
main-class: 'crime'
color:
tags:
- crime
- polygons
- rates
- <500
- ESDA
- research
- Anselin lab
categories:
twitter_text:
introduction: "Crime and socio-demographics data for the Clifton, Walnut Hills, Evanston, and Avondale neighborhoods in Cincinnati, OH for 08-12/2008."
---
<div id="root" data-geojson="../data/walnut_hills.geojson"></div>

<br>




[DOWNLOAD DATA](../data/walnuthills_updated.zip)

Crime and socio-demographic data for the Clifton, Walnut Hills, Evanston, and Avondale neighborhoods in Cincinnati, OH for the last 6 months of 2008. From Grubesic, T, R. Wei and A. Murray (2014). [Spatial clustering overview and comparison: accuracy, sensitivity and computational expense.](http://www.tandfonline.com/doi/full/10.1080/00045608.2014.958389) Annals, Association of American Geographers 104, 1134-1156.


* Variables = 89
* Observations = 457
* Year = 2008


|**Variable**|**Description**|
|:-------|:----------|
|	ID	|	Polygon ID	|
|	AREA	|	Polygon area	|
|	BLOCK	|	Census block ID	|
|	BG	|	Census block group ID	|
|	TRACT	|	Census tract ID	|
|	COUNTY	|	5 digit code for the county (Hamilton County, Ohio). Not to be confused with zip code	|
|	MSA	|	 Metropolitan statistical area ID	|
|	POPULATION	|	Population on the block	|
|	MALE, FEMALE	|	Population on the block broken down by gender	|
|	AGE_X_Y	|	Population on the block broken down by age (From X to Y)	|
|	MEDIAN_AGE	|	Median age on the block	|
|	AGE_X	|	Population aged X and over	|
|	MALE_X	|	Male population aged X and over	|
|	FEMALE_X	|	Female population aged X and over	|
|	F1_RACE	|	Number of people who marked a race on the survey	|
|	WHITE	|	White population	|
|	BLACK 	|	Black population	|
|	AMINDIAN	|	American Indian population	|
|	ASIAN	|	Asian population	|
|	HAWAIIAN	|	Hawaiian population	|
|	OTHER_RACE	|	Population self-identified as other race (non white, black, asian or hawaiian)	|
|	F2_RACES	|	Number of people who did not mark any race on the survey	|
|	AP_WHITE	|	Adjusted white population	|
|	AP_BLACK	|	Adjusted black population	|
|	AP_AMINDIA	|	Adjusted American Indian population	|
|	AP_ASIAN	|	Adjusted Asian population	|
|	AP_HAWAIIA	|	Adjusted Hawaiian population	|
|	AP_OTHER	|	Adjusted other-race population	|
|	AP_HISPANI, NOT_HISPAN	|	Population breakdown by Hispanic and Non-Hispanic	|
|	NH_WHITE	|	Non-Hispanic white population	|
|	IN_HOUSEHO	|	Population living in households	|
|	GROUP_QUAR	|	Population living in group quarters instead of traditional households	|
|	GQ_INSTU, GQ_NONINST	|	Institutional population	|
|	GQ_INSTU, GQ_NONINST	|	Non-institutional population	|
|	HOUSEHOLDS	|	Number of households	|
|	HH_FAMILY	|	Number of family households	|
|	HH_NONFAMI	|	Number of non family households	|
|	AVG_HHSIZE	|	Average household size	|
|	AVG_FAMSIZ	|	Average family size	|
|	HSNG_UNITS	|	Number of housing units	|
|	HU_OCCUPIE  }{	|	Number of housing units occupied	|
|	HU_VACANT	|	Number of housing units vacant	|
|	OCCHU_OWNE	|	Occupied housing units (owner occupied)	|
|	OCCHU_RENT	|	Occupied housing units (renter occupied)	|
|	OWNER_SIZE	|	Average household size of owner occupied housing units	|
|	RENTER_SIZ	|	Average household size of renter occupied housing units	|
|	DENSITY	|	Population density	|
|	BURGLARY	|	Counts of burglary	|
|	ASSAULT	|	Counts of assault	|
|	THEFT	|	Counts of theft	|
|	BURG_D	|	Burglary dummy: ‘1’ if there is at least 1 incident, ‘0’ otherwise	|
|	ASSALT_D	|	Assault dummy: ‘1’ if there is at least 1 incident, ‘0’ otherwise	|
|	THEFT_D	|	Theft dummy: ‘1’ if there is at least 1 incident, ‘0’ otherwise	|


Prepared by ([Center for Spatial Data Science](https://spatial.uchicago.edu/))
Last updated July 6, 2017. Data provided "as is," no warranties.
