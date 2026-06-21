// src/services/authService.js
import { USE_MOCK, mockDelay, mockReject, request, ApiError } from "./apiClient";
import { students, teachers, admins } from "../data/users";

const TOKEN_KEY = "smit_auth_token";
const USER_KEY = "smit_auth_user";

function stripPassword(user) {
  // eslint-disable-next-line no-unused-vars
  const { password, ...safe } = user;
  return safe;
}

/**
 * Logs in a student using CNIC + password.
 * Real backend equivalent: POST /auth/student/login { cnic, password }
 */
export async function loginStudent({ cnic, password }) {
  if (USE_MOCK) {
    const found = students.find((s) => s.cnic === cnic);
    if (!found || found.password !== password) {
      return mockReject("Invalid CNIC or password");
    }
    const user = stripPassword(found);
    const token = `mock-token-${found.id}`;
    persistSession(token, user);
    return mockDelay({ token, user });
  }

  const data = await request("/auth/student/login", {
    method: "POST",
    body: { cnic, password },
  });
  persistSession(data.token, data.user);
  return data;
}

/**
 * Logs in a teacher using email + password.
 * Real backend equivalent: POST /auth/teacher/login { email, password }
 */
export async function loginTeacher({ email, password }) {
  if (USE_MOCK) {
    const found = teachers.find((t) => t.email === email);
    if (!found || found.password !== password) {
      return mockReject("Invalid email or password");
    }
    const user = stripPassword(found);
    const token = `mock-token-${found.id}`;
    persistSession(token, user);
    return mockDelay({ token, user });
  }

  const data = await request("/auth/teacher/login", {
    method: "POST",
    body: { email, password },
  });
  persistSession(data.token, data.user);
  return data;
}

/**
 * Logs in an admin using email + password.
 * Real backend equivalent: POST /auth/admin/login { email, password }
 */
export async function loginAdmin({ email, password }) {
  if (USE_MOCK) {
    const found = admins.find((a) => a.email === email);
    if (!found || found.password !== password) {
      return mockReject("Invalid email or password");
    }
    const user = stripPassword(found);
    const token = `mock-token-${found.id}`;
    persistSession(token, user);
    return mockDelay({ token, user });
  }

  const data = await request("/auth/admin/login", {
    method: "POST",
    body: { email, password },
  });
  persistSession(data.token, data.user);
  return data;
}

/**
 * Creates a password for first-time student portal access.
 * Real backend equivalent: POST /auth/student/create-password { cnic, dob, password }
 */
export async function createStudentPassword({ cnic, dob, password }) {
  if (USE_MOCK) {
    const found = students.find((s) => s.cnic === cnic);
    if (!found) {
      return mockReject("No student record found with this CNIC");
    }
    if (found.dob !== dob) {
      return mockReject("Date of birth does not match our records");
    }
    found.password = password; // mutate mock store, in-memory only
    return mockDelay({ success: true });
  }

  return request("/auth/student/create-password", {
    method: "POST",
    body: { cnic, dob, password },
  });
}

export function persistSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getSession() {
  const token = localStorage.getItem(TOKEN_KEY);
  const userRaw = localStorage.getItem(USER_KEY);
  if (!token || !userRaw) return null;
  try {
    return { token, user: JSON.parse(userRaw) };
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function logout() {
  clearSession();
  return true;
}

export { ApiError };
