import React from 'react';

export const SafeAreaInsetsContext = React.createContext({ top: 0, bottom: 0, left: 0, right: 0 });

export const SafeAreaProvider: React.FC<any> = ({ children }) => {
  return (
    <div style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
};

export const SafeAreaView: React.FC<any> = ({ children, style }) => {
  return (
    <div style={{
      paddingTop: 'env(safe-area-inset-top, 0px)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      paddingLeft: 'env(safe-area-inset-left, 0px)',
      paddingRight: 'env(safe-area-inset-right, 0px)',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      ...style
    }}>
      {children}
    </div>
  );
};

export const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
export default SafeAreaView;
