// src/components/ui/TextField.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function TextField({
  label,
  required = false,
  type = "text",
  error,
  className = "",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-ink-900 placeholder:text-ink-400 text-sm transition-colors ${
            error
              ? "border-rose-400 focus:border-rose-500"
              : "border-ink-200 focus:border-brand-500"
          } focus:outline-none focus:ring-2 ${
            error ? "focus:ring-rose-100" : "focus:ring-brand-100"
          }`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
