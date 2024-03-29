// RADAR CHART

// SOURCE: http://bl.ocks.org/nbremer/6506614
// a lot of modifications have been made to this base code to suit the needs for our visualization 
// this base code was primarily used for establishing the area regions for this radar chart


// d3-tip js library adapted from previous homeworks and labs in class


var RadarChart = {
  draw: function(id, d, axisdata, originaldata, options){
  var cfg = {
	 radius: 5,
	 w: 600,
	 h: 600,
	 factor: 1,
	 factorLegend: .85,
	 levels: 3,
	 maxValue: 0,
	 radians: 2 * Math.PI,
	 opacityArea: 0.5,
	 ToRight: 5,
	 TranslateX: 120,
	 TranslateY: 30,
	 ExtraWidthX: 100,
	 ExtraWidthY: 100,
	 color: d3.scaleOrdinal(d3.schemeCategory10)
	};
      
//    console.log(axisdata)
//    console.log(d3.scaleOrdinal(d3.schemeCategory10));
	
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){
		  cfg[i] = options[i];
		}
	  }
	}
	cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	var allAxis = (d[0].map(function(i, j){return i.axis}));
	var total = allAxis.length;
	var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
	var Format = d3.format('%');
	d3.select(id).select("svg").remove();
	
	var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w+cfg.ExtraWidthX)
			.attr("height", cfg.h+cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
			;

    // initialize tooltip 
	var tooltip; 
            
    tooltip = d3.tip()
		.attr('class', 'd3-tip')
		.html(function(d) {
			return  "<span class='tooltip-radar-title'>" + d.school +
				"</span> <br /> <span class='tooltip-radar-subtitle'>" + d.axis
				+ "</span> <br />" + "<span class='tooltip-radar-desc'>" + d.label + "</span>"
		});

    tooltip.offset([-15, 0]);

    // invoke tooltip 
    g.call(tooltip)
    
    // initialize school label 
 	var label; 
             
    label = d3.tip();
 
    // invoke tooltip 
    g.call(label);

    d3.select("#peertable").html("<div class='peerpanel panel panel-default'><div class='panel-heading' style='color: black; background-color:none'>School</div><table class='table table-hover'><tbody><tr><th scope='row'>Student Body Population</th><td></td></tr><tr><th scope='row'>Median Family Income</th><td></td></tr><tr><th scope='row'>Percent of Students in Athletics</th><td></td></tr><tr><th scope='row'>Percent of Students in School Housing</th><td></td></tr><tr><th scope='row'>Acceptance Rate</th><td></td></tr><tr><th scope='row'>Yearly Tuition Cost</th><td></td></tr></tbody></table></div>");
      
	//Circular segments
	for(var j=0; j<cfg.levels-1; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data(allAxis)
	   .enter()
	   .append("svg:line")
	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
	   .attr("class", "line")
	   .style("stroke", "grey")
	   .style("stroke-opacity", "0.75")
	   .style("stroke-width", "0.3px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	}

	series = 0;

	var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

	axis.append("line")
		.attr("x1", cfg.w/2)
		.attr("y1", cfg.h/2)
		.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
		.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
		.attr("class", "line")
		.style("stroke", "grey")
		.style("stroke-width", "1px");
 
    label_school = [];
	d.forEach(function(y, x){
	  dataValues = [];
      label_school[series] = y[0].school;
      label.attr('class', 'd3-tip tooltip-radar').html(function(d) { return "<span class='tooltip-radar-title'>" + label_school[series] + "</span>" }); 
	  g.selectAll(".nodes")
		.data(y, function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		  ]);
		});
	  dataValues.push(dataValues[0]);
	  g.selectAll(".area")
					 .data([dataValues])
					 .enter()
					 .append("polygon")
					 .attr("class", "radar-chart-serie"+series)
                     .attr("class", "hover-cursor")
                     .attr("class", label_school[series])
					 .style("stroke-width", "2px")
                     .style("cursor", "pointer")
					 .style("stroke", cfg.color(series))
					 .attr("points",function(d) {
						 var str="";
						 for(var pti=0;pti<d.length;pti++){
							 str=str+d[pti][0]+","+d[pti][1]+" ";
						 }
						 return str;
					  })
					 .style("fill", function(j, i){return cfg.color(series)})
					 .style("fill-opacity", cfg.opacityArea)
					 .on('mouseover', function (d){
										z = "polygon."+d3.select(this).attr("class");
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", 0.1); 
										g.selectAll(z)
										 .transition(200)
										 .style("fill-opacity", .7);
                                        g.append("rect")
                                         .attr('x', 145)
 						                 .attr('y', 190)
                                         .attr('width', 120)
                                         .attr('height', 30)
                                         .attr("class", "radar-label")
                                         .attr("fill", "#737373")
                                         .attr("fill-opacity", "0.6");
                                        g.append("text")
                                         .attr('x', 165)
 						                 .attr('y', 210)
                                         .attr("class", "radar-label radar-label-school")
                                         .text(d3.select(this).attr("class"));
									  })
					 .on('mouseout', function(){
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", cfg.opacityArea);
                                        g.selectAll(".radar-label").remove();
					 })
                    .on('click', function() {
                                    school = d3.select(this).attr("class");
                                    d3.select("#peertable").html("<div class='peerpanel panel panel-default'><div class='panel-heading' style='color: #ffffff; background-color:" + cfg.color(["Williams", "Bowdoin", "Amherst", "Harvard"].indexOf(school)) + "'>" +  originaldata[school].school + "</div><table class='table table-hover'><tbody><tr><th scope='row'>Student Body Population</th><td>" + originaldata[school].student_body + " students </td></tr><tr><th scope='row'>Median Family Income</th><td>$" + originaldata[school].median_family_income + "</td></tr><tr><th scope='row'>Percent of Students in Athletics</th><td>" + originaldata[school].athletics + "%</td></tr><tr><th scope='row'>Percent of Students in School Housing</th><td>" + originaldata[school].student_housing + "%</td></tr><tr><th scope='row'>Acceptance Rate</th><td>" + originaldata[school].acceptance_rate + "%</td></tr><tr><th scope='row'>Yearly Tuition Cost</th><td>$" + originaldata[school].tuition + "</td></tr></tbody></table></div>")
                })
	  series++;
	});
	series=0;

	d.forEach(function(y, x){
	  g.selectAll(".nodes")
		.data(y).enter()
		.append("svg:circle")
		.attr("class", "radar-chart-serie"+series)
        .style("cursor", "pointer")
		.attr('r', cfg.radius)
		.attr("alt", function(j){return Math.max(j.value, 0)})
		.attr("cx", function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		]);
		return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
		})
		.attr("cy", function(j, i){
		  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
		})
		.attr("data-id", function(j){return j.axis})
		.style("fill", cfg.color(series)).style("fill-opacity", .9)
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide)
	  series++;
	});
      
    var axisMaxValues = (d.map(function(i, j){return i.axis}));
      
    // property values for the axes
    var axisproperties = Object.keys(axisdata); 
    
//    console.log(allAxis)
//    console.log(axisdata); 
     
    // swap array position of axis properties to match existing radar chart
    axisproperties.splice(2, 0, axisproperties[4]);
    axisproperties.splice(5, 1);
      
//    console.log(axisproperties);

      
    // labels for axes
    // iterate through each axis-associated property  
    for(var a=0; a < axisproperties.length; a++) {
    // iterate through each level of the axis
	for(var j=0; j < cfg.levels; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data([1]) // dummy data
	   .enter()
	   .append("text")
	   .attr("x", levelFactor*(1-cfg.factor*Math.sin(a*cfg.radians/total)))
	   .attr("y", levelFactor*(1-cfg.factor*Math.cos(a*cfg.radians/total)))
	   .attr("class", "legend")
	   .style("font-family", "sans-serif")
	   .style("font-size", "10px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
	   .attr("fill", "#606060")
       // label axes depending on specific axis property, iterarating through our array of axis proeprties and pulling the corresponding values from axisdata
	   .text(Math.round((j+1)*cfg.maxValue/cfg.levels*axisdata[axisproperties[a]]));
	}
    };
      
    // axis labels
	axis.append("text")
		.attr("class", "axislegend")
		.text(function(d){return d})
		.style("font-family", "sans-serif")
		.style("font-size", "11px")
        .style("font-weight", "bold")
		.attr("text-anchor", "middle")
        .attr("fill", "#303030")
		.attr("dy", "1.5em")
		.attr("transform", function(d, i){return "translate(-5, -14)"})
		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
	
//	//Tooltip
//	tooltip = g.append('text')
//			   .style('opacity', 0)
//			   .style('font-family', 'sans-serif')
//			   .style('font-size', '13px');
  }
};