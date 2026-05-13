import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: (failureCount, error: unknown) => {
        const status =
          typeof error === 'object' && error && 'status' in error
            ? Number((error as { status: unknown }).status)
            : 0;
        if (status === 401 || status === 403 || status === 404) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  students: {
    all: ['students'] as const,
    list: (params: unknown) => ['students', 'list', params] as const,
    byId: (id: string) => ['students', id] as const,
  },
  groups: {
    all: ['groups'] as const,
    list: (params: unknown) => ['groups', 'list', params] as const,
    byId: (id: string) => ['groups', id] as const,
  },
  teachers: {
    all: ['teachers'] as const,
    list: (params: unknown) => ['teachers', 'list', params] as const,
    byId: (id: string) => ['teachers', id] as const,
  },
  payments: {
    all: ['payments'] as const,
    list: (params: unknown) => ['payments', 'list', params] as const,
    stats: ['payments', 'stats'] as const,
  },
  leads: {
    all: ['leads'] as const,
    funnel: ['leads', 'funnel'] as const,
  },
  attendance: {
    byGroup: (groupId: string, month: string) =>
      ['attendance', groupId, month] as const,
  },
  tasks: {
    all: ['tasks'] as const,
  },
  calendar: {
    events: (range: string) => ['calendar', range] as const,
  },
  notifications: ['notifications'] as const,
  dashboard: {
    summary: ['dashboard', 'summary'] as const,
    revenue: ['dashboard', 'revenue'] as const,
    growth: ['dashboard', 'growth'] as const,
    sources: ['dashboard', 'sources'] as const,
    activity: ['dashboard', 'activity'] as const,
  },
  reports: {
    overview: (range: string) => ['reports', 'overview', range] as const,
  },
  activity: ['activity'] as const,
};
