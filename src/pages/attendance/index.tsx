import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconClock, IconNote, IconX } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import { groupApi } from '@entities/group';
import { studentApi } from '@entities/student';
import { mockAttendance, queryKeys, type SeedAttendance } from '@shared/api';
import { initials } from '@shared/lib/format';
import { EmptyState } from '@shared/ui/EmptyState';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

const STATUS_OPTIONS: SeedAttendance['records'][number]['status'][] = [
  'present',
  'late',
  'absent',
  'excused',
];

const STATUS_COLORS: Record<SeedAttendance['records'][number]['status'], string> = {
  present: 'teal',
  late: 'yellow',
  absent: 'red',
  excused: 'gray',
};

export default function AttendancePage() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const [groupsQ, studentsQ] = useQueries({
    queries: [
      { queryKey: queryKeys.groups.all, queryFn: () => groupApi.list({ pageSize: 100 }) },
      { queryKey: queryKeys.students.all, queryFn: () => studentApi.list({ pageSize: 300 }) },
    ],
  });

  useEffect(() => {
    if (!selectedGroup && groupsQ.data?.data[0]) {
      setSelectedGroup(groupsQ.data.data[0].id);
    }
  }, [groupsQ.data, selectedGroup]);

  const attendanceQ = useQueries({
    queries: selectedGroup
      ? [
          {
            queryKey: queryKeys.attendance.byGroup(selectedGroup, dayjs().format('YYYY-MM')),
            queryFn: () => mockAttendance.byGroup(selectedGroup),
          },
        ]
      : [],
  });

  const sheets = attendanceQ[0]?.data ?? [];

  const studentMap = useMemo(() => {
    const m = new Map<string, { name: string; avatar?: string }>();
    studentsQ.data?.data.forEach((s) => m.set(s.id, { name: s.fullName, avatar: s.avatarUrl }));
    return m;
  }, [studentsQ.data]);

  const today = sheets.find((s) => s.date === dayjs().format('YYYY-MM-DD')) ?? sheets[0];

  return (
    <Stack gap="lg">
      <PageHeader
        title="Attendance"
        description="Mark and review attendance per cohort."
        actions={
          <Button size="sm" variant="gradient" gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}>
            Save changes
          </Button>
        }
      />

      <Group gap="md" wrap="wrap">
        <Select
          label="Group"
          placeholder="Pick a group"
          data={(groupsQ.data?.data ?? []).map((g) => ({ value: g.id, label: g.name }))}
          value={selectedGroup}
          onChange={setSelectedGroup}
          searchable
          maw={360}
        />
        <Select
          label="Month"
          data={['September', 'October', 'November', 'December']}
          defaultValue="October"
          maw={200}
        />
      </Group>

      {!today ? (
        <EmptyState
          title="No attendance data for this group yet"
          description="Pick another group or create a session in the schedule."
          icon={<IconClock size={28} />}
        />
      ) : (
        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
          <Box style={{ gridColumn: 'span 2' }}>
            <SurfaceCard>
              <Group justify="space-between" mb="md">
                <Stack gap={2}>
                  <Text fz={12} c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
                    Today's roster
                  </Text>
                  <Text fz={16} fw={700}>
                    {dayjs(today.date).format('dddd · MMM D, YYYY')}
                  </Text>
                </Stack>
                <Group gap="xs">
                  <Badge color="teal" variant="light">
                    {today.records.filter((r) => r.status === 'present').length} present
                  </Badge>
                  <Badge color="red" variant="light">
                    {today.records.filter((r) => r.status === 'absent').length} absent
                  </Badge>
                  <Badge color="yellow" variant="light">
                    {today.records.filter((r) => r.status === 'late').length} late
                  </Badge>
                </Group>
              </Group>
              <Stack gap="xs">
                {today.records.map((r, i) => {
                  const s = studentMap.get(r.studentId);
                  return (
                    <motion.div
                      key={r.studentId}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                    >
                      <Group
                        justify="space-between"
                        p="sm"
                        style={{
                          border: '1px solid var(--app-border)',
                          borderRadius: 12,
                        }}
                      >
                        <Group gap="sm">
                          <Avatar size={32} radius="xl" color="brand" variant="light">
                            {initials(s?.name ?? '?')}
                          </Avatar>
                          <Text fz={14} fw={600}>
                            {s?.name ?? r.studentId}
                          </Text>
                        </Group>
                        <Group gap={6}>
                          {STATUS_OPTIONS.map((opt) => (
                            <Tooltip key={opt} label={opt}>
                              <ActionIcon
                                size="lg"
                                radius="md"
                                variant={r.status === opt ? 'filled' : 'subtle'}
                                color={STATUS_COLORS[opt]}
                              >
                                {opt === 'present' && <IconCheck size={14} />}
                                {opt === 'late' && <IconClock size={14} />}
                                {opt === 'absent' && <IconX size={14} />}
                                {opt === 'excused' && <IconNote size={14} />}
                              </ActionIcon>
                            </Tooltip>
                          ))}
                        </Group>
                      </Group>
                    </motion.div>
                  );
                })}
              </Stack>
            </SurfaceCard>
          </Box>
          <SurfaceCard>
            <Stack gap="md">
              <Stack gap={2}>
                <Text fz={12} c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
                  Calendar
                </Text>
                <Text fz={16} fw={700}>
                  Recent sessions
                </Text>
              </Stack>
              <Stack gap="xs">
                {sheets.slice(0, 8).map((s) => {
                  const present = s.records.filter((r) => r.status === 'present').length;
                  const pct = Math.round((present / Math.max(1, s.records.length)) * 100);
                  return (
                    <Group key={s.date} justify="space-between" gap="md">
                      <Stack gap={2}>
                        <Text fz={13} fw={600}>
                          {dayjs(s.date).format('ddd · MMM D')}
                        </Text>
                        <Text fz={11} c="dimmed">
                          {present} / {s.records.length} present
                        </Text>
                      </Stack>
                      <Badge variant="light" color={pct >= 90 ? 'teal' : pct >= 70 ? 'yellow' : 'red'}>
                        {pct}%
                      </Badge>
                    </Group>
                  );
                })}
              </Stack>
            </Stack>
          </SurfaceCard>
        </SimpleGrid>
      )}
    </Stack>
  );
}
