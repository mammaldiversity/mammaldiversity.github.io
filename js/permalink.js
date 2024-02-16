
function permalinkFor(urlString, speciesData) {
   //The current URL may or may not have a "#" at the end already. Handle both cases.
   var baseUrl = urlString === null ? '' : urlString.split("#")[0];
   let hasSpeciesData = speciesData !== undefined && speciesData.id;
   var permalink = hasSpeciesData 
        ? baseUrl + "#id=" + speciesData.id
        : baseUrl;
   return permalink;
}

function speciesIdFor(urlString) {
  let matches = urlString.match(/id=(?<id>[0-9]+)/);
  return matches ? matches.groups.id : undefined;
}

if (typeof module !== 'undefined') {
  module.exports = { 
     permalinkFor: permalinkFor,
     speciesIdFor: speciesIdFor
  };
}
