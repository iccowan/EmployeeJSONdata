var facultyPromise = d3.json("employee.json")
facultyPromise.then(
function(employees){facultyTable(employees)},function(err){console.log("failed:",err)});

var facultyTable = function(employees)
{
    var rows = d3.select("#facultyTable tbody")
      .selectAll("tr")
      .data(employees)
      .enter()
      .append("tr");
    
    rows.append("td")
    .text(function(employee){return employee.firstName})
    
}