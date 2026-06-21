// src/hooks/useBreadcrumb.js
import { useLocation } from "react-router-dom";

const labelMap = {
  "/student/dashboard": [],
  "/student/progress": ["Modern Web Application Development", "Progress"],
  "/student/attendance": ["Modern Web Application Development", "Attendance"],
  "/student/payment": ["Modern Web Application Development", "Fee"],
  "/student/assignment": ["Modern Web Application Development", "Assignment"],
  "/student/quiz": ["Modern Web Application Development", "Quiz"],
  "/student/profile": ["Profile"],
};

export default function useBreadcrumb() {
  const { pathname } = useLocation();
  if (pathname === "/student/dashboard") return ["Modern Web Application Development"];
  return labelMap[pathname] || [];
}
