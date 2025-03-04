// pages/DiscoverMorePage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const GETTING_STARTED_FEATURES = (
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
      <Typography color="text.primary">
        Clone the project and customize it as you wish. We release StarterSaaS with a permissive MIT license!
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        Production Ready Components
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        Easy to customize — Follow the online documentation to find out how to customize the starter and add new features easily.
      </Typography>
    </ListItem>
  </List>
);

const DiscoverMorePage = () => {

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
          text="Quick-start your SaaS development"    
          icon={RocketLaunchOutlinedIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={GETTING_STARTED_FEATURES}
      />
    </Box>
  );
};

export default DiscoverMorePage;