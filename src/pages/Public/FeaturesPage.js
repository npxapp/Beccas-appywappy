// ./src/pages/FeaturesPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
} from '@mui/material';
import RocketIcon from '@mui/icons-material/Rocket';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
  LaunchSection,
  FeaturesSection,
  ComponentsSection,
  LicenseSection,
  TechStackSection,
  FeaturesListSection,
  SetupStepsSection,
  CallToActionSection,
} from 'components/elements/TemplateText';
import IconGrid from 'components/atoms/IconGrid';

const FeaturesPage = () => {
  
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
  
      <TypeSection
        paddingY={10}
        paddingX={1}
        text={<HeroSection 
          text="We build Go / Node + React powered SaaS Templates"    
          icon={RocketIcon}
        />}
      />  
  
      <IconGrid 
        onItemClick={navigateOpen}
        background="rgba(0, 0, 0, 0.05)"
        gap={0}
      />
  
      <TypeSection
        backgroundColor="primary.main"
        paddingY={10}
        paddingX={1}
        text={<LaunchSection color="common.white"/>}
      />  
  
      <TypeSection
        paddingY={10}
        paddingX={1}
        text={<FeaturesSection />}
      />    
  
      <TypeSection
        paddingY={10}
        paddingX={1}
        text={<ComponentsSection />}
      />    
  
      <TypeSection
        backgroundColor="primary.main"
        paddingY={10}
        paddingX={1}
        text={<LicenseSection color="common.white"/>}
      />    
  
      <TypeSection
        paddingY={10}
        paddingX={1}
        text={<TechStackSection />}
      />    
  
      <TypeSection
        paddingY={10}
        paddingX={1}
        text={<FeaturesListSection />}
      />    
  
      <TypeSection
        paddingY={10}
        paddingX={1}
        text={<SetupStepsSection />}
      />    
  
      <TypeSection
        backgroundColor="primary.main"
        paddingY={10}
        paddingX={1}
        text={<CallToActionSection color="common.white"/>}
      />
    </Box>
  );
};

export default FeaturesPage;