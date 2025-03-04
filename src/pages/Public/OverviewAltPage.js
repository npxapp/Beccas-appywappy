// pages/OverviewAltPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const OVERVIEW_FEATURES = (
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
      <Typography color="text.primary">Database — MongoDB.</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Go API — Fiber - Gocron</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Node API — Express - node-cron</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Frontend — React - react-query - react-hook-form - recoil - react-bootstrap - react-i18next</Typography>
    </ListItem>
    <ListItem sx={{ pt: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ color: '#fff', fontWeight: 600 }}
      >
        API Only
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's users list (by account admins only)
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's user create (by account admins only)
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's user update (by account admins only)
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">stripe webhooks handling</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        events notifications by email: new user subscribed - successful payments - failed payments
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        daily notifications by email: expiring trials - failed payments - account suspension due to failed payments
      </Typography>
    </ListItem>
  </List>
);

const OverviewAltPage = () => {

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
          text="SaaS Platform Overview"    
          icon={ViewQuiltOutlinedIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={OVERVIEW_FEATURES}
      />
    </Box>
  );
};

export default OverviewAltPage;