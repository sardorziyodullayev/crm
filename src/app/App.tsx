import { lazy, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProviders } from './providers/AppProviders';
import { router } from './router/router';

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools })),
);

export function App() {
  useEffect(() => {
    const splash = document.querySelector('.app-splash');
    if (splash) splash.remove();
  }, []);

  return (
    <AppProviders>
      <RouterProvider router={router} />
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </Suspense>
      )}
    </AppProviders>
  );
}
