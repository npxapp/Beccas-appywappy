import DashboardPage from "./DashboardPage";
import UserDashboardPage from "./UserDashboardPage";
import { useAuth } from 'contexts/AuthContext';

const DashboardSwitcher = () => {
  const { user, isAuthenticated } = useAuth(); // Destructure isAuthenticated

  // Safety check
  if (!isAuthenticated || !user) {
    return null; // The PrivateActiveRoute should handle the redirect
  }

  return user.role === "admin" ? <DashboardPage user={user} /> : <UserDashboardPage user={user} />;
};

export default DashboardSwitcher;