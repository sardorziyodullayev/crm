import { create } from 'zustand';

export type NotificationKind = 'lead' | 'payment' | 'attendance' | 'system' | 'mention';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  href?: string;
}

interface NotificationState {
  items: AppNotification[];
  unread: number;
  setItems: (items: AppNotification[]) => void;
  add: (n: AppNotification) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  items: [],
  unread: 0,
  setItems: (items) => set({ items, unread: items.filter((i) => !i.read).length }),
  add: (n) =>
    set((s) => {
      const items = [n, ...s.items].slice(0, 60);
      return { items, unread: items.filter((i) => !i.read).length };
    }),
  markRead: (id) =>
    set((s) => {
      const items = s.items.map((i) => (i.id === id ? { ...i, read: true } : i));
      return { items, unread: items.filter((i) => !i.read).length };
    }),
  markAllRead: () =>
    set((s) => ({
      items: s.items.map((i) => ({ ...i, read: true })),
      unread: 0,
    })),
}));
