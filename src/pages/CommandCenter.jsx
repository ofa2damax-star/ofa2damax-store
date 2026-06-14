import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsBar from "@/components/CommandCenter/StatsBar";
import OrderRow from "@/components/CommandCenter/OrderRow";
import ItemCountsDashboard from "@/components/CommandCenter/ItemCountsDashboard";

const CATEGORY_FILTERS = [
  { value: "all",              label: "All Categories" },
  { value: "hygiene",          label: "🧼 Hygiene" },
  { value: "clothes",          label: "👕 Clothes" },
  { value: "feminine_hygiene", label: "🌸 Feminine Hygiene" },
  { value: "school_clothes",   label: "🏫 School Clothes" },
  { value: "sports_gear",      label: "🏆 Sports & Equipment" },
];

const STATUS_FILTERS = [
  { value: "all",         label: "All Statuses" },
  { value: "pending",     label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "ready",       label: "Ready" },
  { value: "picked_up",   label: "Picked Up" },
];

export default function CommandCenter() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("orders");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ["selections"],
    queryFn: () => base44.entities.Selection.list("-created_date", 200),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Selection.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["selections"] }),
  });

  const handleUpdateStatus = (id, status) => {
    updateMutation.mutate({ id, data: { status } });
  };

  const handleUpdateNotes = async (id, notes) => {
    await base44.entities.Selection.update(id, { notes });
    queryClient.invalidateQueries({ queryKey: ["selections"] });
  };

  const filtered = submissions.filter(s => {
    const matchSearch = !search || (s.child_name || "").toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || s.category === categoryFilter;
    const matchStatus = statusFilter === "all" || (s.status || "pending") === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/6a1b94aa3da2d1391351474e/1f8572547_image.png"
            alt="OFA2DAMAX"
            className="w-10 h-10 object-contain rounded-xl"
          />
          <div>
            <h1 className="text-xl font-black text-slate-800">Command Center</h1>
            <p className="text-xs text-slate-400 font-semibold">OFA2DAMAX — Office Dashboard</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2 rounded-xl">
          <RefreshCw className="w-4 h-4" /> Refresh
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Stats */}
        <StatsBar submissions={submissions} />

        {/* Tab switcher */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab("orders")}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-colors ${
              tab === "orders"
                ? "bg-slate-800 text-white shadow"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            📋 Orders
          </button>
          <button
            onClick={() => setTab("dashboard")}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-colors ${
              tab === "dashboard"
                ? "bg-slate-800 text-white shadow"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            📊 Item Counts
          </button>
        </div>

        {/* Item Counts Dashboard */}
        {tab === "dashboard" && (
          isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <ItemCountsDashboard submissions={submissions} />
          )
        )}

        {/* Orders tab */}
        {tab === "orders" && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 flex flex-col sm:flex-row gap-3 items-center shadow-sm">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by student name…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 bg-slate-50"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold cursor-pointer"
                >
                  {CATEGORY_FILTERS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold cursor-pointer"
                >
                  {STATUS_FILTERS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Orders List */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-5xl mb-3">📭</p>
                <p className="font-bold text-lg">No submissions found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-2">
                  {filtered.length} order{filtered.length !== 1 ? "s" : ""} shown
                </p>
                {filtered.map(sub => (
                  <OrderRow
                    key={sub.id}
                    submission={sub}
                    onUpdateStatus={handleUpdateStatus}
                    onUpdateNotes={handleUpdateNotes}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}