// utils/RandomQuote.jsx
import React, { useState, useEffect } from 'react';
import TypeWriter from './TypeWriter';
import { wireEpigraphs } from 'locales/wire';

const RandomQuote = ({ 
  delay = 50, 
  color = 'inherit', 
  fontWeight = 400, 
  fontSize = '1rem', 
  textShadow = 'none',
  showAttribution = true,
  useQuotes = true 
}) => {
  const [quote, setQuote] = useState('');
  const [attribution, setAttribution] = useState('');

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * wireEpigraphs.length);
    const randomQuote = wireEpigraphs[randomIndex];
    
    // randomQuote structure: [episode number, episode title, quote, attribution]
    setQuote(randomQuote[2]);
    setAttribution(randomQuote[3]);
  };

  return (
    <TypeWriter 
      text={quote}
      attribution={attribution}
      delay={delay}
      color={color}
      fontWeight={fontWeight}
      fontSize={fontSize}
      textShadow={textShadow}
      showAttribution={showAttribution}
      useQuotes={useQuotes}
    />
  );
};

export default RandomQuote;

