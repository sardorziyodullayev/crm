import { Avatar, Box, Group, Skeleton, Stack, Text } from '@mantine/core';
import { motion } from 'framer-motion';

import { initials } from '@shared/lib/format';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  when: string;
  kind: 'create' | 'update' | 'delete' | 'login' | 'export';
}

const KIND_DOT: Record<ActivityItem['kind'], string> = {
  create: '#34d399',
  update: '#60a5fa',
  delete: '#f12648',
  login: '#a78bfa',
  export: '#ffac1a',
};

export function LiveActivityFeed({
  items,
  loading,
}: {
  items: ActivityItem[];
  loading?: boolean;
}) {
  return (
    <SurfaceCard h="100%">
      <Group justify="space-between" mb="md">
        <Stack gap={2}>
          <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
            Activity feed
          </Text>
          <Text fz={16} fw={700}>
            Latest events across your workspace
          </Text>
        </Stack>
      </Group>
      <Stack gap="md">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Group key={i} gap="sm">
                <Skeleton h={36} w={36} radius="xl" />
                <Stack gap={4} style={{ flex: 1 }}>
                  <Skeleton h={10} w="40%" />
                  <Skeleton h={10} w="65%" />
                </Stack>
              </Group>
            ))
          : items.map((it, i) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <Group gap="sm" wrap="nowrap" align="flex-start">
                  <Box pos="relative">
                    <Avatar size={36} radius="xl" color="brand" variant="light">
                      {initials(it.actor)}
                    </Avatar>
                    <Box
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: KIND_DOT[it.kind],
                        border: '2px solid var(--app-surface)',
                      }}
                    />
                  </Box>
                  <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                    <Text fz={14}>
                      <Text span fw={600}>
                        {it.actor}
                      </Text>{' '}
                      <Text span c="dimmed">
                        {it.action}
                      </Text>{' '}
                      <Text span fw={600}>
                        {it.target}
                      </Text>
                    </Text>
                    <Text fz={11} c="dimmed">
                      {it.when}
                    </Text>
                  </Stack>
                </Group>
              </motion.div>
            ))}
      </Stack>
    </SurfaceCard>
  );
}
