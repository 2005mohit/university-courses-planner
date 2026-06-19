import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Grid, Box, Typography,
  Divider, IconButton, InputAdornment, Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import {
  DAYS, TIME_SLOTS, DEPARTMENTS, COURSE_TYPES, COURSE_COLORS,
} from '../../data/sampleCourses';
import { validateCourse } from '../../utils/courseUtils';

const emptyForm = {
  code: '',
  name: '',
  instructor: '',
  credits: 3,
  department: '',
  type: 'Lecture',
  day: '',
  startTime: '',
  endTime: '',
  room: '',
  color: COURSE_COLORS[0],
  maxEnrollment: 40,
  enrolled: 0,
  description: '',
};

const CourseForm = ({ open, onClose, onSave, editCourse }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (editCourse) {
      setForm({ ...emptyForm, ...editCourse });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
    setTouched({});
  }, [editCourse, open]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validateCourse({ ...form });
    setErrors(validationErrors);
  };

  const handleSubmit = () => {
    const allTouched = Object.keys(emptyForm).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const validationErrors = validateCourse(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSave(form);
      onClose();
    }
  };

  const fieldError = (field) => touched[field] && errors[field];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ pb: 1, pt: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40, height: 40, borderRadius: 2,
              background: 'linear-gradient(135deg, #1A237E, #3949AB)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <SchoolIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ color: '#0D1642' }}>
              {editCourse ? 'Edit Course' : 'Add New Course'}
            </Typography>
            <Typography variant="body2">
              {editCourse ? `Editing ${editCourse.code}` : 'Fill in course details below'}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16, color: '#5C6494' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Grid container spacing={2.5}>
          {/* Course Code */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Course Code *"
              value={form.code}
              onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
              onBlur={() => handleBlur('code')}
              error={Boolean(fieldError('code'))}
              helperText={fieldError('code')}
              fullWidth
              placeholder="e.g. CS301"
              inputProps={{ maxLength: 10 }}
            />
          </Grid>

          {/* Course Name */}
          <Grid item xs={12} sm={8}>
            <TextField
              label="Course Name *"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              error={Boolean(fieldError('name'))}
              helperText={fieldError('name')}
              fullWidth
              placeholder="e.g. Data Structures & Algorithms"
            />
          </Grid>

          {/* Instructor */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Instructor *"
              value={form.instructor}
              onChange={(e) => handleChange('instructor', e.target.value)}
              onBlur={() => handleBlur('instructor')}
              error={Boolean(fieldError('instructor'))}
              helperText={fieldError('instructor')}
              fullWidth
              placeholder="e.g. Dr. Emily Chen"
            />
          </Grid>

          {/* Credits */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Credits *"
              type="number"
              value={form.credits}
              onChange={(e) => handleChange('credits', e.target.value)}
              onBlur={() => handleBlur('credits')}
              error={Boolean(fieldError('credits'))}
              helperText={fieldError('credits') || '1–6'}
              fullWidth
              inputProps={{ min: 1, max: 6 }}
            />
          </Grid>

          {/* Course Type */}
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Type *"
              value={form.type}
              onChange={(e) => handleChange('type', e.target.value)}
              fullWidth
            >
              {COURSE_TYPES.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Department */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Department *"
              value={form.department}
              onChange={(e) => handleChange('department', e.target.value)}
              onBlur={() => handleBlur('department')}
              error={Boolean(fieldError('department'))}
              helperText={fieldError('department')}
              fullWidth
            >
              {DEPARTMENTS.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Room */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Room / Location *"
              value={form.room}
              onChange={(e) => handleChange('room', e.target.value)}
              onBlur={() => handleBlur('room')}
              error={Boolean(fieldError('room'))}
              helperText={fieldError('room')}
              fullWidth
              placeholder="e.g. Tech Hall 201"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 0.5 }}>
              <Typography variant="caption">Schedule</Typography>
            </Divider>
          </Grid>

          {/* Day */}
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Day *"
              value={form.day}
              onChange={(e) => handleChange('day', e.target.value)}
              onBlur={() => handleBlur('day')}
              error={Boolean(fieldError('day'))}
              helperText={fieldError('day')}
              fullWidth
            >
              {DAYS.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Start Time */}
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Start Time *"
              value={form.startTime}
              onChange={(e) => handleChange('startTime', e.target.value)}
              onBlur={() => handleBlur('startTime')}
              error={Boolean(fieldError('startTime'))}
              helperText={fieldError('startTime')}
              fullWidth
            >
              {TIME_SLOTS.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* End Time */}
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="End Time *"
              value={form.endTime}
              onChange={(e) => handleChange('endTime', e.target.value)}
              onBlur={() => handleBlur('endTime')}
              error={Boolean(fieldError('endTime'))}
              helperText={fieldError('endTime')}
              fullWidth
            >
              {TIME_SLOTS.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 0.5 }}>
              <Typography variant="caption">Color Label</Typography>
            </Divider>
          </Grid>

          {/* Color Picker */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {COURSE_COLORS.map((color) => (
                <Box
                  key={color}
                  onClick={() => handleChange('color', color)}
                  sx={{
                    width: 32, height: 32, borderRadius: '50%', bgcolor: color,
                    cursor: 'pointer',
                    border: form.color === color ? '3px solid #0D1642' : '3px solid transparent',
                    outline: form.color === color ? `2px solid ${color}` : 'none',
                    outlineOffset: 2,
                    transition: 'transform 0.15s',
                    '&:hover': { transform: 'scale(1.2)' },
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description (optional)"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              fullWidth
              multiline
              rows={2}
              placeholder="Brief description of course content..."
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} sx={{ borderColor: '#DDE0EC', color: '#5C6494' }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editCourse ? 'Save Changes' : 'Add Course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseForm;
