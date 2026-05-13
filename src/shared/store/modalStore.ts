import { create } from 'zustand';

export type ModalKey =
  | 'student.create'
  | 'student.edit'
  | 'group.create'
  | 'payment.create'
  | 'lead.create'
  | 'task.create'
  | 'invite.user';

interface ModalState {
  open: Partial<Record<ModalKey, unknown>>;
  show: <T = unknown>(key: ModalKey, payload?: T) => void;
  hide: (key: ModalKey) => void;
  hideAll: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: {},
  show: (key, payload) => set((s) => ({ open: { ...s.open, [key]: payload ?? true } })),
  hide: (key) =>
    set((s) => {
      const next = { ...s.open };
      delete next[key];
      return { open: next };
    }),
  hideAll: () => set({ open: {} }),
}));
