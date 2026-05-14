import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            retry: (failureCount, error) => {
                const status = typeof error === 'object' && error && 'status' in error
                    ? Number(error.status)
                    : 0;
                if (status === 401 || status === 403 || status === 404)
                    return false;
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
        me: ['auth', 'me'],
    },
    students: {
        all: ['students'],
        list: (params) => ['students', 'list', params],
        byId: (id) => ['students', id],
    },
    groups: {
        all: ['groups'],
        list: (params) => ['groups', 'list', params],
        byId: (id) => ['groups', id],
    },
    teachers: {
        all: ['teachers'],
        list: (params) => ['teachers', 'list', params],
        byId: (id) => ['teachers', id],
    },
    payments: {
        all: ['payments'],
        list: (params) => ['payments', 'list', params],
        stats: ['payments', 'stats'],
    },
    leads: {
        all: ['leads'],
        funnel: ['leads', 'funnel'],
    },
    attendance: {
        byGroup: (groupId, month) => ['attendance', groupId, month],
    },
    tasks: {
        all: ['tasks'],
    },
    calendar: {
        events: (range) => ['calendar', range],
    },
    notifications: ['notifications'],
    dashboard: {
        summary: ['dashboard', 'summary'],
        revenue: ['dashboard', 'revenue'],
        growth: ['dashboard', 'growth'],
        sources: ['dashboard', 'sources'],
        activity: ['dashboard', 'activity'],
    },
    reports: {
        overview: (range) => ['reports', 'overview', range],
    },
    activity: ['activity'],
};
