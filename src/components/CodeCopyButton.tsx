import React, { useState } from 'react';
import { IconButton, Tooltip, Fade } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

interface CodeCopyButtonProps {
  code: string;
}

const CodeCopyButton: React.FC<CodeCopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy code'} arrow>
      <IconButton
        onClick={handleCopy}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'rgba(255, 255, 255, 0.8)',
          width: 32,
          height: 32,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 1)',
            transform: 'scale(1.05)',
          },
          '[data-theme="light"] &': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            color: 'rgba(0, 0, 0, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              color: 'rgba(0, 0, 0, 0.9)',
            },
          },
        }}
      >
        <Fade in={!copied} timeout={200}>
          <ContentCopyIcon sx={{ fontSize: 16 }} />
        </Fade>
        <Fade in={copied} timeout={200}>
          <CheckIcon sx={{ fontSize: 16, position: 'absolute' }} />
        </Fade>
      </IconButton>
    </Tooltip>
  );
};

export default CodeCopyButton;