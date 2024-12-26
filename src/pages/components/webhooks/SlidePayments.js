import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, IconButton, Typography, Button, Slide } from '@mui/material';
import { useDarkMode } from '../../contexts/DarkMode';
import getCardIcon from './DashboardIcons';
import { usePayment } from '../../contexts/PaymentContext';
import { useSlide } from '../../contexts/SlideContext';

const SlidePayments = () => {
  const { darkMode } = useDarkMode();
  const {
    sessionId,
    setSessionId,
    payments,
    setPayments,
    filteredPayments,
    setFilteredPayments,
    selectedFilter,
    setSelectedFilter,
    setSelectedPayment,
  } = usePayment();
  
  const { 
    loading, 
    setLoading, 
    activeSlide, 
    setActiveSlide,
    setPreviousSlide 
  } = useSlide();
  
  useEffect(() => {
    const fetchPayments = async () => {
      if (!sessionId) {
        const randomSessionId = `npx-app-${Math.random().toString(36).substring(2, 26)}`;
        setSessionId(randomSessionId);
      } else {
        const payload = { session_id: sessionId };

        try {
          const response = await fetch('/npx/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (data.status === 'OK') {
            setPayments(data.payments);
            setFilteredPayments(data.payments.slice(0, 5));
          } else {
            setPayments(null);
          }
        } catch (error) {
          console.error(`Error: ${error.message}`);
          setPayments(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPayments();
  }, [sessionId, setFilteredPayments, setLoading, setPayments, setSessionId]);
  
  const iconProps = {
    fontSize: '8rem',
  };
  
  const handleFilterChange = (filter) => {
    const cleanedFilter = filter.split(' ')[0].toLowerCase();
    setSelectedFilter(cleanedFilter);

    if (cleanedFilter === 'all') {
      setFilteredPayments(payments);
    } else {
      const limit = parseInt(cleanedFilter, 10);
      setFilteredPayments(payments.slice(0, limit));
    }
  };
  
  const handleViewDetails = (payment) => {
    setPreviousSlide(activeSlide);
    setSelectedPayment(payment);
    setActiveSlide(1);
  };
  
  const handleViewRestore = () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(2);
  };
  
  const handleViewSpans = () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(3);
  };
  
  const handleViewRegistryRead = (status) => {
    setPreviousSlide(activeSlide);
    setActiveSlide(5);
  };
  
  const handleViewRegistryCreate = (status) => {
    setPreviousSlide(activeSlide);
    setActiveSlide(4);
  };
  
  // Track both enter and exit directions
  const [slideDirection, setSlideDirection] = useState('right');

  // Modified handlers to set proper directions
  const handleViewSpansWithDirection = () => {
    setSlideDirection('left');
    handleViewSpans();
  };
  
  // Modified handlers to set proper directions
  const handleViewRestoreWithDirection = () => {
    setSlideDirection('right');
    handleViewRestore();
  };

  const handleViewDetailsWithDirection = (payment) => {
    setSlideDirection('left');
    handleViewDetails(payment);
  };
  
  const handleViewRegistryWithDirection = (status) => {
    if(status === 'Create New Record') {
      setSlideDirection('left');
      handleViewRegistryCreate(status);
    } else if(status === 'All Records') {
      setSlideDirection('right');
      handleViewRegistryRead(status);
    }
  };
  
  return (
    <Slide direction={slideDirection} in={activeSlide === 0} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingX: 1,
              my: 2,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {['Create New Record', 'All Records'].map((status) => (
              <Button
                key={status}
                variant={selectedFilter === status.toLowerCase() ? 'contained' : 'outlined'}
                onClick={() => handleViewRegistryWithDirection(status)}
                sx={{
                  flex: '0 0 auto',
                  marginX: 1,
                  color: '#61dafb',
                  borderRadius: 20,
                  border: '1px solid #61dafb',
                  backgroundColor: selectedFilter === status.split(' ')[0].toLowerCase() ? 'rgba(97, 218, 251, .2)' : 'transparent',
                  textTransform: 'none',
                }}
              >
                {status}
              </Button>
            ))}
          </Box>
  
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingX: 1,
              my: 2,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {['Spans Node Edge Graph', 'Spans Traces Endpoints', 'Spans 3D Node Edge', 'All Spans'].map((status) => (
              <Button
                key={status}
                variant={selectedFilter === status.toLowerCase() ? 'contained' : 'outlined'}
                onClick={handleViewSpansWithDirection}
                sx={{
                  flex: '0 0 auto',
                  marginX: 1,
                  color: '#61dafb',
                  borderRadius: 20,
                  border: '1px solid #61dafb',
                  backgroundColor: selectedFilter === status.split(' ')[0].toLowerCase() ? 'rgba(97, 218, 251, .2)' : 'transparent',
                  textTransform: 'none',
                }}
              >
                {status}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingX: 1,
              my: 2,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {['Stripe Reconciliation', 'Stripe Payment Session', 'Stripe Paid Products', 'All Sessions'].map((status) => (
              <Button
                key={status}
                variant={selectedFilter === status.toLowerCase() ? 'contained' : 'outlined'}
                onClick={handleViewRestoreWithDirection}
                sx={{
                  flex: '0 0 auto',
                  marginX: 1,
                  color: '#61dafb',
                  borderRadius: 20,
                  border: '1px solid #61dafb',
                  backgroundColor: selectedFilter === status.split(' ')[0].toLowerCase() ? 'rgba(97, 218, 251, .2)' : 'transparent',
                  textTransform: 'none',
                }}
              >
                {status}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingX: 1,
              my: 2,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {['5 Payments', '10 Payments', '50 Payments', 'All Payments'].map((status) => (
              <Button
                key={status}
                variant={selectedFilter === status.toLowerCase() ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange(status.toLowerCase())}
                sx={{
                  flex: '0 0 auto',
                  marginX: 1,
                  color: '#61dafb',
                  borderRadius: 20,
                  border: '1px solid #61dafb',
                  backgroundColor: selectedFilter === status.split(' ')[0].toLowerCase() ? 'rgba(97, 218, 251, .2)' : 'transparent',
                  textTransform: 'none',
                }}
              >
                {status}
              </Button>
            ))}
          </Box>
        </Box>
        {loading ? (
          <CircularProgress sx={{ color: darkMode ? '#61dafb' : '#007fff' }} />
        ) : (
          filteredPayments.map((payment) => (
            <Box
              key={payment.id}
              sx={{
                borderRadius: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 4,
                py: 2,
                width: { xs: '90%', sm: '80%', md: '60%', lg: '50%', xl: '40%' },
                border: '1px solid #61dafb',
              }}
              onClick={() => handleViewDetailsWithDirection(payment)}
            >
              <IconButton
                sx={{
                  position: 'relative',
                  padding: 0,
                  borderRadius: '50%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {getCardIcon(payment.card_type, iconProps)}
                <Typography
                  variant="body2"
                  sx={{
                    position: 'absolute',
                    top: '-10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#61dafb',
                    fontSize: '1.75rem',
                  }}
                >
                  {payment.payment_status}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#61dafb',
                    fontSize: '2rem',
                  }}
                >
                  {payment.card_last4}
                </Typography>
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Slide>
  );
};

export default SlidePayments;