// src/services/progressService.js
import { USE_MOCK, mockDelay, request } from "./apiClient";
import { progressByStudent } from "../data/progress";

/**
 * GET /students/:id/progress
 */
export async function getStudentProgress(studentId) {
  if (USE_MOCK) {
    return mockDelay(
      progressByStudent[studentId] || {
        totalTopics: 0,
        totalCompleted: 0,
        notCompleted: 0,
        modules: [],
      }
    );
  }
  return request(`/students/${studentId}/progress`);
}
