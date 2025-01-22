import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Card,
  CardContent,
  CardHeader,
  Drawer,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import { useDarkMode } from '../contexts/DarkMode';
import CreditScoreTwoToneIcon from '@mui/icons-material/CreditScoreTwoTone';
import ElectricBoltTwoToneIcon from '@mui/icons-material/ElectricBoltTwoTone';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDynamicPagesContent } from './Utils/DynamicPagesContent';

import '../App.css';
import '../Fonts.css';

const Pro = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const { darkMode } = useDarkMode();
  const [buttonAnimationKeys, setButtonAnimationKeys] = useState({});
  const [animationState, setAnimationState] = useState(false);
  const [globalAnimationKey, setGlobalAnimationKey] = useState(0);

  const triggerVibration = () => {
    navigator.vibrate?.(35);
  };

  useEffect(() => {
    setDrawerOpen(true);
  }, []);

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleButtonPress = (value) => {
    let newCode = inputCode + value.toString();

    triggerVibration();

    // Increment the specific button's animation key
    setButtonAnimationKeys((prev) => ({
      ...prev,
      [value]: (prev[value] || 0) + 1,
    }));

    if (newCode === '4242') {
      handleCloseDrawer();
      setAnimationState(false);
      setInputCode('');
      return;
    }

    setInputCode(newCode);
  };

  useEffect(() => {
    if (inputCode.length === 4) {
      setGlobalAnimationKey((prev) => prev + 1);
      setAnimationState(true);
      setInputCode('');
    }
  }, [inputCode]);

  
  const navigate = useNavigate();
  const allCards = useDynamicPagesContent('card');
  // Filter cards where slug equals "pro"
  const cards = allCards.filter(card => card.slug === 'Pro');
  const [openCards, setOpenCards] = useState({});

  const handleToggle = (cardId) => {
    setOpenCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };
  
  const navigateOpen = (header, url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const navigateRoute = (header, url) => {
    navigate(url);
  };

  const iconMap = {
    'CreditScoreTwoToneIcon': CreditScoreTwoToneIcon,
    'ElectricBoltTwoToneIcon': ElectricBoltTwoToneIcon,
    'SentimentSatisfiedTwoToneIcon': SentimentSatisfiedTwoToneIcon
  };

  const renderIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon /> : null;
  };

  const renderCard = (card, index) => {
    const cardId = `${card.type}-${index}`;
    const navigateFunc = card.webhook?.includes('http') ? navigateOpen : navigateRoute;

    switch (card.type.toLowerCase()) {
      case 'page':
        const isCardOpen = openCards[cardId] || false;
        return (
          <Card
            key={cardId}
            variant="demo"
            sx={{
              height: isCardOpen ? 'auto' : 350,
              ...(isCardOpen && {
                animation: 'bounce 0.2s ease',
              }),
            }}
          >
            <CardHeader
              variant="demo"
              title={card.name}
              action={
                <IconButton onClick={() => handleToggle(cardId)}>
                  <ExpandMoreIcon variant="expand" />
                </IconButton>
              }
            />
            <CardContent variant="demo">
              {card.text}
            </CardContent>
            <Paper
              variant="fade"
              sx={{
                ...(isCardOpen && {
                  display: 'none',
                }),
              }}
            />
          </Card>
        );

      case 'post':
        return (
          <Card key={cardId}>
            <CardHeader
              title={card.slug}
              action={renderIcon(card.icon)}
            />
            <CardContent>
              <Button
                variant="outlined"
                onClick={() => navigateFunc(card.text, card.webhook)}
                className="demo-button"
              >
                {card.name}
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
        <Drawer
          anchor="top"
          open={drawerOpen}
          variant="temporary"
          onClose={handleCloseDrawer}
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100vh',
          }}
          PaperProps={{
            sx: {
              backgroundColor: darkMode ? 'rgba(0, 0, 0, 1) !important' : 'rgba(255, 255, 255, 1) !important',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            {[
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              ['*', 0, '#'],
            ].map((row, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  my: 1,
                }}
              >
                {row.map((value) => {
                  const individualAnimation = buttonAnimationKeys[value]
                    ? `pulse-button-${buttonAnimationKeys[value]}`
                    : '';
                  const globalAnim = animationState
                    ? `pulse-global-${globalAnimationKey}`
                    : '';
                  const combinedAnimation = globalAnim || individualAnimation;

                  return (
                    <Button
                      key={value}
                      variant="outlined"
                      sx={{
                        backgroundColor: 'rgba(97, 218, 251, .2)',
                        '&:active': { backgroundColor: 'rgba(97, 218, 251, .6)' },
                        '&:hover': { backgroundColor: 'rgba(97, 218, 251, .6)' },
                        '&:focus': { animation: 'pulse 2.5s' },
                        color: darkMode ? '#61dafb' : '#007fff',
                        fontSize: 'clamp(1rem, 6vh, 2rem)',
                        borderRadius: '50%',
                        height: 60,
                        border: '1px solid #61dafb',
                        width: 60,
                        mx: 1,
                        animation: combinedAnimation
                          ? `${combinedAnimation} 2.5s`
                          : 'none',
                      }}
                      onClick={() => handleButtonPress(value)}
                    >
                      {value}
                    </Button>
                  );
                })}
              </Box>
            ))}
            <style jsx>{`
              ${[...Array(100)]
                .map(
                  (_, i) => `
                @keyframes pulse-button-${i} {
                  0% {
                    background-color: rgba(97, 218, 251, .2);
                  }
                  20% {
                    background-color: rgba(97, 218, 251, .6);
                  }
                  100% {
                    background-color: rgba(97, 218, 251, .2);
                  }
                }
                @keyframes pulse-global-${i} {
                  0% {
                    background-color: rgba(97, 218, 251, .2);
                  }
                  20% {
                    background-color: rgba(97, 218, 251, .6);
                  }
                  100% {
                    background-color: rgba(97, 218, 251, .2);
                  }
                }
              `
                )
                .join('\n')}
            `}</style>
          </Box>
        </Drawer>
  
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '100%',
            paddingBottom: 4,
          }}
        >
          {cards.map((card, index) => renderCard(card, index))}
        </Box>
    </>
  );
};

export default Pro;