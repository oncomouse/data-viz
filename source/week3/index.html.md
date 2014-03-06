---
title: "Data Viz: Week 3 Notes"
---

# Week 3

**[<< Back to Main Page](..)**

## Making GeoJSON

Making GeoJSON is trickier than I thought. I downloaded some .SHP files from [Bytes of the Big Apple](http://www.nyc.gov/html/dcp/html/bytes/dwndistricts.shtml), and converted them to [TopoJSON](https://github.com/mbostock/topojson) using [every tutorial on the Internet](http://bost.ocks.org/mike/map/). It did not produce happy results (browser crashes, black boxes, noise, etc.).

I found another project that on [GitHub](http://github.com) that was using the same dataset as I was. I downloaded [their GeoJSON](https://raw.github.com/abmagil/manhattan/master/manhattan_testbed/public/javascripts/nybb.geojson). Comparing my GeoJSON to theirs, I knew something was off with the conversion from the .SHP file. Googling around, I found a [tutorial on converting Shape files to GeoJSON for GitHub](http://ben.balter.com/2013/06/26/how-to-convert-shapefiles-to-geojson-for-use-on-github/). It turns out ogr2ogr was [producing wacky coordinates](data/nybb_13a/nybb-geo.json) because I wasn't providing it with the proper projection information (I don't know exactly what this means; or even if this is totally what is happening). Based on the tutorial, however, the actual command to convert Shape to GeoJSON for D3 is:

~~~ bash
$ ogr2ogr -f GeoJSON -t_srs crs:84 [name].geojson [name].shp
~~~

The ```-t_srs crs:84``` is a kind of Mercator projection and, anyway, it made a GeoJSON file that rendered in D3 and converted to working Topojson. Also, I'm learning a little more about working with these tools. I was able to properly convert to working TopoJSON using the following command:

~~~ bash
$ topojson --id-property BoroCode -p name=BoroName -p name -o nybb.json nybb-geo.json
~~~

Fun times!

## Stuff I Made

* Working with [Michael's tutorial](http://suffenus.wordpress.com/2014/01/07/making-interactive-maps-with-d3-for-total-beginners/), I made [this page](us.html)
	* Then I learned how to use ```d3.behavior.zoom()``` to make it zoom.
* Working through [this tutorial](http://bost.ocks.org/mike/map/), I made [this map of the UK](uk.html).
* Finally, on my own, I drew [New York City](boroughs.html), in [two ways](council.html).

There's also this, though:

### NYC Boroughs

<script src="https://embed.github.com/view/geojson/oncomouse/data-viz/master/source/week3/data/nybb.json"></script>

### NYC City Council Districts

<script src="https://embed.github.com/view/geojson/oncomouse/data-viz/master/source/week3/data/nycc.json"></script>

## Cool Stuff


![Visualizing the Anthropocene](http://imgs.xkcd.com/comics/land_mammals.png)