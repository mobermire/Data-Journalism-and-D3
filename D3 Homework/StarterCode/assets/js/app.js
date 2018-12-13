// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 70
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
// =================================
d3.csv("assets/data/data.csv").then(function(hwData){
  console.log(hwData)

  // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================
  hwData.forEach(function(data) {
    data.age = +data.age;
    data.income = +data.income;
  });
  // Step 5: Create Scales
  //= ============================================
  var xScale = d3.scaleLinear()
    .domain([d3.min(hwData, d => d.age), d3.max(hwData, d => d.age)])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(hwData, d => d.income)])
    .range([height, 0]);


  // Step 6: Create Axes
  // =============================================
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);


  // Step 7: Append the axes to the chartGroup - ADD STYLING
  // ==============================================
  // Add bottomAxis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add leftAxis
  chartGroup.append("g")
    .call(leftAxis);

  // Step 8: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(hwData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.age))
    .attr("cy", d => yScale(d.income))
    .attr("r", "12")
    .attr("fill", "cyan")
    .attr("opacity", ".7")

    // Step 9: Create axes labels
    // ==============================

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height/2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Income");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top +30 })`)
      .attr("class", "axisText")
      .text("Age");

      // create state labels
    chartGroup.selectAll(".stateText")
    .data(hwData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("class","stateText")
    .attr("opacity", "1")
    .attr("y", d => yScale(d.income)+5)
    .attr("x", d => xScale(d.age))

});
