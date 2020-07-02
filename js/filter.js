function filterFunc(event) {
    var filter = event.target.value.toUpperCase().trim().replace(/ /g,"_");
    var rows = document.querySelector("#fullTable tbody").rows;
    for (var i = 0; i < rows.length; i++) {
        var colOne = rows[i].cells[1].textContent.toUpperCase();
        var colTwo = rows[i].cells[2].textContent.toUpperCase();
        var colThree = rows[i].cells[3].textContent.toUpperCase();
        var colFour = rows[i].cells[4].textContent.toUpperCase();
        var colFive = rows[i].cells[5].textContent.toUpperCase();
        if (colOne.indexOf(filter) > -1 || colTwo.indexOf(filter) > -1 ||
        colThree.indexOf(filter) > -1 || colFour.indexOf(filter) > -1  ||
        colFive.indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}


function searchMDD(elem) {
    var data = "/assets/data/mdd.csv";
    var speciesID = elem.value;
    var resultsDisplay = document.createElement("table");
    resultsDisplay.setAttribute("id", "speciesInfo");
    var mddTable = document.getElementById("fullTable");
    var speciesData = {};
    if (document.getElementById("speciesInfo")) {
        var id = document.getElementById("speciesInfo");
        id.parentNode.removeChild(id);
    }
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,  
        complete: function(results) {
        for (var i = 0; i < results.data.length; i ++) {
            if (speciesID == results.data[i].id) {
                speciesData = results.data[i];
            }
        }
        if (document.location.hash != "") {
            var permalink = document.URL;            
        } else {
            var permalink = document.URL + "species-id=" + speciesID;
        }
        document.location = permalink;
        var specPermalink = document.createElement("a");
        specPermalink.innerHTML = "Species Permalink: " + "<a href="+ permalink + ">" 
        + permalink + "</a>";
        var specHead = document.createElement("h2");
        var speciesName = speciesData.Genus + " " + speciesData.specific_epithet
        specHead.innerHTML = speciesName.italics() + " " 
        + speciesData.Authority_sp_author + ", " + speciesData.Authority_sp_year;
        var specTax = document.createElement("ul");
        specTax.textContent = "Order: " + speciesData.Order.charAt(0) + speciesData.Order.slice(1).toLowerCase() 
        + " -- " + "Family: " + speciesData.Family.charAt(0) + speciesData.Family.slice(1).toLowerCase() +
        " -- " + "Subfamily: " + speciesData.Subfamily.charAt(0) + speciesData.Subfamily.slice(1).toLowerCase() +
        " -- " + "Tribe: " + speciesData.Tribe.charAt(0) + speciesData.Tribe.slice(1).toLowerCase();
        var specNotes = document.createElement("ul")
        specNotes.innerHTML = "<br>" + "Species specific notes: " + speciesData.TaxonomyNotes + "<br>" +
        "Citation: " + speciesData.TaxonomyNotes_Citation;
        resultsDisplay.appendChild(specHead);
        resultsDisplay.appendChild(specTax);
        resultsDisplay.appendChild(specNotes);
        resultsDisplay.appendChild(specPermalink);
        console.log(speciesData);
        document.body.insertBefore(resultsDisplay, mddTable);
        },
    })
}

function goPermalink(event) {
    if (document.location.hash != "") {
        speciesID = document.location.hash.split("=")[1];
        var element = document.createElement("input");
        element.value = speciesID
        console.log(speciesID);
        searchMDD(element);
    }
}

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
