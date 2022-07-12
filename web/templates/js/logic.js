function createMap(stateCapitals) {

    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
        "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the capitals.
    var overlayMaps = {
        "State Capitals": stateCapitals
    };

    // Create the map object with options.
    var map = L.map("map", {
        center: [39.8097, -98.5556],
        zoom: 4,
        layers: [streetmap, stateCapitals]
    });

       // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
       L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

};

function createMarkers(response) {

    console.log(response)

    var usCapitals = response
          
    // Initialize an array to hold capital markers.
    var capitals = [];
    
        // Loop through the array.
        for (var index = 0; index < usCapitals.length; index++) {
    
            var usCapital = usCapitals[index];

            // For each capital, create a marker, and bind a popup with the capital's name and state.
            var capital = L.marker([usCapital.lat, usCapital.lon])
                .bindPopup("<h3>Capital: " + usCapital.city + "</h3><h3>State: " + usCapital.state + "</h3>");
          
            // Add the marker to the capitalSite array.
            capitals.push(capital);
        }
          
        // Create a layer group that's made from the capital array, and pass it to the createMap function.
        createMap(L.layerGroup(capitals));
    
    };

d3.json("json/US-Capitals.json",function(data) {
    console.log(data)}).then(createMarkers);