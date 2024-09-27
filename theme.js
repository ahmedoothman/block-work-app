// theme.js
import { DefaultTheme } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryDark: '#1A4489',
    primaryBright: '#0096FF',
    secondaryDark: '#121114',
    secondaryBright: '#49454F',
    ternaryDark: '#9E9E9E',
    ternaryLight: '#EFEFEF',
    warning: '#FFE234',
    danger: '#9b1136',
    success: '#1a7b64',
    white: '#FFFFFF',
  },
  fonts: {
    regular: 'Roboto',
    medium: 'Roboto_medium',
  },
  borderRadius: 10,
};

export default theme;
