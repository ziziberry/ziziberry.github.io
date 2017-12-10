
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

    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


    vis.tooltip = d3.tip().attr('class', 'd3-tip tooltip-title')
        .html(function(d)
        {
            console.log(d);
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
            img: "https://puu.sh/yDsQH/6f3812521c.png",
            label: "Harvard Corporation"
        },
        {
            posx: vis.width*2/3-shiftLeft,
            posy: 0,
            img: "https://puu.sh/yDs7P/2dc8322e84.png",
            label: "Drew Gilpin Faust, Harvard's 28th President",
        },

        {
            posx: vis.width/4-shiftLeft,
            posy: vis.height/4,
            label: "Harry Lewis",
            img: "https://www.seas.harvard.edu/sites/default/files/styles/medium/public/images/news/Lewis_Headshot_sq.jpg?itok=ats1aeEf"
        },
        {
            posx: vis.width*2/4-shiftLeft,
            posy: vis.height/4,
            label: "Harvard Faculty",
            img: "https://puu.sh/yDsDZ/6f14719fdf.png"
        },
        {
            posx: vis.width*3/4-shiftLeft,
            posy: vis.height/4,
            label: "Rakesh Khurana",
            img: "https://puu.sh/yDu8K/4056a43bda.png"
        },

        {
            posx: vis.width/3-shiftLeft,
            posy: vis.height/2,
            label: "Implementation Committee",
            img: "http://archive.fortune.com/assets/i2.cdn.turner.com/money/galleries/2012/news/companies/1205/gallery.500-directors.fortune/images/harvard_corp_board.jpg"
        },
        {
            posx: vis.width*2/3-shiftLeft,
            posy: vis.height/2,
            label: "Faculty Committee",
            img: "http://archive.fortune.com/assets/i2.cdn.turner.com/money/galleries/2012/news/companies/1205/gallery.500-directors.fortune/images/harvard_corp_board.jpg"
        },

        {
            posx: vis.width/2-shiftLeft,
            posy: vis.height*3/4,
            label: "Undergraduate Student Body",
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
            .on("mouseover", function(d){
                console.log(d.posx);
            })
            .on("mouseout", vis.tooltip.hide)
            .style("fill", "#fff")
            .style("fill", "url(#grump_avatar" + i + ")")
            ;

        var text = vis.svg.append("text")
            .attr("transform", "translate(" + (d.posx+config.avatar_size/2) + "," + (d.posy+config.avatar_size+10) + ")")
            .attr("text-anchor", "middle")
            // .attr("cx", config.avatar_size / 2)
            // .attr("cy", config.avatar_size / 2)
            // .attr("r", config.avatar_size / 2)
            .text(d.label)
        ;




    });
}