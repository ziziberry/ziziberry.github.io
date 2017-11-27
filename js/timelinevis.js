
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
    vis.height = 200 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");
    
    // initialize tooltip 
    vis.tooltip = d3.tip().attr('class', 'd3-tip tooltip-title').html(function(d) { return "<span class='tooltip-top'>" + d.date + "<br /> </span>" + "<span class='tooltip-desc'>" + d.title + "</span>"})
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
    .style("stroke", "black")
    .attr("x1", 0)
    .attr("y1", 80)
    .attr("x2", vis.width)
    .attr("y2", 80)
    .attr("class", "timeline");

    var formatTime = d3.timeFormat("%b-%d-%y");
    formatTime(new Date); // "June 30, 2015"

    var parseTime = d3.timeParse("%d-%b-%y");
    // console.log(parseTime("6-May-16"));

    var timeScale = d3.scaleTime()
        .domain([new Date(2016, 2, 1), new Date(2017, 10, 1)])
        .range([0, vis.width])
    
    vis.circle = vis.svg.selectAll("circle")
        .data(vis.filteredData);

    vis.labels = vis.svg.selectAll("text")
        .data(vis.filteredData);
    // enter
    vis.circle.enter()
        .append("circle")
    // update
        .merge(vis.circle)
        .attr("r", 10)
        .attr("fill-opacity", 0.2)
        .attr("cx", function(d, i) {
            console.log(d.date, parseTime(d.date), i)
            console.log(timeScale(parseTime(d.date)))
            return timeScale(parseTime(d.date))-2.5
        })
        .attr("class", "timeline-circle")
        .attr("cy", 80)
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
        .attr("x", function(d, i) {
            console.log(d.date, parseTime(d.date), i)
            console.log(timeScale(parseTime(d.date)))
            return timeScale(parseTime(d.date))-2.5
        })
        .attr("y", function(d,i) {
            if (i%4==0)
                return 70;
            else if (i%4==1)
                return 62;
            else if (i%4==2)
                return 54;
            else if (i%4==3)
                return 46;
        })
        .style("font-size", 10)
        .text(function(d) {
            return formatTime(parseTime(d.date));
        })

    
    // old tooltips
    
//    function handleMouseOver(d,i)
//    {
//        vis.tooltip.show(); 
//        
//        vis.svg.append("text")
//            .attr("id", "t" + i)
//            .attr("x", function() {
//                    console.log("hi");
//                    return timeScale(parseTime(d.date)); })
//            .attr("y", function() { return 105; })
//            .text(function() {
//                // return "hi";
//                return d.title;  // Value of the text
//            });
//    }
//
//    function handleMouseOut(d,i)
//    {
//        vis.tooltip.hide()
//        
//        d3.select("#t" + i).remove();  // Remove text location
//    }

};
