// src/components/ui/StatCard.jsx
import Card from "./Card";

const colorMap = {
  blue: "bg-brand-50 text-brand-600",
  green: "bg-leaf-50 text-leaf-600",
  purple: "bg-violet-50 text-violet-600",
  red: "bg-rose-50 text-rose-500",
  amber: "bg-amber-50 text-amber-600",
};

export default function StatCard({ icon: Icon, value, label, color = "blue" }) {
  return (
    <Card className="p-5 flex items-start justify-between gap-4">
      <div>
        <p className="text-2xl font-bold text-ink-900 leading-none">{value}</p>
        <p className="text-sm text-ink-500 mt-2">{label}</p>
      </div>
      {Icon && (
        <span
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${colorMap[color]}`}
        >
          <Icon size={18} strokeWidth={2.25} />
        </span>
      )}
    </Card>
  );
}
