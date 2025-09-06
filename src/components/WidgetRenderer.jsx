// src/components/WidgetRenderer.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Shared consistent color map
const STATUS_COLORS = {
  failed: "#ef4444",        // red
  warning: "#f59e0b",       // yellow
  not_available: "#9ca3af", // gray
  passed: "#22c55e",        // green
  connected: "#3b82f6",     // blue
  not_connected: "#9ca3af", // gray
};

// fallback if not found
const DEFAULT_COLOR = "#6366f1";

export default function WidgetRenderer({ widget }) {
  // DONUT CHART
  if (widget.type === "chart" && widget.chartType === "donut") {
    return (
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={widget.data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={4}
            labelLine={false}
          >
            {widget.data.map((d, idx) => {
              const color =
                STATUS_COLORS[d.type?.toLowerCase()] ||
                STATUS_COLORS[d.name?.toLowerCase().replace(" ", "_")] ||
                DEFAULT_COLOR;
              return <Cell key={idx} fill={color} />;
            })}
          </Pie>
          <Tooltip
            formatter={(value, name) => [value, name]}
            cursor={{ fill: "rgba(0,0,0,0.1)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // BAR CHART
  if (widget.type === "chart" && widget.chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={widget.data}
          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        >
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
          <Bar
            dataKey="value"
            fill={STATUS_COLORS[widget.barColor?.toLowerCase()] || DEFAULT_COLOR}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // PLACEHOLDER WIDGET
  if (widget.type === "placeholder") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        <p className="text-sm">{widget.text || "No data available!"}</p>
      </div>
    );
  }

  // DEFAULT TEXT
  return (
    <p className="text-xs text-gray-600">
      {widget.text || "No data available!"}
    </p>
  );
}
