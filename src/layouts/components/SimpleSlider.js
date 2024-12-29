import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography } from "@mui/material";
import { useDarkMode } from "../../contexts/DarkMode";
import { useDialer } from "../../contexts/DialerContext";
import { useTheme } from '@mui/material/styles';
import BackspaceButton from './BackspaceButton';
import CallButton from './CallButton';
import { formatPhoneNumber, handleNumberClick, handleBackspace, handleCall } from './dialerFunctions';
import { sliderStyles } from './sliderStyles';
import { slideAssets, slideColors, settings } from './sliderConfig';

export default function SimpleSlider() {
  const { darkMode } = useDarkMode();
  const { setLoading, setDialerCode } = useDialer();
  const [slideAssetsNumbers, setSlideAssetsNumbers] = useState([]);

  const triggerVibration = () => {
    navigator.vibrate?.(35);
  };

  const theme = useTheme();

  useEffect(() => {
    const loadSlideAssets = () => {
      const context = require.context('../../contexts/src', false, /\.js$/);
      const assetNumbers = [];

      context.keys().forEach((key) => {
        try {
          const module = context(key);
          const keyName = Object.keys(module)[0];
          const { [keyName]: value } = module;
          const phoneNumbers = Object.keys(value);

          assetNumbers.push(...phoneNumbers);
        } catch (error) {
          console.error(`Error loading asset from ${key}:`, error);
        }
      });

      setSlideAssetsNumbers(assetNumbers);
    };

    loadSlideAssets();
  }, []);

  const [currentSlideStates, setCurrentSlideStates] = useState(
    Array(slideAssets.length).fill().map(() => ({
      enteredNumber: '',
      localIsMatch: false,
      matchedAsset: null,
      callCount: 0,
    }))
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100vw',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
          py: 0,
        }}
      >
        <Slider
          {...settings}
          className={darkMode ? "dark-slider" : "light-slider"}
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          {slideAssets.map((header, index) => (
            <Box
              key={header}
              style={{
                height: '100%',
                width: "100%",
              }}
            >
              <Box
                className="slide-content"
                style={{
                  background: slideColors(theme)[index],
                  height: 660,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 40,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      display: 'flex',
                      flexDirection: 'column',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      alignItems: 'center',
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      component="h4" 
                      sx={{ 
                        mt: 0, 
                        mb: 4,
                        whiteSpace: 'nowrap',
                        minHeight: '50px',
                        maxWidth: '100%',
                        fontSize: '2.6rem',
                        color: currentSlideStates[index].localIsMatch ? 'inherit' : 'inherit'
                      }}
                    >
                      {formatPhoneNumber(currentSlideStates[index].enteredNumber) || ''}
                    </Typography>

                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        rowGap: 3,
                        columnGap: 6,
                        mt: 0,
                        mb: 4,
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
                        <Button
                          key={`button-${num}-${index}`}
                          variant="outlined"
                          onClick={() => handleNumberClick(num.toString(), index, slideAssetsNumbers, slideAssets, setCurrentSlideStates, triggerVibration)}
                          sx={{ 
                            padding: 0,
                            margin: 0,
                            borderRadius: '100px',
                            minWidth: '50px', 
                            minHeight: '50px',
                            fontSize: '1.6rem',
                          }}
                        >
                          {num}
                        </Button>
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 5, flexDirection: 'row-reverse', }}>
                      <BackspaceButton
                        index={index}
                        slideAssetsNumbers={slideAssetsNumbers}
                        slideAssets={slideAssets}
                        setCurrentSlideStates={setCurrentSlideStates}
                        setDialerCode={setDialerCode}
                        triggerVibration={triggerVibration}
                        theme={theme}
                        handleBackspace={handleBackspace}
                      />
                      <CallButton
                        index={index}
                        currentSlideStates={currentSlideStates}
                        setCurrentSlideStates={setCurrentSlideStates}
                        setDialerCode={setDialerCode}
                        setLoading={setLoading}
                        theme={theme}
                        handleCall={handleCall}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
        <style jsx global>{sliderStyles(darkMode)}</style>
      </Box>
    </Box>
  );
}