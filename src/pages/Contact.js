import NavbarF from '../components/NavbarF.js';
import React, {useRef, useState} from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import {db} from '../firebase';
import {collection, doc, setDoc, addDoc} from 'firebase/firestore';
import { setPlaceHolder } from '@syncfusion/ej2-react-dropdowns/index.js';

function Contact() {
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[message,setMessage]=useState('')
  const[success, setSuccess]=useState('')
  const colRef=collection(db,'contactForm')
  const addForm=document.querySelector('.contact')

  const handleNew = async () => {
    const collectionRef=collection(db, 'contactForm');
    const payload = {name: name,email: email,message: message}
    await addDoc(collectionRef,payload).then(
      setName(''),
      setEmail(''),
      setMessage(''),
      setSuccess('successfuly sent message')
    )
  }



  return (
    <div>
      <NavbarF/>
       <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh"}}>
        <div className='w-100' style={{maxWidth: '40rem'}}>
       <Card>
            <Card.Body>
            {success&& <Alert variant='success'>{success}</Alert>}
            <h1 className='text-center mb-4'>Contact Page</h1>
                <Form id='contact'>
                <Form.Group id='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} onChange={(e)=> setName(e.target.value)} required />
                </Form.Group>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e)=> setEmail(e.target.value)}required />
                </Form.Group>
                <Form.Group  id='message'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" type='text' value={message} onChange={(e)=> setMessage(e.target.value)} className='submissionfield'  required />
                </Form.Group>

                <Button className='w-100' onClick={handleNew}>
                    Submit
                </Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
        </Container>
    </div>
  )
  }


export default Contact