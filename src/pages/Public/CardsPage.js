// ./src/pages/CardsPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const API_FRONTEND = (
  <List>
    <ListItem>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600 }}
      >
        API and Frontend
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">add new credit card</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">remove credit card</Typography>
    </ListItem>
  </List>
);

const CardsPage = () => {

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <TypeSection
        paddingY={10}
        paddingX={1}
        text={<HeroSection 
          text="Add cards to your subscriber profile"    
          icon={AddCardOutlinedIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={API_FRONTEND}
      />
    </Box>
  );
};

export default CardsPage;