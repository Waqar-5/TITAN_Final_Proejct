// src/context/AuthContext.jsx
import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./authContextObject";
import {
  getSession,
  loginStudent as loginStudentApi,
  loginTeacher as loginTeacherApi,
  loginAdmin as loginAdminApi,
  logout as logoutApi,
} from "../services/authService";

export function AuthProvider({ children }) {
  const initialSession = getSession();
  const [user, setUser] = useState(initialSession?.user ?? null);
  const [role, setRole] = useState(initialSession?.user?.role ?? null);

  // Keep state in sync if the session changes outside this provider (e.g. another
  // browser tab logs out). Initial value is read synchronously above, so there's
  // no loading flash on first render.
  useEffect(() => {
    function handleStorage() {
      const current = getSession();
      setUser(current?.user ?? null);
      setRole(current?.user?.role ?? null);
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const loginStudent = useCallback(async (credentials) => {
    const { user } = await loginStudentApi(credentials);
    setUser(user);
    setRole("student");
    return user;
  }, []);

  const loginTeacher = useCallback(async (credentials) => {
    const { user } = await loginTeacherApi(credentials);
    setUser(user);
    setRole("teacher");
    return user;
  }, []);

  const loginAdmin = useCallback(async (credentials) => {
    const { user } = await loginAdminApi(credentials);
    setUser(user);
    setRole("admin");
    return user;
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
    setRole(null);
  }, []);

  const updateLocalUser = useCallback((patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: Boolean(user),
        isLoading: false,
        loginStudent,
        loginTeacher,
        loginAdmin,
        logout,
        updateLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
