import React from 'react'
import {useEffect, useRef, useState} from 'react'
import { useRecoilValue,useRecoilState } from 'recoil'
import NavbarF from '../components/NavbarF'
import Calendar from '../components/Calendar'
import {Button} from 'react-bootstrap'
import {endOfWeek, isSameMonth, isSameDay, startOfMonth, addDays,parseISO, parse, format, endOfMonth, subMonths, addMonths, startOfWeek } from 'date-fns'
import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase';
import {liftingState, workoutState, selectedDat, mealState} from '../atoms'
import { Dimensions } from "react-native";

function FitnessHis() {
    const {currentUser} = useAuth()
    const fit = useRecoilValue(liftingState)
    const wit=useRecoilValue(workoutState)
    const mit=useRecoilValue(mealState)
    const [selectedDate,setSelectedDate] = useRecoilState(selectedDat)
    const [open,setOpen] = useState(false)

    let calRef=useRef();
    let butRef=useRef();


    useEffect(()=> {
        function handleClickOutside(event){
            if (calRef.current && !calRef.current.contains(event.target) && !butRef.current.contains(event.target)){
                setOpen(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside);
        return() =>{
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

        
        

    function close(){
        setOpen(false)
    }

    

    function Show() {
        if (open){
            return(
                <div ref={calRef}>
                    <Calendar  className='cale' />
                </div>
            )
        } 
    }
    const ExerciseList = ({exercise}) => { 
        return(
        <div>
            {fit && fit.filter(exercise=>isSameDay(parseISO(exercise.startD), selectedDate) && exercise.user==currentUser.email).map((lift) => (
                <li className='ms-5 liste sucky' key={lift.id}>
                    <div className='lister'>
                    <div style={{fontSize:'20px'}}className='ms-3 text-light'>
                        {lift.title} :
                    </div>
                    <div style={{fontSize:'20px'}} className='ms-3 text-light'>
                    {lift.sets} x {lift.reps} @ {lift.weight} lbs
                    </div>

                    </div>

                </li>
            )
            )}
        </div>
        )
    }

    const WorkoutList = ({workout}) => { 
        return(
        <div>
            {wit && wit.filter(workout=>isSameDay(parseISO(workout.startD), selectedDate) && workout.user==currentUser.email).map((work) => (
                <li className='liste ms-5 sucky' key={work.id}>
                    <div className='lister'>
                    <div style={{fontSize:'20px'}} className='ms-3 text-light'>
                        {work.title} :  
                    </div>
                    <div style={{fontSize:'20px'}} className='ms-3 text-light'>
                        Minutes: {work.Time}. Calories: {work.calorie}  
                    </div>
                    </div>
                </li>
            )
            )}
        </div>
        )
    } 
    
    const CalorieList = ({cal}) => { 
        return(
        <div>
            {mit && mit.filter(cal=>isSameDay(parseISO(cal.startD), selectedDate) && cal.user==currentUser.email).map((c) => (
                <li className=' liste sucky' key={c.id}>
                    <div className='lister'>
                    <div style={{fontSize:'20px'}} className='text-light ms-3'>
                        {c.title} :  
                    </div>
                    <div style={{fontSize:'20px'}} className='text-light ms-3'>
                    {c.calorie} calories
                    </div>
                    </div>
                </li>
            )
            )}
        </div>
        )
    }

  return (
    <>
    <div className='cunt'>
    <h2 className='text-light text-center'>
        Excercise history
    </h2>
    <div style={{fontSize:'20px'}}className=' ms-7 text-light'>Todays Date: {format(selectedDate, 'yyyy-MM-dd')}</div>
    <NavbarF/>
    <div className='d-flex flex-column align-items-center justify-content-center'>   
    <Button ref={butRef} onClick={()=>setOpen(!open)}>Dates</Button>
    <Show />
    </div>
    <div className='d-flex'>
        <div>
        <div className='shh text-decoration-underline'> Weight History</div>
        <div className=''>
        <ExerciseList  exercise={fit}/>
        </div>
        <div className='shhh text-decoration-underline'>Cardio History</div>
            <div className=''>
            <WorkoutList workout={wit}/>
            </div>
        </div>
        <div className='ms-9'>
        <div className='shhhh text-decoration-underline'>Food History</div>
            <div className=''>
            <CalorieList cal={mit}/>
            </div>
        </div>

        </div>
    </div>
    </>


  )
}

export default FitnessHis