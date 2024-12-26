import React, { useEffect } from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Slide 
} from '@mui/material';

import { useDarkMode } from '../../contexts/DarkMode';
import { useRegistry } from '../../contexts/RegistryContext';
import { useSlide } from '../../contexts/SlideContext';

const SlideRegistryDelete = () => {
  const { darkMode } = useDarkMode();
  const {
    registries,
    setRegistries,
    selectedRegistry,
  } = useRegistry();
  
  const {
    setLoading, 
    activeSlide,
    setActiveSlide,
    setPreviousSlide 
  } = useSlide();

  useEffect(() => {
    const handleDelete = async () => {
      if (activeSlide === 8 && selectedRegistry) {
        try {
          setLoading(true);
          const response = await fetch(`/npx/registry/delete/${selectedRegistry.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          });

          if (response.ok) {
            // Refresh registries after successful deletion
            const updatedRegistries = registries.filter(reg => reg.id !== selectedRegistry.id);
            setRegistries(updatedRegistries);
            
            // Go back to registry list
            setPreviousSlide(activeSlide);
            setActiveSlide(5);
          }
        } catch (error) {
          console.error(`Error deleting asset: ${error.message}`);
        } finally {
          setLoading(false);
        }
      }
    };

    handleDelete();
  }, [activeSlide, selectedRegistry, registries, setRegistries, setLoading, setPreviousSlide, setActiveSlide]);
  
  return (
    <>
      {/* Slide 8: Delete Confirmation */}
      <Slide direction="left" in={activeSlide === 8} mountOnEnter unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '100vh',
            padding: 2
          }}
        >
          <Typography variant="h6" sx={{ color: '#61dafb', mb: 2 }}>
            Deleting Asset...
          </Typography>
          <CircularProgress sx={{ color: darkMode ? '#61dafb' : '#007fff' }} />
        </Box>
      </Slide>
    </>
  );
};

export default SlideRegistryDelete;