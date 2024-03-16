import * as THREE from 'three';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Environment, useGLTF, ContactShadows, shaderMaterial, Plane } from '@react-three/drei';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useInView } from 'react-intersection-observer';
import { a as three } from '@react-spring/three';
import { a as web, useSpring, animated, config } from '@react-spring/web';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Button } from 'react-bootstrap';
import AbstractModalHeader from 'react-bootstrap/esm/AbstractModalHeader';





const projects = [
  {
   videoSrc: 'twitter.mp4',
summary: "Full-stack Twitter clone that replicates core functionalities of the original Twitter platform. It allows users to post tweets, follow other users, like and retweet posts, and engage in real-time conversations through direct messages.This project demonstrates a comprehensive application of modern web development technologies to create a dynamic and interactive social media platform.",
technologies: ["React.js", "Bootstrap", "Node.js/Express.js", "Redux Toolkit", "MongoDB", "Socket.IO"],
projectName: "Twitter",
projectSubName: "Twitter Clone",
    links: {
      livePreview: "https://stalwart-crostata-5ad996.netlify.app/", // Placeholder link, replace with actual URL
      viewCode: "https://github.com/ZZpapillon/twitterFront" // Placeholder link, replace with actual URL
    }
  },
   {
    videoSrc: 'razer1.mov',
   
    summary: "Project showcases an e-commerce shopping cart specifically designed for Razer products. It features a sleek, user-friendly interface that allows users to browse, add items to their cart, and proceed to checkout seamlessly. Built with React.js and Bootstrap for responsive design, this project demonstrates a practical application of web development skills in creating a functional online store.",
    technologies: ["React.js", "Bootsrap",],
    projectName: "Razer",
    projectSubName: "React Razer Store",
    links: {
      livePreview: "https://shoppingcart2-753g.vercel.app/",
      viewCode: "https://github.com/ZZpapillon/shoppingcart2"
    }
  },

  {
    videoSrc: 'messenger.mov',
    summary: "A messaging app designed to emulate the real-time communication features of WhatsApp. Built with React.js and Bootstrap for a sleek, responsive interface, it leverages Node.js and Express.js for backend services, and MongoDB for data storage. ",
    technologies: ["React.js", "Bootstrap", "Node.js/Express.js", "MongoDB",],
    projectName: "Messenger",
    projectSubName: "Messages App",
    links: {
      livePreview: "https://messengerzz.netlify.app/",
      viewCode: "https://github.com/ZZpapillon/messengerFront"
    }
  },
  {
    videoSrc: 'waldo.mov',
   summary: "A 'Where's Waldo?' game clone using React.js and Bootstrap for the UI, and Node.js/Express.js with MongoDB for backend functions.",
    technologies:  ["React.js", "Bootstrap", "Node.js/Express.js", "MongoDB",],
    projectName: "Waldo",
    projectSubName: "Wheres's Waldo Game",
    links: {
      livePreview: "https://waldo-front.vercel.app/",
      viewCode: "https://github.com/ZZpapillon/waldoFront"
    }
  }
  // Add more projects as needed
];

function Model({ open, hinge, ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/mac-draco.glb');
  const [hovered, setHovered] = useState(false);
  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered]);
  

  // Create and apply video texture
  useEffect(() => {
    const video = document.createElement('video');
    video.src = props.videoSrc;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.play().catch(error => {
    // Handle the error or inform the user that a tap is required to play the video
    console.error("Video play failed:", error);
  });

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    videoTexture.flipY = false;

    materials['screen.001'].map = videoTexture; // Apply video texture to the screen material
   
   
  }, [materials, props.videoSrc]);
  

useFrame((state) => {
  
    const t = state.clock.getElapsedTime();
    // Set rotation.x to π/2 radians (90 degrees) when open
    group.current.rotation.x = 0;
    
    // Ensure there's no rotation on the y and z axes
    group.current.rotation.y = 0;
    group.current.rotation.z = 0;
    
    // Implement a floating effect on the y-axis
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, open ? -4.3 + Math.sin(t) * 0.1 : -4.3, 0.1);
});
  return (
    <group ref={group} {...props} onPointerOver={(e) => (e.stopPropagation(), setHovered(true))} onPointerOut={(e) => setHovered(false)} dispose={null} 
    scale={[3., 3.1, 0.9]}>
      <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
        </group>
      </three.group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  );
}
export default function App() {
  // This flag controls open state, alternates between true & false
  const [open, setOpen] = useState(true)
 const [projectDetails, setProjectDetails] = useState(projects[0]);
  // We turn this into a spring animation that interpolates between 0 and 1
  
  const [clicked, setClicked] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const nextProject = () => {
    setClicked(true);
  

    const nextIndex = (currentProjectIndex + 1) % projects.length; // Loop back to the first project after the last one
    setCurrentProjectIndex(nextIndex);
    setProjectDetails(projects[nextIndex]);

  
 
};
 
 const [refProjects, inView] = useInView({
    threshold: 0.1, // Adjust this value based on when you want the fade to start
    triggerOnce: false, // Ensures the animation only runs once
  });

 const props = useSpring({
  open: Number(!inView),
  delay: 500, // Delay in milliseconds, adjust this value as needed
  reset: inView,
});
 const fade = useSpring({
  
  to: {
    opacity: inView ? 0 : 1,
    zIndex: inView ? -1000 : 1000,
  },
  from: {
    opacity: 1,
    zIndex: 1000,
  },
  config: { duration: 2000 }, // Animation duration in ms
});

const summaryAnimation = useSpring({
  reset: inView || clicked,
  to: {
    opacity: inView || clicked ? 1 : 0,
    transform: inView || clicked ? 'translateX(0)' : 'translateX(100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
  
 
  delay: 0,
  config: config.molasses,
  
});

const projectsAnimation = useSpring({
 
  to: {
    opacity: inView  ? 1 : 0,
    transform: inView  ? 'translateX(0)' : 'translateX(-100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
  
  delay: 0,
  config: config.molasses,
});

const buttonAnimation = useSpring({
  
  to: {
    opacity: inView  ? 1 : 0,
    transform: inView  ? 'translateY(0)' : 'translateY(-100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  delay: 0,
  config: config.molasses,
});

const technologiesAnimation = useSpring({
  reset: inView || clicked,
  to: {
    opacity: inView || clicked ? 1 : 0,
    transform: inView || clicked ? 'translateX(0)' : 'translateX(100%)',
  },
  from: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
  delay: 0,
  config: config.molasses,
});


  
  return (
    <>
  
   <animated.div className='appContainer' id="app" ref={refProjects}  >
      <animated.div style={{
        ...fade,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
         // High z-index to cover content
      }} > </animated.div>
      
   <div className='modelContainer' >  
  <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -20], }}>
   {/* Increase ambient light for overall scene brightness */}
   <ambientLight intensity={0.3} color={'#0a84ff'} />

{/* Adjusted directional light to focus more on the screen area, coming from above */}
<directionalLight position={[0, 30, 0]} intensity={1} color={'black'} />

{/* Additional directional light to illuminate the screen directly from the front */}
<directionalLight position={[2, 20, -20]} intensity={1.1}  />

{/* Keep one of the original lights for ambient lighting on the keyboard and lower parts */}
<directionalLight position={[10, -5, 10]} intensity={0.1} color={'black'} target-position={[0, -2, 0]} />

{/* Optional: Another light from a different angle to ensure even lighting on the screen */}
<directionalLight position={[-10, 10, -10]} intensity={0.5} color={'lightblue'} />
  
  {/* Optional: Add a soft point light for highlights or specific areas needing more illumination */}
  {/* onClick={(e) => (e.stopPropagation(), setOpen(!open))} */}

    
    <Suspense fallback={null}>
      <group rotation={[0, Math.PI, 0]} >
       <Model open={!inView } hinge={props.open.to([0, 1], [0, Math.PI / 2])} videoSrc={projectDetails.videoSrc} />
      </group>
    
    </Suspense>
   
    <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={2} blur={1.75} far={4.5} />
  </Canvas>
    <div className='glowEffect'></div>
 
  </div>
<div className='textContainer' >
   <animated.h1 style={summaryAnimation} className="projectsName">
          {projectDetails.projectName}
  </animated.h1>
  <animated.h2  style={{...summaryAnimation, color: '#aeaeae', fontSize: '2rem', marginTop: '-1rem', marginBottom: '1rem', fontWeight: 'bold'}} className='projectsSubName'>{projectDetails.projectSubName}</animated.h2>
        <animated.div style={summaryAnimation}>
        <h1>Summary</h1>
        <p>{projectDetails.summary}</p>
      </animated.div>
      
      
      <animated.div style={technologiesAnimation}>
        <h2 style={{ marginTop: '1rem' }} className='technologies'>Technologies</h2>
        <p>{projectDetails.technologies?.join(", ")}</p>
        <div style={{ marginTop: '3rem' }} className='links mb-5'>
          <a target="_blank" rel="noopener noreferrer" className='me-3' href={projectDetails.links.livePreview}>LIVE PREVIEW <FontAwesomeIcon icon={faArrowRight} className='rotate-45' /></a>
          <a target="_blank" rel="noopener noreferrer" href={projectDetails.links.viewCode}>VIEW CODE <FontAwesomeIcon className='rotate-45' icon={faArrowRight} /></a>
        </div>
        </animated.div>
        </div>
      <animated.h1 style={projectsAnimation} className="projects">
        Projects 
        
      </animated.h1>
       <animated.div style={buttonAnimation} className='buttonNext'>
        <button className='btn' onClick={nextProject} >
          <div style={{position: 'relative', left: '-30%', bottom: '50%',fontSize: '1.5rem'}}>Next</div>
        <div className='arrow' style={{position: 'absolute', left: '80%', top: '45%', rotate: '270deg', }}>
          <span style={{borderBottom: '2px solid #007bff', borderRight: '2px solid #007bff', }}></span>
          <span style={{borderBottom: '2px solid #007bff', borderRight: '2px solid #007bff', }}></span>
          <span style={{borderBottom: '2px solid #007bff', borderRight: '2px solid #007bff', }}></span>
        </div>
        </button>
      </animated.div>
     

    </animated.div>
    </>
  );
}