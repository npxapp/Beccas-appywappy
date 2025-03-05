import React from 'react';
import { IconButton, Typography, Box, Grid, Chip } from '@mui/material';

// Import icons
import GppGoodIcon from '@mui/icons-material/GppGood';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import ApiIcon from '@mui/icons-material/Api';
import HomeIcon from '@mui/icons-material/Home';
import WebhookIcon from '@mui/icons-material/Webhook';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CodeIcon from '@mui/icons-material/Code';
import TemplateIcon from '@mui/icons-material/AutoAwesome';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';
import ExploreIcon from '@mui/icons-material/Explore';

// Default menu items based on Footer paths - added visible boolean flag
const routerMenuItems = [
  { icon: HomeIcon, text: 'Home', color: '#3F51B5', path: '/', visible: true },
  { icon: GppGoodIcon, text: 'Getting Started', color: '#FF6B6B', path: '/getting-started', visible: true },
  { icon: AddCardIcon, text: 'Add Card', color: '#4ECDC4', path: '/add-card', visible: true },
  { icon: LoginIcon, text: 'Login', color: '#45B7D1', path: '/login-page', visible: true },
  { icon: DashboardIcon, text: 'Overview', color: '#96CEB4', path: '/overview', visible: true },
  { icon: VisibilityIcon, text: 'Overview Alt', color: '#96CEB4', path: '/overview-alt', visible: true },
  { icon: GroupsIcon, text: 'Subscribers', color: '#FFEEAD', path: '/subscribers', visible: true },
  { icon: ManageAccountsIcon, text: 'Admin', color: '#D4A5A5', path: '/admin', visible: true },
  { icon: ExploreIcon, text: 'Discover', color: '#9B59B6', path: '/discover-more', visible: true },
  { icon: EditIcon, text: 'Subscriptions', color: '#FFD93D', path: '/subscriptions', visible: true },
  { icon: DashboardIcon, text: 'Dashboard', color: '#6C5B7B', path: '/dashboard-page', visible: true },
  { icon: GroupIcon, text: 'Routing', color: '#FF6B6B', path: '/routing-libraries', visible: true },
  { icon: AssignmentIcon, text: 'Plans', color: '#4ECDC4', path: '/plans', visible: true },
  { icon: WebhookIcon, text: 'Webhooks Usage', color: '#45B7D1', path: '/webhooks-usage', visible: true },
  { icon: AccountCircleIcon, text: 'Users', color: '#96CEB4', path: '/users-page', visible: true },
  { icon: GroupsIcon, text: 'Teams', color: '#FFEEAD', path: '/teams-page', visible: true },
  { icon: AlternateEmailIcon, text: 'Callbacks', color: '#D4A5A5', path: '/callbacks', visible: true },
  { icon: CreditCardIcon, text: 'Stripe', color: '#9B59B6', path: '/stripe-sessions', visible: true },
  { icon: TemplateIcon, text: 'Templates', color: '#FFD93D', path: '/templates', visible: true },
  { icon: ApiIcon, text: 'API Endpoints', color: '#3F51B5', path: '/api-endpoints', visible: true },
  { icon: CodeIcon, text: 'Experimental APIs', color: '#673AB7', path: '/experimental-apis', visible: true },
  { icon: WebhookIcon, text: 'Webhooks', color: '#6C5B7B', path: '/webhooks', visible: true },
  { icon: CreditCardIcon, text: 'Cards', color: '#FF6B6B', path: '/cards', visible: true },
  { icon: PaymentIcon, text: 'Payments', color: '#4ECDC4', path: '/payments', visible: true },
  { icon: AccessTimeIcon, text: 'Trials', color: '#45B7D1', path: '/trials', visible: true },
  { icon: IntegrationInstructionsIcon, text: 'Integrations', color: '#96CEB4', path: '/integrations', visible: true }
];

const IconGrid = ({ 
  items = routerMenuItems, 
  onItemClick,
  useTheme = true,
  color = "primary.main",
  backgroundColor = "transparent",
  iconFontSize = null,
  background = "rgba(255, 255, 255, 0.05)",
  borderRadius = "50%",
  padding = 0,
  gap = 0,
  containerProps = {},
  flexContainerProps = {},
  useChips = true
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100%',
        backgroundColor,
        ...containerProps?.sx
      }}
      {...containerProps}
    >
      <Box
        sx={{ width: { xs: '100%', }, ...flexContainerProps?.sx }}
        {...flexContainerProps}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {items.filter(item => item.visible).map((item, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: useChips ? 0.5 : 0
              }}
            >
              {useChips ? (
                <Chip
                  icon={<item.icon sx={{ 
                    color: useTheme ? item.color : color,
                    ...(iconFontSize && { fontSize: iconFontSize })
                  }} />}
                  label={item.text}
                  onClick={() => onItemClick && onItemClick(item.path)}
                  sx={{
                    backgroundColor: background,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'scale(1.02)',
                    },
                    '&:active': {
                      transform: 'scale(0.98)',
                    },
                  }}
                />
              ) : (
                <Grid container spacing={0}>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                      onClick={() => onItemClick && onItemClick(item.path)}
                      sx={{
                        background,
                        borderRadius,
                        padding,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          transform: 'scale(1.02)',
                        },
                        '&:active': {
                          transform: 'scale(0.98)',
                        },
                      }}
                    >
                      <item.icon 
                        sx={{ 
                          color: useTheme ? item.color : color,
                          ...(iconFontSize && { fontSize: iconFontSize })
                        }} 
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 500,
                        display: 'block',
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default IconGrid;

