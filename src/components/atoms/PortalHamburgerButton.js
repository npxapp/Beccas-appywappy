// components/atoms/PortalHamburgerButton.jsx
import React, { forwardRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const PortalHamburgerButton = forwardRef(({ 
  isOpen = false, 
  onToggle = () => {}, 
  id = "hamburger-button",
  className = "",
  portalId = "hamburger-portal",
  zIndex = 100000,
  showAlert = false,
  alertText = "Button clicked!",
  ...props 
}, ref) => {
  const [isPressed, setIsPressed] = useState(false);
  const [portalElement, setPortalElement] = useState(null);
  
  // Create portal container on mount
  useEffect(() => {
    let element = document.getElementById(portalId);
    
    if (!element) {
      element = document.createElement('div');
      element.id = portalId;
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.left = '0';
      element.style.width = '0';
      element.style.height = '0';
      element.style.zIndex = zIndex;
      document.body.appendChild(element);
    }
    
    setPortalElement(element);
    
    return () => {
      if (element && element.parentNode && element.childNodes.length <= 1) {
        document.body.removeChild(element);
      }
    };
  }, [portalId, zIndex]);
  
  const handleClick = (e) => {
    // Show alert if enabled
    if (showAlert) {
      window.alert(alertText);
    }
    
    // Call onToggle with the opposite of current isOpen
    onToggle();
  };
  
  const handlePointerDown = () => setIsPressed(true);
  const handlePointerUp = () => setIsPressed(false);
  
  // Use either the open state or the pressed state
  const visuallyPressed = isOpen || isPressed;
  
  const buttonComponent = (
    <div 
      className={`hamburger-button ${className}`} 
      ref={ref}
      style={{
        pointerEvents: 'auto',
        ...props.style
      }}
      onClick={handleClick}
      {...props}
    >
      <div className={`navi ${visuallyPressed ? 'navi-open' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <span className={`navi-line ${visuallyPressed ? 'navi-line-open' : ''}`}></span>
      </div>
      
      <style jsx>{`
        .hamburger-button {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .navi {
          position: relative;
          padding: 20px;
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #dfe3ee);
          box-shadow: 0px 1px 10px 2px #ffffff, 0px 0px 10px 4px #dfe3ee;
          transition: background 0.05s ease, box-shadow 0.05s ease;
        }
        
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
        
        .navi-line-open {
          background: transparent;
        }
      `}</style>
    </div>
  );
  
  if (!portalElement) {
    return null;
  }
  
  return createPortal(buttonComponent, portalElement);
});

PortalHamburgerButton.displayName = 'PortalHamburgerButton';

export default PortalHamburgerButton;