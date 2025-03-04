// components/molecules/UserInfo.jsx
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EventIcon from '@mui/icons-material/Event';
import AutorenewIcon from '@mui/icons-material/Autorenew';

/**
 * UserInfo component that displays user details and subscription status
 * 
 * @param {Object} props
 * @param {Object} props.user - User object containing email and account data
 * @param {Object} props.subscription - Current subscription object
 * @param {Function} props.hasFailedPayment - Utility function to check for failed payments
 * @param {Function} props.onUpdatePayment - Optional handler for payment update button
 * 
          <UserInfo 
            user={user} 
            subscription={currentSubscription}
            hasFailedPayment={hasFailedPayment}
            onUpdatePayment={handleUpdatePayment}
          />
 */
const UserInfo = ({
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

          {/* Grid View */}
          <>
            {/* Failed Payment Warning */}
            {hasPaymentFailed ? (
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <WarningAmberIcon 
                          color="error" 
                          sx={{ fontSize: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography color="error">
                          {t("dashboardPage.failedPaymentAt")}{" "}
                          {formatISODate(user.account.paymentFailedFirstAt)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <ErrorOutlineIcon 
                          color="error" 
                          sx={{ fontSize: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography color="error">
                          {t("dashboardPage.subscriptionDeactivateOn")}{" "}
                          {formatISODate(user.account.paymentFailedSubscriptionEndsAt)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item>
                {subscription && (
                  <Typography>
                    {subscription.canceled_at ? (
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <EventIcon 
                            color="warning" 
                            sx={{ fontSize: 20 }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography color="warning.main">
                            {t("dashboardPage.subscriptionDeactivateOn")}{" "}
                            {formatDate(subscription.current_period_end)}
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <AutorenewIcon 
                            color="success" 
                            sx={{ fontSize: 20 }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography color="success.main">
                            {t("dashboardPage.subscriptionRenewOn")}{" "}
                            {formatDate(subscription.current_period_end)}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Typography>
                )}
              </Grid>
            )}

            {/* Past Due Warning */}
            {isPastDue && (
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <WarningAmberIcon 
                      color="error" 
                      sx={{ fontSize: 20 }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography color="error">
                      {t("dashboardPage.checkYourPayments")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      onClick={onUpdatePayment}
                    >
                      {t("dashboardPage.updatePayment")}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UserInfo;