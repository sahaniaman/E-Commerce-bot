import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button, Tooltip } from '@mui/material';
import { Product } from '../../types';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { motion } from 'framer-motion';
import productPlaceholder from '../../assets/images/product-placeholder.svg';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div variants={item}>
      <Card 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-6px)',
          },
        }}
      >
        <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
          <Tooltip title={product.matchReason || "Match percentage based on your preferences"} arrow>
            <Chip
              label={`${product.matchPercentage || 0}% Match`}
              size="small"
              sx={{ 
                fontWeight: 600,
                borderRadius: '8px',
                px: 1,
                background: product.matchPercentage && product.matchPercentage > 80 
                  ? 'linear-gradient(90deg, #6C63FF 0%, #3A0CA3 100%)' 
                  : 'rgba(0, 0, 0, 0.08)',
                color: product.matchPercentage && product.matchPercentage > 80 
                  ? 'white' 
                  : 'text.primary',
                border: product.matchPercentage && product.matchPercentage > 80 
                  ? 'none'
                  : '1px solid rgba(0, 0, 0, 0.12)',
                boxShadow: product.matchPercentage && product.matchPercentage > 80 
                  ? '0 4px 12px rgba(108, 99, 255, 0.3)'
                  : 'none',
              }}
            />
          </Tooltip>
        </Box>
        
        <CardMedia
          component="img"
          height="180"
          image={product.image || productPlaceholder}
          alt={product.name}
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            component="div" 
            sx={{ 
              fontWeight: 600, 
              fontSize: '1.1rem',
              background: 'linear-gradient(90deg, #14142B 0%, #4E4B66 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
            <Typography 
              variant="h6" 
              component="span" 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.dark',
                mr: 1,
              }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </Typography>
            {product.price > 1000 && (
              <Typography 
                variant="caption" 
                component="span" 
                sx={{ 
                  color: 'text.secondary',
                  textDecoration: 'line-through', 
                }}
              >
                ₹{Math.round(product.price * 1.2).toLocaleString('en-IN')}
              </Typography>
            )}
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.85rem',
              height: '40px',
            }}
          >
            {product.description}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
            {product.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ 
                  height: '22px',
                  fontSize: '0.7rem',
                  backgroundColor: 'rgba(108, 99, 255, 0.08)',
                  border: '1px solid rgba(108, 99, 255, 0.2)',
                  color: 'primary.dark',
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<ShoppingCartOutlinedIcon />}
            sx={{ 
              mt: 'auto',
              borderRadius: '12px',
              boxShadow: '0 8px 16px rgba(108, 99, 255, 0.2)',
              py: 1,
              fontSize: '0.85rem',
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
