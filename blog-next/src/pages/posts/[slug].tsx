import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Container, Typography, Paper, Box, Divider, useTheme } from "@mui/material";
import { initSpoilers } from "@/lib/spoilerScript";
import { initializeCodeLoaders } from "@/lib/codeLoader";
import { initializeSyntaxHighlighter } from "@/lib/syntaxHighlighter";
import { getAllPosts, getPostData } from "@/lib/posts";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// TypeScript interface for MathJax v3
interface MathJaxWindow extends Window {
  MathJax?: {
    typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
    typeset?: (elements?: HTMLElement[]) => void;
    startup?: {
      document?: {
        rerender?: () => void;
      };
    };
  };
}

interface PostPageProps {
  title: string;
  date: string;
  contentHtml: string;
}

export default function PostPage({ title, date, contentHtml }: PostPageProps) {
  const theme = useTheme();

  // Initialize MathJax and spoilers when the component mounts or theme changes
  useEffect(() => {
    // Load MathJax script
    const loadMathJax = () => {
      // Remove any existing MathJax script
      const existingScript = document.getElementById('mathjax-script');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Add MathJax config script
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.text = `
        window.MathJax = {
          tex: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
            processEscapes: true
          },
          svg: {
            fontCache: 'global'
          },
          options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
          }
        };
      `;
      document.head.appendChild(configScript);
      
      // Add MathJax script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
      script.async = true;
      script.id = 'mathjax-script';
      script.onload = () => {
        console.log('MathJax loaded, initializing spoilers...');
        // Initialize spoilers after MathJax is loaded
        setTimeout(() => {
          initSpoilers();
        }, 1000);
      };
      document.head.appendChild(script);
    };
    
    // Re-render MathJax if it's already loaded (for theme changes)
    const reRenderMathJax = () => {
      const mathJaxWindow = window as MathJaxWindow;
      if (typeof window !== 'undefined' && mathJaxWindow.MathJax) {
        console.log('Re-rendering MathJax for theme change...');
        try {
          // Try the global MathJax.typesetPromise first (correct v3 API)
          if (mathJaxWindow.MathJax.typesetPromise) {
            mathJaxWindow.MathJax.typesetPromise().then(() => {
              console.log('MathJax re-rendered successfully');
            }).catch((err: Error) => {
              console.error('MathJax re-render failed:', err);
            });
          }
          // Fallback to startup.document.rerender
          else if (mathJaxWindow.MathJax.startup?.document?.rerender) {
            mathJaxWindow.MathJax.startup.document.rerender();
            console.log('MathJax re-rendered using startup.document.rerender');
          }
          // Last resort: use typeset
          else if (mathJaxWindow.MathJax.typeset) {
            mathJaxWindow.MathJax.typeset();
            console.log('MathJax re-rendered using typeset');
          }
        } catch (err) {
          console.error('MathJax re-render error:', err);
        }
      }
    };
    
    // Only add MathJax and initialize spoilers in browser environment
    if (typeof window !== 'undefined') {
      const mathJaxWindow = window as MathJaxWindow;
      if (!mathJaxWindow.MathJax) {
        loadMathJax();
      } else {
        reRenderMathJax();
      }
      
      // Also try to initialize spoilers, code loaders, and syntax highlighting directly in case MathJax doesn't load
      setTimeout(() => {
        console.log('Fallback spoiler initialization');
        initSpoilers();
        console.log('Initializing code loaders');
        initializeCodeLoaders();
        console.log('Initializing syntax highlighter');
        initializeSyntaxHighlighter();
      }, 1500);
    }
    
    // Clean up function
    return () => {
      // No cleanup needed
    };
  }, [contentHtml, theme.palette.mode]);

  return (
    <>
      <Head>
        <title>{title} | MathBugs</title>
        <meta name="description" content={`${title} - MathBugs Blog`} />
      </Head>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box mb={3}>
          <Link href="/" passHref legacyBehavior>
            <Typography 
              component="a" 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { color: "primary.main" }
              }}
            >
              <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
              Back to all posts
            </Typography>
          </Link>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.01)",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ 
            mt: 4, 
            "& img": { maxWidth: "100%", height: "auto" },
            "& pre": { 
              p: 2, 
              borderRadius: 1, 
              overflow: "auto",
              bgcolor: theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"
            },
            "& code": { 
              fontFamily: "'Fira Code', Monaco, Consolas, 'Courier New', monospace",
              fontSize: "0.9em"
            },
            "& blockquote": { 
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              pl: 2,
              py: 1,
              my: 2,
              bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"
            },
            "& a": {
              color: theme.palette.primary.main,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline"
              }
            }
          }} className="post-content">
            <div id="math-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPostData(params!.slug as string);
  return {
    props: data,
  };
};
