import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardActionArea,
  Box,
  Divider,
  useTheme,
  Chip
} from "@mui/material";

import { getAllPosts, PostMeta } from "@/lib/posts";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface HomeProps {
  posts: PostMeta[];
}

export default function Home({ posts }: HomeProps) {
  const theme = useTheme();
  
  return (
    <>
      <Head>
        <title>MathBugs Blog</title>
        <meta name="description" content="MathBugs - A blog about mathematics, algorithms, and competitive programming" />
      </Head>
      
      <Box 
        sx={{ 
          background: theme.palette.mode === "dark" 
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(6, 182, 212, 0.02) 100%)',
          py: { xs: 6, md: 10 },
          mb: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            MathBugs Blog
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            align="center" 
            paragraph
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Exploring mathematics, algorithms, and competitive programming with clear explanations and practical examples
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
            }}
          >
            Latest Posts
          </Typography>
          <Chip 
            label={`${posts.length} posts`} 
            color="primary" 
            size="small" 
            variant="filled"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)',
              color: 'white'
            }}
          />
        </Box>
        
        <Divider sx={{ mb: 4, opacity: 0.3 }} />
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {posts.map((post) => {
            // Format the date nicely
            const postDate = new Date(post.date);
            const formattedDate = postDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric"
            });
            
            return (
              <Link key={post.slug} href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    cursor: 'pointer',
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      borderColor: 'primary.main',
                      '& .post-title': {
                        color: 'primary.main'
                      }
                    }
                  }}
                >
                  <CardActionArea sx={{ height: "100%", p: 0 }}>
                    <CardContent sx={{ 
                      height: "100%", 
                      display: "flex", 
                      flexDirection: "column",
                      p: 3,
                      '&:last-child': { pb: 3 }
                    }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        className="post-title"
                        sx={{
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          lineHeight: 1.4,
                          mb: 2,
                          transition: 'color 0.2s ease',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.title}
                      </Typography>
                      
                      {post.description && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {post.description}
                        </Typography>
                      )}
                      
                      <Box sx={{ mt: 'auto' }}>
                        {post.tags && post.tags.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{
                                  mr: 1,
                                  fontSize: '0.75rem',
                                  height: 24,
                                  borderColor: 'primary.main',
                                  color: 'primary.main'
                                }}
                              />
                            ))}
                          </Box>
                        )}
                        
                        <Box 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            color: "text.secondary",
                            fontSize: '0.875rem'
                          }}
                        >
                          <CalendarTodayIcon fontSize="small" sx={{ mr: 1, fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                            {formattedDate}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            );
          })}
        </Box>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts().sort((a, b) => (a.date < b.date ? 1 : -1));
  return {
    props: { posts },
  };
};
