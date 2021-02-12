import React, { useEffect, useState } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, user, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPass) {
      setMessage('Password do not match')
    } else {
      console.log('Profile Updated!')
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2 className='mb-3'>User Profile</h2>
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
            UPDATE PROFILE
          </Button>
        </Form>
      </Col>
      <Col md={3}>
        <h2 className='mb-3'>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
