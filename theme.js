// theme.js
import { DefaultTheme } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryDark: '#1A4489',
    primaryBright: '#0096FF',
    secondaryDark: '#0a0a0b',
    secondaryGray: '#272727',
    secondaryBright: '#414141',
    ternaryDark: '#9f9fa0',
    ternaryLight: '#e1e1e1',
    primary: '#1A4489',
    secondary: '#414141',
    tertiary: '#9f9fa0',
    warning: '#FFE234',
    danger: '#d31212',
    success: '#019437',
    white: '#FFFFFF',
    inputBg: '#393939',
    colorTextBlue: '#1354C0',
  },
  borderRadius: 10,
  background: '#1A4489',
};

export default theme;
