
      // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
      var map;
      function initAutocomplete() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 34.675809, lng: -82.834581},
          zoom: 19,
          mapTypeId: 'satellite',
          mapType: 'normal'
        });

        map.setTilt(0);

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);

        });
      }
    function getMap()
    {
      var lat = map.getCenter().lat();
      var lng = map.getCenter().lng();
      var zoom = map.getZoom();

      var url = "measurements.html?";
      url += "lat=" + lat;
      url += "&lng=" + lng;
      url += "&zoom=" + zoom;
      url += "&width=" + document.getElementById('map').offsetWidth;
      url += "&height=" + document.getElementById('map').offsetHeight;
      // document.getElementById('my_iframe').src = "https://maps.googleapis.com/maps/api/staticmap?center=34.675809,-82.834581&zoom=19&scale=1&size=600x300&maptype=satellite&format=png&visual_refresh=true";
      // // return "https://maps.googleapis.com/maps/api/staticmap?center=34.675809,-82.834581&zoom=19&scale=1&size=600x300&maptype=satellite&format=png&visual_refresh=true";
      // measurements.html?
      window.open(url, "_self");
    }

    function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function addStaticMap()
    {
      var lat = getParameterByName('lat');
      var lng = getParameterByName('lng');
      var zoom = getParameterByName('zoom');
      var width = getParameterByName('width');
      var height = getParameterByName('height');
      // // return "https://maps.googleapis.com/maps/api/staticmap?center=34.675809,-82.834581&zoom=19&scale=1&size=600x300&maptype=satellite&format=png&visual_refresh=true";

      var staticImageURL = "https://maps.googleapis.com/maps/api/staticmap?";
      staticImageURL += "center=" + lat + "," + lng;
      staticImageURL += "&zoom=" + zoom;
      staticImageURL += "&size=" + width + "x" + height;
      staticImageURL += "&scale=1&maptype=satellite&format=png&visual_refresh=true";
      console.log(staticImageURL)
      var image = document.getElementById('static-map');
      image.src = staticImageURL;
    }
