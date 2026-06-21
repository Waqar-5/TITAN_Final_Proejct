// src/components/ui/Badge.jsx
const variants = {
  success: "bg-leaf-50 text-leaf-700 border-leaf-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-rose-50 text-rose-600 border-rose-200",
  info: "bg-brand-50 text-brand-700 border-brand-200",
  neutral: "bg-ink-100 text-ink-600 border-ink-200",
  purple: "bg-violet-50 text-violet-700 border-violet-200",
};

export default function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
