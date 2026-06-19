import React from 'react';
import {
  Box, Typography, Paper, Tooltip, useTheme, alpha,
} from '@mui/material';
import { DAYS, TIME_SLOTS } from '../../data/courseData';

const CELL_HEIGHT = 60;
const TIME_COL_WIDTH = 70;

const Timetable = ({ courses, conflicts, onCourseClick }) => {
  const theme = useTheme();

  const conflictIds = new Set(
    conflicts.flatMap((c) => [c.courseA.id, c.courseB.id])
  );

  const getCourseAtSlot = (day, time) => {
    const results = [];
    for (const course of courses) {
      for (const slot of course.schedule) {
        if (slot.day === day && slot.startTime === time) {
          results.push({ course, slot });
        }
      }
    }
    return results;
  };

  return (
    <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: 700 }}>
          {/* Header row */}
          <Box sx={{ display: 'flex', bgcolor: theme.palette.primary.main }}>
            <Box sx={{ width: TIME_COL_WIDTH, flexShrink: 0, p: 1 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                TIME
              </Typography>
            </Box>
            {DAYS.map((day) => (
              <Box
                key={day}
                sx={{
                  flex: 1, p: 1, textAlign: 'center',
                  borderLeft: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>
                  {day.slice(0, 3).toUpperCase()}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Time slots */}
          {TIME_SLOTS.map((time, timeIdx) => (
            <Box
              key={time}
              sx={{
                display: 'flex',
                borderTop: `1px solid ${theme.palette.divider}`,
                bgcolor: timeIdx % 2 === 0 ? '#fff' : alpha(theme.palette.primary.main, 0.02),
                minHeight: CELL_HEIGHT,
              }}
            >
              <Box
                sx={{
                  width: TIME_COL_WIDTH, flexShrink: 0,
                  p: 1, display: 'flex', alignItems: 'flex-start',
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  borderRight: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                  {time}
                </Typography>
              </Box>

              {DAYS.map((day) => {
                const entries = getCourseAtSlot(day, time);
                return (
                  <Box
                    key={day}
                    sx={{
                      flex: 1, p: 0.5,
                      borderLeft: `1px solid ${theme.palette.divider}`,
                      display: 'flex', flexDirection: 'column', gap: 0.3,
                    }}
                  >
                    {entries.map(({ course, slot }) => {
                      const hasConflict = conflictIds.has(course.id);
                      const startH = parseInt(slot.startTime.split(':')[0]);
                      const endH = parseInt(slot.endTime.split(':')[0]);
                      const duration = Math.max(endH - startH, 1);

                      return (
                        <Tooltip
                          key={course.id}
                          title={
                            <Box>
                              <Typography variant="body2" fontWeight={700}>{course.code}: {course.name}</Typography>
                              <Typography variant="caption">{course.instructor}</Typography>
                              <br />
                              <Typography variant="caption">Room: {course.room}</Typography>
                              <br />
                              <Typography variant="caption">{slot.startTime} – {slot.endTime}</Typography>
                              {hasConflict && (
                                <Typography variant="caption" display="block" sx={{ color: '#ffb3b3', fontWeight: 700 }}>
                                  Schedule Conflict!
                                </Typography>
                              )}
                            </Box>
                          }
                          arrow
                        >
                          <Box
                            onClick={() => onCourseClick && onCourseClick(course)}
                            sx={{
                              bgcolor: course.color,
                              border: hasConflict ? '2px solid #ff1744' : 'none',
                              borderRadius: 1.5,
                              p: '4px 6px',
                              cursor: 'pointer',
                              minHeight: CELL_HEIGHT * duration - 8,
                              overflow: 'hidden',
                              transition: 'all 0.2s',
                              '&:hover': { opacity: 0.85, transform: 'scale(1.02)' },
                            }}
                          >
                            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, display: 'block', lineHeight: 1.2 }}>
                              {course.code}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block', fontSize: '0.6rem', lineHeight: 1.2 }}>
                              {course.room}
                            </Typography>
                          </Box>
                        </Tooltip>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default Timetable;
