import { create } from 'zustand';
export const useModalStore = create((set) => ({
    open: {},
    show: (key, payload) => set((s) => ({ open: { ...s.open, [key]: payload ?? true } })),
    hide: (key) => set((s) => {
        const next = { ...s.open };
        delete next[key];
        return { open: next };
    }),
    hideAll: () => set({ open: {} }),
}));
