
import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#17594A',
    },
    secondary: {
      main: '#8EAC50',
    },
    background: {
      default: '#F0F4F5',
    },
    text: {
      primary: '#213363',
    },
    error: {
      main: '#FF6B6B',
    },
    warning: {
      main: '#FFD700',
    },
    info: {
      main: '#007BFF',
    },
    divider: '#E0E0E0',
    success: {
      main: '#4CAF50',
    },
  },
});

export {themeOptions};
