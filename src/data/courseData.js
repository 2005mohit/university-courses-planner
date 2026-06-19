export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

export const DEPARTMENTS = [
  'Computer Science', 'Mathematics', 'Physics', 'Chemistry',
  'Biology', 'Engineering', 'Economics', 'Business',
  'Psychology', 'Literature', 'History', 'Philosophy',
];

export const COURSE_COLORS = [
  '#1a3a6b', '#388e3c', '#7b1fa2', '#f57c00',
  '#c62828', '#00838f', '#6d4c41', '#37474f',
  '#ad1457', '#2e7d32', '#1565c0', '#e65100',
];

export const SEMESTERS = ['Fall 2024', 'Spring 2025', 'Summer 2025', 'Fall 2025'];

export const SAMPLE_COURSES = [
  {
    id: '1',
    code: 'CS301',
    name: 'Data Structures & Algorithms',
    department: 'Computer Science',
    credits: 4,
    instructor: 'Dr. Sarah Mitchell',
    room: 'CS-101',
    color: '#1a3a6b',
    schedule: [
      { day: 'Monday', startTime: '09:00', endTime: '10:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '10:00' },
      { day: 'Friday', startTime: '09:00', endTime: '10:00' },
    ],
  },
  {
    id: '2',
    code: 'MATH201',
    name: 'Linear Algebra',
    department: 'Mathematics',
    credits: 3,
    instructor: 'Prof. Alan Chen',
    room: 'MATH-205',
    color: '#388e3c',
    schedule: [
      { day: 'Tuesday', startTime: '11:00', endTime: '12:00' },
      { day: 'Thursday', startTime: '11:00', endTime: '12:00' },
    ],
  },
  {
    id: '3',
    code: 'PHY101',
    name: 'Classical Mechanics',
    department: 'Physics',
    credits: 3,
    instructor: 'Dr. Emily Watson',
    room: 'SCI-302',
    color: '#7b1fa2',
    schedule: [
      { day: 'Monday', startTime: '14:00', endTime: '15:00' },
      { day: 'Wednesday', startTime: '14:00', endTime: '15:00' },
    ],
  },
];
