import { create } from "zustand";
import { initialData } from "../data/widgets";

const PERSIST_KEY = "frontend_dashboard_v1";

const useWidgetStore = create((set, get) => ({
  data: initialData,
  selected: {},

  toggleWidget: (categoryId, widgetId) => {
    const selected = { ...get().selected };
    const current = selected[categoryId] || [];

    if (current.includes(widgetId)) {
      selected[categoryId] = current.filter((id) => id !== widgetId);
    } else {
      selected[categoryId] = [...current, widgetId];
    }

    set({ selected });
  },

  resetWidgets: () => set({ selected: {} }),
}));

export default useWidgetStore;
