// components/molecules/AnimatedIconGrid.js
import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import {
  Grid,
  IconButton,
  Typography,
  Box,
  Button
} from '@mui/material';

// Import icons
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

// Default items array
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

const AnimatedIconGrid = forwardRef(({ 
  items = routerMenuItems, 
  onItemClick, 
  isVisible: externalIsVisible, 
  setIsVisible: externalSetIsVisible,
  hiddenByDefault = false,
  animationDuration = 100,
  showButton = true,
  buttonText = "See in action",
  containerProps = {},
  gridProps = {}
}, ref) => {
  // Use internal state if external state is not provided
  const [internalIsVisible, setInternalIsVisible] = useState(!hiddenByDefault);
  
  // Determine if we should use external or internal state management
  const isControlled = externalIsVisible !== undefined && externalSetIsVisible !== undefined;
  const isVisible = isControlled ? externalIsVisible : internalIsVisible;
  const setIsVisible = isControlled ? externalSetIsVisible : setInternalIsVisible;
  
  // Track which items should exist in the DOM
  // Each item is an object with { index, visible } to track both DOM presence and opacity
  const [itemStates, setItemStates] = useState([]);
  
  // Toggle visibility with animation - wrapped in useCallback
  const toggleVisibility = useCallback(() => {
    if (isVisible) {
      // Hide items in reverse order
      const hideItems = async () => {
        const currentItems = [...itemStates];
        
        // First set visible to false on each item (fade out)
        for (let i = currentItems.length - 1; i >= 0; i--) {
          currentItems[i] = { ...currentItems[i], visible: false };
          setItemStates([...currentItems]); // Create new array to force update
          await new Promise(resolve => setTimeout(resolve, animationDuration));
          
          // Immediately after setting visible to false, remove the item entirely
          // This ensures the container updates as soon as each item is hidden
          currentItems.pop();
          setItemStates([...currentItems]); // Create new array to force update
        }
        
        setIsVisible(false);
      };
      
      hideItems();
    } else {
      setIsVisible(true);
      
      // Show items and animate them in sequence
      const showItems = async () => {
        const newItems = [];
        
        for (let i = 0; i < items.length; i++) {
          // Add new item to DOM immediately, but with visible:false
          newItems.push({ index: i, visible: false });
          setItemStates([...newItems]);
          
          // Force a small delay to let the DOM update before animation
          await new Promise(resolve => setTimeout(resolve, 10)); 
          
          // Then set it to visible to trigger the fade-in
          newItems[i] = { ...newItems[i], visible: true };
          setItemStates([...newItems]);
          
          await new Promise(resolve => setTimeout(resolve, animationDuration));
        }
      };
      
      showItems();
    }
  }, [isVisible, itemStates, items, animationDuration, setIsVisible]);
  
  // External API for toggling visibility
  useImperativeHandle(ref, () => ({
    toggleVisibility
  }), [toggleVisibility]);
  
  // Initialize items based on hiddenByDefault
  useEffect(() => {
    if (!hiddenByDefault) {
      // Initialize with all items visible
      setItemStates(items.map((_, index) => ({ index, visible: true })));
    } else {
      // Initialize with no items
      setItemStates([]);
    }
  }, [hiddenByDefault, items]);
  
  // Handle toggle button
  const handleToggleClick = () => {
    toggleVisibility();
  };
  
  return (
    <Box {...containerProps}>
      {showButton && (
        <Button
          onClick={handleToggleClick}
          variant="contained" 
          sx={{ 
            fontSize: '1.25rem',
            fontWeight: 'bold',
            padding: '12px 24px',
            textTransform: 'none',
            marginBottom: 2
          }}
        >
          {buttonText}
        </Button>
      )}
      
      <Grid container spacing={2} {...gridProps}>
        {itemStates.map(itemState => {
          const item = items[itemState.index];
          return (
            <Grid
              item
              xs={4}
              sm={3}
              md={2}
              lg={2}
              xl={2}
              key={itemState.index}
            >
              <IconButton
                onClick={() => onItemClick(item.path)}
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
                  opacity: itemState.visible ? 1 : 0,
                  transform: itemState.visible ? 'scale(1)' : 'scale(0.8)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: itemState.visible ? 'scale(1.02)' : 'scale(0.8)',
                  },
                  '&:active': {
                    transform: itemState.visible ? 'scale(0.98)' : 'scale(0.8)',
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
          );
        })}
      </Grid>
    </Box>
  );
});

export default AnimatedIconGrid;