// components/organisms/MobileDrawer.js
import React from 'react';
import { Collapse, Box, Stack, Chip } from '@mui/material';
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
  setMenuOpen,
  ...otherProps 
}) => {
  const navigate = useNavigate();

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path === 'toggleCollapseMenu') {
      toggleCollapseMenu();
    } else if (path.startsWith('http')) {
      navigatePage(path);
    } else {
      navigate(path);
      toggleCollapseMenu();
      setMenuOpen(false);
    }
  };

  return (
    <Collapse
      in={isCollapseOpen}
      sx={{
        ...sx,
        width: sx.width || '100%',
        zIndex: sx.zIndex || 3000,
        color: sx.color || 'text.primary',
        border: 'none',
        boxShadow: 'none',
      }}
      {...otherProps}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'initial',
          transition: 'transform 1s ease',
          paddingY: 4,
        }}
      >
        <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
          <Chip 
            icon={<GitHubIcon fontSize="small" />}
            label="Go API"
            onClick={() => navigateOpen('https://github.com/startersaas/startersaas-backend-go-api-main.git')}
            variant="outlined"
            size="small"
          />
          <Chip 
            icon={<GitHubIcon fontSize="small" />}
            label="Node API"
            onClick={() => navigateOpen('https://github.com/startersaas/startersaas-backend-node-api-main.git')}
            variant="outlined"
            size="small"
          />
          <Chip 
            icon={<GitHubIcon fontSize="small" />}
            label="React API"
            onClick={() => navigateOpen('https://github.com/startersaas/startersaas-frontend-react-spa.git')}
            variant="outlined"
            size="small"
          />
        </Stack>
      </Box>
    </Collapse>
  );
};

export default MobileDrawer;