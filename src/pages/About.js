import React, {useState} from 'react'
import crus from '../components/pictures/crus.jpg';
import liftPF from '../components/pictures/liftPF.jpg';
import ewic from '../components/pictures/ewic.jpg';
import NavbarF from '../components/NavbarF.js';
import {Button} from 'react-bootstrap'
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import { Dimensions } from "react-native";

function About() {
  const [active,setActive]= useState(false)
  const [view,setView]=useState('View More')
  const win = Dimensions.get('window');

  const changeNow = ()=> {
    setActive(!active)
    if (!active){
      setView('View Less')
    }
    else {
      setView('View More')
    }
  }
  return (
    <>
    <NavbarF/>
    <div className='d-flex flex-column align-items-center'>
    <h1 className='fst-italic text-light'>Meet the team!</h1>
    <p className='text-decoration-underline text-light'>Developers</p>
    <div  className='reck'>
      <img src={liftPF}  width="30%" className="stig" />
      <div className='ms-5 mt-5'>
      <p className=''>Tomas Gonzalez</p>
      <div className='profileCard' style={{fontSize:'20px'}}>Aspiring web developer</div>
      <div style={{fontSize:'20px'}}>Holmdel NJ </div>
      <Button onClick = {changeNow} variant='secondary' className='mt-5'> {view} </Button>
      </div>
      <div className='ms-8'>
        <p className='skillz text-primary text-decoration-underline fst-italic'>Skills </p>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>React</div>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Java</div>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Python</div>
      </div>
    </div>
    
    {active===true && <Fade top>
      <div className='reck'>
      <div className='ms-5 mt-5'>
      <a href='https://tomas-gonzalez.vercel.app/' target="_blank">
      <Button  style={{width:'150px'}}>Portfolio</Button>
      </a>
      <div style={{fontSize:'20px'}}>Self learnt react.</div>
      <div style={{fontSize:'20px'}}>Understands JSX, CSS, and JavaScript. </div>
      <div style={{fontSize:'20px'}}>Familiar with different react libraries. </div>
      </div>
      <div className='ms-8'>
        <p className='skillz text-primary text-decoration-underline fst-italic'>Other interests: </p>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Working out</div>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Going out with friends</div>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Video games</div>
      </div>
        </div> 
        </Fade>}
      
    
    </div>

    <div className='d-flex flex-column align-items-center'>
    <p className='text-decoration-underline text-light'>Extra Fill space</p>
    <div className='reck'>
      <img src={ewic}  width="30%" className="stig" />
      <div className='ms-5 mt-5'>
      <p>Derek Vonier</p>
      <div style={{fontSize:'20px'}}>Thespian</div>
      <div style={{fontSize:'20px'}}>The Bongo</div>
      <Button variant='secondary' className='mt-4'> No More </Button>
      </div>
      <div className='ms-8'>
        <p className='skillz text-primary text-decoration-underline fst-italic'>Skills </p>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Thespian</div>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Watching</div>
      </div>
    </div>
    <div className='reck mt-5'>
      <img src={crus}  width="30%" className="stig" />
      <div className='ms-5 mt-5'>
      <p>Crusty Cruz</p>
      <div style={{fontSize:'20px'}}>Stud</div>
      <div style={{fontSize:'20px'}}>Holmdel NJ </div>
      <Button variant='secondary' className='mt-2'> No More </Button>
      </div>
      <div className='ms-8'>
        <p className='skillz text-primary text-decoration-underline fst-italic'>Skills </p>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Going through your fridge</div>
        <div style={{fontSize:'20px'}} className='skillz text-primary'>Running</div>
      </div>
    </div>
    </div>
    </>
  )
}

export default About