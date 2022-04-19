const mapStyle = [{
  'featureType': 'administrative',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'lightness': 33,
  },
  ],
},
{
  'featureType': 'landscape',
  'elementType': 'all',
  'stylers': [{
    'color': '#f2e5d4',
  }],
},
{
  'featureType': 'poi.park',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#c5dac6',
  }],
},
{
  'featureType': 'poi.park',
  'elementType': 'labels',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'lightness': 20,
  },
  ],
},
{
  'featureType': 'road',
  'elementType': 'all',
  'stylers': [{
    'lightness': 20,
  }],
},
{
  'featureType': 'road.highway',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#c5c6c6',
  }],
},
{
  'featureType': 'road.arterial',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#e4d7c6',
  }],
},
{
  'featureType': 'road.local',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#fbfaf7',
  }],
},
{
  'featureType': 'water',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'color': '#acbcc9',
  },
  ],
}];

// Escapes HTML characters in a template literal string, to prevent XSS.
// See https://www.owasp.org/index.php/XSS_%28Cross_Site_Scripting%29_Prevention_Cheat_Sheet#RULE_.231_-_HTML_Escape_Before_Inserting_Untrusted_Data_into_HTML_Element_Content
function sanitizeHTML(strings) {
  const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;'};
  let result = strings[0];
  for (let i = 1; i < arguments.length; i++) {
    result += String(arguments[i]).replace(/[&<>'"]/g, (char) => {
      return entities[char];
    });
    result += strings[i];
  }
  return result;
}

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 37.7873042488646, lng: -122.39803725191237},
      styles: mapStyle,
    });

   // Load the stores GeoJSON onto the map.
   map.data.loadGeoJson('mobileFood.json', {idPropertyName: 'locationid'});

     // Define the custom marker icons, using the store's "category".
     /*
     map.data.setStyle((feature) => {
        const santizedCategory = feature.getProperty('FacilityType').replace(" ", "");
        console.log('sanitizedCategory: ' + santizedCategory)
       return {
         icon: {
           url: `img/icon_${santizedCategory}.png`,
           scaledSize: new google.maps.Size(64, 64),
         },
       };
     });
*/
const apiKey = 'AIzaSyBEkAEoZrn9OTlDKt18piNYhPR7qzJ2RRM';
  const infoWindow = new google.maps.InfoWindow();

  // Show the information for a store when its marker is clicked.
  map.data.addListener('click', (event) => {
    const category = event.feature.getProperty('FacilityType').replace(" ", "");
    const name = event.feature.getProperty('Applicant');
    const description = event.feature.getProperty('LocationDescription');
    const menu = event.feature.getProperty('FoodItems');
    const position = event.feature.getGeometry().get();
    const content = sanitizeHTML`
      <img style="float:left; width:200px; margin-top:30px" src="img/icon_${category}.png">
      <div style="margin-left:220px; margin-bottom:20px;">
        <h2>${name}</h2><p>${description}</p>
        <p><b>Food Items:</b> ${menu}<br/></p>
      </div>
      `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
  });

 var originLocation = map.getCenter();
 map.setCenter(originLocation);
 map.setZoom(12);

 }