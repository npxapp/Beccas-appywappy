import React from 'react';
import { Button } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { alpha } from '@mui/material/styles';

const BackspaceButton = React.memo(({
  index,
  slideAssetsNumbers,
  slideAssets,
  setCurrentSlideStates,
  setDialerCode,
  triggerVibration,
  theme,
  handleBackspace, // Explicitly passed as a prop
}) => {
  return (
    <Button
      onClick={() => handleBackspace(index, slideAssetsNumbers, slideAssets, setCurrentSlideStates, setDialerCode, triggerVibration)}
      startIcon={
        <BackspaceIcon 
          sx={{ 
            fontSize: '3rem',
          }} 
          style={{
            fontSize: '3rem',
          }}
        />
      }
      sx={{
        minHeight: '50px',
        minWidth: '50px',
        borderRadius: '100px',
        fontSize: '3rem',
        backgroundColor: alpha(theme.palette.action.active, 0.05),
      }}
    />
  );
});

export default BackspaceButton;