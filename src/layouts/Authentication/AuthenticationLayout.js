// layouts/Authentication/AuthenticationLayout.jsx
import { Box, Card, Container } from '@mui/material';
import { SnackBar } from 'layouts/Public/components/SnackBar';
import BaseFooter from "layouts/BaseFooter";
import StartersaaskitLogo from 'images/logo-Startersaaskit.svg';

const AuthenticationLayout = ({ children }) => {
  return (
    <SnackBar>
      <Box 
        display="flex" 
        flexDirection="column" 
        minHeight="100vh"
      >
        <Box 
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Card 
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
              }}
            >
              <Box
                component="img"
                src={StartersaaskitLogo}
                alt="Startersaaskit Logo"
                sx={{
                  width: 200,
                  height: 'auto'
                }}
              />
              {children}
            </Card>
          </Container>
        </Box>
        <BaseFooter />
      </Box>
    </SnackBar>
  );
};

export default AuthenticationLayout;