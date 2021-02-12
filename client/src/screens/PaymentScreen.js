import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h3 className='mb-3'>Payment Methods</h3>
      <Form onSubmit={submitHandler} className='border-top pt-3'>
        <Form.Group controlId='address'>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          <Form.Check
            className='border p-2 pl-4 my-2 d-block rounded'
            type='radio'
            label='PayPal or Credit Cart'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            className='border p-2 pl-4 my-2 d-block rounded'
            type='radio'
            label='Stripe'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            disabled
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>
        <Row>
          <Col>
            <LinkContainer to='/shipping'>
              <Button type='button' variant='secondary'>
                <i className='fa fa-angle-double-left'></i> GO BACK
              </Button>
            </LinkContainer>
          </Col>
          <Col className='text-right'>
            <Button type='submit' variant='primary'>
              CONTINUE <i className='fa fa-angle-double-right'></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
