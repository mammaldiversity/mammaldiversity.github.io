function filterFunc(event) {
    var inputString = event.target.value.toUpperCase().trim().split(' ');
    var rows = document.querySelector("#fullTable tbody").rows;
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[1].cells.length - 4; j++) {
            for (var taxa = 0; taxa < inputString.length; taxa++) {
                if (inputString.length < 2 ) {
                    if (rows[i].cells[j].textContent.toUpperCase().startsWith(inputString[taxa]) 
                     || rows[i].cells[j + 1].textContent.toUpperCase().startsWith(inputString[taxa])
                     || rows[i].cells[j + 2].textContent.toUpperCase().startsWith(inputString[taxa])
                     || rows[i].cells[j + 3].textContent.toUpperCase().startsWith(inputString[taxa])
                     || rows[i].cells[j + 4].textContent.toUpperCase().startsWith(inputString[taxa])
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
    var data = "assets/data/mdd.csv";
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
            specHead.className = "species-head";
            var commonName = document.createElement("div");
            commonName.style.cssText = "font-size: 20px; color: grey; display: inline;";
            commonName.textContent = speciesData.mainCommonName;
            var speciesName = speciesData.genus + " " + speciesData.specificEpithet
            var specAuthority = "";
            if (speciesData.authorityParentheses == 0) {
                specAuthority = speciesData.authoritySpeciesAuthor + ", " + speciesData.authoritySpeciesYear;
            } else {
                specAuthority = "(" + speciesData.authoritySpeciesAuthor + ", " + speciesData.authoritySpeciesYear + ")";
            }
            //specAuthority.innerHTML = "<b>Authority:</b> " + speciesData.authoritySpeciesAuthor + ", " + speciesData.authoritySpeciesYear + "<br>";
            specHead.innerHTML = speciesName.italics() + " " + specAuthority; 
            //specHead.appendChild(commonName);
            
            var speciesCitation = document.createElement("p");
            speciesCitation.innerHTML = "<b>Authority citation:</b> " + speciesData.authoritySpeciesCitation;

            var authorityLink = document.createElement("p");
            authorityLink.innerHTML = "<b>Authority publication link:</b> " + "<a href=" + speciesData.authoritySpeciesLink + " target=_blank>" + speciesData.authoritySpeciesLink + "</a>";

            var otherCommonNames = document.createElement("p");
            otherCommonNames.innerHTML = "<b>Other common names: </b>" + speciesData.otherCommonNames + "<br>";

            var originalName = document.createElement("p");
            var firstName = "";
            if (speciesData.originalNameCombination == "") {
                firstName = "Name is as originally described.";
            } else {
                firstName = speciesData.originalNameCombination.split('_')[0].italics() + " " + speciesData.originalNameCombination.split('_')[1].italics();
            }
            originalName.innerHTML = "<b>Original name as described:</b> " + firstName;
            
            var specTax = document.createElement("p");
            specTax.innerHTML = "<br><b>Taxonomy</b><br><br> <b>Major Type:</b> " + speciesData.majorType + " <b>-- " + "Major subtype:</b> " + speciesData.majorSubtype + "<b> -- " + 
             "Order:</b> " + speciesData.order.charAt(0) + speciesData.order.slice(1).toLowerCase() 
            + "<b> -- " + "Family: </b>" + speciesData.family.charAt(0) + speciesData.family.slice(1).toLowerCase() +
            "<b> -- " + "Subfamily:</b> " + speciesData.subfamily.charAt(0) + speciesData.subfamily.slice(1).toLowerCase() +
            "<b> -- " + "Tribe: </b>" + speciesData.tribe.charAt(0) + speciesData.tribe.slice(1).toLowerCase() + "<br><br>";
            
            var nominalNames = document.createElement("p");
            nominalNames.innerHTML = "<b>Nominal names:</b> " + speciesData.nominalNames;

            var specNotes = document.createElement("p")
            specNotes.innerHTML = "<br>" + "<b>Species-specific notes: </b>" + speciesData.taxonomyNotes +
            "<br><b> Citation:</b> " + speciesData.taxonomyNotesCitation + "<br>";
            
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
            if (speciesData.diffSinceMSW3 == 0) {
                newSpp = "and it is listed in MSW3 2005."
            } else {
                newSpp = "and it is newly recognized since MSW3 2005."
            }
            speciesStatus.innerHTML ="<b>Species Status:</b> " + extinct + domestic + flagged + newSpp;
            
            var iucnStatus = document.createElement("p");
            var currentIucnStatus = "";
            if (speciesData.iucnStatus == "NA") {
                currentIucnStatus = "Not evaluated";
            } else if (speciesData.iucnStatus == "DD") {
                currentIucnStatus == "Data deficient";
            } else if (speciesData.iucnStatus == "LC") {
                currentIucnStatus = "Least concern";
            } else if (speciesData.iucnStatus == "NT") {
                currentIucnStatus = "Near threatened";
            } else if (speciesData.iucnStatus == "VU") {
                currentIucnStatus = "Vulnerable";
            } else if (speciesData.iucnStatus == "EN") {
                currentIucnStatus = "Endangered";
            } else if (speciesData.iucnStatus == "CR") {
                currentIucnStatus = "Critically endangered";
            } else if (speciesData.iucnStatus == "EW") {
                currentIucnStatus = "Extinct in the wild";
            } else if (speciesData.iucnStatus == "EX") {
                currentIucnStatus = "Extinct";
            }
            iucnStatus.innerHTML = "<b>IUCN Red List of Threatened Species status:</b> " + currentIucnStatus;

            var breakChar = document.createElement("br");
            
            // var distribution = document.createElement("p");
            // if (speciesData.extinct == 0) { 
            //     distribution.innerHTML = "<b>Biogeographic realm:</b> " + speciesData.biogeographicRealm;
            // } else {
            //     distribution.innerHTML = "<b>Past biogeographic realm:</b> " + speciesData.biogeographicRealm;
            // }
            var distribution = document.createElement("p");
            if (speciesData.extinct == 0) { 
                distribution.innerHTML = "<b>Geographic distribution:</b> " + speciesData.countryDistribution + "<br><br>";
            } else {
                distribution.innerHTML = "<b>Past geographic distribution:</b> " + speciesData.countryDistribution + "<br><br>";
            }
            var typelocality = document.createElement("p");
            typelocality.innerHTML = "<b>Type locality:</b> " + speciesData.typeLocality + "<br>";

            var voucher = document.createElement("p");
            voucher.innerHTML = "<b>Holotype voucher catalogue number:</b> " + speciesData.holotypeVoucher;
            var contact = document.createElement("p");
            contact.innerHTML = "<i>Please send any edits, corrections, or unfilled data (including full citations) to mammaldiversity [at] gmail [dot] com.</i>"
            
            resultsDisplay.appendChild(specHead);
            resultsDisplay.appendChild(commonName);
            resultsDisplay.appendChild(speciesCitation);
            resultsDisplay.appendChild(authorityLink);
            resultsDisplay.appendChild(originalName);
            resultsDisplay.appendChild(nominalNames);
            resultsDisplay.appendChild(otherCommonNames);
            resultsDisplay.appendChild(specTax);
            //resultsDisplay.appendChild(specAuthority);
            resultsDisplay.appendChild(voucher);
            resultsDisplay.appendChild(typelocality);
            resultsDisplay.appendChild(distribution);
            resultsDisplay.appendChild(speciesStatus);
            resultsDisplay.appendChild(iucnStatus);
            resultsDisplay.appendChild(specNotes);
            resultsDisplay.appendChild(breakChar);
            resultsDisplay.appendChild(specPermalink);
            resultsDisplay.appendChild(contact);
            document.body.insertBefore(resultsDisplay, mddTable);
        },
    })
}

function goPermalinkOLD(event) {
    if (document.location.hash != "") {
        speciesID = document.location.hash.split("=")[1];             
        var element = document.createElement("input");
        element.value = speciesID
        fillSpeciesInfo(element);
    }
}

function goPermalink(event) {
    if (document.location.hash != "") {
        //speciesID = document.location.hash.split("=")[1];
        var params = parseURLforParameters();
        console.log(params);
        
        if ( params["search"] ) {
            console.log(params["search"]);
            let element2 = document.getElementById("searchTerm");
            element2.value = params["search"];
            element2.dispatchEvent(new Event("keyup"));
        }        
        
        if ( params["speciesID"] ) {   
            var element = document.createElement("input");
            element.value = params["speciesID"];
            fillSpeciesInfo(element);
            console.log(params["speciesID"]+', '+element.value);
        }   
    }
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
   //console.log(params);

   return params;
}
function initializeExpansionState() {                // expand initial state accoring touses parameters in #anchor
    var params  = parseURLforParameters() ;
    if ( params["order"] ) {
        console.log(params["order"]);
        
        expandTaxon(params["order"]);
        //fillFamily("Carnivora");
        //fillGenera("Felidae");
    }
    if ( params["family"] ) {
        console.log("Family "+params["family"]);
        // need to first expand the order, so we need to get parent order
        var order =  getParentTaxon(params["family"], "family", "order", function(a) {
            console.log ("Callback getParentTaxon: family "+ params["family"] + " belongs to order " + order);
            expandTaxon(order, function(a) {
                console.log ("Callback expandTaxon: family "+ params["family"] + " belongs to order " + order);
            });
        });
        console.log ("Parent: family "+ params["family"] + " belongs to order " + order);
            
        console.log ("Synchronous: family "+ params["family"] + " belongs to order " + order);
    }
}

function expandTaxon(taxon, callback) {
        // need to get the element of the order/family button and trigger change event -- functions fillFamily(event), fillGenera(event), etc
        // It might be best to add and id= to the appropriate input button, but meanwhile
        //let element = getButtonByValue(params["order"]);                                   // METHOD 1. Select input button with value                                                             
        console.log(taxon);
        let element = document.getElementById(taxon.toUpperCase()).childNodes[2].childNodes[0];  // METHOD 2. Select the <tr> by id and navigate childNodes
        console.log(element);
        let event  = new Event("click"); //, {value: "Carnivora"} );
        console.log(event);
        // event.preventDefault();
        element.dispatchEvent(event, callback);
        //if (callback) callback;
}

function getButtonByValue(taxonName) {
    var inputs = document.getElementsByTagName('input');
    for(i in inputs) {
        if(inputs[i].type == "button" && inputs[i].value == taxonName) {
          return inputs[i];
       }
    }
    return false;
}
function getParentTaxon(taxon, rank, parentRank, callback) { //we have a taxon of a particular rank, we want the parent (or higher relative) with parentRank
    var data = "assets/data/mdd.csv";
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            var parent = "";
            for (var i = 0; i < results.data.length; i++) {
                if (results.data[i].family == taxon.toUpperCase() ) {
                    parent = results.data[i].order;
                    console.log ("family "+taxon + " < order " + parent);
                    if (callback) callback(parent);
                    return parent;       
                }
            }            
        }
    });
}               
               
function populateStats(event) {
    var data = "/assets/data/mdd.csv";
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            var orders = [];
            var genera = [];
            var families = [];
            var livingSpecies = 0;
            var extinctSpecies = 0;
            var domesticSpecies = 0;
            var livingWild = 0;
            var totSpecies = 0;
            var totOrders = 0;
            var totGenera = 0;
            var totFamilies = 0;
            for (var i = 0; i < results.data.length; i++) {
                if (!families.includes(results.data[i].family)) {
                    families.push(results.data[i].family);
                    totFamilies++;
                }
                if (!orders.includes(results.data[i].order)) {
                    orders.push(results.data[i].order);
                    totOrders++;
                }
                if (!genera.includes(results.data[i].genus)) {
                    genera.push(results.data[i].genus);
                    totGenera++;
                }
                if (results.data[i].extinct == 0) {
                    livingSpecies++;
                } else {
                    extinctSpecies++;
                }
                if (results.data[i].domestic == 0) {
                    //livingWild++;
                } else {
                    domesticSpecies++;
                }
                totSpecies++;
            }
            livingWild = totSpecies - domesticSpecies - extinctSpecies;
            document.getElementById("species").innerHTML += totSpecies.toLocaleString();
            document.getElementById("orders").innerHTML += totOrders.toLocaleString();
            document.getElementById("genera").innerHTML += totGenera.toLocaleString();
            document.getElementById("families").innerHTML += totFamilies.toLocaleString();
            document.getElementById("extinct").innerHTML += extinctSpecies.toLocaleString();
            document.getElementById("living").innerHTML += livingSpecies.toLocaleString();
            document.getElementById("domestic").innerHTML += domesticSpecies.toLocaleString();
            document.getElementById("livingWild").innerHTML += livingWild.toLocaleString();
        },
    })
}


function createOrderTable(event) {
    var data = "assets/data/mdd.csv";
    Papa.parse(data, {
        header: true,
        delimiter: ",",
        download: true,
        complete: function(results) {
            var orders = [];
            var orderTable = document.getElementById("orderTable")
            for (var i = 0; i < results.data.length; i++) {
                if (!orders.includes(results.data[i].order)) {
                    orders.push(results.data[i].order);
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
                    if (orders[i].includes(results.data[j].order)) {
                        majorType.textContent = results.data[j].majorType;
                        majorSubtype.textContent = results.data[j].majorSubtype;
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
                    if (orders[i] == results.data[j].order) {
                        if (!family.includes(results.data[j].family)) {
                            family.push(results.data[j].family);
                            totFamilies += 1;
                        }
                    }
                }
                var genus = [];
                var totGenera = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i] == results.data[j].order) {
                        if (!genus.includes(results.data[j].genus)) {
                            genus.push(results.data[j].genus);
                            totGenera += 1;
                        }
                    }
                }
                var species = [];
                var totSpecies = 0;
                var extinctNumber = [];
                var totExtinct = 0;
                for (var j = 0; j < results.data.length; j++) {
                    if (orders[i] == results.data[j].order) {
                        if (!species.includes(results.data[j].sciName) 
                        && results.data[j].extinct == "0") {
                            species.push(results.data[j].sciName);
                            totSpecies += 1;
                        } else if (!extinctNumber.includes(results.data[j].sciName)) {
                            extinctNumber.push(results.data[j].sciName);
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
            initializeExpansionState();           // expand initial state accoring touses parameters in #anchor
        }
    });
    
    
}

function removeRow(row) {
    var tempArr = Array.from(row);
    for (var i = 0; i < tempArr.length; i++){
        tempArr[i].parentNode.removeChild(tempArr[i]);
    }
}

function fillFamily(event) {
    var data = "assets/data/mdd.csv";
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
                if (results.data[i].order == order){
                    if (!families.includes(results.data[i].family)) {
                        families.push(results.data[i].family);
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
                        if (families[i] == results.data[j].family) {
                            if (!genus.includes(results.data[j].genus)) {
                                genus.push(results.data[j].genus);
                                totGenera += 1;
                            }
                        }
                    }
                    var species = [];
                    var totSpecies = 0;
                    var extinctNumber = [];
                    var totExtinct = 0;
                    for (var j = 0; j < results.data.length; j++) {
                        if (families[i] == results.data[j].family) {
                            if (!species.includes(results.data[j].sciName) 
                            && results.data[j].extinct == "0") {
                                species.push(results.data[j].sciName);
                                totSpecies += 1;
                            } else if (!extinctNumber.includes(results.data[j].sciName) ) {
                                extinctNumber.push(results.data[j].sciName);
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
    var data = "assets/data/mdd.csv";
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
                if (results.data[i].family == family){
                    if (!genera.includes(results.data[i].genus)) {
                        genera.push(results.data[i].genus);
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
                        if (genus == results.data[j].genus.toUpperCase()) {
                            if (!species.includes(results.data[j].sciName) 
                            && results.data[j].extinct == "0") {
                                species.push(results.data[j].sciName);
                                totSpecies += 1;
                            } else if (!extinctNumber.includes(results.data[j].sciName)) {
                                extinctNumber.push(results.data[j].sciName);
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
    var data = "assets/data/mdd.csv";
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
                if (results.data[i].genus.toUpperCase() == genus){
                    if (!species.includes(results.data[i].specificEpithet)) {
                        species.push(results.data[i].specificEpithet);
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
    var images = ['1000011.png', '1000634.png', '1006424.png', '1000726.png', '1000990.png', '1001847.png',
                '1002250.png', '1002756.png', '1003607.png', '1003695.png', '1003840.png', '1004554.png',
                '1005096.png', '1006226.png', '1006458.png'];
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
    var newpage = window.open("http://www.mammaldiversity.org/explore.html");
    var search = newpage.opener.document.getElementById("mammal-search").value
    newpage.addEventListener("DOMContentLoaded", grabSearch);
    console.log(search)
    function grabSearch() {
        const event = new Event('keyup');
        console.log("Searching for " + search);
        newpage.document.getElementById("searchTerm").value = search;
        newpage.document.querySelector("#searchTerm").dispatchEvent(event);
    }
}

