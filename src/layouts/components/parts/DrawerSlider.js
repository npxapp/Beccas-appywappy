import React, { useState } from 'react';
import { 
  Button, 
  Box, 
  Drawer, 
  IconButton, 
  Typography, 
  TextField 
} from '@mui/material';
import { useDarkMode } from '../../../contexts/DarkMode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import MoodBadTwoToneIcon from '@mui/icons-material/MoodBadTwoTone';
import { 
  popupStyle, 
  iconStyle 
} from '../styles';
import {
  useTheme,
} from '@mui/material/styles';
import { useNavigationLinks } from '../../parts/Utils/DynamicMobileDrawerLinks';
import { useLocation } from 'react-router-dom';

const DrawerSlider = () => {
  const { darkMode } = useDarkMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [formData, setFormData] = useState({
    message: '',
    phoneNumber: ''
  });
  const [submissionState, setSubmissionState] = useState('form');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const theme = useTheme();
  const content = useNavigationLinks('footer');
  const location = useLocation();
  const isHomePage = location.pathname === '/' || 'DashboardPage';

  const handleButtonClick = (path) => {
    setSelectedFilter(path);
    setSelectedPath(path);
    setIsDrawerOpen(true);
    setSubmissionState('form');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/npx/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmissionState('success');
        
        setTimeout(() => {
          setIsDrawerOpen(false);
        }, 3000);
      } else {
        setSubmissionState('error');
        
        setTimeout(() => {
          setSubmissionState('form');
        }, 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionState('error');
      
      setTimeout(() => {
        setSubmissionState('form');
      }, 5000);
    }
  };

  const renderDrawerContent = () => {
    const selectedContent = content.find(item => item.path === selectedPath);
    
    if (selectedContent?.path === '/contact') {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            padding: 2,
          }}
        >
          <Box sx={popupStyle(isAnimatingOut, darkMode)}>
            <IconButton
              variant="panel"
              onClick={() => {
                setIsAnimatingOut(true);
                setTimeout(() => {
                  setIsDrawerOpen(false);
                  setIsAnimatingOut(false);
                }, 300);
              }}
              sx={{ 
                alignSelf: 'flex-end', 
                position: 'absolute',
                top: 20,
                right: 20,
              }}
            >
              <KeyboardArrowDownIcon variant="arrowIcon"/>
            </IconButton>

            {submissionState === 'form' && (
              <Box 
                component="form" 
                onSubmit={handleSubmit} 
                sx={{ 
                  width: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2,
                  height: '100%',
                  justifyContent: 'center' 
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      backgroundColor: darkMode ? 'white' : 'inherit',
                      color: darkMode ? 'black' : 'inherit',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="phoneNumber"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      backgroundColor: darkMode ? 'white' : 'inherit',
                      color: darkMode ? 'black' : 'inherit',
                    },
                  }}
                />
                
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    type="submit"
                    sx={{
                      color: darkMode ? 'white' : 'inherit',
                    }}
                  >
                    Send Text
                  </Button>
                </Box>
              </Box>
            )}

            {submissionState === 'success' && (
              <Box sx={iconStyle(submissionState, darkMode)}>
                <CheckCircleOutlineTwoToneIcon 
                  sx={{ 
                    color: '#61dafb', 
                    fontSize: 80
                  }} 
                />
              </Box>
            )}

            {submissionState === 'error' && (
              <Box sx={iconStyle(submissionState, darkMode)}>
                <MoodBadTwoToneIcon 
                  sx={{ 
                    color: '#61dafb', 
                    fontSize: 80
                  }} 
                />
              </Box>
            )}
          </Box>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: 2,
          position: 'relative',
        }}
      >
        <IconButton
          variant="footer"
          onClick={() => setIsDrawerOpen(false)}
          sx={{ 
            alignSelf: 'flex-end',
          }}
        >
          <KeyboardArrowDownIcon variant="customIcon"/>
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontSize: '1.25rem',
          }}
        >
          {selectedPath || 'No Path Selected'}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.875rem',
            textAlign: 'center',
            maxWidth: '80%',
            whiteSpace: 'pre-line',
          }}
        >
          {selectedContent?.label || 'No content available for this path.'}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        gap: 3,
        justifyContent: {
          xs: 'flex-start',
          sm: 'center',
        },
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      {content.map((item) => (
        <Button
          key={item.path}
          variant='filterButton'
          onClick={() => handleButtonClick(item.path)}
          className={selectedFilter === item.path ? 'Mui-selected' : ''}
          sx={{
            color: isHomePage ? 'white' : 'initial',
          }}
        >
          {item.path.slice(1)}
        </Button>
      ))}

      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9) !important',
          },
        }}
        PaperProps={{
          sx: {
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        {renderDrawerContent()}
      </Drawer>
    </Box>
  );
};

export default DrawerSlider;