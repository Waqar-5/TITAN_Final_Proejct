# TiTAN LMS — Student Portal

A React + Vite + Tailwind clone of the SMIT (Saylani Mass IT Training) student
portal at `lms.saylanimit.com`, built so a real backend can be dropped in
later without touching any UI code.

## Running it

```bash
npm install
npm run dev
```

Open the printed local URL. Demo login (CNIC + password):

- **CNIC:** `4120350238991`
- **Password:** `student123`

Demo teacher login (email + password) — currently lands on a "coming soon"
placeholder until the teacher portal screens are built:

- **Email:** `trainer@saylanimit.com`
- **Password:** `teacher123`

## Project structure

```
src/
  components/
    layout/      Sidebar, topbar, mobile nav, page shells
    ui/           Reusable primitives (Button, Card, Badge, TextField, ...)
  context/        AuthContext — global session + role state
  data/           MOCK DATABASE — stand-in for real tables until a backend exists
  hooks/          useApi (data fetching), useBreadcrumb
  pages/
    auth/         Student + teacher login screens
    student/      All 7 student portal pages
    teacher/      Empty — waiting for your screenshots
    admin/        Empty — waiting for your screenshots
  routes/         ProtectedRoute (role-based route guards)
  services/       THE LAYER THAT TALKS TO "THE BACKEND"
```

## How the mock-to-real-backend switch works

Every page calls a function from `src/services/*Service.js`
(`getStudentAttendance(studentId)`, `loginStudent(credentials)`, etc).
Right now those functions read from `src/data/*.js` (the mock database) and
add a small artificial delay so loading spinners behave like a real network
call.

When your backend is ready:

1. Open `src/services/apiClient.js`
2. Set `USE_MOCK = false`
3. Set `VITE_API_URL` in a `.env` file (copy `.env.example`) to your API's
   base URL
4. Make sure your backend exposes matching endpoints — each service file has
   a comment above every function showing the expected REST shape, e.g.:

   ```js
   // GET /students/:id/attendance?month=YYYY-MM
   export async function getStudentAttendance(studentId, month) { ... }
   ```

No component or page needs to change. They only ever import from
`src/services/`, never from `src/data/` directly.

## Auth

`src/context/AuthContext.jsx` holds the logged-in user and role
(`student` / `teacher` / `admin`) and exposes `loginStudent`, `loginTeacher`,
`loginAdmin`, and `logout`. The session is persisted to `localStorage` via
`src/services/authService.js` (token + user object) so refreshing the page
keeps you logged in. Swap the token storage for httpOnly cookies if your real
backend prefers that — only `authService.js` needs to change.

## Still to build

- Teacher portal screens (send screenshots and they'll be wired the same way)
- Admin portal screens
- Real backend + database

## Tech stack

- React 19 + Vite
- React Router v7
- Tailwind CSS v3
- lucide-react icons
