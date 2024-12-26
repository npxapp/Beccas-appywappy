import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import CreditScoreTwoToneIcon from '@mui/icons-material/CreditScoreTwoTone';
import ElectricBoltTwoToneIcon from '@mui/icons-material/ElectricBoltTwoTone';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useDynamicPagesContent } from './parts/Utils/DynamicPagesContent';

import '../App.css';
import '../Page.css';
import '../Fonts.css';

const Demo = () => {
  const navigate = useNavigate();
  const allCards = useDynamicPagesContent('card');
  // Filter cards where slug equals "pro"
  const cards = allCards.filter(card => card.slug === 'demo');
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

    switch (card.asset_status.toLowerCase()) {
      case 'pop':
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
                  background: 'transparent',
                }),
              }}
            />
          </Card>
        );

      case 'hero':
        return (
          <Card key={cardId}>
            <CardHeader
              title={card.text}
              action={renderIcon(card.asset_status)}
            />
            <CardContent>
              <Button
                variant="outlined"
                onClick={() => navigateFunc(card.text, card.webhook)}
                className="demo-button"
              >
                {card.text}
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {cards.map((card, index) => renderCard(card, index))}
    </Box>
  );
};

export default Demo;