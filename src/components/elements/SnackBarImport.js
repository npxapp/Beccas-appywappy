// components/elements/SnackBarImport.js
import React from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Ensure to import CloseIcon

const SnackBarImport = ({ open, message = "SnackBar PopUp!", onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={onClose}
    >
      <SnackbarContent
        sx={{
          background: 'transparent',
          color: '#61dafb',
          padding: '16px',
          width: '300px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          '& .MuiSnackbarContent-message': {
            flexGrow: 1,
            textAlign: 'center',
          },
        }}
        message={message}
        action={
          <IconButton 
            size="small" 
            aria-label="close" 
            onClick={onClose} 
            sx={{
              color: '#61dafb',
              position: 'absolute',
              top: 8,
              left: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default SnackBarImport;