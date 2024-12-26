import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Slide,
  Button,
  TextField,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useDarkMode } from '../../contexts/DarkMode';
import { useRegistry } from '../../contexts/RegistryContext';
import { useSlide } from '../../contexts/SlideContext';

const SlideRegistryUpdate = () => {
  const { darkMode } = useDarkMode();
  const [updateFields, setUpdateFields] = useState({
    name: '',
    type: '',
    slug: '',
    asset_status: '',
    webhook: '',
    text: '',
    blob: '',
  });

  const {
    registries,
    setRegistries,
    selectedRegistry,
  } = useRegistry();

  const {
    loading,
    setLoading,
    activeSlide,
    setActiveSlide,
    setPreviousSlide,
  } = useSlide();

  const handleBack = (slide) => () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(slide);
  };

  const handleUpdateAsset = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/npx/registry/update/${selectedRegistry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateFields),
      });

      if (response.ok) {
        // Update the registries list with the updated asset
        const updatedRegistries = registries.map((reg) =>
          reg.id === selectedRegistry.id ? { ...reg, ...updateFields } : reg
        );
        setRegistries(updatedRegistries);
        handleBack(5)(); // Return to DataGrid
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFieldChange = (field) => (event) => {
    setUpdateFields((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  React.useEffect(() => {
    // Populate update fields when the component mounts for slide 7
    if (activeSlide === 7 && selectedRegistry) {
      setUpdateFields({
        name: selectedRegistry.name || '',
        type: selectedRegistry.type || '',
        slug: selectedRegistry.slug || '',
        asset_status: selectedRegistry.asset_status || '',
        webhook: selectedRegistry.webhook || '',
        text: selectedRegistry.text || '',
        blob: selectedRegistry.blob || '',
      });
    }
  }, [activeSlide, selectedRegistry]);

  return (
    <>
      {/* Slide 7: Update Registry Record */}
      <Slide direction="right" in={activeSlide === 7} mountOnEnter unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <IconButton onClick={handleBack(5)}>
            <ArrowForwardIcon sx={{ color: '#61dafb' }} />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100vh',
            }}
          >
            <Typography variant="h6" sx={{ color: '#61dafb' }}>
              Assets Registry Update Record
            </Typography>
          </Box>
          {loading ? (
            <CircularProgress sx={{ color: darkMode ? '#61dafb' : '#007fff' }} />
          ) : (
            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {Object.entries(updateFields).map(([field, value]) => (
                <TextField
                  key={field}
                  id={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalizes the first letter of the field name
                  value={value}
                  onChange={handleUpdateFieldChange(field)}
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
              ))}

              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={handleUpdateAsset}
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
                  Update
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Slide>
    </>
  );
};

export default SlideRegistryUpdate;