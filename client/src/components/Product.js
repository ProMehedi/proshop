import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <>
      <Card className='my-2'>
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </a>

        <Card.Body>
          <a href={`/product/${product._id}`} className='text-decoration-none'>
            <Card.Title as='h4' className='text-dark productTitle'>
              <strong>{product.name}</strong>
            </Card.Title>
          </a>
          <Card.Text>
            <div className='my-2'>
              {product.rating} from {product.numReviews} Reviews
            </div>
          </Card.Text>

          <Card.Text as='h3' className='productPrice text-danger'>
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
