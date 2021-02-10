import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='py-3 bg-dark text-white text-center'>
      <Container>
        <small>
          Copyright &copy; 2021. All right reserver. Developed by{' '}
          <a href='https://promehedi.com'>Mehedi Hasan</a>
        </small>
      </Container>
    </footer>
  )
}

export default Footer
