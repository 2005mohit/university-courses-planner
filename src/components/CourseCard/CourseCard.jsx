import React, { useState } from 'react';
import {
  Card, CardContent, Box, Typography, Chip, IconButton,
  Menu, MenuItem, Divider, LinearProgress, Tooltip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { formatTime } from '../../utils/courseUtils';

const CourseCard = ({ course, hasConflict, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleMenuClose();
    onEdit(course);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(course.id);
  };

  const enrollmentPct = course.maxEnrollment
    ? Math.round((course.enrolled / course.maxEnrollment) * 100)
    : 0;

  return (
    <Card
      sx={{
        borderRadius: 2.5,
        overflow: 'hidden',
        border: hasConflict ? '1.5px solid #F57F17' : '1px solid #ECEEF5',
        position: 'relative',
      }}
    >
      {/* Color stripe */}
      <Box sx={{ height: 5, bgcolor: course.color }} />

      <CardContent sx={{ pt: 1.5, pb: '12px !important', px: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap', mb: 0.3 }}>
              <Chip
                label={course.code}
                size="small"
                sx={{
                  bgcolor: course.color,
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  height: 22,
                }}
              />
              <Chip
                label={course.type}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.68rem', height: 20, borderColor: '#DDE0EC', color: '#5C6494' }}
              />
              {hasConflict && (
                <Tooltip title="Schedule conflict!">
                  <WarningAmberIcon sx={{ fontSize: 16, color: '#F57F17' }} />
                </Tooltip>
              )}
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#0D1642',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {course.name}
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleMenuOpen} sx={{ color: '#5C6494', mt: -0.5 }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6, mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <PersonIcon sx={{ fontSize: 14, color: '#5C6494' }} />
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{course.instructor}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <AccessTimeIcon sx={{ fontSize: 14, color: '#5C6494' }} />
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              {course.day} · {formatTime(course.startTime)} – {formatTime(course.endTime)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <LocationOnIcon sx={{ fontSize: 14, color: '#5C6494' }} />
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{course.room}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <SchoolIcon sx={{ fontSize: 14, color: '#5C6494' }} />
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{course.department}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 1.2 }} />

        {/* Footer */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Chip
            label={`${course.credits} Credit${course.credits !== 1 ? 's' : ''}`}
            size="small"
            sx={{
              bgcolor: '#EEF0FA',
              color: '#1A237E',
              fontWeight: 700,
              fontSize: '0.72rem',
              height: 22,
            }}
          />
          {course.maxEnrollment > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
              <LinearProgress
                variant="determinate"
                value={enrollmentPct}
                sx={{
                  flex: 1,
                  height: 5,
                  borderRadius: 3,
                  bgcolor: '#ECEEF5',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    bgcolor: enrollmentPct >= 90 ? '#C62828' : enrollmentPct >= 70 ? '#F57F17' : '#2E7D32',
                  },
                }}
              />
              <Typography sx={{ fontSize: '0.7rem', color: '#5C6494', whiteSpace: 'nowrap' }}>
                {course.enrolled}/{course.maxEnrollment}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 140, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' } }}
      >
        <MenuItem onClick={handleEdit} sx={{ gap: 1.2, fontSize: '0.87rem' }}>
          <EditIcon fontSize="small" color="primary" /> Edit
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ gap: 1.2, fontSize: '0.87rem', color: 'error.main' }}>
          <DeleteIcon fontSize="small" /> Remove
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default CourseCard;
