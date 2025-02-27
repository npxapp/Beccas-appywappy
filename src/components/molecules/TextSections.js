// components/molecules/TextSections.js
import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export const TypeSection = (props) => {
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
    fontWeight = 900,
    textAlign = "left",
    paperPaddingY = 4,
    border = 'none',
    borderRadius = null,
    color = theme.palette.primary.main,
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
          <Typography
            sx={{
              color,
              fontWeight,
              fontSize,
            }}
          >
            {text}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export const BoxSection = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    backgroundColor = theme.palette.background.default,
    marginY = 0,
    paddingY = 0,
    fontSize = {
      xs: "1.25rem",
      sm: "1.5rem",
      md: "1.75rem",
    },
    rowReverse = false,
    boxTitle = "Focus on same syntax principle",
    boxIcon = <AppShortcutIcon />,
    buttonText = "Learn More",
    buttonPath = "/",
    buttonBgColor = null,
    buttonTextTransform = "none",
    buttonTextColor = theme.palette.primary.contrastText,
    paperBorder = "none",
    paperBorderRadius = null,
    paperPaddingY = null,
    svgSize = "3rem",
    ...otherProps
  } = props;

  const navigateOpen = (path) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      navigate(path);
    }
  };

  const enhancedIcon = React.cloneElement(boxIcon, {
    sx: { 
      fontSize: svgSize 
    },
  });

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
          display: "flex",
          flexDirection: "column",
          width: { 
            xs: "100%", 
            sm: 600, 
            md: 960, 
            lg: 1280, 
            xl: 1920 
          },
          paddingY,
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            border: paperBorder,
            borderColor: theme.palette.divider,
            boxShadow: theme.shadows[3],
            borderRadius: paperBorderRadius,
            paddingY: paperPaddingY,
          }}
        >
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ...(rowReverse && { 
                flexDirection: "column-reverse" 
              }),
            }}
          >
            <Typography 
              sx={{ 
                textAlign: 'center',
                fontSize: {fontSize}
              }}
            >
              {boxTitle}
            </Typography>
            {enhancedIcon}
          </Box>

          <Box 
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigateOpen(buttonPath)}
              sx={{
                background: buttonBgColor,
                textTransform: buttonTextTransform,
                color: buttonTextColor,
              }}
            >
              {buttonText}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};