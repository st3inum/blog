import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Pagination,
  useTheme,
  alpha,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { getAllPosts, PostMeta } from '@/lib/posts';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MathPreview from '@/components/MathPreview';

interface PostWithContent extends PostMeta {
  contentPreview?: string;
}

interface BlogPageProps {
  posts: PostWithContent[];
}

const POSTS_PER_PAGE_OPTIONS = [3, 6, 9, 12, 15];

export default function BlogPage({ posts }: BlogPageProps) {
  const theme = useTheme();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize state from URL parameters on mount
  useEffect(() => {
    if (router.isReady && !isInitialized) {
      const { page, perPage } = router.query;
      
      if (page && !isNaN(Number(page))) {
        const pageNum = Number(page);
        if (pageNum > 0) {
          setCurrentPage(pageNum);
        }
      }
      
      if (perPage && !isNaN(Number(perPage)) && POSTS_PER_PAGE_OPTIONS.includes(Number(perPage))) {
        setPostsPerPage(Number(perPage));
      }
      
      setIsInitialized(true);
    }
  }, [router.isReady, router.query, isInitialized]);

  // Update URL when pagination state changes (but only for user interactions)
  const updateURL = (newPage: number, newPerPage: number) => {
    if (!isInitialized) return;
    
    const query: Record<string, string | number> = {};
    if (newPage > 1) query.page = newPage;
    if (newPerPage !== 6) query.perPage = newPerPage;
    
    // Use push instead of replace to allow back/forward navigation
    // But only if we're actually on the blog page
    if (router.pathname === '/blog') {
      const url = {
        pathname: '/blog',
        query: Object.keys(query).length > 0 ? query : undefined,
      };
      
      router.push(url, undefined, { shallow: true });
    }
  };

  // Filter out draft posts
  const publishedPosts = posts.filter(post => !post.draft);
  
  // Calculate pagination
  const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = publishedPosts.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    updateURL(value, postsPerPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newPerPage = event.target.value as number;
    setPostsPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing posts per page
    updateURL(1, newPerPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Extract content preview from a post
  const getContentPreview = (post: PostWithContent, maxLength: number = 200): string => {
    // First try the contentPreview if available
    if (post.contentPreview) {
      return post.contentPreview.length > maxLength 
        ? post.contentPreview.substring(0, maxLength) + '...'
        : post.contentPreview;
    }
    // Then try description
    if (post.description) {
      return post.description.length > maxLength 
        ? post.description.substring(0, maxLength) + '...'
        : post.description;
    }
    // Fallback message
    return 'Click to read more about this post...';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head>
        <title>Blog Posts - steinum</title>
        <meta name="description" content="All blog posts about mathematics, algorithms, programming, and problem solving." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Blog Posts
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
          >
            Exploring mathematics, algorithms, programming, and problem solving
          </Typography>

        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="body1" color="text.secondary">
            {publishedPosts.length} {publishedPosts.length === 1 ? 'post' : 'posts'} total
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Posts per page</InputLabel>
            <Select
              value={postsPerPage}
              label="Posts per page"
              onChange={handlePostsPerPageChange}
            >
              {POSTS_PER_PAGE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Posts List */}
        {currentPosts.length > 0 ? (
          <>
            <Box sx={{ mb: 6 }}>
              {currentPosts.map((post) => (
                <Card
                  key={post.slug}
                  sx={{
                    mb: 3,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[8],
                      '& .post-title': {
                        color: 'primary.main',
                      }
                    },
                    background: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.background.paper, 0.8)
                      : alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                  onClick={() => router.push(`/posts/${post.slug}`)}
                >
                    <CardContent sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      {/* Header with Title and Date */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography
                          variant="h5"
                          component="h2"
                          className="post-title"
                          sx={{
                            fontWeight: 600,
                            lineHeight: 1.3,
                            transition: 'color 0.2s ease',
                            flex: 1,
                            mr: 2,
                          }}
                        >
                          {post.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                          <CalendarTodayIcon 
                            sx={{ 
                              fontSize: 16, 
                              color: 'text.secondary' 
                            }} 
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}
                          >
                            {formatDate(post.date)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {post.tags.slice(0, 4).map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                icon={<LocalOfferIcon />}
                                sx={{
                                  fontSize: '0.75rem',
                                  height: 24,
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  color: 'primary.main',
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                  }
                                }}
                              />
                            ))}
                            {post.tags.length > 4 && (
                              <Chip
                                label={`+${post.tags.length - 4}`}
                                size="small"
                                sx={{
                                  fontSize: '0.75rem',
                                  height: 24,
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  color: 'primary.main',
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                  }
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      )}

                      {/* Content Preview */}
                      <Typography variant="body1" sx={{ mt: 2, mb: 'auto', color: 'text.primary' }}>
                        {getContentPreview(post)}
                      </Typography>
                    </CardContent>
                </Card>
              ))}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1rem',
                      fontWeight: 500,
                    },
                    '& .Mui-selected': {
                      background: 'linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5855eb 30%, #0891b2 90%)',
                      }
                    }
                  }}
                />
              </Box>
            )}

            {/* Page Info */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {startIndex + 1}-{Math.min(endIndex, publishedPosts.length)} of {publishedPosts.length} posts
              </Typography>
            </Box>
          </>
        ) : (
          /* No Posts Message */
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No posts found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back later for new content!
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Add content preview to each post
  const postsWithContent: PostWithContent[] = await Promise.all(
    sortedPosts.map(async (post) => {
      try {
        // Read the post file to get content preview
        const fs = await import('fs');
        const path = await import('path');
        const matter = await import('gray-matter');
        
        const postsDirectory = path.join(process.cwd(), 'posts');
        const fullPath = path.join(postsDirectory, `${post.slug}.md`);
        
        if (fs.existsSync(fullPath)) {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { content } = matter.default(fileContents);
          
          // Extract first paragraph or first 300 characters as preview
          let contentPreview = '';
          
          // Clean markdown and extract preview
          const cleanContent = content
            .replace(/^#{1,6}\s+.*$/gm, '') // Remove headers
            .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
            .replace(/\$\$[\s\S]*?\$\$/g, '[mathematical expression]') // Remove display math
            .replace(/\$[^$\n]*\$/g, '[math]') // Remove inline math
            .replace(/\\\([\s\S]*?\\\)/g, '[mathematical expression]') // Remove \(...\) math
            .replace(/\\\[[\s\S]*?\\\]/g, '[mathematical expression]') // Remove \[...\] math
            .replace(/\\begin\{[^}]+\}[\s\S]*?\\end\{[^}]+\}/g, '[mathematical expression]') // Remove LaTeX environments
            .replace(/\\[a-zA-Z]+\{[^}]*\}/g, '[math notation]') // Remove LaTeX commands
            .replace(/\\[a-zA-Z]+/g, '') // Remove simple LaTeX commands
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.*?)\*/g, '$1') // Remove italic
            .replace(/`([^`]+)`/g, '$1') // Remove inline code
            .replace(/```[\s\S]*?```/g, '[code block]') // Replace code blocks with placeholder
            .replace(/{{<[^>]*>}}/g, '') // Remove Hugo shortcodes
            .replace(/\n\s*\n/g, ' ') // Replace multiple newlines with space
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/\[math\]\s*\[math\]/g, '[mathematical expressions]') // Combine adjacent math placeholders
            .replace(/\[mathematical expression\]\s*\[mathematical expression\]/g, '[mathematical expressions]') // Combine adjacent math placeholders
            .trim();
          
          // Get first sentence or first 300 characters
          const sentences = cleanContent.split(/[.!?]+/);
          if (sentences.length > 0 && sentences[0].length > 20) {
            contentPreview = sentences[0].trim() + (sentences.length > 1 ? '.' : '');
          } else {
            contentPreview = cleanContent.substring(0, 300);
          }
          
          return {
            ...post,
            contentPreview: contentPreview || post.description || 'Click to read more about this post...'
          };
        }
      } catch (error) {
        console.error(`Error reading content for post ${post.slug}:`, error);
      }
      
      return {
        ...post,
        contentPreview: post.description || 'Click to read more about this post...'
      };
    })
  );

  return {
    props: {
      posts: postsWithContent,
    },
  };
};
