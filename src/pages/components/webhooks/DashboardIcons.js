import React from 'react';
import VisaIcon from '../../images/Visa';
import MastercardIcon from '../../images/Mastercard';
import DiscoverIcon from '../../images/Discover';
import AmexIcon from '../../images/Amex';
import StripeIcon from '../../images/Stripe';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * Returns the corresponding icon component for a given card type.
 * @param {string} cardType - The type of the card (e.g., 'visa', 'mastercard').
 * @returns {JSX.Element} - The card icon component.
 */
const getCardIcon = (cardType, iconProps) => {
  switch (cardType) {
    case 'visa':
      return <VisaIcon sx={iconProps} />;
    case 'mastercard':
      return <MastercardIcon sx={iconProps} />;
    case 'discover':
      return <DiscoverIcon sx={iconProps} />;
    case 'amex':
      return <AmexIcon sx={iconProps} />;
    case 'All Records':
      return <AdminPanelSettingsIcon sx={iconProps} />;
    case 'Create New Record':
      return <CheckCircleIcon sx={iconProps} />;
    default:
      return <StripeIcon sx={iconProps} />;
  }
};

export default getCardIcon;

