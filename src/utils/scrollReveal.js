// utils/scrollReveal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

const ScrollReveal = ({ children, direction = 'up', delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current; // Store ref.current in a variable
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'translateY(0)' : 'translateY(50px)';
      case 'down':
        return isVisible ? 'translateY(0)' : 'translateY(-50px)';
      case 'left':
        return isVisible ? 'translateX(0)' : 'translateX(50px)';
      case 'right':
        return isVisible ? 'translateX(0)' : 'translateX(-50px)';
      default:
        return isVisible ? 'translateY(0)' : 'translateY(50px)';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollReveal;