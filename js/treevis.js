
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
    vis.margin = {top: 20, right: 20, bottom: 20, left: 20}
    vis.width = 1500 - vis.margin.right - vis.margin.left;
    vis.height = 600 - vis.margin.top - vis.margin.bottom;

    // Define the div for the tooltip
    var div = d3.select("#" + vis.parentElement).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    vis.tooltip = d3.tip().attr('class', 'd3-tip tooltip-title')
        .html(function()
        {
            console.log(d.label);
        });

    vis.tooltip.offset([-15, 0]);

    // invoke tooltip
    vis.svg.call(vis.tooltip)

    // code outline credits to http://plnkr.co/edit/4sQSQ0ChpJon4OwY2Ag1?p=preview
    var defs = vis.svg.append('svg:defs');

    var config = {
        "avatar_size": 125
    }

    var shiftLeft = 150;

    data = [
        {
            posx: vis.width/3-shiftLeft,
            posy: 0,
            img: "https://puu.sh/yDAvK/2a87396140.png",
            label: "Harvard Corporation",
            description: "<li>Harvard University's highest governing body.<br/><li>One of Harvard's boards in the two-board system.<br/><li>Known formally as the President and Fellows of Harvard College."
        },
        {
            posx: vis.width*2/3-shiftLeft,
            posy: 0,
            img: "https://puu.sh/yDs7P/2dc8322e84.png",
            label: "Drew Gilpin Faust",
            label2: "Harvard's 28th President",
            description: "<li>Harvard's current University President and first female president.<br/><li>Announced in June 2017 that she would be stepping down from the presidency in June 2018."
            // The first president since 1672 without an undergraduate or graduate degree from Harvard.<br/>/**/
        },

        {
            posx: vis.width/4-shiftLeft-50,
            posy: vis.height/4,
            label: "Harry Lewis",
            label2: "Former Dean of the College",
            img: "https://www.seas.harvard.edu/sites/default/files/styles/medium/public/images/news/Lewis_Headshot_sq.jpg?itok=ats1aeEf",
            description: "<li>Strong and outspoken opponent amongst faculty against the sanctions.<br/><li>Publicly denounced the sanctions upon their introduction in May 2016.<br/>" +
            "<li>Criticized policies in private letter to Khurana. <br/><li>Former Dean of Harvard College from 1995-2003.<br/><li>Gordon McKay Professor of Computer Science since 1981."
        },
        {
            posx: vis.width*2/4-shiftLeft,
            posy: vis.height/4,
            label: "Faculty of Arts and Sciences",
            description: "<li>The largest of seven faculties across Harvard.<br/>" +
            "<li>Composed of Harvard College, GSAS, SEAS, and Extension School.<br/><li>Only division responsible for both undergraduate and graduate education.",
            img: "https://puu.sh/yDyav/310859e006.png"
        },
        {
            posx: vis.width*3/4-shiftLeft+50,
            posy: vis.height/4,
            label: "Rakesh Khurana",
            label2: "Current Dean of the College",
            description: "<li>Primary proponent and original author of the social sanctions.<br/>" +
            "<li>Professor of sociology and organizational behavior at Harvard and Faculty Dean of Cabot House.<br/><li>Dean of Harvard College since July 2014.",
            img: "https://puu.sh/yDu8K/4056a43bda.png"
        },

        {
            posx: vis.width/3-shiftLeft,
            posy: vis.height/2,
            label: "Implementation Committee",
            label2: "Formed November 2016",
            description: "<li>Unrecognized Single-Gender Social Organizations Policy Implementation Committee.<br/>" +
            "<li>Original 37-member committee composed of faculty, staff, and students.<br/>" +
            "<li>Tasked with recommending new implementation policy for social sanctions.<br/>" +
            "<li>Headed by two Faculty chairs, University Professor Douglas A. Melton and Music and African and African American Studies professor Kay K. Shelemay.",
            img: "https://puu.sh/yDAri/079ccb2015.png"
        },
        {
            posx: vis.width*2/3-shiftLeft,
            posy: vis.height/2,
            label: "Faculty Committee",
            label2: "Formed January 2017",
            description: "<li>Entirely new committee, also comprised of faculty, students, and staff.<br/>" +
            "<li>Created by Dean Khurana without the involvement or awareness of the original Implementation Committee.",
            img: "https://puu.sh/yDAsd/1b24c0aef8.png"
        },

        {
            posx: vis.width/2-shiftLeft,
            posy: vis.height*3/4,
            label: "Undergraduate Student Body",
            description: "<li>Around 6,600 undergraduates annually.<br/><li>Acceptance rate of around 5.2%.<br/><li>Primary recipients of the consequences of social policy.<br/>",
            img: "https://puu.sh/yDsYZ/40e140c5cb.png"
        },




    ];

    data.forEach(function(d, i) {
        defs.append("svg:pattern")
            .attr("id", "grump_avatar" + i)
            .attr("width", config.avatar_size)
            .attr("height", config.avatar_size)
            .attr("patternUnits", "userSpaceOnUse")
            .append("svg:image")
            .attr("xlink:href", d.img)
            .attr("width", config.avatar_size)
            .attr("height", config.avatar_size)
            .attr("x", 0)
            .attr("y", 0);

        var circle = vis.svg.append("circle")
            .attr("transform", "translate(" + d.posx + "," + d.posy + ")")
            .attr("cx", config.avatar_size / 2)
            .attr("cy", config.avatar_size / 2)
            // .attr("cx", d.posx)
            // .attr("cy", d.posy)
            .attr("r", config.avatar_size / 2)
            // .on("mouseover", vis.tooltip.show)
            // .on("mouseout", vis.tooltip.hide)
            .style("fill", "#fff")
            .style("fill", "url(#grump_avatar" + i + ")")
            .on("mouseover", function() {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html(d.description)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            ;

        var text = vis.svg.append("text")
            .attr("transform", "translate(" + (d.posx+config.avatar_size/2) + "," + (d.posy+config.avatar_size+12) + ")")
            .attr("text-anchor", "middle")
            // .attr("cx", config.avatar_size / 2)
            // .attr("cy", config.avatar_size / 2)
            // .attr("r", config.avatar_size / 2)
            .text(d.label)
        ;

        var text = vis.svg.append("text")
            .attr("transform", "translate(" + (d.posx+config.avatar_size/2) + "," + (d.posy+config.avatar_size+27) + ")")
            .attr("text-anchor", "middle")
            // .attr("cx", config.avatar_size / 2)
            // .attr("cy", config.avatar_size / 2)
            // .attr("r", config.avatar_size / 2)
            .text(d.label2)
        ;



    });
}