// ./src/pages/GettingStartedPage.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import RocketIcon from '@mui/icons-material/Rocket';
import AnimatedIconGrid from 'components/molecules/AnimatedIconGrid';
import { TypeSection } from 'components/molecules/TextSections';
import { BoxedWordSection } from 'components/molecules/BoxedWordSection';
import { FloatingIconBox } from 'components/molecules/FloatingIconBox';

const PaymentsPage = () => {
  const [isGridVisible, setIsGridVisible] = useState(false);
  const iconGridRef = useRef(null);

  // External toggle function
  const toggleGridVisibility = () => {
    iconGridRef.current.toggleVisibility();
  };

  const navigate = useNavigate();

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path.startsWith('http')) {
      navigatePage(path);
    } else {
      navigate(path);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
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
              xs: '100%',
              sm: 600,
              md: 960,
              lg: 1280,
              xl: 1920,
            },
            paddingY: 10,
          }}
        >
          <RocketIcon sx={{ fontSize: '6rem' }} />
          <Typography variant="h2" gutterBottom>
            We build Go / Node + React powered SaaS Templates
          </Typography>
          <Button
            onClick={toggleGridVisibility}
            variant="contained"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              padding: '12px 24px',
              textTransform: 'none',
            }}
          >
            See in action
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: {
            xs: '100%',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        }}
      >
        <AnimatedIconGrid
          ref={iconGridRef}
          onItemClick={navigateOpen}
          isVisible={isGridVisible}
          setIsVisible={setIsGridVisible}
          hiddenByDefault={true}
          animationDuration={100}
          showButton={false} // Hide the internal button
          containerProps={{
            sx: {
              width: {
                xs: '100%',
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
              },
            },
          }}
        />
      </Box>

      <TypeSection
        fontWeight={100}
        paddingY={0}
        paddingX={1}
        fontSize="1.8rem"
        lineHeight={1}
        text="Are you going to develop your next big SaaS thing? Save 3 months of development in 5 minutes of setup. A production ready SaaS composed by Go / Node API and a React frontend"
        paperPaddingY={10}
      />

      <FloatingIconBox
        paddingY={0}
        fontSize="1.8rem"
        boxTitle="Same syntax principle"
        buttonText="Learn more"
        buttonPath="/"
        buttonTextColor="#ffffff"
        boxIcon={<AppShortcutIcon />}
        buttonTextTransform="none"
        backgroundColor="none"
        paperBorderRadius={8}
        paperPaddingY={10}
      />

      <BoxedWordSection
        fontWeight={100}
        paddingY={0}
        paddingX={1}
        fontSize="1.8rem"
        lineHeight={1.5}
        text="Featuring a powerful Stripe enabled React + Mui dashboard architecture to manage your Teams and Users built with a Same Syntax principle for modern Vite / Next.js / Remix and Gatsby"
        paperPaddingY={10}
      />

      <FloatingIconBox
        paddingY={0}
        fontSize="1.8rem"
        boxTitle="Starter software"
        buttonText="Learn more"
        buttonPath="/"
        buttonTextColor="#ffffff"
        boxIcon={<CloudIcon />}
        buttonTextTransform="none"
        backgroundColor="none"
        paperBorderRadius={8}
        paperPaddingY={10}
      />

      <BoxedWordSection
        paddingY={0}
        paddingX={1}
        fontSize="1.25rem"
        lineHeight={1.8}
        text="Kickstart your SaaS with a powerful NoSQL backend api + Express webhooks / endpoints to manage your subscribers And free support for the latest GitHub projects we source"
        paperPaddingY={10}
        textAlign="center"
      />
    </Box>
  );
};

export default PaymentsPage;