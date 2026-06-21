// src/pages/auth/StudentLoginPage.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SmitLogo from "../../components/ui/SmitLogo";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAuth } from "../../context/useAuth";
import { createStudentPassword } from "../../services/authService";

export default function StudentLoginPage() {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();
  const { loginStudent } = useAuth();

  const [loginForm, setLoginForm] = useState({ cnic: "", password: "" });
  const [createForm, setCreateForm] = useState({ cnic: "", dob: "", password: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/student/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await loginStudent(loginForm);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);
    try {
      await createStudentPassword(createForm);
      setSuccessMsg("Password created successfully. You can now log in.");
      setTab("login");
      setLoginForm({ cnic: createForm.cnic, password: "" });
    } catch (err) {
      setError(err.message || "Could not create password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-brand-50/60 to-white">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <SmitLogo className="h-16" />
          <h1 className="mt-3 text-xl font-bold text-ink-900">Student Portal</h1>
        </div>

        <div className="flex bg-ink-100 rounded-lg p-1 mb-5">
          <button
            onClick={() => {
              setTab("login");
              setError("");
            }}
            className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-colors ${
              tab === "login" ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setTab("create");
              setError("");
            }}
            className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-colors ${
              tab === "create" ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
            }`}
          >
            Create Password
          </button>
        </div>

        <Card className="p-6">
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-ink-900">Login</h2>
                <p className="text-sm text-ink-500 mt-1">
                  Kindly provide the CNIC number and password used during SMIT course
                  registration.
                </p>
              </div>

              {successMsg && (
                <p className="text-sm text-leaf-700 bg-leaf-50 border border-leaf-200 rounded-lg px-3 py-2">
                  {successMsg}
                </p>
              )}
              {error && (
                <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <TextField
                label="CNIC"
                required
                placeholder="42101XXXXXXXX"
                value={loginForm.cnic}
                onChange={(e) => setLoginForm({ ...loginForm, cnic: e.target.value })}
              />
              <TextField
                label="Password"
                type="password"
                required
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                LOGIN
              </Button>

              <p className="text-xs text-ink-400 text-center">
                Demo CNIC: 4120350238991 · Password: student123
              </p>
            </form>
          ) : (
            <form onSubmit={handleCreatePassword} className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-ink-900">Create a Password</h2>
                <p className="text-sm text-ink-500 mt-1">
                  Kindly provide the CNIC number and DOB used during SMIT course
                  registration.
                </p>
              </div>

              {error && (
                <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <TextField
                label="CNIC"
                required
                placeholder="42101XXXXXXXX"
                value={createForm.cnic}
                onChange={(e) => setCreateForm({ ...createForm, cnic: e.target.value })}
              />
              <TextField
                label="DOB"
                type="date"
                required
                value={createForm.dob}
                onChange={(e) => setCreateForm({ ...createForm, dob: e.target.value })}
              />
              <TextField
                label="Password"
                type="password"
                required
                placeholder="Choose a password"
                value={createForm.password}
                onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
              />

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                SUBMIT
              </Button>

              <p className="text-xs text-ink-400 text-center">
                Demo CNIC: 4120350238991 · DOB: 2006-09-15
              </p>
            </form>
          )}
        </Card>

        <Link
          to="/teacher/login"
          className="block text-center mt-4 py-3 rounded-xl border border-ink-200 bg-white text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
        >
          Login as teacher
        </Link>
      </div>
    </div>
  );
}
