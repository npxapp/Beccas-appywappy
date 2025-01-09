import { useState, useEffect } from 'react';
import SimpleSlider from './SimpleSlider';
import SimpleSources from './SimpleSources';
import { useLocation } from 'react-router-dom';
import { getDomain } from './utils';

// Simple component mapping object
const componentMap = {
  SimpleSlider,
  SimpleSources,
  // Add other components as needed
};

const DynamicHeader = () => {
  const [header, setHeader] = useState(null);
  const location = useLocation();
  const domain = getDomain();

  useEffect(() => {
    const fetchDomains = async () => {
      if (location.pathname === '/') {
        try {
          const response = await fetch('/npx/registry/read', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();

          if (data.status === 'OK') {
            const matchingDomain = data.assets.find(asset => 
              asset.type === 'domain' && asset.name === domain
            );
            if (matchingDomain?.text && componentMap[matchingDomain.text]) {
              
              const Component = componentMap[matchingDomain.text];
              setHeader(() => <Component />);
            } else {
              setHeader(null);
            }
          }
        } catch (error) {
          console.error(`Error fetching domains: ${error.message}`);
          setHeader(null);
        }
      } else {
        setHeader(null);
      }
    };

    fetchDomains();
  }, [location.pathname, domain]);

  return header;
};

export default DynamicHeader;

