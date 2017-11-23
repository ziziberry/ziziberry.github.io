
/*
 * RadarVis - Object constructor function
 * @param _parentElement: HTML element for the visualization
 * @param _data: the actual data
 */

TimelineVis = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.data = _data;
    this.filteredData = this.data;

    this.initVis();
}

TimelineVis.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 20, right: 20, bottom: 20, left: 50 };

    // vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right,
    vis.width = 1000 - vis.margin.left - vis.margin.right,
        vis.height = 200 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");
    
    this.wrangleData();
};

TimelineVis.prototype.wrangleData = function(){
    var vis = this;
    
    vis.displaydata = [];
    
    this.updateVis();

}

TimelineVis.prototype.updateVis = function(){
    var vis = this;

    console.log(vis.filteredData);

    vis.svg.append("line")
    .style("stroke", "black")
    .attr("x1", 20)
    .attr("y1", 80)
    .attr("x2", 15*40 + 20)
    .attr("y2", 80)
    .attr("class", "timeline");
    
    vis.circle = vis.svg.selectAll("circle")
        .data(vis.filteredData);
    
    // enter
    vis.circle.enter()
        .append("circle")
    // update
        .merge(vis.circle)
        .attr("r", 5)
        .attr("cx", function(d, i) { return (i * 40) + 20 })
        .attr("cy", 80)
        .attr("fill", function(d, i) {
            if (i % 4 == 0) {
                return "lightblue";
            } else {
                return "green";
            }
    })
};
