import React, { useState, useEffect } from 'react';
import { useGeolocation } from 'react-use';

export default function SearchBar() {
  // Get the user's current location using the useGeolocation hook
  const { latitude, longitude } = useGeolocation();

  useEffect(() => {
    // Wait for the MapQuest JavaScript library to load before trying to access the window.MQ object
    window.MQ.ready(() => {
      // Initialize the MapQuest API and create a map centered on the user's current location
      const map = window.MQ.map('map', {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      });
      console.log(window.ready);
      // Create a search box and link it to the UI element
      const input = document.getElementById('search-input');
      const searchBox = window.MQ.geocoding().searchBox(input);
      map.addControl(searchBox);

      // Bias the search results towards the user's current location
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      // Listen for the user's search query and perform a search
      searchBox.addListener('places_changed', () => {
       
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }
  
        // For each place, get the icon, name, and location
        const bounds = new window.MQ.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry) {
            console.log('Returned place contains no geometry');
            return;
          }
  
          // Create a marker for the place
          const marker = new window.MQ.Marker({
            position: place.geometry.location,
            map,
            title: place.name,
          });
  
          // Add the marker to the map and extend the bounds to include the marker
          marker.setMap(map);
          bounds.extend(place.geometry.location);
        });
        map.fitBounds(bounds);
      });
    });
    }, [latitude, longitude]);
  
    return (
      <div>
        <input id="search-input" type="text" placeholder="Search for places" />
        <div id="map" />
      </div>
    );
  }
  
// import React, { useState, useEffect } from 'react';
// import { useGeolocation } from 'react-use';

// export default function SearchBar() {
//   // Get the user's current location using the useGeolocation hook
//   const { latitude, longitude } = useGeolocation();

//   useEffect(() => {
//     // Initialize the MapQuest API and create a map centered on the user's current location
//     const map = window.MQ.map('map', {
//       center: { lat: latitude, lng: longitude },
//       zoom: 15,
//     });

//     // Create a search box and link it to the UI element
//     const input = document.getElementById('search-input');
//     const searchBox = window.MQ.geocoding().searchBox(input);
//     map.addControl(searchBox);

//     // Bias the search results towards the user's current location
//     map.addListener('bounds_changed', () => {
//       searchBox.setBounds(map.getBounds());
//     });

//     // Listen for the user's search query and perform a search
//     searchBox.addListener('places_changed', () => {
//       const places = searchBox.getPlaces();

//       if (places.length === 0) {
//         return;
//       }

//       // For each place, get the icon, name, and location
//       const bounds = new window.MQ.LatLngBounds();
//       places.forEach((place) => {
//         if (!place.geometry) {
//           console.log('Returned place contains no geometry');
//           return;
//         }

//         // Create a marker for the place
//         const marker = new window.MQ.Marker({
//           position: place.geometry.location,
//           map,
//           title: place.name,
//         });

//         // Add the marker to the map and extend the bounds to include the marker
//         marker.setMap(map);
//         bounds.extend(place.geometry.location);
//       });
//       map.fitBounds(bounds);
//     });
//   }, [latitude, longitude]);

//   return (
//     <div>
//       <input id="search-input" type="text" placeholder="Search for places" />
//       <div id="map" />
//     </div>
//   );
// }
