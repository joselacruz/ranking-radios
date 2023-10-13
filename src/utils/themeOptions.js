
import { createTheme } from '@mui/material/styles';

const themeLight = createTheme({
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

const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D32F2F', // Rojo oscuro

    },
    secondary: {
      main: '#221d1d', // Gris oscuro
    },
    background: {
      default: '#313131', // Gris oscuro más sólido para el fondo principal
      paper: '#414141', // Gris oscuro para contenedores y papel
    },
    text: {
      primary: '#FFFFFF',// Blanco puro para el texto en modo oscuro
      secondary: '#A0A0A0', 
    },
    error: {
      main: '#FF1744', // Rojo más brillante para indicar errores
    },
    warning: {
      main: '#FFC400', // Amarillo brillante para advertencias
    },
    info: {
      main: '#007BFF', // Azul claro para información
    },
    divider: '#757575', // Gris medio para separadores
    success: {
      main: '#00E676', // Verde vibrante para indicar éxito
    },
  },
});




export {themeLight,themeDark};
