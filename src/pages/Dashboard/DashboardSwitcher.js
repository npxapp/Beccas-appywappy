import DashboardPage from "./DashboardPage";
import UserDashboardPage from "./UserDashboardPage";
import { useAuth } from 'contexts/AuthContext'; // Add this import

const DashboardSwitcher = () => {
  const { user } = useAuth(); // Add this hook
  
  // Add safety check
  if (!isAuthenticated || !user) {
    return null; // The PrivateActiveRoute should handle the redirect
  }
  
  return (
    <>
      {user.role === "admin" ? (
        <DashboardPage user={user} />
      ) : (
        <UserDashboardPage user={user} />
      )}
    </>
  );
};

export default DashboardSwitcher;
