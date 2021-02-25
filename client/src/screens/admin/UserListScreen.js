import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import SyncLoader from 'react-spinners/SyncLoader'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, removeUser } from '../../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userRemove = useSelector((state) => state.userRemove)
  const { success: successRemove } = userRemove

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, history, successRemove])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeUser(id))
    }
  }

  return (
    <>
      <h2 className='mb-3'>All Users</h2>
      {loading ? (
        <div className='lazyLoader text-center m-4'>
          <SyncLoader color='#ff6138' size={10} />
        </div>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover response className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className='text-center'>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className='text-center'>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='dark' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm ml-2'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
