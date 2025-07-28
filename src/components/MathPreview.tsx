import React, { useEffect, useRef } from 'react';
import { Typography } from '@mui/material';

// TypeScript interface for MathJax v3
interface MathJaxWindow extends Window {
  MathJax?: {
    typesetPromise?: () => Promise<void>;
    typeset?: () => void;
    startup?: {
      document?: {
        rerender?: () => void;
      };
    };
  };
}

interface MathPreviewProps {
  content: string;
  maxLength?: number;
  variant?: 'body1' | 'body2';
  color?: string;
  sx?: Record<string, any>;
}

const MathPreview: React.FC<MathPreviewProps> = ({ 
  content, 
  maxLength = 200, 
  variant = 'body1',
  color = 'text.secondary',
  sx = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Clean content but preserve math notation
  const cleanContentWithMath = (text: string): string => {
    return text
      .replace(/^#{1,6}\s+.*$/gm, '') // Remove headers
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/```[\s\S]*?```/g, '[code block]') // Replace code blocks with placeholder
      .replace(/{{<[^>]*>}}/g, '') // Remove Hugo shortcodes
      .replace(/\n\s*\n/g, ' ') // Replace multiple newlines with space
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };

  const processedContent = cleanContentWithMath(content);
  const truncatedContent = processedContent.length > maxLength 
    ? processedContent.substring(0, maxLength) + '...'
    : processedContent;

  // Initialize and render MathJax when content changes
  useEffect(() => {
    const renderMath = async () => {
      if (typeof window === 'undefined' || !containerRef.current) return;

      const mathJaxWindow = window as MathJaxWindow;
      
      // If MathJax is not loaded, load it
      if (!mathJaxWindow.MathJax) {
        await loadMathJax();
      }

      // Render math in the container
      if (mathJaxWindow.MathJax) {
        try {
          if (mathJaxWindow.MathJax.typesetPromise) {
            await mathJaxWindow.MathJax.typesetPromise();
          } else if (mathJaxWindow.MathJax.typeset) {
            mathJaxWindow.MathJax.typeset();
          }
        } catch (error) {
          console.warn('MathJax rendering error in preview:', error);
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(renderMath, 100);
    return () => clearTimeout(timer);
  }, [truncatedContent]);

  const loadMathJax = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      const mathJaxWindow = window as MathJaxWindow;
      if (mathJaxWindow.MathJax) {
        resolve();
        return;
      }

      // Remove any existing MathJax script
      const existingScript = document.getElementById('mathjax-script');
      if (existingScript) {
        existingScript.remove();
      }

      // Add MathJax config
      const configScript = document.createElement('script');
      configScript.type = 'text/x-mathjax-config';
      configScript.innerHTML = `
        window.MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
            displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
            processEscapes: true,
            processEnvironments: true
          },
          options: {
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
          },
          svg: {
            fontCache: 'global'
          }
        };
      `;
      document.head.appendChild(configScript);

      // Add MathJax script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
      script.async = true;
      script.id = 'mathjax-script';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load MathJax'));
      document.head.appendChild(script);
    });
  };

  return (
    <Typography
      ref={containerRef}
      variant={variant}
      color={color}
      sx={{
        lineHeight: 1.6,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        '& .MathJax': {
          fontSize: '0.9em !important',
        },
        '& .MathJax_SVG': {
          fontSize: '0.9em !important',
        },
        ...sx
      }}
      dangerouslySetInnerHTML={{ __html: truncatedContent }}
    />
  );
};

export default MathPreview;
