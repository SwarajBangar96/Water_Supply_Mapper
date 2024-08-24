// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Nav.css'; // Import your CSS file for styling
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap/dist/js/bootstrap.bundle.min';


// // // ... (your existing imports)

// // const Navbar = () => {
// //   const navigate = useNavigate();
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isMapsDropdownOpen, setIsMapsDropdownOpen] = useState(false);

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //     setIsMapsDropdownOpen(false); // Close maps dropdown when menu is toggled
// //   };

// //   const toggleMapsDropdown = () => {
// //     setIsMapsDropdownOpen(!isMapsDropdownOpen);
// //   };

// //   const navigateTo = (path) => {
// //     navigate(path);
// //     toggleMenu(); // Close the menu after navigating
// //   };

// //   return (

// //     <div className="navbar">
// //       <div className="navbar-brand" style={{color:"white"}}>
// //         <span > Drain Defenders </span>
// //       </div>

// //       <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
// //         <div className="bar"></div>
// //         <div className="bar"></div>
// //         <div className="bar"></div>
// //       </div>

// //       <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
// //         <div className="nav-item" onClick={() => navigateTo('/')}>
// //           Home
// //         </div>
        
// //         <div className="nav-item dropdown">
// //           <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
// //           Maps
// //           </a>
// //           <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
// //             <li><a class="dropdown-item" href="#">Using Co-ordinates</a></li>
// //             <li><a class="dropdown-item" href="#">Draw Maps</a></li>
// //             <li><a class="dropdown-item" href="#">Using GPS Locations</a></li>
// //           </ul>
// //         </div>
        
// //         <div className="nav-item" onClick={() => navigateTo('/trends')}>
// //           Trends
// //         </div>
// //         <div className="nav-item" onClick={() => navigateTo('/grievance')}>
// //           Grievance
// //         </div>
// //         <div className="nav-item" onClick={() => navigateTo('/prototype')}>
// //           Prototype
// //         </div>
// //         <div className="nav-item" onClick={() => navigateTo('/')}>
// //         <button type="button" class="btn btn-primary">Login</button>
// //         </div>
// //       </div>
      
// // <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>

// //     </div>
// //   );
// // };

// // export default Navbar;

import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Nav.css'; // Import your CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { set } from 'firebase/database';



const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [admin,setAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    console.log('isAdmin', isAdmin);

    if (isAdmin == 'true') {
      setAdmin(true);
      console.log('User is an admin');
    } else {
      console.log('User is not an admin');
      setAdmin(false);
    }
  }, [admin]);

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the menu after navigating
  };

  const logout = () => { 
    localStorage.removeItem('isAdmin');
    setAdmin(false);
    navigateTo('/');
    window.location.reload();
  }

  return (
    <div className="navbar">
      <div className="navbar-brand" style={{ color: 'white' }}>
        <span>Drain Defenders</span>
      </div>

      <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-item" onClick={() => navigateTo('/')}>
          Home
        </div>

        <div className="nav-item dropdown">
       
         <Link className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Maps
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><div class="dropdown-item" href="#" onClick={() => navigateTo('/NewMap')}>Using Co-ordinates</div></li>
            <li><div class="dropdown-item" href="#" onClick={() => navigateTo('/NewMap1')}>Draw Maps</div></li>
            <li><div class="dropdown-item" href="#" onClick={() => navigateTo('/NewMap2')}>Using GPS Locations</div></li>
          </ul>
        </div>

        {admin && <div className="nav-item" onClick={() => navigateTo('/grievenceMap')}>
          Grievence Map
        </div>}
         <div className="nav-item" onClick={() => navigateTo('/grievance')}>
          Grievance
        </div>
        <div className="nav-item" onClick={() => navigateTo('/prototype')}>
          Prototype
        </div>
        {localStorage.getItem('isAdmin')==null && <div className="nav-item" onClick={() => navigateTo('/login')}>
          <button type="button" className="btn btn-primary login-button" onClick={() => navigateTo('/login')}>
            Login
          </button>
        </div>}
        {localStorage.getItem('isAdmin')!=null && <div className="nav-item">
          <button type="button" className="btn btn-primary login-button" onClick={logout}>
            logout
          </button>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;