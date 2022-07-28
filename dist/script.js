// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 
document.addEventListener('DOMContentLoaded', function () {
  req = new XMLHttpRequest();
  req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
  req.send();
  req.onload = function () {
    json = JSON.parse(req.responseText);
    var dataset = json;

    let parseTime = rawTime => {
      let time = new Date();
      let [mm, ss] = rawTime.split(":");
      time.setMinutes(mm);
      time.setSeconds(ss);
      return time;
    };




    var formatTime = d3.timeParse("%M:%S"),
    formatMinutes = function (d) {
      console.log("***" + d);return formatTime(new Date(2012, 0, 1, 0, d));};

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("a").
    append("svg").
    attr("width", width + margin.left + margin.right).
    attr("height", height + margin.top + margin.bottom).
    append("g").
    attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


    // Add X axis
    var x = d3.scaleLinear().
    domain([d3.min(json, (d) =>
    d.Year), d3.max(json, d => d.Year)]).
    range([0, width]);
    x.ticks();
    ;

    svg.append("g").
    attr("transform", "translate(0," + height + ")").
    attr("id", "x-axis").
    call(d3.axisBottom(x).tickFormat(d3.format("d")));


    // Add Y axis
    //    const xScale = d3.scaleLinear().rangeRound([0, width]);

    //const yScale = d3.scaleLinear().range([height, 0]);

    //  xScale.domain(d3.extent(json, d => d.Year);
    // yScale.domain([0, d3.max(json, d => d.Time)]);


    var y = d3.scaleTime().
    domain([d3.min(json, d => {
      //return creaTempo(d.Time).getTime()
      return d.Seconds * 1000;
    }), d3.max(json, d => {
      return d.Seconds * 1000;})]).
    range([height, 0]);

    console.log(y.domain());

    y.ticks();
    ;

    svg.append("g").
    attr("id", "y-axis").
    call(d3.axisLeft(y).tickFormat(d3.timeFormat("%M:%S")));


    // Add dots
    svg.append('g').
    selectAll("dot").
    data(json).
    enter().
    append("circle").
    attr("class", "dot").
    attr("data-xvalue", d => d.Year).
    attr("data-yvalue", d => {
      return parseTime(d.Time);}).
    attr("cx", function (d) {return x(d.Year);}).
    attr("cy", function (d) {//console.log(y(d.Seconds*1000)); 
      return y(d.Seconds * 1000);}).
    attr("r", 4).
    attr("doping", d => d.Doping ? "noDoping" : "yesDoping");
    // .style("fill", "#69b3a2")

    var tooltip = d3.select(".graph").
    append("div").
    style("position", "absolute").
    style("visibility", "hidden").
    attr("id", "tooltip");


    d3.selectAll(".dot").
    on("mouseover", (d, idx) => {
      //console.log(idx);
      tooltip.style("visibility", "visible");
      tooltip.html(idx.Name + " " + idx.Time + " <br> " + "" + idx.Doping);
      tooltip.attr("data-year", idx.Year).
      style("top", event.pageY - 2 + "px").
      style("left", event.pageX + 2 + "px").
      style("opacity", 0.9).

      style("transform", "translateX(60px)");
      //console.log();
    }).
    on("mouseout", function () {return tooltip.style("visibility", "hidden");});

    //legend
    const theColors = d3.scaleOrdinal() // For the legend
    .domain(["pippo", ""]).
    range(["green", "red"]);


    const legend = svg.selectAll(".legend").
    data(theColors.domain()).
    enter().
    append("g").
    attr("class", "legend").
    attr("transform", (d, i) => "translate(0," + i * 20 + ")");

    legend.append("rect").
    attr("id", "legend").
    attr("x", width - 50).
    attr("y", 80).
    attr("width", 15).
    attr("height", 15).
    attr("doping", d => d ? "yesDoping" : "noDoping");

    legend.append("text").
    attr("x", width - 55).
    attr("y", 88).
    attr("dy", "0.25em").
    style("text-anchor", "end").
    style("font-family", "arial").
    text(d => d ? "No doping" : "Doping");


    //svg.attr("fill", "red");
    console.log("pippo");

  };

});