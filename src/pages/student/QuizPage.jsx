// src/pages/student/QuizPage.jsx
import { useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/useAuth";
import { getStudentQuizzes } from "../../services/quizService";

const rules = [
  "Once started, quizzes must be completed in one session",
  "Switching tabs or leaving the window will be recorded",
  "Ensure you have a stable internet connection",
  "The quiz will open in fullscreen mode",
];

export default function QuizPage() {
  const { user } = useAuth();
  const fetchQuizzes = useCallback(() => getStudentQuizzes(user.id), [user.id]);
  const { data, isLoading } = useApi(fetchQuizzes, [user.id]);

  return (
    <div className="pt-2 space-y-5">
      <Card className="p-5">
        <h3 className="font-bold text-ink-900 flex items-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-amber-500" />
          Important Information
        </h3>
        <ul className="space-y-1.5 text-sm text-ink-600 list-disc list-inside">
          {rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Card>

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size={28} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="text-left text-ink-400 border-b border-ink-100">
                  <th className="px-5 py-3 font-medium">Module</th>
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Questions</th>
                  <th className="px-5 py-3 font-medium">Attempts</th>
                  <th className="px-5 py-3 font-medium">Score</th>
                  <th className="px-5 py-3 font-medium">Percentage</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((q) => (
                  <tr key={q.id} className="border-b border-ink-50 last:border-0">
                    <td className="px-5 py-3 font-medium text-ink-800">{q.module}</td>
                    <td className="px-5 py-3 text-ink-600">{q.title}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-ink-50 border border-ink-100 text-ink-600 text-xs font-semibold">
                        {q.questions}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-600">{q.attempts}</td>
                    <td className="px-5 py-3 text-ink-600">{q.score}</td>
                    <td className="px-5 py-3 text-ink-600">{q.percentage}%</td>
                    <td className="px-5 py-3">
                      <Badge variant={q.status === "PASSED" ? "success" : "danger"}>{q.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="inline-block px-4 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <p className="text-sm text-ink-400 text-center">
        Contact your instructor if you have any issues accessing your quizzes.
      </p>
    </div>
  );
}
