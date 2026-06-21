// src/data/users.js
// ---------------------------------------------------------------------------
// MOCK DATA LAYER
// This file simulates what would normally live in a real database (e.g. a
// `users` table). When a real backend is added, the functions in
// `src/services/authService.js` that read this file get swapped for actual
// HTTP calls — nothing else in the app needs to change.
// ---------------------------------------------------------------------------

export const students = [
  {
    id: "688b5ecb1031dd0015fc8371",
    role: "student",
    cnic: "4120350238991",
    password: "student123", // mock only — never store plain text passwords in a real backend
    name: "Waqar Ali",
    email: "wa5134810@gmail.com",
    phone: "03472673721",
    address: "Not provided",
    gender: "Male",
    dob: "2006-09-15",
    lastQualification: "Not provided",
    avatar: null,
    batch: 1,
    roll: "382282",
    campus: "Saylani TITAN Sukkur Campus",
    city: "Sukkur",
    courseId: "wma-101",
  },
];

export const teachers = [
  {
    id: "t-001",
    role: "teacher",
    email: "trainer@saylanimit.com",
    password: "teacher123",
    name: "Sir Ahsan Raza",
    phone: "03001234567",
    designation: "Lead Instructor",
    avatar: null,
    courseIds: ["wma-101"],
  },
];

export const admins = [
  {
    id: "a-001",
    role: "admin",
    email: "admin@saylanimit.com",
    password: "admin123",
    name: "Admin",
    avatar: null,
  },
];
