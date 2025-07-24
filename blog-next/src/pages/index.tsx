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
          bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          py: 8,
          mb: 4
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            MathBugs Blog
          </Typography>
          <Typography variant="h5" color="text.secondary" align="center" paragraph>
            Exploring mathematics, algorithms, and competitive programming
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" component="h2">
            Latest Posts
          </Typography>
          <Chip 
            label={`${posts.length} posts`} 
            color="primary" 
            size="small" 
            variant="outlined" 
          />
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {posts.map((post) => {
            // Format the date nicely
            const postDate = new Date(post.date);
            const formattedDate = postDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric"
            });
            
            return (
              <Box key={post.slug} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
                <Link href={`/posts/${post.slug}`} passHref legacyBehavior>
                  <Card 
                    elevation={1} 
                    sx={{ 
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardActionArea sx={{ height: "100%" }}>
                      <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <Typography variant="h6" component="h3" gutterBottom noWrap>
                          {post.title}
                        </Typography>
                        <Box 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            color: "text.secondary",
                            mt: "auto",
                            pt: 2
                          }}
                        >
                          <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                          <Typography variant="body2">{formattedDate}</Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Box>
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
