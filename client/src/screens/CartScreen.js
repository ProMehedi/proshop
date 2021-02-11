import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removefromCarthandler = (id) => {
    console.log('HELLO')
  }

  const checkoutHandler = () => {
    history.push('/login/?redirect=shipping')
  }

  return (
    <>
      <Row className='border-bottom mb-3'>
        <Col>
          <h1 className='mb-3'>Shoppping Cart</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant='danger'>
              Your cart is empty. <Link to='/'>Back to home</Link>{' '}
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className='align-items-center'>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} rounded />
                    </Col>
                    <Col md={6}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4} className='border-left'>
                      <div className='d-flex align-items-center'>
                        <strong>${item.price}</strong>
                        <div className='qtyGroup px-2'>
                          <input
                            className='quantity form-control'
                            type='number'
                            min='1'
                            max={item.countInStock}
                            value={item.qty}
                            onChange={(e) => {
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }}
                            disabled={item.countInStock === 0 ? true : false}
                          />
                        </div>
                        <Button
                          variant='danger'
                          onClick={removefromCarthandler(item.product)}
                        >
                          <i className='fa fa-trash'></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items :
                  <strong className='pl-2 text-danger'>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </strong>
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant='primary'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  <i className='fa fa-shopping-cart'></i> PROCED TO CHECKOUT
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
