// A function to determine the marker size based on totalAbortions, totalBirths, and abortionClinics
function markerSize(population) {
    return Math.sqrt(population) * 50;
  }
  
  // An array that contains all the information needed to create State, totalAbortions, totalBirths, & abortionClinics markers
  // Population Data Source: U.S. 2020 Decennial Census
  var locations = [
    {
      coordinates: [40.7128, -74.0059],
      state: {
        name: "New York State",
        population: 20201249
      },
      totalAbortions: {
        population: 105380
      },
      totalBirths: {
        population: 101250
      },
      abortionClinics: {
          population: 113
      }
    },
    {
      coordinates: [34.0522, -118.2437],
      state: {
        name: "California",
        population: 39538223
      },
      totalAbortions: {
        population: 132680
      },
      totalBirths: {
        population: 471658
      },
      abortionClinics: {
        population: 161
      }
    },
    {
      coordinates: [41.8781, -87.6298],
      state: {
        name: "Illinois",
        population: 12812508
      },
      totalAbortions: {
        population: 42080
      },
      totalBirths: {
        population: 149030
      },
      abortionClinics: {
        population: 25
      }
    },  
    {
      coordinates: [29.7604, -95.3698],
      state: {
        name: "Texas",
        population: 29145505
      },
      totalAbortions: {
        population: 55440
      },
      totalBirths: {
        population: 382050
      },
      abortionClinics: {
        population: 21
      }
    },
    {
      coordinates: [41.2524, -95.9980],
      state: {
        name: "Nebraska",
        population: 1961504
      },
      totalAbortions: {
        population: 2020
      },
      totalBirths: {
        population: 25821
      },
      abortionClinics: {
        population: 3
      }
    }
  ];
  
  // Define arrays to hold the created totalAbortions, totalBirths, abortionClinics, and state markers.
  var totalAbortionsMarkers = [];
  var totalBirthsMarkers = [];
  var abortionClinicsMarkers = [];
  var stateMarkers = [];
  
  // Loop through locations, and create the totalAbortions, totalBirths, abortionClinics, and state markers.
  for (var i = 0; i < locations.length; i++) {
    // Set the marker radius for the state by passing the population to the markerSize() function.
    stateMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "white",
        radius: markerSize(locations[i].state.population)
      })
    );
  
    // Set the marker radius for totalAbortions by passing the population to the markerSize() function.
    totalAbortionsMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "red",
        fillColor: "red",
        radius: markerSize(locations[i].totalAbortions.population)
      })
    );
   
    // Set the marker radius for totalBirths by passing the population to the markerSize() function.
    totalBirthsMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "red",
          fillColor: "red",
          radius: markerSize(locations[i].totalBirths.population)
        })
    );

    // Set the marker radius for abortionClinics by passing the population to the markerSize() function.
    abortionClinicsMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "purple",
          fillColor: "purple",
          radius: markerSize(locations[i].abortionClinics.population)
        })
      );
    }  
  
  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  
  // Create two separate layer groups: one for the city markers and another for the state markers.
  var states = L.layerGroup(stateMarkers);
  var totalAbortions = L.layerGroup(totalAbortionsMarkers);
  var totalBirths = L.layerGroup(totalBirthsMarkers);
  var abortionClinics = L.layerGroup(abortionClinicsMarkers);
  
  // Create a baseMaps object to contain the streetmap and the darkmap.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };
  
  // Create an overlayMaps object to contain  "totalAbortions", "totalBirths", "abortionClinics", and "abortionRatio" layers
  var overlayMaps = {
    "totalAbortions": Abortions,
    "totalBirths": Births,
    "abortionClinics": Clinics,
  };
  
  // Modify the map so that it has the streetmap, states, and cities layers
  L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 50
  });
  
  // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  