import { Platform  } from 'react-native';
const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      textWhite: '#FFFFFF',
      primary: '#0366d6',
      subheading: '#ba7000',
      appbar: '#24292e',
      list: '#F3F3F3',
      item:'#FFFFFF',
      textThird: 'black',
      deletebutton: '#C70303'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      })
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;