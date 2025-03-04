// components/elements/TypeSections.js
import React from 'react';
import { Box } from '@mui/material';

export const TypeSection = (props) => {

  const {
    backgroundColor = null,
    marginY = 0,
    paddingY = 0,
    paddingX = 0,
    text,
    ...otherProps
  } = props;

  return (
    <Box
      sx={{
        marginY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        width: "100%",
      }}
      {...otherProps}
    >
      <Box
        sx={{
          width: { 
            xs: "100%", 
            sm: 600, 
            md: 960, 
            lg: 1280, 
            xl: 1920 
          },
          paddingY,
          paddingX,
        }}
      >
         {text}
      </Box>
    </Box>
  );
};