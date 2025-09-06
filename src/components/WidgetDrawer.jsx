import React, { useState, useEffect } from "react";
import useWidgetStore from "../store/useWidgetStore";

export default function WidgetDrawer({ isOpen, onClose }) {
  const data = useWidgetStore((s) => s.data);
  const selected = useWidgetStore((s) => s.selected);
  const toggleWidget = useWidgetStore((s) => s.toggleWidget);
  const resetWidgets = useWidgetStore((s) => s.resetWidgets);

  const [activeTab, setActiveTab] = useState(data?.categories?.[0]?.id || "");

  useEffect(() => {
    if (!activeTab && data?.categories?.length > 0) {
      setActiveTab(data.categories[0].id);
    }
  }, [data, activeTab]);

  if (!isOpen) return null;

  const activeCategory = data.categories.find((cat) => cat.id === activeTab);

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300">
      <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Add Widget</h2>
        <button onClick={onClose} className="text-white text-xl font-bold">✕</button>
      </div>

      <div className="flex border-b border-gray-200 px-4">
        {data.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === cat.id ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex-1 px-4 overflow-y-auto space-y-3 py-3">
        {activeCategory?.widgets?.map((w) => {
          const isSelected = selected[activeCategory.id]?.includes(w.id);
          return (
            <div key={w.id} className="flex items-center p-2 border rounded hover:bg-gray-50">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleWidget(activeCategory.id, w.id)}
                className="h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">{w.name}</span>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          onClick={resetWidgets}
          className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
