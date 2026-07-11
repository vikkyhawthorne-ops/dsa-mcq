import React from 'react';
import { Text } from 'react-native';

const Icon = ({ name, size, color }) => {
  return <Text style={{ color, fontSize: size }}>★</Text>;
};
Icon.Button = ({ children }) => children;

export default Icon;
export { Icon };
