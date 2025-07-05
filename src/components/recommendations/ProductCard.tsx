import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button, Tooltip, Badge } from '@mui/material';
import { Product } from '../../types';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion } from 'framer-motion';
import productPlaceholder from '../../assets/images/product-placeholder.svg';
import { getProductImagePath, getSourceImageWithFallback } from '../../utils/imageUtils';

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
        
        {/* Source badge */}
        {product.source && (
          <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 10 }}>
            <Tooltip title={`Product from ${product.source}`} arrow>
              <Chip
                icon={<VerifiedIcon fontSize="small" />}
                label={product.source}
                size="small"
                sx={{ 
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              />
            </Tooltip>
          </Box>
        )}
        
        <CardMedia
          component="img"
          height="180"
          image={getSourceImageWithFallback(product.image, product.source)}
          alt={product.name}
          sx={{ 
            objectFit: 'contain',
            padding: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            transition: 'transform 0.6s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = productPlaceholder;
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
            
            {/* Display rating if available */}
            {product.rating && (
              <Chip
                icon={<StarIcon sx={{ color: '#FFD700 !important', fontSize: '1rem' }} />}
                label={product.rating.toFixed(1)}
                size="small"
                sx={{ 
                  height: '20px',
                  ml: 1,
                  '& .MuiChip-label': {
                    px: 0.5,
                    py: 0,
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }
                }}
              />
            )}
            
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
          
          {/* Display source and additional info */}
          {product.sourceUrl && (
            <Box sx={{ mt: 1, mb: 2 }}>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.reviewCount && (
                  <span style={{ marginRight: '8px' }}>{product.reviewCount} reviews</span>
                )}
                {product.availability && (
                  <Chip 
                    label={product.availability} 
                    size="small"
                    color={product.availability.toLowerCase().includes('available') ? 'success' : 'default'}
                    sx={{ 
                      height: '18px',
                      '& .MuiChip-label': {
                        px: 0.5,
                        py: 0,
                        fontSize: '0.7rem'
                      }
                    }}
                  />
                )}
              </Typography>
            </Box>
          )}
          
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
          
          {/* Add view on source button for external products */}
          {product.sourceUrl && (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ 
                mt: 1,
                borderRadius: '12px',
                py: 1,
                fontSize: '0.85rem',
                textTransform: 'none'
              }}
              onClick={() => window.open(product.sourceUrl, '_blank')}
            >
              View on {product.source}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
