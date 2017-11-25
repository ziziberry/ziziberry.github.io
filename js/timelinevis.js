
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
    .attr("x1", 0)
    .attr("y1", 80)
    .attr("x2", vis.width)
    .attr("y2", 80)
    .attr("class", "timeline");

    var formatTime = d3.timeFormat("%B %d, %Y");
    formatTime(new Date); // "June 30, 2015"

    var parseTime = d3.timeParse("%d-%B-%y");
    // console.log(parseTime("6-May-16"));

    var timeScale = d3.scaleTime()
        .domain([new Date(2016, 4, 1), new Date(2017, 10, 1)])
        .range([0, vis.width])
    
    vis.circle = vis.svg.selectAll("circle")
        .data(vis.filteredData);
    
    // enter
    vis.circle.enter()
        .append("circle")
    // update
        .merge(vis.circle)
        .attr("r", 5)
        .attr("cx", function(d, i) {
            return timeScale(parseTime(d.date))
        })
        .attr("cy", 80)
        .attr("fill", function(d, i) {
            if (i % 4 == 0) {
                return "lightblue";
            } else {
                return "green";
            }
    })
};
