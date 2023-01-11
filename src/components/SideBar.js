import React, {useState, useEffect} from 'react'
import CalorieTrack from '../pages/CalorieTrack.js';
import CardioTrack from '../pages/CardioTrack.js';
import WeightTrack from '../pages/WeightTrack.js';
import FitnessHis from '../pages/FitnessHis.js';
import {Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {bmr, bmrD, bmrF} from '../atoms.js'
import {useRecoilState} from 'recoil'
import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase';
import {collection, doc, setDoc, addDoc} from 'firebase/firestore';
import { Dimensions } from "react-native";


function SideBar() {
    const win = Dimensions.get('window');
    const {currentUser} = useAuth()
    const [active,setActive] = useState("firstCard");
    const [bMR,setBMR]=useRecoilState(bmr);
    const [bmrf,setBMRF]=useRecoilState(bmrF);
    const [rates, setRates] = useState([])
    const [rapes, setRapes] = useState([])

    function Rats({ mrm, bmr}){
        return(
            <div className='text-light'>{mrm} {bmr}</div>
        )
    }

    function Raps({ name }){
        return(
            <div className='text-light ms-1'>{name}</div>
        )
    }

    useEffect(()=> {
        db.collection('metabolicRates').onSnapshot(snapshot => (
            setRates(snapshot.docs.filter((doc)=> doc.data().user === currentUser.email).map(doc => doc.data()))
        ))
    }, [])

    useEffect(()=> {
        db.collection('names').onSnapshot(snapshot => (
            setRapes(snapshot.docs.filter((doc)=> doc.data().user === currentUser.email).map(doc => doc.data()))
        ))
    }, [])



  return (
    <>
    <div className='d-flex'>
    <div className='side'>
        <p className='mt-3 ms-5 text-light'>Swizz Fitness</p>
        <button onClick={() => setActive('firstCard')}style={{fontSize:'20px'}}className='mt-2 sideR text-light'>Calorie Tracker</button>
        <button onClick={() => setActive('secondCard')}style={{fontSize:'20px'}}className=' sideR text-light'>Cardio Tracker</button>
        <button onClick={() => setActive('thirdCard')}style={{fontSize:'20px'}}className=' sideR text-light'>Weight Tracker</button>
        <button onClick={() => setActive('fourthCard')}style={{fontSize:'20px'}}className=' sideR text-light'>Fitness History</button>
        <div className='tucky'>
            <div style={{fontSize:'20px'}} className='ms-2 text-light position-relative'>Email: {currentUser.email}</div>
            <div style={{fontSize:'20px'}} className='d-flex ms-2 mt-3 text-light position-relative'>Name: {rapes.map(({name,user}) => (
                    <Raps 
                    name={name}/>
                ))}</div>
            <div style={{fontSize:'20px'}} className='ms-2 mt-3 text-light position-relative'>Resting Metabolic Rate:                 {rates.map(({user,mrm,bmr}) => (
                    <Rats 
                    mrm={bmr}/>
                ))}</div>
            <div style={{fontSize:'20px'}} className='ms-2 mt-3 text-light position-relative'>Goal Caleries Per Day: {rates.map(({user,mrm,bmr}) => (
                    <Rats 
                    bmr={mrm}/>
                ))}</div>
            <div>

            </div>
            <Link to='/CalorieCalc'>
            <Button className='ms-2 mt-5 position-relative'> Update RMR and Goal Cals </Button>
            </Link>
        </div>
        
    </div>
    <div>
        {active==="firstCard" && <CalorieTrack/>}
        {active==="secondCard" && <CardioTrack/>}
        {active==="thirdCard" && <WeightTrack/>}
        {active==="fourthCard" && <FitnessHis/>}
    </div>
    </div>
    </>
  )
}

export default SideBar