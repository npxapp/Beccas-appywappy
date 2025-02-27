// styles/styles.js
import { popInAnimation, popOutAnimation, itemPopInAnimation } from './animations';

export const popupStyle = (isAnimatingOut, darkMode) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '500px',
  height: '50vh',
  borderRadius: '20px',
  backdropFilter: 'blur(35px)',
  padding: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  outline: 'none',
  overflow: 'hidden',
  animation: isAnimatingOut
    ? `${popOutAnimation} 0.3s ease-in-out forwards`
    : `${popInAnimation} 0.3s ease-in-out`,
  transformOrigin: 'center',
  zIndex: 1000,
  perspective: '1000px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translate(-50%, -50%) scale(1.02)',
  }
});

export const inputStyle = () => ({
  animation: `${itemPopInAnimation} 0.3s ease-out`,
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
    '& input, & textarea': {
      caretColor: '#61dafb',
      fontSize: '1.3rem', 
      backgroundColor: 'transparent',
      padding: '12px 18px', 
      letterSpacing: '0.5px',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&.Mui-focused': {
      transform: 'scale(1.05)',
    }
  },
});

export const iconStyle = (submissionState) => ({
  animation: `${itemPopInAnimation} 0.3s ease-out`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transform: submissionState ? 'scale(1.2)' : 'scale(1)',
  filter: submissionState === 'success' 
    ? 'drop-shadow(0 0 10px rgba(97, 218, 251, 0.5))' 
    : submissionState === 'error'
    ? 'drop-shadow(0 0 10px rgba(97, 218, 251, 0.8))'
    : 'none',
});

export const buttonStyle = () => ({
  flex: '0 0 auto',
  borderRadius: 12,
  transition: 'all 0.3s ease',
  animation: `${itemPopInAnimation} 0.3s ease-out`,
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  }
});