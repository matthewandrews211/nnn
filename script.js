mapboxgl.accessToken = 'pk.eyJ1IjoibWF0YW5kNTkxIiwiYSI6ImNtaDlybG55YzE2YnAya3BxMHkyZjVkODUifQ.O2dL57e5kmP5U5FCzJDDlA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-122.27, 37.87], // Berkeley
  zoom: 12
});

map.on('load', function() {
  // Add your GeoJSON layer
  map.addSource('points-data', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/matthewandrews211/BAHA-MAP/main/data/183matt.geojson'
  });

  map.addLayer({
    id: 'points-layer',
    type: 'circle',
    source: 'points-data',
    paint: {
      'circle-color': '#4264FB',
      'circle-radius': 6,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  });
});

// Add popup when clicking points
map.on('click', 'points-layer', (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const p = e.features[0].properties;

  const popupHTML = `
    <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
      <strong style="font-size: 15px;">${p.Landmark}</strong><br>
      <em>${p.Address}</em><br>
      <b>Architect:</b> ${p.Architect || 'N/A'}<br>
      <b>Designated:</b> ${p.Designated || 'N/A'}<br>
      ${p.Notes ? `<b>Notes:</b> ${p.Notes}<br>` : ''}
      <a href="${p.Link}" target="_blank" style="color:#4264FB; text-decoration:underline;">
        More info
      </a>
    </div>
  `;

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(popupHTML)
    .addTo(map);
});



