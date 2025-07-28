import React from 'react';
import { Box, Container, Typography, Divider, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const isDark = theme.palette.mode === 'dark';

  // Dynamic gradient background based on theme
  const gradientBg = isDark
    ? 'linear-gradient(135deg, rgba(25, 26, 46, 0.95) 0%, rgba(28, 29, 43, 0.95) 100%)'
    : 'linear-gradient(135deg, rgba(240, 242, 245, 0.95) 0%, rgba(250, 252, 255, 0.95) 100%)';

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        px: 2,
        background: gradientBg,
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        boxShadow: isDark ? '0 -4px 20px rgba(0,0,0,0.1)' : '0 -4px 20px rgba(0,0,0,0.03)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
          {/* Left column - Site info */}
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              STEINUM
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mb: 2, maxWidth: 300 }}
            >
              A portfolio and blog showcasing my work in mathematics, algorithms, and programming.
            </Typography>
          </Box>
          
          {/* Right column - Minimal social links */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton 
                size="small"
                aria-label="GitHub"
                sx={{ 
                  color: 'text.secondary',
                  padding: 0.5,
                  '&:hover': { color: 'primary.main' }
                }}
                href="https://github.com/st3inum"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              
              <IconButton 
                size="small"
                aria-label="LinkedIn"
                sx={{ 
                  color: 'text.secondary',
                  padding: 0.5,
                  '&:hover': { color: '#0077b5' }
                }}
                href="https://linkedin.com/in/st3inum"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              
              <IconButton 
                size="small"
                aria-label="Twitter"
                sx={{ 
                  color: 'text.secondary',
                  padding: 0.5,
                  '&:hover': { color: '#1DA1F2' }
                }}
                href="https://twitter.com/st3inum"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3, opacity: isDark ? 0.1 : 0.3 }} />
        
        {/* Copyright */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ fontSize: '0.75rem' }}
        >
          © {currentYear} STEINUM. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
