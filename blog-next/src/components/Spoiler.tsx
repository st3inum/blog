import React, { useState } from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';

interface SpoilerProps {
  text: string;
  children: React.ReactNode;
}

const Spoiler: React.FC<SpoilerProps> = ({ text, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ my: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
      <Button 
        fullWidth 
        onClick={() => setIsOpen(!isOpen)}
        sx={{ 
          justifyContent: 'flex-start', 
          textTransform: 'none',
          borderRadius: 0,
          py: 1,
          px: 2,
          bgcolor: 'background.paper',
          '&:hover': {
            bgcolor: 'action.hover',
          }
        }}
      >
        <Typography variant="body1" fontWeight={500}>
          {text || 'Spoiler'} {isOpen ? '(click to hide)' : '(click to show)'}
        </Typography>
      </Button>
      <Collapse in={isOpen}>
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default Spoiler;
