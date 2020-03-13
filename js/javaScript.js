// Get the faculty information
var facultyPromise = d3.json("employee.json")
facultyPromise.then(
function(employees){createTables(employees)},function(err){console.log("failed:",err)});

// Creates information as necessary
var createTables = function(employees) {
    facultyTable(employees);
    facultyNonTable(employees);
}

// Create the table
var facultyTable = function(employees)
{
    var rows = d3.select("#facultyTable tbody")
      .selectAll("tr")
      .data(employees)
      .enter()
      .append("tr");
    
    // Repetitive, but no way to shorten
    rows.append("td")
    .text(function(employee){return employee.firstName})
    
    rows.append("td")
    .text(function(employee){return employee.lastName})
    
    rows.append("td")
    .append("img")
    .attr("src",function(employee){return employee.photo})
    
    rows.append("td")
    .text(function(employee){return employee.title})
    
    rows.append("td")
    .text(function(employee){return employee.unit})
    
    rows.append("td")
    .text(function(employee){return employee.email})
    
    rows.append("td")
    .text(function(employee){return employee.bio})
    
    rows.append("td")
    .text(function(employee){return employee.phone})
}

var facultyNonTable = function(employees) {
    // Create the employee cards and add an event listener
    var cards = d3.select("#employeeCards")
      .selectAll("div")
      .data(employees)
      .enter()
      .append("div").classed("employee not-clicked", true).on("click", function(){
          // Select this employee
          var thisEmployee = d3.select(this);
          
          // If the employee has been clicked, hide their details
          // If the employee has not been clicked, show their details
          if(thisEmployee.classed("clicked")) {
              thisEmployee.classed("not-clicked", true).classed("clicked", false);
              thisEmployee.select(".detail").remove();
          } else {
              thisEmployee.classed("not-clicked", false).classed("clicked", true);
              employeeDetail = d3.select(this).append("div").classed("detail", true);
              employeeDetail.append("span").classed("title", true).text(function(employee){return employee.title});
              employeeDetail.append("span").classed("department", true).text(function(employee){return employee.unit});
              employeeDetail.append("span").classed("email", true).text(function(employee){return employee.email});
              employeeDetail.append("p").classed("bio", true).text(function(employee){return employee.bio});
          }
      });
    
    // Append the base information
    employeeHead = cards.append("div")
      .classed("general", true);
    
    employeeHead.append("span").classed("eName", true).text(function(employee){return employee.firstName + " " + employee.lastName});
    employeeHead.append("img").attr("src", function(employee){return employee.photo});
    
}


