
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
}

RadarVis.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right,
    vis.width = 500 - vis.margin.left - vis.margin.right,
        vis.height = 500 - vis.margin.top - vis.margin.bottom;
    
    vis.configs = {
      w: vis.width,
      h: vis.height,
      maxValue: 0.6,
      levels: 5,
      ExtraWidthX: 300
    };
    
    vis.colorscale = d3.scaleOrdinal(d3.schemeCategory10);
    
    
    this.wrangleData();
};

RadarVis.prototype.wrangleData = function(){
    var vis = this;
    
    vis.displaydata = [];
    
    for(var key in vis.data_norm) {
        vis.displaydata.push([{axis: "Student Body", value: vis.data_norm[key].student_body, label: vis.data[key].student_body}, 
                         {axis: "Tutition Cost", value: vis.data_norm[key].tuition, label: "$" + vis.data[key].tuition}, 
                         {axis: "Acceptance Rate", value: vis.data_norm[key].acceptance_rate, label: vis.data[key].acceptance_rate + "%"},
                         {axis: "Students in School Housing", value: vis.data_norm[key].student_housing, label: vis.data[key].student_housing + "%"},
                         {axis: "Athletics", value: vis.data_norm[key].athletics, label: vis.data[key].athletics + "%"},
                         {axis: "Median Family Income", value: vis.data_norm[key].median_family_income, label: "$" +  vis.data[key].median_family_income}
                        ])
    };
    
    console.log(vis.displaydata);
    
    this.updateVis();

}

RadarVis.prototype.updateVis = function(){
    var vis = this;
    
    RadarChart.draw("#" + vis.parentElement, vis.displaydata, vis.configs);

    vis.svg = d3.select("#radarvis")
	.selectAll('svg')
	.append('svg')
	.attr("width", vis.width + 500)
	.attr("height", vis.height)
    
    vis.radarlegend = vis.svg.append("g")
    .attr("class", "radarlegend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(150,20)');
    
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
    
	vis.radarlegend.selectAll("text")
	  .data(Object.keys(vis.data))
	  .enter()
	  .append("text")
	  .attr("x", vis.width - 70)
	  .attr("y", function(d, i){ return i * 20 + 10;})
	  .attr("fill", "#737373")
	  .text(function(d) { return d; });	
    

};
