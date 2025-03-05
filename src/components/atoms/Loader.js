// components/atoms/Loader.jsx
import { useState, useEffect } from "react";
import { CircularProgress, Backdrop } from "@mui/material";

const Loader = ({ isLoading = true, timeout = 500 }) => {
  const [open, setOpen] = useState(isLoading);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (isLoading) {
      setOpen(true);
      setOpacity(1);
    } else {
      // Start fade out animation
      setOpacity(0);
      
      // Close the loader after the fade animation completes
      const timer = setTimeout(() => {
        setOpen(false);
      }, timeout);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, timeout]);

  if (!open) return null;

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(5px)",
        transition: `opacity ${timeout}ms ease-in-out`,
        opacity: opacity,
      }}
      open={open}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loader;