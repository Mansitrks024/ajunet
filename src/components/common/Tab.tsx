interface TabProps {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}

export function Tab({ active, onClick, label, count }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors whitespace-nowrap ${active ? "text-primary" : "text-slate-500 hover:text-slate-700"
        }`}
    >
      {label}
      {count !== undefined && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
          }`}>
          {count}
        </span>
      )}
      {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
    </button>
  );
}
