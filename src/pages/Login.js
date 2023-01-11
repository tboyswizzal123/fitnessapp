import React, {useRef, useState} from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Helmet from 'react-helmet';
import { AuthProvider, useAuth} from '../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom'
function Login() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const { login }= useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const nav=useNavigate();
    const testE='demo123@aol.com'
    const testP='asdasd'

    async function kek(e){
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(testE, testP)
            nav('/Main')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            nav('/Main')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: "100vh"}}>
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
                <h2 className='text-center mb-4'>Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required />
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100' type='submit'>
                    Log In
                </Button>
                </Form>
                <Form onSubmit={kek}>
                <Button className='w-100 mt-2' type='submit'>
                    Demo Login
                </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>Sign up</Link>
        </div>
        </div>
      </Container>
      </>
    )
}

export default Login