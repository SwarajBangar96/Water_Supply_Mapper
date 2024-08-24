import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { database } from './firebase';
import { ref, push, onValue } from "firebase/database";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/6678/6678128.png",
  iconSize: [30, 30],
});
const pointIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [30, 30],
  });

const center = [18.653505710625943, 73.76106360300088];
const zoom = 17;

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [polylineVertices, setPolylineVertices] = useState([]);
  const [firebaseMarkers, setFirebaseMarkers] = useState([]);
  const [firebasePolylines, setFirebasePolylines] = useState([]);

  const addMarker = (lat, lng) => {
    const newMarker = { position: [lat, lng], icon: customIcon.options.iconUrl };
    setMarkers([...markers, newMarker]);

    // Push the new marker data to Firebase
    push(ref(database, 'firebaseMarkers1'), newMarker);
  };

  const addPolyline = () => {
    if (polylineVertices.length >= 2) {
      setPolylines([...polylines, polylineVertices]);

      // Push the new polyline data to Firebase
      push(ref(database, 'firebasePolylines1'), polylineVertices);
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
      },
    });

    return null;
  };

  const handleAddMarkerClick = () => {
    setIsAddingMarker(true);
    setPolylineVertices([]);
  };

  const handleCreatePolylineClick = () => {
    setIsAddingMarker(false);
    addPolyline();
  };

  // Function to get user's location and add it to Firebase
  const handleGetMyLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        addMarker(latitude, longitude);
        console.log(latitude, longitude)
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  };

  useEffect(() => {
    const markersRef = ref(database, 'firebaseMarkers1');
    const polylinesRef = ref(database, 'firebasePolylines1');

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

  return (
    <>
      <div className="App">
        <h1>Water Supply Network</h1>
        <div>
          <button onClick={handleAddMarkerClick}>Add Marker</button>
          <button onClick={handleCreatePolylineClick}>Create Polyline</button>
          <button onClick={handleGetMyLocationClick}>Get My Location</button>
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
