// ./src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import LockOpenIcon from '@mui/icons-material/LockOpen'; // /auth/register
import PasswordIcon from '@mui/icons-material/Password'; // /auth/reset-password
import GppGoodIcon from '@mui/icons-material/GppGood'; // /auth/activate
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'; // /create-user
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // /edit-user
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // /user
import AddCardIcon from '@mui/icons-material/AddCard'; // /card/add
import EditIcon from '@mui/icons-material/Edit'; // /account/edit
import GroupsIcon from '@mui/icons-material/Groups'; // /user-teams
import DashboardIcon from '@mui/icons-material/Dashboard'; // /dashboard
import AssignmentIcon from '@mui/icons-material/Assignment'; // /plan
import GroupIcon from '@mui/icons-material/Group'; // /teams
import AssessmentIcon from '@mui/icons-material/Assessment'; // /DashboardTest
import { BasicCard, PremiumCard, ProCard } from 'pages/Public/components/PaywallCards';
import SubscriptionAccordion from 'pages/Public/components/SubscriptionAccordion';

const HomePage = () => {
  const navigate = useNavigate();

  const navigateOpen = (url) => {
    navigate(url);
  };

  const routerMenuItems = [
    { icon: LockOpenIcon, text: 'Auth', color: '#FF6B6B', path: '/auth/register' },
    { icon: PasswordIcon, text: 'Reset', color: '#4ECDC4', path: '/auth/forgot-password' },
    { icon: GppGoodIcon, text: 'Activate', color: '#45B7D1', path: '/auth/login' },
    { icon: PersonAddAlt1Icon, text: 'Create', color: '#96CEB4', path: '/create-user' },
    { icon: ManageAccountsIcon, text: 'Edit', color: '#FFEEAD', path: '/user/edit' },
    { icon: AccountCircleIcon, text: 'User', color: '#D4A5A5', path: '/users' },
    { icon: AddCardIcon, text: 'Cards', color: '#9B59B6', path: '/card/add' },
    { icon: EditIcon, text: 'Account', color: '#FFD93D', path: '/account/edit' },
    { icon: GroupsIcon, text: 'People', color: '#6C5B7B', path: '/user-teams' },
    { icon: DashboardIcon, text: 'Dashboard', color: '#FF6B6B', path: '/dashboard' },
    { icon: AssignmentIcon, text: 'Plans', color: '#4ECDC4', path: '/plan' },
    { icon: GroupIcon, text: 'Teams', color: '#45B7D1', path: '/teams' },
    { icon: AssessmentIcon, text: 'Reports', color: '#96CEB4', path: '/DashboardTest' },
  ];

  const cardMappings = [
    {
      title: 'Focus on same syntax principle',
      action: <AppShortcutIcon />,
      buttonPath: '/',
      buttonText: 'Learn More',
      hasInnerBox: false,
    },
    {
      title: 'Starter software',
      action: <CloudIcon />,
      buttonPath: '/',
      buttonText: 'Learn More',
      hasInnerBox: false,
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        background: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
          mb: 4,
        }}
      >
        <Grid container spacing={2}>
          {routerMenuItems.map((item, index) => (
            <Grid
              item
              xs={4}
              sm={3}
              md={2}
              lg={2}
              xl={2}
              key={index}
            >
              <IconButton
                onClick={() => navigateOpen(item.path)}
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '50%',
                  aspectRatio: '1 / 1',
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
                <item.icon sx={{ fontSize: 32, color: item.color, mb: 1 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </Typography>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          width: {
            xs: '100%',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
          mb: 4,
        }}
      >
        <BasicCard />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          mb: 4,
          width: {
            xs: '100%',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        }}
      >
        <SubscriptionAccordion />
      </Box>

      <Box
        sx={{
          width: {
            xs: '100%',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
          mb: 4,
        }}
      >
        <PremiumCard />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: {
            xs: '100%',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
          mb: 2,
        }}
      >
        {cardMappings.map((card) => (
          <Card key={card.title}>
            <CardHeader title={card.title} action={card.action} />
            <CardContent>
              <Button
                variant="contained"
                onClick={() => navigateOpen(card.buttonPath)}
                sx={{
                  background: 'rgba(97,218,251,0.2)',
                  textTransform: 'none',
                  color: '#ffffff',
                }}
              >
                {card.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          width: {
            xs: '100%',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
          mb: 4,
        }}
      >
        <ProCard />
      </Box>
    </Box>
  );
};

export default HomePage;