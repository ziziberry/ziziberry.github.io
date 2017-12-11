
/*
 * Description - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the area chart
 * @param _data						-- the dataset 'household characteristics'
 */

Description = function(_parentElement, _initialData){
    this.parentElement = _parentElement;
    this.data = _initialData;

    this.initVis();
};

/*
 * Initialize visualization (static content; e.g. SVG area, axes, brush component)
 */

Description.prototype.initVis = function(){
    var vis = this;

    vis.width = $("#sor").width();
    vis.height = 50;
    vis.width = $("#frat").width();
    vis.height = 50;
    vis.width = $("#ffc").width();
    vis.height = 50;
    vis.width = $("#mfc").width();
    vis.height = 50;

    // SVG drawing area
    vis.svgsor = d3.select("#sor").append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height);

    vis.svgfrat = d3.select("#frat").append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height);

    vis.svgffc = d3.select("#ffc").append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height);

    vis.svgmfc = d3.select("#mfc").append("svg")
        .attr("width", vis.width)
        .attr("height", vis.height);

    /*

    // * TO-DO *
    vis.svgsor = d3.select("#sor").append("svg");
    vis.svgfrat = d3.select("#frat").append("svg");
    vis.svgffc = d3.select("#ffc").append("svg");
    vis.svgmfc = d3.select("#mfc").append("svg");*/



    vis.sor = [];
    vis.frat = [];
    vis.ffc = [];
    vis.mfc = [];

    vis.data.forEach(function (d){
        if(d.sor === 1){
            vis.sor.push(d)
        }
        else if(d.frat === 1){
            vis.frat.push(d)
        }
        if(d.female_fc === 1){
            vis.ffc.push(d)
        }
        if(d.male_fc === 1){
            vis.mfc.push(d)
        }
    });

    /* Initialize tooltip */
    vis.tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return d.old_name;
        });

    vis.svgsor.selectAll("image.sor")
        .data(vis.sor)
        .enter().append("image")
        .attr("class", "sor")
        .attr('xlink:href', function(d){return "img/" + d.img;})
        .attr("x", function(d, i){return i*45})
        .attr("y", 0)
        .attr("height", 45)
        .attr("width", 45)
        .on('mouseover', vis.tip.show)
        .on('mouseout', vis.tip.hide)
        .call(vis.tip);

    vis.svgfrat.selectAll("image.sor")
        .data(vis.frat)
        .enter().append("image")
        .attr("class", "frat")
        .attr('xlink:href', function(d){return "img/" + d.img;})
        .attr("x", function(d, i){return i*45})
        .attr("y", 0)
        .attr("height", 45)
        .attr("width", 45)
        .on('mouseover', vis.tip.show)
        .on('mouseout', vis.tip.hide);

    vis.svgffc.selectAll("image.ffc")
        .data(vis.ffc)
        .enter().append("image")
        .attr("class", "ffc")
        .attr('xlink:href', function(d){return "img/" + d.img;})
        .attr("x", function(d, i){return i*45})
        .attr("y", 0)
        .attr("height", 45)
        .attr("width", 45)
        .on('mouseover', vis.tip.show)
        .on('mouseout', vis.tip.hide);

    vis.svgmfc.selectAll("image.mfc")
        .data(vis.mfc)
        .enter().append("image")
        .attr("class", "mfc")
        .attr('xlink:href', function(d){return "img/" + d.img;})
        .attr("x", function(d, i) { return i*45 })
        .attr("y", 0)
        .attr("height", 45)
        .attr("width", 45)
        .on('mouseover', vis.tip.show)
        .on('mouseout', vis.tip.hide);


};

