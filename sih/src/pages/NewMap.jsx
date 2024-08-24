

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "./Map.css";
import { database } from './firebase';
import { ref, push, onValue } from "firebase/database";
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/6678/6678128.png",
    iconSize: [30, 30],
  });
  
  const center = [18.653505710625943, 73.76106360300088];
  const zoom = 17;

const App = () => {
    const [startCoordinate, setStartCoordinate] = useState({ lat: 0, lng: 0 });
    const [endCoordinate, setEndCoordinate] = useState({ lat: 0, lng: 0 });
    const [markerCoordinate, setMarkerCoordinate] = useState({ lat: 0, lng: 0 });
    const [polylines, setPolylines] = useState([]);
    const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const polylinesRef = ref(database, 'polylines');
    const markersRef = ref(database, 'markers');

    onValue(polylinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const polylinesArray = Object.values(data);
        setPolylines(polylinesArray);
      }
    });

    onValue(markersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const markersArray = Object.values(data);
        setMarkers(markersArray);
      }
    });
  }, []);

  const addPolyline = () => {
    if (startCoordinate.lat !== 0 && startCoordinate.lng !== 0 && endCoordinate.lat !== 0 && endCoordinate.lng !== 0) {
      const newPolyline = {
        startCoordinate: [startCoordinate.lat, startCoordinate.lng],
        endCoordinate: [endCoordinate.lat, endCoordinate.lng],
      };

      push(ref(database, 'polylines'), newPolyline);

      setPolylines((prevPolylines) => [...prevPolylines, newPolyline]);
      setStartCoordinate({ lat: 0, lng: 0 });
      setEndCoordinate({ lat: 0, lng: 0 });
    } else {
      alert('Please enter valid coordinates for the polyline.');
    }
  };

  const addMarker = () => {
    if (markerCoordinate.lat !== 0 && markerCoordinate.lng !== 0) {
      const newMarker = {
        position: [markerCoordinate.lat, markerCoordinate.lng],
        icon: 'https://cdn-icons-png.flaticon.com/128/6678/6678128.png',
      };

      push(ref(database, 'markers'), newMarker);

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      setMarkerCoordinate({ lat: 0, lng: 0 });
    } else {
      alert('Please enter valid coordinates for the marker.');
    }
  };

  return (
    <>
      <div className="App">
        <h1>Water Supply Network</h1>
        <div>
          <label>
            Start Latitude:
            <input
              type="text"
              value={startCoordinate.lat}
              onChange={(e) =>
                setStartCoordinate({
                  ...startCoordinate,
                  lat: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>
          <label>
            Start Longitude:
            <input
              type="text"
              value={startCoordinate.lng}
              onChange={(e) =>
                setStartCoordinate({
                  ...startCoordinate,
                  lng: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>
          <br />
          <label>
            End Latitude:
            <input
              type="text"
              value={endCoordinate.lat}
              onChange={(e) =>
                setEndCoordinate({
                  ...endCoordinate,
                  lat: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>
          <label>
            End Longitude:
            <input
              type="text"
              value={endCoordinate.lng}
              onChange={(e) =>
                setEndCoordinate({
                  ...endCoordinate,
                  lng: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>
          <br />
          <button onClick={addPolyline}>Add Polyline</button>
          <br />
          <label>
            Marker Latitude:
            <input
              type="text"
              value={markerCoordinate.lat}
              onChange={(e) =>
                setMarkerCoordinate({
                  ...markerCoordinate,
                  lat: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>
          <label>
            Marker Longitude:
            <input
              type="text"
              value={markerCoordinate.lng}
              onChange={(e) =>
                setMarkerCoordinate({
                  ...markerCoordinate,
                  lng: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>
          <br />
          <button onClick={addMarker}>Add Marker</button>
        </div>
      </div>
      <MapContainer center={center} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[startCoordinate.lat, startCoordinate.lng]} icon={customIcon} />
        <Marker position={[endCoordinate.lat, endCoordinate.lng]} icon={customIcon} />
        {polylines.map((polyline, index) => (
          <Polyline key={index} positions={[polyline.startCoordinate, polyline.endCoordinate]} color="blue" />
        ))}
        {markers.map((marker, index) => (
  <Marker
    key={index}
    position={marker.position}
    icon={new L.Icon({
      iconUrl: marker.icon,
      iconSize: [30, 30],
    })}
  />
))}

      </MapContainer>
    </>
  );
};



export default App;
