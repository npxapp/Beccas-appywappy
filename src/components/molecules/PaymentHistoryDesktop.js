// components/molecules/PaymentHistoryDesktop.jsx
import { useTranslation } from 'react-i18next';
import moment from 'moment';
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
  Button
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentsIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import LaunchIcon from '@mui/icons-material/Launch';

/**
 * PaymentHistoryDesktop component that displays invoice data in table view
 * 
 * @param {Object} props
 * @param {Array} props.invoicesData - Array of invoice data objects
 * @param {string} props.currency - Currency code for formatting
 * @param {Function} props.formatMoney - Utility function to format currency
 */
const PaymentHistoryDesktop = ({
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

          {/* Table View */}
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  {/* Icons Row */}
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      <DescriptionIcon color="action" sx={{ fontSize: 20 }} />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      <AccountBalanceIcon color="action" sx={{ fontSize: 20 }} />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      <CalendarTodayIcon color="action" sx={{ fontSize: 20 }} />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}>
                      <PaymentsIcon color="action" sx={{ fontSize: 20 }} />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', pb: 0 }}></TableCell>
                  </TableRow>
                  
                  {/* Text Headers Row */}
                  <TableRow>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.paymentId")}
                    </TableCell>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.status")}
                    </TableCell>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.date")}
                    </TableCell>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.total")}
                    </TableCell>
                    <TableCell sx={{ pt: 0 }}>
                      {t("dashboardPage.actions")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInvoices.map((invoice, i) => (
                    <TableRow 
                      key={`table-${i}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <Table size="small" sx={{ '& td': { border: 0, p: 0 } }}>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ pr: 1, width: '24px' }}>
                                <DescriptionIcon color="action" sx={{ fontSize: 20 }} />
                              </TableCell>
                              <TableCell>
                                {invoice.number}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Table size="small" sx={{ '& td': { border: 0, p: 0 } }}>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ pr: 1, width: '24px' }}>
                                {invoice.paid ? (
                                  <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
                                ) : (
                                  <PendingIcon color="warning" sx={{ fontSize: 20 }} />
                                )}
                              </TableCell>
                              <TableCell>
                                {invoice.paid ? t("dashboardPage.paid") : t("dashboardPage.toPay")}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Table size="small" sx={{ '& td': { border: 0, p: 0 } }}>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ pr: 1, width: '24px' }}>
                                <CalendarTodayIcon color="action" sx={{ fontSize: 20 }} />
                              </TableCell>
                              <TableCell>
                                {formatDate(invoice.created)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        <Table size="small" sx={{ '& td': { border: 0, p: 0 } }}>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ pr: 1, width: '24px' }}>
                                <PaymentsIcon color="action" sx={{ fontSize: 20 }} />
                              </TableCell>
                              <TableCell>
                                {formatMoney("it", currency, invoice.total / 100)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        {invoice.hosted_invoice_url && invoice.status === "open" && (
                          <Button
                            component="a"
                            href={invoice.hosted_invoice_url}
                            target="_blank"
                            rel="noreferrer"
                            startIcon={<LaunchIcon />}
                            size="small"
                            variant="outlined"
                          >
                            {t("dashboardPage.toPay")}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PaymentHistoryDesktop;