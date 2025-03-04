// pages/TemplatesPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import TemplateOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const TEMPLATE_FEATURES = (
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
      <Typography color="text.primary">Production ready template</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Ready-To-Use Starter</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Set up in minutes</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Follow the readme to configure your SaaS application in 5 minutes.</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Build</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Run your application and start adding your own features.</Typography>
    </ListItem>
  </List>
);

const TemplatesPage = () => {

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
          text="Ready-to-use templates and components"    
          icon={TemplateOutlinedIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={TEMPLATE_FEATURES}
      />
    </Box>
  );
};

export default TemplatesPage;