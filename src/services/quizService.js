// src/services/quizService.js
import { USE_MOCK, mockDelay, request } from "./apiClient";
import { quizzesByStudent } from "../data/quizzes";

/**
 * GET /students/:id/quizzes
 */
export async function getStudentQuizzes(studentId) {
  if (USE_MOCK) {
    return mockDelay(quizzesByStudent[studentId] || []);
  }
  return request(`/students/${studentId}/quizzes`);
}
