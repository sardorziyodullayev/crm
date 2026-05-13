import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { useAuthStore } from '@shared/store/authStore';
import { SplashScreen } from '@shared/ui/SplashScreen';

export function GuestRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrated = useAuthStore((s) => s.hydrated);

  if (!hydrated) return <SplashScreen label="Loading…" />;
  if (isAuthenticated) return <Navigate to={ROUTES.dashboard} replace />;
  return <Outlet />;
}
