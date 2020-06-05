function filterFunc(event) {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#fullTable tbody").rows;

    for (var i = 0; i < rows.length; i++) {
        var colOne = rows[i].cells[1].textContent.toUpperCase();
        var colTwo = rows[i].cells[2].textContent.toUpperCase();
        var colThree = rows[i].cells[3].textContent.toUpperCase();
        var colFour = rows[i].cells[4].textContent.toUpperCase();
        if (colOne.indexOf(filter) > -1 || colTwo.indexOf(filter) > -1 ||
        colThree.indexOf(filter) > -1 || colFour.indexOf(filter) > -1 ) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}


    // Create json data object from CSV to populate search
    function searchMDD(elem) {
        var data = "/assets/data/mdd.csv";
        var speciesID = elem.value;
        var resultsDisplay = document.createElement("p");
        resultsDisplay.setAttribute("id", "speciesInfo");
        var mddTable = document.getElementById("fullTable");
        if (document.getElementById("speciesInfo")) {
            var id = document.getElementById("speciesInfo");
            id.parentNode.removeChild(id);
        }
        Papa.parse(data, {
            header: true,
            delimiter: ",",
            download: true,  
            complete: function(results) {
            console.log("Finished");
            for (var i = 0; i < results.data.length; i ++) {
                if (speciesID == results.data[i].id) {
                        for (let [key, value] of Object.entries(results.data[i])) {
                            var speciesData = document.createTextNode(`${key}: ${value}`);
                            resultsDisplay.appendChild(speciesData);
                            var breakChar = document.createElement("br");
                            resultsDisplay.appendChild(breakChar);
                            document.body.insertBefore(resultsDisplay, mddTable);
                        }
                }
            }
            },
        })
    }


// Function to populate stats table on main page.
// Called when page is loaded.
function populateStats(event) {
    var data = "/assets/data/mdd.csv";
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            var totSpecies = results.data.length;
            var orders = "";
            var genera = "";
            var families = "";
            var totOrders = 0;
            var totGenera = 0;
            var totFamilies = 0;
            for (var i = 0; i < results.data.length; i++) {
                if (!families.includes(results.data[i].Family)) {
                    families += results.data[i].Family;
                    totFamilies++;
                }
                if (!orders.includes(results.data[i].Order)) {
                    orders += results.data[i].Order;
                    totOrders++;
                }
                if (!genera.includes(results.data[i].Genus)) {
                    genera += results.data[i].Genus;
                    totGenera++;
                }
            }
            document.getElementById("species").innerHTML += totSpecies;
            document.getElementById("orders").innerHTML += totOrders;
            document.getElementById("genera").innerHTML += totGenera;
            document.getElementById("families").innerHTML += totFamilies;
            console.log("Total number of species is ", totSpecies);
            console.log("Total number of families is ", totFamilies);
            console.log("Total number of orders is ", totOrders);
            console.log("Total number of genera is ", totGenera);
        },
    })
}
