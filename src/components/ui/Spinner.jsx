// src/components/ui/Spinner.jsx
export default function Spinner({ size = 28, className = "" }) {
  return (
    <div
      className={`border-3 border-ink-200 border-t-brand-600 rounded-full animate-spin ${className}`}
      style={{ width: size, height: size, borderWidth: Math.max(2, size / 12) }}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50">
      <Spinner size={36} />
    </div>
  );
}
