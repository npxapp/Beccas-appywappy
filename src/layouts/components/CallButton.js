import React from 'react';
import { Button } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import { alpha } from '@mui/material/styles';

const CallButton = React.memo(({
  index,
  currentSlideStates,
  setCurrentSlideStates,
  setDialerCode,
  setLoading,
  theme,
  handleCall, // Explicitly passed as a prop
}) => {
  return (
    <Button
      onClick={() => handleCall(index, currentSlideStates, setCurrentSlideStates, setDialerCode, setLoading)}
      disabled={!currentSlideStates[index].localIsMatch}
      startIcon={
        <CallIcon
          sx={{
            fontSize: '3rem',
            color: currentSlideStates[index].localIsMatch ? 'success.main' : 'default',
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

export default CallButton;