// pages/Dashboard/DashboardPage.jsx
import {
  CancelSubscription,
  CreateCustomerPortalSession,
  RemoveCreditCard,
  SetDefaultCreditCard,
} from "api/mutations";
import { Customer, CustomerCards, CustomerInvoices, Plans } from "api/queries";
import Loader from "components/atoms/Loader";
import { ENABLE_CUSTOMER_PORTAL } from "config";
import { formatMoney, hasFailedPayment, isFreeTrial } from "libs/utils";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useAuth } from 'contexts/AuthContext';
import TrialComponent from "./TrialComponent";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EventIcon from '@mui/icons-material/Event';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PendingIcon from '@mui/icons-material/Pending';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LaunchIcon from '@mui/icons-material/Launch';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';

const DashboardPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [currentSubscription, setCurrentSubscription] = useState({});
  const [selectedPlan, setSelectedPlan] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: null, data: null });
  const queryClient = useQueryClient();

  // ... mutations remain unchanged ...
  const cancelSubscriptionMutate = useMutation(CancelSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Customer", user.accountId]);
      queryClient.invalidateQueries(["CustomerInvoices", user.accountId]);
    },
  });

  const removeCardMutate = useMutation(RemoveCreditCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["CustomerCards", user.accountId]);
    },
  });

  const setDefaultCardMutate = useMutation(SetDefaultCreditCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Customer", user.accountId]);
    },
  });

  const customerPortalSessionMutate = useMutation(CreateCustomerPortalSession, {});

  // ... handlers remain unchanged ...
const handleConfirmAction = () => {
  const { type, data } = confirmDialog;
  switch (type) {
    case 'cancelSubscription':
      cancelSubscriptionMutate.mutate({ subscriptionId: data });
      break;
    case 'removeCard':
      removeCardMutate.mutate({ cardId: data });
      break;
    case 'setDefaultCard':
      setDefaultCardMutate.mutate({ cardId: data });
      break;
    default:
      console.log(`Unknown confirmDialog type: ${type}`);
  }
  setConfirmDialog({ open: false, type: null, data: null });
};

  const redirectToCustomerPortalSession = async () => {
    const response = await customerPortalSessionMutate.mutateAsync();
    window.location.href = response.data.redirect_url;
  };

  const handleCancelSubscription = (subscriptionId) => {
    if (ENABLE_CUSTOMER_PORTAL) {
      return redirectToCustomerPortalSession();
    }
    setConfirmDialog({
      open: true,
      type: 'cancelSubscription',
      data: subscriptionId,
      title: t("dashboardPage.unsubscribe"),
      message: t("dashboardPage.areYouSureToUnsubscribe")
    });
  };

  const removeCard = (cardId) => {
    setConfirmDialog({
      open: true,
      type: 'removeCard',
      data: cardId,
      title: t("dashboardPage.removeCard"),
      message: t("dashboardPage.areYouSureToRemoveCard")
    });
  };

  const setDefaultCard = (cardId) => {
    setConfirmDialog({
      open: true,
      type: 'setDefaultCard',
      data: cardId,
      title: t("dashboardPage.makeDefault"),
      message: t("dashboardPage.areYouSureMakeDefault")
    });
  };

  // ... queries remain unchanged ...
  const { isLoading: plansLoading, data: plansData } = useQuery("Plans", Plans, {
    retry: false,
  });

  const { isLoading, data } = useQuery(["Customer", user.accountId], Customer, {
    retry: false,
    onSuccess: (data) => {
      if (!isFreeTrial(user.account)) {
        const cs = data.data.subscriptions.data[0];
        if (cs) {
          setCurrentSubscription(cs);
          const sp = plansData.data.plans.filter((p) => p.id === cs.plan.id)[0];
          setSelectedPlan(sp);
        } else {
          window.location.href = "/plan";
        }
      }
    },
  });

  const { isLoading: cardsLoading, data: cardsData } = useQuery(
    ["CustomerCards", user.accountId],
    CustomerCards,
    { retry: false }
  );

  const { isLoading: invoicesLoading, data: invoicesData } = useQuery(
    ["CustomerInvoices", user.accountId],
    CustomerInvoices,
    { retry: false }
  );

  if (isLoading || plansLoading || cardsLoading || invoicesLoading) {
    return <Loader />;
  }

const renderUserInfo = () => (
  <Grid item xs={12}>
    <Paper elevation={1} sx={{ p: 3 }}>
      <Grid container direction="column" spacing={2}>
        {/* User Email Header */}
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <AccountCircleIcon 
                color="primary" 
                sx={{ fontSize: 32 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h1">
                {user.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Failed Payment Warning */}
        {hasFailedPayment(user.account) ? (
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
                      {moment(user.account.paymentFailedFirstAt).format("DD/MM/YYYY")}
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
                      {moment(user.account.paymentFailedSubscriptionEndsAt).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Typography>
              {currentSubscription.canceled_at ? (
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
                      {moment.unix(currentSubscription.current_period_end).format("DD/MM/YYYY")}
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
                      {moment.unix(currentSubscription.current_period_end).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Typography>
          </Grid>
        )}

        {/* Past Due Warning */}
        {currentSubscription.status === "past_due" && (
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
                  {t("dashboardPage.checkYourPayments")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  </Grid>
);

const renderSubscriptionInfo = () => (
  <Grid item xs={12} md={6}>
    <Paper elevation={1} sx={{ p: 3 }}>
      <Grid container direction="column" spacing={2}>
        {/* Subscription Header */}
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <SubscriptionsIcon 
                color="primary" 
                sx={{ fontSize: 32 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h1">
                {t("dashboardPage.yourSubscription")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

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
            <Typography fontWeight="medium">{selectedPlan.title}</Typography>
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
              {formatMoney("it", selectedPlan.currency, selectedPlan.price)}
            </Typography>
          </Grid>
        </Grid>

        {/* Subscription Status */}
        {currentSubscription.canceled_at ? (
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
                  {moment.unix(currentSubscription.canceled_at).format("DD/MM/YYYY")}
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
                  {moment.unix(currentSubscription.current_period_end).format("DD/MM/YYYY")}
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
                {moment.unix(currentSubscription.current_period_end).format("DD/MM/YYYY")}
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
              startIcon={<CompareArrowsIcon />}
            >
              {t("dashboardPage.changePlan")}
            </Button>
          </Grid>
          {!currentSubscription.canceled_at && (
            <Grid item xs={6}>
              <Button 
                onClick={() => handleCancelSubscription(currentSubscription.id)} 
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
              >
                {t("dashboardPage.deleteSubscription")}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  </Grid>
);

const renderPaymentMethods = () => (
  <Grid item xs={12} md={6}>
    <Paper elevation={1} sx={{ p: 3 }}>
      <Grid container direction="column" spacing={2}>
        {/* Payment Methods Header */}
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CreditCardIcon 
                color="primary" 
                sx={{ fontSize: 32 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h1">
                {t("dashboardPage.paymentMethods")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Credit Cards List */}
        {cardsData.data.map((cardData, i) => (
          <Grid 
            item 
            container 
            key={i} 
            justifyContent="space-between" 
            alignItems="center"
            sx={{
              py: 1,
              borderBottom: i < cardsData.data.length - 1 ? 1 : 0,
              borderColor: 'divider'
            }}
          >
            {/* Card Information */}
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <PaymentIcon 
                    color="action"
                    sx={{ 
                      fontSize: 24,
                      transform: 'rotate(-45deg)'
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography>
                    {cardData.card.brand} ... {cardData.card.last4}{" "}
                    <Typography component="span" color="text.secondary">
                      {cardData.card.exp_month}/{cardData.card.exp_year}
                    </Typography>
                  </Typography>
                </Grid>
                {(cardData.id === data.data.invoice_settings.default_payment_method ||
                  cardData.id === data.data.invoice_settings.default_payment_method.id) && (
                  <Grid item>
                    <StarIcon 
                      color="primary" 
                      sx={{ fontSize: 20 }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Card Actions */}
            {!ENABLE_CUSTOMER_PORTAL && cardsData.data.length > 1 && (
              <Grid item>
                <Grid container spacing={1}>
                  {cardData.id === data.data.invoice_settings.default_payment_method ||
                   cardData.id === data.data.invoice_settings.default_payment_method.id ? (
                    <Grid item>
                      <Button 
                        disabled
                        startIcon={<StarIcon />}
                        size="small"
                        sx={{ minWidth: 'auto' }}
                      >
                        {t("dashboardPage.default")}
                      </Button>
                    </Grid>
                  ) : (
                    <>
                      <Grid item>
                        <Button
                          onClick={() => removeCard(cardData.id)}
                          startIcon={<DeleteOutlineIcon />}
                          color="error"
                          size="small"
                          sx={{ minWidth: 'auto' }}
                        >
                          {t("dashboardPage.remove")}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => setDefaultCard(cardData.id)}
                          startIcon={<StarOutlineIcon />}
                          size="small"
                          sx={{ minWidth: 'auto' }}
                        >
                          {t("dashboardPage.default")}
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        ))}

        {/* Add New Card Button */}
        {!ENABLE_CUSTOMER_PORTAL && (
          <Grid item xs={12} sm={6}>
            <Button 
              component={Link} 
              to="/card/add" 
              fullWidth
              variant="outlined"
              startIcon={<AddCardIcon />}
              sx={{ mt: 2 }}
            >
              {t("dashboardPage.addCreditCard")}
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  </Grid>
);

  /*const renderPaymentHistory = () => (
    <Grid item xs={12}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h5" component="h1">
              {t("dashboardPage.paymentHistory")}
            </Typography>
          </Grid>
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("dashboardPage.paymentId")}</TableCell>
                    <TableCell>{t("dashboardPage.status")}</TableCell>
                    <TableCell>{t("dashboardPage.date")}</TableCell>
                    <TableCell>{t("dashboardPage.total")}</TableCell>
                    <TableCell>{t("dashboardPage.actions")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoicesData.data
                    .filter(invoice => invoice.status === "paid" || invoice.status === "open")
                    .map((invoice, i) => (
                      <TableRow key={i}>
                        <TableCell>{invoice.number}</TableCell>
                        <TableCell>
                          {invoice.paid ? t("dashboardPage.paid") : t("dashboardPage.toPay")}
                        </TableCell>
                        <TableCell>
                          {moment.unix(invoice.created).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {formatMoney("it", selectedPlan.currency, invoice.total / 100)}
                        </TableCell>
                        <TableCell>
                          {invoice.hosted_invoice_url && invoice.status === "open" && (
                            <Button
                              component="a"
                              href={invoice.hosted_invoice_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {t("dashboardPage.toPay")}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );*/

const renderPaymentHistory = () => (
  <Grid item xs={12}>
    <Paper elevation={1} sx={{ p: 3 }}>
      <Grid container direction="column" spacing={2}>
        {/* Payment History Header */}
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <ReceiptLongIcon 
                color="primary" 
                sx={{ fontSize: 32 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h1">
                {t("dashboardPage.paymentHistory")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <TableContainer>
            <Table>
              {/* Desktop Header - Hidden on Mobile */}
              <TableHead sx={{ display: { xs: 'none', md: 'table-header-group' } }}>
                <TableRow>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <DescriptionIcon color="action" sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        {t("dashboardPage.paymentId")}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <AccountBalanceIcon color="action" sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        {t("dashboardPage.status")}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <CalendarTodayIcon color="action" sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        {t("dashboardPage.date")}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <PaymentsIcon color="action" sx={{ fontSize: 20 }} />
                      </Grid>
                      <Grid item>
                        {t("dashboardPage.total")}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>{t("dashboardPage.actions")}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoicesData.data
                  .filter(invoice => invoice.status === "paid" || invoice.status === "open")
                  .map((invoice, i) => (
                    <>
                      {/* Mobile View */}
                      <TableRow 
                        key={`mobile-${i}`} 
                        sx={{ 
                          display: { xs: 'grid', md: 'none' },
                          gridTemplateColumns: '1fr 1fr',
                          gap: 1,
                          '& > td': {
                            border: 0,
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: 0.5,
                            padding: 1
                          },
                          borderBottom: 1,
                          borderColor: 'divider'
                        }}
                      >
                        <TableCell>
                          <Grid container spacing={1}>
                            <Grid item>
                              <DescriptionIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item xs>
                              <Typography variant="caption" color="text.secondary">
                                {t("dashboardPage.paymentId")}
                              </Typography>
                              <Typography>{invoice.number}</Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={1}>
                            <Grid item>
                              {invoice.paid ? (
                                <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
                              ) : (
                                <PendingIcon color="warning" sx={{ fontSize: 20 }} />
                              )}
                            </Grid>
                            <Grid item xs>
                              <Typography variant="caption" color="text.secondary">
                                {t("dashboardPage.status")}
                              </Typography>
                              <Typography>
                                {invoice.paid ? t("dashboardPage.paid") : t("dashboardPage.toPay")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={1}>
                            <Grid item>
                              <CalendarTodayIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item xs>
                              <Typography variant="caption" color="text.secondary">
                                {t("dashboardPage.date")}
                              </Typography>
                              <Typography>
                                {moment.unix(invoice.created).format("DD/MM/YYYY")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={1}>
                            <Grid item>
                              <PaymentsIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item xs>
                              <Typography variant="caption" color="text.secondary">
                                {t("dashboardPage.total")}
                              </Typography>
                              <Typography>
                                {formatMoney("it", selectedPlan.currency, invoice.total / 100)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        {invoice.hosted_invoice_url && invoice.status === "open" && (
                          <TableCell sx={{ gridColumn: '1 / -1' }}>
                            <Button
                              component="a"
                              href={invoice.hosted_invoice_url}
                              target="_blank"
                              rel="noreferrer"
                              fullWidth
                              variant="outlined"
                              startIcon={<LaunchIcon />}
                            >
                              {t("dashboardPage.toPay")}
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>

                      {/* Desktop View */}
                      <TableRow 
                        key={`desktop-${i}`}
                        sx={{ 
                          display: { xs: 'none', md: 'table-row' },
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <DescriptionIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item>{invoice.number}</Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              {invoice.paid ? (
                                <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
                              ) : (
                                <PendingIcon color="warning" sx={{ fontSize: 20 }} />
                              )}
                            </Grid>
                            <Grid item>
                              {invoice.paid ? t("dashboardPage.paid") : t("dashboardPage.toPay")}
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <CalendarTodayIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item>
                              {moment.unix(invoice.created).format("DD/MM/YYYY")}
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <PaymentsIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item>
                              {formatMoney("it", selectedPlan.currency, invoice.total / 100)}
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          {invoice.hosted_invoice_url && invoice.status === "open" && (
                            <Button
                              component="a"
                              href={invoice.hosted_invoice_url}
                              target="_blank"
                              rel="noreferrer"
                              startIcon={<LaunchIcon />}
                              size="small"
                              variant="outlined"
                            >
                              {t("dashboardPage.toPay")}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
);

  const renderConfirmDialog = () => (
    <Dialog
      open={confirmDialog.open}
      onClose={() => setConfirmDialog({ open: false, type: null, data: null })}
    >
      <DialogTitle>{confirmDialog.title}</DialogTitle>
      <DialogContent>
        <Typography>{confirmDialog.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDialog({ open: false, type: null, data: null })}>
          {t("dashboardPage.no")}
        </Button>
        <Button onClick={handleConfirmAction}>
          {t("dashboardPage.yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Grid container spacing={3}>
      {isFreeTrial(user.account) ? (
        <TrialComponent user={user} />
      ) : (
        <>
          {renderUserInfo()}
          {renderSubscriptionInfo()}
          {renderPaymentMethods()}
          {renderPaymentHistory()}
          {renderConfirmDialog()}
        </>
      )}
    </Grid>
  );
};

export default DashboardPage;

