import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { router } from './router/router';
const ReactQueryDevtools = lazy(() => import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools })));
export function App() {
    useEffect(() => {
        const splash = document.querySelector('.app-splash');
        if (splash)
            splash.remove();
    }, []);
    return (_jsxs(AppProviders, { children: [_jsx(RouterProvider, { router: router }), import.meta.env.DEV && (_jsx(Suspense, { fallback: null, children: _jsx(ReactQueryDevtools, { initialIsOpen: false, buttonPosition: "bottom-left" }) }))] }));
}
