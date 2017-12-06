
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
    vis.width = 1000 - vis.margin.left - vis.margin.right;
    vis.height = 600 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    var formatTime = d3.timeFormat("%B %d, %Y");
    formatTime(new Date); // "June 30, 15"

    var parseTime = d3.timeParse("%d-%b-%y");
    // console.log(parseTime("6-May-16"));

    // initialize tooltip 
    vis.tooltip = d3.tip().attr('class', 'd3-tip tooltip-title')
        .html(function(d)
        {
            if (d.article_link != "") {
                return "<span class='tooltip-top'>" + formatTime(parseTime(d.date)) +
                    ": Click to Read More<br /> </span>" + "<span class='tooltip-desc'>"
                    + d.description + "</span>"
            }
            else
                return "<span class='tooltip-top'>" + formatTime(parseTime(d.date)) +
                "<br /> </span>" + "<span class='tooltip-desc'>"
                + d.description + "</span>"
        })
    vis.tooltip.offset([-15, 0]);

    // invoke tooltip 
    vis.svg.call(vis.tooltip)
    
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
    .style("stroke", "#ffffff")
    .attr("x1", 0)
    .attr("y1", 80)
    .attr("x2", vis.width)
    .attr("y2", 80)
    .attr("class", "timeline");

    var formatTime = d3.timeFormat("%b-%d-%y");
    formatTime(new Date); // "June 30, 15"

    var parseTime = d3.timeParse("%d-%b-%y");
    // console.log(parseTime("6-May-16"));

    var timeScale = d3.scaleTime()
        .domain([new Date(2016, 4, 1), new Date(2018, 2, 1)])
        .range([0, vis.width-10])
    
    vis.circle = vis.svg.selectAll("circle")
        .data(vis.filteredData);

    vis.labels = vis.svg.selectAll("text")
        .data(vis.filteredData);
    // enter
    vis.circle.enter()
        .append("circle")
    // update
        .merge(vis.circle)
        .attr("r", function(d, i) {
            if (d.important == 1)
                return 12;
            else
                return 6;
        })
        .attr("fill-opacity", 0.5)
        .attr("cx", function(d, i) {
            console.log(d.date, parseTime(d.artificial_date), i)
            console.log(timeScale(parseTime(d.artificial_date)))
            return timeScale(parseTime(d.artificial_date))-2.5
        })
        .attr("class", "timeline-circle")
        .attr("cy", vis.height/2)
        .attr("stroke", "black")
        .attr("fill", function(d){
            if (d.author=="faculty")
                return "blue"
            else
                return "green"
        })
        .on("mouseover", vis.tooltip.show)
        .on("mouseout", vis.tooltip.hide)
        .on("click", function(d) {
            if (d.article_link != "") {
                window.open(d.article_link); 
            }
        });

    vis.labels.enter()
        .append("text")
        .merge(vis.labels)
        .style("font-size", 10)
        .attr("fill", "#000000")
        .text(function(d) {
            if (d.important == 1)
                return d.title;
            // else
            //     return formatTime(parseTime(d.date));
        })
        .style("font-size", 10)
        //.style("text-anchor", "end")
        .attr("transform", function(d, i) {
            var temp = timeScale(parseTime(d.artificial_date));
            var rotation = -20;
            return "translate(" + (temp+5) + ", " + (vis.height/2-8) + ") rotate(" + rotation + ")";
        });

    vis.labels.enter()
        .append("text")
        .merge(vis.labels)
        .style("font-size", 10)
        .attr("fill", "#000000")
        .text(function(d) {
            if (d.important == 1)
                return formatTime(parseTime(d.date));
            else
                return formatTime(parseTime(d.date));
        })
        .style("font-size", 10)
        //.style("text-anchor", "end")
        .attr("transform", function(d, i) {
            var temp = timeScale(parseTime(d.artificial_date));
            var rotation = -40;
            return "translate(" + (temp-10) + ", " + (vis.height/2+15) + ") rotate(" + rotation + ")";
        })
        .style("text-anchor", "end");
};
