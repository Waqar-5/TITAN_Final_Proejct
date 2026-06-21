// src/pages/auth/TeacherLoginPage.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SmitLogo from "../../components/ui/SmitLogo";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAuth } from "../../context/useAuth";

export default function TeacherLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginTeacher } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/teacher/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await loginTeacher(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-leaf-50/60 to-white">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <SmitLogo className="h-16" />
          <h1 className="mt-3 text-xl font-bold text-ink-900">Trainer Portal</h1>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink-900">Login</h2>
              <p className="text-sm text-ink-500 mt-1">
                Kindly provide your email and password to access the trainer portal.
              </p>
            </div>

            {error && (
              <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <TextField
              label="Email"
              type="email"
              required
              placeholder="you@saylanimit.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              LOGIN
            </Button>

            <Link
              to="/teacher/forgot-password"
              className="block text-center text-sm font-medium text-brand-700 hover:underline"
            >
              Forgot Password?
            </Link>

            <p className="text-xs text-ink-400 text-center">
              Demo email: trainer@saylanimit.com · Password: teacher123
            </p>
          </form>
        </Card>

        <Link
          to="/login"
          className="block text-center mt-4 py-3 rounded-xl border border-ink-200 bg-white text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700 transition-colors"
        >
          Login as student
        </Link>
      </div>
    </div>
  );
}
