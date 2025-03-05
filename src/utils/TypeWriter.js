// utils/TypeWriter.jsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const TypeWriter = ({ 
  text, 
  attribution, 
  delay = 50, 
  color = 'inherit', 
  fontWeight = 400, 
  fontSize = '1rem', 
  textShadow = 'none',
  showAttribution = true,
  useQuotes = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset when text changes
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text, attribution]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timer);
    } else if (!isComplete && showAttribution) {
      setIsComplete(true);
      setDisplayText(prev => {
        // Add attribution with hyphen
        return `${prev}${useQuotes ? '"' : ''} -${attribution}`;
      });
    }
  }, [currentIndex, text, attribution, delay, isComplete, showAttribution, useQuotes]);

  return (
    <Typography
      sx={{
        color,
        fontWeight,
        fontSize,
        textShadow,
        fontStyle: 'italic',
        mb: 3,
        minHeight: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {useQuotes && displayText.charAt(0) !== '"' ? '"' : ''}{displayText}
    </Typography>
  );
};

export default TypeWriter;

