

  function BuildMap(records) {

  const mapOptions = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 4
  };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    const labels = records.map((record, position) => {
           const applicants = {};
           applicants[position] = record.Applicant;
           return applicants;
      });


     // Add some markers to the map.
    const markers = locations.map((position, i) => {
      const label = labels[i];
      const marker = new google.maps.Marker({
        position,
        label,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
      });
      return marker;
    })
    .catch(e => {
      // do something
    });

/*


     const menus = records.map((record, position) => {
             const menus = {};
             menus[position] = record.FoodItems;
             return menus;
        });

const locations = records.map((record, position) => {
             const locations = {};
             locations[position] = 'lat: ' + record.Latitude + ', ' + 'lng: '  + record.Longitude;
             return locations;
        });

  locations.forEach(function(label) {
  console.log(label);
  });
*/

  }

  module.exports.BuildMap = BuildMap;