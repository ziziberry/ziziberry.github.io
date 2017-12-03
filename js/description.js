
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

    // * TO-DO *
    vis.svgsor = d3.select("#sor").append("svg");
    vis.svgfrat = d3.select("#frat").append("svg");
    vis.svgffc = d3.select("#ffc").append("svg");
    vis.svgmfc = d3.select("#mfc").append("svg");

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

    vis.svgsor.selectAll("text.sor")
        .data(vis.sor)
        .enter().append("text")
        .attr("class", "sor")
        .attr("x", 35)
        .attr("y", function(d, i){return 20 + i*35})
        .text(function(d){return d.old_name});


    vis.svgsor.selectAll("image.sor")
        .data(vis.sor)
        .enter().append("image")
        .attr("class", "sor")
        .attr('xlink:href', function(d){return "img/" + d.img;})
        .attr("x", 0)
        .attr("y", function(d, i){return i*35})
        .attr("height", 30)
        .attr("width", 30);

    vis.svgfrat.selectAll("text.frat")
        .data(vis.frat)
        .enter().append("text")
        .attr("class", "frat")
        .attr("x", 35)
        .attr("y", function(d, i){return 20 + i*35})
        .text(function(d){return d.old_name});


    vis.svgfrat.selectAll("image.sor")
        .data(vis.frat)
        .enter().append("image")
        .attr("class", "frat")
        .attr('xlink:href', function(d){return "img/" + d.img;})
        .attr("x", 0)
        .attr("y", function(d, i){return i*35})
        .attr("height", 30)
        .attr("width", 30);

    vis.svgffc.selectAll("text.ffc")
        .data(vis.ffc)
        .enter().append("text")
        .attr("class", "ffc")
        .attr("x", function(d, i){
            if (i > 3) {return 150}
            else {return 35}})
        .attr("y", function(d, i){
            if (i > 3) {return 20 + (i-4)*35 }
            else {return 20 + i*35}})
        .text(function(d){return d.old_name});


    vis.svgffc.selectAll("image.ffc")
        .data(vis.ffc)
        .enter().append("image")
        .attr("class", "ffc")
        .attr('xlink:href', function(d){return "img/" + d.img;})
        .attr("x", function(d, i){
            if (i > 3) {return 115}
            else {return 0}})
        .attr("y", function(d, i){
            if (i > 3) {return (i-4)*35 }
            else {return i*35}})
        .attr("height", 30)
        .attr("width", 30);

    vis.svgmfc.selectAll("text.mfc")
        .data(vis.mfc)
        .enter().append("text")
        .attr("class", "mfc")
        .attr("x", function(d, i){
            if (i > 3) {return 150}
            else {return 35}})
        .attr("y", function(d, i){
            if (i > 3) {return 20 + (i-4)*35 }
            else {return 20 + i*35}})
        .text(function(d){return d.old_name});


    vis.svgmfc.selectAll("image.mfc")
        .data(vis.mfc)
        .enter().append("image")
        .attr("class", "mfc")
        .attr('xlink:href', function(d){return "img/" + d.img;})
        .attr("x", function(d, i){
            if (i > 3) {return 115}
            else {return 0}})
        .attr("y", function(d, i){
            if (i > 3) {return (i-4)*35 }
            else {return i*35}})
        .attr("height", 30)
        .attr("width", 30);


};

