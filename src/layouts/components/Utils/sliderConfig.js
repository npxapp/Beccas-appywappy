import { alpha } from '@mui/material/styles';

// Assets for each slide
export const slideAssets = [
  "Dial",
  "Dial",
  "Dial",
  "Dial",
  "Dial",
  "Dial"
];

// Colors for each slide
export const slideColors = (theme) => [
  alpha(theme.palette.background.paper, .95),
  `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.paper} 75%, ${theme.palette.background.paper} 100%)`,
  `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.paper} 75%, ${theme.palette.background.paper} 100%)`,
  `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.paper} 75%, ${theme.palette.background.paper} 100%)`,
  `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.paper} 75%, ${theme.palette.background.paper} 100%)`,
  `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.paper} 75%, ${theme.palette.background.paper} 100%)`,
];

// Settings for the slider
export const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

