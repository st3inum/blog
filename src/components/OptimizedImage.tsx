import React, { useState, useEffect } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Default size for images without dimensions
  const defaultWidth = 700;
  const defaultHeight = 400;
  
  // Calculate aspect ratio if only one dimension is provided
  let finalWidth = width || defaultWidth;
  let finalHeight = height || defaultHeight;
  
  if (width && !height) {
    finalHeight = Math.round(width * (defaultHeight / defaultWidth));
  } else if (!width && height) {
    finalWidth = Math.round(height * (defaultWidth / defaultHeight));
  }
  
  // Handle image path for local images
  const imageSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Use intersection observer for lazy loading
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [imageRef, setImageRef] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!imageRef || priority) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading when image is 200px from viewport
    );
    
    observer.observe(imageRef);
    
    return () => {
      observer.disconnect();
    };
  }, [imageRef, priority]);

  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 2
      }}
      className={className}
    >
      <Box 
        ref={setImageRef}
        sx={{ 
          position: 'relative',
          width: '100%',
          maxWidth: finalWidth,
          height: 'auto',
          overflow: 'hidden',
          borderRadius: 1
        }}
      >
        {isLoading && !error && (
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height={finalHeight} 
            animation="wave"
            sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          />
        )}
        
        {!error ? (
          <img
            src={priority || isIntersecting ? imageSrc : ''}
            data-src={imageSrc}
            alt={alt}
            width={finalWidth}
            height={finalHeight}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
            style={{
              maxWidth: '100%',
              height: 'auto',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        ) : (
          <Box 
            sx={{ 
              width: '100%', 
              height: finalHeight, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.disabledBackground',
              color: 'text.secondary',
              p: 2,
              textAlign: 'center'
            }}
          >
            Failed to load image: {alt}
          </Box>
        )}
      </Box>
      
      {caption && (
        <Typography 
          variant="caption" 
          component="figcaption"
          align="center"
          sx={{ mt: 1, fontStyle: 'italic', color: 'text.secondary' }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
};

export default OptimizedImage;
