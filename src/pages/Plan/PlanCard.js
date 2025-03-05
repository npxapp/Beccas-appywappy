// pages/Plan/PlanCard.jsx
import { CreateCustomerPortalSession, Subscribe } from "api/mutations";
import Loader from "components/atoms/Loader";
import { ENABLE_CUSTOMER_PORTAL } from "config";
import ConfirmAlert from "libs/confirmAlert";
import { formatMoney } from "libs/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useStripe } from '@stripe/react-stripe-js';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const PlanCard = ({
  plan,
  monthly,
  setSelectedPlan,
  currentSubscription,
  cardsData,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const queryClient = useQueryClient();
  const stripe = useStripe();

  const mutation = useMutation(Subscribe);
  const customerPortalSessionMutate = useMutation(CreateCustomerPortalSession);

  const redirectToCustomerPortalSession = async () => {
    const response = await customerPortalSessionMutate.mutateAsync();
    window.location.href = response.data.redirect_url;
  };

  const handleSuccess = (message = t("planCard.planUpdated")) => {
    queryClient.invalidateQueries(["Me"]);
    ConfirmAlert.success(message);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  };

  const onUpdatePlanSubmit = async (planId) => {
    if (!stripe) {
      return;
    }

    try {
      setLoading(true);
      const response = await mutation.mutateAsync({ planId });

      if (response.data.latest_invoice.payment_intent?.client_secret) {
        const { error } = await stripe.confirmCardPayment(
          response.data.latest_invoice.payment_intent.client_secret,
          {
            setup_future_usage: "off_session",
          }
        );

        if (error) {
          throw new Error(error.message);
        }
        handleSuccess();
      } else if (response.data.latest_invoice.paid) {
        handleSuccess();
      } else {
        handleSuccess(response.data.message);
      }
    } catch (error) {
      console.log("error ---- ", error);
      ConfirmAlert.error(t("stripeForm.paymentFailed"));
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
      setLoading(false);
    }
  };

  const handlePlanUpdate = (planId) => {
    if (ENABLE_CUSTOMER_PORTAL) {
      return redirectToCustomerPortalSession();
    }
    setConfirmDialog(true);
  };

  const renderButton = () => {
    if (!currentSubscription) {
      return (
        <Button
          fullWidth
          onClick={() => setSelectedPlan(plan.id)}
        >
          {t("planCard.selectPlan")}
        </Button>
      );
    }

    const isCurrentPlan = currentSubscription.plan.id === plan.id;
    const isActive = currentSubscription.status === "active";
    const isPastDue = currentSubscription.status === "past_due";
    const isIncomplete = currentSubscription.status === "incomplete";

    if (isCurrentPlan && isActive) {
      return (
        <Button fullWidth disabled>
          {t("planCard.currentPlan")}
        </Button>
      );
    }

    if (isCurrentPlan && isPastDue) {
      return (
        <Button fullWidth>
          {t("planCard.toPay")}
        </Button>
      );
    }

    if (isActive || isIncomplete) {
      return (
        <Button
          fullWidth
          onClick={() => cardsData.length === 0 
            ? setSelectedPlan(plan.id)
            : handlePlanUpdate(plan.id)
          }
        >
          {t("planCard.changePlan")}
        </Button>
      );
    }
  };

  return (
    <>
      <Card>
        {loading ? (
          <Loader />
        ) : (
          <>
            <CardHeader
              title={
                <Typography>
                  {plan.title}
                  <br />
                  {formatMoney("it", plan.currency, plan.price)}
                  {monthly ? t("planCard.month") : t("planCard.year")}
                </Typography>
              }
            />
            <CardContent>
              <List>
                {plan.features.map((feature, i) => (
                  <ListItem key={`feature-${i}`}>
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary={t(feature)} />
                  </ListItem>
                ))}
              </List>
              {renderButton()}
            </CardContent>
          </>
        )}
      </Card>

      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
      >
        <DialogTitle>
          {t("planCard.updateSubscription")}
        </DialogTitle>
        <DialogContent>
          {t("planCard.areYouSure")}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>
            {t("planCard.no")}
          </Button>
          <Button
            onClick={() => {
              setConfirmDialog(false);
              onUpdatePlanSubmit(plan.id);
            }}
          >
            {t("planCard.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlanCard;