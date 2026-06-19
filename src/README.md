# UniPlanner — University Course Planner

A professional academic dashboard built with **React** and **Material UI (MUI)** for planning university semester schedules.

## Features

- ✅ **Add / Edit / Remove Courses** — Full CRUD with validated form
- 📅 **Timetable Grid** — Visual weekly calendar showing all courses with color-coded blocks
- ⚠️ **Conflict Detection** — Automatically detects and highlights overlapping courses
- 📊 **Semester Summary** — Credit calculations, load indicator, department breakdown, weekly overview
- 🔍 **Search & Filter** — Filter courses by name, instructor, department, or day
- 🎨 **Color Labels** — Assign custom colors to courses for easy identification
- 📱 **Responsive** — Works on desktop, tablet, and mobile

## Tech Stack

- React 18
- Material UI (MUI) v5
- MUI Icons
- UUID for unique IDs
- Google Fonts (Inter + Playfair Display)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
university-course-planner/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar/          # Top navigation bar
│   │   ├── CourseForm/      # Add/Edit course dialog
│   │   ├── TimetableGrid/   # Weekly calendar grid
│   │   ├── CourseCard/      # Course card for list view
│   │   ├── ConflictAlert/   # Conflict warning banner
│   │   └── SemesterSummary/ # Stats + summary drawer
│   ├── data/
│   │   └── sampleCourses.js # Sample data and constants
│   ├── hooks/
│   │   └── useCourses.js    # Course state management
│   ├── pages/
│   │   └── Dashboard.jsx    # Main page
│   ├── theme/
│   │   └── theme.js         # MUI theme customization
│   ├── utils/
│   │   └── courseUtils.js   # Conflict detection, validation, helpers
│   ├── App.js
│   └── index.js
└── package.json
```

## Skills Demonstrated

- **Data Validation** — Comprehensive form validation with per-field errors
- **Complex Layouts** — Timetable grid with absolute positioning, sidebar drawer, responsive grid
- **Derived State** — Conflicts computed from course list, credit totals, department breakdowns
- **Filtering** — Multi-criteria course filtering with active filter chips
