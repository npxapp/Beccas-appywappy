import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  GlobalStyles,
} from '@mui/material';
import { SlideProvider } from '../contexts/SlideContext';
import { ReportProvider } from '../contexts/ReportContext';
import { DataProvider } from '../contexts/DataContext';
import CloudIcon from '@mui/icons-material/Cloud';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import PagesIcon from '@mui/icons-material/Pages';
import CodeIcon from '@mui/icons-material/Code';
import ApiIcon from '@mui/icons-material/Api';
import ArticleIcon from '@mui/icons-material/Article';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WebhookIcon from '@mui/icons-material/Webhook';
import LinkIcon from '@mui/icons-material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Home = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const navigateOpen = (url) => {
    navigate(url);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionItems = [
    {
      id: 'panel1',
      title: 'Pages',
      icon: <PagesIcon />,
      content: [
        { icon: <ArticleIcon />, text: 'Page 1' },
        { icon: <ArticleIcon />, text: 'Page 2' },
        { icon: <ArticleIcon />, text: 'Page 3' }
      ]
    },
    {
      id: 'panel2',
      title: 'People',
      icon: <PeopleIcon />,
      content: [
        { icon: <EmojiEmotionsIcon />, text: 'Profile' },
        { icon: <PersonIcon />, text: 'Friends' },
        { icon: <PersonAddIcon />, text: 'Add People' }
      ]
    },
    {
      id: 'panel3',
      title: 'Components',
      icon: <CodeIcon />,
      content: [
        { icon: <IntegrationInstructionsIcon />, text: 'Integrations' }
      ]
    },
    {
      id: 'panel4',
      title: 'APIs',
      icon: <ApiIcon />,
      content: [
        { icon: <WebhookIcon />, text: 'Webhooks' },
        { icon: <LinkIcon />, text: 'Endpoints' }
      ]
    }
  ];

  const cardMappings = [
    {
      title: 'Focus on same syntax principle',
      action: <AppShortcutIcon />,
      buttonPath: '/',
      buttonText: 'Learn More',
      hasInnerBox: false,
    },
    {
      title: 'Starter software',
      action: <CloudIcon />,
      buttonPath: '/',
      buttonText: 'Learn More',
      hasInnerBox: false,
    }
  ];

  return (
    <ReportProvider>
      <DataProvider>
        <SlideProvider>
          <Box sx={{
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            p: 3,
            background: '#000',
            minHeight: '100vh',
          }}>
            {/* Global Styles for animations */}
            <GlobalStyles
              styles={`
                @keyframes scanline {
                  0% {
                    transform: translateY(-100%);
                    background: linear-gradient(to bottom, rgba(97,218,251,0) 0%, rgba(97,218,251,0.1) 50%, rgba(97,218,251,0) 100%);
                  }
                  100% {
                    transform: translateY(100%);
                    background: linear-gradient(to bottom, rgba(97,218,251,0) 0%, rgba(97,218,251,0.1) 50%, rgba(97,218,251,0) 100%);
                  }
                }
                @keyframes holographic {
                  0% {
                    background-position: -200% 0;
                  }
                  100% {
                    background-position: 200% 0;
                  }
                }
                @keyframes glow {
                  0% {
                    text-shadow: 0 0 10px rgba(97,218,251,0.8);
                  }
                  50% {
                    text-shadow: 0 0 20px rgba(97,218,251,0.8), 0 0 30px rgba(97,218,251,0.4);
                  }
                  100% {
                    text-shadow: 0 0 10px rgba(97,218,251,0.8);
                  }
                }
              `}
            />

            {/* Accordion Section */}
            <Box sx={{ mb: 4 }}>
              {accordionItems.map((item) => (
                <Accordion
                  key={item.id}
                  expanded={expanded === item.id}
                  onChange={handleChange(item.id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 2
                    }}>
                      {item.icon}
                      <Typography 
                        variant="h6" 
                        sx={{ animation: 'glow 2s ease-in-out infinite' }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item.content.map((subItem, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 1.5,
                          cursor: 'pointer',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'rgba(97,218,251,0.1)',
                          },
                        }}
                      >
                        {subItem.icon}
                        <Typography>{subItem.text}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            {/* Card Section */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
              {cardMappings.map((card) => (
                <Card 
                  key={card.title}
                >
                  <CardHeader 
                    title={card.title} 
                    action={card.action} 
                  />
                  <CardContent>
                    <Button 
                      variant="contained"
                      onClick={() => navigateOpen(card.buttonPath)}
                      sx={{
                        background: 'rgba(97,218,251,0.2)',
                        '&:hover': {
                          background: 'rgba(97,218,251,0.3)',
                        }
                      }}
                    >
                      {card.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </SlideProvider>
      </DataProvider>
    </ReportProvider>
  );
};

export default Home;