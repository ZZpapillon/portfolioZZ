import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated, useTrail  } from 'react-spring';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaNpm } from 'react-icons/fa';
import { SiExpress, SiRedux, SiMongodb, SiPostgresql, SiWebpack, SiPostman } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';
import '../css/About.css';
// Define a helper function to render icons with consistent style and their names

const About = () => {
const { ref, inView } = useInView({
    threshold: 0.1, // Adjust this value based on your needs
    triggerOnce: false, // Ensures the animation only runs once
  });

const [iconSize, setIconSize] = useState(50); // Default icon size

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 780) {
      setIconSize(30); // Smaller screens
    } else if (window.innerWidth < 1000) {
      setIconSize(40); // Medium screens
    } else {
      setIconSize(50); // Larger screens
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Initialize icon size based on current window size

  return () => window.removeEventListener('resize', handleResize);
}, []);

const renderIconWithName = (IconComponent, name, iconSize) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px', paddingRight: '25px', paddingLeft: '25px' }}>
    <IconComponent color="#007ACC" size={iconSize} />
    <span style={{ color: 'white' }}>{name}</span>
  </div>
);

const frontendIcons = [
  renderIconWithName(FaHtml5, 'HTML5', iconSize), renderIconWithName(FaCss3Alt, 'CSS3', iconSize), renderIconWithName(FaJsSquare, 'JavaScript', iconSize), renderIconWithName(FaReact, 'React', iconSize), renderIconWithName(FaBootstrap, 'Bootstrap', iconSize),
];

const backendIcons = [
  renderIconWithName(FaNodeJs, 'Node.js', iconSize), renderIconWithName(SiExpress, 'Express', iconSize), renderIconWithName(SiMongodb, 'MongoDB', iconSize), 
];

const toolsIcons = [
  renderIconWithName(FaGitAlt, 'Git', iconSize), renderIconWithName(FaGithub, 'GitHub', iconSize), renderIconWithName(SiWebpack, 'Webpack', iconSize), renderIconWithName(SiPostman, 'Postman', iconSize), renderIconWithName(FaNpm, 'NPM', iconSize),
];






  const fadeInProps = useSpring({
  to: {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(-100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
  delay: 200,
});


  const fadeInSkills = useSpring({
  to: {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(-100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  delay: 300,
});
   const fadeInTools = useSpring({
  to: {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(-100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
  delay: 500,
});
  const fadeInFrontEnd = useSpring({
  to: {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
  delay: 500,
});
  const fadeInBackEnd = useSpring({
  to: {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(-100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  delay: 500,
});
const text = "I'm motivated and task-oriented individual proficient in Front-End Development, actively pursuing expansion into Full-Stack Development. My dedication to continuous learning and skill enhancement is driven by my ambition to excel in the dynamic tech industry, with current studies focused on mastering Full-Stack Development.";
  const words = text.split(' ');
    const trail = useTrail(words.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
    },
    config: { mass: 1, tension: 1200, friction: 120 },
    reset: true,
  });

return (
  <Container ref={ref} id="about" style={{ height: '100vh', position: 'relative', borderBottom: '0.1px solid white' }}>
    <Row  className="justify-content-md-center scrollAbout ">
    
      <Col >
        <animated.h1 className='text-white mt-4 mb-0 aboutContainer' style={{...fadeInSkills, textAlign: 'center'}}>Skills</animated.h1>
        <div className="skills mt-0">
          {/* Frontend Skills */}
          <animated.div style={{...fadeInFrontEnd}} className="skills-section">
            <h4>Frontend</h4>
            <animated.div className="skills-icons" >
              {frontendIcons.map((icon, index) => (
                <React.Fragment key={index}>
                  {icon}
                </React.Fragment>
              ))}
            </animated.div>
          </animated.div>
          
          {/* Backend Skills */}
          <animated.div style={{...fadeInBackEnd}} className="skills-section">
            <h4>Backend</h4>
           
               <animated.div className="skills-icons" >
              {backendIcons.map((icon, index) => (
                <React.Fragment key={index}>
                  {icon}
                </React.Fragment>
              ))}
            </animated.div>
             </animated.div>
          
          {/* Tools */}
          <animated.div style={{...fadeInTools}} className="skills-section">
            <h4>Tools</h4>
            
              <animated.div className="skills-icons">
              {toolsIcons.map((icon, index) => (
                <React.Fragment key={index}>
                  {icon}
                </React.Fragment>
              ))}
            </animated.div>
          
          </animated.div>
        </div>
      </Col>
    </Row>
    <Row className="justify-content-md-center aboutContainer d-flex mt-2">
      <Col  className='text-white justify-content-center'>
        <animated.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <animated.h1 style={{...fadeInBackEnd, textAlign: 'center'}}>About Me</animated.h1>
          
        <p className="aboutText" style={{ color: '#aeaeae', textAlign: 'center', width: '50vw', margin: 'auto', fontSize: '1.55rem' }}>
        {trail.map((props, index) => (
          <animated.span key={index} style={props}>
            {words[index]}{' '}
          </animated.span>
        ))}
      </p>
                  
        </animated.div>
      </Col>
    </Row>
  </Container>
);
};

export default About;