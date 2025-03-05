// pages/Dashboard/DashboardSwitcher
import { useMediaQuery } from '@mui/material';
import { useAuth } from 'contexts/AuthContext';
import DashboardPage from "./DashboardPage";
import UserDashboardPage from "./UserDashboardPage";
import DashboardPageDesktop from "./DashboardPageDesktop";
import UserDashboardPageDesktop from "./UserDashboardPageDesktop";

const DashboardSwitcher = () => {
  const { user, isAuthenticated } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');

  if (!isAuthenticated || !user) {
    return null;
  }

  if (user.role === "admin") {
    return isMobile ? <DashboardPage user={user} /> : <DashboardPageDesktop user={user} />;
  } else {
    return isMobile ? <UserDashboardPage user={user} /> : <UserDashboardPageDesktop user={user} />;
  }
};

export default DashboardSwitcher;