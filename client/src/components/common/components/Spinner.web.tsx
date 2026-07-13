import React from 'react';
import { Backdrop, CircularProgress, Box } from '@mui/material';

interface SpinnerProps {
  visible: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ visible }) => {
  return (
    <Backdrop
      open={visible}
      style={{ zIndex: 9999, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <Box
        style={{
          backgroundColor: '#FFFFFF',
          height: 100,
          width: 100,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-testid="auth-spinner"
      >
        <CircularProgress color="primary" />
      </Box>
    </Backdrop>
  );
};

export default Spinner;
