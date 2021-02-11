import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SyncLoader from 'react-spinners/SyncLoader'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Message from '../components/Message'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : ''

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, pass))
  }

  return (
    <FormContainer>
      <h1 className='mb-3'>Sign In</h1>
      {loading ? (
        <div className='lazyLoader text-center m-4'>
          <SyncLoader color='#ff6138' size={10} />
        </div>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        ''
      )}
      <Form className='border-top pt-3' onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          SIGN IN
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register Now
          </Link>{' '}
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
