import React from 'react';
import Head from 'next/head';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip,
  Button,
  useTheme,
  Divider
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';

// Define the project type
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

// Sample projects data (you can replace with your actual projects)
const projects: Project[] = [
  {
    id: 'portfolio-blog',
    title: 'Portfolio & Blog Website',
    description: 'A modern Next.js portfolio and blog website with dark mode support, responsive design, and MathJax integration for mathematical content.',
    image: '/images/projects/portfolio.jpg',
    tags: ['Next.js', 'React', 'TypeScript', 'Material UI'],
    githubUrl: 'https://github.com/st3inum/blog',
    liveUrl: 'https://st3inum.com',
    featured: true
  },
  {
    id: 'math-algorithms',
    title: 'Mathematical Algorithms Library',
    description: 'A comprehensive library of mathematical algorithms and data structures for competitive programming and educational purposes.',
    image: '/images/projects/math-algorithms.jpg',
    tags: ['C++', 'Algorithms', 'Data Structures', 'Mathematics'],
    githubUrl: 'https://github.com/st3inum/math-algorithms',
    featured: true
  },
  {
    id: 'competitive-programming',
    title: 'Competitive Programming Solutions',
    description: 'Solutions to various competitive programming problems from platforms like Codeforces, AtCoder, and LeetCode.',
    image: '/images/projects/competitive-programming.jpg',
    tags: ['C++', 'Python', 'Algorithms', 'Problem Solving'],
    githubUrl: 'https://github.com/st3inum/competitive-programming',
    featured: false
  }
];

export default function Projects() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Separate featured projects
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <>
      <Head>
        <title>Projects | ST3INUM</title>
        <meta name="description" content="Explore my projects in mathematics, algorithms, and programming." />
      </Head>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: isDark 
            ? 'linear-gradient(135deg, rgba(25, 26, 46, 0.95) 0%, rgba(28, 29, 43, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(240, 242, 245, 0.95) 0%, rgba(250, 252, 255, 0.95) 100%)',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #6366f1 30%, #06b6d4 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            My Projects
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            align="center" 
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              maxWidth: '700px',
              mx: 'auto',
              mb: 4
            }}
          >
            A showcase of my work in mathematics, algorithms, and programming
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <>
            <Box sx={{ mb: 5 }}>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                Featured Projects
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Highlighted projects that showcase my skills and expertise
              </Typography>
              <Divider sx={{ mb: 4 }} />
              
              <Grid container spacing={4}>
                {featuredProjects.map((project) => (
                  <Grid item xs={12} md={6} key={project.id}>
                    <Card 
                      elevation={0}
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          borderColor: 'primary.main'
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={project.image}
                        alt={project.title}
                        sx={{ 
                          objectFit: 'cover',
                          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                          {project.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                          {project.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                          {project.tags.map((tag) => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small" 
                              sx={{ 
                                borderRadius: '4px',
                                backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
                                color: 'primary.main',
                                fontWeight: 500
                              }} 
                            />
                          ))}
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                          {project.githubUrl && (
                            <Button 
                              startIcon={<GitHubIcon />} 
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="outlined"
                              size="small"
                              sx={{ borderRadius: 2 }}
                            >
                              GitHub
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button 
                              startIcon={<LaunchIcon />} 
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="contained"
                              size="small"
                              sx={{ borderRadius: 2 }}
                            >
                              Live Demo
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}
            >
              More Projects
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Other projects I've worked on
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {otherProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
                        borderColor: 'primary.main'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CodeIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          {project.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                        {project.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {project.tags.map((tag) => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              borderRadius: '4px',
                              backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
                              color: 'primary.main',
                              fontWeight: 500
                            }} 
                          />
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                        {project.githubUrl && (
                          <Button 
                            startIcon={<GitHubIcon />} 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 2 }}
                          >
                            GitHub
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button 
                            startIcon={<LaunchIcon />} 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            size="small"
                            sx={{ borderRadius: 2 }}
                          >
                            Live Demo
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
}
