export const detectConflicts = (courses) => {
  const conflicts = [];

  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      const courseA = courses[i];
      const courseB = courses[j];

      for (const slotA of courseA.schedule) {
        for (const slotB of courseB.schedule) {
          if (slotA.day === slotB.day && hasTimeOverlap(slotA, slotB)) {
            conflicts.push({
              id: `${courseA.id}-${courseB.id}-${slotA.day}`,
              day: slotA.day,
              courseA: { id: courseA.id, code: courseA.code, name: courseA.name },
              courseB: { id: courseB.id, code: courseB.code, name: courseB.name },
              time: `${slotA.startTime} - ${slotA.endTime}`,
            });
          }
        }
      }
    }
  }

  return conflicts;
};

const hasTimeOverlap = (slotA, slotB) => {
  const toMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const startA = toMinutes(slotA.startTime);
  const endA = toMinutes(slotA.endTime);
  const startB = toMinutes(slotB.startTime);
  const endB = toMinutes(slotB.endTime);
  return startA < endB && endA > startB;
};

export const getTotalCredits = (courses) =>
  courses.reduce((sum, c) => sum + c.credits, 0);

export const getCreditStatus = (credits) => {
  if (credits < 12) return { label: 'Part-time', color: 'warning' };
  if (credits <= 18) return { label: 'Full-time', color: 'success' };
  return { label: 'Overloaded', color: 'error' };
};
