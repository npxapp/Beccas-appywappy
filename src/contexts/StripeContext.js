// contexts/StripeContext.jsx
import { createContext, useContext, useState } from 'react';
import { CardElement, Elements, StripeProvider as BaseStripeProvider, injectStripe } from 'react-stripe-elements';
import { CreateCustomerCheckoutSession, Subscribe, SetDefaultCreditCard } from 'Utils/mutations';
import { useMutation, useQueryClient } from 'react-query';
import ConfirmAlert from 'Utils/confirmAlert';

const StripeContext = createContext(null);

export const StripeProvider = ({ apiKey, children }) => {
  const [loading, setLoading] = useState(false);
  const [cardElement, setCardElement] = useState(null);
  const queryClient = useQueryClient();

  // Mutations
  const subscribeMutation = useMutation(Subscribe);
  const setDefaultCardMutation = useMutation(SetDefaultCreditCard);
  const customerCheckoutMutation = useMutation(CreateCustomerCheckoutSession);

  // Stripe utility functions
  const handleCardPayment = async ({ stripe, clientSecret, cardElement, cardHolderName }) => {
    const paymentResult = await stripe.confirmCardPayment(
      clientSecret,
      {
        setup_future_usage: 'off_session',
        payment_method: {
          card: cardElement,
          billing_details: { name: cardHolderName }
        }
      }
    );

    if (paymentResult.error) {
      throw new Error(paymentResult.error.message);
    }

    return paymentResult;
  };

  const handleSubscription = async ({ planId, stripe, cardElement, cardHolderName, userId }) => {
    try {
      setLoading(true);
      const response = await subscribeMutation.mutateAsync({ planId });

      if (response.data.latest_invoice.payment_intent?.client_secret) {
        const paymentResult = await handleCardPayment({
          stripe,
          clientSecret: response.data.latest_invoice.payment_intent.client_secret,
          cardElement,
          cardHolderName
        });

        await setDefaultCardMutation.mutate({
          cardId: paymentResult.paymentIntent.payment_method
        });

        // Invalidate relevant queries
        queryClient.invalidateQueries(["Customer", userId]);
        queryClient.invalidateQueries(["CustomerInvoices", userId]);
        queryClient.invalidateQueries(["Me"]);

        ConfirmAlert.success('Payment completed successfully');
        return true;
      }
    } catch (error) {
      ConfirmAlert.error(`Payment failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutRedirect = async (planId) => {
    const response = await customerCheckoutMutation.mutateAsync({ planId });
    return response.data.redirect_url;
  };

  const value = {
    // Core Stripe Elements
    CardElement,
    withStripe: (Component) => injectStripe(Component),
    
    // State Management
    loading,
    setLoading,
    cardElement,
    setCardElement,
    
    // Payment Functions
    handleCardPayment,
    handleSubscription,
    handleCheckoutRedirect,
    
    // Utility Functions
    confirmCardSetup: async (stripe, { 
      setupIntent, 
      cardElement, 
      cardHolderName 
    }) => {
      return await stripe.confirmCardSetup(
        setupIntent.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardHolderName }
          }
        }
      );
    }
  };

  return (
    <BaseStripeProvider apiKey={apiKey}>
      <Elements>
        <StripeContext.Provider value={value}>
          {children}
        </StripeContext.Provider>
      </Elements>
    </BaseStripeProvider>
  );
};

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};