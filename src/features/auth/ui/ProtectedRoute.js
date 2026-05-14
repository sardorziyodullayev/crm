import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { useAuthStore } from '@shared/store/authStore';
import { SplashScreen } from '@shared/ui/SplashScreen';
export function ProtectedRoute() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const hydrated = useAuthStore((s) => s.hydrated);
    const location = useLocation();
    if (!hydrated)
        return _jsx(SplashScreen, { label: "Restoring your session\u2026" });
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: ROUTES.auth.login, replace: true, state: { from: location } });
    }
    return _jsx(Outlet, {});
}
