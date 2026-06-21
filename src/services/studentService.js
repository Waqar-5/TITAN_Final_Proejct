// src/services/studentService.js
import { USE_MOCK, mockDelay, request } from "./apiClient";
import { students } from "../data/users";
import { courses } from "../data/courses";

/**
 * GET /students/:id
 */
export async function getStudentProfile(studentId) {
  if (USE_MOCK) {
    const student = students.find((s) => s.id === studentId);
    return mockDelay(student ? { ...student, password: undefined } : null);
  }
  return request(`/students/${studentId}`);
}

/**
 * PATCH /students/:id
 */
export async function updateStudentProfile(studentId, updates) {
  if (USE_MOCK) {
    const student = students.find((s) => s.id === studentId);
    if (student) Object.assign(student, updates);
    return mockDelay(student ? { ...student, password: undefined } : null);
  }
  return request(`/students/${studentId}`, { method: "PATCH", body: updates });
}

/**
 * GET /students/:id/courses
 */
export async function getStudentCourses(studentId) {
  if (USE_MOCK) {
    const student = students.find((s) => s.id === studentId);
    if (!student) return mockDelay([]);
    const enrolled = courses.filter((c) => c.id === student.courseId);
    return mockDelay(enrolled);
  }
  return request(`/students/${studentId}/courses`);
}

/**
 * GET /students/:id/courses/active
 * Returns the single "active" course shown on the dashboard.
 */
export async function getActiveCourse(studentId) {
  const all = await getStudentCourses(studentId);
  return all[0] || null;
}
