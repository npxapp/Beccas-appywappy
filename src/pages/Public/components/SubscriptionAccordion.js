// pages/Public/components/SubscriptionAccordion.jsx
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PaymentIcon from '@mui/icons-material/Payment';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAccordionContext } from 'contexts/AccordionContext';

const accordionItems = [
  {
    id: 'panel1',
    title: 'Starter SaaS',
    icon: <RocketLaunchIcon />,
    content: "Save months of development with a production-ready SaaS template. Powered by Go/Node APIs and a React frontend, easy to customize. Launch your next big idea in minutes with built-in essentials.",
  },
  {
    id: 'panel2',
    title: 'Step 1',
    icon: <PaymentIcon />,
    content: "Seamless Stripe integration for recurring payments and trials. Users can manage subscriptions, change plans, and update billing info. Automated email notifications for payments and failed transactions.",
  },
  {
    id: 'panel3',
    title: 'Step 2',
    icon: <ElectricBoltIcon />, // Replaced BuildIcon with ElectricBoltIcon
    content: "Includes a customizable landing page and pricing page. Built-in background tasks for customer notifications and payments. Powered by MongoDB, React, and API-first architecture.",
  },
  {
    id: 'panel4',
    title: 'Step 3',
    icon: <TrendingUpIcon />,
    content: "Proven in production with real-world SaaS businesses. Complete authentication, email verification, and user management. Focus on your unique features while leveraging a solid foundation.",
  },
];

const SubscriptionAccordion = () => {
  const { expanded, handleChange } = useAccordionContext();

  return (
    <Box sx={{ width: '100%' }}>
      {accordionItems.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          sx={{ 
            width: '100%',
            margin: '0 !important',
            '&.Mui-expanded': {
              marginTop: '0 !important',
              marginBottom: '0 !important',
            }
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {item.icon}
              <Typography variant="h6" sx={{ animation: 'glow 2s ease-in-out infinite' }}>
                {item.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1.5,
                cursor: 'pointer',
                borderRadius: 1,
                '&:hover': { bgcolor: 'rgba(97,218,251,0.1)' },
              }}
            >
              <Typography>{item.content}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default SubscriptionAccordion;