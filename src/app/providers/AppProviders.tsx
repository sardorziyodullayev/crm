import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { queryClient } from '@shared/api/queryClient';
import { useThemeStore } from '@shared/store/themeStore';

import { theme, cssVariablesResolver } from '../theme/theme';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/spotlight/styles.css';
import 'mantine-react-table/styles.css';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const colorScheme = useThemeStore((s) => s.colorScheme);

  return (
    <ErrorBoundary>
      <MantineProvider
        theme={theme}
        defaultColorScheme="dark"
        forceColorScheme={colorScheme}
        cssVariablesResolver={cssVariablesResolver}
      >
        <DatesProvider settings={{ locale: 'en', firstDayOfWeek: 1, weekendDays: [0, 6] }}>
          <ModalsProvider>
            <QueryClientProvider client={queryClient}>
              <Notifications position="top-right" zIndex={3000} limit={5} autoClose={4000} />
              <NavigationProgress />
              {children}
            </QueryClientProvider>
          </ModalsProvider>
        </DatesProvider>
      </MantineProvider>
    </ErrorBoundary>
  );
}
