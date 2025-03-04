// components/atoms/NavChips.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Chip, Select } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LanguageIcon from '@mui/icons-material/Language';

export const HomeChip = ({ darkMode }) => {
  return (
    <Chip
      component={RouterLink}
      to="/dashboard"
      icon={<HomeIcon fontSize="small" />}
      label="Home"
      size="small"
      color="primary"
      clickable
      sx={{
        height: '28px',
        fontSize: '0.7rem',
        borderRadius: '14px',
        mr: 0.5,
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        '&:hover': {
          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        }
      }}
    />
  );
};

export const LanguageChip = ({ user, handleLanguageChange, darkMode }) => {
  return (
    <Chip
      icon={<LanguageIcon fontSize="small" />}
      label={
        <Select
          native
          defaultValue={user?.language}
          onChange={handleLanguageChange}
          variant="standard"
          sx={{
            width: '40px',
            fontSize: '0.7rem',
            p: 0,
            '&:before, &:after': { display: 'none' },
            '& .MuiSelect-select': {
              p: 0,
              py: 0,
              pr: 1
            }
          }}
        >
          <option value="it">IT</option>
          <option value="en">EN</option>
        </Select>
      }
      size="small"
      color="primary"
      sx={{
        height: '28px',
        borderRadius: '14px',
        mr: 0.5,
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        '& .MuiChip-label': {
          px: 0
        }
      }}
    />
  );
};

export const AccountChip = ({ setUserMenuAnchor, darkMode }) => {
  return (
    <Chip
      icon={<AccountCircleIcon fontSize="small" />}
      label="Account"
      size="small"
      color="primary"
      clickable
      onClick={(e) => setUserMenuAnchor(e.currentTarget)}
      sx={{
        height: '28px',
        fontSize: '0.7rem',
        borderRadius: '14px',
        mr: 0.5,
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        '&:hover': {
          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        }
      }}
    />
  );
};

export const MenuChip = ({ toggleDashboardDrawerProtected, darkMode }) => {
  return (
    <Chip
      icon={<FmdGoodIcon fontSize="small" />}
      label="Menu"
      size="small"
      color="primary"
      clickable
      onClick={toggleDashboardDrawerProtected}
      sx={{
        height: '28px',
        fontSize: '0.7rem',
        borderRadius: '14px',
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        '&:hover': {
          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        }
      }}
    />
  );
};

