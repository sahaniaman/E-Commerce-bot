import React, { useState } from 'react';
import { Box, TextField, Button, useTheme, useMediaQuery, Paper, IconButton, InputAdornment, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage, isTyping } = useChat();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const exampleQueries = [
    "Vegan snacks under ₹300",
    "Light ethnic wear for summer",
    "Protein-rich breakfast options",
    "Trendy casual wear under ₹1000"
  ];

  const handleExampleClick = (query: string) => {
    sendMessage(query);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {input === '' && !isTyping && (
        <Box 
          sx={{ 
            mb: 2, 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: 1 
          }}
        >
          {exampleQueries.map((query, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleExampleClick(query)}
                sx={{
                  borderRadius: '20px',
                  px: 1.5,
                  py: 0.5,
                  borderColor: 'rgba(108, 99, 255, 0.3)',
                  color: 'primary.dark',
                  fontSize: '0.8rem',
                  backgroundColor: 'rgba(108, 99, 255, 0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(108, 99, 255, 0.1)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                {query}
              </Button>
            </motion.div>
          ))}
        </Box>
      )}

      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 0.5,
          pl: 2,
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(108, 99, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          '&:hover, &:focus-within': {
            boxShadow: '0 8px 25px rgba(108, 99, 255, 0.15)',
            border: '1px solid rgba(108, 99, 255, 0.4)',
          },
        }}
      >
        <TextField
          fullWidth
          autoComplete="off"
          placeholder="Ask about products or recommendations..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Voice input (coming soon)" arrow>
                  <IconButton
                    sx={{ 
                      color: 'primary.main',
                      opacity: 0.8,
                    }}
                    disabled={true}
                  >
                    <MicIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          sx={{
            '& input': {
              py: 1.2,
              fontSize: '0.95rem',
            },
          }}
        />
        <Button
          type="submit"
          color="primary"
          disabled={!input.trim() || isTyping}
          sx={{
            minWidth: 'auto',
            height: 48,
            width: 48,
            borderRadius: '50%',
            background: 'linear-gradient(90deg, #6C63FF 0%, #3A0CA3 100%)',
            boxShadow: '0 4px 12px rgba(108, 99, 255, 0.3)',
            mx: 0.5,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 15px rgba(108, 99, 255, 0.4)',
            },
          }}
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatInput;
