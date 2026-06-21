// src/pages/ComingSoonPage.jsx
import { Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../context/useAuth";

export default function ComingSoonPage({ portalName = "This portal" }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleBack = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-ink-50">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
        <Construction size={28} />
      </div>
      <h1 className="text-xl font-bold text-ink-900">{portalName} is under construction</h1>
      <p className="text-sm text-ink-500 mt-2 max-w-sm">
        This part of the LMS is being built next. The student portal is fully ready —
        come back soon for this section.
      </p>
      <Button className="mt-6" onClick={handleBack}>
        Back to login
      </Button>
    </div>
  );
}
