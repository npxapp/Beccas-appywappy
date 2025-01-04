import React, { useEffect, useRef } from 'react';
import { useSnackbar } from './layouts/components/SnackBar';
import { useLocation } from 'react-router-dom';

const AppOpen = ({ children }) => {
  const showSnackbar = useSnackbar();
  const location = useLocation();
  const hasPageLoaded = useRef(null);

  useEffect(() => {
    const page = location.pathname.split('/').pop(); // Get the last segment of the path

    // Ensure Snackbar only fires once for each page
    if (hasPageLoaded.current === page) {
      return;
    }

    hasPageLoaded.current = page;

    const sendTrace = async () => {
      try {
        const response = await fetch(`/api/span/${page}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          showSnackbar('Span Pushed!');
        } else {
          throw new Error('Span Failed');
        }
      } catch (error) {
        showSnackbar('Span Error!');
      }
    };

    sendTrace();
  }, [location.pathname, showSnackbar]);

  return <>{children}</>;
};

export default AppOpen;