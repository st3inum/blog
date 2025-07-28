import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Stack,
  Link
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BuildIcon from '@mui/icons-material/Build';

import { siteConfig } from '../lib/siteConfig';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import CollapsibleSection from '../components/CollapsibleSection';

export default function About() {
  return (
    <>
      <Head>
        <title>About Me | {siteConfig.title}</title>
        <meta name="description" content="About Fahim Tajwar Saikat" />
      </Head>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" 
          sx={{ 
            mb: 4, 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          About Me
        </Typography>
        
        {/* Secondary Navigation */}
        <Card sx={{ 
          mb: 4, 
          p: 2, 
          borderRadius: 2,
          background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
            <Link href="#contact" underline="hover" sx={{ fontWeight: 500, color: '#333', '&:hover': { color: '#2196F3' } }}>Contact</Link>
            <Link href="#work" underline="hover" sx={{ fontWeight: 500, color: '#333', '&:hover': { color: '#2196F3' } }}>Work Experience</Link>
            <Link href="#projects" underline="hover" sx={{ fontWeight: 500, color: '#333', '&:hover': { color: '#2196F3' } }}>Projects</Link>
            <Link href="#contests" underline="hover" sx={{ fontWeight: 500, color: '#333', '&:hover': { color: '#2196F3' } }}>Contests</Link>
            <Link href="#publications" underline="hover" sx={{ fontWeight: 500, color: '#333', '&:hover': { color: '#2196F3' } }}>Publications</Link>
            <Link href="#skills" underline="hover" sx={{ fontWeight: 500, color: '#333', '&:hover': { color: '#2196F3' } }}>Skills</Link>
            <Link href="#education" underline="hover" sx={{ fontWeight: 500, color: '#333', '&:hover': { color: '#2196F3' } }}>Education</Link>
            <Link href="#voluntary" underline="hover" sx={{ fontWeight: 500, color: '#333', '&:hover': { color: '#2196F3' } }}>Problem Setting</Link>
          </Box>
        </Card>
        
        {/* Contact Information */}
        <Box id="contact" sx={{ mb: 4 }}>
          <Card sx={{ 
            boxShadow: 3, 
            borderRadius: 2,
            transition: 'transform 0.2s, box-shadow 0.2s', 
            '&:hover': { boxShadow: 5 } 
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Box mr={2} sx={{ position: 'relative', width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                  <Box 
                    component="div"
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      background: 'linear-gradient(45deg, #3f51b5 30%, #2196F3 90%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    FS
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Fahim Tajwar Saikat
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
                    <Box display="flex" alignItems="center">
                      <EmailIcon fontSize="small" sx={{ mr: 0.5, color: '#2196F3' }} />
                      <Link href="mailto:fahim.tajwar.saikat@gmail.com" sx={{ '&:hover': { color: '#2196F3' } }}>
                        fahim.tajwar.saikat@gmail.com
                      </Link>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: '#2196F3' }} />
                      <Typography variant="body2">+8801990597310</Typography>
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={1} flexWrap="wrap">
                    <Box display="flex" alignItems="center">
                      <LinkedInIcon fontSize="small" sx={{ mr: 0.5, color: '#2196F3' }} />
                      <Link href="https://linkedin.com/in/steinum" target="_blank" rel="noopener" sx={{ '&:hover': { color: '#2196F3' } }}>
                        linkedin.com/in/steinum
                      </Link>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <GitHubIcon fontSize="small" sx={{ mr: 0.5, color: '#2196F3' }} />
                      <Link href="https://github.com/st3inum" target="_blank" rel="noopener" sx={{ '&:hover': { color: '#2196F3' } }}>
                        github.com/st3inum
                      </Link>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <LanguageIcon fontSize="small" sx={{ mr: 0.5, color: '#2196F3' }} />
                      <Link href="https://st3inum.github.io" target="_blank" rel="noopener" sx={{ '&:hover': { color: '#2196F3' } }}>
                        st3inum.github.io
                      </Link>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        {/* Work Experience */}
        <AboutSection
          id="work"
          title="Work Experience"
          icon={<WorkIcon color="primary" sx={{ mr: 1 }} />}
          gridColumns={{ xs: '1fr', md: '1fr' }}
          items={[
            {
              title: "Software Engineer",
              subtitle: "Data Tree Technologies, LLC",
              period: "Aug 2023 – Present | New York, USA (Remote)",
              tech: "Node.js, Express.js, React, Redux-Saga, AWS (Lambda, S3, API Gateway), MongoDB"
            },
            {
              title: "Machine Learning Engineer",
              subtitle: "Inverse.AI",
              period: "Sep 2021 – Apr 2022 | Sylhet, Bangladesh",
              tech: "Python, NumPy, TensorFlow, Keras, PyTorch, Scikit-learn, Java, C++"
            }
            // Uncomment to add the intern position:
            // {
            //   title: "Software Development Intern",
            //   subtitle: "Brain Station 23",
            //   period: "May 2021 – Dec 2021 | Dhaka, Bangladesh",
            //   tech: "JavaScript, React, Node.js, MongoDB"
            // }
          ]}
        />
        
        {/* Projects */}
        <AboutSection
          id="projects"
          title="Projects"
          icon={<CodeIcon color="primary" sx={{ mr: 1 }} />}
          gridColumns={{ xs: '1fr', md: '1fr' }}
          items={[
            // {
            //   title: "Competitive Programming Archive",
            //   description: "A comprehensive archive of 3500+ competitive programming solutions with explanations. Built with Next.js and MongoDB.",
            //   link: {
            //     url: "https://github.com/st3inum/cp-archive",
            //     text: "GitHub Repository"
            //   }
            // },
            // {
            //   title: "Algorithmic Visualizer",
            //   description: "Interactive visualization tool for common algorithms and data structures. Built with React and D3.js.",
            //   link: {
            //     url: "https://github.com/st3inum/algo-viz",
            //     text: "GitHub Repository"
            //   }
            // },
            // {
            //   title: "Neural Style Transfer App",
            //   description: "Web application that applies artistic styles to images using neural networks. Built with TensorFlow.js and React.",
            //   link: {
            //     url: "https://github.com/st3inum/neural-style",
            //     text: "GitHub Repository"
            //   }
            // }
            {
              title: "Math Quiz App",
              subtitle: "Web-based quiz platform for math olympiad participants.",
              // period: "2021 - Present",
              tech: "PHP, MySQL, Bootstrap, MathJax",
              link: {
                url: "https://github.com/st3inum/SRMC_WEB",
                text: "GitHub Repository"
              }
            },
            {
              title: "SWE-CP Tracker",
              subtitle: "Automated performance tracking tool for 100+ students on multiple online judges.",
              // period: "2021 - Present",
              tech: "Python (requests, BeautifulSoup4), PostgreSQL, Django",
              // link: {
              //   url: "https://github.com/st3inum/SWE-CP-Tracker",
              //   text: "GitHub Repository"
              // }
            }
          ]}
        />  
        
        {/* Programming Contests */}
        <CollapsibleSection
          id="contests"
          title="Programming Contests Achievements & Awards"
          icon={<EmojiEventsIcon color="primary" sx={{ mr: 1 }} />}
          visibleItems={[
            {
              title: "45th Annual World Finals of the International Collegiate Programming Contest",
              period: "2021",
              subtitle: "Team: BerlekampMassey",
              description: "Secured 50th position(Ranked) globally.",
              link: {
                url: "https://icpc.global/regionals/finder/World-Finals-2021/standings",
                text: "Standings"
              },
              customContent: (
                <div>News Articles: {
                  [
                    { url: 'https://www.ittefaq.com.bd/489866/%E0%A6%86%E0%A6%87%E0%A6%B8%E0%A6%BF%E0%A6%AA%E0%A6%BF%E0%A6%B8%E0%A6%BF%E0%A6%B0-%E0%A6%AB%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%BE%E0%A6%B2%E0%A7%87-%E0%A6%B6%E0%A6%BE%E0%A6%AC%E0%A6%BF-%E0%A6%B6%E0%A6%BF%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%A5%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0-%E0%A6%A6%E0%A6%B2' },
                    { url: 'https://www.prothomalo.com/technology/4p07lqozjl' },
                  ].map((article, index) => (
                    <React.Fragment key={index}>
                      {' '}
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <u>[{index + 1}]</u>
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              )
            },
            {
              title: "The 2020 ICPC Asia Dhaka Regional Contest",
              subtitle: "Team: BerlekampMassey",
              description: "Secured 4th position among 100+ teams from Bangladesh",
              link: {
                url: "https://icpc.global/regionals/finder/Dhaka-2021/standings",
                text: "Standings"
              }
            },
            {
              title: "Asia Dhaka Regional Site Online Preliminary Contest",
              subtitle: "Team: BerlekampMassey",
              description: "Secired 2nd position among 1300+ teams",
              link: {
                url: "https://icpc.global/regionals/finder/Dhaka-Preliminary-2021/standings",
                text: "Standings"
              }
            }
          ]}
          hiddenItems={[
            {
              title: "BUET Inter University Programming Contest 2022",
              subtitle: "Team: BerlekampMassey",
              description: "Secured 2nd position among 110+ teams from various universities.",
              link: {
                url: "https://toph.co/c/buet-inter-university-2022/standings",
                text: "Standings"
              }
            },
            {
              title: "Cefalo CodeFiesta 2022: AUST IUPC",
              subtitle: "Team: BerlekampMassey",
              description: "Secured 3rd position among 100+ teams from various universities.",
              link: {
                url: "https://web.archive.org/web/20221201173754/https://algo.codemarshal.org/contests/aust-2022/standings",
                text: "Web Archive Standings"
              }
            },
            {
              title: "RUET CSE FEST 2k22 IUPC",
              subtitle: "Team: BerlekampMassey",
              description: "Secured 3rd position among 97 teams from various universities.",
              link: {
                url: "https://web.archive.org/web/20220809163821/https://algo.codemarshal.org/contests/ruet-2022/standings",
                text: "Web Archive Standings"
              }
            },
            {
              title: "Cefalo SUST Inter University Programming Contest 2023",
              subtitle: "Team: BerlekampMassey",
              description: "Secured 3rd position among 110+ teams from various universities.",
              link: {
                url: "https://toph.co/c/sust-inter-university-2023/standings",
                text: "Standings"
              }
            },
            {
              title: "SRBD Code Contest 2022",
              description: "Ranked 9th in the final round (from 920 participants), including 5th place in the 2nd round.",
              customContent: (
                <div>News Articles: <a href="https://www.channel24bd.tv/24pressrelease/article/124341/%E0%A6%A6%E0%A7%87%E0%A6%B6%E0%A7%87-%E0%A6%8F%E0%A6%96%E0%A6%A8-%E0%A6%AC%E0%A7%8D%E0%A6%B0%E0%A7%87%E0%A6%87%E0%A6%A8-%E0%A6%A1%E0%A7%8D%E0%A6%B0%E0%A7%87%E0%A6%87%E0%A6%A8-%E0%A6%A8%E0%A7%9F-%E0%A6%97%E0%A7%87%E0%A6%87%E0%A6%A8-%E0%A6%B9%E0%A6%9A%E0%A7%8D%E0%A6%9B%E0%A7%87:-%E0%A6%86%E0%A6%87%E0%A6%B8%E0%A6%BF%E0%A6%9F%E0%A6%BF-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A4%E0%A6%BF%E0%A6%AE%E0%A6%A8%E0%A7%8D%E0%A6%A4%E0%A7%8D%E0%A6%B0%E0%A7%80%C2%A0"><u>[1]</u></a></div>
              )
            },
            {
              title: "Meta Hacker Cup 2021",
              description: "Ranked 1988th in the 2nd round (from 20000+ participants)",
              link: {
                url: "https://www.facebook.com/codingcompetitions/hacker-cup/2021/certificate/2618271751606408",
                text: "Certificate"
              }
            },
            {
              title: "Codeforces",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Profile: <a href="https://codeforces.com/profile/steinum" style={{ color: "#a0a" }}>steinum</a></li>
                  <li>Max rating: 2082 (Candidate Master)</li>
                  <li><a href="https://codeforces.com/contest/1794/standings"><u>Ranked 10th among ~8500 participants in <b>Round 856 (Div. 2)</b></u></a></li>
                  <li><a href="https://codeforces.com/contest/1341/standings"><u>Ranked 21th among ~15400 participants in <b>Round 637 (Div. 2)</b></u></a></li>
                  <li><a href="https://codeforces.com/contest/1686/standings"><u>Ranked 49th among ~9700 participants in <b>Round 794 (Div. 2)</b></u></a></li>
                  <li>Solved ~1000 Problems in Codeforces</li>
                </ul>
              )
            },
            {
              title: "CodeChef",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Profile: <a href="https://www.codechef.com/users/steinum" style={{ color: "#684273" }}>steinum</a></li>
                  <li>Max rating: 1991 (4*)</li>
                  <li><a href="https://www.codechef.com/rankings/START55B?itemsPerPage=100&order=asc&page=1&sortBy=rank"><u>Ranked 2nd among ~2300 participants in <b>Starters 55 Division 2</b></u></a></li>
                  <li><a href="https://www.codechef.com/rankings/LTIME83B?itemsPerPage=100&order=asc&page=1&sortBy=rank"><u>Ranked 12th among ~7500 participants in <b>April Lunchtime 2020</b></u></a></li>
                  <li><a href="https://www.codechef.com/rankings/START100B?itemsPerPage=100&order=asc&page=1&sortBy=rank"><u>Ranked 17th among ~1300 participants in <b>Starters 100 Division 2</b></u></a></li>
                  <li><a href="https://www.codechef.com/rankings/LTIME88B?itemsPerPage=100&order=asc&page=1&sortBy=rank"><u>Ranked 24th among ~6500 participants in <b>September Lunchtime 2020</b></u></a></li>
                </ul>
              )
            },
            {
              title: "Toph",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Profile: <a href="https://toph.co/u/steinum" style={{ color: "#c56b03" }}>steinum</a></li>
                  <li>Max rating: 1895</li>
                  <li>Solved 700 Problems in Toph, 3rd highest solver among ~36000 users</li>
                  <li><a href="https://toph.co/c/bsmrstu-monthly-contest-december-2020-r/standings"><u>Ranked 1st in <b>Replay of BSMRSTU Monthly Contest, December, 2020</b></u></a></li>
                  <li><a href="https://toph.co/c/intra-sust-2020-final/standings"><u>Ranked 2nd in <b>Intra SUST Programming Contest 2020 Final</b></u></a></li>
                  <li><a href="https://toph.co/c/intra-sust-2020-preliminary-2/standings"><u>Ranked 2nd in <b>Intra SUST Programming Contest 2020 Preliminary 2</b></u></a></li>
                  <li><a href="https://toph.co/c/intra-kuet-2020-r/standings"><u>Ranked 4th in <b>Replay of Intra KUET Programming Contest 2020</b></u></a></li>
                  <li><a href="https://toph.co/c/mbstu-lockdown-contest-1-r/standings"><u>Ranked 5th in <b>Replay of MBSTU Lockdown Contest - 1</b></u></a></li>
                </ul>
              )
            },
            {
              title: "Other Online Judges",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>2000+ Problem solved in Vjudge. Username: <a href="https://vjudge.net/user/steinum">steinum</a></li>
                  <li><a href="https://vjudge.net/user#username=&nickname=&school=&category=all&groupId="><u>22th(~0.002%) highest solver in Vjudge among ~1150000 users</u></a></li>
                  <li><b style={{color: "#0000FF"}}>1731</b> rating in AtCoder in only 9 contest, <a href="https://atcoder.jp/users/steinum"><u>username: <b style={{color: "#0000FF"}}>steinum</b></u></a></li>
                  <li>Max rating 2153 in LeetCode in only 10 contest, <a href="https://leetcode.com/u/steinum/"><u>username: steinum</u></a></li>
                  

                </ul>
              )
            },
            {
              title: "Math Olympiad",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>First Runner-up in <a href="https://web.archive.org/web/20140601014913/http://www.matholympiad.org.bd/blog/?p=890&utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+BdMOBlog+%28Blog+%7C+Bangladesh+Mathematical+Olympiad%29"><u>Khulna Regional Round of Math Olympiad, 2014</u></a></li>
                  <li>Champion of the Champion in <a href="#"><u>Khulna Regional Round of Math Olympiad, 2015</u></a></li>
                  <li>Champion of the Champion in <a href="#"><u>Khulna Regional Round of Math Olympiad, 2017</u></a></li>
                  <li>First Runner-up in <a href="#"><u>National Round of Math Olympiad, 2017</u></a></li>
                </ul>
              )
            },
            {
              title: "Physics Olympiad",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>First Runner-up in Khulna Regional Round of Physics Olympiad, 2014</li>
                  <li>First Runner-up in Khulna Regional Round of Physics Olympiad, 2016</li>
                </ul>
              )
            },
            {
              title: "Astrophysics Olympiad",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>First Runner-up in Khulna Regional Round of Physics Olympiad, 2014</li>
                  <li>First Runner-up in Khulna Regional Round of Physics Olympiad, 2016</li>
                </ul>
              )
            }
          ]}
        />
        
        {/* Publications */}
        <AboutSection
          id="publications"
          title="Publications"
          icon={<MenuBookIcon color="primary" sx={{ mr: 1 }} />}
          gridColumns={{ xs: '1fr', md: '1fr 1fr' }}
          items={[
            {
              title: "সংখ্যাতত্ত্বের শুরু: লক্ষ্য যখন অলিম্পিয়াড",
              description: "Published in Tamralipi (2016).",
              link: {
                url: "http://www.rokomari.com/book/111794/sonkhatottoer-shuru-lokho-jokon-olympid",
                text: "Available on Rokomari"
              }
            }
          ]}
        />
        
        {/* Skills */}
        <SkillsSection
          id="skills"
          title="Skills"
          icon={<BuildIcon color="primary" sx={{ mr: 1 }} />}
          skillCategories={[
            {
              category: "Languages",
              skills: ["C", "C++","Java", "JavaScript (ES6+)", "Python", "PHP"]
            },
            {
              category: "Backend",
              skills: ["Node.js", "Express.js", "Serverless Framework", "Django"]
            },
            {
              category: "Frontend",
              skills: ["HTML", "CSS", "Bootstrap", "React.js", "Ant Design", "Redux-Saga", "Material-UI", "Next.js", "Tailwind CSS"]
            },
            {
              category: "Cloud",
              skills: ["AWS (Lambda, API Gateway, S3, SES, SQS)"]
            },
            {
              category: "Databases",
              skills: ["MongoDB", "MySQL", "PostgreSQL"]
            },
            {
              category: "Tools & OS",
              skills: ["Git", "GitHub Actions", "Travis CI", "Linux"]
            }
          ]}
        />
        
        {/* Education */}
        <AboutSection
          id="education"
          title="Education"
          icon={<SchoolIcon color="primary" sx={{ mr: 1 }} />}
          gridColumns={{ xs: '1fr', md: '1fr 1fr' }}
          items={[
            {
              title: "Daffodil International University",
              subtitle: "M.Sc. in Computer Science",
              period: "Jun 2024 – Present",
              // description: "CGPA: 3.5/4"
            },
            {
              title: "Shahjalal University of Science and Technology",
              subtitle: "B.Sc. in Software Engineering",
              period: "Feb 2018 – Apr 2023",
              description: "CGPA: 3.5/4"
            },
            {
              title: "Khulna Public College",
              subtitle: "Class 8 to 12",
              period: "Jan 2012 - July 2017"
            },
            {
              title: "Khagrachari Cantonment Public School and College",
              subtitle: "Class 2 to 7",
              period: "Jan 2006 - Dec 2011"
            },
            {
              title: "Al-Faroque Institute Bandarban",
              subtitle: "Kindergarten and Class 1",
              period: "Jan 2004 - Dec 2005"
            }
          ]}
        />
        
        {/* Problem Setting and Voluntary Works */}
        <CollapsibleSection
          id="voluntary"
          title="Problem Setting and Voluntary Works"
          icon={<VolunteerActivismIcon color="primary" sx={{ mr: 1 }} />}
          visibleItems={[
            {
              title: "Coordinator, Judge, and Setter at Khulna Regional Inter University Programming Contest (KRIUPC)",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Set <a href="https://codeforces.com/gym/105498/problem/A"><u>Optimal Point</u></a> and <a href="https://codeforces.com/gym/105498/problem/B"><u>The Fortune Dice</u></a>, <a href="https://codeforces.com/gym/105498/problem/G"><u>User Registration System</u></a>, and create <a href="https://codeforces.com/gym/105498/problem/H"><u>Optimizing Weekend Days</u></a></li>
                  <li>Coordinated with other problem setters and write alternate solution to the other problems.</li>
                  <li>Contest Link: <a href="https://toph.co/c/khulna-regional-inter-university-kriupc"><u>Main Round</u></a>, <a href="https://codeforces.com/gym/105498"><u>Mirror Round</u></a></li>
                </ul>
              )
            },
            {
              title: "Coordinator and Judge at Kite Games Presents Inter University Programming Contest - SUST CSE Carnival 2024",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Contest Link: <a href="https://toph.co/c/inter-university-sust-cse-carnival-2024"><u>SUST IUPC 2024</u></a></li>
                  <li>Coordinate with every problem setter, modify the problems with better statement and test cases, write alternate solution to the problems.</li>
                  <li>Give direction to all technical setup, manage contest floor, and handle all issues.</li>
                </ul>
              )
            },
            {
              title: "Coordinator and Setter at SEC Inter University Junior Programming Contest, 2022",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Set <a href="https://toph.co/p/substring-search"><u>Substring Search</u></a> and <a href="https://toph.co/p/average-query"><u>Average Query</u></a></li>
                  <li>Coordinated with other problem setters and write alternate solution to the other problems.</li>
                  <li>Contest Link: <a href="https://toph.co/c/sec-inter-university-junior-2022"><u>SEC Inter University Junior Programming Contest, 2022</u></a></li>
                </ul>
              )
            },
            {
              title: "Coordinator, Judge, and Setter at Intra SUST Programming Contest 2023",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Coordinated with other problem setters and write alternate solution to the other problems.</li>
                  <li>Manage sponsor for the full program.</li>
                  <li>Manage all technical setup, manage contest floor, and handle all issues.</li>
                  <li>Problem Statement: <a href="https://drive.google.com/file/d/1QnSqt0CXn_bH7YAub5rGeO1aFpUHayut/view"><u>Preliminary Round 1</u></a>, <a href="https://drive.google.com/file/d/1CWW3XseXpFrD6A1LOKrJ4MGZCqTpykjp/view"><u>Preliminary Round 2</u></a>, <a href="https://drive.google.com/file/d/17s8qw78XbtXKCu6iX1xzZn03SUEEBcb8/view"><u>Main Round</u></a></li>
                  <li>Contest Link: <a href="https://codeforces.com/gym/104283"><u>Contest Based on Brain Craft Intra SUST Programming Contest 2023</u></a></li>
                </ul>
              )
            }
          ]}
          hiddenItems={[
            {
              title: "Coordinator and Setter at LU CSE Carnival Chapter-2",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Coordinated with other problem setters and write alternate solution to the other problems.</li>
                  <li><a href="https://drive.google.com/file/d/1jMIR609jIQb_fx-7HwhbCjlIaOW-_907/view"><u>Problem Statement</u></a></li>
                </ul>
              )
            },
            {
              title: "Onsite Technical Director at MTB Presents AUST Inter University Programming Contest 2025",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Manage all technical setup, manage contest floor, and handle all issues.</li>
                  <li>Contest Link: <a href="https://toph.co/c/mtb-presents-aust-inter-university-2025"><u>Main Round</u></a>, <a href="https://codeforces.com/gym/105723"><u>Replay Round</u></a></li>
                </ul>
              )
            },
            {
              title: "Onsite Technical Director at Betopia Group Presents DUET Inter University Programming Contest (IUPC) 2025",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Manage all technical setup, manage contest floor, and handle all issues.</li>
                  <li>Contest Link: <a href="https://toph.co/c/duet-inter-university-iupc-2025"><u>Main Round</u></a>, <a href="https://codeforces.com/gym/105884"><u>Replay Round</u></a></li>
                </ul>
              )
            },
            {
              title: "Onsite Technical Director at Uttara University Inter-University Programming Contest 2025",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Manage all technical setup, manage contest floor, and handle all issues.</li>
                  <li>Contest Link: <a href="https://toph.co/c/uttara-university-inter-university-2025"><u>Main Round</u></a>, <a href="https://codeforces.com/gym/105973"><u>Replay Round</u></a></li>
                </ul>
              )
            },
            {
              title: "Problem Setter at 15th IIUC Inter University Programming Contest 2023",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Set <a href="https://toph.co/c/15th-iiuc-inter-university-2023"><u>Discrete Logarithm</u></a></li>
                  <li>Alternate for these problems: <a href="https://toph.co/c/15th-iiuc-inter-university-2023"><u>Fight Club</u></a>, <a href="https://toph.co/c/15th-iiuc-inter-university-2023"><u>Moves like knight</u></a>, <a href="https://toph.co/c/15th-iiuc-inter-university-2023"><u>Island Finder</u></a>, and <a href="https://toph.co/c/15th-iiuc-inter-university-2023"><u>Not a Fun Game</u></a></li>
                  <li><a href="https://drive.google.com/file/d/1T0m6_AQoxURaCJTIh6q7l8lh7Yb8OYPY/view"><u>Problem Statement</u></a></li>
                  <li>Contest Link: <a href="https://toph.co/c/15th-iiuc-inter-university-2023"><u>15th IIUC Inter University Programming Contest 2023</u></a></li>
                </ul>
              )
            },
            {
              title: "Problem Setter and Coordinator at Father Timm Memorial Programming Contest 4.0",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Set <a href="https://toph.co/contests/training/em3dqhq"><u>Find X</u></a></li>
                  <li>Coordinated with other problem setters and write alternate solution to the other problems.</li>
                  <li>Contest Link: <a href="https://toph.co/c/father-timm-memorial-4-0-preliminary"><u>Preliminary Round</u></a>, <a href="https://toph.co/contests/training/em3dqhq"><u>Final Round</u></a></li>
                </ul>
              )
            },
            {
              title: "Problem Setter at Father Timm Memorial Programming Contest 1.0",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Set <a href="https://toph.co/p/cat-everywhere"><u>Cat Everywhere</u></a> and <a href="https://toph.co/p/i-dont-like-polynomial"><u>I Dont Like Polynomial</u></a></li>
                  <li>Coordinated with other problem setters and write alternate solution to the other problems.</li>
                  <li>Contest Link: <a href="https://toph.co/c/father-timm-memorial-1-0"><u>Father Timm Memorial Programming Contest 1.0</u></a></li>
                </ul>
              )
            },
            {
              title: "Problem Setter at Operation Coding",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Set <a href="https://toph.co/c/operation-coding"><u>Polygon Intersection</u></a> and <a href="https://toph.co/c/operation-coding"><u>Rescue the function</u></a></li>
                  <li>Coordinated with other problem setters and write alternate solution to the other problems.</li>
                  <li>Contest Link: <a href="https://toph.co/c/operation-coding"><u>Operation Coding</u></a></li>
                </ul>
              )
            },
            {
              title: "Judge and Alternate Solution Writer at IUT 11th National ICT Fest Programming Contest 2024",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Contest Link: <a href="https://toph.co/c/iut-11th-national-ict-fest-2024"><u>IUT 11th National ICT Fest Programming Contest 2024</u></a></li>
                  <li>Alternate for this problem: <a href="https://toph.co/p/prime---prime---prime"><u>Prime - Prime - Prime</u></a></li>
                </ul>
              )
            },
            {
              title: "Manager and Judge at Metropolitan University Inter University Programming Contest - Sylhet Division 2024",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Onsite Judge, Technical Onsite Director, and tester of the problems.</li>
                  <li>Contest Link: <a href="https://toph.co/c/inter-university-sylhet-division-2024"><u>Main Round</u></a>, <a href="https://codeforces.com/gym/105530"><u>Replay Round</u></a></li>
                </ul>
              )
            },
            {
              title: "Manager and Judge at National High School Programming Contest 2021 - Mock Contest 2",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Coordinated with other problem setters and write alternate solution to the other problems.</li>
                  <li>Contest link: <a href="https://toph.co/c/national-high-school-mock-2"><u>Mock Contest 2</u></a></li>
                </ul>
              )
            },
            {
              title: "Organizer and Instructor at Jashore University of Science and Technology Camp 2023",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Delivered intensive training on Number Theory, Dynamic Programming, Data Structures, String Algorithms, Graph Algorithms, Computational Geometry, Linear Algebra, and Game Theory.</li>
                  <li>Designed and conducted a 7-day workshop combining team contests and interactive training sessions to simulate national-level competition environments.</li>
                  <li>Mentored participants on advanced problem-solving strategies and contest preparation techniques targeting national-level programming contests.</li>
                  <li>Facilitated hands-on learning through real-time problem-solving sessions and post-contest discussions to strengthen analytical and coding skills.</li>
                </ul>
              )
            },
            {
              title: "Organizer and Instructor at Khulna University Camp 2024",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Delivered intensive training on Number Theory, Dynamic Programming, Data Structures, String Algorithms, Graph Algorithms, Computational Geometry, Linear Algebra, and Game Theory.</li>
                  <li>Designed and conducted a 7-day workshop combining team contests and interactive training sessions to simulate national-level competition environments.</li>
                  <li>Mentored participants on advanced problem-solving strategies and contest preparation techniques targeting national-level programming contests.</li>
                  <li>Facilitated hands-on learning through real-time problem-solving sessions and post-contest discussions to strengthen analytical and coding skills.</li>
                </ul>
              )
            },
            {
              title: "Trainer at Mawlana Bhashani Science and Technology University",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Delivered intensive training on Number Theory, Dynamic Programming, Data Structures, String Algorithms, Graph Algorithms, Computational Geometry, Linear Algebra, and Game Theory.</li>
                  <li>Mentored participants on advanced problem-solving strategies and contest preparation techniques targeting national-level programming contests.</li>
                  <li>Facilitated hands-on learning through real-time problem-solving sessions and post-contest discussions to strengthen analytical and coding skills.</li>
                </ul>
              )
            },
            {
              title: "Mentor at Shahjalal University of Science and Technology",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Delivered intensive training on Number Theory, Dynamic Programming, Data Structures, String Algorithms, Graph Algorithms, Computational Geometry, Linear Algebra, and Game Theory.</li>
                  <li>Mentored participants on advanced problem-solving strategies and contest preparation techniques targeting national-level programming contests.</li>
                  <li>Arrange internal Team Selection Contest, and Team Forming Contest.</li>
                </ul>
              )
            },
            {
              title: "Mentor at Srinivasa Ramanujan Math Club Khulna",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Delivered intensive training on Number Theory, Geometry, Mathematics for school level students.</li>
                  <li>Mentored more than 200+ students.</li>
                  <li>Served as General Secretary of Srinivasa Ramanujan Math Club Khulna.</li>
                  <li>Organized Math Olympiad under the banner of Srinivasa Ramanujan Math Club Khulna.</li>
                </ul>
              )
            },
            {
              title: "Academic Team Member at Math Olympiad Committee",
              period: "2018 - 2020",
              description: "Participated in 6+ Regional and 2+ National Math Olympiad as a Judge."
            },
            {
              title: "Academic Team Member at Physics Olympiad Committee",
              period: "2018 - 2019",
              description: "Participated in Regional Physics Olympiad as a Judge"
            },
            {
              title: "Instructor of a workshop in SUST SWE 21 on AI",
              customContent: (
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Discuss about Informed Search Algorithms</li>
                  <li><a href="https://drive.google.com/file/d/14HzfYZ8lCIZOp-qvUICzmXNhPHdpn2M6/view"><u>Lecture Notes</u></a>, <a href="https://docs.google.com/presentation/d/1XBFE_F1418Tgt_gzCj6Uh9MV7wAja109BNQ5H4p0otc/edit?usp=sharing"><u>Slides</u></a></li>
                </ul>
              )
            },
          ]}
        />
      </Container>
      
      {/* Floating Scroll to Top Button */}
      <ScrollToTopButton />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};
