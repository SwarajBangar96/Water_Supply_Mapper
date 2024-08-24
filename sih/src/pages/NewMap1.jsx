// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "./Map.css";
// import { database } from './firebase';
// import { ref, onValue, push } from "firebase/database";

// const customIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/128/6678/6678128.png",
//   iconSize: [30, 30],
// });

// const center = [18.653505710625943, 73.76106360300088];
// const zoom = 17;

// const App = () => {
//   const [markers, setMarkers] = useState([]);
//   const [polylines, setPolylines] = useState([]);
//   const [isAddingMarker, setIsAddingMarker] = useState(false);
//   const [polylineVertices, setPolylineVertices] = useState([]);
//   const [firebaseMarkers, setFirebaseMarkers] = useState([]);
//   const [firebasePolylines, setFirebasePolylines] = useState([]);

//   const addMarker = (lat, lng) => {
//     const newMarker = { position: [lat, lng], icon: customIcon };
//     setMarkers([...markers, newMarker]);
//     // Push the new marker data to Firebase
//     push(ref(database, 'firebaseMarkers'), newMarker);
//   };

//   const addPolyline = () => {
//     if (polylineVertices.length >= 2) {
//       setPolylines([...polylines, polylineVertices]);
//       // Push the new polyline data to Firebase
//       push(ref(database, 'firebasePolylines'), polylineVertices);
//     }

//     setPolylineVertices([]);
//   };

//   const MapClickHandler = () => {
//     const map = useMapEvents({
//       click: (e) => {
//         const { lat, lng } = e.latlng;

//         if (isAddingMarker) {
//           addMarker(lat, lng);
//           setIsAddingMarker(false);
//         }

//         if (polylineVertices.length > 0) {
//           setPolylineVertices([...polylineVertices, [lat, lng]]);
//         } else {
//           setPolylineVertices([[lat, lng]]);
//         }
//       },
//     });

//     return null;
//   };

//   useEffect(() => {
//     const markersRef = ref(database, 'firebaseMarkers');
//     const polylinesRef = ref(database, 'firebasePolylines');

//     onValue(markersRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const markersArray = Object.values(data);
//         setFirebaseMarkers(markersArray);
//       }
//     });

//     onValue(polylinesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const polylinesArray = Object.values(data);
//         setFirebasePolylines(polylinesArray);
//       }
//     });
//   }, []);

//   const handleAddMarkerClick = () => {
//     setIsAddingMarker(true);
//     setPolylineVertices([]);
//   };

//   const handleAddPolylineClick = () => {
//     setIsAddingMarker(false);
//     addPolyline();
//   };

//   return (
//     <>
//       <div className="App">
//         <h1>Water Supply Network</h1>
//         <div>
//           <button onClick={handleAddMarkerClick}>Add Marker</button>
//           <button onClick={handleAddPolylineClick}>Add Polyline</button>
//         </div>
//       </div>
//       <MapContainer center={center} zoom={zoom} onClick={MapClickHandler}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {firebaseMarkers.map((marker, index) => (
//           <Marker
//             key={index}
//             position={marker.position}
//             icon={new L.Icon({
//               iconUrl: marker.icon,
//               iconSize: [30, 30],
//             })}
//           />
//         ))}
//         {firebasePolylines.map((polyline, index) => (
//           <Polyline key={index} positions={polyline} color="blue" />
//         ))}
//       </MapContainer>
//     </>
//   );
// };

// export default App;


import React, { useState , useEffect} from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "./Map.css";
import { database } from './firebase';
import { ref, push, onValue } from "firebase/database";
import img from '../images/tank.png'


const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/6678/6678128.png",
  iconSize: [30, 30],
});

const center = [18.653505710625943, 73.76106360300088];
const zoom = 17;

const App = () => {
    const [markers, setMarkers] = useState([]);
    const [polylines, setPolylines] = useState([]);
    const [isAddingMarker, setIsAddingMarker] = useState(false);
    const [polylineVertices, setPolylineVertices] = useState([]);
    const [firebaseMarkers, setFirebaseMarkers] = useState([]);  // Declare the state variable
    const [firebasePolylines, setFirebasePolylines] = useState([]);  

  
const addMarker = (lat, lng) => {
    const newMarker = { position: [lat, lng], icon: customIcon.options.iconUrl };
    setMarkers([...markers, newMarker]);
  
    // Push the new marker data to Firebase
    push(ref(database, 'firebaseMarkers'), newMarker);
  };
  
  const addPolyline = () => {
    if (polylineVertices.length >= 2) {
      setPolylines([...polylines, polylineVertices]);
  
      // Push the new polyline data to Firebase
      push(ref(database, 'firebasePolylines'), polylineVertices);
    }
  
    setPolylineVertices([]);
  };

  const MapClickHandler = () => {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;

        if (isAddingMarker) {
          addMarker(lat, lng);
          setIsAddingMarker(false);
        }

        if (polylineVertices.length > 0) {
            // If there are already vertices in the polylineVertices array, add the new coordinates
            setPolylineVertices([...polylineVertices, [lat, lng]]);
          } else {
            // If polylineVertices is empty, initialize it with the current coordinates
            setPolylineVertices([[lat, lng]]);
          }
          
          // Rest of your code...
          
         // {console.log(polylineVertices)}
        //   console.log(lng)
        }
      
});
    return null;
  };

  
  useEffect(() => {
    const markersRef = ref(database, 'firebaseMarkers');
    const polylinesRef = ref(database, 'firebasePolylines');
  
    // Listen for changes in markers
    onValue(markersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const markersArray = Object.values(data);
        setFirebaseMarkers(markersArray);
      }
    });
  
    // Listen for changes in polylines
    onValue(polylinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const polylinesArray = Object.values(data);
        setFirebasePolylines(polylinesArray);
      }
    });
  }, []);

  const handleAddMarkerClick = () => {
    setIsAddingMarker(true);
    setPolylineVertices([]);
  };

  const handleAddPolylineClick = () => {
    setIsAddingMarker(false);
    addPolyline();
  };

  return (
    <>
      <div className="App">
        <h1>Water Supply Network</h1>
        <div>
          <button onClick={handleAddMarkerClick}>Add Marker</button>
          <button onClick={handleAddPolylineClick}>Add Polyline</button>
        </div>
      </div>
      <MapContainer center={center} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        {firebaseMarkers.map((marker, index) => (
  <Marker
    key={index}
    position={marker.position}
    icon={new L.Icon({
      iconUrl: marker.icon,
      iconSize: [30, 30],
    })}
  />
))}

{firebasePolylines.map((polyline, index) => (
  <Polyline key={index} positions={polyline} color="blue" />
))}
      </MapContainer>
    </>
  );
};

export default App;