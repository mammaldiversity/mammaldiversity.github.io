---
---
const shapes = {{ site.data.countryShapes | jsonify }};

function drawMap(countryCodes) {
  // initialize Leaflet
  let map = L.map('map'); 

  // add the OpenStreetMap tiles
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);

  let distribution = new L.FeatureGroup();
  countryCodes.forEach(function(countryCode) {
    let shape = shapes[countryCode];
    if (shape) { 
      distribution.addLayer(L.geoJSON(shape));
    }
  });
  distribution.addTo(map);
  map.fitBounds(distribution.getBounds());
}
