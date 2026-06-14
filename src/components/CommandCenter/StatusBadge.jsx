const STATUS_CONFIG = {
  pending:     { label: "Pending",     className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  in_progress: { label: "In Progress", className: "bg-blue-100 text-blue-800 border-blue-300" },
  ready:       { label: "Ready",       className: "bg-green-100 text-green-800 border-green-300" },
  picked_up:   { label: "Picked Up",   className: "bg-slate-100 text-slate-600 border-slate-300" },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}