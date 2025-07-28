import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Snackbar } from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    
    // Only show banner if no choice has been made yet
    if (cookieConsent === null) {
      // Small delay to prevent banner from showing immediately on page load
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setOpen(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setOpen(false);
    onDecline();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ 
        maxWidth: '100%',
        width: { xs: '100%', sm: '600px' },
        bottom: { xs: 0, sm: 24 },
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CookieIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Cookie Consent
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This website uses cookies to enhance your browsing experience and analyze site traffic. 
          We use Google Analytics to understand how you interact with our content. 
          You can choose to accept or decline these cookies. For more information, please see our privacy policy.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={handleDecline}
          >
            Decline
          </Button>
          <Button 
            variant="contained" 
            size="small" 
            onClick={handleAccept}
          >
            Accept
          </Button>
        </Box>
      </Paper>
    </Snackbar>
  );
};

export default CookieConsent;
