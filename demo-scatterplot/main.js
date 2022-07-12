d3.csv("./GapminderData.csv").then(data => {
    // Your code here
    const width = 800
    const height = 400
  
    const yScale = d3.scaleLinear() // This is a linear scale. So we use d3's scaleLinear.
                     .domain([0,100]) // INPUT. This tells the scale that the input values from the dataset will be between 0 and 100
                     .range([height,0])// for the range, you need to know the width and the height of the chart.
                                       // the range is what you are getting out- it could be pixels,colors, shapes...

    const minIncome = d3.min(data, d => +d.income_per_person_gdppercapita_ppp_inflation_adjusted)
    const maxIncome = d3.max(data, d => +d.income_per_person_gdppercapita_ppp_inflation_adjusted)
    //终于找到问题出在哪里了：本来第二行的d3.max写成了d3.min.....现在改过来了！

    const minMaxIncome = d3.extent(data, d => +d.income_per_person_gdppercapita_ppp_inflation_adjusted)
  
    const xScale = d3.scaleLog()
                     .domain([minIncome, maxIncome])
                     .range([0, width])
  
    const populationExtent = d3.extent(data, d => +d.population_total)
  
    const radiusScale = d3.scaleSqrt().domain(populationExtent).range([2, 40])
  
    const regionColors = {
      africa: "deepskyblue",
      asia: "tomato",
      americas: "limegreen",
      europe: "gold"
    }
  
    const svg = d3.select("#chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
  
    svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScale(+d.income_per_person_gdppercapita_ppp_inflation_adjusted))
      .attr("cy", d => yScale(+d.life_expectancy_years))
      .attr("r", d => radiusScale(+d.population_total))
      .attr("opacity",0.75)
      .attr("fill", d => regionColors[d.region])
      .attr("stroke","black")
      
    const xAxis = d3.axisBottom(xScale)

    // g refers to general group elements
    svg.append("g")
       .attr("transform","translate(0, " + (height - 20) + ")")
        // "transform=translate(0,height)"
        .call(xAxis)

    const yAxis = d3.axisLeft(yScale)

    svg.append("g")
      .attr("transform", "translate(20, 0)")
      .call(yAxis)

  })