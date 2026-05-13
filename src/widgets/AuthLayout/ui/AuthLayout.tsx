import { Box, Center, Group, Stack, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

import { BrandLogo } from '@shared/ui/BrandLogo';

export function AuthLayout() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        background: 'var(--app-bg)',
      }}
    >
      <Box style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
        {/* Marketing column */}
        <Box
          visibleFrom="md"
          style={{
            position: 'relative',
            background:
              'radial-gradient(800px 500px at 0% 0%, rgba(99,102,241,.45), transparent 60%), radial-gradient(800px 600px at 100% 100%, rgba(168,85,247,.35), transparent 60%), #0a0d1c',
            color: '#e6e9f2',
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <BrandLogo />
          <Stack mt="auto" gap="lg" maw={480}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Text fz={36} fw={800} style={{ letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                Run a modern <br />
                educational center —{' '}
                <span className="app-gradient-text">in one workspace.</span>
              </Text>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Text c="dimmed" fz={15} style={{ lineHeight: 1.55 }}>
                Edura unifies students, groups, attendance, payments and a lead funnel —
                with Telegram bot integration trusted by 800+ centers across Uzbekistan.
              </Text>
            </motion.div>
            <Group gap="xl" mt="md">
              <Stack gap={2}>
                <Text fz={28} fw={800} className="app-gradient-text">
                  98%
                </Text>
                <Text fz={12} c="dimmed">
                  Retention after Q1
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text fz={28} fw={800} className="app-gradient-text">
                  4.9/5
                </Text>
                <Text fz={12} c="dimmed">
                  Center owner rating
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text fz={28} fw={800} className="app-gradient-text">
                  60+
                </Text>
                <Text fz={12} c="dimmed">
                  Cities, UZ + KZ
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Box>

        {/* Form column */}
        <Center p="md">
          <Box w="100%" maw={420}>
            <Box hiddenFrom="md" mb="lg">
              <BrandLogo />
            </Box>
            <Outlet />
          </Box>
        </Center>
      </Box>
    </Box>
  );
}
