import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, Select, MenuItem, FormControl,
  InputLabel, Typography, Box, IconButton, Divider,
  Chip, FormHelperText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import BookIcon from '@mui/icons-material/Book';
import { DEPARTMENTS, DAYS, TIME_SLOTS, COURSE_COLORS } from '../../data/courseData';

const defaultScheduleSlot = { day: 'Monday', startTime: '09:00', endTime: '10:00' };

const defaultForm = {
  code: '',
  name: '',
  department: '',
  credits: 3,
  instructor: '',
  room: '',
  color: COURSE_COLORS[0],
  schedule: [{ ...defaultScheduleSlot }],
};

const CourseForm = ({ open, onClose, onSave, editCourse }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editCourse) {
      setForm({ ...editCourse });
    } else {
      setForm({ ...defaultForm, schedule: [{ ...defaultScheduleSlot }] });
    }
    setErrors({});
  }, [editCourse, open]);

  const validate = () => {
    const e = {};
    if (!form.code.trim()) e.code = 'Course code is required';
    if (!form.name.trim()) e.name = 'Course name is required';
    if (!form.department) e.department = 'Department is required';
    if (!form.credits || form.credits < 1 || form.credits > 6) e.credits = 'Credits must be 1-6';
    if (!form.instructor.trim()) e.instructor = 'Instructor is required';
    if (!form.room.trim()) e.room = 'Room is required';
    if (form.schedule.length === 0) e.schedule = 'At least one time slot is required';
    form.schedule.forEach((slot, i) => {
      if (slot.startTime >= slot.endTime) {
        e[`slot_${i}`] = 'End time must be after start time';
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleScheduleChange = (index, field, value) => {
    setForm((prev) => {
      const schedule = [...prev.schedule];
      schedule[index] = { ...schedule[index], [field]: value };
      return { ...prev, schedule };
    });
    setErrors((prev) => ({ ...prev, [`slot_${index}`]: undefined }));
  };

  const addSlot = () => {
    setForm((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { ...defaultScheduleSlot }],
    }));
  };

  const removeSlot = (index) => {
    setForm((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BookIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              {editCourse ? 'Edit Course' : 'Add New Course'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          {/* Course Code */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth label="Course Code *" value={form.code}
              onChange={handleChange('code')}
              error={!!errors.code} helperText={errors.code}
              placeholder="e.g. CS301"
            />
          </Grid>

          {/* Course Name */}
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth label="Course Name *" value={form.name}
              onChange={handleChange('name')}
              error={!!errors.name} helperText={errors.name}
              placeholder="e.g. Data Structures & Algorithms"
            />
          </Grid>

          {/* Department */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.department}>
              <InputLabel>Department *</InputLabel>
              <Select value={form.department} label="Department *" onChange={handleChange('department')}>
                {DEPARTMENTS.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </Select>
              {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Credits */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth label="Credits *" type="number"
              value={form.credits} onChange={handleChange('credits')}
              error={!!errors.credits} helperText={errors.credits}
              inputProps={{ min: 1, max: 6 }}
            />
          </Grid>

          {/* Color */}
          <Grid item xs={12} sm={3}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Color Label
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {COURSE_COLORS.map((color) => (
                <Box
                  key={color}
                  onClick={() => setForm((prev) => ({ ...prev, color }))}
                  sx={{
                    width: 24, height: 24, borderRadius: '50%',
                    bgcolor: color, cursor: 'pointer',
                    border: form.color === color ? '3px solid #1a3a6b' : '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Instructor */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Instructor *" value={form.instructor}
              onChange={handleChange('instructor')}
              error={!!errors.instructor} helperText={errors.instructor}
              placeholder="e.g. Dr. Sarah Mitchell"
            />
          </Grid>

          {/* Room */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Room / Location *" value={form.room}
              onChange={handleChange('room')}
              error={!!errors.room} helperText={errors.room}
              placeholder="e.g. CS-101"
            />
          </Grid>

          {/* Schedule */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>Schedule</Typography>
              <Button size="small" startIcon={<AddIcon />} onClick={addSlot} variant="outlined">
                Add Time Slot
              </Button>
            </Box>

            {errors.schedule && (
              <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1 }}>
                {errors.schedule}
              </Typography>
            )}

            {form.schedule.map((slot, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex', gap: 1, alignItems: 'center',
                  mb: 1.5, p: 1.5,
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  border: errors[`slot_${index}`] ? '1px solid #d32f2f' : '1px solid #e0e0e0',
                }}
              >
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Day</InputLabel>
                  <Select
                    value={slot.day} label="Day"
                    onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                  >
                    {DAYS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 110 }}>
                  <InputLabel>Start</InputLabel>
                  <Select
                    value={slot.startTime} label="Start"
                    onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                  >
                    {TIME_SLOTS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                  </Select>
                </FormControl>

                <Typography color="text.secondary">→</Typography>

                <FormControl size="small" sx={{ minWidth: 110 }}>
                  <InputLabel>End</InputLabel>
                  <Select
                    value={slot.endTime} label="End"
                    onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                  >
                    {TIME_SLOTS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                  </Select>
                </FormControl>

                {errors[`slot_${index}`] && (
                  <Typography variant="caption" color="error">{errors[`slot_${index}`]}</Typography>
                )}

                <Box sx={{ flex: 1 }} />

                <IconButton
                  size="small" color="error"
                  onClick={() => removeSlot(index)}
                  disabled={form.schedule.length === 1}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editCourse ? 'Update Course' : 'Add Course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseForm;
