/*
A custom map style. The was copied from the google maps API demo.
 The featureType defines the items that will also appear on the map.
 Features are geographic characteristics on the map, including roads, parks, bodies of water, and more.
    Roads: selects all roads. Highway, Arterial, local roads are colored.  Color is a RGB value.
    Administrative: selects all administrative areas. Country, locality, province, land parcels and neighborhoods
    Landscape: selects all landscapes including manmade, terrain and natural
    Water: all bodies of water
    poi: selects point of interests: Parks

 Stylers are formatting options that you can apply to map features and elements.
 Visibility indicates whether or not a feature will be visible.
 Lightness (a floating point value between -100 and 100) indicates the percentage change in brightness of the element.

*/

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
/*
create the custom google map. The map is created with a point that exists in the file as the starting point.
*/


  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: 37.7873042488646, lng: -122.39803725191237},
      styles: mapStyle,
    });

/*
    loads the GeoJson file and sets the id to be the locationid.
    Because this uses the Google Map API to load the data, there may be restrictions on the file size
    and the speed with which the data is loaded.  The index.html calls this logic asynchronously and waits for the map
    data to load before rendering the map.

    Better approach would be to use Promises
*/


  map.data.loadGeoJson('mobileFood.json', {idPropertyName: 'locationid'});

const apiKey = 'AIzaSyBEkAEoZrn9OTlDKt18piNYhPR7qzJ2RRM';
  const infoWindow = new google.maps.InfoWindow();
/*
Listens for a mouse click event, when a mouse click occurs, open an information window that shows an icon indication the FacilityType,
the Applicant, LocationDescription and FoodItems served.  The window will point to the GeoLocation (longitutude, latitude)
when open.
*/

  map.data.addListener('click', (event) => {
    const category = event.feature.getProperty('FacilityType').replace(" ", "");
    const name = event.feature.getProperty('Applicant');
    const description = event.feature.getProperty('LocationDescription');
    const menu = event.feature.getProperty('FoodItems');
    const position = event.feature.getGeometry().get();

/*
    Strip special chars from the data for HTML display and build the info window content based on the HTML
*/

    const content = sanitizeHTML`
      <img style="float:left; width:200px; margin-top:30px" src="img/icon_${category}.png">
      <div style="margin-left:220px; margin-bottom:20px;">
        <h2>${name}</h2><p>${description}</p>
        <p><b>Food Items:</b> ${menu}<br/></p>
      </div>
      `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);

/*
    pixelOffset contains an offset from the tip of the info window to the location on which the info window is anchored.
*/

    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
  });

/*
Recenter the map post load
*/

 var originLocation = map.getCenter();
 map.setCenter(originLocation);
 }