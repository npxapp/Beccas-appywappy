import React, { useState } from 'react';
import { Drawer as MUIDrawer, Accordion, AccordionSummary, AccordionDetails, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDarkMode } from '../../contexts/DarkMode';
import GettingStarted from './parts/GettingStarted';
import DashboardDemo from './parts/DashboardDemo';
import Demo from './parts/Demo';
import Integrations from './parts/Integrations';
import ExperimentalApis from './parts/ExperimentalApis';
import {
  DrawerStyles, 
} from './parts/DrawerStyles';

const Drawer = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [expanded, setExpanded] = useState([]);

  const navigateOpen = (path) => {
    navigate(path);
    toggleDrawer(false);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => {
      if (isExpanded) {
        return [...prevExpanded, panel];
      } else {
        return prevExpanded.filter((item) => item !== panel);
      }
    });
  };

  return (
  <>
    <MUIDrawer
      variant="temporary"
      anchor="left" 
      open={open} 
      onClose={() => toggleDrawer(false)}
      PaperProps={{
        sx: {
          height: '100vh',
          boxShadow: 'none',
          backgroundColor: darkMode ? 'rgba(97, 218, 251, 0.7) !important' : 'rgba(255, 255, 255, 1) !important',
        },
      }}
    >
      <GettingStarted 
        expanded={expanded} 
        handleAccordionChange={handleAccordionChange} 
      />
  
      <Demo 
        expanded={expanded} 
        handleAccordionChange={handleAccordionChange} 
      />
  
      <Integrations
        expanded={expanded} 
        handleAccordionChange={handleAccordionChange} 
      />
  
      <ExperimentalApis
        expanded={expanded} 
        handleAccordionChange={handleAccordionChange} 
      />
    </MUIDrawer>
      <style>
        {`
          @keyframes holographicSweep {
            0% {
              transform: rotate(0deg) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: rotate(180deg) scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: rotate(360deg) scale(1);
              opacity: 0.6;
            }
          }
          @keyframes scanLines {
            0%, 100% {
              opacity: 0.2;
              background-position: 0 0;
            }
            50% {
              opacity: 0.4;
              background-position: 0 -10px;
            }
          }
        `}
      </style>
  </>
  );
};

export default Drawer;