
function permalinkForTaxonPage(urlString, speciesData) {
  let matches = urlString.match(/(?<baseUrl>.*\/taxon\/)(?<id>[0-9]+)/);
  return matches ? (matches.groups.baseUrl + matches.groups.id) : urlString;
}

function permalinkFor(urlString, speciesData) {
   //The current URL may or may not have a "#" at the end already. Handle both cases.
   var baseUrl = urlString === null ? '' : urlString.split("#")[0];
   let hasSpeciesData = speciesData !== undefined && speciesData.id;
   var permalink = hasSpeciesData 
        ? baseUrl + "#" + speciesData.id
        : baseUrl;
   return permalinkForTaxonPage(permalink, speciesData);
}

function speciesIdForTaxonPage(urlString) {
  let matches = urlString.match(/\/taxon\/(?<id>[0-9]+)/);
  return matches ? matches.groups.id : undefined;
}

function speciesIdFor(urlString) {
  let matches = urlString.match(/((#)|(id=))(?<id>[0-9]+)/);
  return matches ? matches.groups.id : speciesIdForTaxonPage(urlString);
}

if (typeof module !== 'undefined') {
  module.exports = { 
     permalinkFor: permalinkFor,
     speciesIdFor: speciesIdFor
  };
}
