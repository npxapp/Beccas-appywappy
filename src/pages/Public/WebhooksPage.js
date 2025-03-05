// pages/WebhooksPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import WebhookOutlinedIcon from '@mui/icons-material/WebhookOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const WEBHOOK_FEATURES = (
  <List>
    <ListItem sx={{ pt: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ color: '#fff', fontWeight: 600 }}
      >
        API Only
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

const WebhooksPage = () => {

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
          text="Webhooks and event notifications"    
          icon={WebhookOutlinedIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={WEBHOOK_FEATURES}
      />
    </Box>
  );
};

export default WebhooksPage;