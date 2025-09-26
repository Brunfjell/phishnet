import { create } from "zustand";

export const useSimulationStore = create((set) => ({
  campaigns: [],
  activeSimulation: null,
  setCampaigns: (campaigns) => set({ campaigns }),
  setActiveSimulation: (simulation) => set({ activeSimulation: simulation }),
}));
