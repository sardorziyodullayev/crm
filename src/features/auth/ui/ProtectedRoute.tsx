import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { useAuthStore } from '@shared/store/authStore';
import { SplashScreen } from '@shared/ui/SplashScreen';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrated = useAuthStore((s) => s.hydrated);
  const location = useLocation();

  if (!hydrated) return <SplashScreen label="Restoring your session…" />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.auth.login} replace state={{ from: location }} />;
  }
  return <Outlet />;
}
