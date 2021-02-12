import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SyncLoader from 'react-spinners/SyncLoader'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : ''

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPass) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1 className='mb-3'>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && (
        <div className='lazyLoader text-center m-4'>
          <SyncLoader color='#ff6138' size={10} />
        </div>
      )}
      <Form className='border-top pt-3' onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPass'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          REGISTER
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
            Signin Now
          </Link>{' '}
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
