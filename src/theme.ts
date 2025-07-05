import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF',
      light: '#A594FF',
      dark: '#3A0CA3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F72585',
      light: '#FF72B1',
      dark: '#B5179E',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FCFCFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#14142B',
      secondary: '#4E4B66',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F7F7FC',
      200: '#EFF0F7',
      300: '#D9DBE9',
      400: '#A0A3BD',
      500: '#737591',
      600: '#4E4B66',
      700: '#262338',
      800: '#14142B',
      900: '#0F0F1A',
    },
    error: {
      main: '#F72585',
    },
    warning: {
      main: '#FCA311',
    },
    info: {
      main: '#3A0CA3',
    },
    success: {
      main: '#4CC9F0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      letterSpacing: '0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 8px 25px rgba(108, 99, 255, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #6C63FF 0%, #3A0CA3 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #F72585 0%, #B5179E 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 10px 30px rgba(20, 20, 43, 0.07)',
          borderRadius: 24,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            boxShadow: '0px 15px 40px rgba(20, 20, 43, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 24,
        },
        elevation1: {
          boxShadow: '0px 10px 30px rgba(20, 20, 43, 0.07)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 14px rgba(20, 20, 43, 0.12)',
        },
      },
    },
  },
});

export default theme;
