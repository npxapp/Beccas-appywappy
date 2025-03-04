// components/elements/TemplateText
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import RocketIcon from '@mui/icons-material/Rocket';

export const HeroSection = () => {
  const navigate = useNavigate();

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path.startsWith('http')) {
      navigatePage(path);
    } else {
      navigate(path);
    }
  };
  
  return (
    <Box>
          <RocketIcon sx={{ fontSize: '6rem' }} />
          <Typography variant="h2" gutterBottom>
            We build Go / Node + React powered SaaS Templates
          </Typography>
          <Button
            onClick={() => navigateOpen('https://startersaas.pro/')}
            variant="contained"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              padding: '12px 24px',
              textTransform: 'none',
            }}
          >
            See in action
          </Button>
    </Box>
  );
};

export const LaunchSection = ({ color }) => {
  return (
    <Box>
      <Typography 
        paragraph
        color={color}
        sx={{
          textAlign: 'center',
          fontSize: '1.8rem',
        }}
      >
        Are you going to develop your next big SaaS thing? Save 3 months of development in 5 minutes of setup. A production ready SaaS composed by Go / Node API and a React frontend
      </Typography>
    </Box>
  );
};

export const FeaturesSection = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Powerful Built-In Features
      </Typography>
      <Typography variant="body1" paragraph>
        We focused only on setting up plans and collecting recurring subscription payments (3D secure enabled) with Stripe. Customers can subscribe, consume their trial period, change plan, cancel their subscription, update billing infos, add or remove credit cards, change locale. And everyone is notified by email.
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Accounts and subdomains</Typography> — Allow your users to create their subdomain based account and manage it easily.
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Subscriptions</Typography> — Setup plans and collect recurring subscription payments with Stripe in minutes.
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Trial</Typography> — No credit card required to start the trial period.
      </Typography>
    </Box>
  );
};

export const ComponentsSection = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Production Ready Components
      </Typography>
      <Typography variant="body1" paragraph>
        Starter SaaS ships in 2 versions: Go API (based on Gofiber) or Node API (based on Express) and a powerful React frontend
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Clean code</Typography> — Both APIs and frontend follow the most common patterns. Easy to understand and fast to customize. Go and Node APIs expose the same enpoint signature and the same response payload.
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Easy to customize</Typography> — Follow the online documentation to find out how to customize the starter and add new features easily.
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Background Tasks</Typography> — Scheduled tasks notify customers about successful and failed payments, expiring trials and new subscriptions.
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Payments</Typography> — Recurring payments made easy with Stripe integration and webhooks!
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Landing Page</Typography> — A responsive, easy-to-customize landing page template (see it in action)
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Pricing Page</Typography> — A stunning pricing page integrated directly into your application
      </Typography>
    </Box>
  );
};

export const LicenseSection = ({ color }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Typography 
        paragraph
        color={color}
        sx={{
          textAlign: 'center',
          fontSize: '1.8rem',
        }}
      >
        Clone the project and customize it as you wish. We release StarterSaaS with a permissive MIT license!
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        sx={{
          letterSpacing: '0.7px',
          fontSize: '1.8rem',
          textTransform: 'none',
          backgroundColor: color,
          color: 'primary.main',
        }}
      >
        Get the starters
      </Button>
    </Box>
  );
};

export const TechStackSection = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Production ready template
      </Typography>
      <Typography variant="body1" paragraph>
        This starter powers Articoli e Social, a subscription based content writing startup, and MenuClick24, a digital menu SaaS. Both in production!
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Database</Typography> — MongoDB.
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Go API</Typography> — Fiber - Gocron
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Node API</Typography> — Express - node-cron
      </Typography>
      
      <Typography variant="body1" paragraph>
        <Typography component="span" fontWeight="bold">Frontend</Typography> — React - react-query - react-hook-form - recoil - react-bootstrap - react-i18next
      </Typography>
    </Box>
  );
};

export const FeaturesListSection = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Focus on 80/20 principle
      </Typography>
      <Typography variant="body1" paragraph>
        Just few thing done right in a simpler way. From developers to developers. No teams management, no user invites, no fake dashboards with mocked charts! No useless features that nobody wants.
      </Typography>
      
      <Typography variant="subtitle1" fontWeight="bold">
        API and Frontend
      </Typography>
      <Box sx={{ typography: 'body2', lineHeight: 1.2 }}>
        <Typography variant="body2">user registration of account with subdomain, email and password</Typography>
        <Typography variant="body2">user email activation with 6 characters code and account creation</Typography>
        <Typography variant="body2">resend activation code if not received</Typography>
        <Typography variant="body2">user password reset through code sent by email</Typography>
        <Typography variant="body2">user login</Typography>
        <Typography variant="body2">user logout</Typography>
        <Typography variant="body2">user change password once logged in</Typography>
        <Typography variant="body2">account trial period</Typography>
        <Typography variant="body2">edit of account billing information</Typography>
        <Typography variant="body2">subscription creation</Typography>
        <Typography variant="body2">plan change</Typography>
        <Typography variant="body2">add new credit card</Typography>
        <Typography variant="body2">remove credit card</Typography>
        <Typography variant="body2">subscription cancel</Typography>
        <Typography variant="body2">subscription re enable</Typography>
        <Typography variant="body2">3D Secure ready payments</Typography>
        <Typography variant="body2">subscription handling via Stripe customer portal</Typography>
        <Typography variant="body2">account's users list (by admins only)</Typography>
        <Typography variant="body2">account's user create (by admins only)</Typography>
        <Typography variant="body2">account's user update (by admins only)</Typography>
        <Typography variant="body2">account's user delete (by admins only)</Typography>
      </Box>
      
      <Typography variant="subtitle1" fontWeight="bold" mt={2}>
        API only
      </Typography>
      <Box sx={{ typography: 'body2', lineHeight: 1.2 }}>
        <Typography variant="body2">account's users list (by account admins only)</Typography>
        <Typography variant="body2">account's user create (by account admins only)</Typography>
        <Typography variant="body2">account's user update (by account admins only)</Typography>
        <Typography variant="body2">stripe webhooks handling</Typography>
        <Typography variant="body2">events notifications by email: new user subscribed - successful payments - failed payments</Typography>
        <Typography variant="body2">daily notifications by email: expiring trials - failed payments - account suspension due to failed payments</Typography>
      </Box>
    </Box>
  );
};

export const SetupStepsSection = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Ready-To-Use Starter
      </Typography>
      <Typography variant="body1" paragraph>
        Choose the right stack for you SaaS
      </Typography>
      
      <Typography variant="h6" fontWeight="bold">
        Clone
      </Typography>
      <Typography variant="body1" paragraph>
        You get the full codebase so you can customise it to suit your requirements.
      </Typography>
      
      <Typography variant="h6" fontWeight="bold">
        Set up in minutes
      </Typography>
      <Typography variant="body1" paragraph>
        Follow the readme to configure your SaaS application in 5 minutes.
      </Typography>
      
      <Typography variant="h6" fontWeight="bold">
        Build
      </Typography>
      <Typography variant="body1" paragraph>
        Run your application and start adding your own features.
      </Typography>
      
      <Typography variant="h6" fontWeight="bold">
        Support
      </Typography>
      <Typography variant="body1" paragraph>
        One year of free updates, bug fixes and new features.
      </Typography>
    </Box>
  );
};

export const CallToActionSection = ({ color }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Typography 
        paragraph
        color={color}
        sx={{
          textAlign: 'center',
          fontSize: '1.8rem',
        }}
      >
        Kickstart Your SaaS App Today!
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        sx={{
          letterSpacing: '0.7px',
          fontSize: '1.8rem',
          textTransform: 'none',
          backgroundColor: color,
          color: 'primary.main',
        }}
      >
        Get the starters
      </Button>
    </Box>
  );
};

// Main component that combines all sections
export const SaasTemplate = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <HeroSection />
      <LaunchSection />
      <Box sx={{ my: 6 }}><FeaturesSection /></Box>
      <Box sx={{ my: 6 }}><ComponentsSection /></Box>
      <Box sx={{ my: 6 }}><LicenseSection /></Box>
      <Box sx={{ my: 6 }}><TechStackSection /></Box>
      <Box sx={{ my: 6 }}><FeaturesListSection /></Box>
      <Box sx={{ my: 6 }}><SetupStepsSection /></Box>
      <Box sx={{ my: 6 }}><CallToActionSection /></Box>
    </Box>
  );
};