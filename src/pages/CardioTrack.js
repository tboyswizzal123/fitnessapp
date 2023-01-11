import React from 'react'
import NavbarF from '../components/NavbarF'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {useState, useRef, useEffect} from 'react'
import {v4 as uuidv4}from 'uuid';
import { helpMe, CalForDay, calorieState, workoutState, calorieL, selectedDat, idk, bmr, bmrD, bmrF, mealState, Time} from '../atoms';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  import Calendar from '../components/Calendar'
  import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase';
  import {endOfWeek, isSameMonth, isSameDay, startOfMonth, addDays,parseISO, parse, format, endOfMonth, subMonths, addMonths, startOfWeek, endOfDay } from 'date-fns'
  import { Dimensions } from "react-native";


function CardioTrack() {
    const {currentUser} = useAuth()
    const [workout, setWorkout] = useRecoilState(workoutState);
    const [cardio,setCardio]=useState('')
    const [calorie,setCalorie]=useState('')
    const [total, setTotal]=useRecoilState(calorieL)
    const [totalCal,setTotalCal] =useRecoilState(calorieState)
    const [selectedDate,setSelectedDate] = useRecoilState(selectedDat)
    const [calForDay, setCalForDay] = useRecoilState(CalForDay)
    const [Bmr, setBmr]=useRecoilState(bmr)
    const [BmrD, setBmrD] = useRecoilState(bmrD)
    const [Bmrf, setBmrf] = useRecoilState(bmrF)
    const [meals, setMeals] = useRecoilState(mealState);
    const [help, setHelp] = useRecoilState(helpMe);
    const [time, setTime] = useRecoilState(Time);
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



    const addWorkout= (e)=>{
        e.preventDefault();
        setWorkout([...workout, {id:uuidv4(), title:cardio, calorie: calorie, Time:time, startD: format(selectedDate, 'yyyy-MM-dd'), user:currentUser.email, completed:false}])
        //let ical = parseInt(calorie, 10);
        //setTotal(total+ical)
        //setTotalCal(totalCal-ical)
        setCardio('')
        setCalorie('')
        setTime('')
    }

    const deleteH=({id,calorie}) => {
        setCalorie(calorie)
        setWorkout(workout.filter((work)=> work.id !== id))
        ///let ical = parseInt(calorie, 10);
        //setTotal(total-ical)
        //setTotalCal(totalCal+ical)
        setCalorie('')

    }


    const CalList = ({workout}) => {
        const tater=meals && meals.filter(cal =>isSameDay(parseISO(cal.startD), selectedDate)  && cal.user==currentUser.email).reduce((total,current) => total=total+parseInt(current.calorie),0);
        const tot=workout && workout.filter(cal =>isSameDay(parseISO(cal.startD), selectedDate)  && cal.user==currentUser.email).reduce((total,current) => total=total+parseInt(current.calorie),0);
        const kek=(tater-tot)
        return(
            <div>
                {setTotalCal(tater)}
                {setTotal(tot)}
                {setHelp(kek)}
            </div>
        )
    }

    const WorkoutList = ({workout, calorie, setWorkout}) => { 
        return(
        <div>
            {workout && workout.filter(work=>isSameDay(parseISO(work.startD), selectedDate) && work.user==currentUser.email).map((work) => (
                <li className='liste' key={work.id}>
                    <p className='list'>
                        {work.title} : {work.calorie} Calories. {work.Time} minutes
                        <div className="delete">
                            <Button onClick={()=>deleteH(work)} variant='danger'>DELETE </Button>
                        </div>
                        
                    </p>

                </li>
            )
            )}
        </div>
        )
    }


  return (
    <div>
        <NavbarF/>
        <div className='cunt'>
        <p className='mt-5 ms-10 text-light'>Total Net Calories For Today: {help} </p>
        <div style={{fontSize:'20px'}}className=' ms-7 text-light'>Todays Date: {format(selectedDate, 'yyyy-MM-dd')}</div>
        <CalList workout={workout}/>
        <div className='text-center' >
            <h2 className='text-light'>Cardio History</h2>
            <div className='text-light'>Total Calories Burnt: {total}</div>
        </div>
        <div className=' d-flex flex-column align-items-center justify-content-center'>
        <Button ref={butRef} onClick={()=>setOpen(!open)}>Dates</Button>
        <Show />
        <Form id='contact'>
            <Form.Group className='d-flex mt-4' id='cardio'>
                <Form.Label className='text-light mx-2'>Cardio:</Form.Label>
                <Form.Control  maxLength={20} className='cal' type='text' value={cardio} onChange={(e)=> setCardio(e.target.value)} required />
            </Form.Group>
            <Form.Group className='d-flex mt-3' id='calorie'>
                <Form.Label className='text-light'>Calorie:</Form.Label>
                <Form.Control type='number' className='cal' value={calorie} onChange={(e)=> {if(e.target.value.length==6) return false; setCalorie(e.target.value)}} required />
            </Form.Group>
            <Form.Group className='d-flex mt-3' id='time'>
                <Form.Label className='text-light'>Time:</Form.Label>
                <Form.Control type='number' className='cal' placeholder='min' value={time} onChange={(e)=> {if(e.target.value.length==6) return false; setTime(e.target.value)}} required />
            </Form.Group>
            <Button disabled={!cardio || !calorie || !time} onClick={addWorkout} className='mt-3 addMeal'>
                Add Cardio
            </Button>
        </Form>
        <WorkoutList workout={workout} calorie={calorie} setWorkout={setWorkout}/>

        </div>
        </div>
    </div>
  )
}

export default CardioTrack