// ./src/pages/components/PaywallCards.js
import React from 'react';

const CommonStyles = () => (
  <style jsx global>{`
    .price-card {
      background: linear-gradient(135deg, rgba(97, 218, 251, 0.15), rgba(97, 218, 251, 0.95));
      border-radius: 20px;
      padding: 2rem;
      max-width: 600px;
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

    @media (max-width: 1000px) {
      .price-card {
        max-width: 600px;
      }
    }
  `}</style>
);

export const BasicCard = () => (
  <>
    <CommonStyles />
    <div className="price-card">
      <h2>Basic</h2>
      <div className="price">$199</div>
      <ul className="features">
        <li>Basic Code Formatting</li>
        <li>Syntax Error Detection</li>
        <li>24hr Turnaround Time</li>
        <li>Up to 1000 Lines of Code</li>
      </ul>
      <a href="/" className="btn">Get Started</a>
    </div>
  </>
);

export const PremiumCard = () => (
  <>
    <CommonStyles />
    <div className="price-card">
      <h2>Premium</h2>
      <div className="price">$299</div>
      <ul className="features">
        <li>Advanced Code Formatting</li>
        <li>Style Guide Compliance</li>
        <li>12hr Turnaround Time</li>
        <li>Up to 5000 Lines of Code</li>
        <li>Code Documentation Review</li>
      </ul>
      <a href="/" className="btn">Get Started</a>
    </div>
  </>
);

export const ProCard = () => (
  <>
    <CommonStyles />
    <div className="price-card">
      <h2>Pro</h2>
      <div className="price">$499</div>
      <ul className="features">
        <li>Enterprise Code Formatting</li>
        <li>Custom Style Guide Integration</li>
        <li>6hr Turnaround Time</li>
        <li>Unlimited Lines of Code</li>
        <li>Full Documentation Review</li>
        <li>Performance Optimization Tips</li>
      </ul>
      <a href="/" className="btn">Get Started</a>
    </div>
  </>
);

// Container component with flex layout for when you want to use all cards together
const PaywallCards = () => {
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
      <BasicCard />
      <PremiumCard />
      <ProCard />
    </div>
  );
};

export default PaywallCards;