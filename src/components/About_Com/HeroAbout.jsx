import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import hero from '../../assets/hero-home.png'

const HeroAbout = () => {
  return (
    <Container>
      <div>
        <h1 className='text-primary'>Q-prep</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quod.</p>
      </div>



      <Row >
        <Col lg={6}>
          <img src={hero} alt="img" />
        </Col>
      </Row>
    </Container>
  )
}

export default HeroAbout;