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
  ListItemText,
  Button
} from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import PublicIcon from '@mui/icons-material/Public';
import LinkIcon from '@mui/icons-material/Link';

// Define volunteer work type
interface VolunteerWork {
  id: string;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string | 'Present';
  category: 'teaching' | 'community' | 'opensource' | 'mentoring';
  icon: 'volunteer' | 'groups' | 'school' | 'code' | 'global';
  link?: string;
  responsibilities?: string[];
  impact?: string;
}

// Sample volunteer work data (replace with your actual volunteer work)
const volunteerWork: VolunteerWork[] = [
  {
    id: 'math-mentor',
    title: 'Mathematics Mentor',
    organization: 'National Mathematics Olympiad',
    description: 'Mentored high school students preparing for the National Mathematics Olympiad, providing guidance on advanced mathematical concepts and problem-solving strategies.',
    startDate: 'Jan 2021',
    endDate: 'Present',
    category: 'teaching',
    icon: 'school',
    responsibilities: [
      'Conducted weekly training sessions for 20+ students',
      'Developed custom problem sets and learning materials',
      'Provided one-on-one coaching for advanced students',
      'Organized mock competitions to prepare students for the actual event'
    ],
    impact: 'Helped 5 students qualify for the International Mathematics Olympiad selection round, with 2 students making it to the national team.'
  },
  {
    id: 'open-source',
    title: 'Open Source Contributor',
    organization: 'Various Open Source Projects',
    description: 'Active contributor to several open-source mathematical and algorithmic libraries, focusing on optimization and performance improvements.',
    startDate: 'Mar 2020',
    endDate: 'Present',
    category: 'opensource',
    icon: 'code',
    link: 'https://github.com/st3inum',
    responsibilities: [
      'Contributed optimized algorithms to mathematical libraries',
      'Fixed bugs and improved documentation',
      'Reviewed pull requests from other contributors',
      'Implemented new features based on community requests'
    ],
    impact: 'Contributions have been used by thousands of developers worldwide, with several PRs merged into major libraries.'
  },
  {
    id: 'coding-workshop',
    title: 'Coding Workshop Instructor',
    organization: 'Local Community Center',
    description: 'Organized and taught free coding workshops for underprivileged students, introducing them to programming concepts and career opportunities in tech.',
    startDate: 'Jun 2022',
    endDate: 'Dec 2022',
    category: 'community',
    icon: 'groups',
    responsibilities: [
      'Developed curriculum for beginner programmers',
      'Taught weekly classes to 15-20 students aged 14-18',
      'Provided mentorship and career guidance',
      'Organized a final project showcase event'
    ],
    impact: 'Over 30 students completed the program, with several pursuing further education in computer science.'
  },
  {
    id: 'hackathon-mentor',
    title: 'Hackathon Mentor',
    organization: 'University Hackathon Club',
    description: 'Served as a technical mentor for university hackathons, providing guidance and support to participating teams.',
    startDate: 'Sep 2021',
    endDate: 'May 2023',
    category: 'mentoring',
    icon: 'volunteer',
    responsibilities: [
      'Provided technical guidance to teams during 48-hour hackathons',
      'Helped troubleshoot code and debug issues',
      'Offered advice on project scope and implementation strategies',
      'Judged final presentations and provided constructive feedback'
    ],
    impact: 'Mentored over 20 teams across 5 hackathons, with 3 teams winning prizes in their respective categories.'
  },
  {
    id: 'global-math-initiative',
    title: 'Content Creator',
    organization: 'Global Mathematics Initiative',
    description: 'Created educational content for a non-profit organization dedicated to making advanced mathematics accessible to students worldwide.',
    startDate: 'Feb 2022',
    endDate: 'Present',
    category: 'teaching',
    icon: 'global',
    link: 'https://globalmathinitiative.org',
    responsibilities: [
      'Developed video tutorials on advanced mathematical concepts',
      'Created problem sets with detailed solutions',
      'Translated materials into multiple languages',
      'Participated in online Q&A sessions with students'
    ],
    impact: 'Content has reached over 10,000 students across 30+ countries, particularly benefiting those with limited access to advanced education.'
  }
];

// Group volunteer work by category
const teachingVolunteerWork = volunteerWork.filter(work => work.category === 'teaching');
const communityVolunteerWork = volunteerWork.filter(work => work.category === 'community');
const opensourceVolunteerWork = volunteerWork.filter(work => work.category === 'opensource');
const mentoringVolunteerWork = volunteerWork.filter(work => work.category === 'mentoring');

export default function VolunteerWork() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Function to get the appropriate icon
  const getIcon = (iconType: string) => {
    switch(iconType) {
      case 'volunteer':
        return <VolunteerActivismIcon />;
      case 'groups':
        return <GroupsIcon />;
      case 'school':
        return <SchoolIcon />;
      case 'code':
        return <CodeIcon />;
      case 'global':
        return <PublicIcon />;
      default:
        return <VolunteerActivismIcon />;
    }
  };

  // Function to render a volunteer work card
  const renderVolunteerWorkCard = (work: VolunteerWork) => (
    <Grid item xs={12} key={work.id}>
      <Card 
        elevation={0}
        sx={{ 
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56
                  }}
                >
                  {getIcon(work.icon)}
                </Avatar>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {work.startDate} - {work.endDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {work.organization}
                  </Typography>
                </Box>
                
                {work.link && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<LinkIcon />}
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderRadius: 2, mt: 1 }}
                  >
                    Visit
                  </Button>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={9}>
              <Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                  {work.title}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  {work.description}
                </Typography>
                
                {work.responsibilities && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Responsibilities:
                    </Typography>
                    <List dense sx={{ pl: 2 }}>
                      {work.responsibilities.map((responsibility, index) => (
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
                            primary={responsibility} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              color: 'text.secondary'
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
                
                {work.impact && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Impact:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {work.impact}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <>
      <Head>
        <title>Volunteer Work | ST3INUM</title>
        <meta name="description" content="My volunteer work and contributions to the community in mathematics, education, and programming." />
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
            Volunteer Work
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
            Giving back to the community through education, mentorship, and open-source contributions
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Teaching & Education */}
        {teachingVolunteerWork.length > 0 && (
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
              Teaching & Education
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Volunteer work focused on education and teaching
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {teachingVolunteerWork.map(renderVolunteerWorkCard)}
            </Grid>
          </Box>
        )}

        {/* Open Source */}
        {opensourceVolunteerWork.length > 0 && (
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
              <CodeIcon color="primary" />
              Open Source Contributions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Contributions to open-source projects and communities
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {opensourceVolunteerWork.map(renderVolunteerWorkCard)}
            </Grid>
          </Box>
        )}

        {/* Mentoring */}
        {mentoringVolunteerWork.length > 0 && (
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
              <VolunteerActivismIcon color="primary" />
              Mentoring
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Mentorship and guidance for students and peers
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {mentoringVolunteerWork.map(renderVolunteerWorkCard)}
            </Grid>
          </Box>
        )}

        {/* Community Service */}
        {communityVolunteerWork.length > 0 && (
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
              <GroupsIcon color="primary" />
              Community Service
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Volunteer work serving local and global communities
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {communityVolunteerWork.map(renderVolunteerWorkCard)}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
}
