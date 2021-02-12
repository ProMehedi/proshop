import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress, paymentMethod, cartItems } = cart

  // Calculate Prices
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
  }, [history, success, order])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
    console.log(success)
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4 className='border-bottom mb-3 pb-3'>Shipping</h4>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.postalCode}, {shippingAddress.country}
              </ListGroup.Item>

              <ListGroup.Item>
                <h4 className='border-bottom mb-3 pb-3'>Payment Method</h4>
                <strong>Method: </strong>
                {paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h4 className='border-bottom mb-3 pb-3'>Order Items</h4>
                {cartItems.length === 0 ? (
                  <Message variant='danger'>Your Cart is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {cartItems.map((item, index) => (
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
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Items</strong>{' '}
                  </Col>
                  <Col className='text-right'>
                    <strong>${cart.itemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Shiping</strong>{' '}
                  </Col>
                  <Col className='text-right'>
                    <strong>${cart.shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Tax</strong>{' '}
                  </Col>
                  <Col className='text-right'>
                    <strong>${addDecimals(cart.taxPrice)}</strong>
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
                      ${addDecimals(cart.totalPrice)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  PLACE ORDER
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
