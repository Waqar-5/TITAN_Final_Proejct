// src/services/assignmentService.js
import { USE_MOCK, mockDelay, request } from "./apiClient";
import { assignmentsByStudent } from "../data/assignments";

/**
 * GET /students/:id/assignments
 */
export async function getStudentAssignments(studentId) {
  if (USE_MOCK) {
    return mockDelay(assignmentsByStudent[studentId] || []);
  }
  return request(`/students/${studentId}/assignments`);
}

/**
 * POST /students/:id/assignments/:assignmentId/submit
 * `file` would be a File object in a real implementation (multipart upload).
 */
export async function submitAssignment(studentId, assignmentId, _file) {
  if (USE_MOCK) {
    const list = assignmentsByStudent[studentId] || [];
    const found = list.find((a) => a.id === assignmentId);
    if (found) found.status = "APPROVED";
    return mockDelay({ success: true });
  }
  const formData = new FormData();
  formData.append("file", _file);
  return request(`/students/${studentId}/assignments/${assignmentId}/submit`, {
    method: "POST",
    body: formData,
  });
}
