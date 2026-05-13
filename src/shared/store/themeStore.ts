import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ColorScheme = 'light' | 'dark';

interface ThemeState {
  colorScheme: ColorScheme;
  density: 'comfortable' | 'compact';
  language: 'en' | 'uz' | 'ru';
  toggleScheme: () => void;
  setScheme: (s: ColorScheme) => void;
  setDensity: (d: 'comfortable' | 'compact') => void;
  setLanguage: (l: 'en' | 'uz' | 'ru') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: 'dark',
      density: 'comfortable',
      language: 'en',
      toggleScheme: () =>
        set((s) => ({ colorScheme: s.colorScheme === 'dark' ? 'light' : 'dark' })),
      setScheme: (colorScheme) => set({ colorScheme }),
      setDensity: (density) => set({ density }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'edura.theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
