import React from 'react';
import {
  Box, Typography, Paper, Tooltip, Chip,
} from '@mui/material';
import { DAYS, TIME_SLOTS } from '../../data/sampleCourses';
import { timeToMinutes, formatTime } from '../../utils/courseUtils';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

const CELL_HEIGHT = 64; // px per hour
const HEADER_HEIGHT = 48;
const TIME_COL_WIDTH = 72;

const TimetableGrid = ({ courses, conflicts, onCourseClick }) => {
  // Map conflict course IDs for highlighting
  const conflictIds = new Set(
    conflicts.flatMap((c) => [c.courseA.id, c.courseB.id])
  );

  const getCourseBlock = (course) => {
    const startMin = timeToMinutes(course.startTime);
    const endMin = timeToMinutes(course.endTime);
    const topBase = timeToMinutes(TIME_SLOTS[0]);
    const top = ((startMin - topBase) / 60) * CELL_HEIGHT;
    const height = ((endMin - startMin) / 60) * CELL_HEIGHT;
    return { top, height };
  };

  const hasConflict = (course) => conflictIds.has(course.id);

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #ECEEF5',
        borderRadius: 2.5,
        overflow: 'auto',
        bgcolor: '#FFFFFF',
      }}
    >
      {/* Header row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `${TIME_COL_WIDTH}px repeat(${DAYS.length}, 1fr)`,
          borderBottom: '2px solid #ECEEF5',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: '#F8F9FC',
        }}
      >
        <Box sx={{ height: HEADER_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="caption" sx={{ color: '#5C6494' }}>TIME</Typography>
        </Box>
        {DAYS.map((day) => (
          <Box
            key={day}
            sx={{
              height: HEADER_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: '1px solid #ECEEF5',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: '#0D1642', fontWeight: 700, fontSize: '0.88rem' }}
            >
              {day.slice(0, 3).toUpperCase()}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Grid body */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `${TIME_COL_WIDTH}px repeat(${DAYS.length}, 1fr)`,
          position: 'relative',
        }}
      >
        {/* Time labels column */}
        <Box sx={{ position: 'relative' }}>
          {TIME_SLOTS.map((time, i) => (
            <Box
              key={time}
              sx={{
                height: CELL_HEIGHT,
                borderTop: i === 0 ? 'none' : '1px solid #ECEEF5',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                pt: 0.5,
              }}
            >
              <Typography variant="caption" sx={{ color: '#5C6494', fontSize: '0.72rem' }}>
                {formatTime(time)}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Day columns */}
        {DAYS.map((day) => {
          const dayCourses = courses.filter((c) => c.day === day);

          return (
            <Box
              key={day}
              sx={{
                position: 'relative',
                borderLeft: '1px solid #ECEEF5',
                minHeight: TIME_SLOTS.length * CELL_HEIGHT,
              }}
            >
              {/* Hour grid lines */}
              {TIME_SLOTS.map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    top: i * CELL_HEIGHT,
                    left: 0,
                    right: 0,
                    height: 1,
                    bgcolor: i === 0 ? 'transparent' : '#F0F1F8',
                  }}
                />
              ))}

              {/* Half-hour lines (subtle) */}
              {TIME_SLOTS.map((_, i) => (
                <Box
                  key={`half-${i}`}
                  sx={{
                    position: 'absolute',
                    top: i * CELL_HEIGHT + CELL_HEIGHT / 2,
                    left: 0,
                    right: 0,
                    height: 1,
                    bgcolor: '#F8F9FC',
                  }}
                />
              ))}

              {/* Course blocks */}
              {dayCourses.map((course) => {
                const { top, height } = getCourseBlock(course);
                const isConflict = hasConflict(course);

                return (
                  <Tooltip
                    key={course.id}
                    title={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {course.code} — {course.name}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block' }}>
                          {course.instructor}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block' }}>
                          {course.room} | {course.credits} credits
                        </Typography>
                        {isConflict && (
                          <Typography variant="caption" sx={{ color: '#FFB74D', fontWeight: 700 }}>
                            ⚠ Schedule conflict!
                          </Typography>
                        )}
                      </Box>
                    }
                    arrow
                  >
                    <Box
                      onClick={() => onCourseClick(course)}
                      sx={{
                        position: 'absolute',
                        top: top + 2,
                        left: 4,
                        right: 4,
                        height: Math.max(height - 4, 24),
                        bgcolor: course.color,
                        borderRadius: 1.5,
                        p: 0.8,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        border: isConflict ? '2px solid #F57F17' : '1px solid rgba(255,255,255,0.25)',
                        boxShadow: isConflict
                          ? '0 0 0 2px #FFF3CD, 0 2px 8px rgba(0,0,0,0.2)'
                          : '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                          zIndex: 5,
                        },
                        zIndex: isConflict ? 2 : 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          lineHeight: 1.2,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {course.code}
                      </Typography>
                      {height > 40 && (
                        <Typography
                          sx={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: '0.65rem',
                            lineHeight: 1.2,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {course.name}
                        </Typography>
                      )}
                      {height > 56 && (
                        <Typography
                          sx={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.6rem',
                            mt: 0.3,
                          }}
                        >
                          {course.startTime}–{course.endTime}
                        </Typography>
                      )}
                      {isConflict && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#FFB74D',
                            animation: 'pulse 1.5s infinite',
                          }}
                        />
                      )}
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Paper>
  );
};

export default TimetableGrid;
