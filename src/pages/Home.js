// ./src/pages/Home.js
import React from 'react';
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
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import ApiIcon from '@mui/icons-material/Api';
import WebhookIcon from '@mui/icons-material/Webhook';
import LinkIcon from '@mui/icons-material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AccordionContentByTerms from './components/AccordionContentByTerms';
import { useAccordionContext } from '../contexts/AccordionContext'; // Import the context
import { BasicCard, PremiumCard, ProCard } from './components/PaywallCards';

const Home = () => {
  const navigate = useNavigate();
  const { expanded, handleChange } = useAccordionContext(); // Use context here

  const navigateOpen = (url) => {
    navigate(url);
  };

  const accordionItems = [
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
    <Box sx={{
      width: '100%',
      maxWidth: '1200px',
      mx: 'auto',
      p: 0,
      background: '#000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box sx={{ mb: 4, width: { xs: '100%', sm: 280, } }}>
        <BasicCard />
      </Box>
  
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          width: '100%',
        }}
      >
        <AccordionContentByTerms postType="page"/>
      </Box>

      {/* PEOPLE ACCORDION MAPPING PREBUILT SHOULD BE HERE */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          width: '100%',
        }}
      >
        {accordionItems.map((item) => {
          if (item.title === 'People') {
            return (
              <Accordion
                key={item.id}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
                sx={{
                  width: '100%',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {item.icon}
                    <Typography variant="h6">
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
            );
          }
          return null;
        })}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          width: '100%',
        }}
      >
        <AccordionContentByTerms postType="post"/>
      </Box>

      {/* API ACCORDION MAPPING PREBUILT SHOULD BE HERE */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          width: '100%',
          mb: 4,
        }}
      >
        {accordionItems.map((item) => {
          if (item.title === 'APIs') {
            return (
              <Accordion
                key={item.id}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
                sx={{
                  width: '100%',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {item.icon}
                    <Typography variant="h6">
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
            );
          }
          return null;
        })}
      </Box>
  
      <Box sx={{ mb: 4, width: { xs: '100%', sm: 280, } }}>
        <PremiumCard />
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        {cardMappings.map((card) => (
          <Card key={card.title}>
            <CardHeader title={card.title} action={card.action} />
            <CardContent>
              <Button
                variant="contained"
                onClick={() => navigateOpen(card.buttonPath)}
                sx={{
                  background: 'rgba(97,218,251,0.2)',
                  textTransform: 'none',
                  color: '#ffffff',
                }}
              >
                {card.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
  
      <Box sx={{ mb: 4, width: { xs: '100%', sm: 280, } }}>
        <ProCard />
      </Box>
  
    </Box>
  );
};

export default Home;