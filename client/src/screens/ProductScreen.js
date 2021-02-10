import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({})
  const [qty, setQty] = useState(1)

  const qtyHandler = (e) => {
    if (qty < 0) {
      return false
    } else if (qty < 50) {
      setQty(e.target.value)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [match.params.id])

  return (
    <>
      <Link className='btn btn-dark mb-3' to='/'>
        <i className='fa fa-double-angle-left'></i> Go Back to home
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} />
        </Col>

        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='px-0'>
              <h3>{product.name}</h3>
              <Rating
                value={product.rating}
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
                  />
                </div>
                <Button
                  variant='primary'
                  onClick={() => console.log('test')}
                  disabled={product.countInStock === 0 ? true : false}
                >
                  <i className='fa fa-shopping-cart'></i> Add To Cart
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
