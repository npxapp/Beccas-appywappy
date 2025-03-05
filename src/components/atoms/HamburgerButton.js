// components/atoms/HamburgerButton.jsx
import React, { forwardRef, useState } from 'react';

const HamburgerButton = forwardRef(({ 
  isOpen = false, 
  onToggle = () => {}, 
  id = "hamburger-button",
  className = "",
  ...props 
}, ref) => {
  const [isPressed, setIsPressed] = useState(false);
  
  // Handlers for press and release
  const handlePointerDown = () => {
    setIsPressed(true);
  };
  
  const handlePointerUp = () => {
    setIsPressed(false);
  };
  
  // Apply visual pressed state either when actually open OR when being pressed
  const visuallyPressed = isOpen || isPressed;
  
  return (
    <div 
      className={`hamburger-button ${className}`} 
      ref={ref}
      {...props}
    >
      <input 
        className="side-menu" 
        type="checkbox" 
        id={id}
        checked={isOpen}
        onChange={onToggle}
      />
      <label 
        className={`navi ${visuallyPressed ? 'navi-open' : ''}`} 
        htmlFor={id}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp} // Also reset if pointer leaves while pressed
      >
        <span className={`navi-line ${visuallyPressed ? 'navi-line-open' : ''}`}></span>
      </label>
      
      <style jsx>{`
        .hamburger-button {
          display: inline-block;
          display: flex;
          align-items: center;
          justify-content: center;
          -webkit-touch-callout: none; /* Prevent callouts on tap-and-hold */
          -webkit-user-select: none;   /* Prevent selection */
          user-select: none;           /* Prevent selection */
          touch-action: manipulation;  /* Disable some browser handling */
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
          transition: background 0.05s ease, box-shadow 0.05s ease;
        }
        
        .side-menu:checked ~ .navi,
        .navi-open {
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
        
        .side-menu:checked ~ .navi .navi-line,
        .navi-line-open {
          background: transparent;
        }
        
      `}</style>
    </div>
  );
});

// Add display name for better debugging
HamburgerButton.displayName = 'HamburgerButton';

export default HamburgerButton;