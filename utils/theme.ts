// theme.ts
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      primary: {
        main: '#06402B', // mpesa-green (primary)
      },
      secondary: {
        main: '#24a148', // lighter green for secondary
      },
      background: {
        default: '#F5F5F5', // mpesa-light
        paper: '#FFFFFF',   // optional or use charcoal: '#2E2E2E'
      },
      text: {
        primary: '#1C1C1C', // mpesa-dark
        secondary: '#2E2E2E', // charcoal
      },
      error: {
        main: '#E60000', // mpesa-red
      },
    },
    typography: {
      fontFamily: 'var(--font-sans), Roboto, sans-serif',
    },
  });
  
  export default theme;