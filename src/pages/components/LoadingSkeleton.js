// src/pages/components/LoadingSkeleton.js
import React from 'react';
import {
  Grid,
  Box,
  Skeleton,
  CircularProgress
} from '@mui/material';

const LoadingSkeleton = () => {
  return (
    <Grid container 
      sx={{ 
        minHeight: '100vh',
      }}
    >
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Skeleton variant="circular" width={50} height={50} />
          </Grid>
          <Grid item xs={10}>
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ p: 3 }}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
              </Grid>
              <Grid item xs={2}>
                <Skeleton variant="circular" width={50} height={50} />
              </Grid>
            </Grid>
          </Grid>
          
          {[...Array(5)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                </Grid>
                <Grid item xs={2}>
                  <Skeleton variant="circular" width={25} height={25} />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <CircularProgress size={100} />
      </Box>
    </Grid>
  );
};

export default LoadingSkeleton;

