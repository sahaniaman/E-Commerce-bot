import React from 'react';
import { Box, Typography, Paper, Avatar, useTheme } from '@mui/material';
import { ChatMessage as ChatMessageType } from '../../types';
import ProductRecommendations from '../recommendations/ProductRecommendations';
import { motion } from 'framer-motion';
import botAvatar from '../../assets/images/bot-avatar.svg';
import userAvatar from '../../assets/images/user-avatar.svg';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useTheme();
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isBot ? 'row' : 'row-reverse',
          mb: 3,
          px: { xs: 1, md: 2 },
        }}
      >
        <Avatar
          src={isBot ? botAvatar : userAvatar}
          sx={{
            width: 40,
            height: 40,
            mt: 0.5,
            mr: isBot ? 1.5 : 0,
            ml: isBot ? 0 : 1.5,
            boxShadow: isBot 
              ? '0 4px 12px rgba(108, 99, 255, 0.2)' 
              : '0 4px 12px rgba(247, 37, 133, 0.2)',
          }}
        />

        <Paper
          elevation={0}
          sx={{
            maxWidth: '80%',
            p: 2,
            borderRadius: '18px',
            position: 'relative',
            bgcolor: isBot 
              ? 'rgba(108, 99, 255, 0.08)'
              : 'rgba(247, 37, 133, 0.08)',
            borderTopLeftRadius: isBot ? 0 : '18px',
            borderTopRightRadius: isBot ? '18px' : 0,
            backdropFilter: 'blur(8px)',
            boxShadow: 'none',
            border: `1px solid ${isBot 
              ? 'rgba(108, 99, 255, 0.2)' 
              : 'rgba(247, 37, 133, 0.2)'}`,
          }}
        >
          <Typography 
            variant="body1"
            sx={{ 
              color: 'text.primary',
              whiteSpace: 'pre-wrap',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            {message.text}
          </Typography>

          {message.recommendations && message.recommendations.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <ProductRecommendations products={message.recommendations} />
            </Box>
          )}
        </Paper>
      </Box>
    </motion.div>
  );
};

export default ChatMessage;
