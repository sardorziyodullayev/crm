import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconBell,
  IconCash,
  IconCheck,
  IconExternalLink,
  IconSpeakerphone,
  IconUserCheck,
  IconUserPlus,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockNotifications, queryKeys } from '@shared/api';
import {
  useNotificationStore,
  type AppNotification,
  type NotificationKind,
} from '@shared/store/notificationStore';
import { fromNow } from '@shared/lib/format';
import { EmptyState } from '@shared/ui/EmptyState';

interface NotificationDrawerProps {
  opened: boolean;
  onClose: () => void;
}

const ICONS: Record<NotificationKind, ReactNode> = {
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

export function NotificationDrawer({ opened, onClose }: NotificationDrawerProps) {
  const setItems = useNotificationStore((s) => s.setItems);
  const items = useNotificationStore((s) => s.items);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => mockNotifications.list(),
  });

  useEffect(() => {
    if (data) setItems(data as AppNotification[]);
  }, [data, setItems]);

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size={440}
      withCloseButton={false}
      padding={0}
      styles={{
        content: { background: 'var(--app-bg-elevated)' },
      }}
    >
      <Group justify="space-between" px="lg" py="md" style={{ borderBottom: '1px solid var(--app-border)' }}>
        <Group gap="xs">
          <Text fw={700} fz={16}>Notifications</Text>
          <Badge variant="light" color="brand">
            {items.filter((i) => !i.read).length} new
          </Badge>
        </Group>
        <Button size="xs" variant="subtle" onClick={markAllRead}>
          Mark all read
        </Button>
      </Group>
      <ScrollArea h="calc(100vh - 64px)" scrollbarSize={6}>
        {isLoading ? (
          <Stack p="lg" gap="sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={i}
                h={70}
                style={{
                  background: 'var(--app-surface-2)',
                  borderRadius: 12,
                  opacity: 0.6,
                }}
              />
            ))}
          </Stack>
        ) : items.length === 0 ? (
          <EmptyState title="You're all caught up" description="No new notifications" />
        ) : (
          <Stack p="lg" gap="xs">
            {items.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
              >
                <Group
                  align="flex-start"
                  gap="sm"
                  wrap="nowrap"
                  p="md"
                  style={{
                    border: '1px solid var(--app-border)',
                    background: n.read ? 'transparent' : 'var(--app-surface-2)',
                    borderRadius: 12,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    markRead(n.id);
                    if (n.href) navigate(n.href);
                    onClose();
                  }}
                >
                  <ThemeIcon
                    color={COLORS[n.kind]}
                    variant="light"
                    radius="md"
                    size={36}
                  >
                    {ICONS[n.kind]}
                  </ThemeIcon>
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between" gap="xs" wrap="nowrap">
                      <Text fw={600} fz={14} lineClamp={1}>
                        {n.title}
                      </Text>
                      {!n.read && (
                        <Box
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: 'var(--mantine-color-brand-5)',
                            flex: '0 0 auto',
                          }}
                        />
                      )}
                    </Group>
                    <Text fz={13} c="dimmed" lineClamp={2}>
                      {n.description}
                    </Text>
                    <Group justify="space-between" mt={4}>
                      <Text fz={11} c="dimmed">
                        {fromNow(n.createdAt)}
                      </Text>
                      {n.href && (
                        <ActionIcon size="xs" variant="subtle" color="gray">
                          <IconExternalLink size={12} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Box>
                </Group>
              </motion.div>
            ))}
            <Group justify="center" py="md">
              <ThemeIcon variant="light" color="success" size={28} radius="xl">
                <IconCheck size={14} />
              </ThemeIcon>
              <Text size="xs" c="dimmed">
                Synced just now
              </Text>
            </Group>
          </Stack>
        )}
      </ScrollArea>
    </Drawer>
  );
}
