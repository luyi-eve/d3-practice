/* "#"" represents id; "." represents class */

// load the data from CSV
d3.csv("./oscars.csv")
    .then(data => {

        const years = data.filter(item => item.winner === "1").map(item => item.year)
        console.log(years)

        // d3 selects our element with id of "year"
        d3.select("#year")
          // go and select our future "option" elements with the class "opt"
          .selectAll("option.opt")
          // bind our data to that selection
          .data(years)
          // join to our selection
          // this is the same as .enter().append("years")
          .join("option")
          // give that option a class, so that it matches our original selection above: option.opt
          .attr("class","opt")
          // set the value as d which in this case is the year
          .attr("value",d => d)
          // set the text as d which in this case is the year
          .text(d => d)

        // d3 select the button
        d3.select("#result")
          // give it a click event listener
          .on("click",() => {
             const selectedYear = d3.select("#year").node().value;
             const winner = data.find(item => item.year === selectedYear && item.winner === "1")
             
             d3.select(".movie")
               .text(winner.name)

             d3.select(".movie-sentence")
              .classed("hide",false)
          })
    })