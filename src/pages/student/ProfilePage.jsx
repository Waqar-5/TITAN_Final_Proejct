// src/pages/student/ProfilePage.jsx
import { useCallback, useState } from "react";
import { Mail, Phone, MapPin, User, Cake, BadgeCheck, GraduationCap, Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/useAuth";
import { getStudentCourses } from "../../services/studentService";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div>
      <p className="text-xs text-ink-400 flex items-center gap-1.5 mb-1">
        <Icon size={13} /> {label}
      </p>
      <p className="text-sm font-semibold text-ink-800">{value || "Not provided"}</p>
    </div>
  );
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchCourses = useCallback(() => getStudentCourses(user.id), [user.id]);
  const { data: courses, isLoading } = useApi(fetchCourses, [user.id]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/login");
  };

  const formattedDob = user.dob
    ? new Date(user.dob).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Not provided";

  return (
    <div className="pt-2 pb-6 max-w-4xl">
      <Card className="overflow-hidden">
        <div className="h-40 sm:h-48 bg-gradient-to-r from-leaf-300 via-leaf-100 to-brand-400 relative flex items-center justify-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-white/90 tracking-tight drop-shadow-sm">
            SMIT
          </span>
        </div>

        <div className="px-5 sm:px-8 pt-0">
          <div className="flex items-end justify-between -mt-12">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-card bg-white"
            />
          </div>

          <div className="flex items-start justify-between gap-4 mt-4">
            <div>
              <h2 className="text-xl font-bold text-ink-900">{user.name}</h2>
              <Badge variant="info" className="mt-1.5 capitalize">{user.role}</Badge>
            </div>
            <Button variant="primary" size="sm">
              <Pencil size={14} />
              Edit Profile
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6 mb-6">
            <Card className="p-5">
              <h3 className="font-bold text-ink-900 flex items-center gap-2 mb-4 text-sm">
                <Mail size={15} className="text-brand-600" />
                Contact Info
              </h3>
              <div className="space-y-4">
                <InfoRow icon={Mail} label="Email" value={user.email} />
                <InfoRow icon={Phone} label="Phone" value={user.phone} />
                <InfoRow icon={MapPin} label="Address" value={user.address} />
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-bold text-ink-900 flex items-center gap-2 mb-4 text-sm">
                <User size={15} className="text-brand-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <InfoRow icon={User} label="Gender" value={user.gender} />
                <InfoRow icon={Cake} label="Date of Birth" value={formattedDob} />
                <InfoRow icon={GraduationCap} label="Last Qualification" value={user.lastQualification} />
                <InfoRow icon={BadgeCheck} label="CNIC" value={user.cnic} />
              </div>
            </Card>
          </div>

          <Card className="p-5 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink-900 flex items-center gap-2 text-sm">
                <GraduationCap size={15} className="text-brand-600" />
                Enrolled Courses
              </h3>
              {!isLoading && (
                <span className="w-6 h-6 rounded-full bg-ink-100 text-ink-600 text-xs font-bold flex items-center justify-center">
                  {courses?.length || 0}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-6">
                <Spinner size={22} />
              </div>
            ) : courses?.length ? (
              <div className="space-y-2">
                {courses.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between bg-brand-50/60 rounded-lg px-4 py-3"
                  >
                    <span className="text-sm font-medium text-brand-800">{c.title}</span>
                    <Badge variant="info">ENROLLED</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-400">No courses enrolled yet.</p>
            )}
          </Card>

          <div className="flex justify-end pb-6">
            <Button variant="danger" onClick={handleLogout} isLoading={loggingOut}>
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
