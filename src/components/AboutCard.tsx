import React from 'react';
import { Card, CardContent, Typography, Box, Link } from '@mui/material';

export interface AboutCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  period?: string;
  tech?: string;
  link?: {
    url: string;
    text: string;
  };
  customContent?: React.ReactNode;
}

const AboutCard: React.FC<AboutCardProps> = ({
  title,
  subtitle,
  description,
  period,
  tech,
  link,
  customContent
}) => {
  return (
    <Card 
      sx={{ 
        boxShadow: 2, 
        borderRadius: 2, 
        transition: 'transform 0.2s, box-shadow 0.2s', 
        '&:hover': { 
          transform: 'translateY(-4px)', 
          boxShadow: 4 
        } 
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        
        {subtitle && (
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
        
        {period && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {period}
          </Typography>
        )}
        
        {description && (
          <Typography variant="body2" paragraph>
            {description}
          </Typography>
        )}
        
        {tech && (
          <Typography variant="body2" paragraph>
            <strong>Tech:</strong> {tech}
          </Typography>
        )}
        
        {link && (
          <Link 
            href={link.url} 
            target="_blank" 
            rel="noopener" 
            sx={{ 
              color: '#2196F3', 
              '&:hover': { 
                textDecoration: 'underline' 
              } 
            }}
          >
            {link.text}
          </Link>
        )}
        
        {customContent && (
          <Box sx={{ mt: 1 }}>
            {customContent}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutCard;
