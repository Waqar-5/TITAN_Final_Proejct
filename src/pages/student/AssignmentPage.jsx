// src/pages/student/AssignmentPage.jsx
import { useCallback, useRef, useState } from "react";
import { FileText, CheckCircle2, XCircle, Eye, Upload, Pencil } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/useAuth";
import { getStudentAssignments, submitAssignment } from "../../services/assignmentService";

const statusVariant = {
  APPROVED: "success",
  NOT_SUBMITTED: "danger",
  PENDING: "warning",
};
const statusLabel = {
  APPROVED: "APPROVED",
  NOT_SUBMITTED: "NOT SUBMITTED",
  PENDING: "PENDING",
};

export default function AssignmentPage() {
  const { user } = useAuth();
  const fetchAssignments = useCallback(() => getStudentAssignments(user.id), [user.id]);
  const { data, isLoading, refetch } = useApi(fetchAssignments, [user.id]);
  const [submittingId, setSubmittingId] = useState(null);
  const fileInputRef = useRef(null);
  const targetIdRef = useRef(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner size={32} />
      </div>
    );
  }

  const total = data.length;
  const submitted = data.filter((a) => a.status !== "NOT_SUBMITTED").length;
  const approved = data.filter((a) => a.status === "APPROVED").length;
  const notApproved = total - approved;

  const handleUploadClick = (id) => {
    targetIdRef.current = id;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    const id = targetIdRef.current;
    if (!file || !id) return;
    setSubmittingId(id);
    try {
      await submitAssignment(user.id, id, file);
      refetch();
    } finally {
      setSubmittingId(null);
      e.target.value = "";
    }
  };

  return (
    <div className="pt-2 space-y-5">
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={FileText} color="blue" value={total} label="Total" />
        <StatCard icon={FileText} color="amber" value={submitted} label="Submitted" />
        <StatCard icon={CheckCircle2} color="green" value={approved} label="Approved" />
        <StatCard icon={XCircle} color="red" value={notApproved} label="Not Approved" />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-left text-ink-400 border-b border-ink-100">
              <th className="px-5 py-3 font-medium">Assignment</th>
              <th className="px-5 py-3 font-medium">Course</th>
              <th className="px-5 py-3 font-medium">Due Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((a) => (
              <tr key={a.id} className="border-b border-ink-50 last:border-0">
                <td className="px-5 py-3">
                  <span className={`font-medium ${a.type === "hackathon" ? "text-violet-600" : "text-ink-800"}`}>
                    {a.title}
                  </span>
                  {a.type === "hackathon" && (
                    <Badge variant="purple" className="ml-2">HACKATHON</Badge>
                  )}
                </td>
                <td className="px-5 py-3 text-ink-600">{a.course}</td>
                <td className="px-5 py-3 text-ink-600">{a.dueDate}</td>
                <td className="px-5 py-3">
                  <Badge variant={statusVariant[a.status]}>{statusLabel[a.status]}</Badge>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3 text-ink-400">
                    <button className="hover:text-brand-700" aria-label="View assignment">
                      <Eye size={16} />
                    </button>
                    <button
                      className="hover:text-brand-700 disabled:opacity-40"
                      aria-label="Upload submission"
                      onClick={() => handleUploadClick(a.id)}
                      disabled={submittingId === a.id}
                    >
                      {submittingId === a.id ? (
                        <span className="w-4 h-4 border-2 border-ink-200 border-t-brand-600 rounded-full animate-spin inline-block" />
                      ) : (
                        <Upload size={16} />
                      )}
                    </button>
                    <button className="hover:text-brand-700" aria-label="Edit submission">
                      <Pencil size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
