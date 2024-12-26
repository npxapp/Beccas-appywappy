import React, { useState } from 'react';
import { Box, IconButton, Slide, TextField, Button, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDarkMode } from '../../contexts/DarkMode';
import { useSlide } from '../../contexts/SlideContext';
import getCardIcon from './DashboardIcons';

const SlideReconciliation = () => {
  const { darkMode } = useDarkMode();
  const [token, setToken] = useState(null);
  const [link, setLink] = useState(null);
  const [file, setFile] = useState(null);
  const [last4, setLast4] = useState('4242');
  const [type, setType] = useState('stripe');
  const [messageResponse, setMessageResponse] = useState(null);

  const { 
    loading, 
    setLoading, 
    activeSlide, 
    setActiveSlide,
    setPreviousSlide 
  } = useSlide();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const randomSessionId = `npx-app-${Math.random().toString(36).substring(2, 26)}`;

    const payload = { session_id: randomSessionId, last4, type, product: 'app.tar.gz' };
    
    try {
      const response = await fetch('/npx/test/reconciliation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageResponse(data.status);
        setLast4(data.card_last4);
        if (data.download_link) {
          try {
            const origin = window.location.href.match(/^https?:\/\/[^/]+/)[0];
            setType(data.card_type);
            const formattedLink = data.download_link.replace(/^https?:\/\/[^/]+/, origin);
            setLink(formattedLink);
          } catch (error) {
            console.error('Error formatting download link:', error);
          }
          setFile(data.product);
        }
        setToken(data.token);
      } else {
        setMessageResponse('Unexpected response or error');
      }
    } catch (error) {
      setMessageResponse(`Error: ${error.message}. Please check the request or try again later.`);
      setLink(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(0);
  };
  
  const iconProps = {
    fontSize: '8rem',
  };
  
  return (
    <Slide direction="left" in={activeSlide === 2} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <IconButton onClick={handleBack}>
          <ArrowForwardIcon sx={{ color: '#61dafb' }} />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'column',
              width: '100%',
              height: '100vh',
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: darkMode ? '#61dafb' : '#007fff' }} />
            ) : (
              <>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {getCardIcon(type, iconProps)}
                </Box>
                <Box
                  sx={{
                    width: '50%',
                  }}
                >
                <TextField
                  id="link"
                  value={link}
                  sx={{
                    marginBottom: 2,
                  }}
                  InputLabelProps={{
                    style: { color: darkMode ? '#61dafb' : '#007fff' },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: 'transparent',
                      borderRadius: 20,
                      height: 40,
                      border: '1px solid #61dafb',
                      fontSize: 'clamp(1rem, 6vh, 2rem)',
                      color: darkMode ? '#61dafb' : '#007fff',
                      width: { xs: '10%', sm: '25%', md: '50%', lg: '75%', xl: '100%' },
                    },
                  }}
                />
                <TextField
                  id="file"
                  value={file}
                  sx={{
                    marginBottom: 2,
                  }}
                  InputLabelProps={{
                    style: { color: darkMode ? '#61dafb' : '#007fff' },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: 'transparent',
                      borderRadius: 20,
                      height: 40,
                      border: '1px solid #61dafb',
                      fontSize: 'clamp(1rem, 6vh, 2rem)',
                      color: darkMode ? '#61dafb' : '#007fff',
                      width: { xs: '10%', sm: '25%', md: '50%', lg: '75%', xl: '100%' },
                    },
                  }}
                />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                  }}
                >
                <TextField
                  id="last4"
                  value={last4}
                  onChange={(e) => setLast4(e.target.value)}
                  sx={{
                    marginBottom: 2,
                  }}
                  InputLabelProps={{
                    style: { color: darkMode ? '#61dafb' : '#007fff' },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: 'transparent',
                      borderRadius: 20,
                      height: 40,
                      border: '1px solid #61dafb',
                      fontSize: 'clamp(1rem, 6vh, 2rem)',
                      color: darkMode ? '#61dafb' : '#007fff',
                      width: { xs: '10%', sm: '25%', md: '50%', lg: '75%', xl: '100%' },
                    },
                  }}
                />
                <TextField
                  id="token"
                  value={token}
                  sx={{
                    marginBottom: 2,
                  }}
                  InputLabelProps={{
                    style: { color: darkMode ? '#61dafb' : '#007fff' },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: 'transparent',
                      borderRadius: 20,
                      height: 40,
                      border: '1px solid #61dafb',
                      fontSize: 'clamp(1rem, 6vh, 2rem)',
                      color: darkMode ? '#61dafb' : '#007fff',
                    },
                  }}
                />
                </Box>
                <Box
                  sx={{
                    width: '50%',
                  }}
                >
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(97, 218, 251, .2)',
                    color: darkMode ? '#61dafb' : '#007fff',
                    fontSize: 'clamp(1rem, 6vh, 2rem)',
                    borderRadius: 20,
                    height: 40,
                    border: '1px solid #61dafb',
                    width: { xs: '100%', },
                  }}
                  disabled={loading}
                >
                  Pay
                </Button>
                  {messageResponse}
                </Box>
              </>
            )}
          </Box>
        </form>
      </Box>
    </Slide>
  );
};

export default SlideReconciliation;