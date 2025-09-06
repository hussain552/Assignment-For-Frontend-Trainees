import React from "react";
import useWidgetStore from "../store/useWidgetStore";
import WidgetCard from "./WidgetCard";

export default function Dashboard({ search, onAddWidgetClick }) {
  const data = useWidgetStore((s) => s.data);
  const selected = useWidgetStore((s) => s.selected);

  const anySelected = Object.values(selected).flat().length > 0;

  if (!anySelected) {
    return (
      <div className="h-60 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl shadow-sm">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 mb-3">
          <span className="text-3xl font-bold">+</span>
        </div>
        <p className="text-gray-700 text-sm mb-3">No widgets yet. Add your first one!</p>
        <button
          onClick={onAddWidgetClick}
          className="px-6 py-2.5 rounded-lg bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 shadow-md flex items-center gap-2"
        >
          <span className="text-lg font-normal">+</span> Add Widget
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {data.categories.map((cat) => {
        const selectedIds = selected[cat.id] || [];
        let widgets = selectedIds
          .map((id) => cat.widgets.find((w) => w.id === id))
          .filter(Boolean);

        // Search filter
        if (search.trim()) {
          const searchLower = search.toLowerCase();

          // Check if category name matches search OR any widget matches
          if (!cat.name.toLowerCase().includes(searchLower)) {
            widgets = widgets.filter((w) =>
              w.name.toLowerCase().includes(searchLower)
            );
          }
        }

        if (widgets.length === 0) return null;

        return (
          <section key={cat.id}>
            <h2 className="text-lg font-semibold mb-4">{cat.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {widgets.map((w) => (
                <WidgetCard key={w.id} widget={w} categoryId={cat.id} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
