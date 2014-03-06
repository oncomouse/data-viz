var width = 960,
height = 500;

var color_domain = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]
var ext_color_domain = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]
var legend_labels = ["< 500", "500+", "1000+", "1500+", "2000+", "2500+", "3000+", "3500+", "4000+", "4500+", "5000+", "5500+", "6000+"]
 
var color = d3.scale.threshold()
     .domain(color_domain)
     .range(["#dcdcdc", "#d0d6cd", "#bdc9be", "#aabdaf", "#97b0a0", "#84a491", "#719782", "#5e8b73", "#4b7e64", "#387255", "#256546", "#125937", "#004d28"]);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("margin", "10px auto");

var path = d3.geo.path();

queue()
	.defer(d3.json, "data/us.json")
	.defer(d3.csv, "data/data.csv")
	.await(ready);



function ready(error, us, data) {
	var pairRateWithId = {};
	var pairNameWithId = {};
	
    var zoom = d3.behavior.zoom()
		.translate([0, 0])
		.scale(1)
		.scaleExtent([1, 2])
		.on("zoom", zoomed);

	var features = svg.append("g");
		
	data.forEach(function(d) {
		pairRateWithId[d.id] = +d.rate;
		pairNameWithId[d.id] = d.name;
	});
	
	features.selectAll("path")
		.data(topojson.feature(us, us.objects.counties).features)
		.enter().append("path")
		.attr("d", path)
		.attr("class", "county")
 		.style ( "fill" , function (d) {
			return color (pairRateWithId[d.id]);
		})
		.style("opacity", 0.8)
		.on("mouseover", function(d) {
			d3.select(this).transition().duration(300).style("opacity", 1);
			div.transition().duration(300)
				.style("opacity", 1);
			   
			div.text(pairNameWithId[d.id] + " : " + pairRateWithId[d.id])
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY -30) + "px");
		})
		.on("mouseout", function(d) {
			d3.select(this).transition().duration(300).style("opacity", 0.8);
			div.transition().duration(300)
				.style("opacity", 0);
		});
		
		svg.call(zoom);
		
		/*
		 * When we zoom in, attach a dblclick event to zoom back out.
		 * This seems to be the easiest way to implement double click to zoom
		 * in and out, while still having panning.
		 */
		function zoomed() {
			features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			if (d3.event.scale == 2) { // Don't attach this event unless we've zoomed all the way in.
				features.on("dblclick", function(d) {
					d3.event.stopPropagation();
					zoom.scale(1)
						.translate([0,0]);
					features.attr("transform", "translate(0,0)scale(1)")
						.on('dblclick', function(){});
				});
			} else {
				features.on('dblclick', function(){});
			}
		}
};

var legend = svg.selectAll("g.legend")
	.data(ext_color_domain)
	.enter().append("g")
	.attr("class", "legend");

var ls_w = 20, ls_h = 20;

legend.append("rect")
	.attr("x", 20)
	.attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
	.attr("width", ls_w)
	.attr("height", ls_h)
	.style("fill", function(d, i) { return color(d); })
	.style("opacity", 0.8);

legend.append("text")
	.attr("x", 50)
	.attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
	.text(function(d, i){ return legend_labels[i]; });