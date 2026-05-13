import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconDots, IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

import { mockTasks, queryKeys, type SeedTask } from '@shared/api';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

const COLUMNS: { id: SeedTask['status']; label: string }[] = [
  { id: 'todo', label: 'To do' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

export default function TasksPage() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: queryKeys.tasks.all, queryFn: () => mockTasks.list() });

  const move = useMutation({
    mutationFn: ({ id, status }: { id: string; status: SeedTask['status'] }) =>
      mockTasks.updateStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: queryKeys.tasks.all });
      const prev = qc.getQueryData<SeedTask[]>(queryKeys.tasks.all);
      qc.setQueryData<SeedTask[]>(queryKeys.tasks.all, (old) =>
        (old ?? []).map((t) => (t.id === id ? { ...t, status } : t)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(queryKeys.tasks.all, ctx.prev),
    onSuccess: () =>
      notifications.show({ title: 'Task updated', message: 'Status changed', color: 'brand' }),
  });

  return (
    <Stack gap="lg" h="100%">
      <PageHeader
        title="Tasks"
        description="Operational task board for your team."
        actions={
          <Button
            leftSection={<IconPlus size={14} />}
            size="sm"
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            New task
          </Button>
        }
      />
      <ScrollArea offsetScrollbars scrollbarSize={6}>
        <Group align="flex-start" gap="md" wrap="nowrap" pb="md">
          {COLUMNS.map((col) => {
            const items = (query.data ?? []).filter((t) => t.status === col.id);
            return (
              <Stack key={col.id} gap="sm" w={300} miw={300}>
                <Group justify="space-between" px="xs">
                  <Text fw={700} fz={13}>
                    {col.label}
                  </Text>
                  <Badge size="xs" variant="light" radius="sm">
                    {items.length}
                  </Badge>
                </Group>
                <Stack
                  gap="xs"
                  p="xs"
                  style={{
                    background: 'var(--app-surface-2)',
                    border: '1px solid var(--app-border)',
                    borderRadius: 14,
                    minHeight: 200,
                  }}
                >
                  {items.length === 0 ? (
                    <Box py="md" ta="center">
                      <Text fz={12} c="dimmed">
                        Drop tasks here
                      </Text>
                    </Box>
                  ) : (
                    items.map((t, i) => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, delay: i * 0.02 }}
                      >
                        <SurfaceCard padding="md" hover>
                          <Stack gap="xs">
                            <Group justify="space-between" align="flex-start">
                              <Stack gap={2} style={{ minWidth: 0 }}>
                                <Text fz={13} fw={700} lineClamp={2}>
                                  {t.title}
                                </Text>
                                <Text fz={11} c="dimmed" lineClamp={2}>
                                  {t.description}
                                </Text>
                              </Stack>
                              <Menu position="bottom-end">
                                <Menu.Target>
                                  <ActionIcon variant="subtle" size="sm" color="gray">
                                    <IconDots size={14} />
                                  </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                  <Menu.Label>Move to</Menu.Label>
                                  {COLUMNS.filter((c) => c.id !== t.status).map((c) => (
                                    <Menu.Item
                                      key={c.id}
                                      onClick={() => move.mutate({ id: t.id, status: c.id })}
                                    >
                                      {c.label}
                                    </Menu.Item>
                                  ))}
                                </Menu.Dropdown>
                              </Menu>
                            </Group>
                            <Group gap={6}>
                              <StatusBadge status={t.priority} />
                              {t.tags.map((tag) => (
                                <Badge key={tag} variant="light" radius="sm" color="gray">
                                  {tag}
                                </Badge>
                              ))}
                            </Group>
                            <Group gap={6} c="dimmed" fz={11}>
                              <IconCalendar size={12} />
                              {dayjs(t.dueDate).format('MMM D')}
                            </Group>
                          </Stack>
                        </SurfaceCard>
                      </motion.div>
                    ))
                  )}
                </Stack>
              </Stack>
            );
          })}
        </Group>
      </ScrollArea>
    </Stack>
  );
}
