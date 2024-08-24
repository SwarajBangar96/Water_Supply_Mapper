// import React, { useState, useEffect } from "react";
// import L from "leaflet";
// import { MapContainer, TileLayer, Polyline } from "react-leaflet";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyCNGtGxMq0SplaNCEZKF02xSo6G8ZUPP5c",
//   authDomain: "sihnode.firebaseapp.com",
//   databaseURL: "https://sihnode-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "sihnode",
//   storageBucket: "sihnode.appspot.com",
//   messagingSenderId: "213651984141",
//   appId: "1:213651984141:web:8313e5d7faa2cac9b1ea44",
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// const Prototype = () => {
//   const [values, setValues] = useState({
//     difference: 0,
//     sensor1: 0,
//     sensor2: 0,
//   });

//   useEffect(() => {
//     const valuesRef = ref(database, "flow_sensor");

//     const valuesListener = onValue(valuesRef, (snapshot) => {
//       const data = snapshot.val();
//       console.log("Firebase Data:", data);
//       if (data) {
//         setValues({
//           sensor1: data.sensor1,
//           sensor2: data.sensor2,
//           difference: data.Diffrence,
//         });
//       }
//     });

//     return () => {
//       valuesListener();
//     };
//   }, [database]);

//   const center = [18.651738581062098, 73.76380526230817];
//   const zoom = 20;

//   const getColor = () => {
//     // Set the color based on the difference value
//     if (values.difference > 10) {
//       return "red";
//     } else if (values.difference > 5) {
//       return "orange";
//     } else {
//       return "blue";
//     }
//   };

//   return (
//     <>
//       <div>
//         {console.log("Hello")}
//         <h1> Drain Defenders</h1>
//       </div>
//       <MapContainer center={center} zoom={zoom}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Polyline
//           positions={[
//             [18.651255636564674, 73.76364528786603],
//             [18.65370591222339, 73.76462913361755],
//           ]}
//           color={getColor()}
//         />
//       </MapContainer>
//       <iframe
//         width="450"
//         height="260"
//         // style={border: 1px solid #cccccc}
//         src="https://thingspeak.com/channels/2382352/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
//       ></iframe>
//       <iframe
//         width="450"
//         height="260"
//         // style={border: 1px solid #cccccc}
//         src="https://thingspeak.com/channels/2382352/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
//       ></iframe>
//       <div id="sensordata">
//         <h1> Sensor 1 readings: {values.sensor1} </h1>
//         <h1> Sensor 2 readings: {values.sensor2} </h1>
//         <h1> Difference between them: {values.difference} </h1>
//       </div>
//     </>
//   );
// };

// export default Prototype;

// Prototype.js

import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import './Prototype.css'
import { getDatabase, ref, onValue } from "firebase/database";
import Alert from "./Alert"; // Import the updated Alert component
import { database } from './firebase';

// ... (your other imports)
// const firebaseConfig = {
//     apiKey: "AIzaSyCNGtGxMq0SplaNCEZKF02xSo6G8ZUPP5c",
//     authDomain: "sihnode.firebaseapp.com",
//     databaseURL: "https://sihnode-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "sihnode",
//     storageBucket: "sihnode.appspot.com",
//     messagingSenderId: "213651984141",
//     appId: "1:213651984141:web:8313e5d7faa2cac9b1ea44",
//   };
  
//   const app = initializeApp(firebaseConfig);
//   const database = getDatabase(app);
  
const Prototype = () => {
  const [values, setValues] = useState({
    difference: 0,
    sensor1: 0,
    sensor2: 0,
  });

  useEffect(() => {
    const valuesRef = ref(database, "flow_sensor");

    const valuesListener = onValue(valuesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data);
      if (data) {
        setValues({
          sensor1: data.sensor1,
          sensor2: data.sensor2,
          difference: data.Difference,
        });
      }
    });

    return () => {
      valuesListener();
    };
  }, [database]);

  const center = [18.651738581062098, 73.76380526230817];
  const zoom = 20;

  // const getColor = () => {
  //   // Set the color based on the difference value
  //   if (values.difference > 10) {
  //     return "red";
  //   } else if (values.difference > 5) {
  //     return "orange";
  //   } else {
  //     return "blue";
  //   }
  // };

  return (
    <>
     

      {/* Display the Alert component with the pop-up */}
      <Alert difference={values.difference} />

      {/* <MapContainer center={center} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline
          positions={[
            [18.651255636564674, 73.76364528786603],
            [18.65370591222339, 73.76462913361755],
          ]}
          color={getColor()}
        />
      </MapContainer> */}
      <div className="sensordata">
<div className="plot">
  <h1>Flow Sensor 1</h1>
  <iframe width="450" height="260"  src="https://thingspeak.com/channels/2385539/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
      </div>
      <div className="plot">
      <h1>Gauge Meter</h1>
      <iframe width="450" height="260"  src="https://thingspeak.com/channels/2385539/widgets/774329"></iframe>
</div> 
      <div className="plot">
      <h1>Flow Sensor 2</h1>
      <iframe width="450" height="260"  src="https://thingspeak.com/channels/2385539/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"></iframe>
</div> 
    
      </div>
      <div className="sensordata">
        <div className="card"><h1> Sensor 1 readings: {values.sensor1} </h1></div>
        <div className="card"><h1> Sensor 2 readings: {values.sensor2} </h1></div>
        <div className="card"><h1> Difference between them: {values.difference} </h1></div>
      </div>
    </>
  );
};

export default Prototype;
