import { useState } from "react";
import PullToRefresh from "@/components/PullToRefresh";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MobileSelect from "@/components/MobileSelect";
import { base44 } from "@/api/base44Client";
import { Search, RefreshCw, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { hygieneProducts, clothesProducts, sportsProducts } from "@/lib/productData";

const ALL_PRODUCTS = [
  ...hygieneProducts,
  ...clothesProducts,
  ...sportsProducts,
  { id: "pads", name: "Pads", emoji: "🩸" },
  { id: "tampons", name: "Tampons", emoji: "🌸" },
  { id: "panty_liners", name: "Panty Liners", emoji: "💜" },
  { id: "pain_relief", name: "Pain Relief", emoji: "💊" },
  { id: "heating_pad", name: "Heating Pad", emoji: "🔥" },
  { id: "wipes", name: "Wipes", emoji: "🧻" },
  { id: "underwear_fem", name: "Period Underwear", emoji: "🩲" },
  { id: "chocolate", name: "Chocolate", emoji: "🍫" },
  { id: "tshirt_school", name: "T-Shirt (School)", emoji: "👕" },
  { id: "hoodie_school", name: "Hoodie (School)", emoji: "🧥" },
  { id: "pants_school", name: "Pants (School)", emoji: "👖" },
  { id: "shorts_school", name: "Shorts (School)", emoji: "🩳" },
  { id: "hat_school", name: "Hat (School)", emoji: "🧢" },
  { id: "jacket_school", name: "Jacket (School)", emoji: "🫱" },
];

function resolveItem(id) {
  const p = ALL_PRODUCTS.find(p => p.id === id);
  return p ? `${p.emoji} ${p.name}` : id;
}
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
  const { toast } = useToast();
  const [tab, setTab] = useState("orders");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");


  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ["selections"],
    queryFn: () => base44.entities.Selection.list("-created_date", 200),
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => base44.entities.User.list(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Selection.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["selections"] });
      const previous = queryClient.getQueryData(["selections"]);
      queryClient.setQueryData(["selections"], old =>
        (old || []).map(s => s.id === id ? { ...s, ...data } : s)
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["selections"], ctx.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["selections"] }),
  });

  const handleUpdateStatus = async (id, status) => {
    updateMutation.mutate({ id, data: { status } });

    if (status === "picked_up") {
      const submission = submissions.find(s => s.id === id);
      if (submission) {
        const owner = users.find(u => u.id === submission.created_by_id);
        const recipientEmail = owner?.email;

        // Resolve item names
        const ALL_PRODUCTS = [
          ...hygieneProducts, ...clothesProducts, ...sportsProducts,
          { id: "pads", name: "Pads", emoji: "🩸" },
          { id: "tampons", name: "Tampons", emoji: "🌸" },
          { id: "panty_liners", name: "Panty Liners", emoji: "💜" },
          { id: "pain_relief", name: "Pain Relief", emoji: "💊" },
          { id: "heating_pad", name: "Heating Pad", emoji: "🔥" },
          { id: "wipes", name: "Wipes", emoji: "🧻" },
          { id: "underwear_fem", name: "Period Underwear", emoji: "🩲" },
          { id: "chocolate", name: "Chocolate", emoji: "🍫" },
          { id: "tshirt_school", name: "T-Shirt (School)", emoji: "👕" },
          { id: "hoodie_school", name: "Hoodie (School)", emoji: "🧥" },
          { id: "pants_school", name: "Pants (School)", emoji: "👖" },
          { id: "shorts_school", name: "Shorts (School)", emoji: "🩳" },
          { id: "hat_school", name: "Hat (School)", emoji: "🧢" },
          { id: "jacket_school", name: "Jacket (School)", emoji: "🫱" },
        ];
        const resolvedItems = (submission.items || []).map(id => {
          const p = ALL_PRODUCTS.find(p => p.id === id);
          return p ? `${p.emoji} ${p.name}` : id;
        });

        try {
          await base44.functions.invoke("sendDeliveryEmail", {
            submissionId: submission.id,
            childName: submission.child_name || "Student",
            items: resolvedItems,
            recipientEmail,
          });
          toast({ title: "📧 Email sent!", description: `Delivery notification sent to ${recipientEmail || "student"}.` });
        } catch (e) {
          toast({ title: "Email failed", description: e.message, variant: "destructive" });
        }
      }
    }
  };

  const handleUpdateNotes = async (id, notes) => {
    await base44.entities.Selection.update(id, { notes });
    queryClient.invalidateQueries({ queryKey: ["selections"] });
  };

  const handlePrint = async () => {
    const printable = submissions.filter(s => (s.status || "pending") !== "picked_up");

    // Fetch all users to get their address profiles
    let users = [];
    try {
      users = await base44.entities.User.list();
    } catch (e) {}

    const getUserProfile = (created_by_id) => {
      const u = users.find(u => u.id === created_by_id);
      return u?.profile || {};
    };

    const grouped = {};
    printable.forEach(s => {
      const name = s.child_name || "Unknown Student";
      if (!grouped[name]) grouped[name] = { orders: [], profile: getUserProfile(s.created_by_id) };
      grouped[name].orders.push(s);
    });

    const html = `
      <html>
      <head>
        <title>OFA2DAMAX Packing List</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
          h1 { font-size: 22px; margin-bottom: 4px; }
          .subtitle { font-size: 12px; color: #666; margin-bottom: 24px; }
          .student { page-break-inside: avoid; margin-bottom: 28px; border: 2px solid #222; border-radius: 8px; padding: 14px; }
          .student-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
          .student-name { font-size: 18px; font-weight: bold; }
          .student-address { font-size: 12px; color: #333; text-align: right; line-height: 1.5; }
          .address-label { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #888; margin-bottom: 2px; }
          .order { margin-bottom: 10px; }
          .category { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #555; margin-bottom: 4px; }
          ul { margin: 0; padding-left: 20px; }
          li { font-size: 14px; margin-bottom: 2px; }
          .size { font-size: 12px; color: #444; margin-top: 4px; font-style: italic; }
          .notes { font-size: 12px; color: #555; margin-top: 4px; background: #f5f5f5; padding: 6px 8px; border-radius: 4px; }
          .checkbox { display: inline-block; width: 14px; height: 14px; border: 1px solid #333; margin-right: 6px; vertical-align: middle; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <h1>📦 OFA2DAMAX Packing List</h1>
        <div class="subtitle">Generated ${new Date().toLocaleDateString()} — ${printable.length} orders (excluding picked up)</div>
        ${Object.entries(grouped).map(([name, { orders, profile }]) => {
          const street = profile.home_address || "";
          const city = profile.city || "";
          const state = profile.state || "";
          const zip = profile.zip || "";
          const hasAddress = street || city;
          const addressLine = [street, [city, state].filter(Boolean).join(", "), zip].filter(Boolean).join("\n");
          return `
          <div class="student">
            <div class="student-header">
              <div class="student-name">👤 ${name}</div>
              <div class="student-address">
                <div class="address-label">📦 Delivery Address</div>
                ${hasAddress ? addressLine.split("\n").map(l => `<div>${l}</div>`).join("") : '<div style="color:#aaa;font-style:italic;">No address on file</div>'}
              </div>
            </div>
            ${orders.map(o => `
              <div class="order">
                <div class="category">${o.category?.replace(/_/g, " ")} · Status: ${o.status || "pending"}</div>
                <ul>
                  ${(o.items || []).map(id => `<li><span class="checkbox"></span>${resolveItem(id)}</li>`).join("")}
                </ul>
                ${o.size_info ? `<div class="size">📏 Size info: ${o.size_info}</div>` : ""}
                ${o.notes ? `<div class="notes">📝 ${o.notes}</div>` : ""}
              </div>
            `).join("")}
          </div>
        `}).join("")}
      </body>
      </html>
    `;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    win.print();
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2 rounded-xl">
            <Printer className="w-4 h-4" /> Print Packing List
          </Button>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2 rounded-xl">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </div>
      </div>

      <PullToRefresh onRefresh={refetch}>
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
                <MobileSelect
                  options={CATEGORY_FILTERS}
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  className="text-sm px-3 py-2"
                />
                <MobileSelect
                  options={STATUS_FILTERS}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  className="text-sm px-3 py-2"
                />
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
      </PullToRefresh>
    </div>
  );
}