import React from 'react';
import { View } from 'react-native';

export const SafeAreaInsetsContext = React.createContext({ top: 0, bottom: 0, left: 0, right: 0 });
export const SafeAreaProvider = ({ children }) => <View style={{ flex: 1 }}>{children}</View>;
export const SafeAreaView = ({ children, style }) => <View style={style}>{children}</View>;
export const useSafeAreaInsets = () => ({ top: 0, bottom: 0, left: 0, right: 0 });
export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
