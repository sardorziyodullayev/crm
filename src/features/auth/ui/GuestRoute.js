import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { useAuthStore } from '@shared/store/authStore';
import { SplashScreen } from '@shared/ui/SplashScreen';
export function GuestRoute() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const hydrated = useAuthStore((s) => s.hydrated);
    if (!hydrated)
        return _jsx(SplashScreen, { label: "Loading\u2026" });
    if (isAuthenticated)
        return _jsx(Navigate, { to: ROUTES.dashboard, replace: true });
    return _jsx(Outlet, {});
}
