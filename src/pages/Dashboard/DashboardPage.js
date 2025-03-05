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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from 'contexts/AuthContext';
import TrialComponent from "./TrialComponent";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography
} from '@mui/material';

// Import our new reusable components
import UserInfo from 'components/molecules/UserInfo';
import SubscriptionInfo from 'components/molecules/SubscriptionInfo';
import PaymentMethods from 'components/molecules/PaymentMethods';
import PaymentHistory from 'components/molecules/PaymentHistory';

const DashboardPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [currentSubscription, setCurrentSubscription] = useState({});
  const [selectedPlan, setSelectedPlan] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: null, data: null });
  const queryClient = useQueryClient();

  // Mutations remain unchanged
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

  // Handlers remain unchanged
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

  // Queries remain unchanged
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

  // Handle payment update function for UserInfo component
  const handleUpdatePayment = () => {
    if (ENABLE_CUSTOMER_PORTAL) {
      redirectToCustomerPortalSession();
    } else {
      window.location.href = "/card/add";
    }
  };

  return (
    <Grid container spacing={3}>
      {isFreeTrial(user.account) ? (
        <TrialComponent user={user} />
      ) : (
        <>
          {/* Using our new reusable components */}
          <UserInfo 
            user={user} 
            subscription={currentSubscription}
            hasFailedPayment={hasFailedPayment}
            onUpdatePayment={handleUpdatePayment}
            defaultViewMode="table"
          />
          
          <SubscriptionInfo 
            plan={selectedPlan}
            subscription={currentSubscription}
            onCancelSubscription={handleCancelSubscription}
            formatMoney={formatMoney}
            defaultViewMode="table"
          />
          
          <PaymentMethods 
            cardsData={cardsData?.data || []}
            customerData={data?.data}
            enableCustomerPortal={ENABLE_CUSTOMER_PORTAL}
            onRemoveCard={removeCard}
            onSetDefaultCard={setDefaultCard}
            formatMoney={formatMoney}
            currency={selectedPlan?.currency}
            defaultViewMode="table"
          />
          
          <PaymentHistory 
            invoicesData={invoicesData?.data || []}
            currency={selectedPlan?.currency}
            formatMoney={formatMoney}
            defaultViewMode="table"
          />
          
          {renderConfirmDialog()}
        </>
      )}
    </Grid>
  );
};

export default DashboardPage;