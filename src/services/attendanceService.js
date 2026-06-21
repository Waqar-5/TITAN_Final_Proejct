// src/services/attendanceService.js
import { USE_MOCK, mockDelay, request } from "./apiClient";
import { attendanceByStudent } from "../data/attendance";

/**
 * GET /students/:id/attendance?month=YYYY-MM
 */
export async function getStudentAttendance(studentId, _month) {
  if (USE_MOCK) {
    return mockDelay(
      attendanceByStudent[studentId] || {
        totalClasses: 0,
        present: 0,
        leave: 0,
        absent: 0,
        records: [],
      }
    );
  }
  const query = _month ? `?month=${_month}` : "";
  return request(`/students/${studentId}/attendance${query}`);
}
