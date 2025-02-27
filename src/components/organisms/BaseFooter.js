// components/organisms/BaseFooter.jsx
import {
  Box,
  Container,
  Typography,
  Stack,
  List,
  ListItem,
  ListSubheader,
  Paper
} from '@mui/material';
import NodeIcon from '@mui/icons-material/Memory';
import ReactIcon from '@mui/icons-material/Code';
import GoIcon from '@mui/icons-material/Terminal';
import DatabaseIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';

const BaseFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 2
      }}
    >
      <Container>
        {/* Tech Stack Icons */}
        <Stack 
          direction="row" 
          spacing={3} 
          justifyContent="center" 
          flexWrap="wrap"
          mb={4}
        >
          <NodeIcon color="action" />
          <ReactIcon color="action" />
          <GoIcon color="action" />
          <DatabaseIcon color="action" />
          <CloudIcon color="action" />
        </Stack>

        {/* Features List */}
        <Paper 
          elevation={0}
          sx={{ 
            bgcolor: 'grey.50',
            p: 2,
            borderRadius: 2
          }}
        >
          <List dense disablePadding>
            <ListSubheader 
              sx={{ 
                bgcolor: 'transparent',
                lineHeight: '1.2',
                pb: 1
              }}
            >
              API and Frontend
            </ListSubheader>
            {[
              'user registration of account with subdomain, email and password',
              'user email activation with 6 characters code and account creation',
              'resend activation code if not received',
              'user password reset through code sent by email',
              'user login',
              'user logout',
              'user change password once logged in',
              'account trial period',
              'edit of account billing information',
              'subscription creation',
              'plan change',
              'add new credit card',
              'remove credit card',
              'subscription cancel',
              'subscription re-enable',
              '3D Secure ready payments',
              'subscription handling via Stripe customer portal',
              "account's users list (by admins only)",
              "account's user create (by admins only)",
              "account's user update (by admins only)",
              "account's user delete (by admins only)",
            ].map((text, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </ListItem>
            ))}

            <ListSubheader 
              sx={{ 
                bgcolor: 'transparent',
                lineHeight: '1.2',
                pt: 2,
                pb: 1
              }}
            >
              API Only
            </ListSubheader>
            {[
              "account's users list (by account admins only)",
              "account's user create (by account admins only)",
              "account's user update (by account admins only)",
              'stripe webhooks handling',
              'events notifications by email: new user subscribed - successful payments - failed payments',
              'daily notifications by email: expiring trials - failed payments - account suspension due to failed payments'
            ].map((text, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default BaseFooter;