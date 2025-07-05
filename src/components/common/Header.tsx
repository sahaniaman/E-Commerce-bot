import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  useTheme, 
  useMediaQuery, 
  IconButton,
  Container,
  Avatar
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useChat } from '../../context/ChatContext';
import { motion } from 'framer-motion';
import logo from '../../assets/images/logo.svg';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { clearChat } = useChat();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
      }}
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
          >
            <Avatar 
              src={logo} 
              alt="BharatShop AI Logo"
              sx={{ 
                width: isMobile ? 40 : 48, 
                height: isMobile ? 40 : 48,
                mr: 2,
                background: 'transparent',
                boxShadow: 'none',
              }} 
            />
            <Box>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                component="div" 
                fontWeight="bold"
                color="primary.dark"
                sx={{ letterSpacing: '0.5px' }}
              >
                BharatShop AI
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ display: isMobile ? 'none' : 'block', mt: -0.5 }}
              >
                Your Personal Shopping Assistant
              </Typography>
            </Box>
          </motion.div>
          
          <Box>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobile ? (
                <IconButton 
                  color="primary" 
                  onClick={clearChat}
                  aria-label="Reset conversation"
                  sx={{
                    background: 'rgba(108, 99, 255, 0.1)',
                  }}
                >
                  <RestartAltIcon />
                </IconButton>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<RestartAltIcon />}
                  onClick={clearChat}
                  sx={{ 
                    borderRadius: '12px', 
                    boxShadow: '0 8px 16px rgba(108, 99, 255, 0.2)',
                  }}
                >
                  New Chat
                </Button>
              )}
            </motion.div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
