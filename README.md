# Elevvo Front-End Web Development Internship — Completed Tasks

This repository contains production-ready, senior-level implementations for the official Elevvo Front-End Web Development Internship syllabus. Every project is built in strict adherence to senior engineering standards: semantic HTML5, modern CSS custom properties, responsive mobile-first layouts, WCAG 2.1 AA accessibility, strict TypeScript without `any`, and comprehensive unit tests.

---

## 📁 Repository Overview

```text
Elevvo Internship Tasks/
├── task1-sidebar/                # Level 1: Collapsible & Responsive Sidebar (HTML, CSS, JS)
├── task2-contact-form/           # Level 1: Responsive Contact Form with Live Validation (HTML, CSS, JS)
├── task3-taskflow/               # Level 2: TaskFlow One-Page Product Website (HTML, CSS, JS)
├── task4-blog/                   # Level 2: Tech & Travel Journal with Live Search & Pagination (HTML, CSS, JS)
├── task5-landing-page/           # Level 2: AuraMetrics SaaS Landing Page with Theme Engine (HTML, CSS, JS)
├── task6-dashboard/              # Level 3: Apex Freelance Multi-Page SPA Dashboard (HTML, CSS, Chart.js, JS)
├── task7-weather/                # Level 3: Real-Time Weather & 3-Day Forecast Dashboard (Open-Meteo API, GPS, JS)
├── task8-kanban/                 # Industry-Level: Type-Safe Kanban Job Tracker (React 18, TypeScript, LocalStorage)
├── task10-component-library/     # Industry-Level: Enterprise UI Component Library & Docs (React 18, TS, Vitest)
└── README.md                     # Comprehensive Submission Documentation
```

---

## 🚀 Tasks Breakdown & Deliverables

### [Task 1: Collapsible Sidebar](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task1-sidebar/index.html) (Level 1)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task1-sidebar/index.html), [style.css](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task1-sidebar/style.css), [script.js](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task1-sidebar/script.js)
- **Core Requirements:**
  - Sidebar with top logo placeholder (`NexusFlow PRO` branding)
  - Navigation links with SVG icons (Dashboard, Analytics, Projects, Team, Settings)
  - Toggle button with smooth width and transform animations
- **Bonus & Senior Enhancements:**
  - Fully responsive mobile off-canvas drawer with backdrop blur dismiss (`<= 768px`)
  - State persistence across reloads via `localStorage`
  - Keyboard shortcut navigation (`Ctrl + B` / `Cmd + B` to toggle)
  - Collapsed rail mode with floating tooltip labels

### [Task 2: Responsive Contact Form](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task2-contact-form/index.html) (Level 1)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task2-contact-form/index.html), [style.css](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task2-contact-form/style.css), [script.js](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task2-contact-form/script.js)
- **Core Requirements:**
  - Fields: Full Name, Email Address, Subject, Message, and Submit button
  - Clean responsive 2-column layout (Contact details sidebar + Form)
- **Bonus & Senior Enhancements:**
  - Comprehensive client-side validation on blur & submit
  - Strict RFC-compliant email regex verification
  - Dynamic character count counter for message (`0 / 500`)
  - Asynchronous submission simulation with animated button spinner
  - Visual status alert banners with accessible ARIA live regions

### [Task 3: TaskFlow Product Website](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task3-taskflow/index.html) (Level 2)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task3-taskflow/index.html), [style.css](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task3-taskflow/style.css), [script.js](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task3-taskflow/script.js)
- **Core Requirements:**
  - Top Hero section with app name, tagline, and call-to-action button
  - 3 Core features with icons (Smart Automation, Real-Time Sync, Velocity Analytics)
  - 3 User reviews/quotes with verified customer citations
  - 3 Pricing plans (Free, Pro, Team) with feature checklist
  - Footer with contact details and social media icons
- **Bonus & Senior Enhancements:**
  - Intersection Observer API scroll reveal animations (`.reveal.active`)
  - Interactive Monthly vs. Annual pricing billing toggle with 20% discount recalculation
  - Interactive in-app board preview mockup inside the hero section

### [Task 4: Tech & Travel Journal](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task4-blog/index.html) (Level 2)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task4-blog/index.html), [style.css](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task4-blog/style.css), [script.js](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task4-blog/script.js)
- **Core Requirements:**
  - Responsive multi-post blog grid with featured hero article
  - Categorized articles across Tech, Travel, and Culinary guides
  - Category filter tabs with active states
- **Bonus & Senior Enhancements:**
  - Real-time client-side keyword search filtering titles and content
  - Interactive pagination engine (configurable 6 posts per page)
  - Reading time estimates and author avatar chips

### [Task 5: Tech Product Landing Page](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task5-landing-page/index.html) (Level 2)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task5-landing-page/index.html), [style.css](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task5-landing-page/style.css), [script.js](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task5-landing-page/script.js)
- **Core Requirements:**
  - Marketing landing page for SaaS tool: **AuraMetrics** (Cloud Observability)
  - Sections: Hero, Telemetry Strip, Features Grid (6 cards), Testimonials, Pricing Tiers, Call-to-Action (CTA), Footer
  - Responsive on mobile, tablet, and desktop
- **Bonus & Senior Enhancements:**
  - Built-in Theme Engine: Dark Mode & Light Mode toggle with `localStorage` persistence and automatic OS `prefers-color-scheme` synchronization
  - Sub-millisecond latency telemetry counter and conversion CTA section

### [Task 6: Multi-Page Client Dashboard](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task6-dashboard/index.html) (Level 3)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task6-dashboard/index.html), [style.css](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task6-dashboard/style.css), [script.js](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task6-dashboard/script.js)
- **Core Requirements:**
  - **Overview Page:** Summary metric KPI cards, monthly revenue bar chart, task status doughnut chart, recent client activity list
  - **Projects Page:** Filterable client project table with budget, status tags, deadlines, and progress bars
  - **Profile Settings Page:** View/edit profile details, rate, timezone, bio, and password fields with save toast
  - Persistent sidebar and header across all views
  - Client-side SPA routing without page reloads (hash router)
  - Visualizations using Chart.js
- **Bonus & Senior Enhancements:**
  - Interactive Notification Dropdown in header with 3 recent mock activities, unread counter badge, and "Mark all as read"
  - Real-time project search input and status dropdown filter

### [Task 7: Real-Time Weather Dashboard](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task7-weather/index.html) (Level 3)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task7-weather/index.html), [style.css](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task7-weather/style.css), [script.js](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task7-weather/script.js)
- **Core Requirements:**
  - Real-time weather dashboard fetching live atmospheric data (Open-Meteo API, zero API key required)
  - Details: Temperature, weather condition description, weather icons, humidity, wind speed, UV index, air pressure
  - 3-Day extended forecast cards with daily high/low temperatures and precipitation probability
  - Global city search with instant geocoding resolution
  - Clean and minimal UI with loading spinner and error handling
- **Bonus & Senior Enhancements:**
  - User's current location support via HTML5 Geolocation API (`navigator.geolocation`) with one-click auto-fetch
  - Temperature unit toggle between Celsius (°C) and Fahrenheit (°F)
  - Quick-select chips for popular world hubs (London, New York, Tokyo, Paris, Dubai, Sydney)

### [Task 8: Kanban Job Tracker](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/) (Industry-Level)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/index.html), [src/types.ts](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/src/types.ts), [src/hooks/useJobsWithStorage.ts](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/src/hooks/useJobsWithStorage.ts), [src/components/KanbanBoard.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/src/components/KanbanBoard.tsx), [src/components/KanbanColumn.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/src/components/KanbanColumn.tsx), [src/components/JobCard.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/src/components/JobCard.tsx), [src/components/AddJobModal.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/src/components/AddJobModal.tsx), [src/components/SkeletonLoader.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/src/components/SkeletonLoader.tsx), [src/App.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/src/App.tsx)
- **Core Requirements:**
  - Drag-and-drop Kanban board with 4 columns: `Applied`, `Interviewing`, `Offer`, `Rejected`
  - "Add Job" modal with input validation
  - Card deletion and search/filter by keyword
  - **Strict Type Safety:** Pure TypeScript with defined interfaces (`Job`, `Column`, `Status`, `EmploymentType`), zero `any`
- **Bonus & Senior Enhancements:**
  - `useJobsWithStorage` custom hook that simulates a 1-second network latency to display an animated Skeleton Loader (`.shimmer`)
  - LocalStorage persistence with seed dataset reset capability
  - Portable relative production build (`dist/`)

### [Task 10: Component Library & Design System](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task10-component-library/) (Industry-Level)
- **Files:** [index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task10-component-library/index.html), [Button.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task10-component-library/src/components/Button/Button.tsx), [Input.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task10-component-library/src/components/Input/Input.tsx), [Modal.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task10-component-library/src/components/Modal/Modal.tsx), [Card.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task10-component-library/src/components/Card/Card.tsx), [App.tsx](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task10-component-library/src/App.tsx)
- **Core Requirements:**
  - Reusable React + TypeScript Component Library (`Button`, `Input`, `Modal`, `Card`)
  - Complete documentation and interactive playground showcase (Storybook-style)
  - **Unit Testing:** 18 unit tests written with Vitest and `@testing-library/react` proving all button clicks, input events, dialog Escape keydown handlers, and compound card compositions
- **Bonus & Senior Enhancements:**
  - Vite compilation pipeline simulating private NPM package build (`dist/`) with portable relative assets
  - Dedicated Accessibility (a11y) audit compliance with WCAG 2.1 AA keyboard navigation, focus management, ARIA live regions, and `aria-busy` states

---

## 🛠️ How to Run & Verify

### Standalone HTML/CSS/JS Tasks (Tasks 1, 2, 3, 4, 5, 6, 7)
Simply double-click or open any `index.html` in your browser:
- `task1-sidebar/index.html`
- `task2-contact-form/index.html`
- `task3-taskflow/index.html`
- `task4-blog/index.html`
- `task5-landing-page/index.html`
- `task6-dashboard/index.html`
- `task7-weather/index.html`

### React + TypeScript Applications (Tasks 8 & 10)

#### Running Task 8 (Kanban Job Tracker):
```powershell
cd task8-kanban
npm run dev
# Or preview the production build:
npm run build
npm run preview
```
*Alternatively, open [task8-kanban/dist/index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task8-kanban/dist/index.html) directly in any modern browser!*

#### Running Task 10 (Component Library & Tests):
```powershell
cd task10-component-library
# Run the 18 Vitest unit tests (all passing):
npm test

# Run the interactive Storybook showcase:
npm run dev

# Build the library bundle:
npm run build
```
*Alternatively, open [task10-component-library/dist/index.html](file:///c:/Users/bilal/Elevvo%20Internship%20Tasks/task10-component-library/dist/index.html) directly in any modern browser!*
