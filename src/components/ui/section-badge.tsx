import * as React from "react"

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <span className={`inline-block bg-primary/10 text-primary border border-primary/25 rounded-full text-xs font-semibold tracking-widest uppercase px-[14px] py-1 mb-4 ${className || ''}`}>
      {children}
    </span>
  );
}

export { SectionBadge };
