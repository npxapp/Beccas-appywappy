// components/molecules/SubscriptionInfoDesktop.jsx
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
  TableContainer,
  TableHead,
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
 * SubscriptionInfoDesktop component that displays subscription details in table view
 * 
 * @param {Object} props
 * @param {Object} props.plan - Selected plan object with title, currency, and price
 * @param {Object} props.subscription - Current subscription object
 * @param {Function} props.onCancelSubscription - Function to handle subscription cancellation
 * @param {Function} props.formatMoney - Utility function to format currency
 * 
          <SubscriptionInfoDesktop 
            plan={selectedPlan}
            subscription={currentSubscription}
            onCancelSubscription={handleCancelSubscription}
            formatMoney={formatMoney}
          />
 */
const SubscriptionInfoDesktop = ({
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

          {/* Table View */}
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  {/* Icons Row */}
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      <PaymentsIcon color="action" sx={{ fontSize: 20 }} />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      <AttachMoneyIcon color="action" sx={{ fontSize: 20 }} />
                    </TableCell>
                    {subscription.canceled_at ? (
                      <>
                        <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                          <CancelIcon color="error" sx={{ fontSize: 20 }} />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                          <EventIcon color="warning" sx={{ fontSize: 20 }} />
                        </TableCell>
                      </>
                    ) : (
                      <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                        <AutorenewIcon color="success" sx={{ fontSize: 20 }} />
                      </TableCell>
                    )}
                  </TableRow>
                  
                  {/* Text Headers Row */}
                  <TableRow>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.plan")}
                    </TableCell>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.price")}
                    </TableCell>
                    {subscription.canceled_at ? (
                      <>
                        <TableCell sx={{ pt: 0 }}>
                          {t("dashboardPage.canceledAt")}
                        </TableCell>
                        <TableCell sx={{ pt: 0 }}>
                          {t("dashboardPage.willDeactivateAt")}
                        </TableCell>
                      </>
                    ) : (
                      <TableCell sx={{ pt: 0 }}>
                        {t("dashboardPage.willRenewOn")}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="medium">{plan.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="medium">
                        {formatMoney("it", plan.currency, plan.price)}
                      </Typography>
                    </TableCell>
                    {subscription.canceled_at ? (
                      <>
                        <TableCell>
                          <Typography>
                            {formatDate(subscription.canceled_at)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {formatDate(subscription.current_period_end)}
                          </Typography>
                        </TableCell>
                      </>
                    ) : (
                      <TableCell>
                        <Typography>
                          {formatDate(subscription.current_period_end)}
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                  {/* Action Buttons Row */}
                  <TableRow>
                    <TableCell colSpan={subscription.canceled_at ? 4 : 3} sx={{ pt: 3 }}>
                      <Table size="small" sx={{ '& td': { border: 0, p: 1 } }}>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ width: '50%' }}>
                              <Button 
                                component={Link} 
                                to="/plan" 
                                fullWidth 
                                variant="outlined"
                              >
                                {t("dashboardPage.changePlan")}
                              </Button>
                            </TableCell>
                            {!subscription.canceled_at && (
                              <TableCell sx={{ width: '50%' }}>
                                <Button 
                                  onClick={() => onCancelSubscription(subscription.id)} 
                                  fullWidth
                                  variant="outlined"
                                  color="error"
                                >
                                  {t("dashboardPage.deleteSubscription")}
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
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

export default SubscriptionInfoDesktop;