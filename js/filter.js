function filterFunc(event) {
    var inputString = event.target.value.toUpperCase().trim().split(' ');
    var rows = document.querySelector("#fullTable tbody").rows;
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[1].cells.length - 3; j++) {
            for (var taxa = 0; taxa < inputString.length; taxa++) {
                if (inputString.length < 2 ) {
                    if (rows[i].cells[j].textContent.toUpperCase().startsWith(inputString[taxa]) 
                     || rows[i].cells[j + 1].textContent.toUpperCase().startsWith(inputString[taxa])
                     || rows[i].cells[j + 2].textContent.toUpperCase().startsWith(inputString[taxa])
                     || rows[i].cells[j + 3].textContent.toUpperCase().startsWith(inputString[taxa])
                    ) {
                        rows[i].style.display = "";
                    } else {
                        rows[i].style.display = "none";
                    }
                } else if (rows[i].cells[1].textContent.toUpperCase().startsWith(inputString[0]) 
                        && rows[i].cells[2].textContent.toUpperCase().startsWith(inputString[1])) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }

                }
            }
        }
    }


function fillSpeciesInfo(elem) {
    var data = "/assets/data/mdd.csv";
    var speciesID = elem.value;
    var resultsDisplay = document.createElement("p");
    resultsDisplay.className = "box-paragraph";
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
            specPermalink.innerHTML = "<b>Species Permalink:</b> " + "<a href="+ permalink + ">" 
            + permalink + "</a>";
            var specHead = document.createElement("h2");
            var speciesName = speciesData.Genus + " " + speciesData.specific_epithet
            specHead.innerHTML = speciesName.italics() //+ " " 
            //+ speciesData.Authority_sp_author + ", " + speciesData.Authority_sp_year;
            var specTax = document.createElement("p");
            specTax.innerHTML = "<b>Major Type:</b> " + speciesData.MajorType + " <b>-- " + "Major subtype:</b> " + speciesData.MajorSubtype + "<b> -- " + 
             "Order:</b> " + speciesData.Order.charAt(0) + speciesData.Order.slice(1).toLowerCase() 
            + "<b> -- " + "Family: </b>" + speciesData.Family.charAt(0) + speciesData.Family.slice(1).toLowerCase() +
            "<b> -- " + "Subfamily:</b> " + speciesData.Subfamily.charAt(0) + speciesData.Subfamily.slice(1).toLowerCase() +
            "<b> -- " + "Tribe: </b>" + speciesData.Tribe.charAt(0) + speciesData.Tribe.slice(1).toLowerCase();
            var specAuthority = document.createElement("p");
            specAuthority.innerHTML = "<b>Authority:</b> " + speciesData.Authority_sp_author + ", " + speciesData.Authority_sp_year;
            var specNotes = document.createElement("p")
            specNotes.innerHTML = "<br>" + "<b>Species specific notes: </b>" + speciesData.TaxonomyNotes + "<br>" +
            "<b>Citation:</b> " + speciesData.TaxonomyNotes_Citation;
            var speciesStatus = document.createElement("p");
            var extinct = "";
            if (speciesData.extinct == "0") {
                extinct = "This species is currently living,"
            } else {
                extinct = "This species went extinct in the last 500 years,"
            }
            var domestic = "";
            if (speciesData.domestic == 0 && speciesData.extinct == 0) {
                domestic = " it lives in wild habitats, "
            } else if (speciesData.domestic == 0 && speciesData.extinct == 1) {
                domestic = " it lived in wild habitats, ";
            } else if (speciesData.domestic == 1 && speciesData.extinct == 0) {
                domestic = " it lives in domestic habitats, "
            } else {
                domestic == " it lived in domestic habitats, "
            }
            var flagged = "";
            if (speciesData.flagged == 0) {
                flagged = "its taxonomic status is currently accepted, "
            } else {
                flagged = "its taxonomic status is currently flagged, "
            }
            var newSpp = "";
            if (speciesData.newSppSinceMSW3 == 0) {
                newSpp = "and it is listed in MSW3 2005."
            } else {
                newSpp = "and it is newly recognized since MSW3 2005."
            }
            speciesStatus.innerHTML ="<b>Species Status:</b> " + extinct + domestic + flagged + newSpp;
            var breakChar = document.createElement("br");
            var distribution = document.createElement("p");
            distribution.innerHTML = "<b>Geographic distribution:</b> " + speciesData.Geo_distribution;
            var voucher = document.createElement("p");
            voucher.innerHTML = "<b>Holotype voucher catalogue number:</b> " + speciesData.Holotype_voucher;
            resultsDisplay.appendChild(specHead);
            resultsDisplay.appendChild(specTax);
            resultsDisplay.appendChild(specAuthority);
            resultsDisplay.appendChild(specNotes);
            resultsDisplay.appendChild(voucher);
            resultsDisplay.appendChild(speciesStatus);
            resultsDisplay.appendChild(distribution);
            resultsDisplay.appendChild(breakChar);
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
        fillSpeciesInfo(element);
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
            var orders = [];
            var genera = [];
            var families = [];
            var totOrders = 0;
            var totGenera = 0;
            var totFamilies = 0;
            var newSpecies = 0;
            for (var i = 0; i < results.data.length; i++) {
                if (!families.includes(results.data[i].Family)) {
                    families.push(results.data[i].Family);
                    totFamilies++;
                }
                if (!orders.includes(results.data[i].Order)) {
                    orders.push(results.data[i].Order);
                    totOrders++;
                }
                if (!genera.includes(results.data[i].Genus)) {
                    genera.push(results.data[i].Genus);
                    totGenera++;
                }
                if (results.data[i].newSppSinceMSW3 == 1) {
                    newSpecies += 1;
                }
            }
            document.getElementById("species").innerHTML += totSpecies;
            document.getElementById("orders").innerHTML += totOrders;
            document.getElementById("genera").innerHTML += totGenera;
            document.getElementById("families").innerHTML += totFamilies;
            document.getElementById("newMSW3").textContent += newSpecies;
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
            orders.sort();
            var tableBody = document.createElement("tbody");
            tableBody.id = "orderBody";
            for (var i = 0; i < orders.length; i++) {
                var newRow = document.createElement("tr");
                newRow.id = orders[i];
                var majorType = document.createElement("td");
                majorType.style.cssText = "background-color: #9b9b9b";
                var majorSubtype = document.createElement("td");
                majorSubtype.style.cssText = "background-color: #9b9b9b"
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i].includes(results.data[j].Order)) {
                        majorType.textContent = results.data[j].MajorType;
                        majorSubtype.textContent = results.data[j].MajorSubtype;
                        break;
                    }
                }
                var orderEntry = document.createElement("td");
                var familyCount = document.createElement("td");
                var generaCount = document.createElement("td");
                var speicesCount = document.createElement("td");
                var extinctSpecies = document.createElement("td");
                var orderInner = "<input class='text-button' onClick='fillFamily(this)' type='button' value=" +
                orders[i].charAt(0) + orders[i].slice(1).toLowerCase() + ">";
                orderEntry.innerHTML = orderInner;
                var family = [];
                var totFamilies = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i] == results.data[j].Order) {
                        if (!family.includes(results.data[j].Family)) {
                            family.push(results.data[j].Family);
                            totFamilies += 1;
                        }
                    }
                }
                var genus = [];
                var totGenera = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i] == results.data[j].Order) {
                        if (!genus.includes(results.data[j].Genus)) {
                            genus.push(results.data[j].Genus);
                            totGenera += 1;
                        }
                    }
                }
                var species = [];
                var totSpecies = 0;
                var extinctNumber = [];
                var totExtinct = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i] == results.data[j].Order) {
                        if (!species.includes(results.data[j].SciName) 
                        && results.data[j].extinct == "0") {
                            species.push(results.data[j].SciName);
                            totSpecies += 1;
                        } else if (!extinctNumber.includes(results.data[j].SciName)) {
                            extinctNumber.push(results.data[j].SciName);
                            totExtinct += 1;
                        }
                    }
                }
                familyCount.textContent = totFamilies;
                generaCount.textContent = totGenera;
                speicesCount.textContent = totSpecies;
                extinctSpecies.textContent = totExtinct;
                newRow.appendChild(majorType);
                newRow.appendChild(majorSubtype);
                newRow.appendChild(orderEntry);
                newRow.appendChild(familyCount);
                newRow.appendChild(generaCount);
                newRow.appendChild(speicesCount);
                newRow.appendChild(extinctSpecies);
                tableBody.appendChild(newRow);
            }
            orderTable.appendChild(tableBody);
        }
    })
}

function removeRow(row) {
    var tempArr = Array.from(row);
    for (var i = 0; i < tempArr.length; i++){
        tempArr[i].parentNode.removeChild(tempArr[i]);
    }
}

function fillFamily(event) {
    var data = "/assets/data/mdd.csv";
    var order = event.value.toUpperCase();
    var oldGenera = orderTable.getElementsByClassName("genus");
    var oldSpecies = orderTable.getElementsByClassName("species");
    removeRow(oldGenera);
    removeRow(oldSpecies);
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
            families.sort().reverse();
            for (var i = 0; i < families.length; i++) {
                 if (document.getElementById(families[i]) == null) {
                    var generaCount = document.createElement("td");
                    var speciesCount = document.createElement("td");
                    var extinctSpecies = document.createElement("td");
                    var genus = [];
                    var totGenera = 0;
                    for (var j = 0; j < results.data.length; j++) {
                        if (families[i] == results.data[j].Family) {
                            if (!genus.includes(results.data[j].Genus)) {
                                genus.push(results.data[j].Genus);
                                totGenera += 1;
                            }
                        }
                    }
                    var species = [];
                    var totSpecies = 0;
                    var extinctNumber = [];
                    var totExtinct = 0;
                    for (var j = 0; j < results.data.length; j++) {
                        if (families[i] == results.data[j].Family) {
                            if (!species.includes(results.data[j].SciName) 
                            && results.data[j].extinct == "0") {
                                species.push(results.data[j].SciName);
                                totSpecies += 1;
                            } else if (!extinctNumber.includes(results.data[j].SciName) ) {
                                extinctNumber.push(results.data[j].SciName);
                                totExtinct += 1;
                            }
                        }
                    }
                    generaCount.textContent = totGenera;
                    speciesCount.textContent = totSpecies;
                    extinctSpecies.textContent = totExtinct;
                    var familyRow = document.createElement("tr");
                    familyRow.id = families[i];
                    familyRow.className = "family";
                    var familyEntry = document.createElement("td");
                    var blankEntry = document.createElement("td");
                    var blankEntry1 = document.createElement("td");
                    var blankEntry2 = document.createElement("td");                            
                    var familyInner = "<input class='text-button' onClick='fillGenera(this)'type='button' value=" +
                        families[i].charAt(0) + families[i].slice(1).toLowerCase() + ">";
                    familyEntry.innerHTML = familyInner;
                    if (document.getElementById(families[i]) != null) {
                        break;
                    }
                    familyRow.appendChild(blankEntry);
                    familyRow.appendChild(blankEntry1);
                    familyRow.appendChild(blankEntry2);
                    familyRow.appendChild(familyEntry);
                    familyRow.appendChild(generaCount);
                    familyRow.appendChild(speciesCount);
                    familyRow.appendChild(extinctSpecies);
                    var orderRow = document.getElementById(order);
                    orderBody.insertBefore(familyRow, orderRow.nextSibling);
                } else {
                    var rowID = document.getElementById(families[i]);
                    rowID.parentNode.removeChild(rowID);
                }
            }
        }
    })
}

function fillGenera(event) {
    var data = "/assets/data/mdd.csv";
    var family = event.value.toUpperCase();
    var oldSpecies = orderTable.getElementsByClassName("species");
    removeRow(oldSpecies);
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
            genera.sort().reverse();
            for (var i = 0; i < genera.length; i++) {
                var genus = genera[i].toUpperCase();
                if (document.getElementById(genus) == null) {
                    var species = [];
                    var totSpecies = 0;
                    var extinctNumber = [];
                    var totExtinct = 0;
                    for (var j = 0; j < results.data.length; j++) {
                        if (genus == results.data[j].Genus.toUpperCase()) {
                            if (!species.includes(results.data[j].SciName) 
                            && results.data[j].extinct == "0") {
                                species.push(results.data[j].SciName);
                                totSpecies += 1;
                            } else if (!extinctNumber.includes(results.data[j].SciName)) {
                                extinctNumber.push(results.data[j].SciName);
                                totExtinct += 1;
                            }
                        }
                    }
                    var speciesCount = document.createElement("td");
                    speciesCount.textContent = totSpecies;
                    var extinctSpecies = document.createElement("td");
                    extinctSpecies.textContent = totExtinct;
                    var genusRow = document.createElement("tr");
                    var genusID = genera[i].toUpperCase();
                    genusRow.id = genusID;
                    genusRow.className = "genus"
                    var genusEntry = document.createElement("td");
                    var blankEntry = document.createElement("td");
                    var blankEntry1 = document.createElement("td");              
                    var blankEntry2 = document.createElement("td"); 
                    var blankEntry3 = document.createElement("td"); 
                    var genusInner = "<input class='text-button' type='button' onClick='fillSpecies(this)' value=" +
                    genera[i].charAt(0) + genera[i].slice(1).toLowerCase() + ">";
                    genusEntry.innerHTML = genusInner;
                    if (document.getElementById(genusID) != null) {
                        break;
                    }
                    genusRow.appendChild(blankEntry);
                    genusRow.appendChild(blankEntry1);
                    genusRow.appendChild(blankEntry2);
                    genusRow.appendChild(blankEntry3);
                    genusRow.appendChild(genusEntry);
                    genusRow.appendChild(speciesCount);
                    genusRow.appendChild(extinctSpecies);
                    var familyRow = document.getElementById(family);
                    orderBody.insertBefore(genusRow, familyRow.nextSibling);
                } else {
                   var rowID = document.getElementById(genus);
                   rowID.parentNode.removeChild(rowID);
                }  
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
            var speciesExtinct = [];
            for (var i = 0; i < results.data.length; i++) {
                if (results.data[i].Genus.toUpperCase() == genus){
                    if (!species.includes(results.data[i].specific_epithet)) {
                        species.push(results.data[i].specific_epithet);
                        speciesID.push(results.data[i].id);
                        speciesExtinct.push(results.data[i].extinct);
                    }
                }
            }
            species.reverse();
            speciesID.reverse();
            speciesExtinct.reverse();
            for (var i = 0; i < species.length; i ++) {   
                if (document.getElementById(species[i]) == null) {
                    var speciesRow = document.createElement("tr");
                    speciesRow.id = species[i];
                    speciesRow.className = "species";
                    var speciesEntry = document.createElement("td");
                    var blankEntry = document.createElement("td");
                    var blankEntry1 = document.createElement("td");
                    var blankEntry2 = document.createElement("td");
                    var blankEntry3 = document.createElement("td");   
                    var blankEntry4 = document.createElement("td");
                    var blankEntry5 = document.createElement("td");           
                    var speciesInner = "<a href='http://mammaldiversity.github.io/explore.html#species-id=" 
                        + speciesID[i] + "' target='_blank'>" + species[i] + "</a>";
                    speciesEntry.innerHTML = speciesInner;
                    if (document.getElementById(speciesID[i])) {
                        break;
                    }
                    speciesRow.appendChild(blankEntry);
                    speciesRow.appendChild(blankEntry1);
                    speciesRow.appendChild(blankEntry2);
                    speciesRow.appendChild(blankEntry3);
                    speciesRow.appendChild(blankEntry4);
                    if (speciesExtinct[i] == 0) {
                        speciesRow.appendChild(speciesEntry);
                    } else {
                        speciesRow.appendChild(blankEntry5);
                        speciesRow.appendChild(speciesEntry);
                    }
                    var genusRow = document.getElementById(genus);
                    orderBody.insertBefore(speciesRow, genusRow.nextSibling);
                } else {
                   var rowID = document.getElementById(species[i]);
                   rowID.parentNode.removeChild(rowID);
                }
            }  
        }
    })
}

function pickImage() {
    var path = '/assets/images/mammal_images/';
    var images = ['4151.png', '5481.png', '12119.png', '16564.png', '18354.png', '20321.png',
                '21508.png', '21878.png', '23204.png', '41507.png', '42674.png', '136484.png',
                '136791.png', '100000263.png', '100000530.png'];
    var ranNum = Math.floor( Math.random() * images.length);
    var image = images[ranNum];
    var speciesLink = "https://mammaldiversity.github.io/explore.html#species-id=" + image.split('.')[0]
    var imagePath = '<a target="_blank" href="' + speciesLink + 
                    '"><img class="mammal-image" src="'
     + path + image + '" ></a>'
    document.write(imagePath);
    document.close();
}

function activateSearch() {
    var search = document.getElementById("mammal-search").value;
    var newpage = window.open("https://mammaldiversity.github.io/explore.html");
    newpage.onload = function() {
        const event = new Event('keyup');
        newpage.document.getElementById("searchTerm").value = search;
        newpage.document.querySelector("#searchTerm").dispatchEvent(event);
    };
}
