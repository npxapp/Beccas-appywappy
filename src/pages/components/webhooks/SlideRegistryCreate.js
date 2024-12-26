import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  TextField,
  Button,
  Slide,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSlide } from '../../contexts/SlideContext';
import { useDarkMode } from '../../contexts/DarkMode';

  const SlideRegistryCreate = () => {
  const { darkMode } = useDarkMode();
  const [name, setName] = useState('Name value');
  const [type, setType] = useState('Type value');
  const [slug, setSlug] = useState('Slug value');
  const [status, setStatus] = useState('Status value');
  const [webhook, setWebhook] = useState('Webhook value');
  const [text, setText] = useState('Text value');
  const [blob, setBlob] = useState('Blob value');
  
  const [messageResponse, setMessageResponse] = useState(null);

  const {
    loading,
    setLoading,
    activeSlide,
    setActiveSlide,
    setPreviousSlide,
  } = useSlide();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      type,
      slug: slug?.trim() === '' ? null : slug,
      asset_status: status,
      webhook,
      text,
      blob,
    };

    try {
      const response = await fetch('/npx/registry/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageResponse(data.status);
        setName(data.asset.name);
        if (data.asset.type) setType(data.asset.type);
        if (data.asset.slug) setSlug(data.asset.slug);
        if (data.asset.asset_status) setStatus(data.asset.asset_status);
        if (data.asset.webhook) setWebhook(data.asset.webhook);
        if (data.asset.text) setText(data.asset.text);
        setBlob(data.asset.blob);
        handleBack(5);
      } else {
        alert(response.status);
        setMessageResponse('Unexpected response or error');
      }
    } catch (error) {
      setMessageResponse(
        `Error: ${error.message}. Please check the request or try again later.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(0);
  };

  return (
    <Slide direction="left" in={activeSlide === 4} mountOnEnter unmountOnExit>
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
          <ArrowBackIcon sx={{ color: '#61dafb' }} />
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
              <CircularProgress
                sx={{ color: darkMode ? '#61dafb' : '#007fff' }}
              />
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
                  <Typography variant="h6" sx={{ color: '#61dafb' }}>
                    Assets Registry Create
                  </Typography>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <TextField
                    id="name"
                    value={name || 'Name value'}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginBottom: 2 }}
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
                  <TextField
                    id="type"
                    value={type || 'Type value'}
                    onChange={(e) => setType(e.target.value)}
                    sx={{ marginBottom: 2 }}
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
                  <TextField
                    id="slug"
                    value={slug || null}
                    onChange={(e) => setSlug(e.target.value)}
                    sx={{ marginBottom: 2 }}
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
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <TextField
                    id="status"
                    value={status || 'Status value'}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{ marginBottom: 2 }}
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
                  <TextField
                    id="webhook"
                    value={webhook || 'Webhook value'}
                    onChange={(e) => setWebhook(e.target.value)}
                    sx={{ marginBottom: 2 }}
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
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <TextField
                    id="text"
                    value={text || 'Text value'}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ marginBottom: 2 }}
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
                <Box sx={{ width: '50%' }}>
                  <TextField
                    id="blob"
                    value={blob || 'Blob value'}
                    onChange={(e) => setBlob(e.target.value)}
                    sx={{ marginBottom: 2 }}
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
                      width: { xs: '100%' },
                    }}
                    disabled={loading}
                  >
                    Create
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

export default SlideRegistryCreate;