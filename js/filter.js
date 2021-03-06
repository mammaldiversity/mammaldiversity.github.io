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
function parseURLforParameters() {
                          
   var params = {};
   var res = document.location.hash.replace("#", "").split("&");                   // split parameters on &
   
   res.forEach(function(item,index,array) {                           // for each parameter string

       var param = item.split("=");                                   // split parameter name and value
          switch (param[0]) {                                         // set params[]
             case "family":     params['family']    = param[1];break;
             case "order":      params['order']     = param[1];break;
             case "genus":      params['genus']     = param[1];break;
             case "species-id": params['speciesID'] = param[1];break;
             case "search":     params['search']    = param[1];break;
          };
   }, this);
   console.log(params);

   return params;
}
function goPermalink(event) {
    if (document.location.hash != "") {
        //speciesID = document.location.hash.split("=")[1];
        var params = parseURLforParameters();
        console.log(params);


        
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
        },
    })
}


function createOrderTable(event) {
    var data = "/assets/data/mdd.csv";
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            var orders = [];
            var orderTable = document.getElementById("orderTable")
            for (var i = 0; i < results.data.length; i++) {
                if (!orders.includes(results.data[i].Order)) {
                    orders.push(results.data[i].Order);
                }
            }
            for (var i = 0; i < orders.length; i++) {
                var newRow = document.createElement("tr");
                var inner = "<input id='" + orders[i] + "' onClick='fillFamily(this)' type='button' value=" +
                orders[i].charAt(0) + orders[i].slice(1).toLowerCase() + ">";
                newRow.innerHTML = inner;
                orderTable.appendChild(newRow);
            }
        }
    })
}

function fillFamily(event) {
    var data = "/assets/data/mdd.csv";
    var order = event.value.toUpperCase();
    if (document.getElementById("familyTable")) {
        var oldFamilyTable = document.getElementById("familyTable");
        document.body.removeChild(oldFamilyTable);
    }
    console.log
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            var families = [];
            for (var i = 0; i < results.data.length; i++) {
                if (results.data[i].Order == order){
                    if (!families.includes(results.data[i].Family)) {
                        families.push(results.data[i].Family);
                    }
                }
            }
            var orderTable = document.getElementById("orderTable");
            orderTable.style = "float:left";
            var familyTable = document.createElement("table");
            familyTable.id = "familyTable";
            familyTable.style = "float: right"
            var familyHeader = document.createElement("thead");
            var familyHeaderRow = document.createElement("th");
            familyHeaderRow.innerHTML = "<tr>Family</tr>";
            familyHeader.appendChild(familyHeaderRow);
            familyTable.appendChild(familyHeader);
            for (var i = 0; i < families.length; i++) {
                var newRow = document.createElement("tr");
                var inner = "<input type='button' value=" +
                families[i].charAt(0) + families[i].slice(1).toLowerCase() + ">";
                newRow.innerHTML = inner;
                familyTable.appendChild(newRow);
            }
            document.body.appendChild(familyTable);
        }
    })
}
