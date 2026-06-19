import React, { useState } from 'react';
import {
  Alert, AlertTitle, Collapse, Box, Typography,
  Chip, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ConflictAlert = ({ conflicts }) => {
  const [expanded, setExpanded] = useState(true);

  if (!conflicts || conflicts.length === 0) return null;

  return (
    <Alert
      severity="error"
      variant="filled"
      sx={{ mb: 2, borderRadius: 2 }}
      icon={<WarningAmberIcon />}
      action={
        <IconButton
          size="small"
          color="inherit"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      }
    >
      <AlertTitle sx={{ fontWeight: 700 }}>
        Schedule Conflicts Detected ({conflicts.length})
      </AlertTitle>
      <Collapse in={expanded}>
        <List dense disablePadding>
          {conflicts.map((conflict, idx) => (
            <React.Fragment key={conflict.id}>
              {idx > 0 && <Divider sx={{ my: 0.5, borderColor: 'rgba(255,255,255,0.2)' }} />}
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={conflict.courseA.code}
                        size="small"
                        sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }}
                      />
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        conflicts with
                      </Typography>
                      <Chip
                        label={conflict.courseB.code}
                        size="small"
                        sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {conflict.day}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {conflict.time}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </Alert>
  );
};

export default ConflictAlert;
