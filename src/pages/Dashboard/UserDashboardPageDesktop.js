// pages/Dashboard/UserDashboardPageDesktop.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isFreeTrial } from "libs/utils";
import { useAuth } from 'contexts/AuthContext'; // Add this import
import TrialComponent from "./TrialComponent";
import {
  Dialog,
  DialogTitle,
  Typography,
  Box,
  Alert,
  Grid
} from '@mui/material';

const DashboardPage = () => {
  const { user } = useAuth(); // Add this hook
  const { t } = useTranslation();
  const location = useLocation();
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    if (location.state?.from?.pathname) {
      setNotAllowed(true);
    }
  }, [location.state?.from?.pathname]);

  return (
    <>
      <Dialog 
        open={notAllowed}
        onClose={() => setNotAllowed(false)}
      >
        <DialogTitle>
          <Alert>
            <Typography>Error:</Typography>
            <Typography>{t("dashboardPage.noAccess")}</Typography>
          </Alert>
        </DialogTitle>
      </Dialog>

      <Box>
        {isFreeTrial(user.account) ? (
          <TrialComponent user={user} />
        ) : (
          <Grid container>
            <Grid item>
              <Typography>Dashboard</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default DashboardPage;