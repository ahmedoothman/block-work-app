// theme.js
import { DefaultTheme } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#3498db',
    // secondary: '#2c3e50',
    // error: '#f39c12',
    // success: '#27ae60',
    // warning: '#f1c40f',
    brightBlue:'#0096FF',
    inputfont:'#9E9E9E',
    inputBG:'#393939',
    btnBGblue:'#1354C0',
    white:'#FFFFFF',
    screenBG:'#121114',
    yellow:'#FFE234',
    darkBlue:'#1A4489',
    darkgrey:'#49454F',
    lightGrey:'#9E9E9E',
    BGsemiBlack:'#282728',
    Grey:'#D7D7D7',
    iron:'#DADBDB', //for back arrow 
    whiteBG:'#EFEFEF',
  },
  fonts: {
    regular: 'Roboto',
    medium: 'Roboto_medium',
  },
  borderRadius: 10,
};

export default theme;
