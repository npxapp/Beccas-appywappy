// pages/Plan/PlanPage.jsx
import { Customer, CustomerCards, Plans } from "api/queries";
import Box from "components/atoms/Box";
import Loader from "components/atoms/Loader";
import { isAccountActive, isFreeTrial } from "libs/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from 'contexts/AuthContext';
import PlanCard from "./PlanCard";
import {
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Container
} from '@mui/material';

const PlanPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedPlanRecurring, setSelectedPlanRecurring] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [currentSubscription, setCurrentSubscription] = useState();
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (selectedPlan !== undefined) {
      navigate(`/plan/${selectedPlan}/subscribe`);
    }
  }, [selectedPlan, navigate]);

// eslint-disable-next-line no-unused-vars
const { isLoading, data } = useQuery("Customer", Customer, {
  retry: false,
  onSuccess: (data) => {
    if (!isFreeTrial(user.account)) {
      try {
        const cs = data.data.subscriptions.data[0];
        if (cs) {
          setCurrentSubscription(cs);
        }
      } catch (e) {
        console.error("Error processing subscription:", e); // Log the error if it occurs
      }
    }
  },
});

  const { isLoading: plansLoading, data: plansData } = useQuery(
    "Plans",
    Plans,
    {
      retry: false,
      onSuccess: (data) => {
        // Initialize Stripe with the public key when plans data is loaded
        if (data?.data?.publicKey) {
          setStripePromise(loadStripe(data.data.publicKey));
        }
      },
    }
  );

  const { isLoading: cardsLoading, data: cardsData } = useQuery(
    ["CustomerCards", user.accountId],
    CustomerCards,
    {
      retry: false,
    }
  );

  if (isLoading || plansLoading || cardsLoading) {
    return <Loader />;
  }

  const monthlyPlans = plansData.data.plans.filter(p => p.monthly);
  const yearlyPlans = plansData.data.plans.filter(p => !p.monthly);
  const showRecurringToggle = monthlyPlans.length > 0 && yearlyPlans.length > 0;

  const options = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          header={
            <Container maxWidth="sm">
              <Typography component="h1" align="center">
                {t("planPage.selectaPlan")}
              </Typography>
              {!isAccountActive(user.account) && (
                <Typography align="center">
                  {t("planPage.deactivatedAccountNotice")}
                </Typography>
              )}
            </Container>
          }
          body={
            stripePromise ? (
              <Elements stripe={stripePromise} options={options}>
                <Grid container direction="column" spacing={3}>
                  {showRecurringToggle && (
                    <Grid item>
                      <ButtonGroup fullWidth>
                        <Button
                          onClick={() => setSelectedPlanRecurring(1)}
                          variant={selectedPlanRecurring === 1 ? "contained" : "outlined"}
                        >
                          {t("planPage.monthly")}
                        </Button>
                        <Button
                          onClick={() => setSelectedPlanRecurring(2)}
                          variant={selectedPlanRecurring === 2 ? "contained" : "outlined"}
                        >
                          {t("planPage.yearly")}
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  )}

                  <Grid item>
                    <Grid container spacing={2}>
                      {selectedPlanRecurring === 1 && monthlyPlans.map((plan, i) => (
                        <Grid item xs={12} md={4} key={`monthly-${i}`}>
                          <PlanCard
                            plan={plan}
                            monthly
                            setSelectedPlan={setSelectedPlan}
                            currentSubscription={currentSubscription}
                            cardsData={cardsData.data}
                          />
                        </Grid>
                      ))}

                      {selectedPlanRecurring === 2 && yearlyPlans.map((plan, i) => (
                        <Grid item xs={12} md={4} key={`yearly-${i}`}>
                          <PlanCard
                            plan={plan}
                            monthly={false}
                            setSelectedPlan={setSelectedPlan}
                            currentSubscription={currentSubscription}
                            cardsData={cardsData.data}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Elements>
            ) : (
              <Loader />
            )
          }
        />
      </Grid>
    </Grid>
  );
};

export default PlanPage;