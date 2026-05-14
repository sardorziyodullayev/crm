import { create } from 'zustand';
export const useNotificationStore = create((set) => ({
    items: [],
    unread: 0,
    setItems: (items) => set({ items, unread: items.filter((i) => !i.read).length }),
    add: (n) => set((s) => {
        const items = [n, ...s.items].slice(0, 60);
        return { items, unread: items.filter((i) => !i.read).length };
    }),
    markRead: (id) => set((s) => {
        const items = s.items.map((i) => (i.id === id ? { ...i, read: true } : i));
        return { items, unread: items.filter((i) => !i.read).length };
    }),
    markAllRead: () => set((s) => ({
        items: s.items.map((i) => ({ ...i, read: true })),
        unread: 0,
    })),
}));
