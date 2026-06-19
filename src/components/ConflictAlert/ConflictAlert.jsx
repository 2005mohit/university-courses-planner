import React, { useState } from 'react';
import {
  Alert, AlertTitle, Collapse, Box, Typography, IconButton, Chip, Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const ConflictAlert = ({ conflicts }) => {
  const [expanded, setExpanded] = useState(true);

  if (!conflicts || conflicts.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'warning.main',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 3,
        bgcolor: '#FFFDE7',
      }}
    >
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2.5,
          py: 1.5,
          cursor: 'pointer',
          bgcolor: '#FFF8E1',
          borderBottom: expanded ? '1px solid #FFE082' : 'none',
          '&:hover': { bgcolor: '#FFF3CD' },
          transition: 'background-color 0.15s',
        }}
      >
        <WarningAmberIcon color="warning" />
        <Typography variant="subtitle1" sx={{ color: '#E65100', fontWeight: 700, flex: 1 }}>
          Schedule Conflicts Detected
        </Typography>
        <Chip
          label={`${conflicts.length} conflict${conflicts.length > 1 ? 's' : ''}`}
          size="small"
          color="warning"
          sx={{ fontWeight: 700 }}
        />
        <IconButton size="small" sx={{ color: '#E65100' }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {conflicts.map((conflict, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: '#FFFFFF',
                border: '1px solid #FFE082',
              }}
            >
              <EventBusyIcon sx={{ color: '#F57F17', mt: 0.2, fontSize: 18 }} />
              <Box>
                <Typography variant="body2" sx={{ color: '#0D1642', fontWeight: 600, mb: 0.3 }}>
                  {conflict.day} — Time Overlap
                </Typography>
                <Typography variant="body2" sx={{ color: '#5C6494', fontSize: '0.82rem' }}>
                  {conflict.message}
                </Typography>
              </Box>
            </Box>
          ))}
          <Typography variant="caption" sx={{ color: '#F57F17', fontWeight: 600, mt: 0.5 }}>
            ⚠ Please resolve conflicts before finalizing your schedule.
          </Typography>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ConflictAlert;
