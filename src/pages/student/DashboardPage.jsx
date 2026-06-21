// src/pages/student/DashboardPage.jsx
import { useCallback, useState } from "react";
import { Clock, GraduationCap, CalendarDays } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";
import Spinner from "../../components/ui/Spinner";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/useAuth";
import { getActiveCourse } from "../../services/studentService";
import { getStudentAttendance } from "../../services/attendanceService";
import { getStudentAssignments } from "../../services/assignmentService";
import { getStudentFees } from "../../services/feeService";

const weekDays = [
  { short: "Sun", num: 14 },
  { short: "Mon", num: 15 },
  { short: "Tue", num: 16 },
  { short: "Wed", num: 17 },
  { short: "Thu", num: 18 },
  { short: "Fri", num: 19 },
  { short: "Sat", num: 20 },
];
const classDays = new Set([15, 17, 19]);

export default function DashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("assignments");

  const fetchCourse = useCallback(() => getActiveCourse(user.id), [user.id]);
  const fetchAttendance = useCallback(() => getStudentAttendance(user.id), [user.id]);
  const fetchAssignments = useCallback(() => getStudentAssignments(user.id), [user.id]);
  const fetchFees = useCallback(() => getStudentFees(user.id), [user.id]);

  const { data: course, isLoading: courseLoading } = useApi(fetchCourse, [user.id]);
  const { data: attendance, isLoading: attLoading } = useApi(fetchAttendance, [user.id]);
  const { data: assignments } = useApi(fetchAssignments, [user.id]);
  const { data: fees } = useApi(fetchFees, [user.id]);

  if (courseLoading || attLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner size={32} />
      </div>
    );
  }

  const pendingAssignments = (assignments || []).filter((a) => a.status === "NOT_SUBMITTED");

  return (
    <div className="pt-2 space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={Clock}
              color="green"
              value={`${attendance.present}/${attendance.totalClasses}`}
              label="Attendance"
            />
            <StatCard
              icon={GraduationCap}
              color="purple"
              value={`${(assignments || []).filter((a) => a.status === "APPROVED").length}/${(assignments || []).length}`}
              label="Assignment"
            />
          </div>

          <div>
            <h2 className="text-sm font-bold text-ink-700 mb-3">Active Course</h2>
            {course ? (
              <Card className="p-5 bg-brand-50/40 border-brand-100">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-lg font-bold text-ink-900">{course.title}</h3>
                  <Badge variant="info">ENROLLED</Badge>
                </div>
                <p className="text-sm text-ink-500 flex items-center gap-1.5 mb-4">
                  <GraduationCap size={14} /> {course.shortCode}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {course.schedule.map((s) => (
                    <span
                      key={s.day}
                      className="px-3 py-1.5 rounded-lg border border-ink-200 bg-white text-xs font-medium text-ink-600"
                    >
                      {s.day} {s.time}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-ink-600">Progress</span>
                  <span className="font-semibold text-ink-800">{course.progressPercent}% Completed</span>
                </div>
                <ProgressBar percent={course.progressPercent} />

                <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                  <div>
                    <p className="text-ink-400"># Batch:</p>
                    <p className="font-semibold text-ink-800">{user.batch}</p>
                  </div>
                  <div>
                    <p className="text-ink-400">Roll:</p>
                    <p className="font-semibold text-ink-800">{user.roll}</p>
                  </div>
                  <div>
                    <p className="text-ink-400">Campus:</p>
                    <p className="font-semibold text-ink-800">{user.campus}</p>
                  </div>
                  <div>
                    <p className="text-ink-400">City:</p>
                    <p className="font-semibold text-ink-800">{user.city}</p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center text-ink-500 text-sm">
                You are not enrolled in any course yet.
              </Card>
            )}
          </div>

          <div>
            <h2 className="text-sm font-bold text-ink-700 mb-3">Fee</h2>
            <Card className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="text-left text-ink-400 border-b border-ink-100">
                    <th className="px-4 py-3 font-medium">Month</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Due date</th>
                    <th className="px-4 py-3 font-medium">Voucher ID</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(fees || []).slice(0, 4).map((f) => (
                    <tr key={f.voucherId} className="border-b border-ink-50 last:border-0">
                      <td className="px-4 py-3 font-medium text-ink-800">{f.month}</td>
                      <td className="px-4 py-3 text-ink-600">Rs. {f.amount} /-</td>
                      <td className="px-4 py-3 text-ink-600">{f.type}</td>
                      <td className="px-4 py-3 text-ink-600">{f.dueDate}</td>
                      <td className="px-4 py-3 text-ink-600">{f.voucherId}</td>
                      <td className="px-4 py-3">
                        <Badge variant={f.status === "PAID" ? "success" : "warning"}>{f.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <h3 className="font-bold text-ink-900 flex items-center gap-2 mb-4">
              <CalendarDays size={17} className="text-brand-600" />
              Class Schedule
            </h3>
            <div className="grid grid-cols-7 gap-1.5">
              {weekDays.map((d) => (
                <div key={d.num} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-ink-400">{d.short}</span>
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold ${
                      classDays.has(d.num)
                        ? "bg-leaf-500 text-white"
                        : "bg-ink-50 text-ink-600 border border-ink-100"
                    }`}
                  >
                    {d.num}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex gap-1 border-b border-ink-100 mb-4">
              {["assignments", "quizzes", "events"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                    tab === t
                      ? "text-brand-700 border-brand-600"
                      : "text-ink-400 border-transparent hover:text-ink-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "assignments" && (
              pendingAssignments.length ? (
                <ul className="space-y-2">
                  {pendingAssignments.map((a) => (
                    <li key={a.id} className="text-sm text-ink-700 px-3 py-2 rounded-lg bg-ink-50">
                      {a.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-400 text-center py-6">No pending assignments</p>
              )
            )}
            {tab === "quizzes" && (
              <p className="text-sm text-ink-400 text-center py-6">No upcoming quizzes</p>
            )}
            {tab === "events" && (
              <p className="text-sm text-ink-400 text-center py-6">No upcoming events</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
