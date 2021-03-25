// create variable for data.js
var tableData = data;

// create a variable for the table body
var tbody = d3.select("tbody");

// create a variable for the button
var button = d3.select("#filter-btn");

//Build a runEnter function when the user submits entry
function updateTable(filtered_data) {
    //When the user submits, have the new information append to the table
    filtered_data.forEach(instance => {
        var row = tbody.append("tr");
        Object.entries(instance).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });    
};



//create a function to update the filter if different filters are being used
function updateFilter() {
    // first prevent the page from refreshing 
    d3.event.preventDefault();

    tbody.html("");

    const create_filter = (key) => {

        lookingfor = d3.select(`#${key}`).property("value");

        const filter = (observed) => {

            if (lookingfor === "") {
                return true;
            } else {
                return observed[`${key}`] === lookingfor;
            }

        }

        return filter;

    } 

    const date_filter = create_filter("datetime");
    const city_filter = create_filter("city");
    const state_filter = create_filter("state");
    const country_filter = create_filter("country");
    const shape_filter = create_filter("shape");
    
    filtered_data = tableData.filter(date_filter);
    filtered_data = filtered_data.filter(city_filter);
    filtered_data = filtered_data.filter(state_filter);
    filtered_data = filtered_data.filter(country_filter);
    filtered_data = filtered_data.filter(shape_filter);

    updateTable(filtered_data);

};



//create the event handler
d3.selectAll("input").on("change", updateFilter);
button.on("click", updateFilter);

window.onload = (event) => {
    updateTable(tableData);
};







