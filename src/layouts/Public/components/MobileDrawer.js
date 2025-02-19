// layouts/components/MobileDrawer.js
import React from 'react';
import { Drawer, Box } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useDashboardDrawer } from 'contexts/DashboardDrawerContext';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';

const ICON_MAPPING = {
  'GitHubIcon': GitHubIcon
};

const MobileDrawer = ({ open, toggleDrawer }) => {
  const { toggleDashboardDrawer } = useDashboardDrawer();
  const navigate = useNavigate();
  const theme = useTheme();

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path === 'toggleDashboardDrawer') {
      toggleDashboardDrawer(true);
    } else {
      navigate(path);
      toggleDrawer();
    }
  };

  const navigationMap = {
    '1-1': '/overview',
    '1-2': 'https://github.com/yourusername',
    '2-1': '/auth/register',
    '2-2': '/auth/forgot-password',
    '2-3': '/auth/resend-activation',
    '2-4': '/auth/login',
    '3-1': '/teams',
    '3-2': '/user-teams',
    '4-1': '/user/edit',
    '4-2': '/account/edit',
    '4-3': '/users',
    '4-4': '/create-user',
    '5-1': '/plan',
    '5-2': '/card/add'
  };

  const handleSelect = (event, itemId) => {
    const pathOrUrl = navigationMap[itemId];
    if (pathOrUrl) {
      if (pathOrUrl.startsWith('http')) {
        navigatePage(pathOrUrl);
      } else {
        navigateOpen(pathOrUrl);
      }
    }
  };

  const renderTreeItemLabel = (label, icon) => {
    if (icon && ICON_MAPPING[icon]) {
      const Icon = ICON_MAPPING[icon];
      return (
        <>
          {label} <Icon />
        </>
      );
    }
    return label;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      PaperProps={{
        sx: {
          zIndex: 1400,
          height: '100vh',
          width: '100vw',
          borderRadius: 0,
          background: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'initial',
          transition: 'transform 1s ease',
        }}
      >
        <SimpleTreeView onItemClick={handleSelect}>
          <TreeItem itemId="1" label="Overview">
            <TreeItem itemId="1-1" label="Overview" />
            <TreeItem 
              itemId="1-2" 
              label={renderTreeItemLabel("GitHub repositories we source", "GitHubIcon")} 
            />
          </TreeItem>

          <TreeItem itemId="2" label="Getting started">
            <TreeItem itemId="2-1" label="Starter saas signup"/>
            <TreeItem itemId="2-2" label="Change password" />
            <TreeItem itemId="2-3" label="Send activation" />
            <TreeItem itemId="2-4" label="Starter login" />
          </TreeItem>
          
          <TreeItem itemId="3" label="Discover more">
            <TreeItem itemId="3-1" label="Control your teams" />
            <TreeItem itemId="3-2" label="Discover teams page" />
          </TreeItem>
          
          <TreeItem itemId="4" label="Subscribers">
            <TreeItem itemId="4-1" label="Subscriber profile" />
            <TreeItem itemId="4-2" label="Subscriber account" />
            <TreeItem itemId="4-3" label="Subscriber users management" />
            <TreeItem itemId="4-4" label="Create a new user" />
          </TreeItem>
  
          <TreeItem itemId="5" label="Subscriptions">
            <TreeItem itemId="5-1" label="Subscriber plans" />
            <TreeItem itemId="5-2" label="Add a card" />
          </TreeItem>
  
        </SimpleTreeView>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;