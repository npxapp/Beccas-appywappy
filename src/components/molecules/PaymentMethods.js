// components/molecules/PaymentMethods.jsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import StarIcon from '@mui/icons-material/Star';

/**
 * Payment Methods component that displays credit cards in grid view
 * 
 * @param {Object} props
 * @param {Array} props.cardsData - Array of credit card data objects
 * @param {Object} props.customerData - Customer data object with invoice settings
 * @param {boolean} props.enableCustomerPortal - Flag to enable/disable customer portal features
 * @param {Function} props.onRemoveCard - Function to handle card removal
 * @param {Function} props.onSetDefaultCard - Function to handle setting card as default
 * @param {Function} props.formatMoney - Utility function to format currency
 * @param {string} props.currency - Currency code
          <PaymentMethods 
            cardsData={cardsData?.data || []}
            customerData={data?.data}
            enableCustomerPortal={ENABLE_CUSTOMER_PORTAL}
            onRemoveCard={removeCard}
            onSetDefaultCard={setDefaultCard}
            formatMoney={formatMoney}
            currency={selectedPlan?.currency}
          />
 */
const PaymentMethods = ({
  cardsData = [],
  customerData,
  enableCustomerPortal = false,
  onRemoveCard,
  onSetDefaultCard,
  formatMoney,
  currency = 'USD'
}) => {
  const { t } = useTranslation();

  const isDefaultCard = (cardData) => {
    if (!customerData?.invoice_settings?.default_payment_method) return false;
    
    const defaultId = typeof customerData.invoice_settings.default_payment_method === 'object'
      ? customerData.invoice_settings.default_payment_method.id
      : customerData.invoice_settings.default_payment_method;
    
    return cardData.id === defaultId;
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Grid container direction="column" spacing={2}>
          {/* Payment Methods Header */}
          <Grid item>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 0, pl: 0, width: '32px', verticalAlign: 'middle' }}>
                    <CreditCardIcon 
                      color="primary" 
                      sx={{ fontSize: 32 }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: 0, verticalAlign: 'middle' }}>
                    <Typography variant="h5" component="h1">
                      {t("dashboardPage.paymentMethods")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          {/* Grid View */}
          <>
            {/* Credit Cards List */}
            {cardsData.map((cardData, i) => (
              <Grid 
                item 
                container 
                key={`grid-card-${i}`} 
                justifyContent="space-between" 
                alignItems="center"
                sx={{
                  py: 1,
                  borderBottom: i < cardsData.length - 1 ? 1 : 0,
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
                    {isDefaultCard(cardData) && (
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
                {!enableCustomerPortal && cardsData.length > 1 && (
                  <Grid item>
                    <Grid container spacing={1}>
                      {isDefaultCard(cardData) ? (
                        <Grid item>
                          <Button 
                            disabled
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
                              onClick={() => onRemoveCard(cardData.id)}
                              color="error"
                              size="small"
                              sx={{ minWidth: 'auto' }}
                            >
                              {t("dashboardPage.remove")}
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              onClick={() => onSetDefaultCard(cardData.id)}
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
            {!enableCustomerPortal && (
              <Grid item xs={12} sm={6}>
                <Button 
                  component={Link} 
                  to="/card/add" 
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  {t("dashboardPage.addCreditCard")}
                </Button>
              </Grid>
            )}
          </>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PaymentMethods;