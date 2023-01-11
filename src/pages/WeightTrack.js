import React, { useEffect, useRef} from 'react'
import app from '../firebase'
import NavbarF from '../components/NavbarF'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {Navbar, Nav, DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap';
import {useState} from 'react'
import {v4 as uuidv4}from 'uuid';
import { calorieState, liftingState, selectedDat } from '../atoms';
import Calendar from '../components/Calendar'
import onClickOutside from "react-onclickoutside";
import {useAuth} from '../contexts/AuthContext'
import {db} from '../firebase';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  
  import {endOfWeek, isSameMonth, isSameDay, startOfMonth, addDays,parseISO, parse, format, endOfMonth, subMonths, addMonths, startOfWeek } from 'date-fns'
  import { Dimensions } from "react-native";

function WeightTrack(props) {
    const {currentUser} = useAuth()
    const [exercises, setExercises] = useRecoilState(liftingState);
    const [exercise,setExercise]=useState('')
    const [reps,setReps]=useState('')
    const [sets, setSets]=useState('')
    const [weight, setWeight]=useState('')
    const[date, setDate]=useState(new Date());
    const [showTime, setShowTime] = useState(false) 
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


    const addExercise= (e)=>{
        e.preventDefault();
       setExercises([...exercises, {id:uuidv4(), title:exercise, reps: reps, sets: sets, weight: weight, startD: format(selectedDate, 'yyyy-MM-dd'), user:currentUser.email, completed:false}])
        setExercise('')
        setReps('')
        setSets('')
        setWeight('')
    }

    const deleteH=({id}) => {
        setExercises(exercises.filter((lift)=> lift.id !== id))

    }


    const ExerciseList = ({exercise}) => { 
        return(
        <div>
            {exercises && exercises.filter(exercise => isSameDay(parseISO(exercise.startD),selectedDate) && exercise.user==currentUser.email).reverse().map((lift) => (
                <li className='liste' key={lift.id}>
                    <p className='list'>
                        {lift.title} : {lift.sets} x {lift.reps} @ {lift.weight} lbs
                        <div className="delete">
                            <Button onClick={()=>deleteH(lift)} variant='danger'>DELETE </Button>
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
        <p className='mt-5  text-light'>Workouts</p>
        <div style={{fontSize:'20px'}}className=' ms-7 text-light'>Todays Date: {format(selectedDate, 'yyyy-MM-dd')}</div>
        <div className='text-center' >
            <h2 className='text-light'>Exercise History</h2>
            <div className='text-light'>your lifts</div>
        </div>
        <div className='d-flex flex-column align-items-center justify-content-center'>
        <Button ref={butRef} onClick={()=>setOpen(!open)}>Dates</Button>
        <Show />
        <Form id='contact' className='formy'>
            <Form.Group className='d-flex mt-4' id='workout'>
                <Form.Label className='text-light mx-2'>Lift Name:</Form.Label>
                <Form.Control maxLength={20} className='cal' type='text' value={exercise} onChange={(e)=> setExercise(e.target.value)} required />
                {/*{<Dropdown className='d-flex'>
                        <Dropdown.Toggle variant='secondary' id='dropdown-button-dark-example1'>
                            Exercises
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant='dark'>
                            <Dropdown.Item onClick={()=>{setExercise('Bench Press')}}>Bench Press</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setExercise('Squat')}}>Squat</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setExercise('Deadlift')}}>Deadlift</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setExercise('Pull ups')}}>Pull ups</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setExercise('Dips')}}>Dips</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}*/}
            </Form.Group>
            <Form.Group className='d-flex mt-3' id='sets'>
                <Form.Label className='text-light'>Sets:</Form.Label>
                <Form.Control type='number' className='cal' value={sets} onChange={(e)=> {if(e.target.value.length==4) return false; setSets(e.target.value)}} required />
            </Form.Group>
            <Form.Group className='d-flex mt-3' id='reps'>
                <Form.Label className='text-light'>Reps:</Form.Label>
                <Form.Control type='number' className='cal' value={reps} onChange={(e)=> {if(e.target.value.length==4) return false; setReps(e.target.value)}} required />
            </Form.Group>
            <Form.Group className='d-flex mt-3' id='weight'>
                <Form.Label className='text-light'>Weight:</Form.Label>
                <Form.Control type='number' className='cal' value={weight} onChange={(e)=> {if(e.target.value.length==5) return false; setWeight(e.target.value)}} required />
            </Form.Group>
            <Button disabled={!sets || !reps || !weight || !exercise} onClick={addExercise} className='mt-3 addMeal'>
                Add Exercise
            </Button>
        </Form>
        <ExerciseList exercise={exercise}/>
        </div>
        </div>
    </div>
  )
}

export default WeightTrack