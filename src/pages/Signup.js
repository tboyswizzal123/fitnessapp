import React, {useRef, useState} from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Helmet from 'react-helmet';
import { AuthProvider, useAuth} from '../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import {db} from '../firebase';
import {collection, doc, setDoc, addDoc, deleteDoc} from 'firebase/firestore';

function Signup() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const nameRef=useRef()
    const { signup }= useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const nav=useNavigate();




    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }


        try {
            setError('')
            setLoading(true)
            const collectionRef=collection(db, 'names');
            const payload = {name:nameRef.current.value, user:emailRef.current.value}
            let p1=await signup(emailRef.current.value, passwordRef.current.value);
            let p2=await  addDoc(collectionRef,payload).then(
                nav('/login')
            )
            let pf =p1+p2;
            return pf;
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }
  return (
      <Container className='d-flex align-items-center justify-content-center flex-column'  style={{ minHeight: "100vh"}}>
            <Link className='text-decoration-none'to='/'>
    <p>Swizz Fitness</p>
    </Link>
        <div className='w-100' style={{maxWidth: '40rem'}}>
        <Helmet>
            <style>
                {"body { background-image: url('./components/pictures/white.jpg');} "}
            </style>
        </Helmet>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <Form.Group id='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' maxLength={30} ref={nameRef} required />
                </Form.Group>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' maxLength={30} ref={emailRef} required />
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Form.Group id='password-confrim'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100' type='submit'>
                    Sign up
                </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login'>Log in</Link>
        </div>
        </div>
      </Container>
    )
}

export default Signup