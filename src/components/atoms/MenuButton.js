// components/atoms/HamburgerButton.jsx
import React from 'react';

const HamburgerButton = ({ 
  isOpen = false, 
  onToggle = () => {}, 
  id = "hamburger-button",
  className = "",
  ...props 
}) => {
  return (
    <div className={`hamburger-button ${className}`} {...props}>
      <input 
        className="side-menu" 
        type="checkbox" 
        id={id}
        checked={isOpen}
        onChange={onToggle}
      />
      <label className="navi" htmlFor={id}>
        <span className="navi-line"></span>
      </label>
      
      <style jsx>{`
        .hamburger-button {
          position: relative;
          display: inline-block;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .side-menu {
          display: none;
        }
        
        .navi {
          position: relative;
          cursor: pointer;
          padding: 20px;
          border: 0px solid #ffffff;
          background: #dfe3ee;
          touch-action: manipulation;
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #dfe3ee);
          box-shadow: 0px 1px 10px 2px #ffffff, 0px 0px 10px 4px #dfe3ee;
          display: inline-block;
        }
        
        .side-menu:checked ~ .navi {
          background: linear-gradient(135deg, #dfe3ee, #ffffff);
          box-shadow: 0px 1px 10px 2px #ffffff, 0px 0px 12px 4px #dfe3ee;
        }
        
        .navi-line {
          background: transparent;
          box-shadow: 1px 1px 3px 1px #dfe3ee;
          display: block;
          border-radius: 20px;
          height: 4px;
          position: relative;
          width: 24px;
        }
        
        .navi-line::before,
        .navi-line::after {
          background: transparent;
          box-shadow: 1px 1px 3px 1px #dfe3ee;
          content: '';
          border-radius: 20px;
          display: block;
          height: 100%;
          position: absolute;
          width: 100%;
        }
        
        .navi-line::before {
          top: 5px;
        }
        
        .navi-line::after {
          top: -5px;
        }
        
        .side-menu:checked ~ .navi .navi-line {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default HamburgerButton;



