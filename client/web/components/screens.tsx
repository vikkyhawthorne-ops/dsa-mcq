import React from 'react';

export const enableScreens = () => {};
export const ScreenContainer: React.FC<any> = ({ children, style }) => <div style={{ flex: 1, display: 'flex', flexDirection: 'column', ...style }}>{children}</div>;
export const Screen: React.FC<any> = ({ children, style }) => <div style={{ flex: 1, display: 'flex', flexDirection: 'column', ...style }}>{children}</div>;
export default Screen;
