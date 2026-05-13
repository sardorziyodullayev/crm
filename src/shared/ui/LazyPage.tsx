import { Loader, Center } from '@mantine/core';
import { Suspense, type ReactNode } from 'react';

export function LazyPage({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <Center mih="60vh">
          <Loader type="bars" size="md" color="brand.5" />
        </Center>
      }
    >
      {children}
    </Suspense>
  );
}
