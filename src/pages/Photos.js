import React from 'react'
import arrow from '../components/pictures/arrow.jpg';
import erek from '../components/pictures/erek.jpg';
import ewic from '../components/pictures/ewic.jpg';
import titan from '../components/pictures/titan.jpg';
import beast from '../components/pictures/beast.jpg';
import NavbarF from '../components/NavbarF.js';

function Photos() {
  return (
    <div>
      <NavbarF/>
      <h1 className='text-center mb-4 text-light'>Before and After photos!</h1>
      <div className='befaf'>
      <img src={ewic} width="20%" className='mr-5'/>
      <img src={arrow}  width="20%"/>
      <img src={erek}  width="20%"/>
      </div>
      <div className='text-center'>
        <p className='text-light'> This is Eric Voniers 2 week transformation</p>
      </div>
      <div className='befaf'>
      <img src={titan} width="20%" className='mr-5'/>
      <img src={arrow}  width="20%"/>
      <img src={beast}  width="20%"/>
      </div>
      <div className='text-center'>
        <p className='text-light'> This is Eric Thespias Werner's 8 day transformation</p>
      </div>
    </div>
  )
}

export default Photos