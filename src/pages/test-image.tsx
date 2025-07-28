import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Paper } from '@mui/material';
import OptimizedImage from '@/components/OptimizedImage';

const TestImagePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Image Optimization Test</title>
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Image Optimization Test
        </Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Regular Image
          </Typography>
          <OptimizedImage 
            src="/images/sample-image.jpg" 
            alt="Sample image" 
            width={600}
            height={400}
            caption="This is a sample image with fixed dimensions"
          />
        </Paper>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Priority Image (loads eagerly)
          </Typography>
          <OptimizedImage 
            src="/images/sample-image-2.jpg" 
            alt="Another sample image" 
            width={800}
            priority={true}
            caption="This image has priority loading enabled"
          />
        </Paper>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            External Image
          </Typography>
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80" 
            alt="External image from Unsplash" 
            width={700}
            caption="This is an external image from Unsplash"
          />
        </Paper>
      </Container>
    </>
  );
};

export default TestImagePage;
