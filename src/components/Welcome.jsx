import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { motion } from 'framer-motion';
import '../css/home.css';

const Welcome = ({ onGoToAppSlide }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
     console.log(`Current step: ${step}`);
    const transitions = [
        
      () => setStep(1), // Welcome
       () => setTimeout(() => setStep(2), 500), // Welcome fades out
      () => setTimeout(() => setStep(3), 500), // My name is
      () => setTimeout(() => setStep(4), 500), // Zdeslav Zaksek appears
      () => setTimeout(() => setStep(5), 500), // I am a Full-Stack developer
      () => setTimeout(() => setStep(6), 500), // Start fading out "My name is" and "I am a Full-Stack developer"
      ( ) => setTimeout(() => setStep(7), 200), // "Welcome" fades in
    ];
    const timer = setTimeout(() => {
      if (step < transitions.length) transitions[step]();
    }, 1000); // Increase initial delay to 2000ms for longer display
    return () => clearTimeout(timer);
  }, [step]);

   const welcomeTransition = useSpring({
    opacity: step === 1 ? 1 : 0, // Only visible at step 1
   
    config: config.molasses,
  });

  // Adjusted to match the new step sequence
  const nameIntroTransition = useSpring({
    opacity: step >= 3 && step < 6 ? 1 : 0, // Now "My name is" fades in at step 3
    config: config.molasses,
  });

  // Adjusted to match the new step sequence
  const nameTransition = useSpring({
    opacity: step >= 4 ? 1 : 0, // "Zdeslav Zaksek" appears at step 4 and stays
    config: config.molasses,
  });

  // Adjusted to match the new step sequence
  const roleIntroTransition = useSpring({
    opacity: step === 5 ? 1 : 0, // "I am a" fades in at step 5
    config: config.molasses,
  });

  // Adjusted to match the new step sequence
  const roleTransition = useSpring({
    opacity: step >= 5 ? 1 : 0, // "Full-Stack Developer" appears at step 5 and stays
    config: config.molasses,
  });

  // Adjustments for center transitions remain the same as they are dependent on the final step for alignment
  const centerTransitionName = useSpring({
    marginLeft: step === 7 ? '-200px' : '0px', // Adjust the values as needed
    config: config.molasses,
  });

  const centerTransitionRole = useSpring({
    marginLeft: step === 7 ? '-115px' : '0px', // Adjust the values as needed
    config: config.molasses,
  });

    const backgroundTransition = useSpring({
    backgroundColor: step === 7 ? 'transparent' : 'black',
    config: config.molasses,
    delay: 1000
  });

  // Define arrow visibility based on step
  const arrowVisibility = useSpring({
    opacity: step === 7 ? 1 : 0,
    config: config.molasses,
  });
useEffect(() => {
    // Apply styles to make scrollbar invisible and prevent scrolling
    if (step < 7) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    // Cleanup function to reset styles when component unmounts or step reaches 7
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [step]);
  return (
    <animated.div className='welcomeContainer' id="welcome" style={{...backgroundTransition}}>
      <div className='headerText'>
        {step <= 2 && (
          <animated.div style={{...welcomeTransition, fontSize: '4rem'}}>Welcome</animated.div>
        )}
        {step >= 3 && (
          <>
            <animated.span style={nameIntroTransition}>My name is</animated.span>
            <animated.span style={{...nameTransition, ...centerTransitionName}}> Zdeslav Zaksek</animated.span>
          </>
        )}
      </div>
      <div className='headerText' style={{position: 'absolute', top: '53%'}}>
        {step >= 5 && (
          <>
            <animated.span style={roleIntroTransition}>I am a</animated.span>
            <animated.span style={{...roleTransition, ...centerTransitionRole}}> Full-Stack Developer</animated.span>
          </>
        )}
      </div>

      <animated.div className="arrow" style={{...arrowVisibility}} onClick={onGoToAppSlide}>
        <span></span>
        <span></span>
        <span></span>
      </animated.div>
    
    </animated.div>
  );
};

export default Welcome;