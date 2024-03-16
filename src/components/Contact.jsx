import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import '../css/Contact.css';

const Contact = () => {
  const fadeAndMove = useSpring({
    from: {  transform: 'translateX(0%)' },
    to: [
      { transform: 'translateX(0%)' },
      { transform: 'translateX(30%)' },
      { transform: 'translateX(0%)' },
     
    ],
    config: { duration: 15000 },
    loop: true,
  });

  const imageMove = useSpring({
    from: { transform: 'translateX(0%)' },
    to: [
      { transform: 'translateX(0%)' },
      { transform: 'translateX(-30%)' },
      { transform: 'translateX(0%)' },
     
    ],
    config: { duration: 15000 },
    loop: true,
  });

  return (
    <div style={{ position: 'relative', height: '100vh' }} id="contact">
      
      <div style={{ zIndex: 2, position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 123, 255, 0.5)', mixBlendMode: 'multiply' }}></div>
      
      <Container className='contactContainer' style={{ height: '100vh', position: 'relative' }}>
        <animated.img src="bg.jpg" alt="Contact Placeholder" style={{ ...imageMove, zIndex: 1, opacity: 0.25, position: 'absolute', bottom: 0, right: 0, width: '50%', height: '100%' }} />
        <animated.div style={{ ...fadeAndMove, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyItems: 'center', zIndex: 3, position: 'relative' }}>
          <Row style={{ color: 'white', textAlign: 'center', marginTop: '30vh' }}>
            <Col>
              <h1 style={{ fontSize: '4.5rem', color: 'white', textShadow: '2px 2px 4px #000000' }}>Want to get in touch?</h1>
              <p style={{ fontSize: '1.7rem', color: 'white', textShadow: '2px 2px 4px #000000', margin: '0' }}>Contact me via:</p>
              <a href="mailto:zdeszaksek@gmail.com" className="email-link">zdeszaksek@gmail.com</a>
            </Col>
          </Row>
        </animated.div>
        <footer style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  position: 'absolute', 
  bottom: '0', 
  width: '100%', 
  textAlign: 'start', 
  paddingBottom: '20px', 
  color: 'white', 
  fontSize: '2rem', 
  fontWeight: '100', 
  zIndex: 3 
}}>
  <div> {/* Name and location at the start */}
    <p style={{margin: '1px', padding: '0 0 0 1px',fontWeight: '300'}}>Zdeslav Zaksek</p>
    <p style={{margin: '1px', padding: '0 0 0 1px'}}>Zagreb, Croatia</p>
    <p style={{padding: '0 0 0 1px'}}>© 2024</p>
  </div>
  <div style={{ textAlign: 'center' }}> {/* "Built with" in the middle, in 3 rows */}
    <p style={{margin: '1px', padding: '0 0 0 1px', fontWeight: 'bold'}}>Built with</p>
    <p style={{margin: '1px', padding: '0 0 0 1px'}}>React.js, Three.js Fiber,</p>
    <p style={{padding: '0 0 0 1px'}}>React Spring</p>
  </div>
  <div> {/* Empty div for alignment */}
  </div>
</footer>
      </Container>
    </div>
  );
};

export default Contact;