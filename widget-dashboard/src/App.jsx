import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import WidgetDrawer from "./components/WidgetDrawer";

export default function App() {
  const [search, setSearch] = useState("");       // ✅ search state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddWidgetClick = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Top bar: Add Widget button + optional search */}
      <div className="flex justify-between mb-6 items-center">
        <input
          type="text"
          placeholder="Search widgets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full max-w-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleAddWidgetClick}
          className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2"
        >
          Add Widget
        </button>
      </div>

      {/* Dashboard */}
      <Dashboard search={search} onAddWidgetClick={handleAddWidgetClick} />

      {/* Widget Drawer */}
      <WidgetDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
}
