import React from 'react';
import { Card, CardContent, Box, Typography, Divider, Stack, Chip } from '@mui/material';

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SkillsSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  skillCategories: SkillCategory[];
  gridColumns?: {
    xs: string;
    sm: string;
    md: string;
  };
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  id,
  title,
  icon,
  skillCategories,
  gridColumns = { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }
}) => {
  return (
    <Card id={id} sx={{ mb: 4, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {icon}
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: gridColumns, 
          gap: 2 
        }}>
          {skillCategories.map((categoryData, index) => (
            <Box key={index}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                {categoryData.category}
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {categoryData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{ 
                      mt: 0.5, 
                      mr: 0.5,
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'white'
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
