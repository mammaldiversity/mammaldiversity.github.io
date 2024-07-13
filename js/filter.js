function filterFunc(event) {
  var inputString = event.target.value.toUpperCase().trim().split(" ");
  var rows = document.querySelector("#fullTable tbody").rows;
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[1].cells.length - 4; j++) {
      for (var taxa = 0; taxa < inputString.length; taxa++) {
        if (inputString.length < 2) {
          if (
            rows[i].cells[j].textContent
              .toUpperCase()
              .startsWith(inputString[taxa]) ||
            rows[i].cells[j + 1].textContent
              .toUpperCase()
              .startsWith(inputString[taxa]) ||
            rows[i].cells[j + 2].textContent
              .toUpperCase()
              .startsWith(inputString[taxa]) ||
            rows[i].cells[j + 3].textContent
              .toUpperCase()
              .startsWith(inputString[taxa]) ||
            rows[i].cells[j + 4].textContent
              .toUpperCase()
              .startsWith(inputString[taxa])
          ) {
            rows[i].style.display = "";
          } else {
            rows[i].style.display = "none";
          }
        } else if (
          rows[i].cells[1].textContent
            .toUpperCase()
            .startsWith(inputString[0]) &&
          rows[i].cells[2].textContent.toUpperCase().startsWith(inputString[1])
        ) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  }
}

function renderSpeciesPage(speciesData, permalink) {
  var bootstrapDecoration = document.createElement("div");
  bootstrapDecoration.classList.add("container", "text-center");
  // resultsDisplay.className = "box-paragraph";
  bootstrapDecoration.setAttribute("id", "speciesInfo");

  var mddTable = document.getElementById("fullTable");
  if (document.getElementById("speciesInfo")) {
    var id = document.getElementById("speciesInfo");
    id.parentNode.removeChild(id);
  }

  var specPermalink = document.createElement("a");
  specPermalink.innerHTML =
    "<b>Species Permalink:</b> " +
    "<a href=" +
    permalink +
    ">" +
    permalink +
    "</a>";

  var bootstrapRow = document.createElement("div");
  bootstrapRow.classList.add(
    "row",
    "align-items-center",
    "justify-content-center"
  );
  var bootstrapCol = document.createElement("div");
  bootstrapCol.classList.add("col-auto");
  var resultsDisplay = document.createElement("div");
  resultsDisplay.classList.add("card", "border-dark", "my-4");
  resultsDisplay.style.cssText = "max-width: 56rem;";
  var boxParagraph = document.createElement("div");
  boxParagraph.classList.add("card-body");
  var specHead = document.createElement("h2");
  specHead.classList.add("card-title", "species-head");
  // specHead.className = "species-head";
  specHead.setAttribute("id", speciesData.id);
  var commonName = document.createElement("div");
  commonName.style.cssText = "font-size: 20px; color: grey; display: inline;";
  commonName.textContent = speciesData.mainCommonName;
  var speciesName = speciesData.genus + " " + speciesData.specificEpithet;
  var specAuthority = "";
  if (speciesData.authorityParentheses == 0) {
    specAuthority =
      speciesData.authoritySpeciesAuthor +
      ", " +
      speciesData.authoritySpeciesYear;
  } else {
    specAuthority =
      "(" +
      speciesData.authoritySpeciesAuthor +
      ", " +
      speciesData.authoritySpeciesYear +
      ")";
  }
  //specAuthority.innerHTML = "<b>Authority:</b> " + speciesData.authoritySpeciesAuthor + ", " + speciesData.authoritySpeciesYear + "<br>";
  specHead.innerHTML =
    "<span style='font-style: italic;'>" +
    speciesName +
    "</span> " +
    specAuthority;
  //specHead.appendChild(commonName);

  var speciesCitation = null;
  if (speciesData.authoritySpeciesCitation !== null) {
    speciesCitation = document.createElement("p");
    speciesCitation.innerHTML =
      "<b>Authority citation:</b> " + speciesData.authoritySpeciesCitation.replace(/_([A-Za-z ]+)_/g, "<i>$1</i>");
  }

  var authorityLink = null;
  if (speciesData.authoritySpeciesLink !== null) {
    authorityLink = document.createElement("p");
    authorityLink.innerHTML =
      "<b>Authority publication link:</b> " +
      "<a href=" +
      speciesData.authoritySpeciesLink +
      " target=_blank>" +
      speciesData.authoritySpeciesLink +
      "</a>";
  }

  var otherCommonNames = null;
  if (speciesData.otherCommonNames !== null) {
    otherCommonNames = document.createElement("p");
    otherCommonNames.innerHTML =
      "<b>Other common names: </b>" + speciesData.otherCommonNames + "<br>";
  }

  var originalName = document.createElement("p");
  var firstName = "";
  if (
    speciesData.originalNameCombination === null ||
    speciesData.originalNameCombination === ""
  ) {
    firstName = "Name is as originally described.";
  } else {
    firstName = speciesData.originalNameCombination.italics();
  }
  originalName.innerHTML = "<b>Original name as described:</b> " + firstName;

  var specTax = document.createElement("p");
  var enclosingTaxa = [
    ["Subclass", speciesData.subclass],
    ["Infraclass", speciesData.infraclass],
    ["Order", speciesData.order],
    ["Family", speciesData.family],
    ["Subfamily", speciesData.subfamily],
    ["Tribe", speciesData.tribe],
  ];
  var enclosingTaxaText = enclosingTaxa
    .filter(function (taxon) {
      return taxon[1] !== undefined && taxon[1] !== "" && taxon[1] !== "NA";
    })
    .map(function (taxon) {
      return (
        "<b>" +
        taxon[0] +
        ":</b> " +
        taxon[1].charAt(0) +
        taxon[1].slice(1).toLowerCase()
      );
    })
    .join(" -- ");
  specTax.innerHTML =
    "<br><b>Taxonomy</b><br><br> " + enclosingTaxaText + "<br><br>";

  var nominalNames = document.createElement("p");
  nominalNames.innerHTML = "<b>Nominal names:</b> " + speciesData.nominalNames.replace(/\|/g, " | ");

  var specNotes = null;
  if (
    speciesData.taxonomyNotes !== null &&
    speciesData.taxonomyNotes !== "NA"
  ) {
    specNotes = document.createElement("p");
    specNotes.innerHTML =
      "<br>" +
      "<b>Species-specific notes: </b>" +
      speciesData.taxonomyNotes +
      "<br><b> Citation:</b> " +
      speciesData.taxonomyNotesCitation +
      "<br>";
  }

  var speciesStatus = document.createElement("p");
  var extinct = "";
  if (speciesData.extinct == "0") {
    extinct = "This species is currently living,";
  } else {
    extinct = "This species went extinct in the last 500 years,";
  }
  var domestic = "";
  if (speciesData.domestic == 0 && speciesData.extinct == 0) {
    domestic = " it lives in wild habitats, ";
  } else if (speciesData.domestic == 0 && speciesData.extinct == 1) {
    domestic = " it lived in wild habitats, ";
  } else if (speciesData.domestic == 1 && speciesData.extinct == 0) {
    domestic = " it lives in domestic habitats, ";
  } else {
    domestic == " it lived in domestic habitats, ";
  }
  var flagged = "";
  if (speciesData.flagged == 0) {
    flagged = "its taxonomic status is currently accepted, ";
  } else {
    flagged = "its taxonomic status is currently flagged, ";
  }
  var newSpp = "";
  if (speciesData.diffSinceMSW3 == 0) {
    newSpp = "and it is listed in MSW3 2005.";
  } else {
    newSpp = "and it is newly recognized since MSW3 2005.";
  }
  speciesStatus.innerHTML =
    "<b>Species Status:</b> " + extinct + domestic + flagged + newSpp;

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
  iucnStatus.innerHTML =
    "<b>IUCN Red List of Threatened Species status:</b> " + currentIucnStatus;

  var breakChar = document.createElement("br");

  // var distribution = document.createElement("p");
  // if (speciesData.extinct == 0) {
  //     distribution.innerHTML = "<b>Biogeographic realm:</b> " + speciesData.biogeographicRealm;
  // } else {
  //     distribution.innerHTML = "<b>Past biogeographic realm:</b> " + speciesData.biogeographicRealm;
  // }
  var distribution = document.createElement("p");
  var countries = speciesData.countryDistribution
    .split("|")
    .map(function (countryName) {
      return addCodeForCountryName(countryName);
    });
  var prefix = speciesData.extinct == 0 ? "" : "Past geographic";
  distribution.innerHTML =
    "<b>" +
    prefix +
    " Country distribution</b> (coarse map shown below; most species exist in only part of countries): " +
    countries.map(formatCountryAndCode).join(" | ") +
    "<br><br>";
  var distributionMap = document.createElement("div");
  let mapId = "distributionMap";
  distributionMap.setAttribute("id", mapId);

  var typelocality = document.createElement("p");
  typelocality.innerHTML =
    "<b>Type locality:</b> " + speciesData.typeLocality + "<br>";

  var voucher = null;
  if (speciesData.typeVoucher !== null && speciesData.typeVoucher !== undefined) {
    voucher = document.createElement("p");
    voucher.innerHTML =
      "<b>Type specimen voucher catalogue number:</b> " +
      speciesData.typeVoucher;
  }
  var contact = document.createElement("p");
  contact.innerHTML =
    "<i>Please send any edits, corrections, or unfilled data (including full citations) to mammaldiversity [at] gmail [dot] com.</i>";

  bootstrapDecoration.appendChild(bootstrapRow);
  bootstrapRow.appendChild(bootstrapCol);
  bootstrapCol.appendChild(resultsDisplay);
  resultsDisplay.appendChild(boxParagraph);
  resultsDisplay.appendChild(specHead);
  resultsDisplay.appendChild(commonName);
  if (speciesCitation !== null) {
    resultsDisplay.appendChild(speciesCitation);
  }
  if (authorityLink !== null) {
    resultsDisplay.appendChild(authorityLink);
  }
  resultsDisplay.appendChild(originalName);
  resultsDisplay.appendChild(nominalNames);
  if (otherCommonNames !== null) {
    resultsDisplay.appendChild(otherCommonNames);
  }
  resultsDisplay.appendChild(specTax);
  //resultsDisplay.appendChild(specAuthority);
  if (voucher !== null) {
    resultsDisplay.appendChild(voucher);
  }
  resultsDisplay.appendChild(typelocality);
  resultsDisplay.appendChild(distribution);
  resultsDisplay.appendChild(distributionMap);
  resultsDisplay.appendChild(speciesStatus);
  resultsDisplay.appendChild(iucnStatus);
  if (specNotes !== null) {
    resultsDisplay.appendChild(specNotes);
  }
  resultsDisplay.appendChild(breakChar);
  resultsDisplay.appendChild(specPermalink);
  resultsDisplay.appendChild(contact);
  document.body.insertBefore(bootstrapDecoration, mddTable);
  drawCountriesOnMap(
    countries
      .filter(function (country) {
        return country.code !== undefined;
      })
      .map(function (country) {
        return country.code;
      }),
    mapId
  );
}

function populateSpeciesInfo(results, speciesID) {
  var speciesDataHits = results.data.filter(function (species) {
    return speciesID === species.id;
  });
  speciesDataHits.forEach(function (speciesData) {
    let permalink = permalinkFor(document.location.href, speciesData);
    // https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
    history.pushState({}, "", permalink);
    renderSpeciesPage(speciesData, permalink);
  });
}

function goPermalink(event) {
  let speciesId = speciesIdFor(document.location.href);
  if (speciesId !== undefined && speciesId.match(/[0-9]+/)) {
    document.location = permalinkForTaxonId(speciesId);
  }
}

function populateStats2(results) {
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
  document.getElementById("extinct").innerHTML +=
    extinctSpecies.toLocaleString();
  document.getElementById("living").innerHTML += livingSpecies.toLocaleString();
  document.getElementById("domestic").innerHTML +=
    domesticSpecies.toLocaleString();
  document.getElementById("livingWild").innerHTML +=
    livingWild.toLocaleString();
}

function populateOrderTable(results) {
  var orders = [];
  var orderTable = document.getElementById("orderTable");
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
    majorSubtype.style.cssText = "background-color: #9b9b9b";
    for (var j = 0; j < results.data.length; j++) {
      if (orders[i].includes(results.data[j].order)) {
        majorType.textContent = results.data[j].subclass;
        majorSubtype.textContent = results.data[j].infraclass;
        break;
      }
    }
    var orderEntry = document.createElement("td");
    var familyCount = document.createElement("td");
    var generaCount = document.createElement("td");
    var speciesCount = document.createElement("td");
    var extinctSpecies = document.createElement("td");
    var orderInner =
      "<input class='text-button' onClick='fillFamily(this)' type='button' value=" +
      orders[i].charAt(0) +
      orders[i].slice(1).toLowerCase() +
      ">";
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
        if (
          !species.includes(results.data[j].sciName) &&
          results.data[j].extinct == "0"
        ) {
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
    speciesCount.textContent = totSpecies;
    extinctSpecies.textContent = totExtinct;
    newRow.appendChild(majorType);
    newRow.appendChild(majorSubtype);
    newRow.appendChild(orderEntry);
    newRow.appendChild(familyCount);
    newRow.appendChild(generaCount);
    newRow.appendChild(speciesCount);
    newRow.appendChild(extinctSpecies);
    tableBody.appendChild(newRow);
  }
  orderTable.appendChild(tableBody);
}

function removeRow(row) {
  var tempArr = Array.from(row);
  for (var i = 0; i < tempArr.length; i++) {
    tempArr[i].parentNode.removeChild(tempArr[i]);
  }
}

function populateFamily(results, order) {
  var families = [];
  for (var i = 0; i < results.data.length; i++) {
    if (results.data[i].order == order) {
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
          if (
            !species.includes(results.data[j].sciName) &&
            results.data[j].extinct == "0"
          ) {
            species.push(results.data[j].sciName);
            totSpecies += 1;
          } else if (!extinctNumber.includes(results.data[j].sciName)) {
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
      var familyInner =
        "<input class='text-button' onClick='fillGenera(this)'type='button' value=" +
        families[i].charAt(0) +
        families[i].slice(1).toLowerCase() +
        ">";
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

function populateGenera(results, family) {
  var genera = [];
  for (var i = 0; i < results.data.length; i++) {
    if (results.data[i].family == family) {
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
          if (
            !species.includes(results.data[j].sciName) &&
            results.data[j].extinct == "0"
          ) {
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
      genusRow.className = "genus";
      var genusEntry = document.createElement("td");
      var blankEntry = document.createElement("td");
      var blankEntry1 = document.createElement("td");
      var blankEntry2 = document.createElement("td");
      var blankEntry3 = document.createElement("td");
      var genusInner =
        "<input class='text-button' type='button' onClick='fillSpecies(this)' value=" +
        genera[i].charAt(0) +
        genera[i].slice(1).toLowerCase() +
        ">";
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

function populateSpecies(results, genus) {
  var species = [];
  var speciesID = [];
  var speciesExtinct = [];
  for (var i = 0; i < results.data.length; i++) {
    if (results.data[i].genus.toUpperCase() == genus) {
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
  for (var i = 0; i < species.length; i++) {
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
      var speciesInner =
        "<a href='http://mammaldiversity.github.io/explore.html#genus=" +
        genus +
        "&species=" +
        species[i] +
        "&id=" +
        speciesID[i] +
        "' target='_blank'>" +
        species[i] +
        "</a>";
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
        // Include a blank entry for extinct species
        // So that the border line continues
        speciesRow.appendChild(blankEntry5);
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

function pickImage() {
  var path = "assets/images/mammal_images/";
  var images = [
    "1002250.jpg",
    "1002756.jpg",
    "1003840.jpg",
    "1004046.jpg",
    "1006226.jpg",
  ];
  var ranNum = Math.floor(Math.random() * images.length);
  var image = images[ranNum];
  var speciesLink =
    "https://mammaldiversity.github.io/explore.html#genus=&species=&id=" +
    image.split(".")[0];
  var imagePath =
    '<a target="_blank" href="' +
    speciesLink +
    '"><img class="img-fluid rounded mx-auto d-block mammal-image" src="' +
    path +
    image +
    '" ></a>';
  document.write(imagePath);
  document.close();
}

function activateSearch() {
  var newpage = window.open("http://www.mammaldiversity.org/explore.html");
  var search = newpage.opener.document.getElementById("mammal-search").value;
  newpage.addEventListener("DOMContentLoaded", grabSearch);
  function grabSearch() {
    const event = new Event("keyup");
    newpage.document.getElementById("searchTerm").value = search;
    newpage.document.querySelector("#searchTerm").dispatchEvent(event);
  }
}

function loadMDD(onLoad) {
  // see js/mdd.js
  onLoad({ data: mdd });
}

function loadSpeciesById(speciesID) {
  loadMDD(function (results) {
    populateSpeciesInfo(results, speciesID);
  });
}

function fillSpeciesInfo(elem) {
  loadSpeciesById(elem.value);
}

function populateStats(event) {
  loadMDD(populateStats2);
}

function createOrderTable(event) {
  loadMDD(populateOrderTable);
}

function fillFamily(event) {
  var order = event.value;
  var oldGenera = orderTable.getElementsByClassName("genus");
  var oldSpecies = orderTable.getElementsByClassName("species");
  removeRow(oldGenera);
  removeRow(oldSpecies);
  loadMDD(function (results) {
    populateFamily(results, order);
  });
}

function fillGenera(event) {
  var family = event.value;
  var oldSpecies = orderTable.getElementsByClassName("species");
  removeRow(oldSpecies);
  loadMDD(function (results) {
    populateGenera(results, family);
  });
}

function fillSpecies(event) {
  var genus = event.value;
  loadMDD(function (results) {
    populateSpecies(results, genus);
  });
}
