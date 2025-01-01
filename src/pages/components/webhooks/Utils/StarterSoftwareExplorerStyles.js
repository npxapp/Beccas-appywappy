import { 
  Box, 
  Button, 
  styled, 
  alpha 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const GhostIcon = styled(Box)(({ theme }) => ({
  position: 'absolute', 
  pointerEvents: 'none', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  backgroundColor: 'transparent', 
  color: alpha(theme.palette.grey[500], 0.3), 
  animation: `ghostFadeInAnimation 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
}));

export const CompleteCheckGhostIcon = styled(CheckCircleIcon)(({ theme }) => ({
  position: 'absolute', 
  pointerEvents: 'none', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  backgroundColor: 'transparent', 
  color: alpha(theme.palette.success.main, 0.3), 
  animation: `completeCheckGhostExpansion 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`, 
  zIndex: 1,
}));

export const BouncingButton = styled(Button)`
  animation: bounceAnimation 3s ease-in-out infinite;
  &:hover, &:active {
    animation-play-state: paused;
  }
`;

