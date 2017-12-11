
/*
 * RadarVis - Object constructor function
 * @param _parentElement: HTML element for the visualization
 * @param _data: the actual data
 */

RadarVis = function(_parentElement, _data, _dataNormalized){
    this.parentElement = _parentElement;
    this.data = _data;
    this.data_norm = _dataNormalized;
    this.filteredData = this.data;

    this.initVis();
};

RadarVis.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 20, right: 20, bottom: 20, left: 20 };

    vis.width = 475 - vis.margin.left - vis.margin.right,
        vis.height = 500 - vis.margin.top - vis.margin.bottom;
    
    // visual settings
    vis.configs = {
      w: vis.width,
      h: vis.height,
      maxValue: 0.6,
      levels: 5,
      ExtraWidthX: 300
    };
    
    // color scale
    vis.colorscale = d3.scaleOrdinal(d3.schemeCategory10);
    
    this.wrangleData();
};

RadarVis.prototype.wrangleData = function(){
    var vis = this;
    
    vis.displaydata = [];
    
    // display data for the radarchart
    for(var key in vis.data_norm) {
        vis.displaydata.push([{school: vis.data[key].school, axis: "Student Body", value: vis.data_norm[key].student_body, label: vis.data[key].student_body}, 
                         {school: vis.data[key].school, axis: "Tutition Cost", value: vis.data_norm[key].tuition, label: "$" + vis.data[key].tuition}, 
                         {school: vis.data[key].school, axis: "Acceptance Rate", value: vis.data_norm[key].acceptance_rate, label: vis.data[key].acceptance_rate + "%"},
                         {school: vis.data[key].school, axis: "Students in School Housing", value: vis.data_norm[key].student_housing, label: vis.data[key].student_housing + "%"},
                         {school: vis.data[key].school, axis: "Athletics", value: vis.data_norm[key].athletics, label: vis.data[key].athletics + "%"},
                         {school: vis.data[key].school, axis: "Median Family Income", value: vis.data_norm[key].median_family_income, label: "$" +  vis.data[key].median_family_income}
                        ])
    };
        
    // label data for the axes 
    vis.axisdata = {};
    
    // initialize array
    for(var key in vis.data) {
        for (var prop in vis.data[key]) {
                vis.axisdata[prop] = 0
            }
        }
    
    // take maximum value for each property 
    for(var key in vis.data) {
        for (var prop in vis.data[key]) {
            if (vis.data[key][prop] >= vis.axisdata[prop]) {
                vis.axisdata[prop] = vis.data[key][prop]
            }
        }
    }

    // delete school category
    delete vis.axisdata.school; 
    delete vis.axisdata.top_20_percent; 
    
    console.log(vis.axisdata)
    
    this.updateVis();

};

RadarVis.prototype.updateVis = function(){
    var vis = this;
    
    // draw radar chart
    RadarChart.draw("#" + vis.parentElement, vis.displaydata, vis.axisdata, vis.configs);

    // create legend
    // draw legend svg
    vis.svg = d3.select("#radarvis")
	.selectAll('svg')
	.append('svg')
	.attr("width", vis.width + 500)
	.attr("height", vis.height);
    
    vis.radarlegend = vis.svg.append("g")
    .attr("class", "radarlegend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(80,20)');
    
    // create rects of corresponding color
	vis.radarlegend.selectAll("rect")
	  .data(Object.keys(vis.data))
	  .enter()
	  .append("rect")
	  .attr("x", vis.width - 105)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return vis.colorscale(i);});
    
    console.log(Object.keys(vis.data));
    
    // create text labels for legend
	vis.radarlegend.selectAll("text")
	  .data(Object.keys(vis.data))
	  .enter()
	  .append("text")
	  .attr("x", vis.width - 70)
	  .attr("y", function(d, i){ return i * 20 + 10;})
	  .attr("fill", "#a7a7a7")
	  .text(function(d) { return d; });	

};
