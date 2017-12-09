
/*
 * Categories - Object constructor function
 * @param _parentElement    -- the HTML element in which to draw the area chart
 * @param _data                     -- the dataset 'household characteristics'
 */

Categories = function(_parentElement, _initialData, _currentData){
    this.parentElement = _parentElement;
    this.idata = _initialData;
    this.cdata = _currentData;

    this.initVis();
};

/*
 * Initialize visualization (static content; e.g. SVG area, axes, brush component)
 */

Categories.prototype.initVis = function(){
    var vis = this;

    // * TO-DO *
    vis.margin = { top: 30, right: 0, bottom: 20, left: 40 };

    //vis.w = $(".categories").width();
    vis.w = $(".categories").width();
    vis.width = vis.w - vis.margin.left - vis.margin.right,
        vis.height = 600 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("." + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // 5 squars/rectangles
    vis.sqwidth = 160;
    vis.sqheight = 160;
    vis.midwidth = vis.w/2 - vis.sqwidth;
    vis.midheight = vis.height/2 - vis.sqheight + 50;
    vis.spacing = 300;
    vis.spacingx = 500;
    vis.spacingy = 300;
    var marg = 30;

    vis.sorgroup = vis.svg.append("g");

    vis.sor = vis.svg.append("rect")
        .attr("x", vis.midwidth - vis.spacingx/2)
        .attr("y", vis.midheight - vis.spacingy/2)
        .attr("width", vis.sqwidth)
        .attr("height", vis.sqheight)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "10px");

    vis.sorlab = vis.svg.append("text")
        .text("Sororities")
        .attr("stroke", "black")
        .attr("x", vis.midwidth - vis.spacingx/2)
        .attr("y", vis.midheight - vis.spacingy/2 - marg);

    vis.frat = vis.svg.append("rect")
        .attr("x", vis.midwidth + vis.spacingx/2)
        .attr("y", vis.midheight - vis.spacingy/2)
        .attr("width", vis.sqwidth)
        .attr("height", vis.sqheight)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "10px");

    vis.fratlab = vis.svg.append("text")
        .text("Fraternities")
        .attr("stroke", "black")
        .attr("x", vis.midwidth + vis.spacingx/2)
        .attr("y", vis.midheight - vis.spacingy/2 - marg);

    vis.ffc = vis.svg.append("rect")
        .attr("x", vis.midwidth - vis.spacingx/2)
        .attr("y", vis.midheight + vis.spacingy/2)
        .attr("width", vis.sqwidth)
        .attr("height", vis.sqheight)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "10px");

    vis.ffclab = vis.svg.append("text")
        .text("Female Final Clubs")
        .attr("stroke", "black")
        .attr("x", vis.midwidth - vis.spacingx/2)
        .attr("y", vis.midheight + vis.spacingy/2 - marg);

    vis.mfc = vis.svg.append("rect")
        .attr("x", vis.midwidth + vis.spacingx/2)
        .attr("y", vis.midheight + vis.spacingy/2)
        .attr("width", vis.sqwidth)
        .attr("height", vis.sqheight)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "10px");

    vis.mfclab = vis.svg.append("text")
        .text("Male Final Clubs")
        .attr("stroke", "black")
        .attr("x", vis.midwidth + vis.spacingx/2)
        .attr("y", vis.midheight + vis.spacingy/2 - marg);

    vis.coed = vis.svg.append("rect")
        .attr("x", vis.midwidth)
        .attr("y", vis.midheight)
        .attr("width", vis.sqwidth)
        .attr("height", vis.sqheight)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", "10px");

    vis.coedlab = vis.svg.append("text")
        .text("Co-Ed (Non-USGSO)")
        .attr("stroke", "black")
        .attr("x", vis.midwidth)
        .attr("y", vis.midheight - marg);

    vis.wrangleData();
};


/*
 * Data wrangling
 */

Categories.prototype.wrangleData = function(){
    var vis = this;

    console.log("wrangle")
    // make dictionary of their positions in the circles
    vis.positions = {};
    // initial positions
    var xspace = 51;
    var yspace = 48;
    var malec = 0;
    var fratc = 0;
    var fmalec = 0;
    vis.idata.forEach(function (d, i){
        var x = 0;
        var y = 0;
        if(d.sor === 1){
            if (i > 2){
                x = vis.midwidth - vis.spacingx/2 + xspace + 5;
                y = vis.midheight - vis.spacingy/2 + (i-3)*yspace + 8;
            }
            else{
                x = vis.midwidth - vis.spacingx/2 + 5;
                y = vis.midheight - vis.spacingy/2 + (i)*yspace + 8;
            }
        }
        else if(d.frat === 1){
            if (fratc > 2){
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace*2;
                y = vis.midheight - vis.spacingy/2 + (fratc-3)*yspace + 8;
            }
            else{
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace;
                y = vis.midheight - vis.spacingy/2 + (fratc)*yspace + 8;
            }
            fratc++;
        }
        else if(d.female_fc === 1){
            if (fmalec > 2){
                x = vis.midwidth - vis.spacingx/2 + xspace + 5;
                y = vis.midheight + vis.spacingy/2 + (fmalec-3)*yspace + 8;
            }
            else{
                x = vis.midwidth - vis.spacingx/2 + 5;
                y = vis.midheight + vis.spacingy/2 + (fmalec)*yspace + 8;
            }
            fmalec++;
        }
        else{
            if (malec > 5){
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace*3;
                y = vis.midheight + vis.spacingy/2 + (malec-6)*yspace + 8;
            }
            else if (malec > 2){
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace*2;
                y = vis.midheight + vis.spacingy/2 + (malec-3)*yspace + 8;
            }
            else{
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace;
                y = vis.midheight + vis.spacingy/2 + (malec)*yspace + 8;
            }
            malec++;
        }
        vis.positions[d.id] = [x, y];
    });
    // final positions
    malec = 0;
    fratc = 0;
    fmalec = 0;
    coedc = 0;
    vis.cdata.forEach(function (d, i){
        var x = 0;
        var y = 0;
        if(d.sor === 1){
            if (i > 2){
                x = vis.midwidth - vis.spacingx/2 + xspace + 5;
                y = vis.midheight - vis.spacingy/2 + (i-3)*yspace + 8;
            }
            else{
                x = vis.midwidth - vis.spacingx/2 + 5;
                y = vis.midheight - vis.spacingy/2 + (i)*yspace + 8;
            }
        }
        else if(d.frat === 1){
            if (fratc > 2){
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace*2;
                y = vis.midheight - vis.spacingy/2 + (fratc-3)*yspace + 8;
            }
            else{
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace;
                y = vis.midheight - vis.spacingy/2 + (fratc)*yspace + 8;
            }
            fratc++;
        }
        else if(d.female_fc === 1){
            if (fmalec > 2){
                x = vis.midwidth - vis.spacingx/2 + xspace + 5;
                y = vis.midheight + vis.spacingy/2 + (fmalec-3)*yspace + 8;
            }
            else{
                x = vis.midwidth - vis.spacingx/2 + 5;
                y = vis.midheight + vis.spacingy/2 + (fmalec)*yspace + 8;
            }
            fmalec++;
        }
        else if(d.male_fc === 1){
            if (malec > 5){
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace*3;
                y = vis.midheight + vis.spacingy/2 + (malec-6)*yspace + 8;
            }
            else if (malec > 2){
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace*2;
                y = vis.midheight + vis.spacingy/2 + (malec-3)*yspace + 8;
            }
            else{
                x = vis.midwidth + vis.sqwidth + vis.spacingx/2 - xspace;
                y = vis.midheight + vis.spacingy/2 + (malec)*yspace + 8;
            }
            malec++;
        }
        else {
            if (coedc > 5){
                x = vis.midwidth + xspace*2 + 5;
                y = vis.midheight + (coedc-6)*yspace + 8;
            }
            else if (coedc > 2){
                x = vis.midwidth + xspace + 5;
                y = vis.midheight + (coedc-3)*yspace + 8;
            }
            else{
                x = vis.midwidth + 5;
                y = vis.midheight + (coedc)*yspace + 8;
            }
            coedc++;
        }
        vis.positions[d.id].push(x);
        vis.positions[d.id].push(y);
    });

    vis.idata.forEach(function (d){
        var img = "img/" + d.img;
        vis.positions[d.id].push(img);
        vis.positions[d.id].push(d.old_name);
    });

    vis.listpos = [];
    for (var i = 0; i < 24; i++) {
        vis.listpos.push(vis.positions[i])
    }

    /* Initialize tooltip */
    vis.tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return d[5];
        });

    vis.svg.call(vis.tip);

    vis.sortpics = vis.svg.selectAll("image.usgso")
        .data(vis.listpos);

    vis.sortpics.enter().append("image")
        .merge(vis.sortpics)
        .on('mouseover', vis.tip.show)
        .on('mouseout', vis.tip.hide)
        .transition()
        .duration(1000)
        .attr("class", "usgso")
        .attr('xlink:href', function(d){return d[4];})
        .attr("x", function(d, i){
            return 30 * i - 25;
        })
        .attr("y", vis.height - 50)
        .attr("height", 30)
        .attr("width", 30)
    //vis.updateVis();
};

Categories.prototype.updateVis = function(){
    var vis = this;

    vis.listpos = [];
    for (var i = 0; i < 24; i++) {
        vis.listpos.push(vis.positions[i])
    }

    /* Initialize tooltip */
    vis.tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return d[5];
        });

    vis.svg.call(vis.tip);

    vis.sortpics = vis.svg.selectAll("image.usgso")
        .data(vis.listpos);

    vis.sortpics.enter().append("image")
        .merge(vis.sortpics)
        .on('mouseover', vis.tip.show)
        .on('mouseout', vis.tip.hide)
        .transition()
        .duration(1000)
        .attr("class", "usgso")
        .attr('xlink:href', function(d){return d[4];})
        .attr("x", function(d){return d[0]})
        .attr("y", function(d){return d[1]})
        .attr("height", 45)
        .attr("width", 45)
};

Categories.prototype.current = function(){
    var vis = this;

    console.log("current")

    vis.sortpics.transition()
        .duration(1000)
        .attr("x", function(d){return d[2]})
        .attr("y", function(d){return d[3]})
        .attr("height", 45)
        .attr("width", 45);

    vis.filter();
};


Categories.prototype.filter = function(){
    var vis = this;

    var category = d3.select("#sort-type").property("value");

    vis.sorpics = [];
    vis.fratpics = [];
    vis.ffcpics = [];
    vis.mfcpics = [];
    vis.coedpics = [];

    vis.cdata.forEach(function (d){
        var id = d.id;
        var img = "img/" + vis.idata[id].img;
        if(d.sor === 1){
            vis.sorpics.push(img);
        }
        else if(d.frat === 1){
            vis.fratpics.push(img);
        }
        if(d.female_fc === 1){
            vis.ffcpics.push(img);
        }
        if(d.male_fc === 1){
            vis.mfcpics.push(img);
        }
        if(d.coed_fc ===1){
            vis.coedpics.push(img);
        }
    });

    // sororities: 0-3
    // frats: 4-8
    // ffc: 9-14
    // mfc: 15-23

    vis.sortpics.attr("opacity", function(d, i){
        switch(category){
            case "all":
                return 1;
            case "sor":
                if(i <= 3){return 1;}
                else{return 0;}
            case "frat":
                if(i > 3 && i <= 8){return 1;}
                else{return 0;}
            case "ffc":
                if(i > 8 && i <= 14){return 1;}
                else{return 0;}
            case "mfc":
                if(i > 14 && i <= 23){return 1;}
                else{return 0;}
        }
    })

}



