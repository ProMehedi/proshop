import React, { useEffect, useState } from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import SyncLoader from 'react-spinners/SyncLoader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const qtyHandler = (e) => {
    if (qty < 0) {
      return false
    } else if (qty < 50) {
      setQty(e.target.value)
    }
  }

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-dark mb-3' to='/'>
        <i className='fa fa-double-angle-left'></i> Go Back to home
      </Link>
      {loading ? (
        <div className='lazyLoader text-center m-5'>
          <SyncLoader color='#ff6138' size={15} />
        </div>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} />
          </Col>

          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item className='px-0'>
                <h3>{product.name}</h3>
                <Rating
                  value={parseInt(product.rating)}
                  text={`${product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className='px-0'>
                <h4>
                  <strong>Price: </strong>${product.price}
                </h4>
              </ListGroup.Item>
              <ListGroup.Item className='px-0'>
                <strong>Discription: </strong>
                {product.description}
              </ListGroup.Item>
              <ListGroup.Item className='px-0'>
                <strong>Status:</strong>{' '}
                {product.countInStock === 0 ? (
                  <span className='text-danger'>
                    Out of Stock{' '}
                    <span className='text-dark'>
                      ({product.countInStock} Available)
                    </span>
                  </span>
                ) : product.countInStock <= 5 ? (
                  <span className='text-warning'>
                    Low Stock{' '}
                    <span className='text-dark'>
                      ({product.countInStock} Available)
                    </span>
                  </span>
                ) : (
                  <span className='text-success'>
                    In Stock{' '}
                    <span className='text-dark'>
                      ({product.countInStock} Available)
                    </span>
                  </span>
                )}
              </ListGroup.Item>
              <ListGroup.Item className='px-0'>
                <div className='d-flex align-items-center'>
                  <strong>QTY:</strong>
                  <div className='qtyGroup px-3'>
                    <input
                      className='quantity form-control'
                      type='number'
                      min='1'
                      max={product.countInStock}
                      value={qty}
                      onChange={qtyHandler}
                      disabled={product.countInStock === 0 ? true : false}
                    />
                  </div>
                  <Button
                    variant='primary'
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0 ? true : false}
                  >
                    <i className='fa fa-shopping-cart'></i> Add To Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
