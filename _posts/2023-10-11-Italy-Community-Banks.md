---
layout: post
title: 'Italy Community Banks'
date: 2023-10-11 11:46:00
image: /assets/img/
description:
main-class: 'textbook'
color:
tags:
  - development
  - points 
  - <500
  - textbook
  - ESDA
  - open data
categories:
twitter_text:
introduction: 'Italy community bank performance indicators for 2011-17'
---
<div id="root" data-geojson="../data/italy_banks.geojson"></div>

<br>

[DOWNLOAD DATA](../data/italy_banks.zip)

Italy Banks Data Dictionary
 
Source: Algeri et al (2022). Spatial dependence in the technical efficiency of local banks. Papers in Regional Science 101, 385-416.
 
Italy_banks.shp – 261 points in UTM zone 32, no Sardinia or Elba
 
- Observations = 261
- Variables = 96
- Years = 2011-2017

**Overview of data**

|**Variable**|**Description**|
|---|---|
|Idd|bank ID|
|BankName|name of the bank|
|City|city name|
|latitud|latitude|
|longitud|longitude|
|COORD_X|coordinates from UTM|
|XKM|coordinates in km (COORD_X/1000)|
|COORD_Y|coordinates from UTM|
|YKM|coordinates in km (COORD_Y/1000)|
|ID|same ID for work purposes|
|IDN|ID of nearest neighbor|
|distnn|distance to nearest neighbor|
|REGCODE|region code|
|REGNAME|region name|
|PROVCODE|province code|
|PROVNAME|province name|
|COMCODE|commune code|
|TE_IN_11|score_input_vrs_2011 to 2017: Farrel input-based technical efficiency using VRS|
|TE_OUT_11|score_output_vrs_2011 to 2017: Farrell output-based technical efficiency using VRS|
|CAPRAT11|totalcapitalratio2011: (Tier 1 Capital + Tier 2 Capital) / Risk weighted assets|
|Z_11/17|zscore12011: (ROA + Leverage)/ σ (ROA)|
|LIQASS_11/17|liq_ta_w2011: Liquid asset/ Total asset|
|NPLl_11/17|assetquality_w2011: Non- performing loans/ Total gross loans|
|LLP_11/17|allow_w2011: Loan loss provisions / Customer loans|
|INTR_11/17|inexptofunds_w2011: Interest expense/ Total funds|
|DEPO_11/17|deposit_ta_w2011: Total deposits/ Total asset|
|EQLN_11/17|equity_loan_w2011: Total equity/ Customer loan|
|SERV_11/17|service_w2011: Net interest income /Total operating revenues|
|EXPE_11/17|operexp_ta_w2011: Operating expenses / Total assets|

Prepared by ([Center for Spatial Data Science](https://spatial.uchicago.edu/)). Last updated Oct 11, 2023. Data provided "as is," no warranties.
