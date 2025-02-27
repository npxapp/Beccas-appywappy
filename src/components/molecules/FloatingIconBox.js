import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export const FloatingIconBox = (props) => {
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
    boxTitle = "Focus on same syntax principle",
    boxIcon = <AppShortcutIcon />,
    buttonText = "Learn More",
    buttonPath = "/",
    buttonBgColor = null,
    buttonTextTransform = "none",
    // eslint-disable-next-line
    buttonTextColor = null,
    paperBorder = "none",
    paperBorderRadius = null,
    paperPaddingY = 4,
    paperPaddingTop = 6,
    svgSize = "6rem",
    iconOffsetTop = -30,
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
          position: "relative",
        }}
      >
        {/* Floating Icon */}
        <Box
          sx={{
            position: "absolute",
            top: iconOffsetTop,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            backgroundColor: theme.palette.background.default,
            borderRadius: "50%",
            padding: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {enhancedIcon}
        </Box>

        <Paper 
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            border: paperBorder,
            borderColor: theme.palette.divider,
            boxShadow: theme.shadows[3],
            borderRadius: paperBorderRadius || 2,
            paddingY: paperPaddingY,
            paddingTop: paperPaddingTop,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2, // Add margin to push title down below the icon
            }}
          >
            <Typography 
              sx={{ 
                textAlign: 'center',
                fontSize
              }}
            >
              {boxTitle}
            </Typography>
          </Box>

          <Box 
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigateOpen(buttonPath)}
              sx={{
                background: buttonBgColor,
                textTransform: buttonTextTransform,
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

