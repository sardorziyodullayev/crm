import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export const useThemeStore = create()(persist((set) => ({
    colorScheme: 'dark',
    density: 'comfortable',
    language: 'en',
    toggleScheme: () => set((s) => ({ colorScheme: s.colorScheme === 'dark' ? 'light' : 'dark' })),
    setScheme: (colorScheme) => set({ colorScheme }),
    setDensity: (density) => set({ density }),
    setLanguage: (language) => set({ language }),
}), {
    name: 'edura.theme',
    storage: createJSONStorage(() => localStorage),
}));
