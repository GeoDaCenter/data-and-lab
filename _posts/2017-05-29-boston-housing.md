---
layout: post
title: "Boston Housing 1970s"
date: 2017-05-29 15:37:44
image: '/assets/img/'
description:
main-class: 'housing'
color:
tags:
- housing
- points
- 500-5,000
- regression
- research
- csv/txt
categories:
twitter_text:
introduction: 'Boston data for hedonic house price modeling (1970s).'
---

[DOWNLOAD DATA](../data/boston.zip)


Housing and neighborhood data for the city of Boston based on research from the 1970s-90s.

* Point shapefile
* Observations = 506
* Variables = 23
* Years = 1970s

**Data overview**

|**Variable**|**Description**|
|----|----|
|ID | Sequential ID|
|TOWN | A factor with levels given by town names|
|TOWNNO | A numeric vector corresponding to TOWN|
|TRACT | A numeric vector of tract ID numbers|
|LON | A numeric vector of tract point longitudes in decimal degrees|
|LAT | A numeric vector of tract point latitudes in decimal degrees|
|X | X Coordinates (UTM Zone 19)|
|Y | Y Coordinates (UTM Zone 19)|
|MEDV | A numeric vector of median values of owner-occupied housing in USD 1000|
|CMEDV | A numeric vector of corrected median values of owner-occupied housing in USD 1000|
|CRIM | A numeric vector of per capita crime|
|ZN | A numeric vector of proportions of residential land zoned for lots over 25000 sq. ft per town (constant for all Boston tracts)|
|INDUS | A numeric vector of proportions of non-retail business acres per town (constant for all Boston tracts)|
|CHAS | A factor with levels 1 if tract borders Charles River; 0 otherwise|
|NOX | A numeric vector of nitric oxides concentration (parts per 10 million) per town|
|RM | A numeric vector of average numbers of rooms per dwelling|
|AGE | A numeric vector of proportions of owner-occupied units built prior to 1940|
|DIS | A numeric vector of weighted distances to five Boston employment centers|
|RAD | A numeric vector of an index of accessibility to radial highways per town (constant for all Boston tracts)|
|TAX | A numeric vector full-value property-tax rate per USD 10,000 per town (constant for all Boston tracts)|
|PTRATIO | A numeric vector of pupil-teacher ratios per town (constant for all Boston tracts)|
|B | A numeric vector of 1000*(Bk - 0.63)^2 where Bk is the proportion of blacks|
|LSTAT | A numeric vector of percentage values of lower status population|

**Source**
Data created from boston.c data frame in R's spdep package. Original source: [http://lib.stat.cmu.edu/datasets/boston_corrected.txt](http://lib.stat.cmu.edu/datasets/boston_corrected.txt)
Variables and References: R spdep Manual (p. 15), available at [http://cran.us.r-project.org](http://cran.us.r-project.org)

Download the file [here](../data/boston.zip).

**References**
Harrison, David, and Daniel L. Rubinfeld. (1978). Hedonic Housing Prices and the Demand for Clean Air, Journal of Environmental Economics and Management, Volume 5, 81- 102. Original data.

Gilley, O.W., and R. Kelley Pace. (1996). On the Harrison and Rubinfeld Data, Journal of Environmental Economics and Management, 31, 403-405. Provided corrections and examined censoring.

Pace, R. Kelley, and O.W. Gilley. (1997). Using the Spatial Configuration of the Data to Improve Estimation, Journal of the Real Estate Finance and Economics, 14, 333-340.

**Notes**
In R, use library(MASS) and write.matrix (frame or matrix name, file="output file",sep=",") to write data frames or matrices to a file.

* * * * *
Prepared by Luc Anselin. Last updated June 3, 2004. Data provided "as is," no warranties.
