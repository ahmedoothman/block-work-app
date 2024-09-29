// theme.js
import { DefaultTheme } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryDark: '#1A4489',
    primaryBright: '#0096FF',
    secondaryDark: '#121114',
    secondaryGray: '#282728',
    secondaryBright: '#414141',
    ternaryDark: '#9E9E9E',
    ternaryLight: '#EFEFEF',
    warning: '#FFE234',
    danger: '#9b1136',
    success: '#1a7b64',
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
