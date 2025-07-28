import React from 'react';
import Head from 'next/head';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  useTheme,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CodeIcon from '@mui/icons-material/Code';
import PublicIcon from '@mui/icons-material/Public';

// Define achievement types
interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'competition' | 'academic' | 'professional' | 'certification';
  icon: 'trophy' | 'school' | 'certificate' | 'medal' | 'code' | 'global';
  highlights?: string[];
}

// Sample achievements data (replace with your actual achievements)
const achievements: Achievement[] = [
  {
    id: 'icpc-finalist',
    title: 'ACM ICPC World Finalist',
    description: 'Qualified for the ACM ICPC World Finals, representing my university among the top competitive programming teams globally.',
    date: '2022',
    category: 'competition',
    icon: 'trophy',
    highlights: [
      'Ranked in the top 1% of teams worldwide',
      'Solved complex algorithmic problems under time pressure',
      'Collaborated effectively in a team of three'
    ]
  },
  {
    id: 'google-codejam',
    title: 'Google Code Jam Finalist',
    description: 'Advanced to the final round of Google Code Jam, competing against top programmers from around the world.',
    date: '2021',
    category: 'competition',
    icon: 'code',
    highlights: [
      'Ranked among top 100 globally',
      'Developed efficient algorithms for complex problems',
      'Optimized solutions for extreme test cases'
    ]
  },
  {
    id: 'research-publication',
    title: 'Research Publication in Algorithmic Optimization',
    description: 'Published research paper on novel algorithmic optimization techniques in a peer-reviewed journal.',
    date: '2023',
    category: 'academic',
    icon: 'school',
    highlights: [
      'Developed a new approach to graph optimization problems',
      'Improved time complexity of existing algorithms',
      'Demonstrated practical applications in network routing'
    ]
  },
  {
    id: 'math-olympiad',
    title: 'International Mathematics Olympiad - Bronze Medal',
    description: 'Earned a bronze medal representing my country at the International Mathematics Olympiad.',
    date: '2019',
    category: 'competition',
    icon: 'medal',
    highlights: [
      'Solved complex mathematical problems',
      'Competed against top students from over 100 countries',
      'Trained intensively in advanced mathematical concepts'
    ]
  },
  {
    id: 'aws-certification',
    title: 'AWS Certified Solutions Architect',
    description: 'Earned AWS Certified Solutions Architect - Professional certification, demonstrating expertise in designing distributed systems on AWS.',
    date: '2022',
    category: 'certification',
    icon: 'certificate'
  },
  {
    id: 'hackathon-winner',
    title: 'International Hackathon Winner',
    description: 'First place winner at an international hackathon focused on developing innovative solutions for climate change.',
    date: '2023',
    category: 'competition',
    icon: 'global',
    highlights: [
      'Developed a machine learning solution for predicting climate patterns',
      'Implemented a full-stack application in 48 hours',
      'Pitched the solution to a panel of industry experts'
    ]
  }
];

// Group achievements by category
const competitionAchievements = achievements.filter(achievement => achievement.category === 'competition');
const academicAchievements = achievements.filter(achievement => achievement.category === 'academic');
const professionalAchievements = achievements.filter(achievement => achievement.category === 'professional');
const certifications = achievements.filter(achievement => achievement.category === 'certification');

export default function Achievements() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Function to get the appropriate icon
  const getIcon = (iconType: string) => {
    switch(iconType) {
      case 'trophy':
        return <EmojiEventsIcon />;
      case 'school':
        return <SchoolIcon />;
      case 'certificate':
        return <WorkspacePremiumIcon />;
      case 'medal':
        return <MilitaryTechIcon />;
      case 'code':
        return <CodeIcon />;
      case 'global':
        return <PublicIcon />;
      default:
        return <EmojiEventsIcon />;
    }
  };

  return (
    <>
      <Head>
        <title>Achievements | ST3INUM</title>
        <meta name="description" content="My academic and professional achievements in mathematics, algorithms, and programming." />
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
            My Achievements
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
            Academic and professional accomplishments in mathematics, algorithms, and programming
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Competition Achievements */}
        {competitionAchievements.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <EmojiEventsIcon color="primary" />
              Competitions & Awards
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Recognition from competitive programming contests and other competitions
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {competitionAchievements.map((achievement) => (
                <Grid item xs={12} md={6} key={achievement.id}>
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
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: 'primary.main',
                            mr: 2
                          }}
                        >
                          {getIcon(achievement.icon)}
                        </Avatar>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                              {achievement.title}
                            </Typography>
                            <Chip 
                              label={achievement.date} 
                              size="small" 
                              sx={{ 
                                borderRadius: '4px',
                                backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
                                color: 'primary.main',
                                fontWeight: 500
                              }} 
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {achievement.description}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {achievement.highlights && (
                        <List dense sx={{ pl: 2 }}>
                          {achievement.highlights.map((highlight, index) => (
                            <ListItem key={index} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <Box 
                                  sx={{ 
                                    width: 6, 
                                    height: 6, 
                                    borderRadius: '50%', 
                                    bgcolor: 'primary.main' 
                                  }} 
                                />
                              </ListItemIcon>
                              <ListItemText 
                                primary={highlight} 
                                primaryTypographyProps={{ 
                                  variant: 'body2',
                                  color: 'text.secondary'
                                }} 
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Academic Achievements */}
        {academicAchievements.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <SchoolIcon color="primary" />
              Academic Achievements
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Research publications and academic accomplishments
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {academicAchievements.map((achievement) => (
                <Grid item xs={12} md={6} key={achievement.id}>
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
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: 'primary.main',
                            mr: 2
                          }}
                        >
                          {getIcon(achievement.icon)}
                        </Avatar>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                              {achievement.title}
                            </Typography>
                            <Chip 
                              label={achievement.date} 
                              size="small" 
                              sx={{ 
                                borderRadius: '4px',
                                backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
                                color: 'primary.main',
                                fontWeight: 500
                              }} 
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {achievement.description}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {achievement.highlights && (
                        <List dense sx={{ pl: 2 }}>
                          {achievement.highlights.map((highlight, index) => (
                            <ListItem key={index} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <Box 
                                  sx={{ 
                                    width: 6, 
                                    height: 6, 
                                    borderRadius: '50%', 
                                    bgcolor: 'primary.main' 
                                  }} 
                                />
                              </ListItemIcon>
                              <ListItemText 
                                primary={highlight} 
                                primaryTypographyProps={{ 
                                  variant: 'body2',
                                  color: 'text.secondary'
                                }} 
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <WorkspacePremiumIcon color="primary" />
              Certifications
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Professional certifications and qualifications
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {certifications.map((achievement) => (
                <Grid item xs={12} md={6} key={achievement.id}>
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
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: 'primary.main',
                            mr: 2
                          }}
                        >
                          {getIcon(achievement.icon)}
                        </Avatar>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                              {achievement.title}
                            </Typography>
                            <Chip 
                              label={achievement.date} 
                              size="small" 
                              sx={{ 
                                borderRadius: '4px',
                                backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
                                color: 'primary.main',
                                fontWeight: 500
                              }} 
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {achievement.description}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {achievement.highlights && (
                        <List dense sx={{ pl: 2 }}>
                          {achievement.highlights.map((highlight, index) => (
                            <ListItem key={index} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <Box 
                                  sx={{ 
                                    width: 6, 
                                    height: 6, 
                                    borderRadius: '50%', 
                                    bgcolor: 'primary.main' 
                                  }} 
                                />
                              </ListItemIcon>
                              <ListItemText 
                                primary={highlight} 
                                primaryTypographyProps={{ 
                                  variant: 'body2',
                                  color: 'text.secondary'
                                }} 
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
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
