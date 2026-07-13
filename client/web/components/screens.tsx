import React from 'react';
import { Container } from '@mui/material';

export const enableScreens = () => {};

export const ScreenContainer: React.FC<any> = ({ children, style }) => {
  return (
    <Container maxWidth="lg" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, ...style }}>
      {children}
    </Container>
  );
};

export const Screen: React.FC<any> = ({ children, style }) => {
  return (
    <Container maxWidth="lg" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, ...style }}>
      {children}
    </Container>
  );
};

export default Screen;
