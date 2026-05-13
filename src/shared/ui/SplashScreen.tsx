import { Loader, Stack, Text } from '@mantine/core';
import { motion } from 'framer-motion';

export function SplashScreen({ label = 'Loading workspace…' }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--app-bg)',
        backgroundImage: 'var(--app-hero-gradient)',
      }}
    >
      <Stack align="center" gap="md">
        <Loader size="lg" type="dots" color="brand.5" />
        <Text c="dimmed" size="sm">
          {label}
        </Text>
      </Stack>
    </motion.div>
  );
}
