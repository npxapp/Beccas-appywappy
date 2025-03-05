// components/molecules/SubscriptionInfo.jsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';
import EventIcon from '@mui/icons-material/Event';
import AutorenewIcon from '@mui/icons-material/Autorenew';

/**
 * Subscription Info component that displays subscription details in grid view
 * 
 * @param {Object} props
 * @param {Object} props.plan - Selected plan object with title, currency, and price
 * @param {Object} props.subscription - Current subscription object
 * @param {Function} props.onCancelSubscription - Function to handle subscription cancellation
 * @param {Function} props.formatMoney - Utility function to format currency
 * 
          <SubscriptionInfo 
            plan={selectedPlan}
            subscription={currentSubscription}
            onCancelSubscription={handleCancelSubscription}
            formatMoney={formatMoney}
          />
 */
const SubscriptionInfo = ({
  plan,
  subscription,
  onCancelSubscription,
  formatMoney
}) => {
  const { t } = useTranslation();

  // Helper function to format Unix timestamp to date
  const formatDate = (unixTimestamp) => {
    return moment.unix(unixTimestamp).format("DD/MM/YYYY");
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Grid container direction="column" spacing={2}>
          {/* Subscription Header */}
          <Grid item>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 0, pl: 0, width: '32px', verticalAlign: 'middle' }}>
                    <SubscriptionsIcon 
                      color="primary" 
                      sx={{ fontSize: 32 }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: 0, verticalAlign: 'middle' }}>
                    <Typography variant="h5" component="h1">
                      {t("dashboardPage.yourSubscription")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          {/* Grid View */}
          <>
            {/* Plan Info */}
            <Grid item container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <PaymentsIcon 
                      color="action" 
                      sx={{ fontSize: 20 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>{t("dashboardPage.plan")}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography fontWeight="medium">{plan.title}</Typography>
              </Grid>
            </Grid>

            {/* Price Info */}
            <Grid item container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <AttachMoneyIcon 
                      color="action" 
                      sx={{ fontSize: 20 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>{t("dashboardPage.price")}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography fontWeight="medium">
                  {formatMoney("it", plan.currency, plan.price)}
                </Typography>
              </Grid>
            </Grid>

            {/* Subscription Status */}
            {subscription.canceled_at ? (
              <>
                <Grid item container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <CancelIcon 
                          color="error" 
                          sx={{ fontSize: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography>{t("dashboardPage.canceledAt")}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {formatDate(subscription.canceled_at)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <EventIcon 
                          color="warning" 
                          sx={{ fontSize: 20 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography>{t("dashboardPage.willDeactivateAt")}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {formatDate(subscription.current_period_end)}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <AutorenewIcon 
                        color="success" 
                        sx={{ fontSize: 20 }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography>{t("dashboardPage.willRenewOn")}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography>
                    {formatDate(subscription.current_period_end)}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {/* Action Buttons */}
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <Button 
                  component={Link} 
                  to="/plan" 
                  fullWidth 
                  variant="outlined"
                >
                  {t("dashboardPage.changePlan")}
                </Button>
              </Grid>
              {!subscription.canceled_at && (
                <Grid item xs={6}>
                  <Button 
                    onClick={() => onCancelSubscription(subscription.id)} 
                    fullWidth
                    variant="outlined"
                    color="error"
                  >
                    {t("dashboardPage.deleteSubscription")}
                  </Button>
                </Grid>
              )}
            </Grid>
          </>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SubscriptionInfo;