---
layout: dataset             # don't change this
name: "FIXME"               # one-word reference name for dataset, all lowercase and underscores, e.g. "columbus"
title: "FIXME"              # title of dataset, e.g "Columbus Crime 1980"
introduction: "FIXME"       # one-sentence description of dataset, e.g. "Crime and neighborhood data for 49 neighborhoods in Columbus, OH, 1980."
description: "FIXME"        # multiple-sentence description of dataset, e.g. "Crime, housing and income data for 49 neighborhoods in Columbus, OH, 1980. Textbook example."
download_link: "FIXME"      # URL of link to download dataset, e.g. "../data/columbus.zip"

observations: FIXME         # a number, e.g. 49; a boxed, comma-separated list if multiple datasets, e.g. [49, 100]
variables: FIXME            # a number, e.g. 20; a boxed, comma-separated list if multiple datasets, e.g. [20, 25]
start_date: FIXME           # date in yyyy/mm/dd of start of data, e.g. 1980-01-01
end_date: FIXME             # date in yyyy/mm/dd of end of data, e.g. 1980-01-01, same as above if single period
spatial_structure: "FIXME"  # most often, "Point" or "Polygon"
spatial_unit: "FIXME"       # short description of the smallest spatial unit, e.g. "City neighborhood", "Census block", "House sale"

source: ["FIXME"]           # boxed, comma-separated list of citation(s) of publication(s) from which this dataset originates, e.g. ["Anselin, Luc (1988). Spatial Econometrics. Boston, Kluwer Academic, Table 12.1, p. 189.", ""]
reference: ["FIXME"]        # boxed, comma-separated list of citations(s) of publication(s) that reference this dataset

csv_name: "FIXME"           # the name of the csv with the data dictionary (without the .csv extension), e.g. "columbus"; this csv is stored in the _data folder
prepared_by: "FIXME"        # the name of the person or organization who prepared the data, e.g. "CSDS", "Luc Anselin"
updated: FIXME              # date in yyyy/mm/dd of last updated date, e.g. 2003-06-16
license: "FIXME"            # license/disclaimers for the data, e.g. "Data provided “as is,” no warranties."

used_in: ["FIXME"]          # boxed, comma-separated list of CSDS resources using this dataset, e.g. ["GeoDa Sample Data", "Introduction to Spatial Data Science labs"]
use_case: "FIXME"           # short description of use case for dataset, e.g. "Spatial hedonic regression"
main-class: "FIXME"         # Main tag for dataset, e.g. "crime". Will show up on website under this category
tags: ["FIXME", "FIXME"]    # Secondary tags for data, including the main tag, e.g. ["crime", "polygons", "<500", "smaller areas", "ESDA", "textbook"].
---

{% comment %}
Please do not edit any of the following code, which creates a templated dataset
documentation webpage from the above information block. You should change only 
the parts that are labeled FIXME.
{% endcomment %}

<span class="download">[DOWNLOAD DATA]({{ page.download_link }})</span>

<p class="description">{{ page.description }}</p>

* Observations = <span class="observations">{{ page.observations }}</span>

* Variables = <span class="variables">{{ page.variables }}</span>

{% if page.start_date == page.end_date %}
* Date = <span class="start_date">{{ page.start_date }} </span>
{% elsif page.start_date != page.end_date %}
* Date Range = <span class="start_date">{{ page.start_date }}</span> to <span class="end_date">{{ page.end_date }}</span>
{% endif %}

{% if page.source %}
**Source**
<p class="source">{{ page.source }}</p>
{% endif %}

{% if page.reference %}
**Reference**
<p class="reference">{{ page.reference }}</p>
{% endif %}

<table class="datadict">
  <thead>
    <tr>
      <th style="text-align: left">Variable</th>
      <th style="text-align: left">Description</th>
    </tr>
  </thead>
  <tbody>
{% for var in site.data[page.csv_name] %}
    <tr>
      <td class="var" style="text-align: left">{{ var.Variable }}</td>
      <td class ="desc" style="text-align: left">{{ var.Description }}</td>
    </tr>
{% endfor %}
  </tbody>
</table>

Prepared by <span class="prepared">{{ page.prepared_by }}</span>. Last updated <span class="updated">{{ page.updated }}</span>. <span class="license">{{ page.license }}</span>
