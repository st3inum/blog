import React, { useState } from 'react';
import { 
  Fab, 
  Tooltip, 
  Zoom, 
  Box,
  useTheme,
  keyframes
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
`;

const ReportBugButton: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    window.open('https://github.com/st3inum/blog/issues/new', '_blank');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 1000,
      }}
    >
      <Tooltip
        title="Report a bug"
        placement="right"
        TransitionComponent={Zoom}
        arrow
      >
        <Fab
          color="primary"
          size="medium"
          aria-label="report bug"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            background: isHovered 
              ? 'linear-gradient(45deg, #2e7d32 30%, #1b5e20 90%)' 
              : 'linear-gradient(45deg, #4caf50 30%, #2e7d32 90%)',
            color: '#fff',
            animation: isHovered ? 'none' : `${pulse} 2s infinite`,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            },
            boxShadow: isDark 
              ? '0 4px 10px rgba(0,0,0,0.5)' 
              : '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          <BugReportIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default ReportBugButton;
