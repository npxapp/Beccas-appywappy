// components/atoms/Loader.jsx
import * as SVGLoaders from "svg-loaders-react";
import { Box } from "@mui/material";

const Loader = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box>
        <SVGLoaders.Bars fill="#007bff" stroke="#007bff" />
      </Box>
    </Box>
  );
};

export default Loader;