
/*
 * RadarVis - Object constructor function
 * @param _parentElement: HTML element for the visualization
 * @param _data: the actual data
 */

TreeVis = function(_parentElement){
    this.parentElement = _parentElement;

    this.initVis();
}

TreeVis.prototype.initVis = function() {
    var vis = this;


// ************** Generate the tree diagram	 *****************
    vis.margin = {top: 20, right: 120, bottom: 20, left: 150}
    vis.width = 960 - vis.margin.right - vis.margin.left;
    vis.height = 500 - vis.margin.top - vis.margin.bottom;


    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom);

    vis.g = vis.svg.append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    var tree = d3.cluster()
        .size([vis.height, vis.width - 160]);

    var stratify = d3.stratify()
        .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

    d3.json("data/treeData.json", function(error, treeData) {
        if (error) throw error;

        var root = d3.hierarchy(treeData);
        tree(root);

        var link = vis.g.selectAll(".link")
            .data(root.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                return "M" + d.y + "," + d.x
                    + "C" + (d.parent.y + d.x) + "," + d.x
                    + " " + (d.parent.y + d.x) + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;

            });

        var node = vis.g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        node.append("circle")
            .attr("r", 5)
            .on("mouseover", function(){
                console.log("hi")
            });

        node.append("text")
            .attr("dy", 3)
            .attr("x", function(d) { return d.children ? -10 : 1; })
            .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .text(function(d) {
                return d.data.name;
            });
    });


    }