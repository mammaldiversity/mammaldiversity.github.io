
function permalink(urlString, speciesData) {
   //The current URL may or may not have a "#" at the end already. Handle both cases.
   var baseUrl = urlString.charAt(urlString.length - 1) === "#" ? urlString : urlString + "#";
   var permalink = baseUrl + "genus=" + speciesData.genus + "&" + "species=" + speciesData.specificEpithet + "&" + "id=" + speciesData.id;
   return permalink;
}

module.exports = permalink;
