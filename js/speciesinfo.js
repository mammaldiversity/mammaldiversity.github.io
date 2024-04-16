function showSpeciesDetails(resultsDisplay, speciesData, permalink, mddTable) {
   
            var specPermalink = document.createElement("a");
            specPermalink.innerHTML = "<b>Species Permalink:</b> " + "<a href="+ permalink + ">" 
            + permalink + "</a>";
            console.log(permalink);
            
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

            var otherCommonNames = null;
            if (speciesData.otherCommonNames !== null) {
                otherCommonNames = document.createElement("p");
                otherCommonNames.innerHTML = "<b>Other common names: </b>" + speciesData.otherCommonNames + "<br>";
            }

            var originalName = document.createElement("p");
            var firstName = "";
            if (speciesData.originalNameCombination == "") {
                firstName = "Name is as originally described.";
            } else {
                firstName = speciesData.originalNameCombination.split('_')[0].italics() + " " + speciesData.originalNameCombination.split('_')[1].italics();
            }
            originalName.innerHTML = "<b>Original name as described:</b> " + firstName;
            
            var specTax = document.createElement("p");
            specTax.innerHTML = "<br><b>Taxonomy</b><br><br> <b>Class:</b> Mammalia"
                              + "<b> -- " + "Subclass:</b> " + speciesData.subclass 
                              + "<b> -- " + "Infraclass:</b> " + speciesData.infraclass 
                              + "<b> -- " + "Magnorder:</b> " + speciesData.magnorder 
                              + "<b> -- " + "Superorder:</b> " + speciesData.superorder 
                              + "<b> -- " + "Order:</b> " + speciesData.order.charAt(0) + speciesData.order.slice(1).toLowerCase() 
                              + "<b> -- " + "Family: </b>" + speciesData.family.charAt(0) + speciesData.family.slice(1).toLowerCase() 
                              + "<b> -- " + "Subfamily:</b> " + speciesData.subfamily.charAt(0) + speciesData.subfamily.slice(1).toLowerCase() 
                              + "<b> -- " + "Tribe: </b>" + speciesData.tribe.charAt(0) + speciesData.tribe.slice(1).toLowerCase() 
                              + "<br><br>";
            
            var nominalNames = document.createElement("p");
            nominalNames.innerHTML = "<b>Nominal names:</b> " + italiciseNominalNames(speciesData.nominalNames, 0, "|");

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
                distribution.innerHTML = "<b>Geographic distribution:</b> " + speciesData.countryDistribution.replace(/\|/g, " | ") + "<br><br>";
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
            if (otherCommonNames !== null) {
                resultsDisplay.appendChild(otherCommonNames);
            }
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
            
            //document.body.insertBefore(resultsDisplay, mddTable);
            return resultsDisplay;
   
}
function italiciseNominalNames(parsedResult, start, sep)    // italicise the subspecies names (first word before authority)
{   
   var outputNames = "";
   var formattedName = "";
   
   var namesArray = parsedResult.split(sep)                  // split names list on separator
 
   var j=0;          
   for (j=start; j<namesArray.length; j++) {              // note j=0 shows the subspecies name in the synonym list, i=1 skips the subspecies and just shows synonyms
      if (namesArray[j] != "" || namesArray[j] != " ") {
         
         formattedName = namesArray[j].trim().replace(/([a-z]*)\s(.*)/, "<i>$1</i> $2" );  //italicise the subspecies names (first word before authority)
         outputNames +=  formattedName;
         if (j<namesArray.length-1) outputNames += "; ";
      }
   }
  
   outputNames = outputNames.replace(/; $/g, "").replace(/; $/g, ""); // trim trailling ;s
   return outputNames;
}
