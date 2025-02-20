// pages/Public/IndexPage.jsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const navigate = useNavigate();

  const navigateOpen = (url) => {
    navigate(url);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Button onClick={() => navigateOpen('/dashboard')}>Dashboard</Button>
    </Box>
  );
};

export default IndexPage;