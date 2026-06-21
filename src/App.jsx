// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentLayout from "./components/layout/StudentLayout";
import { FullPageSpinner } from "./components/ui/Spinner";

import StudentLoginPage from "./pages/auth/StudentLoginPage";
import TeacherLoginPage from "./pages/auth/TeacherLoginPage";
import DashboardPage from "./pages/student/DashboardPage";
import ProgressPage from "./pages/student/ProgressPage";
import AttendancePage from "./pages/student/AttendancePage";
import PaymentPage from "./pages/student/PaymentPage";
import AssignmentPage from "./pages/student/AssignmentPage";
import QuizPage from "./pages/student/QuizPage";
import ProfilePage from "./pages/student/ProfilePage";
import ComingSoonPage from "./pages/ComingSoonPage";

function RootRedirect() {
  const { isAuthenticated, role, isLoading } = useAuth();
  if (isLoading) return <FullPageSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role === "student") return <Navigate to="/student/dashboard" replace />;
  if (role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/login" element={<StudentLoginPage />} />
      <Route path="/teacher/login" element={<TeacherLoginPage />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="assignment" element={<AssignmentPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <ComingSoonPage portalName="Teacher Portal" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ComingSoonPage portalName="Admin Portal" />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
