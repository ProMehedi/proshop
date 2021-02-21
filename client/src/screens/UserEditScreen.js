import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SyncLoader from 'react-spinners/SyncLoader'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, userId, user])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link className='btn btn-dark mb-3' to='/admin/users'>
        <i className='fa fa-double-angle-left'></i> Go Back
      </Link>
      <FormContainer>
        <h1 className='mb-3'>Edit User</h1>
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
          <Form.Group controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin?'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button type='submit' variant='primary'>
            UPDATE
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default UserEditScreen
