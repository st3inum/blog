import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AboutCard, { AboutCardProps } from './AboutCard';

export interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  visibleItems: AboutCardProps[];
  hiddenItems: AboutCardProps[];
  gridColumns?: {
    xs: string;
    md: string;
  };
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  icon,
  visibleItems,
  hiddenItems,
  gridColumns = { xs: '1fr', md: '1fr 1fr' }
}) => {
  const [expanded, setExpanded] = useState(false);
  const displayedItems = expanded ? [...visibleItems, ...hiddenItems] : visibleItems;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box id={id} sx={{ mb: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      
      {/* Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: gridColumns, 
        gap: 2,
        mb: 2
      }}>
        {displayedItems.map((item, index) => (
          <AboutCard key={`${expanded ? 'expanded' : 'visible'}-${index}`} {...item} />
        ))}
      </Box>

      {/* Read More/Less Button */}
      {hiddenItems.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            onClick={toggleExpanded}
            variant="outlined"
            startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                borderColor: 'primary.main'
              }
            }}
          >
            {expanded ? 'Show Less' : `Show More (${hiddenItems.length} more)`}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CollapsibleSection;
