// src/components/ui/Button.jsx
const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-brand-700 hover:bg-brand-800 text-white",
  secondary: "bg-white hover:bg-ink-50 text-ink-700 border border-ink-200",
  danger: "bg-rose-600 hover:bg-rose-700 text-white",
  ghost: "bg-transparent hover:bg-ink-100 text-ink-600",
};

const sizes = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  ...rest
}) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
}
