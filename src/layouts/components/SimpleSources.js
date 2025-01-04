import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

const SimpleSources = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigateOpen = (url) => {
    window.open(url, '_blank');
  };

  // Function to remove emojis from a string
  const removeEmojis = (text) => {
    return text.replace(
      /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F900}-\u{1F9FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1FA70}-\u{1FAFF}|\u{1F1E6}-\u{1F1FF}]/gu,
      ''
    );
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/links/sof');
        if (response.ok) {
          const data = await response.json();
          setLinks(data.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
      }}
    >
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {links.map((link, index) => (
            <Box key={index} sx={{ margin: 1 }}>
              {link.title.split(' ').map((word, idx) => (
                <Button
                  variant="panelButton"
                  key={idx}
                  onClick={() => navigateOpen(link.link)}
                >
                  {removeEmojis(word)}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SimpleSources;