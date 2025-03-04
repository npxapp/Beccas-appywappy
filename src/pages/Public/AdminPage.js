// pages/AdminPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const ADMIN_FEATURES = (
  <List>
    <ListItem>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600 }}
      >
        API and Frontend
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's users list (by admins only)
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's user create (by admins only)
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's user update (by admins only)
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's user delete (by admins only)
      </Typography>
    </ListItem>
    <ListItem sx={{ pt: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ color: '#fff', fontWeight: 600 }}
      >
        API Only
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's users list (by account admins only)
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's user create (by account admins only)
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        account's user update (by account admins only)
      </Typography>
    </ListItem>
  </List>
);

const AdminPage = () => {

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
          text="Admin panel and user management"    
          icon={AdminPanelSettingsOutlinedIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={ADMIN_FEATURES}
      />
    </Box>
  );
};

export default AdminPage;