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
        document.body.insertBefore(resultsDisplay, mddTable);
        },
    })
}

function goPermalink(event) {
    if (document.location.hash != "") {
        speciesID = document.location.hash.split("=")[1];
        var element = document.createElement("input");
        element.value = speciesID
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
                newRow.id = orders[i];
                var orderEntry = document.createElement("td");
                var familyCount = document.createElement("td");
                var generaCount = document.createElement("td");
                var speicesCount = document.createElement("td");
                var orderInner = "<input onClick='fillFamily(this)' type='button' value=" +
                orders[i].charAt(0) + orders[i].slice(1).toLowerCase() + ">";
                orderEntry.innerHTML = orderInner;
                var family = "";
                var totFamilies = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i] == results.data[j].Order) {
                        if (!family.includes(results.data[j].Family)) {
                            family += results.data[j].Family;
                            totFamilies += 1;
                        }
                    }
                }
                var genus = "";
                var totGenera = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i] == results.data[j].Order) {
                        if (!genus.includes(results.data[j].Genus)) {
                            genus += results.data[j].Genus;
                            totGenera += 1;
                        }
                    }
                }
                var species = "";
                var totSpecies = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i] == results.data[j].Order) {
                        if (!species.includes(results.data[j].specific_epithet)) {
                            species += results.data[j].specific_epithet;
                            totSpecies += 1;
                        }
                    }
                }
                familyCount.textContent = totFamilies;
                generaCount.textContent = totGenera;
                speicesCount.textContent = totSpecies;
                newRow.appendChild(orderEntry);
                newRow.appendChild(familyCount);
                newRow.appendChild(generaCount);
                newRow.appendChild(speicesCount);
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
            for (var i = 0; i < families.length; i++) {
                var generaCount = document.createElement("td");
                var speciesCount = document.createElement("td");
                var genus = "";
                var totGenera = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (families[i] == results.data[j].Family) {
                        if (!genus.includes(results.data[j].Genus)) {
                            genus += results.data[j].Genus;
                            totGenera += 1;
                        }
                    }
                }
                var species = "";
                var totSpecies = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (families[i] == results.data[j].Family) {
                        if (!species.includes(results.data[j].specific_epithet)) {
                            species += results.data[j].specific_epithet;
                            totSpecies += 1;
                        }
                    }
                }
                generaCount.textContent = totGenera;
                speciesCount.textContent = totSpecies;
                var familyRow = document.createElement("tr");
                familyRow.id = families[i];
                var familyEntry = document.createElement("td");
                var blankEntry = document.createElement("td");              
                var familyInner = "<input onClick='fillGenera(this)'type='button' value=" +
                    families[i].charAt(0) + families[i].slice(1).toLowerCase() + ">";
                familyEntry.innerHTML = familyInner;
                if (document.getElementById(families[i]) != null) {
                    break;
                }
                familyRow.appendChild(blankEntry);
                familyRow.appendChild(familyEntry);
                familyRow.appendChild(generaCount);
                familyRow.appendChild(speciesCount);
                var orderRow = document.getElementById(order);
                orderTable.insertBefore(familyRow, orderRow.nextSibling);  
            }
        }
    })
}

function fillGenera(event) {
    var data = "/assets/data/mdd.csv";
    var family = event.value.toUpperCase();
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            var genera = [];
            for (var i = 0; i < results.data.length; i++) {
                if (results.data[i].Family == family){
                    if (!genera.includes(results.data[i].Genus)) {
                        genera.push(results.data[i].Genus);
                    }
                }
            }
            for (var i = 0; i < genera.length; i++) {
                var species = "";
                var totSpecies = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (genera[i] == results.data[j].Genus) {
                        if (!species.includes(results.data[j].specific_epithet)) {
                            species += results.data[j].specific_epithet;
                            totSpecies += 1;
                        }
                    }
                }
                var speciesCount = document.createElement("td");
                speciesCount.textContent = totSpecies;
                var genusRow = document.createElement("tr");
                var genusID = genera[i].toUpperCase();
                genusRow.id = genusID;
                var genusEntry = document.createElement("td");
                var blankEntry = document.createElement("td");
                var blankEntry2 = document.createElement("td");              
                var genusInner = "<input type='button' onClick='fillSpecies(this)' value=" +
                genera[i].charAt(0) + genera[i].slice(1).toLowerCase() + ">";
                genusEntry.innerHTML = genusInner;
                if (document.getElementById(genusID) != null) {
                    break;
                }
                genusRow.appendChild(blankEntry);
                genusRow.appendChild(blankEntry2);
                genusRow.appendChild(genusEntry);
                genusRow.appendChild(speciesCount);
                var familyRow = document.getElementById(family);
                orderTable.insertBefore(genusRow, familyRow.nextSibling);  
            }
        }
    })
}

function fillSpecies(event) {
    var data = "/assets/data/mdd.csv";
    var genus = event.value.toUpperCase();
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            var species = [];
            var speciesID = []
            for (var i = 0; i < results.data.length; i++) {
                if (results.data[i].Genus.toUpperCase() == genus){
                    if (!species.includes(results.data[i].specific_epithet)) {
                        species.push(results.data[i].specific_epithet);
                        speciesID.push(results.data[i].id);
                    }
                }
            }
            for (var i = 0; i < species.length; i ++) {
                var speciesRow = document.createElement("tr");
                speciesRow.id = species[i];
                var speciesEntry = document.createElement("td");
                var blankEntry = document.createElement("td");
                var blankEntry2 = document.createElement("td");   
                var blankEntry3 = document.createElement("td");           
                var speciesInner = "<a href='http://mammaldiversity.github.io/explore.html#species-id=" 
                    + speciesID[i] + "'>" + species[i] + "</a>";
                speciesEntry.innerHTML = speciesInner;
                if (document.getElementById(species[i])) {
                    break;
                }
                speciesRow.appendChild(blankEntry);
                speciesRow.appendChild(blankEntry2);
                speciesRow.appendChild(blankEntry3);
                speciesRow.appendChild(speciesEntry);
                var genusRow = document.getElementById(genus);
                orderTable.insertBefore(speciesRow, genusRow.nextSibling);
            }  
        }
    })
}