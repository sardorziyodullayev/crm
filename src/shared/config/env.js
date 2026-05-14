export const ENV = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
    socketUrl: import.meta.env.VITE_SOCKET_URL ?? '',
    useMock: (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true',
    appName: import.meta.env.VITE_APP_NAME ?? 'Edura',
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
};
