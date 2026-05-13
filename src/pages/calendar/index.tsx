import {
  Badge,
  Box,
  Button,
  Group,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { groupApi } from '@entities/group';
import { queryKeys } from '@shared/api';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

const DAY_MAP: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

export default function CalendarPage() {
  const [cursor, setCursor] = useState(dayjs().startOf('week'));
  const [view, setView] = useState<'week' | 'day'>('week');
  const days = Array.from({ length: 7 }).map((_, i) => cursor.add(i, 'day'));

  const groupsQ = useQuery({
    queryKey: queryKeys.groups.all,
    queryFn: () => groupApi.list({ pageSize: 100 }),
  });

  const sessions = useMemo(() => {
    const list = (groupsQ.data?.data ?? []).filter((g) => g.status === 'active');
    return list.flatMap((g) =>
      g.schedule.days.map((d) => ({
        groupId: g.id,
        groupName: g.name,
        course: g.course,
        room: g.room,
        day: DAY_MAP[d] ?? 0,
        time: g.schedule.time,
      })),
    );
  }, [groupsQ.data]);

  return (
    <Stack gap="lg">
      <PageHeader
        title="Calendar"
        description="Plan classes and operational events."
        actions={
          <Group gap="xs">
            <SegmentedControl
              size="xs"
              data={[
                { label: 'Week', value: 'week' },
                { label: 'Day', value: 'day' },
              ]}
              value={view}
              onChange={(v) => setView(v as 'week' | 'day')}
            />
            <Button
              leftSection={<IconPlus size={14} />}
              size="sm"
              variant="gradient"
              gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
            >
              New event
            </Button>
          </Group>
        }
      />

      <SurfaceCard>
        <Group justify="space-between" mb="md">
          <Group gap="xs">
            <Button
              size="xs"
              variant="default"
              leftSection={<IconChevronLeft size={14} />}
              onClick={() => setCursor((c) => c.subtract(1, 'week'))}
            >
              Prev
            </Button>
            <Button size="xs" variant="default" onClick={() => setCursor(dayjs().startOf('week'))}>
              Today
            </Button>
            <Button
              size="xs"
              variant="default"
              rightSection={<IconChevronRight size={14} />}
              onClick={() => setCursor((c) => c.add(1, 'week'))}
            >
              Next
            </Button>
          </Group>
          <Text fw={700} fz={16}>
            {cursor.format('MMM D')} → {cursor.add(6, 'day').format('MMM D, YYYY')}
          </Text>
        </Group>

        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {days.map((d, i) => (
            <Stack key={i} gap={6}>
              <Stack gap={0} p="sm" style={{
                background: 'var(--app-surface-2)',
                borderRadius: 10,
                border: '1px solid var(--app-border)',
              }}>
                <Text fz={10} c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
                  {d.format('ddd')}
                </Text>
                <Group justify="space-between">
                  <Text fz={20} fw={800}>
                    {d.format('D')}
                  </Text>
                  {d.isSame(dayjs(), 'day') && (
                    <Badge size="xs" variant="filled" color="brand">
                      Today
                    </Badge>
                  )}
                </Group>
              </Stack>
              <Stack gap={6}>
                {sessions
                  .filter((s) => s.day === d.day())
                  .map((s, idx) => (
                    <motion.div
                      key={s.groupId + idx}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: idx * 0.02 }}
                    >
                      <Stack
                        gap={2}
                        p="xs"
                        style={{
                          borderLeft: '3px solid var(--mantine-color-brand-5)',
                          background:
                            'linear-gradient(180deg, rgba(99,102,241,.08), rgba(99,102,241,.02))',
                          borderRadius: 8,
                        }}
                      >
                        <Text fz={11} fw={700} lineClamp={1}>
                          {s.groupName}
                        </Text>
                        <Text fz={10} c="dimmed">
                          {s.time} · {s.room}
                        </Text>
                      </Stack>
                    </motion.div>
                  ))}
              </Stack>
            </Stack>
          ))}
        </Box>
      </SurfaceCard>
    </Stack>
  );
}
