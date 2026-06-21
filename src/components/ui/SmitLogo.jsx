// src/components/ui/SmitLogo.jsx
export default function SmitLogo({ className = "h-12", showTagline = true }) {
  return (
    <div className="flex flex-col items-center select-none">
      <svg viewBox="0 0 220 70" className={className} role="img" aria-label="SMIT logo">
        <g fontFamily="Arial, sans-serif" fontWeight="800">
          <text x="10" y="48" fontSize="46" fill="#1c4179" letterSpacing="-1">
            S
          </text>
          <text x="48" y="48" fontSize="46" fill="#1c4179" letterSpacing="-1">
            M
          </text>
          <text x="98" y="48" fontSize="46" fill="#1c4179" letterSpacing="-1">
            I
          </text>
          <text x="118" y="48" fontSize="46" fill="#359b3e" letterSpacing="-1">
            T
          </text>
        </g>
        <path d="M115 4 L128 9 L115 14 L102 9 Z" fill="#359b3e" />
        <circle cx="129" cy="9" r="2" fill="#359b3e" />
        <path
          d="M8 56 C 40 70, 90 70, 132 56"
          fill="none"
          stroke="#359b3e"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {showTagline && (
        <span className="text-[10px] font-semibold tracking-[0.18em] text-ink-500 -mt-1">
          SAYLANI MASS IT TRAINING
        </span>
      )}
    </div>
  );
}
