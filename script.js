// ==========================
// Week 11 Web Map - Matthew
// ==========================

// Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0YW5kNTkxIiwiYSI6ImNtaDlybG55YzE2YnAya3BxMHkyZjVkODUifQ.O2dL57e5kmP5U5FCzJDDlA';

// Initialize Map
const map = new mapboxgl.Map({
  container: 'map', // matches your <div id="map">
  style: 'mapbox://styles/matand591/cmha3o12m00rh01sr1jy33pl1', // your style URL
  center: [-122.27, 37.87], // Berkeley area
  zoom: 12 // zoomed in to see points better
});

// Load map and add your GeoJSON points
map.on('load', function() {
  
  // 1️⃣ Add GeoJSON Source
  map.addSource('points-data', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/matthewandrews211/BAHA-MAP/main/data/183matt.geojson'
  });

  // 2️⃣ Add Circle Layer
  map.addLayer({
    id: 'points-layer',
    type: 'circle',
    source: 'points-data',
    paint: {
      'circle-color': '#4264FB',
      'circle-radius': 8,           // slightly bigger for visibility
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  });

  // 3️⃣ Change cursor on hover
  map.on('mouseenter', 'points-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'points-layer', () => {
    map.getCanvas().style.cursor = '';
  });

  // 4️⃣ Click event for popups
  map.on('click', 'points-layer', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;

    // Use a property from GeoJSON, fallback to full JSON
    const description = properties.description || properties.name || properties.NAME || JSON.stringify(properties);

    // Handle map wrap
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Show popup
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<strong>${description}</strong>`)
      .addTo(map);
  });

});
