import {
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Progress,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconPlus, IconSearch, IconUsers } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { groupApi, type Group as GroupModel, type GroupStatus } from '@entities/group';
import { teacherApi } from '@entities/teacher';
import { queryKeys } from '@shared/api';
import { formatDate, formatUZS, initials } from '@shared/lib/format';
import { EmptyState } from '@shared/ui/EmptyState';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

const STATUSES: { value: GroupStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'planned', label: 'Planned' },
  { value: 'completed', label: 'Completed' },
];

export default function GroupsPage() {
  const [status, setStatus] = useState<GroupStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const [groupsQ, teachersQ] = useQueries({
    queries: [
      { queryKey: queryKeys.groups.all, queryFn: () => groupApi.list({ pageSize: 100 }) },
      { queryKey: queryKeys.teachers.all, queryFn: () => teacherApi.list({ pageSize: 100 }) },
    ],
  });

  const teachersById = useMemo(() => {
    const map = new Map<string, { fullName: string; avatarUrl?: string }>();
    teachersQ.data?.data.forEach((t) =>
      map.set(t.id, { fullName: t.fullName, avatarUrl: t.avatarUrl }),
    );
    return map;
  }, [teachersQ.data]);

  const filtered = useMemo(() => {
    let items = groupsQ.data?.data ?? [];
    if (status !== 'all') items = items.filter((g) => g.status === status);
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(
        (g) =>
          g.name.toLowerCase().includes(s) ||
          g.course.toLowerCase().includes(s) ||
          g.branch.toLowerCase().includes(s),
      );
    }
    return items;
  }, [groupsQ.data, status, search]);

  return (
    <Stack gap="lg">
      <PageHeader
        title="Groups"
        description="Cohorts running across your branches."
        actions={
          <Button
            leftSection={<IconPlus size={14} />}
            size="sm"
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            New group
          </Button>
        }
      />
      <Group justify="space-between" wrap="wrap">
        <SegmentedControl
          size="xs"
          data={STATUSES}
          value={status}
          onChange={(v) => setStatus(v as GroupStatus | 'all')}
        />
        <TextInput
          leftSection={<IconSearch size={14} />}
          placeholder="Search groups…"
          size="xs"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          w={260}
        />
      </Group>

      {groupsQ.isLoading ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {Array.from({ length: 6 }).map((_, i) => (
            <SurfaceCard key={i}>
              <Stack gap="xs">
                <Box h={18} style={{ background: 'var(--app-surface-2)', borderRadius: 6 }} />
                <Box h={12} style={{ background: 'var(--app-surface-2)', borderRadius: 6, width: '60%' }} />
                <Box h={120} style={{ background: 'var(--app-surface-2)', borderRadius: 8 }} />
              </Stack>
            </SurfaceCard>
          ))}
        </SimpleGrid>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No groups found"
          description="Try adjusting your search or open a new cohort."
          icon={<IconUsers size={28} />}
        />
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {filtered.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
            >
              <GroupCard group={g} teacher={teachersById.get(g.teacherId)} />
            </motion.div>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}

function GroupCard({
  group,
  teacher,
}: {
  group: GroupModel;
  teacher?: { fullName: string; avatarUrl?: string };
}) {
  const fillPercent = Math.min(100, Math.round((group.studentIds.length / group.capacity) * 100));
  return (
    <SurfaceCard hover style={{ overflow: 'hidden', position: 'relative' }}>
      <Box
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(99,102,241,.10), rgba(168,85,247,.05))',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />
      <Stack gap="md" pos="relative">
        <Group justify="space-between" wrap="nowrap">
          <Stack gap={2} style={{ minWidth: 0 }}>
            <Text fz={11} c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
              {group.course}
            </Text>
            <Text
              component={Link}
              to={ROUTES.groupDetails(group.id)}
              fz={16}
              fw={700}
              lineClamp={1}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {group.name}
            </Text>
          </Stack>
          <StatusBadge status={group.status} />
        </Group>

        <Group gap="xs" wrap="wrap">
          <Badge variant="light" color="brand" radius="sm">
            {group.level}
          </Badge>
          <Badge variant="light" color="gray" radius="sm">
            {group.branch}
          </Badge>
          <Badge variant="light" color="accent" radius="sm">
            {group.room}
          </Badge>
        </Group>

        <Stack gap={6}>
          <Group justify="space-between">
            <Text fz={12} c="dimmed">
              {group.schedule.days.join(' · ')} · {group.schedule.time}
            </Text>
          </Group>
          <Stack gap={4}>
            <Group justify="space-between">
              <Text fz={12} c="dimmed">
                Enrolled
              </Text>
              <Text fz={12} fw={600}>
                {group.studentIds.length} / {group.capacity}
              </Text>
            </Group>
            <Progress value={fillPercent} radius="xl" color={fillPercent > 90 ? 'red' : 'brand'} size="sm" />
          </Stack>
        </Stack>

        <Group justify="space-between" mt="xs">
          <Group gap="sm" wrap="nowrap">
            <Avatar
              size={28}
              radius="xl"
              src={teacher?.avatarUrl}
              color="accent"
              variant="light"
            >
              {initials(teacher?.fullName ?? 'T')}
            </Avatar>
            <Stack gap={0}>
              <Text fz={12} fw={600} lineClamp={1}>
                {teacher?.fullName ?? 'Unassigned'}
              </Text>
              <Text fz={11} c="dimmed">
                Mentor
              </Text>
            </Stack>
          </Group>
          <Tooltip label="Course price">
            <Text fz={13} fw={700}>
              {formatUZS(group.priceUZS, { compact: true })}
            </Text>
          </Tooltip>
        </Group>
        <Text fz={11} c="dimmed">
          Cohort {formatDate(group.startDate)} → {formatDate(group.endDate)}
        </Text>
      </Stack>
    </SurfaceCard>
  );
}
