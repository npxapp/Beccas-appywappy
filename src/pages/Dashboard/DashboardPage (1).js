// pages/Dashboard/DashboardPage.jsx
import {
  CancelSubscription,
  CreateCustomerPortalSession,
  RemoveCreditCard,
  SetDefaultCreditCard,
} from "api/mutations";
import { Customer, CustomerCards, CustomerInvoices, Plans } from "api/queries";
import Loader from "layouts/Loader";
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
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import HistoryIcon from '@mui/icons-material/History';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PaymentIcon from '@mui/icons-material/Payment';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

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
          <Grid item>
            <Typography variant="h5" component="h1">
              {user.email}
            </Typography>
          </Grid>
          <Grid item>
            {hasFailedPayment(user.account) ? (
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>
                    {t("dashboardPage.failedPaymentAt")}{" "}
                    {moment(user.account.paymentFailedFirstAt).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {t("dashboardPage.subscriptionDeactivateOn")}{" "}
                    {moment(user.account.paymentFailedSubscriptionEndsAt).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography>
                {currentSubscription.canceled_at ? (
                  <Typography>
                    {t("dashboardPage.subscriptionDeactivateOn")}{" "}
                    {moment.unix(currentSubscription.current_period_end).format("DD/MM/YYYY")}
                  </Typography>
                ) : (
                  <Typography>
                    {t("dashboardPage.subscriptionRenewOn")}{" "}
                    {moment.unix(currentSubscription.current_period_end).format("DD/MM/YYYY")}
                  </Typography>
                )}
              </Typography>
            )}
          </Grid>
          {currentSubscription.status === "past_due" && (
            <Grid item>
              <Typography>
                {t("dashboardPage.checkYourPayments")}
              </Typography>
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
          <Grid item>
            <Typography variant="h5" component="h1">
              {t("dashboardPage.yourSubscription")}
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Typography>{t("dashboardPage.plan")}</Typography>
            <Typography>{selectedPlan.title}</Typography>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Typography>{t("dashboardPage.price")}</Typography>
            <Typography>
              {formatMoney("it", selectedPlan.currency, selectedPlan.price)}
            </Typography>
          </Grid>
          {currentSubscription.canceled_at ? (
            <>
              <Grid item container justifyContent="space-between">
                <Typography>{t("dashboardPage.canceledAt")}</Typography>
                <Typography>
                  {moment.unix(currentSubscription.canceled_at).format("DD/MM/YYYY")}
                </Typography>
              </Grid>
              <Grid item container justifyContent="space-between">
                <Typography>{t("dashboardPage.willDeactivateAt")}</Typography>
                <Typography>
                  {moment.unix(currentSubscription.current_period_end).format("DD/MM/YYYY")}
                </Typography>
              </Grid>
            </>
          ) : (
            <Grid item container justifyContent="space-between">
              <Typography>{t("dashboardPage.willRenewOn")}</Typography>
              <Typography>
                {moment.unix(currentSubscription.current_period_end).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
          )}
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <Button component={Link} to="/plan" fullWidth>
                {t("dashboardPage.changePlan")}
              </Button>
            </Grid>
            {!currentSubscription.canceled_at && (
              <Grid item xs={6}>
                <Button onClick={() => handleCancelSubscription(currentSubscription.id)} fullWidth>
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
          <Grid item>
            <Typography variant="h5" component="h1">
              {t("dashboardPage.paymentMethods")}
            </Typography>
          </Grid>
          {cardsData.data.map((cardData, i) => (
            <Grid item container key={i} justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography>
                  {cardData.card.brand} ... {cardData.card.last4}{" "}
                  {cardData.card.exp_month}/{cardData.card.exp_year}
                </Typography>
              </Grid>
              {!ENABLE_CUSTOMER_PORTAL && cardsData.data.length > 1 && (
                <Grid item>
                  {cardData.id === data.data.invoice_settings.default_payment_method ||
                  cardData.id === data.data.invoice_settings.default_payment_method.id ? (
                    <Button disabled>
                      {t("dashboardPage.default")}
                    </Button>
                  ) : (
                    <>
                      <Button onClick={() => removeCard(cardData.id)}>
                        {t("dashboardPage.remove")}
                      </Button>
                      <Button onClick={() => setDefaultCard(cardData.id)}>
                        {t("dashboardPage.default")}
                      </Button>
                    </>
                  )}
                </Grid>
              )}
            </Grid>
          ))}
          {!ENABLE_CUSTOMER_PORTAL && (
            <Grid item xs={12} sm={6}>
              <Button component={Link} to="/card/add" fullWidth>
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
        <Grid item>
          <Typography variant="h5" component="h1">
            {t("dashboardPage.paymentHistory")}
          </Typography>
        </Grid>
        <Grid item>
          <TableContainer>
            <Table>
              {/* Hide standard header on mobile */}
              <TableHead sx={{ display: { xs: 'none', md: 'table-header-group' } }}>
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
                    <>
                      {/* Mobile view (xs, sm) */}
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
                          }
                        }}
                      >
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {t("dashboardPage.paymentId")}
                          </Typography>
                          <Typography>{invoice.number}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {t("dashboardPage.status")}
                          </Typography>
                          <Typography>
                            {invoice.paid ? t("dashboardPage.paid") : t("dashboardPage.toPay")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {t("dashboardPage.date")}
                          </Typography>
                          <Typography>
                            {moment.unix(invoice.created).format("DD/MM/YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {t("dashboardPage.total")}
                          </Typography>
                          <Typography>
                            {formatMoney("it", selectedPlan.currency, invoice.total / 100)}
                          </Typography>
                        </TableCell>
                        {invoice.hosted_invoice_url && invoice.status === "open" && (
                          <TableCell sx={{ gridColumn: '1 / -1' }}>
                            <Button
                              component="a"
                              href={invoice.hosted_invoice_url}
                              target="_blank"
                              rel="noreferrer"
                              fullWidth
                            >
                              {t("dashboardPage.toPay")}
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>

                      {/* Desktop view (md and up) */}
                      <TableRow 
                        key={`desktop-${i}`}
                        sx={{ display: { xs: 'none', md: 'table-row' } }}
                      >
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