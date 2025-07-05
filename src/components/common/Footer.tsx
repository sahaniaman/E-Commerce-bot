import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Container } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 3,
        mt: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        textAlign: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontWeight: 500,
          }}
        >
          BharatShop AI - Personalized Recommendations for Indian D2C Brands
        </Typography>
        {!isMobile && (
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              display: 'block', 
              mt: 0.5,
              opacity: 0.8,
            }}
          >
            © 2025 BharatShop AI Assistant
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
