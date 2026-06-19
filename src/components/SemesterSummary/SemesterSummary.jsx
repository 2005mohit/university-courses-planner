
import React from 'react';
import {
  Box, Paper, Typography, Grid, Divider, Chip, LinearProgress,
  List, ListItem, ListItemText, ListItemIcon,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getTotalCredits, getCreditsByDepartment, getCreditLoad, getCoursesByDay } from '../../utils/courseUtils';
import { DAYS } from '../../data/sampleCourses';

const StatCard = ({ icon, label, value, color = 'primary', sub }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 2.5,
      border: '1px solid #ECEEF5',
      display: 'flex',
      flexDirection: 'column',
      gap: 0.5,
      height: '100%',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: `${color}.main`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.9,
        }}
      >
        {React.cloneElement(icon, { sx: { color: '#FFFFFF', fontSize: 18 } })}
      </Box>
      <Typography variant="caption">{label}</Typography>
    </Box>
    <Typography variant="h4" sx={{ fontSize: '2rem', lineHeight: 1, color: '#0D1642' }}>
      {value}
    </Typography>
    {sub && (
      <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
        {sub}
      </Typography>
    )}
  </Paper>
);

const SemesterSummary = ({ courses, conflicts }) => {
  const totalCredits = getTotalCredits(courses);
  const creditsByDept = getCreditsByDepartment(courses);
  const coursesByDay = getCoursesByDay(courses);
  const creditLoad = getCreditLoad(totalCredits);
  const maxCredits = 18;

  const busiestDay = DAYS.reduce(
    (max, day) => {
      const count = (coursesByDay[day] || []).length;
      return count > max.count ? { day, count } : max;
    },
    { day: '', count: 0 }
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
        <EmojiEventsIcon sx={{ color: '#E65100' }} />
        <Typography variant="h4" sx={{ fontSize: '1.2rem' }}>
          Semester Summary
        </Typography>
        <Chip
          label="Fall 2025"
          size="small"
          sx={{ bgcolor: '#EEF0FA', color: '#1A237E', fontWeight: 700 }}
        />
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<MenuBookIcon />}
            label="Total Courses"
            value={courses.length}
            color="primary"
            sub="enrolled"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<CheckCircleOutlineIcon />}
            label="Total Credits"
            value={totalCredits}
            color="success"
            sub={creditLoad.label}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<WarningAmberIcon />}
            label="Conflicts"
            value={conflicts.length}
            color={conflicts.length > 0 ? 'warning' : 'success'}
            sub={conflicts.length === 0 ? 'No issues' : 'Need resolution'}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<CalendarTodayIcon />}
            label="Busiest Day"
            value={busiestDay.count > 0 ? busiestDay.day.slice(0, 3) : '—'}
            color="secondary"
            sub={busiestDay.count > 0 ? `${busiestDay.count} course${busiestDay.count > 1 ? 's' : ''}` : 'No classes'}
          />
        </Grid>
      </Grid>

      {/* Credit Load Progress */}
      <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #ECEEF5', borderRadius: 2.5, mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0D1642' }}>
            Credit Load
          </Typography>
          <Chip
            label={creditLoad.label}
            size="small"
            color={creditLoad.color}
            sx={{ fontWeight: 700 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={Math.min((totalCredits / maxCredits) * 100, 100)}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: '#ECEEF5',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  bgcolor:
                    totalCredits > 18 ? '#C62828' :
                    totalCredits >= 12 ? '#2E7D32' : '#F57F17',
                },
              }}
            />
          </Box>
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#0D1642', minWidth: 60 }}>
            {totalCredits} / {maxCredits}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, fontSize: '0.78rem' }}>
          Full-time students typically take 12–18 credits per semester.
          {totalCredits > 18 && ' ⚠ You are over the maximum recommended load.'}
        </Typography>
      </Paper>

      {/* Department Breakdown */}
      {Object.keys(creditsByDept).length > 0 && (
        <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #ECEEF5', borderRadius: 2.5, mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <BusinessIcon sx={{ fontSize: 18, color: '#5C6494' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0D1642' }}>
              Credits by Department
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
            {Object.entries(creditsByDept).map(([dept, credits]) => (
              <Box key={dept}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: '#0D1642' }}>
                    {dept}
                  </Typography>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A237E' }}>
                    {credits} cr
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(credits / totalCredits) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#ECEEF5',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      bgcolor: '#3949AB',
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* Schedule by Day */}
      <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #ECEEF5', borderRadius: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <CalendarTodayIcon sx={{ fontSize: 18, color: '#5C6494' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0D1642' }}>
            Weekly Overview
          </Typography>
        </Box>
        <Grid container spacing={1}>
          {DAYS.map((day) => {
            const dayCourses = coursesByDay[day] || [];
            return (
              <Grid item xs={12} sm={6} key={day}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: dayCourses.length > 0 ? '#F3F4F8' : '#FAFAFA',
                    border: '1px solid #ECEEF5',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#0D1642' }}>
                      {day}
                    </Typography>
                    <Chip
                      label={dayCourses.length === 0 ? 'Free' : `${dayCourses.length} class${dayCourses.length > 1 ? 'es' : ''}`}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        bgcolor: dayCourses.length === 0 ? '#E8F5E9' : '#EEF0FA',
                        color: dayCourses.length === 0 ? '#2E7D32' : '#1A237E',
                      }}
                    />
                  </Box>
                  {dayCourses.map((c) => (
                    <Box
                      key={c.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        mb: 0.4,
                      }}
                    >
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: c.color, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#0D1642', lineHeight: 1.3 }}>
                        {c.code} · {c.startTime}–{c.endTime}
                      </Typography>
                    </Box>
                  ))}
                  {dayCourses.length === 0 && (
                    <Typography sx={{ fontSize: '0.75rem', color: '#5C6494' }}>No classes scheduled</Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
};

export default SemesterSummary;
