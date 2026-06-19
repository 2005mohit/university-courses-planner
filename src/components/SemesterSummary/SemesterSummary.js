import React from 'react';
import {
  Card, CardContent, Typography, Box, Chip, Grid,
  LinearProgress, Divider, useTheme, alpha, Stack,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getTotalCredits, getCreditStatus } from '../../utils/conflictDetector';

const StatCard = ({ icon, label, value, color, subtitle }) => {
  const theme = useTheme();
  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
      <CardContent sx={{ textAlign: 'center', py: 2 }}>
        <Box
          sx={{
            width: 48, height: 48, borderRadius: '50%',
            bgcolor: alpha(color, 0.1),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 1,
          }}
        >
          {React.cloneElement(icon, { sx: { color, fontSize: 24 } })}
        </Box>
        <Typography variant="h4" fontWeight={800} sx={{ color, lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.3 }}>
          {label}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const SemesterSummary = ({ courses, conflicts, selectedSemester }) => {
  const theme = useTheme();
  const totalCredits = getTotalCredits(courses);
  const creditStatus = getCreditStatus(totalCredits);
  const maxCredits = 21;

  const deptBreakdown = courses.reduce((acc, course) => {
    acc[course.department] = (acc[course.department] || 0) + 1;
    return acc;
  }, {});

  const totalWeeklyHours = courses.reduce((sum, c) => {
    return sum + c.schedule.reduce((s, slot) => {
      const startH = parseInt(slot.startTime.split(':')[0]);
      const endH = parseInt(slot.endTime.split(':')[0]);
      return s + (endH - startH);
    }, 0);
  }, 0);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <EmojiEventsIcon sx={{ color: theme.palette.secondary.main }} />
        <Typography variant="h6" fontWeight={700}>
          Semester Summary — {selectedSemester}
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<MenuBookIcon />}
            label="Courses"
            value={courses.length}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<SchoolIcon />}
            label="Total Credits"
            value={totalCredits}
            color={theme.palette.secondary.dark}
            subtitle={creditStatus.label}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<AccessTimeIcon />}
            label="Weekly Hours"
            value={totalWeeklyHours}
            color="#388e3c"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={conflicts.length > 0 ? <WarningAmberIcon /> : <CheckCircleIcon />}
            label="Conflicts"
            value={conflicts.length}
            color={conflicts.length > 0 ? '#d32f2f' : '#388e3c'}
            subtitle={conflicts.length === 0 ? 'All Clear!' : 'Fix Required'}
          />
        </Grid>
      </Grid>

      {/* Credit load bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="body2" fontWeight={600}>Credit Load</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {totalCredits} / {maxCredits} credits
            </Typography>
            <Chip
              label={creditStatus.label}
              size="small"
              color={creditStatus.color}
              sx={{ fontWeight: 700, fontSize: '0.7rem' }}
            />
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min((totalCredits / maxCredits) * 100, 100)}
          color={creditStatus.color}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.3 }}>
          <Typography variant="caption" color="text.secondary">0</Typography>
          <Typography variant="caption" color="text.secondary">12 (Full-time)</Typography>
          <Typography variant="caption" color="text.secondary">{maxCredits} (Max)</Typography>
        </Box>
      </Box>

      {/* Department breakdown */}
      {Object.keys(deptBreakdown).length > 0 && (
        <Box>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
            Courses by Department
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {Object.entries(deptBreakdown).map(([dept, count]) => (
              <Chip
                key={dept}
                label={`${dept} (${count})`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.72rem' }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SemesterSummary;
