import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Container, Typography, Paper, Box, Divider, useTheme, List, ListItem, ListItemButton, ListItemText, Chip } from "@mui/material";
import { initSpoilers } from "@/lib/spoilerScript";
import { initializeCodeLoaders } from "@/lib/codeLoader";
import { initializeSyntaxHighlighter } from "@/lib/syntaxHighlighter";
import { getAllPosts, getPostData } from "@/lib/posts";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import EnhancedSocialShare from "@/components/EnhancedSocialShare";
import Comments from "@/components/Comments";
// OptimizedImage is imported but not used in this file

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
  previousPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
  tags?: string[];
  keywords?: string[];
  description?: string;
  cover?: string;
  authorTwitter?: string;
  relatedPosts?: Array<{
    slug: string;
    title: string;
    date: string;
    tags?: string[];
  }>;
  slug: string;
}

export default function PostPage({ title, date, contentHtml, previousPost, nextPost, tags, relatedPosts, slug, description, cover, authorTwitter }: PostPageProps) {
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
        <title>{title}</title>
        <meta name="description" content={description || `${title} - Blog Post`} />
        
        {/* Open Graph Meta Tags for better social sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description || `${title} - Blog Post`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.st3inum.com'}/posts/${slug}`} />
        {cover && <meta property="og:image" content={cover.startsWith('http') ? cover : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.st3inum.com'}${cover}`} />}
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        {authorTwitter && <meta name="twitter:creator" content={authorTwitter} />}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description || `${title} - Blog Post`} />
        {cover && <meta name="twitter:image" content={cover.startsWith('http') ? cover : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.st3inum.com'}${cover}`} />}
      </Head>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box mb={3}>
          <Link 
            href="/" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              color: "inherit",
              textDecoration: "none"
            }}
          >
            <Typography 
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
          
          {/* Social Share Buttons */}
          {/* <Box sx={{ my: 2 }}>
            <SocialShare 
              url={`/posts/${typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : ''}`}
              title={title}
              description={`Read "${title}" on ${typeof window !== 'undefined' ? window.location.hostname : 'my blog'}`}
            />
          </Box> */}
          
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
        
        {(previousPost || nextPost) && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              More Posts
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {previousPost && (
                <Link 
                  href={`/posts/${previousPost.slug}`}
                  style={{
                    display: "flex", 
                    alignItems: "center", 
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  <Typography 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" }
                    }}
                  >
                    <NavigateBeforeIcon fontSize="small" sx={{ mr: 1 }} />
                    {previousPost.title}
                  </Typography>
                </Link>
              )}
              {nextPost && (
                <Link 
                  href={`/posts/${nextPost.slug}`}
                  style={{
                    display: "flex", 
                    alignItems: "center", 
                    color: "inherit",
                    textDecoration: "none"
                  }}
                >
                  <Typography 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" }
                    }}
                  >
                    {nextPost.title}
                    <NavigateNextIcon fontSize="small" sx={{ ml: 1 }} />
                  </Typography>
                </Link>
              )}
            </Box>
          </Box>
        )}
        
        {/* Related Posts Section */}
        {relatedPosts && relatedPosts.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Related Posts
            </Typography>
            <List>
              {relatedPosts.map((post) => (
                <ListItem key={post.slug} disablePadding sx={{ mb: 2 }}>
                  <Link href={`/posts/${post.slug}`} style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" component="div" sx={{ mb: 0.5 }}>
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                          sx={{ mb: 1 }}
                        >
                          {new Date(post.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Typography>
                        {post.tags && post.tags.length > 0 && (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {post.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.75rem' }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {/* Share Section */}
        <Box sx={{ mt: 6 }}>

          {/* <Typography variant="h5" component="h3" gutterBottom>
            Share this post
          </Typography> */}
          <EnhancedSocialShare 
            url={`/posts/${slug}`} 
            title={title} 
            description={description || ''} 
            tags={tags || []} 
          />
        </Box>
        
        {/* Comments Section */}
        <Comments slug={slug} />
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
  const { slug } = params as { slug: string };
  const postData = await getPostData(slug);
  
  // Get all posts for navigation
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(post => post.slug === slug);
  
  const previousPost = currentIndex < allPosts.length - 1 
    ? {
        slug: allPosts[currentIndex + 1].slug,
        title: allPosts[currentIndex + 1].title,
      }
    : null;
    
  const nextPost = currentIndex > 0
    ? {
        slug: allPosts[currentIndex - 1].slug,
        title: allPosts[currentIndex - 1].title,
      }
    : null;

  return {
    props: {
      ...postData,
      previousPost,
      nextPost,
    },
  };
};
