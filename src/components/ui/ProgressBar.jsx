// src/components/ui/ProgressBar.jsx
export default function ProgressBar({ percent = 0, className = "", trackClassName = "", barClassName = "" }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={`w-full h-2 rounded-full bg-ink-100 overflow-hidden ${trackClassName} ${className}`}>
      <div
        className={`h-full rounded-full bg-leaf-500 transition-all duration-500 ease-out ${barClassName}`}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
