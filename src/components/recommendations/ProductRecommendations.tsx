import React from 'react';
import { Box, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../../types';
import { motion } from 'framer-motion';

interface ProductRecommendationsProps {
  products: Product[];
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ products }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <Box>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }}
          gap={2}
        >
          {products.map((product, index) => (
            <Box key={product.id}>
              <ProductCard product={product} index={index} />
            </Box>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};

export default ProductRecommendations;
