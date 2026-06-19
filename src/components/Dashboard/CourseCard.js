import React from 'react';
import {
  Card, CardContent, Box, Typography, Chip, IconButton,
  Tooltip, Stack, Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

const CourseCard = ({ course, hasConflict, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        borderTop: `4px solid ${course.color}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
        outline: hasConflict ? '2px solid #d32f2f' : 'none',
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Chip
              label={course.code}
              size="small"
              sx={{ bgcolor: course.color, color: '#fff', fontWeight: 700, mb: 0.5, fontSize: '0.7rem' }}
            />
            {hasConflict && (
              <Chip label="Conflict" size="small" color="error" sx={{ ml: 0.5, mb: 0.5, fontSize: '0.65rem' }} />
            )}
          </Box>
          <Box>
            <Tooltip title="Edit course">
              <IconButton size="small" onClick={() => onEdit(course)} sx={{ color: 'text.secondary' }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove course">
              <IconButton size="small" onClick={() => onDelete(course.id)} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5, lineHeight: 1.3 }}>
          {course.name}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          {course.department}
        </Typography>

        <Divider sx={{ mb: 1.5 }} />

        <Stack spacing={0.8}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{course.instructor}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <RoomIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{course.room}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <StarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{course.credits} Credits</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, flexWrap: 'wrap' }}>
            <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
              {course.schedule.map((slot, i) => (
                <Chip
                  key={i}
                  label={`${slot.day.slice(0, 3)} ${slot.startTime}`}
                  size="small"
                  sx={{ fontSize: '0.6rem', height: 18 }}
                />
              ))}
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
