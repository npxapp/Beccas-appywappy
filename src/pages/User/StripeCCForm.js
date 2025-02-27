// pages/User/StripeCCForm.jsx
import { CreateSetupIntent, SetDefaultCreditCard } from "api/mutations";
import Loader from "components/atoms/Loader";
import ConfirmAlert from "libs/confirmAlert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  Button,
  Grid
} from '@mui/material';

const StripeCCForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({});

  const setupIntentMutation = useMutation(CreateSetupIntent);
  const setDefaultCreditCard = useMutation(SetDefaultCreditCard);

  const onStripeSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);
      const setupIntent = await setupIntentMutation.mutateAsync();

      const response = await stripe.confirmCardSetup(
        setupIntent.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: data.cardHolderName,
            },
          },
        }
      );

      if (response) {
        if (response.error) {
          throw new Error(response.error.message);
        }
        
        await setDefaultCreditCard.mutate({
          cardId: response.setupIntent.payment_method,
        });

        setTimeout(() => {
          ConfirmAlert.success(t("stripeCCForm.cardAdded"));
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      ConfirmAlert.error(t("stripeCCForm.addCardFailed") + " " + error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onStripeSubmit)}>
      {loading && <Loader />}
      
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl fullWidth>
            <FormLabel>
              {t("stripeCCForm.cardOwner")}
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
          <FormControl fullWidth>
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
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            type="submit"
            fullWidth
            disabled={!stripe}
          >
            {t("stripeCCForm.addCard")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StripeCCForm;