// components/organisms/CollapseMenu.js
import React from 'react';
import { Collapse, Box } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

const MobileDrawer = ({ 
  in: isCollapseOpen = false, 
  sx = {
    width: '100%',
    zIndex: 1,
    color: 'text.primary',
  },
  toggleCollapseMenu,
  ...otherProps 
}) => {
  const navigate = useNavigate();

  const ICON_MAPPING = {
    'GitHubIcon': GitHubIcon
  };
  
  const navigationMap = {
    // Items in order of display
    '1-1': '/getting-started',
    '2-1': '/overview',
    '2-2': 'https://github.com/yourusername',
    '3-1': '/subscriptions',
    '3-2': '/dashboard',
    '3-3': '/routing-libraries',
    '3-4': '/plans',
    '3-5': '/webhooks-usage',
    '3-6': '/users',
    '4-1': '/add-card',
    '4-2': '/auth/login',
    '4-3': '/overview-alt',
    '4-4': '/subscribers',
    '4-5': '/admin',
    
    // Hidden items
    '5-1': '/teams',
    '5-2': '/callbacks',
    '5-3': '/stripe-sessions',
    '5-4': '/templates',
    '5-5': '/experimental-apis',
    '5-6': '/api-endpoints',
    '5-7': '/webhooks',
    '5-8': '/cards',
    '5-9': '/payments',
    '5-10': '/trials'
  };

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path === 'toggleCollapseMenu') {
      toggleCollapseMenu();
    } else {
      navigate(path);
      toggleCollapseMenu();
    }
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
    <Collapse
      in={isCollapseOpen}
      sx={{
        ...sx,
        width: sx.width || '100%',
        zIndex: sx.zIndex || 3000,
        color: sx.color || 'text.primary',
      }}
      {...otherProps}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'initial',
          transition: 'transform 1s ease',
        }}
      >
        <SimpleTreeView 
          onItemClick={handleSelect}
          sx={{ color: 'inherit' }}
        >
          {/* Getting started - first */}
          <TreeItem 
            itemId="1" 
            label="Getting started"
            sx={{ color: 'inherit', display: 'block' }}
          >
            <TreeItem 
              itemId="1-1" 
              label="signup"
              sx={{ color: 'inherit' }}
            />
          </TreeItem>
          
          {/* Overview - second */}
          <TreeItem 
            itemId="2" 
            label="Overview"
            sx={{ color: 'inherit', display: 'block' }}
          >
            <TreeItem 
              itemId="2-1" 
              label="Overview"
              sx={{ color: 'inherit' }}
            />
            <TreeItem 
              itemId="2-2" 
              label={renderTreeItemLabel("GitHub", "GitHubIcon")}
              sx={{ color: 'inherit' }}
            />
          </TreeItem>
          
          {/* Discover more - third */}
          <TreeItem 
            itemId="3" 
            label="Discover more"
            sx={{ color: 'inherit', display: 'block' }}
          >
            <TreeItem itemId="3-1" label="Subscriptions" sx={{ color: 'inherit' }} />
            <TreeItem itemId="3-2" label="Dashboard" sx={{ color: 'inherit' }} />
            <TreeItem itemId="3-3" label="Routing libraries" sx={{ color: 'inherit' }} />
            <TreeItem itemId="3-4" label="Plans" sx={{ color: 'inherit' }} />
            <TreeItem itemId="3-5" label="Usage with webhooks" sx={{ color: 'inherit' }} />
            <TreeItem itemId="3-6" label="Users" sx={{ color: 'inherit' }} />
          </TreeItem>
          
          {/* Subscribers - fourth */}
          <TreeItem 
            itemId="4" 
            label="Subscribers"
            sx={{ color: 'inherit', display: 'block' }}
          >
            <TreeItem itemId="4-1" label="Add a card" sx={{ color: 'inherit' }} />
            <TreeItem itemId="4-2" label="Login" sx={{ color: 'inherit' }} />
            <TreeItem itemId="4-3" label="Overview" sx={{ color: 'inherit' }} />
            <TreeItem itemId="4-4" label="Subscribers" sx={{ color: 'inherit' }} />
            <TreeItem itemId="4-5" label="Admin" sx={{ color: 'inherit' }} />
          </TreeItem>
          
          {/* Integrations - hidden */}
          <TreeItem 
            itemId="5" 
            label="Integrations"
            sx={{ color: 'inherit', display: 'none' }}
          >
            <TreeItem itemId="5-1" label="Teams" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-2" label="Callbacks" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-3" label="Stripe sessions" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-4" label="Templates" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-5" label="Experimental apis" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-6" label="Api endpoints" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-7" label="Webhooks" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-8" label="Cards" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-9" label="Payments" sx={{ color: 'inherit', display: 'none' }} />
            <TreeItem itemId="5-10" label="Trials" sx={{ color: 'inherit', display: 'none' }} />
          </TreeItem>
        </SimpleTreeView>
      </Box>
    </Collapse>
  );
};

export default MobileDrawer;