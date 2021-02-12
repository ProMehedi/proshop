import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ''
  )
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ''
  )
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ''
  )
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ''
  )

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
          ></Form.Check>
          <Form.Check
            className='border p-2 pl-4 my-2 d-block rounded'
            type='radio'
            label='Stripe'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            disabled
          ></Form.Check>
        </Form.Group>
        <Button type='submit' variant='primary'>
          CONTINUE
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
