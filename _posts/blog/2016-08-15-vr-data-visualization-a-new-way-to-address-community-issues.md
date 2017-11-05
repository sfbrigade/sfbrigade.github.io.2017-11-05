---
layout: blog
author: allen_meyer
published: true
title: 'VR Data Visualization: A New Way to Address Community Issues'
tags: ''
---

A San Francisco Brigade team has been partnering with SFHIP for almost a year now on a data visualization project that looks at alcohol licenses in San Francisco, specifically those establishments that sell alcohol to be sold off premise. Before any mapping or visualization could happened, SFHIP reached out to community advocates to find out first hand how the easy access to alcohol was impacting their communities. SFHIP lead community focus discussions in three SF neighborhoods, Bayview, Tenderloin and the Mission. SF Brigade members participated in these community listening sessions and helped SFHIP distill the findings using user centered design principles.

Brigade member David Rust-Smith created the following map which shows the density of establishments selling alcohol to be consumed offsite in the Mission, Bay, and Tenderloin neighborhoods: http://davidrs.github.io/sfhip-map/. 

While the community research took several months, the map was completed in just a couple of hack nights thanks to a tightly scoped set of features, a simple design, and awesome open source tools. The [dataset](https://github.com/davidrs/sfhip-map/blob/master/data/abc_map_2016.csv) is very small: ten columns and two hundred rows, so a backend database or API was unnecessary. All the data could just be loaded as a [csv file](https://github.com/davidrs/sfhip-map/blob/master/data/abc_map_2016.csv) and parsed with [D3.js](https://github.com/d3/d3/wiki/CSV). Not having a database meant fancy hosting wasn’t necessary—free and scalable hosting with GitHub pages made things nice and simple. It also meant all code could be written by one frontend developer in JavaScript. For the map [Leaflet.js](http://leafletjs.com/), the go-to open source mapping library, was used. Leaflet has lots of great examples out there, which made writing the [choropleth](http://leafletjs.com/examples/choropleth.html) (fancy map term for coloured areas) just a couple of minutes of work.

David then teamed up with Nick Breen and decided to take the data and see how it would look in VR. The difference from a 2-d map and VR visualization is dramatic as one watches a city within the city rise up to sell alcohol. One can see how concentrated the establishments are in the Bayview, Tenderloin and Mission neighborhoods: [Click here to watch the video](https://www.youtube.com/embed/videoseries?list=PLXYeZ3VwLuLsYzMd9unp7_Ig_GJsjh3J8). 


These clips are YouTube’s 360 videos, so only a smartphone is needed to experience them, making it accessible to many more people than full VR kits. If you would like to learn more about the process behind how the map was made, or turn your own CSV into a 360 video, then checkout the [GitHub repo](https://github.com/davidrs/vr-dataviz).

Team Members: Steven Meloan, [Allen Meyer](http://allenmeyerdesign.com/), Peter Thompson, Seung-hee Eu, David Rust-Smith, Nick Breen
