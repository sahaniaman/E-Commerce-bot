import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box, GlobalStyles, Snackbar, Alert } from '@mui/material';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ChatContainer from './components/chat/ChatContainer';
import { ChatProvider } from './context/ChatContext';
import theme from './theme';
import bgPattern from './assets/images/chat-bg-pattern.svg';

const globalStyles = {
  body: {
    overflowX: 'hidden',
    backgroundImage: `url(${bgPattern})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[100],
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[300],
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.grey[400],
  },
};

const App: React.FC = () => {
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [apiRateLimited, setApiRateLimited] = useState(false);

  // Global event listener for Gemini API errors
  useEffect(() => {
    const handleApiError = (event: CustomEvent) => {
      if (event.detail?.type === 'rate_limit') {
        setApiRateLimited(true);
      }
    };

    // Create a custom event type for API errors
    window.addEventListener('gemini_error' as any, handleApiError);
    
    return () => {
      window.removeEventListener('gemini_error' as any, handleApiError);
    };
  }, []);

  useEffect(() => {
    // Check if Gemini API key is missing
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Gemini API key is missing in environment variables');
      setApiKeyMissing(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <ChatProvider>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            bgcolor: 'transparent',
            position: 'relative',
          }}
        >
          <Header />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ChatContainer />
          </Box>
          <Footer />
          
          {/* API Key Missing Alert */}
          <Snackbar 
            open={apiKeyMissing} 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ mt: 8 }}
          >
            <Alert 
              severity="warning" 
              variant="filled"
              onClose={() => setApiKeyMissing(false)}
            >
              Gemini API key is missing. The app will use local fallbacks instead of AI responses.
            </Alert>
          </Snackbar>
          
          {/* API Rate Limit Alert */}
          <Snackbar 
            open={apiRateLimited} 
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={() => setApiRateLimited(false)}
            sx={{ mt: 8 }}
          >
            <Alert 
              severity="warning" 
              variant="filled"
              onClose={() => setApiRateLimited(false)}
            >
              Gemini API rate limit reached. Using local recommendations until the limit resets.
            </Alert>
          </Snackbar>
        </Box>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;
