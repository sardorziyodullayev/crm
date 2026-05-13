import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Role = 'owner' | 'admin' | 'manager' | 'teacher' | 'accountant';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: Role;
  branch: string;
  createdAt: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  setSession: (payload: { user: AuthUser; token: string }) => void;
  updateUser: (patch: Partial<AuthUser>) => void;
  logout: () => void;
  setHydrated: (v: boolean) => void;
}

const DEMO_USER: AuthUser = {
  id: 'usr_001',
  fullName: 'Aziza Karimova',
  email: 'aziza@edura.uz',
  phone: '+998 90 123 45 67',
  avatarUrl: '',
  role: 'owner',
  branch: 'Tashkent · Yunusobod',
  createdAt: '2024-09-12T08:00:00Z',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hydrated: false,
      setSession: ({ user, token }) =>
        set({ user, token, isAuthenticated: true }),
      updateUser: (patch) =>
        set((s) => (s.user ? { user: { ...s.user, ...patch } } : s)),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: 'edura.auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);

export const DEMO_AUTH_USER = DEMO_USER;
