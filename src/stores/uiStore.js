import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      theme: "light",
      modalOpen: false,
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setModalOpen: (isOpen) => set({ modalOpen: isOpen }),
    }),
    { name: "ui-store" } 
  )
);
