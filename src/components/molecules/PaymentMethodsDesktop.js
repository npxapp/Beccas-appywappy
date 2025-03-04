// components/molecules/PaymentMethodsDesktop.jsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import StarIcon from '@mui/icons-material/Star';

/**
 * PaymentMethodsDesktop component that displays credit cards in table view
 * 
 * @param {Object} props
 * @param {Array} props.cardsData - Array of credit card data objects
 * @param {Object} props.customerData - Customer data object with invoice settings
 * @param {boolean} props.enableCustomerPortal - Flag to enable/disable customer portal features
 * @param {Function} props.onRemoveCard - Function to handle card removal
 * @param {Function} props.onSetDefaultCard - Function to handle setting card as default
 * @param {Function} props.formatMoney - Utility function to format currency
 * @param {string} props.currency - Currency code
          <PaymentMethodsDesktop 
            cardsData={cardsData?.data || []}
            customerData={data?.data}
            enableCustomerPortal={ENABLE_CUSTOMER_PORTAL}
            onRemoveCard={removeCard}
            onSetDefaultCard={setDefaultCard}
            formatMoney={formatMoney}
            currency={selectedPlan?.currency}
          />
 */
const PaymentMethodsDesktop = ({
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

          {/* Table View */}
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  {/* Icons Row */}
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      <PaymentIcon 
                        color="action"
                        sx={{ 
                          fontSize: 24,
                          transform: 'rotate(-45deg)'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      <StarIcon 
                        color="action" 
                        sx={{ fontSize: 20 }}
                      />
                    </TableCell>
                    {!enableCustomerPortal && cardsData.length > 1 && (
                      <TableCell sx={{ textAlign: 'center', pb: 0 }}></TableCell>
                    )}
                  </TableRow>
                  
                  {/* Text Headers Row */}
                  <TableRow>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.cardDetails")}
                    </TableCell>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.status")}
                    </TableCell>
                    {!enableCustomerPortal && cardsData.length > 1 && (
                      <TableCell sx={{ pt: 0 }}>
                        {t("dashboardPage.actions")}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cardsData.map((cardData, i) => (
                    <TableRow 
                      key={`table-card-${i}`}
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        borderBottom: i < cardsData.length - 1 ? '1px solid rgba(224, 224, 224, 1)' : 'none'
                      }}
                    >
                      <TableCell>
                        <Table size="small" sx={{ '& td': { border: 0, p: 0 } }}>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Typography>
                                  {cardData.card.brand} ... {cardData.card.last4}{" "}
                                  <Typography component="span" color="text.secondary">
                                    {cardData.card.exp_month}/{cardData.card.exp_year}
                                  </Typography>
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        {isDefaultCard(cardData) && (
                          <Chip 
                            icon={<StarIcon />} 
                            label={t("dashboardPage.default")}
                            color="primary"
                            size="small"
                          />
                        )}
                      </TableCell>
                      {!enableCustomerPortal && cardsData.length > 1 && (
                        <TableCell>
                          <Table size="small" sx={{ '& td': { border: 0, p: 0 } }}>
                            <TableBody>
                              <TableRow>
                                {isDefaultCard(cardData) ? (
                                  <TableCell>
                                    <Button 
                                      disabled
                                      size="small"
                                      sx={{ minWidth: 'auto' }}
                                    >
                                      {t("dashboardPage.default")}
                                    </Button>
                                  </TableCell>
                                ) : (
                                  <>
                                    <TableCell sx={{ pr: 1 }}>
                                      <Button
                                        onClick={() => onRemoveCard(cardData.id)}
                                        color="error"
                                        size="small"
                                        sx={{ minWidth: 'auto' }}
                                      >
                                        {t("dashboardPage.remove")}
                                      </Button>
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        onClick={() => onSetDefaultCard(cardData.id)}
                                        size="small"
                                        sx={{ minWidth: 'auto' }}
                                      >
                                        {t("dashboardPage.default")}
                                      </Button>
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  {/* Add New Card Button Row */}
                  {!enableCustomerPortal && (
                    <TableRow>
                      <TableCell colSpan={!enableCustomerPortal && cardsData.length > 1 ? 3 : 2} sx={{ pt: 3 }}>
                        <Button 
                          component={Link} 
                          to="/card/add" 
                          variant="outlined"
                          sx={{ width: { xs: '100%', sm: '50%' } }}
                        >
                          {t("dashboardPage.addCreditCard")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PaymentMethodsDesktop;