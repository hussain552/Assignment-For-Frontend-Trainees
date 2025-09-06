// src/components/WidgetCard.jsx
import React from "react";
import useWidgetStore from "../store/useWidgetStore";
import WidgetRenderer from "./WidgetRenderer";

// Shared consistent color map
const STATUS_COLORS = {
  failed: "#ef4444",        // red
  warning: "#f59e0b",       // yellow
  not_available: "#9ca3af", // gray
  passed: "#22c55e",        // green
  connected: "#3b82f6",     // blue
  not_connected: "#9ca3af", // gray
};

const DEFAULT_COLOR = "#6366f1";

export default function WidgetCard({ widget, categoryId }) {
  const toggleWidget = useWidgetStore((s) => s.toggleWidget);

  return (
    <div className="relative bg-white rounded-xl p-5 shadow-md border border-gray-100 h-60 flex flex-col">
      {/* Remove button */}
      <button
        onClick={() => toggleWidget(categoryId, widget.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg"
        aria-label="Remove widget"
      >
        ✕
      </button>

      {/* Widget title */}
      <h3 className="font-semibold text-sm mb-3 truncate">{widget.name}</h3>

      {/* Content: Left chart, Right summary */}
      <div className="flex flex-1 gap-4">
        {/* Left: Chart */}
        <div className="flex-1 flex items-center justify-center">
          <WidgetRenderer widget={widget} />
        </div>

        {/* Right: Summary */}
        <ol className="flex flex-col justify-center text-xs text-gray-600 space-y-1 ml-2">
          {widget.data &&
            widget.data.map((d, idx) => {
              const color =
                STATUS_COLORS[d.type?.toLowerCase()] ||
                STATUS_COLORS[d.name?.toLowerCase().replace(" ", "_")] ||
                DEFAULT_COLOR;

              return (
                <li key={idx} className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-semibold">
                    {d.name}: {d.value}
                  </span>
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}
