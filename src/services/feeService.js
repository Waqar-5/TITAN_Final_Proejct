// src/services/feeService.js
import { USE_MOCK, mockDelay, request } from "./apiClient";
import { feesByStudent } from "../data/fees";

/**
 * GET /students/:id/fees
 */
export async function getStudentFees(studentId) {
  if (USE_MOCK) {
    return mockDelay(feesByStudent[studentId] || []);
  }
  return request(`/students/${studentId}/fees`);
}
