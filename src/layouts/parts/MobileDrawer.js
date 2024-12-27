import React, { useState } from 'react';
import {
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import { useDashboardDrawer } from '../../contexts/DashboardDrawerContext';
import { useDarkMode } from '../../contexts/DarkMode';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';
import { useNavigationLinks } from './Utils/DynamicMobileDrawerLinks';

const MobileDrawer = ({ open, toggleDrawer }) => {
  const { toggleDashboardDrawer } = useDashboardDrawer();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  // Change from single value to Set to track multiple expanded panels
  const [expandedPanels, setExpandedPanels] = useState(new Set());
  const theme = useTheme();

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    if (darkMode) {
      // In dark mode, handle multiple expansions
      setExpandedPanels(prev => {
        const newSet = new Set(prev);
        if (isExpanded) {
          newSet.add(panel);
        } else {
          newSet.delete(panel);
        }
        return newSet;
      });
    } else {
      // In light mode, maintain single expansion behavior
      setExpandedPanels(new Set(isExpanded ? [panel] : []));
    }
  };

  const navigateOpen = (path) => {
    if (path === 'toggleDashboardDrawer') {
      toggleDashboardDrawer();
    } else {
      navigate(path);
      toggleDrawer();
    }
  };

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const links = useNavigationLinks();  

  const summaryLinksMap = links.reduce((acc, link) => {
    if (!acc[link.summary]) {
      acc[link.summary] = [];
    }
    acc[link.summary].push(link);
    return acc;
  }, {});

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      PaperProps={{
        sx: {
          zIndex: 1400,
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex', 
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'initial',
          transition: 'transform 1s ease',
        }}
      >
        {Object.entries(summaryLinksMap).map(([summary, summaryLinks], index) => {
          const panelId = summary.toLowerCase().replace(/\s+/g, '');
          return (
            <Accordion
              key={`accordion-${summary}`}
              expanded={expandedPanels.has(panelId)}
              onChange={handleAccordionChange(panelId)}
              variant="panel"
              disableGutters
            >
              <AccordionSummary variant="panel">
                {expandedPanels.has(panelId) ? (
                  <KeyboardArrowDownIcon variant="arrowIcon" />
                ) : (
                  <KeyboardArrowRightIcon variant="arrowIcon" />
                )}
                <Typography variant="customPanel">
                  {summary}
                </Typography>
              </AccordionSummary>

              {summaryLinks.map((link, linkIndex) => (
                <AccordionDetails
                  key={`accordion-detail-${summary}-${linkIndex}`}
                  variant="panel"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography
                    variant="customPanel"
                    onClick={
                      link.label === 'Github projects we source'
                        ? () => navigatePage('https://github.com/npxapp/npx-app')
                        : link.path === 'toggleDashboardDrawer'
                        ? toggleDashboardDrawer
                        : () => navigateOpen(link.path)
                    }
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    {link.label}
                    {link.label === 'Github projects we source' && (
                      <GitHubIcon variant="customIcon" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                </AccordionDetails>
              ))}
            </Accordion>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;