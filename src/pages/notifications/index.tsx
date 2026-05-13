import { Badge, Box, Button, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import {
  IconBell,
  IconCash,
  IconChecks,
  IconSpeakerphone,
  IconUserCheck,
  IconUserPlus,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

import { mockNotifications, queryKeys } from '@shared/api';
import { fromNow } from '@shared/lib/format';
import {
  useNotificationStore,
  type AppNotification,
  type NotificationKind,
} from '@shared/store/notificationStore';
import { EmptyState } from '@shared/ui/EmptyState';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

const ICONS: Record<NotificationKind, React.ReactNode> = {
  payment: <IconCash size={16} />,
  lead: <IconUserPlus size={16} />,
  attendance: <IconUserCheck size={16} />,
  system: <IconSpeakerphone size={16} />,
  mention: <IconBell size={16} />,
};
const COLORS: Record<NotificationKind, string> = {
  payment: 'success',
  lead: 'brand',
  attendance: 'warning',
  system: 'gray',
  mention: 'accent',
};

export default function NotificationsPage() {
  const setItems = useNotificationStore((s) => s.setItems);
  const items = useNotificationStore((s) => s.items);
  const markAllRead = useNotificationStore((s) => s.markAllRead);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => mockNotifications.list(),
  });

  useEffect(() => {
    if (data) setItems(data as AppNotification[]);
  }, [data, setItems]);

  return (
    <Stack gap="lg">
      <PageHeader
        title="Notifications"
        description="System events and updates from your workspace."
        actions={
          <Button
            leftSection={<IconChecks size={14} />}
            variant="light"
            size="sm"
            onClick={markAllRead}
          >
            Mark all as read
          </Button>
        }
      />
      {isLoading ? (
        <Stack gap="sm">
          {Array.from({ length: 6 }).map((_, i) => (
            <Box
              key={i}
              h={80}
              style={{ background: 'var(--app-surface-2)', borderRadius: 12, opacity: 0.6 }}
            />
          ))}
        </Stack>
      ) : items.length === 0 ? (
        <EmptyState title="You're all caught up" description="No new notifications" />
      ) : (
        <Stack gap="sm">
          {items.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
            >
              <SurfaceCard padding="lg" style={{ background: n.read ? undefined : 'var(--app-surface-2)' }}>
                <Group justify="space-between" wrap="nowrap" align="flex-start">
                  <Group gap="md" wrap="nowrap" align="flex-start">
                    <ThemeIcon variant="light" radius="md" size={40} color={COLORS[n.kind]}>
                      {ICONS[n.kind]}
                    </ThemeIcon>
                    <Stack gap={4}>
                      <Group gap={6}>
                        <Text fw={700} fz={14}>{n.title}</Text>
                        {!n.read && <Badge variant="dot" color="brand" size="xs">New</Badge>}
                      </Group>
                      <Text fz={13} c="dimmed">{n.description}</Text>
                      <Text fz={11} c="dimmed">{fromNow(n.createdAt)}</Text>
                    </Stack>
                  </Group>
                </Group>
              </SurfaceCard>
            </motion.div>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
