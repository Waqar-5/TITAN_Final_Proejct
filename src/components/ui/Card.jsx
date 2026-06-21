// src/components/ui/Card.jsx
export default function Card({ children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={`bg-white rounded-xl border border-ink-100 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
