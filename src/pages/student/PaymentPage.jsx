// src/pages/student/PaymentPage.jsx
import { useCallback, useState } from "react";
import { RefreshCw, Copy, Check } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/useAuth";
import { getStudentFees } from "../../services/feeService";

const steps = [
  <>Open <strong>JazzCash</strong> app</>,
  <>Click on <strong>More</strong></>,
  <>Go to <strong>Education</strong> tab</>,
  <>Click <strong>Universities</strong></>,
  <>Select <strong>Saylani Education</strong> from the list</>,
  <>Paste your <strong>Voucher ID</strong></>,
  <>Pay your fee</>,
];

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md border border-ink-200 text-ink-500 hover:text-brand-700 hover:border-brand-300 transition-colors"
      aria-label="Copy voucher ID"
    >
      {copied ? <Check size={14} className="text-leaf-600" /> : <Copy size={14} />}
    </button>
  );
}

export default function PaymentPage() {
  const { user } = useAuth();
  const fetchFees = useCallback(() => getStudentFees(user.id), [user.id]);
  const { data, isLoading, refetch } = useApi(fetchFees, [user.id]);

  return (
    <div className="pt-2 space-y-5">
      <Card className="p-5 bg-brand-50/50 border-brand-100">
        <p className="font-semibold text-ink-800 mb-3">To pay your fee via JazzCash:</p>
        <ol className="space-y-1.5 text-sm text-ink-700 list-decimal list-inside">
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Card>

      <div className="flex justify-end">
        <Button variant="secondary" size="sm" onClick={refetch}>
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size={28} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-ink-400 border-b border-ink-100">
                  <th className="px-5 py-3 font-medium">Month</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Due date</th>
                  <th className="px-5 py-3 font-medium">Voucher ID</th>
                  <th className="px-5 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((f) => (
                  <tr key={f.voucherId} className="border-b border-ink-50 last:border-0">
                    <td className="px-5 py-3 font-medium text-ink-800">{f.month}</td>
                    <td className="px-5 py-3 text-ink-600">Rs. {f.amount} /-</td>
                    <td className="px-5 py-3 text-ink-600">{f.type}</td>
                    <td className="px-5 py-3 text-ink-600">{f.dueDate}</td>
                    <td className="px-5 py-3 text-ink-600">
                      <span className="inline-flex items-center gap-2">
                        {f.voucherId}
                        <CopyButton value={f.voucherId} />
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Badge variant={f.status === "PAID" ? "success" : "warning"}>{f.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
