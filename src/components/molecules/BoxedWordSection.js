// components/molecules/BoxedWordSection.jsx
import React from 'react';
import { Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const BoxedWordSection = (props) => {
  const theme = useTheme();

  const {
    backgroundColor = theme.palette.divider,
    marginY = 0,
    paddingY = 0,
    paddingX = 0,
    fontSize = {
      xs: "1.25rem",
      sm: "1.5rem",
      md: "1.75rem",
    },
    lineHeight = 1.5,
    fontWeight = 300,
    textAlign = "left",
    paperPaddingY = 4,
    border = "none",
    borderRadius = null,
    color = theme.palette.primary.main,
    text = "",
    boxSize = 1, // pixel size of the box border
    boxColor = theme.palette.divider, // use theme divider color as default
    ...otherProps
  } = props;

  // Split the text into words
  const words = text.split(' ');

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
        <Paper
          sx={{
            color,
            paddingY: paperPaddingY,
            fontSize,
            textAlign,
            lineHeight,
            fontWeight,
            border,
            borderRadius,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              fontWeight,
              fontSize,
            }}
          >
            {words.map((word, index) => (
              <Box
                key={index}
                component="span"
                sx={{
                  display: "inline-block",
                  border: `${boxSize}px solid ${boxColor}`,
                  p: 1,
                }}
              >
                {word}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default BoxedWordSection;

