import {Navbar, Container, Nav, DropdownButton, Dropdown, ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import arm from './pictures/arm.jpg';
import gorilla from './pictures/gorilla.jpg';
import styles from '../styles.css';
import React, { Component } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { Dimensions } from "react-native";


function NavbarF() {
  const win = Dimensions.get('window');
  var user = firebase.auth().currentUser
  const currentUser = useAuth();
  const [error, setError] = useState("")
  const {logout} = useAuth()
  const nav=useNavigate()

  async function handleLogout(){
    setError('')

    try{
      await logout()
      nav('/login')
    } catch{
      setError('failed to log out')
    }
  }

  function Logged(){
    if (user){
      return(
        <Nav className="ml-auto">
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      )}
      return(
        <Nav className="ml-auto">
        <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      )
  }

  return (
    <>
  <Navbar  className='fixed-top' bg="dark" variant="dark">
  <>

  <DropdownButton id="dropdown-button-dark" bg='dark' variant='dark' title={
        <img
        alt=""
        src={gorilla}
        width="50"
        height="40"
        className="d-inline-block align-top"
    />
  }>       
        <Dropdown.Item eventKey="1" href='/'>Home Page</Dropdown.Item>
        <Dropdown.Item eventKey="2"href='/Main'>Main App</Dropdown.Item>
        <Dropdown.Item eventKey="3" href='/CalorieCalc'>Calorie Calculator</Dropdown.Item>
      </DropdownButton>

</>
    <Container>
    <Nav className=''>
    <Nav.Link  className='navbarpic' href="/"><img
          alt=""
          src={arm}
          width="30"
          height="30"
          className="d-inline-block align-top"
      />{' '}
    </Nav.Link>
    <Navbar.Brand className='navbarbrand' href="/">Swizz Fitness</Navbar.Brand>
      <li>
      <Nav.Link href="/">Home</Nav.Link>
      </li>
      <li>
      <Nav.Link href="/about">Credits</Nav.Link>
      </li>
      <li>
      <Nav.Link href="/contact">Contact</Nav.Link>
      </li>
    </Nav>
    <Logged/>
    </Container>
  </Navbar>
</>
  )
}

export default NavbarF