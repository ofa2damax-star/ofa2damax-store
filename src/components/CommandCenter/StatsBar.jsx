export default function StatsBar({ submissions }) {
  const total = submissions.length;
  const pending = submissions.filter(s => s.status === "pending" || !s.status).length;
  const inProgress = submissions.filter(s => s.status === "in_progress").length;
  const ready = submissions.filter(s => s.status === "ready").length;
  const pickedUp = submissions.filter(s => s.status === "picked_up").length;

  const stats = [
    { label: "Total Orders", value: total, color: "bg-slate-700", text: "text-white" },
    { label: "Pending",      value: pending, color: "bg-yellow-400", text: "text-yellow-900" },
    { label: "In Progress",  value: inProgress, color: "bg-blue-500", text: "text-white" },
    { label: "Ready",        value: ready, color: "bg-green-500", text: "text-white" },
    { label: "Picked Up",    value: pickedUp, color: "bg-slate-400", text: "text-white" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      {stats.map(s => (
        <div key={s.label} className={`${s.color} rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm`}>
          <span className={`text-3xl font-black ${s.text}`}>{s.value}</span>
          <span className={`text-xs font-bold mt-1 ${s.text} opacity-80`}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}