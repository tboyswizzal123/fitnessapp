import calc from '../components/pictures/calc.png';
import calt from '../components/pictures/calt.jpg';
import log from '../components/pictures/log.jpg';
import cardio from '../components/pictures/cardio.jpg'
import crosspic from '../components/pictures/crosspic.jpg';
import run from '../components/pictures/run.jpg';
import weights from '../components/pictures/weights.jpg';
import goat from '../components/pictures/goat.jpg';
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import NavbarF from '../components/NavbarF.js';
import {useAuth} from '../contexts/AuthContext'
import { Dimensions } from "react-native";
import {Link, useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'


function HomePage() {
  const nav=useNavigate();
  const { currentUser } = useAuth()
  const win = Dimensions.get('window');
  return (
    
    <div>
      <NavbarF/>
      <div
      style={{backgroundImage: `url(${goat})`,opacity:.8,}}className="goat mt-5 rounded mx-auto d-block  ">
      <h1 className='textz text-light mx-5 sand'>Swizz Fitness Tracker</h1>
      <p className='textz text-light w-50 mx-5'> A simple app to log your meals and workouts.</p>
      <Link to='/login'>
      <Button className='squack'>Demo Login </Button>
      </Link>
      </div>
      <h1 className="h2 text-center mx-auto mt-5 text-light">Track and save all of your gym progress</h1>
      <div className="w-75 text-center mx-auto text-light"style={{fontSize:"20px"}}>By using react recoil and bootstrap, I was able to create an easy to use fitness tracker app. You can track your meals, calories, weightlifting, and cardio easily, as well as being able to set goals to help you on your fitness journy. Whether it's gaining weight, losing weight, or competing. </div>
      <div className="recky">
      <div className='text-center flex-1' >
        <p className='mt-5 text-light '>Calendar</p>
        <div className=' mt-5 text-light' style={{fontSize:"20px"}}>With the date-nfs library, I was able to create a functioning calendar that allows you to easily track everything you need to for any given date.</div>
      </div>
      <div className='text-center flex-1'>
        <p className=' mt-5 text-light '>Fire Base Backend</p>
        <div className='mt-5 text-light' style={{fontSize:"20px"}}>Using firebase as a backend, you can easily make an account, sign in, and track anything you need to, as well as sending a message through the contact form that delivers a message to firebase.</div>
      </div>
      <div className='text-center flex-1'>
        <p className='mt-5 text-light'>React Recoil</p>
        <div className='mt-5 text-light' style={{fontSize:"20px"}}>React recoil allows the sharing of components between different states in an effectice way that helps manages all of the logging and tracking.</div>
      </div>
      </div>
      <div className='reckyT'>
        <img className='fix' src={crosspic} width='30%'/>
        <div className=' w-50 text-light mt-5 ms-5'>
          <p className='text-light'>Get started On Your Fitness Jounery</p>
          <div style={{fontSize:"20px"}}>
            The goal is to reduce the time it takes to track your goals while increasing simplicity and satisfaction with the user interface. Making it easy to understand and use.
          </div>
        </div>
      </div>
      <div className='d-flex align-items-center' >
      <h1 className="h2 mb-5 ms-5 text-light">Heart rate, stress, and VO2 maxs support coming soon!</h1>
      <img src={run} className='mx-auto'  width='10%'/>
      </div>
    </div>


  )
}

export default HomePage