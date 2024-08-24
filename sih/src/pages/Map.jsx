// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { useState } from "react";
// import "./Map.css"
// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// // import Prototype from "./Prototype";

// export default function App() {
//   const customIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/128/6678/6678128.png",
//     iconSize: [30, 30],
//   });

//   const [flowValue, setFlowValue] = useState(21);
//   const [flowValue1, setFlowValue1] = useState(25);
//   const [flowValue2, setFlowValue2] = useState(43);

//   const center = [18.653505710625943, 73.76106360300088];
//   const zoom = 17;
//   const markerPosition = [18.653793059496838, 73.75947784587639];
//   const polylinePositions = [
//     [18.653804113264833, 73.75962172532296],
//     [18.654557587331762, 73.7626549413067],
//     // Add more points as needed
//   ];
//   const polylinePositions1 = [
//     [18.656877754234984, 73.75788287665685],
//     [18.65543790858114, 73.75869091104275],
//     [18.654883037973487, 73.75894295846692],
//     [18.653838352372606, 73.75934714455639],
//     [18.65306632249539, 73.75985641499965],
//     [18.652653787771605, 73.76017947109197],
//     [18.65217830304855, 73.76067083976817],
//     [18.650759443948942, 73.76261067061792],
//     // Add more points as needed
//   ];
//   const pipes = [
//     [18.652163522379695, 73.76066207605714],
//     [18.653091566703505, 73.76146442598741],
//     [18.653631278092387, 73.76092605265245],
//     [18.6542038968344, 73.76053008774996],
//     [18.65501199220892, 73.76020206898981],
//     [18.65583938899234, 73.75987489438745],
//   ];

//   // Set the color based on the condition
//   const pipeColor = flowValue > 25 ? "red" : "blue";
//   const pipeColor1 = flowValue1 > 25 ? "red" : "blue";
//   const pipeColor2 = flowValue2 > 25 ? "red" : "blue";

//   return (
//     <>
//       <div className="App">
//         <h1>Water Supply Network</h1>
//         <p>Flow Value: {flowValue}</p>
//       </div>
//       <MapContainer center={center} zoom={zoom}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={markerPosition} icon={customIcon} />
//         <Polyline positions={polylinePositions} color={pipeColor1} />
//         <Polyline positions={polylinePositions1} color={pipeColor2} />
//         <Polyline positions={pipes} color={pipeColor} />
//       </MapContainer>
//         <div>
//         <p>Flow Value: {flowValue}</p>  
//         </div>

//     </>
//   );
// }
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NewMap from './NewMap'
import NewMap1 from './NewMap1'
import NewMap2 from './NewMap2'
import Nav from '../components/Nav'
import Foot from '../components/Foot'

function App() {
  return (
    <>
    {/* <BrowserRouter>
    <Nav/>
    
        <Routes>
            <Route path='/NewMap' element={<NewMap/>}></Route>
            <Route path='/NewMap1' element={ <NewMap1/> }></Route>
            <Route path='/NewMap2' element={<NewMap2 /> }></Route>
        </Routes>
    <Foot/>
    </BrowserRouter> */}
        
    </>
  )
}

export default App