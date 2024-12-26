import React from 'react';
import { Box } from '@mui/material';
import Stripe from '../../images/Stripe.svg';
import Visa from '../../images/Visa.svg';
import Mastercard from '../../images/Mastercard.svg';
import Discover from '../../images/Discover.svg';
import Amex from '../../images/Amex.svg';
import Apple from '../../images/Apple.svg';
import Google from '../../images/Google.svg';

export function CardProPay() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: 2 }}
        >
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-start"
                gap={2}
                sx={{ width: '100%', maxWidth: 800 }}
            >
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: '0 1 120px' }}>
                    <img src={Stripe} alt="Stripe" style={{ width: '100%', maxWidth: '120px' }} />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: '0 1 120px' }}>
                    <img src={Visa} alt="Visa" style={{ width: '100%', maxWidth: '120px' }} />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: '0 1 120px' }}>
                    <img src={Mastercard} alt="Mastercard" style={{ width: '100%', maxWidth: '120px' }} />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: '0 1 120px' }}>
                    <img src={Discover} alt="Discover" style={{ width: '100%', maxWidth: '120px' }} />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: '0 1 120px' }}>
                    <img src={Amex} alt="Amex" style={{ width: '100%', maxWidth: '120px' }} />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: '0 1 120px' }}>
                    <img src={Apple} alt="Apple" style={{ width: '100%', maxWidth: '120px' }} />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: '0 1 120px' }}>
                    <img src={Google} alt="Google" style={{ width: '100%', maxWidth: '120px' }} />
                </Box>
            </Box>
        </Box>
    );
}