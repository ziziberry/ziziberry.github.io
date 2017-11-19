
/*
 * Categories - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the area chart
 * @param _data						-- the dataset 'household characteristics'
 */

Categories = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.data = _data;

    this.initVis();
}



/*
 * Initialize visualization (static content; e.g. SVG area, axes, brush component)
 */

Categories.prototype.initVis = function(){
    var vis = this;

    // * TO-DO *
    vis.margin = { top: 30, right: 0, bottom: 20, left: 40 };

    vis.w = $(".categories").width();
    vis.width = vis.w - vis.margin.left - vis.margin.right,
        vis.height = 600 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("." + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // 5 circles
    vis.radius = 80;
    vis.spacing = 375;

    vis.sor = vis.svg.append("circle")
        .attr("cx", 50)
        .attr("cy", 100)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.svg.append("text")
        .text("Sororities")
        .attr("x", 0)
        .attr("y", 0);

    vis.frat = vis.svg.append("circle")
        .attr("cx", 50 + vis.spacing)
        .attr("cy", 100)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.svg.append("text")
        .text("Fraternities")
        .attr("x", vis.spacing)
        .attr("y", 0);

    vis.ffc = vis.svg.append("circle")
        .attr("cx", 50)
        .attr("cy", 100 + vis.spacing)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.svg.append("text")
        .text("Female Final Clubs")
        .attr("x", 0)
        .attr("y", vis.spacing);

    vis.mfc = vis.svg.append("circle")
        .attr("cx", 50 + vis.spacing)
        .attr("cy", 100 + vis.spacing)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.svg.append("text")
        .text("Male Final Clubs")
        .attr("x", vis.spacing)
        .attr("y", vis.spacing);

    vis.coed = vis.svg.append("circle")
        .attr("cx", 50 + vis.spacing/2)
        .attr("cy", 100 + vis.spacing/2)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.svg.append("text")
        .text("Co-Ed (Non-USGSO)")
        .attr("x", vis.spacing/2)
        .attr("y", vis.spacing/2);


    // (Filter, aggregate, modify data)
    vis.wrangleData();
}


/*
 * Data wrangling
 */

Categories.prototype.wrangleData = function(){
    var vis = this;

    // (1) Group data by date and count survey results for each day
    // (2) Sort data by day
    vis.sorpics = [];
    vis.fratpics = [];
    vis.ffcpics = [];
    vis.mfcpics = [];

    vis.data.forEach(function (d){
        if(d.sor === 1){
            vis.sorpics.push("img/" + d.img);
        }
        else if(d.frat === 1){
            vis.fratpics.push("img/" + d.img);
        }
        if(d.female_fc === 1){
            vis.ffcpics.push("img/" + d.img);
        }
        if(d.male_fc === 1){
            vis.mfcpics.push("img/" + d.img);
        }
    });

    //console.log(vis.group)
    // Update the visualization
    vis.updateVis();
}


/*
 * The drawing function
 */

Categories.prototype.updateVis = function(){
    var vis = this;

    // * TO-DO *


    console.log(vis.mfcpics)

    vis.svg.selectAll("image.sor")
        .data(vis.sorpics)
        .enter()
        .append("image")
        .attr("class", "sor")
        .attr('xlink:href',function (d) { return d; })
        .attr("x", 35)
        .attr("y", function (d, i) {
            return 30 + i*35;

        })
        .attr("height", 30)
        .attr("width", 30)

    vis.svg.selectAll("image.frat")
        .data(vis.fratpics)
        .enter()
        .append("image")
        .attr("class", "frat")
        .attr('xlink:href',function (d) { return d; })
        .attr("x", 35 + vis.spacing)
        .attr("y", function (d, i) {
            return 30 + i*35;

        })
        .attr("height", 30)
        .attr("width", 30)

    vis.svg.selectAll("image.ffc")
        .data(vis.ffcpics)
        .enter()
        .append("image")
        .attr("class", "ffc")
        .attr('xlink:href',function (d) { return d; })
        .attr("x", function (d, i){
            if (i >= 3){return 55}
            else {return 15}

        })
        .attr("y", function (d, i) {
            if (i >= 3){return 30 + vis.spacing + (i-3)*35}
            else {return 30 + vis.spacing + i*35}

        })
        .attr("height", 30)
        .attr("width", 30)

    vis.svg.selectAll("image.mfc")
        .data(vis.mfcpics)
        .enter()
        .append("image")
        .attr("class", "mfc")
        .attr('xlink:href',function (d) { return d; })
        .attr("x", function (d, i){
            if (i >= 4){return 55 + vis.spacing}
            else {return 15 + vis.spacing}

        })
        .attr("y", function (d, i) {
            if (i >= 4){return 30 + vis.spacing + (i-4)*35}
            else {return 30 + vis.spacing + i*35}

        })
        .attr("height", 30)
        .attr("width", 30)






}

