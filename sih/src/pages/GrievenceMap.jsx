import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getDatabase, ref, onValue } from 'firebase/database';

import 'leaflet/dist/leaflet.css';

const GrievanceMap = () => {
  const [grievanceData, setGrievanceData] = useState([]);
  const database = getDatabase();

  useEffect(() => {
    // Fetch grievance data from Firebase
    const grievanceRef = ref(database, 'posts');
    onValue(grievanceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.values(data);
        setGrievanceData(dataArray);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      // Unsubscribe from the Firebase reference (if needed)
    };
  }, [database]);

  const grievanceIcon = (grievanceType) => {
    // Define icons for different grievance types
    // You may need to customize the icon URLs based on your project structure
    const icons = {
      newPipelineConnection: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAAA4ODjp6enz8/O0tLTAwMDQ0NC7u7tJSUkYGBj6+vp9fX3Y2Ni4uLjt7e3k5OSlpaXS0tLJyckTExNtbW2WlpYpKSlkZGSurq5WVlafn589PT0KCgoUFBSQkJAxMTGHh4ciIiJ3d3dbW1szMzPA7mmXAAAE40lEQVR4nO3d21riMBSG4VTLRtlUUER2zqB4/7c46MHUtM1q0qwkKzz/dyoKr4VC2yQohRBCCCGEEELIrvLwdufTcTOapTaQLU+Fd9tFagXRyN/3nVziPQ+weE8NMfaHSVhMU0tM/eUSblJLTHEBi4fUElMQQghh+iC8MeFqOXJoec5PWLn97jQ/4b3b7y4hFBGEVBDKCEIqCGUEIRWEMoKQKkPh7R9bTNcTh9av+Ql9gjBZEEIIYfpuX7jlEr6llpg6cwlHqSWmnriEqSHmDjzA59QOohWD7zROrSB7Onvubo6rMrXBokp7zNQormcNF+0BeqePHKK2yfj3De9kj2j7HYR1EEoNwjoIpQZhHYRSg7AOQqlBWAeh1CCscxOWC7p45z/CCMcPRV8PsSbbBBHOe33ffTJTDIUQnq2ARXHmxnQWQLiwBEaa2hdAaLsJI23EAMI7a2GUs64BhI/Wwkd2TkdphdX9oCqXd9OBwtODOWvg8D72nzvb3dRAoYS256cbF147Wlzdy1t4NfZeos1dWBSbnt1OaOFYzX4X5P9Eb8bwwgjPhFce4bPhz9NFERZzFuFs0H3HEVJHYvZC9TbkriMJia3oIBw0yCiWsDgwCAe9EqMJjXtUF6F62jvfbzzhyXAw4CRUqhxP+xq/WAsHHj1Vk92lY4EkwyorjkKbtKOnEMLvyl17QNek85a5Cq/vXtq0j++6B/PmK1Rqrb0eCsPOJmehqhorJXVuxKyFqnrXiV2HxHkL1VoXdn0Ez1zYWLNs23GL3IWzj76nae7Cxnj1ZfsG2Qt1QMchRvZCpX1W3rd/nr9Qm3PQcS5eFzpOCO4uslA7pntpC3Sh1UnkviIL9QPz9rT0SvtsxzIDJrJQn0/RFs6+fv98xXGXkYVlj7B3V+SeNOG87wbOSRNqS0CwPE2lCfVd0QfDaC5pwsZ82T/+dylO2Djdsfa+S3HCxqnsd++djTihagwt+Ov70U2esHmy/sXziSpP2NyI192N1x5VoHDSFBZbnxm+AoVq0yIWp8tuMvAFaS98sbgK0n8pxUY4Y/giCEP+1572PYd0VsKB1+ht4ri6Rh/T2Qm5Vlhox3L9kNyKlkLLodnusQjJ9VNsheqTBdSK5xow9e5lLQy0FXmE1CvRXhjmtcgjpIYgOgjVc4A3DVlCVXa89XsmTHjdjNxjmJuvIJ7RcR7C6z/5yAH732Wudxn0V1iFDCvz8McsvLbYfe5jMIkR/9pej1/485tDJ0OwzCiZaTNvwggHByGEP4kW6qMjqD7Mf0S00P6DEfGtdKKF2mLYZMRkZ9FCZfupiJpgKVto+/2Y1KORLVSlzafPC3meULjw+rFvNadb9UyQFC/0DsI6CKUGYR2EUoOwDkKpQVgHodQgrINQbNqpEOoasL4SAst8isCVB/ultDqzXJknWSxDe4zLDwiIaeySYCIPkGn2T4hGXMI4azIOaND6KV11zZcVEd9AidQSUxBCCGH6ILwx4avb1xRP8xM6rvhd5SfsWAKC6h5CEUFIBaGMIKSCUEYQUkEoIwipMhTe/rHFeTlyaLnKT+hVaokpCCGEMH0Q5i9km2r9lVpiyn5GUU8Ma5YF6r3/wVsld1yN/VcLko1SO4gWX/2PvzfHo5LIzUab451Pb4d4X+OKEEIIIYQQQrn3D7urYppN7NaSAAAAAElFTkSuQmCC',
      blockagesInExisting: 'https://cdn-icons-png.flaticon.com/128/5806/5806676.png',
      waterQuality: 'https://cdn-icons-png.flaticon.com/128/3270/3270349.png',
      leakageDetected: 'https://cdn-icons-png.flaticon.com/128/3125/3125474.png',
    };

    return new L.Icon({
      iconUrl: icons[grievanceType],
      iconSize: [30, 30],
    });
  };

  return (
    <MapContainer center={[17.817386377711266, 78.19301983828775]} zoom={10}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {grievanceData.map((grievance, index) => (
        <Marker
          key={index}
          position={[grievance.location.latitude, grievance.location.longitude]}
          icon={grievanceIcon(grievance.grievanceType)}
        >
          {/* You can customize the marker popup content if needed */}
          <Popup>{grievance.complaintName}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GrievanceMap;
