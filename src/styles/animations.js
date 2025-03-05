// styles/animations.js
import { keyframes } from '@emotion/react';

export const popInAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 0;
  }
  80% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

export const popOutAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  20% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 0;
  }
`;

export const itemPopInAnimation = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const itemPopOutAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
`;



