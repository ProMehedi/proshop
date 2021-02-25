import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SyncLoader from 'react-spinners/SyncLoader'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { listProductDetails } from '../../actions/productActions'
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message'
import { ClipLoader } from 'react-spinners'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCountInStock(product.countInStock)
      setCategory(product.category)
      setDescription(product.description)
    }
  }, [dispatch, productId, product, history])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link className='btn btn-dark mb-3' to='/admin/products'>
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
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Product Title'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Product Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='count'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Count In Stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Product Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={6}
              placeholder='Product Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            UPDATE{' '}
            {loading ? (
              <ClipLoader color='#fff' size={20} />
            ) : (
              <i className='fas fa-upload'></i>
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
