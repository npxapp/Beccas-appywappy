// ./src/pages/components/PaywallCards.js
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useSearchLinksUtils } from './Utils/searchLinksUtils';

// Create context for stripe links
const StripeLinksContext = createContext({});

const CommonStyles = () => (
  <style jsx global>{`
    .price-card {
      background: linear-gradient(135deg, rgba(97, 218, 251, 0.15), rgba(97, 218, 251, 0.95));
      border-radius: 20px;
      padding: 2rem;
      width: 100%;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }

    .price-card h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .price {
      font-size: 3rem;
      font-weight: bold;
      margin: 1.5rem 0;
      color: #61DAFB;
      text-shadow: 0 0 10px rgba(97, 218, 251, 0.5);
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 2rem 0;
      text-align: left;
    }

    .features li {
      margin: 1rem 0;
      padding-left: 1.5rem;
      position: relative;
      color: #fff;
    }

    .features li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #61DAFB;
    }

    .btn {
      background: rgba(97, 218, 251, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1rem 2rem;
      border-radius: 30px;
      color: #fff;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn:hover {
      background: rgba(97, 218, 251, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(97, 218, 251, 0.3);
    }

    @media (min-width: 600px) {
      .price-card {
        width: 280px;
      }
    }
    @media (min-width: 900px) {
      .price-card {
        width: 350px;
      }
    }
    @media (min-width: 1200px) {
      .price-card {
        width: 420px;
      }
    }
    @media (min-width: 1536px) {
      .price-card {
        width: 480px;
      }
    }
  `}</style>
);

// Links Provider Component
const StripeLinksProvider = ({ children }) => {
  const [basicUrl, setBasicUrl] = useState('');
  const [premiumUrl, setPremiumUrl] = useState('');
  const [proUrl, setProUrl] = useState('');
  const [basicLoading, setBasicLoading] = useState(true);
  const [premiumLoading, setPremiumLoading] = useState(true);
  const [proLoading, setProLoading] = useState(true);
  const [hasReceivedResponse, setHasReceivedResponse] = useState(false);

  const { getSearchLinks } = useSearchLinksUtils();

const fetchStripeLinks = useCallback(async () => {
  if (hasReceivedResponse) return;

  try {
    const stripe1Response = await getSearchLinks('Stripe 1');
    if (stripe1Response.first) {
      setBasicUrl(stripe1Response.first.link_url);
      setBasicLoading(false);
    }

    const stripe2Response = await getSearchLinks('Stripe 2');
    if (stripe2Response.second) {
      setPremiumUrl(stripe2Response.second.link_url);
      setPremiumLoading(false);
    }

    const stripe3Response = await getSearchLinks('Stripe 3');
    if (stripe3Response.third) {
      setProUrl(stripe3Response.third.link_url);
      setProLoading(false);
    }

    setHasReceivedResponse(true);
  } catch (error) {
    console.error('Error fetching Stripe links:', error);
    setBasicLoading(false);
    setPremiumLoading(false);
    setProLoading(false);
  }
}, [hasReceivedResponse, getSearchLinks]);

  useEffect(() => {
    fetchStripeLinks();
  }, [fetchStripeLinks]);

  const value = {
    basicUrl,
    premiumUrl,
    proUrl,
    basicLoading,
    premiumLoading,
    proLoading,
    hasReceivedResponse
  };

  return (
    <StripeLinksContext.Provider value={value}>
      {children}
    </StripeLinksContext.Provider>
  );
};

// Custom hook for using stripe links
const useStripeLinks = () => {
  const context = useContext(StripeLinksContext);
  if (context === undefined) {
    throw new Error('useStripeLinks must be used within a StripeLinksProvider');
  }
  return context;
};

// Navigation utility
const navigateOpen = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

// ...rest of your code stays the same until the card components...

const BasicCardComponent = () => {
  const { basicUrl, basicLoading } = useStripeLinks();
  
  if (basicLoading) return null;

  return (
    <>
      <CommonStyles />
      <div className="price-card">
        <h2>Basic</h2>
        <div className="price">$199</div>
        <ul className="features">
          <li>Basic Code Indentation</li>
          <li>Syntax Error Detection</li>
          <li>24hr Turnaround Time</li>
          <li>Up to 1000 Lines of Code</li>
        </ul>
        <button onClick={() => navigateOpen(basicUrl)} className="btn">Get Started</button>
      </div>
    </>
  );
};

const PremiumCardComponent = () => {
  const { premiumUrl, premiumLoading } = useStripeLinks();

  if (premiumLoading) return null;

  return (
    <>
      <CommonStyles />
      <div className="price-card">
        <h2>Premium</h2>
        <div className="price">$299</div>
        <ul className="features">
          <li>Advanced Code Indentation</li>
          <li>Style Guide Compliance</li>
          <li>12hr Turnaround Time</li>
          <li>Up to 5000 Lines of Code</li>
          <li>Code Documentation Review</li>
        </ul>
        <button onClick={() => navigateOpen(premiumUrl)} className="btn">Get Started</button>
      </div>
    </>
  );
};

const ProCardComponent = () => {
  const { proUrl, proLoading } = useStripeLinks();

  if (proLoading) return null;

  return (
    <>
      <CommonStyles />
      <div className="price-card">
        <h2>Pro</h2>
        <div className="price">$499</div>
        <ul className="features">
          <li>Enterprise Code Indentation</li>
          <li>Custom Style Guide Integration</li>
          <li>6hr Turnaround Time</li>
          <li>Unlimited Lines of Code</li>
          <li>Full Documentation Review</li>
          <li>Performance Optimization Tips</li>
        </ul>
        <button onClick={() => navigateOpen(proUrl)} className="btn">Get Started</button>
      </div>
    </>
  );
};

// Wrapped exports for independent use
export const BasicCard = () => (
  <StripeLinksProvider>
    <BasicCardComponent />
  </StripeLinksProvider>
);

export const PremiumCard = () => (
  <StripeLinksProvider>
    <PremiumCardComponent />
  </StripeLinksProvider>
);

export const ProCard = () => (
  <StripeLinksProvider>
    <ProCardComponent />
  </StripeLinksProvider>
);

// Main component using unwrapped versions
const PaywallCards = () => {
  const { hasReceivedResponse } = useStripeLinks();

  if (!hasReceivedResponse) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1200px',
      flexWrap: 'wrap'
    }}>
      <BasicCardComponent />
      <PremiumCardComponent />
      <ProCardComponent />
    </div>
  );
};

// Default export remains the same
export default function PaywallCardsWrapper() {
  return (
    <StripeLinksProvider>
      <PaywallCards />
    </StripeLinksProvider>
  );
}