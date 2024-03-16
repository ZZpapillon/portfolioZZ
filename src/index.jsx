import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FullPage, Slide } from 'react-full-page'; // Adjust based on the library
import App from './components/App.jsx';
import './css/App.css';
import Overlay from './components/Overlay.jsx';
import Welcome from './components/Welcome.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

const Index = () => {
    const appSlideRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // Example breakpoint
        };

        // Check on mount
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const goToAppSlide = () => {
        setTimeout(() => {
            if (appSlideRef.current) {
                appSlideRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    // Conditionally apply styles or props to disable scrolling
     if (isMobile) {
        // Mobile view without FullPage and Slide
        return (
            <div style={{ overflowX: 'hidden' }}>
                <Overlay /> <Welcome onGoToAppSlide={goToAppSlide} />
                <Overlay radius={2} size={0.0035} height={'100vh'} /> <div ref={appSlideRef}><App /></div>
                <Overlay radius={2} size={0.0035} height={'100vh'} />
                <About />
                <Overlay radius={2} size={0.0035} height={'100vh'} />
                <Contact />
            </div>
        );
    } else {
        // Desktop view with FullPage and Slide
        return (
            <FullPage>
                <Slide className="force-height">
                    <Overlay  />
                    <Welcome onGoToAppSlide={goToAppSlide} />
                </Slide>
                <Slide className="force-height">
                    <Overlay radius={2} size={0.0045} height={'100vh'} />
                    <div ref={appSlideRef}><App /></div>
                </Slide>
                <Slide className="force-height">
                    <Overlay radius={2} size={0.0045} height={'100vh'} />
                    <About />
                </Slide>
                <Slide className="force-height">
                    <Overlay radius={2} size={0.0045} height={'100vh'} />
                    <Contact />
                </Slide>
            </FullPage>
        );
    }
};

export default Index;