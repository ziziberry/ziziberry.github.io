
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
    vis.w = 1000;
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
    vis.spacing = 300;

    vis.sorgroup = vis.svg.append("g");

    vis.sor = vis.svg.append("circle")
        .attr("cx", 50)
        .attr("cy", 100)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.sorlab = vis.svg.append("text")
        .text("Sororities")
        .attr("stroke", "black")
        .attr("x", 20)
        .attr("y", 0);

    vis.frat = vis.svg.append("circle")
        .attr("cx", 50 + vis.spacing)
        .attr("cy", 100)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.fratlab = vis.svg.append("text")
        .text("Fraternities")
        .attr("stroke", "black")
        .attr("x", 15 + vis.spacing)
        .attr("y", 0);

    vis.ffc = vis.svg.append("circle")
        .attr("cx", 50)
        .attr("cy", 100 + vis.spacing)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.ffclab = vis.svg.append("text")
        .text("Female Final Clubs")
        .attr("stroke", "black")
        .attr("x", -20)
        .attr("y", vis.spacing);

    vis.mfc = vis.svg.append("circle")
        .attr("cx", 50 + vis.spacing)
        .attr("cy", 100 + vis.spacing)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "red");

    vis.mfclab = vis.svg.append("text")
        .text("Male Final Clubs")
        .attr("stroke", "black")
        .attr("x", vis.spacing)
        .attr("y", vis.spacing);

    vis.coed = vis.svg.append("circle")
        .attr("cx", 50 + vis.spacing/2)
        .attr("cy", 100 + vis.spacing/2)
        .attr("r", vis.radius)
        .attr("fill", "none")
        .attr("stroke", "green");

    vis.coedlab = vis.svg.append("text")
        .text("Co-Ed (Non-USGSO)")
        .attr("stroke", "black")
        .attr("x", vis.spacing/2 - 20)
        .attr("y", vis.spacing/2);

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
    var malec = 0;
    var fratc = 1;
    var fmalec = 0;
    vis.idata.forEach(function (d, i){
        var x = 0;
        var y = 0;
        if(d.sor === 1){
            x = 35;
            y = 30 + i*35;
        }
        else if(d.frat === 1){
            x = 35 + vis.spacing;
            y = fratc*35;
            fratc++;
        }
        if(d.female_fc === 1){
            if (fmalec >= 3){x = 55}
            else {x = 15};
            if (fmalec >= 3){y = 30 + vis.spacing + (fmalec-3)*35}
            else {y = 30 + vis.spacing + fmalec*35}
            fmalec++;
        }
        if(d.male_fc === 1){
            if (malec >= 4){x = 55 + vis.spacing}
            else {x = 15 + vis.spacing}
            if (malec >= 4){y = 30 + vis.spacing + (malec-4)*35}
            else {y = 30 + vis.spacing + malec*35}
            malec++;
        }
        if(d.coed_fc === 1){
            x = (70 + vis.spacing)/2;
            y = (50 + vis.spacing)/2 + i*35;
        }
        vis.positions[d.id] = [x, y];
    });
    // final positions
    malec = 0;
    fratc = 1;
    fmalec = 0;
    coedc = 0;
    vis.cdata.forEach(function (d, i){
        var x = 0;
        var y = 0;
        if(d.sor === 1){
            x = 35;
            y = 30 + i*35;
        }
        else if(d.frat === 1){
            x = 35 + vis.spacing;
            y = fratc*35;
            fratc++;
        }
        if(d.female_fc === 1){
            if (fmalec >= 3){x = 55}
            else {x = 15};
            if (fmalec >= 3){y = 30 + vis.spacing + (fmalec-3)*35}
            else {y = 30 + vis.spacing + fmalec*35}
            fmalec++;
        }
        if(d.male_fc === 1){
            if (malec >= 4){x = 55 + vis.spacing}
            else {x = 15 + vis.spacing}
            if (malec >= 4){y = 30 + vis.spacing + (malec-4)*35}
            else {y = 30 + vis.spacing + malec*35}
            malec++;
        }
        if(d.coed_fc === 1){
            x = (70 + vis.spacing)/2;
            y = (50 + vis.spacing)/2 + coedc*35;
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

    //vis.updateVis();
};

Categories.prototype.updateVis = function(){
    var vis = this;

    vis.listpos = [];
    for (var i = 0; i < 21; i++) {
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
        .attr("height", 30)
        .attr("width", 30)


};

Categories.prototype.current = function(){
    var vis = this;

    console.log("current")

    vis.sortpics.transition()
        .duration(1000)
        .attr("x", function(d){return d[2]})
        .attr("y", function(d){return d[3]});

    vis.gendesc = vis.svg.append("text")
        .text("Only _/_ USGSOs have gone co-ed to avoid penalty")
        .attr("x", 500)
        .attr("y", 0)

    vis.sordesc = vis.svg.append("text")
        .text("0/4 Sororities have gone co-ed to avoid penalty")
        .attr("x", 500)
        .attr("y", 0)

    vis.fratdesc = vis.svg.append("text")
        .text("Only _/_ Fraternities have gone co-ed to avoid penalty")
        .attr("x", 500)
        .attr("y", 0)

    vis.ffcdesc = vis.svg.append("text")
        .text("Only _/_ Female Final Clubs have gone co-ed to avoid penalty")
        .attr("x", 500)
        .attr("y", 0)

    vis.mfcdesc = vis.svg.append("text")
        .text("Only _/_ Male Final Clubs have gone co-ed to avoid penalty")
        .attr("x", 500)
        .attr("y", 0)

    vis.svg.append("text")
        .text("Coed Definition")
        .attr("x", 500)
        .attr("y", 30)

    vis.svg.append("text")
        .text("All remaining USGSOs are still affected by the sanctions. Any new members that they initiate will be ineligible for _____. ")
        .attr("x", 500)
        .attr("y", 60);

    vis.svg.append("text")
        .text("Overall, most USGSOs have decided to make no changes and operate as they did prior to the sanctions," +
            " showing resistance to these policies. Many groups have drafted or released statements detailing the " +
            "importance and value in single gender organizations, especially from the women's groups.")
        .attr("x", 500)
        .attr("y", 90);

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
    // frats: 4-7
    // ffc: 8-12
    // mfc: 13-20

    vis.sortpics.attr("opacity", function(d, i){
        switch(category){
            case "all":
                return 1;
            case "sor":
                if(i <= 3){return 1;}
                else{return 0;}
            case "frat":
                if(i > 3 && i <= 7){return 1;}
                else{return 0;}
            case "ffc":
                if(i > 7 && i <= 12){return 1;}
                else{return 0;}
            case "mfc":
                if(i > 12 && i <= 20){return 1;}
                else{return 0;}
        }
    })

    if (category === "all"){
        vis.gendesc.attr("opacity", 1)
        vis.sordesc.attr("opacity", 0)
        vis.fratdesc.attr("opacity", 0)
        vis.ffcdesc.attr("opacity", 0)
        vis.mfcdesc.attr("opacity", 0)
    }
    else if (category === "sor"){
        vis.gendesc.attr("opacity", 0)
        vis.sordesc.attr("opacity", 1)
        vis.fratdesc.attr("opacity", 0)
        vis.ffcdesc.attr("opacity", 0)
        vis.mfcdesc.attr("opacity", 0)
    }
    else if (category === "frat"){
        vis.gendesc.attr("opacity", 0)
        vis.sordesc.attr("opacity", 0)
        vis.fratdesc.attr("opacity", 1)
        vis.ffcdesc.attr("opacity", 0)
        vis.mfcdesc.attr("opacity", 0)
    }
    else if (category === "ffc"){
        vis.gendesc.attr("opacity", 0)
        vis.sordesc.attr("opacity", 0)
        vis.fratdesc.attr("opacity", 0)
        vis.ffcdesc.attr("opacity", 1)
        vis.mfcdesc.attr("opacity", 0)
    }
    else{
        vis.gendesc.attr("opacity", 0)
        vis.sordesc.attr("opacity", 0)
        vis.fratdesc.attr("opacity", 0)
        vis.ffcdesc.attr("opacity", 0)
        vis.mfcdesc.attr("opacity", 1)
    }

}



