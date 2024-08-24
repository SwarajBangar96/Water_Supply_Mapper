import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Foot from './components/Foot'
import AboutPage from './pages/AboutPage';
import Map from './pages/Map';
import Prototype from './pages/Prototype';
import Trends from './pages/Trends';
import Grievence from './pages/Grievence';
// import NewMap from './pages/NewMap'
// import NewMap1 from './pages/NewMap1'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NewMap from './pages/NewMap'
import NewMap1 from './pages/NewMap1'
import NewMap2 from './pages/NewMap2'
import GrievenceMap from './pages/GrievenceMap'
import Login from './pages/login/Login.jsx'


function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
        <Routes>
            <Route path='/' element={<AboutPage /> }></Route>
            <Route path='/maps' element={<Map /> }></Route>
            <Route path='/prototype' element={<Prototype /> }></Route>
            <Route path='/grievance' element={<Grievence /> }></Route>
            <Route path='/grievenceMap' element={<GrievenceMap /> }></Route>
            <Route path='/newMap' element={<NewMap/>}></Route>
            <Route path='/newMap1' element={ <NewMap1/> }></Route>
            <Route path='/newMap2' element={<NewMap2 /> }></Route>
            <Route path='/login'  element={<Login/>}></Route>
        </Routes>
    <Foot/>
    </BrowserRouter>
    </>
  )
}

export default App