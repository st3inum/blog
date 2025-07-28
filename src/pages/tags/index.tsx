import { GetStaticProps } from "next";
import Head from "next/head";
import { Container, Typography, Box, Chip, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { getAllPosts } from "@/lib/posts";

interface TagsPageProps {
  tags: Array<{
    name: string;
    count: number;
  }>;
}

export default function TagsPage({ tags }: TagsPageProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>All Tags | Blog</title>
        <meta name="description" content="Browse all tags and categories" />
      </Head>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Tags
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }}>
          Browse posts by tags and categories
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {tags.length === 0 ? (
          <Typography>No tags found.</Typography>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {tags.map((tag) => (
              <Chip
                key={tag.name}
                label={`${tag.name} (${tag.count})`}
                color="primary"
                variant="outlined"
                onClick={() => router.push(`/tags/${tag.name}`)}
                sx={{ 
                  fontSize: "1rem", 
                  height: "auto", 
                  py: 1,
                  px: 0.5,
                  "& .MuiChip-label": { px: 1.5 }
                }}
              />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  
  // Count occurrences of each tag
  const tagCounts: Record<string, number> = {};
  
  posts.forEach(post => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  
  // Convert to array and sort by count (descending)
  const tags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  
  return {
    props: {
      tags,
    },
  };
};
