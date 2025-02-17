// pages/User/AddCardPage.jsx
import { Plans } from "api/queries";
import { useQuery } from "react-query";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Box from "pages/Dashboard/Box";
import Loader from "layouts/Loader";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import StripeCCForm from "./StripeCCForm";
import {
  Grid,
  Typography
} from '@mui/material';

const AddCardPage = () => {
  const { t } = useTranslation();
  const [stripePromise, setStripePromise] = useState(null);

  const { isLoading: plansLoading, data: plansData } = useQuery(
    "Plans",
    Plans,
    {
      retry: false,
      onSuccess: (data) => {
        if (data?.data?.publicKey) {
          setStripePromise(loadStripe(data.data.publicKey));
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

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          header={
            <Typography component="h1">
              {t("addCardPage.creditCard")}
            </Typography>
          }
          body={
            stripePromise ? (
              <Elements stripe={stripePromise} options={options}>
                <StripeCCForm />
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

export default AddCardPage;