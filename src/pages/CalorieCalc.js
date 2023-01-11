import React, {useRef, useState} from 'react'
import {form,Button, Card, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import {Navbar, Container, Nav, DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap';
import NavbarF from '../components/NavbarF.js';
import {useRecoilState} from 'recoil'
import {bmr, bmrD, bmrF} from '../atoms.js'
import {Link, useNavigate} from 'react-router-dom'
import {db} from '../firebase';
import {collection, doc, setDoc, addDoc, deleteDoc} from 'firebase/firestore';
import {useAuth} from '../contexts/AuthContext'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import Fade from 'react-reveal/Fade';

function CalorieCalc() {
    let final=0;
    let finalF=0;
    const {currentUser} = useAuth()
    const [mwl,setMwl] = useState(0);
    const [wl,setwl] = useState(0);
    const [mawg,setMawg] = useState(0);
    const [mawl,setMawl] = useState(0);
    const [mwg,setMwg] = useState(0);
    const [wg,setWg] = useState(0);
    const [activity, setActivity] = useState('Base Metabolic Rate')
    const [activityCheck , setIsActivityChecked] = useState(true);
    const [activityCheckT , setIsActivityCheckedT] = useState(false);
    const [activityCheckTh , setIsActivityCheckedTh] = useState(false);
    const [activityCheckF , setIsActivityCheckedF] = useState(false);
    const [activityCheckFi , setIsActivityCheckedFi] = useState(false);
    const [isChecked , setIsChecked] = useState(false);
    const [FisChecked , fSetIsChecked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [HinputValue, HsetInputValue] = useState('');
    const [HHinputValue, HHsetInputValue] = useState('');
    const [WinputValue, WsetInputValue] = useState('');
    const [bMR,setBMR]=useRecoilState(bmr);
    const [bmR,setBmR]=useRecoilState(bmrD);
    const [bmrf,setBMRF]=useRecoilState(bmrF);
    const [temp,setTemp] = useState(0);
    const [modal, setModal] = useState(false);
    const [mlCheck, setmlCheck]=useState(false);
    const [lCheck, setlCheck]=useState(false);
    const [malCheck, setmalCheck]=useState(false);
    const [mgCheck, setmgCheck]=useState(false);
    const [gCheck, setgCheck]=useState(false);
    const [magCheck, setmagCheck]=useState(false);
    const colRef=db.collection('metabolicRates').doc('user')
    const addForm=document.querySelector('.contact')
    const [active,setActive] = useState("");

    function handleWchecks(){
        setmlCheck(true);
        setTemp(mwl)
        setlCheck(false);
        setmalCheck(false);
        setmgCheck(false);
        setgCheck(false);
        setmagCheck(false);
    }

    function handleWchecksT(){
        setmlCheck(false);
        setlCheck(true);
        setTemp(wl)
        setmalCheck(false);
        setmgCheck(false);
        setgCheck(false);
        setmagCheck(false);
    }
    function handleWchecksTh(){
        setmlCheck(false);
        setlCheck(false);
        setmalCheck(true);
        setTemp(mawl)
        setmgCheck(false);
        setgCheck(false);
        setmagCheck(false);
    }
    function handleWchecksF(){
        setmlCheck(false);
        setlCheck(false);
        setmalCheck(false);
        setmgCheck(true);
        setTemp(mwg)
        setgCheck(false);
        setmagCheck(false);
    }
    function handleWchecksFi(){
        setmlCheck(false);
        setlCheck(false);
        setmalCheck(false);
        setmgCheck(false);
        setgCheck(true);
        setTemp(wg)
        setmagCheck(false);
    }
    function handleWchecksS(){
        setmlCheck(false);
        setlCheck(false);
        setmalCheck(false);
        setmgCheck(false);
        setgCheck(false);
        setmagCheck(true);
        setTemp(mawg)
    }

    function HandleChecks(){
        setActivity('Base Metabolic Rate')
        setIsActivityChecked(true);
        setIsActivityCheckedT(false);
        setIsActivityCheckedTh(false);
        setIsActivityCheckedF(false);
        setIsActivityCheckedFi(false);

    }

    function HandleChecksT(){
        setActivity('Lightly Active')
        setIsActivityChecked(false);
        setIsActivityCheckedT(true);
        setIsActivityCheckedTh(false);
        setIsActivityCheckedF(false);
        setIsActivityCheckedFi(false); 
    }

    function HandleChecksTh(){
        setActivity('Moderatly Active')
        setIsActivityChecked(false);
        setIsActivityCheckedT(false);
        setIsActivityCheckedTh(true);
        setIsActivityCheckedF(false);
        setIsActivityCheckedFi(false);
    }

    function HandleChecksF(){
        setActivity('Active')
        setIsActivityChecked(false);
        setIsActivityCheckedT(false);
        setIsActivityCheckedTh(false);
        setIsActivityCheckedF(true);
        setIsActivityCheckedFi(false);
    }

    function HandleChecksFi(){
        setActivity('Very Active')
        setIsActivityChecked(false);
        setIsActivityCheckedT(false);
        setIsActivityCheckedTh(false);
        setIsActivityCheckedF(false);
        setIsActivityCheckedFi(true);
    }

    const ageRef=useRef()
    const feetRef=useRef()
    const inchesRef=useRef()
    const weightRef=useRef()

    function HandleCheck(){
        setIsChecked(true);
        fSetIsChecked(false);
    }

    function FHandleCheck(){
        fSetIsChecked(true);
        setIsChecked(false);
    }

    function HandleUserInput(e){
        setInputValue(e.target.value);
    }

    function HHandleUserInput(e){
        HsetInputValue(e.target.value);
    }

    function HHHandleUserInput(e){
        HHsetInputValue(e.target.value);
    }

    function WHandleUserInput(e){
        WsetInputValue(e.target.value);
    }

    function Clear(){
        setInputValue('');
        HsetInputValue('');
        HHsetInputValue('');
        WsetInputValue('');
    }

    const Save= async ()=>{
        const collectionRef=collection(db, 'metabolicRates');
        const del=db.collection('metabolicRates').where('user', '==', currentUser.email);
        const payload = {mrm:temp, bmr:bMR, user:currentUser.email}
        let p1=await del.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.delete();
            })
        })
        let p2=await  addDoc(collectionRef,payload).then(
            setBMRF(temp)
        )

        let pf = p1 + p2;
        return pf;

    }


    function Calculate(){
        const fm=HinputValue*30.48;
        const im=HHinputValue*2.54;
        const cm=fm+im;
        const m=WinputValue/2.2;
        if (FisChecked){
            final=(655.1+(9.563*m)+(1.850*cm)-(4.676*inputValue));
        };

        if (isChecked){
            final=(66.47+(13.75*m)+(5.003*cm)-(6.755*inputValue));
        }
        
        if (activityCheck){
            finalF=Math.round(final*1.2);
        }

        if (activityCheckT){
            finalF=Math.round(final*1.375);
        }

        if (activityCheckTh){
            finalF=Math.round(final*1.55);
        }

        if (activityCheckF){
            finalF=Math.round(final*1.725);
        }

        if (activityCheckFi){
            finalF=Math.round(final*1.9);
        }

        setBMR(finalF);
        setBmR(finalF);

        const weekCal=(finalF*7)
        setMwl((weekCal-1750)/7)
        setwl((weekCal-3500)/7)
        setMawl((weekCal-7000)/7)
        setMwg((weekCal+1750)/7)
        setWg((weekCal+3500)/7)
        setMawg((weekCal+7000)/7)
        setBMRF(finalF);
        setTemp(finalF);
        setActive('cals')
        
    }
  return (
    <>
    <NavbarF/>
    <div className='calc'>
        <div className='sh'> Calorie Calculator</div>
        <div className='ph'>The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day. This calculator can also provide some simple guidelines for gaining or losing weight.</div>
        <Card className='coole'>
            <Card.Body>
                <Form>
                    <Form.Group className='d-flex' id='age'>
                        <Form.Label className='text-light'><ph>Age: </ph></Form.Label>
                        <Form.Control type='number' value={inputValue} onChange={HandleUserInput} className='smalleri mx-4'  ref={ageRef} required/>
                    </Form.Group>
                    <Form.Group className='d-flex' id='height'>
                        <Form.Label className='text-light'><ph>Height: </ph></Form.Label>
                        <Form.Control type='number' value={HinputValue} onChange={HHandleUserInput} className='smalleri mx-2'  placeHolder='Feet' ref={feetRef} required/>
                        <Form.Control type='number' value={HHinputValue} onChange={HHHandleUserInput} className='smalleri'  placeHolder='inches' ref={inchesRef} required/>
                    </Form.Group>
                    <Form.Group className='d-flex' id='weight'>
                        <Form.Label className='text-light'><ph>Weight: </ph></Form.Label>
                        <Form.Control type='number' value={WinputValue} onChange={WHandleUserInput} className='smallie mx-1'  placeHolder='pounds' ref={weightRef} required/>
                    </Form.Group>
                    <Dropdown className='d-flex'>
                        <ph className='text-light'>Activity: </ph>
                        <Dropdown.Toggle className='kek' variant='secondary' id='dropdown-button-dark-example1'>
                            {activity}
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant='dark'>
                            <Dropdown.Item onClick={HandleChecks}>Base (little or no exercise)</Dropdown.Item>
                            <Dropdown.Item onClick={HandleChecksT}>Lightly Active (exercise 1-3 days/week)</Dropdown.Item>
                            <Dropdown.Item onClick={HandleChecksTh}>Moderately Active (exercise 3-5 days/week)</Dropdown.Item>
                            <Dropdown.Item onClick={HandleChecksF}>Active (exercise 6-7 days/week)</Dropdown.Item>
                            <Dropdown.Item onClick={HandleChecksFi}>Very Active (Hard exercise 6-7 days/week)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ph className='text-light'>Gender: </ph>
                    <ph className='text-light mx-2'>Male:</ph>
                    <input type='checkbox' id='male' checked={isChecked} onChange={HandleCheck}/>
                    <ph className='text-light mx-2'>Female:</ph>
                    <input type='checkbox' checked={FisChecked} onChange={FHandleCheck} id='female'/>
                </Form>
                <Button disabled={!inputValue || !HinputValue || !HHinputValue || !WinputValue || (!isChecked && !FisChecked)} variant="success" onClick={Calculate} lassName='but'>Calculate Now!</Button>
                <Button variant="secondary" onClick={Clear}>Clear</Button>
            </Card.Body>
        </Card>
       {active!=='cals'&& <Card className='cool'>
            <Card.Body>
            <div className='ph'>Mild Weight Loss: .5 lbs per week.</div>
            <div className='ph'>Weight Loss: 1lb per week.</div>
            <div className='ph'>Major Weight Loss: 2lbs per week.</div>
            <div className='ph'>Mild Weight Gain: .5 lbs per week.</div>
            <div className='ph'>Weight Gain: 1lb per week.</div>
            <div className='ph'>Major Weight Gain: 2lbs per week.</div>
            </Card.Body>
        </Card>}
        <Fade up>
        {active==="cals" && <Card className='cooler'>
        <div className='x'>Resting Metabolic Rate (maintenance): {bMR}</div>
        <p>Choose a weight change option: {bmrf}</p>
        <Card.Body>
                <div className='left'>
                <div className='d-flex'>
                <input type='checkbox' checked={mlCheck} onChange={handleWchecks} className='mt-5'/>
                <p className='mt-5 text-secondary'>Mild Weight loss:{mwl}</p>
                </div>
                <div className='d-flex'>
                <input type='checkbox' checked={lCheck} onChange={handleWchecksT} className='mt-5'/>
                <p className='mt-5 text-primary'>Weight Loss:{wl}</p>
                </div>
                <div className='d-flex'>
                <input type='checkbox' checked={malCheck} onChange={handleWchecksTh} className='mt-5'/>
                <p className='mt-5 text-danger'>Major WeightLoss:{mawl}</p>
                </div>
                <Button onClick={Save}>Save goal calories here.</Button>
                </div>
                <Link to='/Main'>
                <Button className='mt-3'>To Main App</Button>
                </Link> 
                <div className='right'>
                <div className='d-flex'>
                <input type='checkbox' checked={mgCheck} onChange={handleWchecksF} className='mt-5'/>
                <p className='mt-5 text-secondary'>Mild Weight Gain:{mwg}</p>
                </div>
                <div className='d-flex'>
                <input type='checkbox' checked={gCheck} onChange={handleWchecksFi} className='mt-5'/>
                <p className='mt-5 text-primary'>Weight Gain:{wg}</p>
                </div>
                <div className='d-flex'>
                <input type='checkbox' checked={magCheck} onChange={handleWchecksS}  className='mt-5'/>
                <p className='mt-5 text-danger'>Major WeightGain:{mawg}</p>
                </div>
                </div>
            </Card.Body>
        </Card>}
        </Fade>
    </div>
    </>


  )
}

export default CalorieCalc