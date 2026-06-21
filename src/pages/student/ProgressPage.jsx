// src/pages/student/ProgressPage.jsx
import { useCallback, useState } from "react";
import { BookOpen, GraduationCap, Clock3, ChevronDown, CheckCircle2 } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import CircularProgress from "../../components/ui/CircularProgress";
import Spinner from "../../components/ui/Spinner";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/useAuth";
import { getStudentProgress } from "../../services/progressService";

export default function ProgressPage() {
  const { user } = useAuth();
  const [openModule, setOpenModule] = useState(null);

  const fetchProgress = useCallback(() => getStudentProgress(user.id), [user.id]);
  const { data, isLoading } = useApi(fetchProgress, [user.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div className="pt-2 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={BookOpen} color="green" value={data.totalTopics} label="Total Topics" />
        <StatCard icon={GraduationCap} color="purple" value={data.totalCompleted} label="Total Completed" />
        <StatCard icon={Clock3} color="red" value={data.notCompleted} label="Not Completed" />
      </div>

      <div className="space-y-3">
        {data.modules.map((m) => {
          const isOpen = openModule === m.id;
          const isDone = m.status === "done";
          return (
            <Card key={m.id} className="overflow-hidden">
              <button
                onClick={() => setOpenModule(isOpen ? null : m.id)}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      isDone ? "bg-leaf-50 text-leaf-600" : "bg-amber-50 text-amber-500"
                    }`}
                  >
                    {isDone ? <CheckCircle2 size={16} /> : <Clock3 size={16} />}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-ink-900 truncate">{m.name}</p>
                    <p className="text-xs text-ink-400 mt-0.5">
                      Topics: {m.completedTopics}/{m.totalTopics}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <CircularProgress percent={m.percent} size={40} />
                  <ChevronDown
                    size={18}
                    className={`text-ink-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 -mt-1 animate-fadeIn">
                  <div className="h-px bg-ink-100 mb-4" />
                  <p className="text-sm text-ink-500">
                    {m.completedTopics} of {m.totalTopics} topics completed in this module.
                    {!isDone && " Keep going — detailed topic checklist coming soon."}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
