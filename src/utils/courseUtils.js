/**
 * Detect scheduling conflicts between courses.
 * Two courses conflict if they are on the same day and their time ranges overlap.
 */
export const detectConflicts = (courses) => {
  const conflicts = [];

  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      const a = courses[i];
      const b = courses[j];

      if (a.day === b.day) {
        const aStart = timeToMinutes(a.startTime);
        const aEnd = timeToMinutes(a.endTime);
        const bStart = timeToMinutes(b.startTime);
        const bEnd = timeToMinutes(b.endTime);

        if (aStart < bEnd && aEnd > bStart) {
          conflicts.push({
            courseA: a,
            courseB: b,
            day: a.day,
            message: `"${a.code} ${a.name}" and "${b.code} ${b.name}" overlap on ${a.day} (${a.startTime}–${a.endTime} vs ${b.startTime}–${b.endTime})`,
          });
        }
      }
    }
  }

  return conflicts;
};

export const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

export const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const getTotalCredits = (courses) =>
  courses.reduce((sum, c) => sum + Number(c.credits), 0);

export const getCreditsByDepartment = (courses) => {
  const map = {};
  courses.forEach((c) => {
    map[c.department] = (map[c.department] || 0) + Number(c.credits);
  });
  return map;
};

export const getCoursesByDay = (courses) => {
  const map = {};
  courses.forEach((c) => {
    if (!map[c.day]) map[c.day] = [];
    map[c.day].push(c);
  });
  return map;
};

export const validateCourse = (course) => {
  const errors = {};

  if (!course.code?.trim()) errors.code = 'Course code is required';
  if (!course.name?.trim()) errors.name = 'Course name is required';
  if (!course.instructor?.trim()) errors.instructor = 'Instructor name is required';
  if (!course.department) errors.department = 'Department is required';
  if (!course.type) errors.type = 'Course type is required';
  if (!course.day) errors.day = 'Day is required';
  if (!course.startTime) errors.startTime = 'Start time is required';
  if (!course.endTime) errors.endTime = 'End time is required';
  if (!course.room?.trim()) errors.room = 'Room is required';

  const credits = Number(course.credits);
  if (!credits || credits < 1 || credits > 6) {
    errors.credits = 'Credits must be between 1 and 6';
  }

  if (course.startTime && course.endTime) {
    if (timeToMinutes(course.startTime) >= timeToMinutes(course.endTime)) {
      errors.endTime = 'End time must be after start time';
    }
  }

  return errors;
};

export const formatTime = (time) => {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
};

export const getCreditLoad = (totalCredits) => {
  if (totalCredits < 12) return { label: 'Part-Time', color: 'warning' };
  if (totalCredits <= 18) return { label: 'Full-Time', color: 'success' };
  return { label: 'Overloaded', color: 'error' };
};
