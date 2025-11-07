mapboxgl.accessToken = 'pk.eyJ1IjoibWF0YW5kNTkxIiwiYSI6ImNtaDlybG55YzE2YnAya3BxMHkyZjVkODUifQ.O2dL57e5kmP5U5FCzJDDlA';
const map = new mapboxgl.Map({
  container: 'map',                                    // matches the div id
  style: 'mapbox://styles/matand591/cmha3o12m00rh01sr1jy33pl1', // replace with your Style URL
  center: [-122.27, 37.87],                            // starting [lng, lat] — change if you want
  zoom: 9                                              // starting zoom
});