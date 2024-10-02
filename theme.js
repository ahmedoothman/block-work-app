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
    warning: '#FFE234',
    danger: '#d31212',
    success: '#019437',
    white: '#FFFFFF',
    inputBg: '#393939',
    colorTextBlue: '#1354C0',
  },
  /**  
   // ' -----> if we using Fonts this error will shown 
   //! { Error: Variant labelLarge was not provided properly.Valid variants are regular, medium.}
 */
  // fonts: {
  //   regular: 'Roboto',
  //   medium: 'Roboto_medium',
  // },

  borderRadius: 10,
};

export default theme;
