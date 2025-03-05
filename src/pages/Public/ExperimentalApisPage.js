// pages/ExperimentalApisPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const EXPERIMENTAL_API_FEATURES = (
  <List>
    <ListItem>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600 }}
      >
        Experimental APIs
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">Beta features in active development</Typography>
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
      <Typography color="text.primary">/api/v2/stripe/plans/compare - GET</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/subscriptions/pause - POST</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/subscriptions/resume - POST</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/customers/me/usage - GET</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/customers/me/payment-history - GET</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/customers/me/tax-id - POST</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/create-payment-element - POST</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/wallets - GET</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/wallets - PUT</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/create-upgrade-checkout-session - POST</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/create-billing-portal-session - POST</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/api/v2/stripe/webhook/customer-events - POST</Typography>
    </ListItem>
  </List>
);

const ExperimentalApisPage = () => {

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
          text="Experimental APIs and beta features"    
          icon={ScienceOutlinedIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={EXPERIMENTAL_API_FEATURES}
      />
    </Box>
  );
};

export default ExperimentalApisPage;