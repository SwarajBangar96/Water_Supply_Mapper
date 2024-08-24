// // import React, { useState } from "react";
// // import "./Grievence.css";
// // import { initializeApp } from "firebase/app";
// // import {database} from '../firebase'
// // import {ref,push,child,update} from "firebase/database";

// // const Grievence = () => {
// //   const [formData, setFormData] = useState({
// //     areaName: "",
// //     complaintName: "",
// //     grievanceType: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({ ...prevData, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Extract form data
// //     const { areaName, complaintName, grievanceType } = formData;

// //     // Prepare the data to be pushed to Firebase
// //     const grievanceData = {
// //       areaName,
// //       complaintName,
// //       grievanceType,
// //     };

// //     // Push data to Firebase
// //     const newPostKey = push(ref(database, 'posts')).key;
// //     const updates = {};
// //     updates['/' + newPostKey] = grievanceData;

// //     try {
// //       await update(ref(database), updates);
// //       console.log("Form submitted successfully!");
// //     } catch (error) {
// //       console.error("Error submitting form:", error.message);
// //     }

// //     // Optional: Clear the form after submission
// //     setFormData({
// //       areaName: "",
// //       complaintName: "",
// //       grievanceType: "",
// //     });
// //   };


// //   return (
// //     <div className="grievance-form-container">
// //       <div className="head">
// //         <h2>Grievance Form</h2>
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           Area Name:
// //           <input
// //             type="text"
// //             name="areaName"
// //             value={formData.areaName}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Name of Complainant:
// //           <input
// //             type="text"
// //             name="complaintName"
// //             value={formData.complaintName}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Grievance Type:
// //           <select
// //             name="grievanceType"
// //             value={formData.grievanceType}
// //             onChange={handleChange}
// //             required
// //           >
// //             <option value="">Select grievance type</option>
// //             <option value="newPipelineConnection">
// //               New Pipeline Connection
// //             </option>
// //             <option value="blockagesInExisting">Blockages in Existing</option>
// //             <option value="waterQuality">Water Quality</option>
// //             <option value="leakageDetected">Leakage Detected</option>
// //           </select>
// //         </label>
// //         <div className="buttonn">
// //        <button type="submit">Submit</button>
// //        </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Grievence;
// import React, { useState } from "react";
// import "./Grievence.css";
// import { database } from './firebase';
// import { ref, push, update, set } from "firebase/database";

// const Grievence = () => {
//   const [formData, setFormData] = useState({
//     areaName: "",
//     complaintName: "",
//     grievanceType: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     console.log(formData);
//     e.preventDefault();

//     // Extract form data
//     const { areaName, complaintName, grievanceType } = formData;

//     // Prepare the data to be pushed to Firebase
//     const grievanceData = {
//       areaName,
//       complaintName,
//       grievanceType,
//     };

//     // Push data to Firebase
//     const newPostKey = push(ref(database, 'posts')).key;
//     const updates = {};
//     updates['/' + newPostKey] = grievanceData;

//     try {
//         await push(ref(database, 'posts', newPostKey), grievanceData);
//         console.log("Form submitted successfully!");
//       } catch (error) {
//         console.error("Error submitting form:", error.message);
//       }

//     // Optional: Clear the form after submission
//     setFormData({
//       areaName: "",
//       complaintName: "",
//       grievanceType: "",
//     });
//   };

//   return (
//     <div className="grievance-form-container">
//       <div className="head">
//         <h2>Grievance Form</h2>
//       </div>
//       <form onSubmit={handleSubmit}>

//         <label>
//           Name of Complainant:
//           <input
//             type="text"
//             name="complaintName"
//             value={formData.complaintName}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Grievance Type:
//           <select
//             name="grievanceType"
//             value={formData.grievanceType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select grievance type</option>
//             <option value="newPipelineConnection">
//               New Pipeline Connection
//             </option>
//             <option value="blockagesInExisting">Blockages in Existing</option>
//             <option value="waterQuality">Water Quality</option>
//             <option value="leakageDetected">Leakage Detected</option>
//           </select>
//         </label>
//         <div className="buttonn">
//           <button type="submit">Submit</button>
//         </div>
       
//       </form>
      
//     </div>
    
//   );
// };

// export default Grievence;

import React, { useState } from "react";
import "./Grievence.css";
import { database } from './firebase';
import { ref, push } from "firebase/database";

const Grievence = () => {
  const [formData, setFormData] = useState({
    areaName: "",
    complaintName: "",
    grievanceType: "",
    location: {
      latitude: null,
      longitude: null,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   //  Extract form data
    const { areaName, complaintName, grievanceType, location } = formData;

    // Prepare the data to be pushed to Firebase
    const grievanceData = {
      areaName,
      complaintName,
      grievanceType,
      location,
    };

    // Push data to Firebase
    try {
      await push(ref(database, 'posts'), grievanceData);
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }

     //Optional: Clear the form after submission
    setFormData({
      areaName: "",
      complaintName: "",
      grievanceType: "",
      location: {
        latitude: null,
        longitude: null,
      },
    });
  };

  return (
    <div className="grievance-form-container">
      <div className="head">
        <h2>Grievance Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
      <label>
          Name of Complainant:
           <input
             type="text"
             name="complaintName"
             value={formData.complaintName}
             onChange={handleChange}
             required
           />
         </label>

         <label>
           Grievance Type:
           <select
             name="grievanceType"
             value={formData.grievanceType}
             onChange={handleChange}
             required
           >
             <option value="">Select grievance type</option>
             <option value="newPipelineConnection">
               New Pipeline Connection
             </option>
             <option value="blockagesInExisting">Blockages in Existing</option>
             <option value="waterQuality">Water Quality</option>
             <option value="leakageDetected">Leakage Detected</option>
           </select>
         </label>     
        <div className="buttonn">
          <button type="button" onClick={handleUseCurrentLocation}>
            Use My Current Location
          </button>
        </div>

        <div className="buttonn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Grievence;
