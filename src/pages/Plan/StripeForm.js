// pages/Plan/StripeForm.jsx
import { SetDefaultCreditCard, Subscribe } from "api/mutations";
import Loader from "components/atoms/Loader";
import ConfirmAlert from "libs/confirmAlert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from 'contexts/AuthContext';
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  Grid,
  Box
} from '@mui/material';

const StripeForm = ({ planId, selectedPlan }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({});

  const mutation = useMutation(Subscribe);
  const setDefaultCreditCard = useMutation(SetDefaultCreditCard);

  const refreshQueries = () => {
    queryClient.invalidateQueries(["Customer", user.accountId]);
    queryClient.invalidateQueries(["CustomerInvoices", user.accountId]);
    queryClient.invalidateQueries(["Me"]);
  };

  const redirectToDashboard = () => {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  };

  const handleSuccess = (message = t("stripeForm.paymentCompleted")) => {
    refreshQueries();
    ConfirmAlert.success(message);
    redirectToDashboard();
  };

  const handleError = (error) => {
    console.log("error ------ ", error);
    ConfirmAlert.error(t("stripeForm.paymentFailed") + " " + error.message);
    redirectToDashboard();
    setLoading(false);
  };

  const onStripeSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);
      const response = await mutation.mutateAsync({
        planId: planId
      });

      if (response.data.latest_invoice.payment_intent?.client_secret) {
        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
          response.data.latest_invoice.payment_intent.client_secret,
          {
            setup_future_usage: "off_session",
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: data.cardHolderName,
              },
            },
          }
        );

        if (paymentError) {
          throw new Error(paymentError.message);
        }

        await setDefaultCreditCard.mutate({
          cardId: paymentIntent.payment_method,
        });
        handleSuccess();
      } else if (response.data.latest_invoice.paid) {
        handleSuccess();
      } else {
        handleSuccess(response.data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onStripeSubmit)}>
      {loading && <Loader />}
      
      {selectedPlan.price > 0 && (
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl fullWidth>
              <FormLabel>
                {t("stripeForm.cardOwner")}
              </FormLabel>
              <TextField
                fullWidth
                inputProps={{ maxLength: 256 }}
                {...register("cardHolderName", { required: true })}
              />
              {errors.cardHolderName && (
                <FormHelperText>
                  {errors.cardHolderName.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item>
            <Box>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '18px',
                      color: '#333',
                      '::placeholder': {
                        color: '#aab7c4'
                      },
                      padding: '10px',
                    },
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      )}

      {!loading && (
        <Button
          type="submit"
          fullWidth
          disabled={!stripe}
        >
          {t("stripeForm.subscribe")}
        </Button>
      )}
    </form>
  );
};

export default StripeForm;