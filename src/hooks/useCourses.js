import { useState, useCallback } from 'react';
import { SAMPLE_COURSES } from '../data/courseData';
import { detectConflicts } from '../utils/conflictDetector';
import { v4 as uuidv4 } from 'uuid';

const useCourses = () => {
  const [courses, setCourses] = useState(SAMPLE_COURSES);
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');

  const conflicts = detectConflicts(courses);

  const addCourse = useCallback((courseData) => {
    const newCourse = { ...courseData, id: uuidv4() };
    setCourses((prev) => [...prev, newCourse]);
    return newCourse;
  }, []);

  const updateCourse = useCallback((id, courseData) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...courseData } : c))
    );
  }, []);

  const removeCourse = useCallback((id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCourseById = useCallback(
    (id) => courses.find((c) => c.id === id),
    [courses]
  );

  return {
    courses,
    conflicts,
    selectedSemester,
    setSelectedSemester,
    addCourse,
    updateCourse,
    removeCourse,
    getCourseById,
  };
};

export default useCourses;
