import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, Chip, Select,
  MenuItem, FormControl, useTheme, IconButton, Tooltip,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { SEMESTERS } from '../../data/courseData';

const Navbar = ({ selectedSemester, setSelectedSemester, conflictCount, totalCredits }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        borderBottom: `3px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Toolbar sx={{ gap: 2, flexWrap: 'wrap', py: 1 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: '0 0 auto' }}>
          <SchoolIcon sx={{ fontSize: 32, color: theme.palette.secondary.main }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1, color: '#fff' }}>
              UniPlanner
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1 }}>
              Course Scheduler
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Semester selector */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            startAdornment={<CalendarMonthIcon sx={{ mr: 0.5, fontSize: 18, color: 'rgba(255,255,255,0.7)' }} />}
            sx={{
              color: '#fff',
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.6)' },
              '.MuiSvgIcon-root': { color: '#fff' },
              fontSize: '0.85rem',
            }}
          >
            {SEMESTERS.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Credits badge */}
        <Chip
          label={`${totalCredits} Credits`}
          sx={{
            bgcolor: theme.palette.secondary.main,
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.8rem',
          }}
        />

        {/* Conflict badge */}
        {conflictCount > 0 && (
          <Tooltip title={`${conflictCount} schedule conflict(s) detected`}>
            <Chip
              icon={<WarningAmberIcon sx={{ fontSize: '16px !important' }} />}
              label={`${conflictCount} Conflict${conflictCount > 1 ? 's' : ''}`}
              sx={{ bgcolor: '#d32f2f', color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}
            />
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
