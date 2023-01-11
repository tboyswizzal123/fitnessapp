import React from 'react'
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import Broke from '../pages/Broke';
import Photos from '../pages/Photos';
import Contact from '../pages/Contact';
import CalorieCalc from '../pages/CalorieCalc';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import CalorieTrack from '../pages/CalorieTrack';
import PrivateRoute from './PrivateRoute'
import CardioTrack from '../pages/CardioTrack'
import WeightTrack from '../pages/WeightTrack';
import FitnessHis from '../pages/FitnessHis';
import { AuthProvider } from '../contexts/AuthContext';
import SideBar from './SideBar';

function Nav() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/Photos' element={<Photos/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path ='/main' element={<PrivateRoute><SideBar/></PrivateRoute>}></Route>
            <Route path ='/CalorieCalc' element={<PrivateRoute><CalorieCalc/></PrivateRoute>}></Route>
            <Route path ='/CalorieTrack' element={<PrivateRoute><CalorieTrack/></PrivateRoute>}></Route>
            <Route path ='/CardioTrack' element={<PrivateRoute><CardioTrack/></PrivateRoute>}></Route>
            <Route path ='/WeightTrack' element={<PrivateRoute><WeightTrack/></PrivateRoute>}></Route>
            <Route path ='/FitnessHis' element={<PrivateRoute><FitnessHis/></PrivateRoute>}></Route>
            <Route path ='/signup' element={<Signup/>}/>
            <Route path ='/login' element={<Login/>}/>
            <Route path ='/*' element={<Broke/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Nav