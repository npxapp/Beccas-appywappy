// pages/SubscriptionsPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const SUBSCRIPTION_FEATURES = (
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
      <Typography color="text.primary">subscription creation</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">plan change</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">subscription cancel</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">subscription re-enable</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        subscription handling via Stripe customer portal
      </Typography>
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

const SubscriptionsPage = () => {

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
          text="Subscription plans and management"    
          icon={SubscriptionsOutlinedIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={SUBSCRIPTION_FEATURES}
      />
    </Box>
  );
};

export default SubscriptionsPage;