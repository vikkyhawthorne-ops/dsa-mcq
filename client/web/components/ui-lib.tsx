import React from 'react';
import { Box, Typography as MuiTypography, Button as MuiButton, Avatar as MuiAvatar } from '@mui/material';

/**
 * Genuine Web Component Library implementation utilizing @mui/material.
 * Maps standard react-native-ui-lib elements (View, Text, Button, Avatar) to real, high-quality MUI equivalents.
 */
export const View: React.FC<any> = ({ children, style, ...props }) => (
  <Box style={{
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    ...style
  }} {...props}>
    {children}
  </Box>
);

export const Text: React.FC<any> = ({ children, style, ...props }) => (
  <MuiTypography component="span" style={{
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    ...style
  }} {...props}>
    {children}
  </MuiTypography>
);

export const Button: React.FC<any> = ({ label, onPress, style, ...props }) => (
  <MuiButton onClick={onPress} variant="contained" style={{
    backgroundColor: '#00B5D8',
    color: '#ffffff',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 181, 216, 0.2)',
    ...style
  }} {...props}>
    {label}
  </MuiButton>
);

export const Avatar: React.FC<any> = ({ source, size = 40, style, ...props }) => {
  const src = source?.uri || source;
  return (
    <MuiAvatar src={src} style={{
      width: `${size}px`,
      height: `${size}px`,
      border: '2px solid #ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      ...style
    }} {...props} />
  );
};

export const Colors = {
  white: '#ffffff',
  black: '#0f172a',
  grey: '#64748b',
  blue: '#00B5D8',
  yellow: '#eab308',
  grey10: '#0f172a',
  grey80: '#f8fafc',
  red10: '#ef4444',
  red80: '#fee2e2'
};

export const Typography = {
  text60b: { fontSize: '20px', fontWeight: '700', color: '#0f172a' },
  text70b: { fontSize: '18px', fontWeight: '700', color: '#0f172a' },
  text80: { fontSize: '16px', color: '#334155' },
  text80b: { fontSize: '16px', fontWeight: '600', color: '#0f172a' },
  text90: { fontSize: '14px', color: '#64748b' },
  text100b: { fontSize: '12px', fontWeight: '600', color: '#64748b' },
};

export const Spacings = {
  'paddingH-20': 20, 'paddingV-10': 10, 'marginB-20': 20, 'marginT-40': 40,
  'padding-15': 15, 'marginL-10': 10, 'marginT-10': 10, 'marginB-16': 16,
  'paddingV-15': 15, 'padding-20': 20, 'marginB-15': 15, 'marginT-20': 20
};

export default { View, Text, Button, Avatar, Colors, Typography, Spacings };
