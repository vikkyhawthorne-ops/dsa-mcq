import React from 'react';
import { View, Text, Pressable } from 'react-native';

export { View, Text };
export const Button = ({ label, onPress, ...props }) => (
  <Pressable onPress={onPress} {...props}><Text>{label}</Text></Pressable>
);
export const Avatar = () => null;
export default { View, Text, Button, Avatar };
