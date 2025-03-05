// SnackbarOpen.jsx
import React, { 
  useEffect, 
  useRef,
  useState,
} from 'react';
import { useSnackbar } from 'components/elements/SnackBar';
import { useLocation } from 'react-router-dom';

const SnackbarOpen = ({ children }) => {
  const showSnackbar = useSnackbar();
  const location = useLocation();
  const hasPageLoaded = useRef(null);
  const [enableTracing, setEnableTracing] = useState(true);
  
  useEffect(() => {
    if (enableTracing) {
      return;
    }
    setEnableTracing(true);
    
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
  }, [location.pathname, showSnackbar, enableTracing]);

  return <>{children}</>;
};

export default SnackbarOpen;