// components/molecules/UserInfoDesktop.jsx
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EventIcon from '@mui/icons-material/Event';
import AutorenewIcon from '@mui/icons-material/Autorenew';

/**
 * UserInfoDesktop component that displays user details and subscription status in table view
 * 
 * @param {Object} props
 * @param {Object} props.user - User object containing email and account data
 * @param {Object} props.subscription - Current subscription object
 * @param {Function} props.hasFailedPayment - Utility function to check for failed payments
 * @param {Function} props.onUpdatePayment - Optional handler for payment update button
 * 
          <UserInfoDesktop 
            user={user} 
            subscription={currentSubscription}
            hasFailedPayment={hasFailedPayment}
            onUpdatePayment={handleUpdatePayment}
          />
 */
const UserInfoDesktop = ({
  user,
  subscription,
  hasFailedPayment,
  onUpdatePayment
}) => {
  const { t } = useTranslation();

  // Format date from Unix timestamp
  const formatDate = (unixTimestamp) => {
    return moment.unix(unixTimestamp).format("DD/MM/YYYY");
  };

  // Format date from ISO string
  const formatISODate = (isoDate) => {
    return moment(isoDate).format("DD/MM/YYYY");
  };

  // Check for payment failures
  const hasPaymentFailed = hasFailedPayment(user.account);
  const isPastDue = subscription?.status === "past_due";

  return (
    <Grid item xs={12}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Grid container direction="column" spacing={2}>
          {/* User Email Header */}
          <Grid item>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 0, pl: 0, width: '32px', verticalAlign: 'middle' }}>
                    <AccountCircleIcon 
                      color="primary" 
                      sx={{ fontSize: 32 }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: 0, verticalAlign: 'middle' }}>
                    <Typography variant="h5" component="h1">
                      {user.email}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          {/* Table View */}
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  {/* Icons Row */}
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      {hasPaymentFailed ? (
                        <WarningAmberIcon color="error" sx={{ fontSize: 20 }} />
                      ) : (
                        subscription?.canceled_at ? (
                          <EventIcon color="warning" sx={{ fontSize: 20 }} />
                        ) : (
                          <AutorenewIcon color="success" sx={{ fontSize: 20 }} />
                        )
                      )}
                    </TableCell>
                    {hasPaymentFailed && (
                      <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                        <ErrorOutlineIcon color="error" sx={{ fontSize: 20 }} />
                      </TableCell>
                    )}
                    {isPastDue && (
                      <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                        <WarningAmberIcon color="error" sx={{ fontSize: 20 }} />
                      </TableCell>
                    )}
                  </TableRow>
                  
                  {/* Text Headers Row */}
                  <TableRow>
                    <TableCell sx={{ pt: 0 }}>
                      {hasPaymentFailed ? (
                        <Typography color="error">
                          {t("dashboardPage.failedPaymentAt")}
                        </Typography>
                      ) : (
                        subscription?.canceled_at ? (
                          <Typography color="warning.main">
                            {t("dashboardPage.subscriptionDeactivateOn")}
                          </Typography>
                        ) : (
                          <Typography color="success.main">
                            {t("dashboardPage.subscriptionRenewOn")}
                          </Typography>
                        )
                      )}
                    </TableCell>
                    {hasPaymentFailed && (
                      <TableCell sx={{ pt: 0 }}>
                        <Typography color="error">
                          {t("dashboardPage.subscriptionDeactivateOn")}
                        </Typography>
                      </TableCell>
                    )}
                    {isPastDue && (
                      <TableCell sx={{ pt: 0 }}>
                        <Typography color="error">
                          {t("dashboardPage.checkYourPayments")}
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {hasPaymentFailed ? (
                        <Typography color="error">
                          {formatISODate(user.account.paymentFailedFirstAt)}
                        </Typography>
                      ) : (
                        <Typography color={subscription?.canceled_at ? "warning.main" : "success.main"}>
                          {formatDate(subscription?.current_period_end)}
                        </Typography>
                      )}
                    </TableCell>
                    {hasPaymentFailed && (
                      <TableCell>
                        <Typography color="error">
                          {formatISODate(user.account.paymentFailedSubscriptionEndsAt)}
                        </Typography>
                      </TableCell>
                    )}
                    {isPastDue && (
                      <TableCell>
                        <Button 
                          variant="outlined" 
                          color="error" 
                          size="small"
                          onClick={onUpdatePayment}
                        >
                          {t("dashboardPage.updatePayment")}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UserInfoDesktop;