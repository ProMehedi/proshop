import React, { useEffect } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'
import Message from '../components/Message'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  return (
    <>
      <h1 className='mb-3'>Order #{orderId} </h1>
      {loading ? (
        <div className='lazyLoader text-center m-5'>
          <SyncLoader color='#ff6138' size={15} />
        </div>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4 className='border-bottom mb-3 pb-3'>Shipping</h4>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city},
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      <strong>STATUS: </strong>DELIVERED {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>
                      <strong>STATUS: </strong>NOT DELIVERED
                    </Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4 className='border-bottom mb-3 pb-3'>Payment Method</h4>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>
                      <strong>STATUS: </strong>PAID ON {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>
                      <strong>STATUS: </strong>UNPAID
                    </Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4 className='border-bottom mb-3 pb-3'>Order Items</h4>
                  {order.orderItems.length === 0 ? (
                    <Message variant='danger'>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row className='align-items-center'>
                            <Col md={7}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                rounded
                                width='50'
                                className='pr-3'
                              />
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={5} className='text-right'>
                              <strong>
                                {item.qty} x ${item.price} = $
                                {item.qty * item.price}
                              </strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4 className='text-center'>Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Items</strong>{' '}
                    </Col>
                    <Col className='text-right'>
                      <strong>${order.itemsPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Shiping</strong>{' '}
                    </Col>
                    <Col className='text-right'>
                      <strong>${order.shippingPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Tax</strong>{' '}
                    </Col>
                    <Col className='text-right'>
                      <strong>${addDecimals(order.taxPrice)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong className='text-danger'>Total</strong>{' '}
                    </Col>
                    <Col className='text-right'>
                      <strong className='text-danger'>
                        ${addDecimals(order.totalPrice)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {error && (
                  <ListGroup.Item>
                    <Message variant='danger'>{error}</Message>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={order.cartItems === 0}
                  >
                    PLACE ORDER
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default OrderScreen
