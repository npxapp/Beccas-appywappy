// pages/Plan/SubscribePlanPage.jsx
import { CreateCustomerCheckoutSession, UpdateAccount } from "api/mutations";
import { Plans } from "api/queries";
import Box from "components/atoms/Box";
import Loader from "components/atoms/Loader";
import AccountForm from "pages/User/AccountForm";
import { ENABLE_CUSTOMER_PORTAL } from "config";
import { formatMoney } from "libs/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from 'contexts/AuthContext';
import StripeForm from "./StripeForm";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Container
} from '@mui/material';

const SubscribePlanPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { planId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [invoicingUpdated, setInvoicingUpdated] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);

  const mutation = useMutation(UpdateAccount);
  const customerCheckoutSessionMutate = useMutation(CreateCustomerCheckoutSession);

  const redirectToCustomerCheckoutSession = async () => {
    const response = await customerCheckoutSessionMutate.mutateAsync({
      planId: selectedPlan.id,
    });
    window.location.href = response.data.redirect_url;
  };

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync({
        accountId: user.accountId,
        data: data,
      });
      setInvoicingUpdated(true);
    } catch (error) {
      setInvoicingUpdated(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { isLoading: plansLoading, data: plansData } = useQuery(
    "Plans",
    Plans,
    {
      retry: false,
      onSuccess: (plansData) => {
        const sp = plansData.data.plans.filter((p) => p.id === planId)[0];
        setSelectedPlan(sp);
        if (plansData?.data?.publicKey) {
          setStripePromise(loadStripe(plansData.data.publicKey));
        }
      },
    }
  );

  // Optional: Configure Stripe Elements appearance
  const options = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
    // Add any other Stripe Elements options here
  };

  if (plansLoading) {
    return <Loader />;
  }

  const renderOrderDetails = () => (
    <Grid container spacing={2}>
      <Grid item container justifyContent="space-between">
        <Typography fontWeight="bold">
          {t("subscribePlanPage.plan")}
        </Typography>
        <Typography>
          {selectedPlan.title}
        </Typography>
      </Grid>
      
      <Grid item container justifyContent="space-between">
        <Typography fontWeight="bold">
          {t("subscribePlanPage.invoicing")}
        </Typography>
        <Typography>
          {selectedPlan.monthly
            ? t("subscribePlanPage.monthly")
            : t("subscribePlanPage.yearly")}
        </Typography>
      </Grid>
      
      <Grid item container justifyContent="space-between">
        <Typography fontWeight="bold">
          {t("subscribePlanPage.price")}
        </Typography>
        <Typography>
          {formatMoney("it", selectedPlan.currency, selectedPlan.price)}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            header={
              <Typography component="h1">
                {t("subscribePlanPage.billingDetails")}
              </Typography>
            }
            body={
              <AccountForm user={user} onSubmit={onSubmit} />
            }
          />
        </Grid>

        {selectedPlan && (
          <Grid item xs={12}>
            <Box
              header={
                <Typography component="h1">
                  {t("subscribePlanPage.yourOrder")}
                </Typography>
              }
              body={renderOrderDetails()}
            />
          </Grid>
        )}

        {invoicingUpdated && (
          <Grid item xs={12}>
            {ENABLE_CUSTOMER_PORTAL ? (
              <Button
                fullWidth
                onClick={redirectToCustomerCheckoutSession}
              >
                {t("subscribePlanPage.subscribe")}
              </Button>
            ) : (
              <Box
                header={
                  <Typography component="h1">
                    {t("subscribePlanPage.creditCard")}
                  </Typography>
                }
                body={
                  stripePromise ? (
                    <Elements stripe={stripePromise} options={options}>
                      <StripeForm
                        planId={planId}
                        selectedPlan={selectedPlan}
                        user={user}
                      />
                    </Elements>
                  ) : (
                    <Loader />
                  )
                }
              />
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SubscribePlanPage;