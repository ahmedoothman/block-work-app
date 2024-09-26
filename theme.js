// theme.js
import { DefaultTheme } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    secondary: '#2c3e50',
    error: '#f39c12',
    success: '#27ae60',
    warning: '#f1c40f',
  },
  fonts: {
    regular: 'Roboto',
    medium: 'Roboto_medium',
  },
  borderRadius: 10,
};

export default theme;
