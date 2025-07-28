import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

interface CommentsProps {
  slug: string;
}

const Comments: React.FC<CommentsProps> = ({ slug }) => {
  const theme = useTheme();
  const commentsRef = useRef<HTMLDivElement>(null);
  const isDarkTheme = theme.palette.mode === 'dark';

  useEffect(() => {
    // Remove any existing script first
    const existingScript = document.getElementById('giscus-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and load the Giscus script
    const script = document.createElement('script');
    script.id = 'giscus-script';
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.setAttribute('data-repo', 'st3inum/portfolio-comments');
    script.setAttribute('data-repo-id', 'R_kgDOPS3X3w');
    script.setAttribute('data-category', 'Blog Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOPS3X384Ctavj');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    
    // Add the script to the DOM
    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    // Clean up function
    return () => {
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [isDarkTheme, slug]); // Re-run when theme changes or slug changes

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Comments
      </Typography>
      <Box ref={commentsRef} sx={{ mt: 2 }} />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Comments are powered by GitHub Discussions. To comment, please sign in with GitHub.
      </Typography>
    </Box>
  );
};

export default Comments;
