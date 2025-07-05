import React, { useRef, useEffect } from 'react';
import { Box, Typography, CircularProgress, Container, Paper } from '@mui/material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';

const ChatContainer: React.FC = () => {
  const { messages, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'calc(100vh - 160px)', md: '70vh' },
          maxHeight: '800px',
          borderRadius: 4,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            px: { xs: 2, md: 3 },
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme => theme.palette.grey[300],
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: theme => theme.palette.grey[400],
            },
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                px: { xs: 2, md: 6 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h5"
                  color="primary.dark"
                  gutterBottom
                  fontWeight="bold"
                >
                  Welcome to BharatShop AI Assistant
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Your personal shopping assistant for Indian D2C products
                </Typography>
              </motion.div>
            </Box>
          ) : (
            messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          
          {isTyping && (
            <Box sx={{ display: 'flex', pl: 2, my: 2 }}>
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <CircularProgress size={20} color="primary" thickness={5} />
              </motion.div>
              <Typography
                variant="body2"
                sx={{ ml: 2, color: 'text.secondary', fontStyle: 'italic' }}
              >
                BharatShop AI is thinking...
              </Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderTop: theme => `1px solid ${theme.palette.grey[200]}`,
            background: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <ChatInput />
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatContainer;
