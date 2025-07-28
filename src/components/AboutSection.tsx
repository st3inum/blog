import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import AboutCard, { AboutCardProps } from './AboutCard';

export interface AboutSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: AboutCardProps[];
  gridColumns?: {
    xs: string;
    md: string;
  };
}

const AboutSection: React.FC<AboutSectionProps> = ({
  id,
  title,
  icon,
  items,
  gridColumns = { xs: '1fr', md: '1fr 1fr' }
}) => {
  return (
    <Box id={id} sx={{ mb: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: gridColumns, 
        gap: 2 
      }}>
        {items.map((item, index) => (
          <AboutCard key={index} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default AboutSection;
