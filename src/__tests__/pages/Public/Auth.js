// pages/Auth.js
import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { LoginForm } from 'pages/components/LoginForm';
import { RegisterForm } from 'pages/components/RegisterForm';
import logo from 'logo.svg'; // Adjust the path to match your file structure

const RotatingLogo = ({ src }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    let angle = 0;
    let animationFrame;

    const rotate = () => {
      if (logoRef.current) {
        angle = (angle + 0.95) % 360; // Adjust rotation speed
        logoRef.current.style.transform = `rotate(${angle}deg)`;
      }
      animationFrame = requestAnimationFrame(rotate);
    };

    rotate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <img ref={logoRef} src={src} alt="logo" className="rotating-logo" />;
};

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <style jsx global>{`
        .rotating-logo {
          height: 40vmin;
        }
      `}</style>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box>
          <RotatingLogo src={logo} />
        </Box>
        <Box>
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default AuthPage;