// components/molecules/PaymentHistory.jsx
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import LaunchIcon from '@mui/icons-material/Launch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentsIcon from '@mui/icons-material/Payment';
import Button from '@mui/material/Button';

/**
 * PaymentHistory component that displays invoice data in grid view
 * 
 * @param {Object} props
 * @param {Array} props.invoicesData - Array of invoice data objects
 * @param {string} props.currency - Currency code for formatting
 * @param {Function} props.formatMoney - Utility function to format currency
 */
const PaymentHistory = ({
  invoicesData = [],
  currency = 'USD',
  formatMoney
}) => {
  const { t } = useTranslation();

  // Filter invoices to only show paid or open ones
  const filteredInvoices = invoicesData.filter(invoice => 
    invoice.status === "paid" || invoice.status === "open"
  );

  // Format date from Unix timestamp
  const formatDate = (unixTimestamp) => {
    return moment.unix(unixTimestamp).format("DD/MM/YYYY");
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Grid container direction="column" spacing={2}>
          {/* Payment History Header */}
          <Grid item>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 0, pl: 0, width: '32px', verticalAlign: 'middle' }}>
                    <ReceiptLongIcon 
                      color="primary" 
                      sx={{ fontSize: 32 }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: 0, verticalAlign: 'middle' }}>
                    <Typography variant="h5" component="h1">
                      {t("dashboardPage.paymentHistory")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          
          {/* Grid View */}
          <Grid item>
            <Grid container spacing={2}>
              {filteredInvoices.map((invoice, i) => (
                <Grid item xs={12} md={6} lg={4} key={`grid-${i}`}>
                  <Paper 
                    elevation={0} 
                    variant="outlined" 
                    sx={{ p: 2, height: '100%' }}
                  >
                    <Grid container direction="column" spacing={2}>
                      <Grid item container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <DescriptionIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle2">
                                {t("dashboardPage.paymentId")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography>{invoice.number}</Typography>
                        </Grid>
                      </Grid>
                      
                      <Grid item container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              {invoice.paid ? (
                                <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
                              ) : (
                                <PendingIcon color="warning" sx={{ fontSize: 20 }} />
                              )}
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle2">
                                {t("dashboardPage.status")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography>
                            {invoice.paid ? t("dashboardPage.paid") : t("dashboardPage.toPay")}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      <Grid item container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <CalendarTodayIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle2">
                                {t("dashboardPage.date")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography>
                            {formatDate(invoice.created)}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      <Grid item container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <PaymentsIcon color="action" sx={{ fontSize: 20 }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle2">
                                {t("dashboardPage.total")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography>
                            {formatMoney("it", currency, invoice.total / 100)}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      {invoice.hosted_invoice_url && invoice.status === "open" && (
                        <Grid item>
                          <Button
                            component="a"
                            href={invoice.hosted_invoice_url}
                            target="_blank"
                            rel="noreferrer"
                            fullWidth
                            variant="outlined"
                            startIcon={<LaunchIcon />}
                          >
                            {t("dashboardPage.toPay")}
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PaymentHistory;