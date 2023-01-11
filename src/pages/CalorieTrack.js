import React from 'react'
import NavbarF from '../components/NavbarF'
import SideBar from '../components/SideBar'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {useState, useRef, useEffect} from 'react'
import {v4 as uuidv4}from 'uuid';
import { calorieState, mealState, calorieG, selectedDat, bmr, bmrD, bmrF, workoutState, helpMe } from '../atoms';
import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
import Calendar from '../components/Calendar'
import {endOfWeek, isSameMonth, isSameDay, startOfMonth, addDays,parseISO, parse, format, endOfMonth, subMonths, addMonths, startOfWeek } from 'date-fns'



function CalorieTrack() {
    const {currentUser} = useAuth()
    const [meals, setMeals] = useRecoilState(mealState);
    const [food,setFood]=useState('')
    const [calorie,setCalorie]=useState('')
    const [total, setTotal]=useRecoilState(calorieG)
    const [totalCal,setTotalCal] =useRecoilState(calorieState)
    const [selectedDate,setSelectedDate] = useRecoilState(selectedDat)
    const [Bmr, setBmr]=useRecoilState(bmr)
    const [BmrD, setBmrD] = useRecoilState(bmrD)
    const [Bmrf, setBmrf] = useRecoilState(bmrF)
    const [workout, setWorkout] = useRecoilState(workoutState);
    const [open,setOpen] = useState(false)
    const [help, setHelp] = useRecoilState(helpMe);


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



    const addMeal= (e)=>{
        e.preventDefault();
            setMeals([...meals, {id:uuidv4(), title:food, calorie: calorie, startD: format(selectedDate, 'yyyy-MM-dd'), user:currentUser.email, completed:false}])
            //let ical = parseInt(calorie, 10);
            //setBmrD(BmrD-ical)
            //setTotal(total+ical)
            //setTotalCal(totalCal+ical)
            setFood('')
            setCalorie('')

    }


    
    const deleteH=({id,calorie}) => {
        setCalorie(calorie)
        setMeals(meals.filter((meal)=> meal.id !== id))
        //let ical = parseInt(calorie, 10);
        //setBmrD(BmrD+ical)
        //setTotal(total-ical)
        //setTotalCal(totalCal-ical)
        setCalorie('')
    }



    const MealList = ({meals}) => { 
        return(
        <div>
            {meals && meals.filter(meal=>isSameDay(parseISO(meal.startD), selectedDate) && meal.user==currentUser.email).map((meal) => (
                <li className='liste me-3' key={meal.id}>
                    <p className='list'>
                        {meal.title} : {meal.calorie} Calories
                        <div className="delete">
                            <Button onClick={()=>deleteH(meal)} variant='danger'>DELETE </Button>
                        </div>
                        
                    </p>

                </li>
            )
            )}
        </div>
        )
    }

    const CalList = ({meals}) => {
        const tater=meals && meals.filter(cal =>isSameDay(parseISO(cal.startD), selectedDate) && cal.user==currentUser.email).reduce((total,current) => total=total+parseInt(current.calorie),0);
        const tot=workout && workout.filter(cal =>isSameDay(parseISO(cal.startD), selectedDate) && cal.user==currentUser.email).reduce((total,current) => total=total+parseInt(current.calorie),0);
        const kek=(tater-tot)
        return(
            <div>
                {setTotalCal(tater)}
                {setTotal(tater)}
                {setHelp(kek)}

                
            </div>
        )
    }


  return (
    <div>
        <NavbarF/>
        <CalList meals={meals}/>
        <div className='cunt'>
        <p className='mt-5 ms-10 text-light'>Total Net Calories For Today: {help}</p>
        <div style={{fontSize:'20px'}}className=' ms-7 text-light'>Todays Date: {format(selectedDate, 'yyyy-MM-dd')}</div>
        <div className='text-center' >
            <h2 className='text-light'>Calorie Tracker</h2>
            <div className='text-light'>Total Calories Consumed: {total}</div>
        </div>
        <div className='d-flex flex-column align-items-center justify-content-center'>
        <Button ref={butRef} onClick={()=>setOpen(!open)}>Dates</Button>
        <Show />
        <Form id='contact'>
            <Form.Group className='d-flex mt-4' id='food' >
                <Form.Label className='text-light mx-2'>Food:</Form.Label>
                <Form.Control  maxLength={20} className='cal' type='text' value={food} onChange={(e)=>setFood(e.target.value)} required />
            </Form.Group>
            <Form.Group className='d-flex mt-3' id='calorie' >
                <Form.Label className='text-light'>Calorie:</Form.Label>
                <Form.Control type='number' className='cal' value={calorie} onChange={(e)=>{if(e.target.value.length==6) return false; setCalorie(e.target.value)}} required />
            </Form.Group>
            <Button disabled={!food || !calorie} onClick={addMeal} className='mt-3 addMeal'>
                Add Meal
            </Button>
        </Form>
        <MealList meals={meals} calorie={calorie} setMeals={setMeals}/>
        </div>
        </div>
    </div>
  )
}

export default CalorieTrack