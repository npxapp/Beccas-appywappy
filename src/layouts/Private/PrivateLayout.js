// layouts/Private/PrivateLayout.jsx
import { CssBaseline } from '@mui/material';
import { Logout, UpdateMe } from "api/mutations";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { Link as RouterLink, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { SnackBar } from "layouts/Public/components/SnackBar";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { getDomain } from 'layouts/Utils/utils';
import StartersaaskitLogo from "images/logo-Startersaaskit.svg";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as UserIcon,
  Group as UsersIcon,
  AccountCircle,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";

const StyledTypography = styled(Typography)(() => ({
  flex: '0 0 auto',
  fontWeight: 700,
  fontSize: '3.10rem',
  fontFamily: 'kornucopiaregular',
  position: 'relative',
  display: 'inline-block',
  px: '10px',
  textShadow: '0 0 10px rgba(97, 218, 251, 0.6), 0 0 15px rgba(97, 218, 251, 0.4)',
  minHeight: 0,
  height: 'auto',
  lineHeight: 0.8,
  borderRadius: 20,
  border: 'none',
  textTransform: 'none',
  color: 'black',
  
  '& > span': {
    position: 'relative',
    zIndex: 2,
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '120%',
    height: '120%',
    background: `linear-gradient(
      45deg, 
      rgba(97, 218, 251, 0.3) 0%, 
      rgba(97, 218, 251, 0.6) 25%, 
      rgba(97, 218, 251, 0.1) 50%, 
      rgba(97, 218, 251, 0.6) 75%, 
      rgba(97, 218, 251, 0.3) 100%
    )`,
    opacity: 0.6,
    filter: 'blur(50px)',
    zIndex: 1,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `repeating-linear-gradient(
      0deg,
      rgba(97, 218, 251, 0.1) 0px, 
      rgba(97, 218, 251, 0.1) 1px, 
      transparent 1px, 
      transparent 2px
    )`,
    opacity: 0.4,
    animation: 'scanLines 3s linear infinite',
    zIndex: 2,
  },

  '&:hover': {
    transform: 'scale(1.03)',
    textShadow: '0 0 15px rgba(97, 218, 251, 0.8)',
  },
}));

const PrivateLayout = ({ children, planType = [] }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user, refetch } = useAuth();
  const navigate = useNavigate();
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const domain = getDomain();

  const { handleSubmit } = useForm({
    defaultValues: { language: user?.language },
  });

  const mutation = useMutation(UpdateMe, {
    onSuccess: () => queryClient.invalidateQueries(["Me"]),
  });

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleLogout = async () => {
    await Logout();
    await refetch();
    navigate("/auth/login");
  };

  const handleLanguageChange = async (data) => {
    await mutation.mutateAsync({ language: data.language });
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ bgcolor: "grey.900", height: "100%", p: 3 }}>
      {user.role === "admin" && (
        <List>
          <ListItem
            onClick={() => navigate('/users')}
            sx={{
              color: "grey.300",
              cursor: 'pointer',
              textDecoration: "none",
              display: "flex",
              width: "100%",
              alignItems: "center",
              "&:hover": { color: "common.white" }
            }}
          >
            <ListItemIcon>
              <UserIcon sx={{ color: "grey.300" }} />
            </ListItemIcon>
            <ListItemText primary={t("privateLayout.users")} />
          </ListItem>

          <ListItem
            onClick={() => navigate('/teams')}
            sx={{
              color: "grey.300",
              cursor: 'pointer',
              textDecoration: "none",
              display: "flex",
              width: "100%",
              alignItems: "center",
              "&:hover": { color: "common.white" }
            }}
          >
            <ListItemIcon>
              <UsersIcon sx={{ color: "grey.300" }} />
            </ListItemIcon>
            <ListItemText primary="TEAMS" />
          </ListItem>

          <ListItem
            onClick={() => navigate('/plan')}
            sx={{
              color: "grey.300",
              cursor: 'pointer',
              textDecoration: "none",
              display: "flex",
              width: "100%",
              alignItems: "center",
              "&:hover": { color: "common.white" }
            }}
          >
            <ListItemIcon>
              <MoneyIcon sx={{ color: "grey.300" }} />
            </ListItemIcon>
            <ListItemText primary={t("dashboardPage.plan").toUpperCase()} />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <SnackBar>
  <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column", width: "100%" }}>
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {user.role === "admin" && (
              <IconButton onClick={handleDrawerToggle} sx={{ display: { md: "none" } }}>
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Link
                  component="a"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <StyledTypography>
                    <span>
                      {domain.slice(0, 1).toUpperCase().concat(domain.slice(1))}
                    </span>
                  </StyledTypography>
                  <PlayCircleFilledIcon
                    sx={{
                      fontSize: '3rem',
                      color: 'black',
                      position: 'relative',
                      left: '-5px',
                    }}
                  />
                </Link>
              </Box>
            </Box>
            <Button component={RouterLink} to="/dashboard" startIcon={<HomeIcon />}>
              <Typography sx={{ display: { xs: "none", md: "block" } }}>Dashboard</Typography>
            </Button>
            <Select native defaultValue={user?.language} onChange={handleSubmit(handleLanguageChange)}>
              <option value="it">IT</option>
              <option value="en">EN</option>
            </Select>
            <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={() => setUserMenuAnchor(null)}>
              <MenuItem disabled>{user.email}</MenuItem>
              <MenuItem component={RouterLink} to="/user/edit">{t("privateLayout.manageUser")}</MenuItem>
              {user.role === "admin" && (
                <>
                  <MenuItem component={RouterLink} to="/account/edit">{t("privateLayout.managePayment")}</MenuItem>
                  <MenuItem component={RouterLink} to="/plan">{t("privateLayout.managePlan")}</MenuItem>
                </>
              )}
              <MenuItem onClick={handleLogout}>{t("privateLayout.logout")}</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", flex: 1 }}>
          <Box component="nav" sx={{ width: { md: 256 }, flexShrink: { md: 0 } }}>
            <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: 256 } }}>
              {drawer}
            </Drawer>
            <Drawer variant="permanent" sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: 256, position: "relative" } }} open>
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
        </Box>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '480px',
                md: '600px',
                lg: '960px',
                xl: '1280px'
              },
              mx: 'auto',
              p: 2
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden", maxWidth: "200px" }}>
              <img src={StartersaaskitLogo} alt="StarterSaaSKit Logo" style={{ height: "40px", width: "auto", maxWidth: "200px" }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <style>
        {`
          @keyframes holographicSweep {
            0% {
              transform: rotate(0deg) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: rotate(180deg) scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: rotate(360deg) scale(1);
              opacity: 0.6;
            }
          }
          @keyframes scanLines {
            0%, 100% {
              opacity: 0.2;
              background-position: 0 0;
            }
            50% {
              opacity: 0.4;
              background-position: 0 -10px;
            }
          }
        `}
      </style>
    </SnackBar>
  );
};

export default PrivateLayout;