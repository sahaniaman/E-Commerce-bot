import React from 'react';
import { ThemeProvider, CssBaseline, Box, GlobalStyles } from '@mui/material';
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
        </Box>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;
