import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, Chip, IconButton, Tooltip,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Navbar = ({ conflictCount, onAddCourse, view, onViewChange }) => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ gap: 2, minHeight: 68 }}>
        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mr: 2 }}>
          <SchoolIcon sx={{ fontSize: 30, color: '#90CAF9' }} />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1.25rem',
                lineHeight: 1.1,
                color: '#FFFFFF',
              }}
            >
              UniPlanner
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: '#90CAF9', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Course Scheduler
            </Typography>
          </Box>
        </Box>

        {/* Semester Badge */}
        <Chip
          label="Fall 2025"
          size="small"
          sx={{
            bgcolor: 'rgba(255,255,255,0.12)',
            color: '#E3F2FD',
            fontWeight: 600,
            fontSize: '0.72rem',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />

        <Box sx={{ flex: 1 }} />

        {/* View Toggle */}
        <Box sx={{ display: 'flex', bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, p: 0.4 }}>
          <Tooltip title="Timetable view">
            <IconButton
              size="small"
              onClick={() => onViewChange('timetable')}
              sx={{
                color: view === 'timetable' ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                bgcolor: view === 'timetable' ? 'rgba(255,255,255,0.18)' : 'transparent',
                borderRadius: 1.5,
                px: 1.5,
                transition: 'all 0.2s',
              }}
            >
              <CalendarMonthIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="List view">
            <IconButton
              size="small"
              onClick={() => onViewChange('list')}
              sx={{
                color: view === 'list' ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                bgcolor: view === 'list' ? 'rgba(255,255,255,0.18)' : 'transparent',
                borderRadius: 1.5,
                px: 1.5,
                transition: 'all 0.2s',
              }}
            >
              <FormatListBulletedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Conflict Indicator */}
        {conflictCount > 0 && (
          <Tooltip title={`${conflictCount} schedule conflict${conflictCount > 1 ? 's' : ''} detected`}>
            <Chip
              icon={<WarningAmberIcon />}
              label={`${conflictCount} Conflict${conflictCount > 1 ? 's' : ''}`}
              size="small"
              color="warning"
              sx={{ fontWeight: 700, cursor: 'pointer' }}
            />
          </Tooltip>
        )}

        {/* Add Course Button */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={onAddCourse}
          sx={{ ml: 1, whiteSpace: 'nowrap' }}
        >
          Add Course
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
