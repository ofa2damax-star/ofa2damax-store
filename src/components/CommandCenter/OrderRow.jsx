import { useState } from "react";
import { ChevronDown, ChevronUp, StickyNote } from "lucide-react";
import MobileSelect from "@/components/MobileSelect";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";
import { hygieneProducts, clothesProducts, sportsProducts } from "@/lib/productData";
import { format } from "date-fns";

const feminineProducts = [
  { id: "pads", name: "Pads", emoji: "🩸" },
  { id: "tampons", name: "Tampons", emoji: "🌸" },
  { id: "panty_liners", name: "Panty Liners", emoji: "💜" },
  { id: "pain_relief", name: "Pain Relief", emoji: "💊" },
  { id: "heating_pad", name: "Heating Pad", emoji: "🔥" },
  { id: "wipes", name: "Wipes", emoji: "🧻" },
  { id: "underwear", name: "Period Underwear", emoji: "🩲" },
  { id: "chocolate", name: "Chocolate", emoji: "🍫" },
];

const schoolProducts = [
  { id: "tshirt_school", name: "T-Shirt", emoji: "👕" },
  { id: "hoodie_school", name: "Hoodie", emoji: "🧥" },
  { id: "pants_school", name: "Pants", emoji: "👖" },
  { id: "shorts_school", name: "Shorts", emoji: "🩳" },
  { id: "hat_school", name: "Hat", emoji: "🧢" },
  { id: "jacket_school", name: "Jacket", emoji: "🫱" },
];

const ALL_PRODUCTS = [...hygieneProducts, ...clothesProducts, ...feminineProducts, ...schoolProducts, ...sportsProducts];

const STATUS_OPTIONS = [
  { value: "pending",     label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "ready",       label: "Ready" },
  { value: "picked_up",   label: "Picked Up" },
];

export default function OrderRow({ submission, onUpdateStatus, onUpdateNotes }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(submission.notes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  const resolvedItems = (submission.items || []).map(id => {
    const p = ALL_PRODUCTS.find(p => p.id === id);
    return p ? `${p.emoji} ${p.name}` : id;
  });

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    await onUpdateNotes(submission.id, notes);
    setSavingNotes(false);
  };

  const date = submission.created_date
    ? format(new Date(submission.created_date), "MMM d, yyyy · h:mm a")
    : "—";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Main row */}
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-slate-800 text-base truncate">
            {submission.child_name || <span className="text-slate-400 italic">No name</span>}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{date}</p>
        </div>
        <CategoryBadge category={submission.category} />
        <div className="flex items-center gap-2">
          <MobileSelect
            options={STATUS_OPTIONS}
            value={submission.status || "pending"}
            onChange={val => { onUpdateStatus(submission.id, val); }}
          />
        </div>
        <span className="text-slate-400 text-xs font-bold">{submission.items?.length || 0} items</span>
        {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50 space-y-4">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Items Requested</p>
            <div className="flex flex-wrap gap-2">
              {resolvedItems.map((item, i) => (
                <span key={i} className="bg-white border border-slate-200 rounded-full px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          {submission.size_info && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Size Info</p>
              <p className="text-sm text-slate-700 font-semibold">{submission.size_info}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <StickyNote className="w-3.5 h-3.5" /> Office Notes
            </p>
            <div className="flex gap-2">
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add notes about this order…"
                rows={2}
                className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
              />
              <Button size="sm" onClick={handleSaveNotes} disabled={savingNotes} className="rounded-xl self-end">
                {savingNotes ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}