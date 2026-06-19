import React, { useState } from 'react';
import {
  Box, Container, Grid, Typography, Button, TextField,
  InputAdornment, MenuItem, Chip, Paper, Divider, Fab,
  Tooltip, Drawer, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';

import Navbar from '../components/Navbar/Navbar.jsx';
import TimetableGrid from '../components/TimetableGrid/TimetableGrid.jsx';
import CourseCard from '../components/CourseCard/CourseCard.jsx';
import CourseForm from '../components/CourseForm/CourseForm.jsx';
import ConflictAlert from '../components/ConflictAlert/ConflictAlert.jsx';
import SemesterSummary from '../components/SemesterSummary/SemesterSummary.jsx';
import useCourses from '../hooks/useCourses';
import { DEPARTMENTS, DAYS } from '../data/sampleCourses';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { courses, conflicts, addCourse, updateCourse, removeCourse, clearAll } = useCourses();

  const [view, setView] = useState('timetable');
  const [formOpen, setFormOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterDay, setFilterDay] = useState('');

  const handleAddCourse = () => {
    setEditCourse(null);
    setFormOpen(true);
  };

  const handleEditCourse = (course) => {
    setEditCourse(course);
    setFormOpen(true);
  };

  const handleSaveCourse = (courseData) => {
    if (editCourse) {
      updateCourse(editCourse.id, courseData);
    } else {
      addCourse(courseData);
    }
  };

  const handleCourseClick = (course) => {
    handleEditCourse(course);
  };

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || c.department === filterDept;
    const matchDay = !filterDay || c.day === filterDay;
    return matchSearch && matchDept && matchDay;
  });

  const hasFilters = search || filterDept || filterDay;
  const clearFilters = () => {
    setSearch('');
    setFilterDept('');
    setFilterDay('');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar
        conflictCount={conflicts.length}
        onAddCourse={handleAddCourse}
        view={view}
        onViewChange={setView}
      />

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Page header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            <Typography variant="h2" sx={{ fontSize: '1.6rem', color: '#0D1642', mb: 0.3 }}>
              My Schedule
            </Typography>
            <Typography variant="body2">
              {courses.length} course{courses.length !== 1 ? 's' : ''} · Fall 2025
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<AnalyticsIcon />}
            onClick={() => setSummaryOpen(true)}
            sx={{ borderColor: '#DDE0EC', color: '#1A237E', fontWeight: 600 }}
          >
            Semester Summary
          </Button>
        </Box>

        {/* Conflict Alerts */}
        <ConflictAlert conflicts={conflicts} />

        {/* Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            border: '1px solid #ECEEF5',
            borderRadius: 2,
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            placeholder="Search courses, instructors…"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#5C6494', fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 220, flex: 1 }}
          />
          <TextField
            select
            size="small"
            label="Department"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All Departments</MenuItem>
            {DEPARTMENTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </TextField>
          <TextField
            select
            size="small"
            label="Day"
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">All Days</MenuItem>
            {DAYS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </TextField>
          {hasFilters && (
            <Chip
              label="Clear filters"
              onDelete={clearFilters}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          )}
          {hasFilters && filteredCourses.length !== courses.length && (
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              Showing {filteredCourses.length} of {courses.length}
            </Typography>
          )}
        </Paper>

        {/* Main Content */}
        {view === 'timetable' ? (
          <TimetableGrid
            courses={filteredCourses}
            conflicts={conflicts}
            onCourseClick={handleCourseClick}
          />
        ) : (
          <Box>
            {filteredCourses.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  border: '1px dashed #DDE0EC',
                  borderRadius: 3,
                  p: 6,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ color: '#5C6494', mb: 1 }}>
                  No courses found
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  {hasFilters
                    ? 'Try adjusting your filters to see more results.'
                    : 'Click "Add Course" to start building your schedule.'}
                </Typography>
                {!hasFilters && (
                  <Button variant="contained" onClick={handleAddCourse} startIcon={<AddIcon />}>
                    Add Your First Course
                  </Button>
                )}
              </Paper>
            ) : (
              <Grid container spacing={2.5}>
                {filteredCourses.map((course) => {
                  const hasConflict = conflicts.some(
                    (c) => c.courseA.id === course.id || c.courseB.id === course.id
                  );
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                      <CourseCard
                        course={course}
                        hasConflict={hasConflict}
                        onEdit={handleEditCourse}
                        onDelete={removeCourse}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        )}
      </Container>

      {/* FAB for mobile */}
      {isMobile && (
        <Fab
          color="secondary"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={handleAddCourse}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Course Form Dialog */}
      <CourseForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveCourse}
        editCourse={editCourse}
      />

      {/* Semester Summary Drawer */}
      <Drawer
        anchor="right"
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 480 },
            p: 3,
            bgcolor: '#F8F9FC',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Tooltip title="Close">
            <Button
              size="small"
              onClick={() => setSummaryOpen(false)}
              startIcon={<CloseIcon />}
              sx={{ color: '#5C6494' }}
            >
              Close
            </Button>
          </Tooltip>
        </Box>
        <SemesterSummary courses={courses} conflicts={conflicts} />
      </Drawer>
    </Box>
  );
};

export default Dashboard;
