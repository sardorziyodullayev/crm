import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export const useUIStore = create()(persist((set) => ({
    sidebarCollapsed: false,
    mobileNavOpen: false,
    commandPaletteOpen: false,
    toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    setSidebar: (v) => set({ sidebarCollapsed: v }),
    openMobileNav: () => set({ mobileNavOpen: true }),
    closeMobileNav: () => set({ mobileNavOpen: false }),
    setCommandPalette: (commandPaletteOpen) => set({ commandPaletteOpen }),
}), {
    name: 'edura.ui',
    storage: createJSONStorage(() => localStorage),
    partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }),
}));
