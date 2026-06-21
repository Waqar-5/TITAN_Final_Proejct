// src/pages/student/AttendancePage.jsx
import { useCallback } from "react";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";
import Spinner from "../../components/ui/Spinner";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/useAuth";
import { getStudentAttendance } from "../../services/attendanceService";

const statusVariant = {
  PRESENT: "success",
  LEAVE: "warning",
  ABSENT: "danger",
};

export default function AttendancePage() {
  const { user } = useAuth();
  const fetchAttendance = useCallback(() => getStudentAttendance(user.id), [user.id]);
  const { data, isLoading } = useApi(fetchAttendance, [user.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner size={32} />
      </div>
    );
  }

  const percent = data.totalClasses ? Math.round((data.present / data.totalClasses) * 100) : 0;
  const isGood = percent >= 75;

  return (
    <div className="pt-2 space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={CalendarDays} color="blue" value={data.totalClasses} label="Total Classes" />
        <StatCard icon={CheckCircle2} color="green" value={data.present} label="Present" />
        <StatCard icon={XCircle} color="amber" value={data.leave} label="Leave" />
        <StatCard icon={XCircle} color="red" value={data.absent} label="Absent" />
      </div>

      <Card className="p-5">
        <h3 className="font-bold text-ink-900 mb-3">Attendance Overview</h3>
        <ProgressBar percent={percent} className="h-2.5" />
        <p className={`text-sm mt-2 font-medium ${isGood ? "text-leaf-600" : "text-amber-600"}`}>
          {isGood ? "Your attendance is good. Keep it up!" : "Your attendance needs improvement."}
        </p>
      </Card>

      <Card>
        <div className="flex items-center justify-between p-5 pb-0">
          <h3 className="font-bold text-ink-900">Attendance Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm mt-3 min-w-[480px]">
            <thead>
              <tr className="text-left text-ink-400 border-b border-ink-100">
                <th className="px-5 py-3 font-medium">Class</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.records.map((r) => (
                <tr key={r.classNo} className="border-b border-ink-50 last:border-0">
                  <td className="px-5 py-3 text-ink-600">{r.classNo}</td>
                  <td className="px-5 py-3 text-ink-800 font-medium">{r.label}</td>
                  <td className="px-5 py-3 text-right">
                    <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
