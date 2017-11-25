allData = [];
var peerinstitutions = [];
var peerinstitutions_norm = [];
var timelineData;
var usgso_initialData;
var categories;
var count = 0;
// Initialize variables to save the charts later


queue()
    .defer(d3.csv,"data/timeline.csv")
    .defer(d3.csv,"data/ugsgo_initial_status.csv")
    .defer(d3.csv,"data/ugsgo_current_status.csv")
    .defer(d3.csv,"data/peer-institutions.csv")
    .defer(d3.csv,"data/peer-institutions_normalized.csv")
    .await(loadVis);

function loadVis(error, timelineData, usgso_initialData, usgso_currentData, peerinstitutionsData, peerinstitutionsNormalized){
    if(error) { console.log(error); }

    // refine data (convert numbers)
    peerinstitutionsData.forEach(function(d) {
        d.student_body = +d.student_body;
        d.tuition = +d.tuition;
        d.student_housing = +d.student_housing;
        d.acceptance_rate = +d.acceptance_rate;
        d.athletics = +d.athletics;
        d.median_family_income = +d.median_family_income;
        d.top_20_percent = +d.top_20_percent;
    });

    peerinstitutionsNormalized.forEach(function(d) {
        d.student_body = +d.student_body;
        d.tuition = +d.tuition;
        d.student_housing = +d.student_housing;
        d.acceptance_rate = +d.acceptance_rate;
        d.athletics = +d.athletics;
        d.median_family_income = +d.median_family_income;
        d.top_20_percent = +d.top_20_percent;
    });

    usgso_initialData.forEach(function (d){
        d.id = +d.id;
        d.coed_fc = +d.coed_fc;
        d.frat = +d.frat;
        d.male_fc = +d.male_fc;
        d.sor = +d.sor;
        d.female_fc = +d.female_fc;
    });

    usgso_currentData.forEach(function (d){
        d.id = +d.id;
        d.coed_fc = +d.coed_fc;
        d.frat = +d.frat;
        d.male_fc = +d.male_fc;
        d.sor = +d.sor;
        d.female_fc = +d.female_fc;
    });


    // map data

    peerinstitutionsData.forEach(function(d) {
        peerinstitutions[d.school] = d;
    })

    peerinstitutionsNormalized.forEach(function(d) {
        peerinstitutions_norm[d.school] = d;
    })

    console.log(timelineData);
    console.log(usgso_initialData);
    console.log(usgso_currentData);
    console.log(peerinstitutions);
    console.log(peerinstitutions_norm);

    var radarvis = new RadarVis("radarvis", peerinstitutions, peerinstitutions_norm)

    var timelinevis = new TimelineVis("timelinevis", timelineData);

    categories = new Categories("categories", usgso_initialData, usgso_currentData);
};

function gatherData() {
    $('#start').hide();
    categories.wrangleData();
    categories.updateVis();

}

function beforeSanctions() {
    categories.updateVis();

}

function afterSanctions() {
    categories.updateVis();
    categories.current();
}

function filterView() {
    if (count === 0){
        categories.updateVis();
        count++;
    }
    categories.filter();
}

function myFunction() {
    console.log("scrolled")
}


