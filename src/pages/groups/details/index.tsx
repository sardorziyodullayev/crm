import {
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconCalendar,
  IconCash,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { groupApi } from '@entities/group';
import { studentApi } from '@entities/student';
import { teacherApi } from '@entities/teacher';
import { queryKeys } from '@shared/api';
import { formatDate, formatUZS, initials } from '@shared/lib/format';
import { EmptyState } from '@shared/ui/EmptyState';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

export default function GroupDetailsPage() {
  const { id = '' } = useParams();

  const [groupQ, studentsQ, teachersQ] = useQueries({
    queries: [
      { queryKey: queryKeys.groups.byId(id), queryFn: () => groupApi.byId(id), enabled: Boolean(id) },
      { queryKey: queryKeys.students.list({ pageSize: 200 }), queryFn: () => studentApi.list({ pageSize: 200 }) },
      { queryKey: queryKeys.teachers.all, queryFn: () => teacherApi.list({ pageSize: 100 }) },
    ],
  });

  const group = groupQ.data;
  if (!group) return <Box h="60vh" />;

  const teacher = teachersQ.data?.data.find((t) => t.id === group.teacherId);
  const studentsInGroup = (studentsQ.data?.data ?? []).filter((s) =>
    group.studentIds.includes(s.id),
  );
  const fillPercent = Math.min(100, Math.round((studentsInGroup.length / group.capacity) * 100));

  return (
    <Stack gap="lg">
      <Group>
        <Button
          component={Link}
          to={ROUTES.groups}
          leftSection={<IconArrowLeft size={14} />}
          variant="subtle"
          size="xs"
        >
          Back to groups
        </Button>
      </Group>

      <PageHeader
        title={group.name}
        description={`${group.course} · ${group.level} · ${group.branch}`}
        badge={<StatusBadge status={group.status} />}
        actions={
          <Group gap="xs">
            <Button leftSection={<IconUserCheck size={14} />} variant="light" size="sm">
              Take attendance
            </Button>
            <Button leftSection={<IconCash size={14} />} size="sm">
              Record payment
            </Button>
          </Group>
        }
      />

      <SimpleGrid cols={{ base: 1, lg: 4 }} spacing="md">
        <SurfaceCard>
          <Stack gap={2}>
            <Text fz={11} c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
              Enrolled
            </Text>
            <Group justify="space-between">
              <Text fz={26} fw={800} style={{ letterSpacing: '-0.02em' }}>
                {studentsInGroup.length}
              </Text>
              <Badge variant="light" color="brand">
                of {group.capacity}
              </Badge>
            </Group>
            <Progress value={fillPercent} mt="xs" radius="xl" />
          </Stack>
        </SurfaceCard>
        <SurfaceCard>
          <Stack gap={2}>
            <Text fz={11} c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
              Schedule
            </Text>
            <Text fz={16} fw={700}>
              {group.schedule.days.join(' · ')}
            </Text>
            <Text fz={13} c="dimmed">
              {group.schedule.time}
            </Text>
          </Stack>
        </SurfaceCard>
        <SurfaceCard>
          <Stack gap={2}>
            <Text fz={11} c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
              Course price
            </Text>
            <Text fz={22} fw={800} style={{ letterSpacing: '-0.02em' }}>
              {formatUZS(group.priceUZS, { compact: true })}
            </Text>
            <Text fz={12} c="dimmed">
              monthly
            </Text>
          </Stack>
        </SurfaceCard>
        <SurfaceCard>
          <Stack gap={2}>
            <Text fz={11} c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: 0.6 }}>
              Mentor
            </Text>
            <Group gap="xs">
              <Avatar size={32} radius="xl" color="accent" variant="light">
                {initials(teacher?.fullName ?? 'T')}
              </Avatar>
              <Stack gap={0}>
                <Text fz={14} fw={600}>
                  {teacher?.fullName ?? 'Unassigned'}
                </Text>
                <Text fz={12} c="dimmed">
                  {teacher?.specialty}
                </Text>
              </Stack>
            </Group>
          </Stack>
        </SurfaceCard>
      </SimpleGrid>

      <SurfaceCard>
        <Tabs defaultValue="roster">
          <Tabs.List mb="md">
            <Tabs.Tab value="roster" leftSection={<IconUsers size={14} />}>
              Roster
            </Tabs.Tab>
            <Tabs.Tab value="schedule" leftSection={<IconCalendar size={14} />}>
              Schedule
            </Tabs.Tab>
            <Tabs.Tab value="financials" leftSection={<IconCash size={14} />}>
              Financials
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="roster">
            {studentsInGroup.length === 0 ? (
              <EmptyState title="No students enrolled" description="Add students from the Students page." />
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xs">
                {studentsInGroup.map((s) => (
                  <Group
                    key={s.id}
                    component={Link}
                    to={ROUTES.studentDetails(s.id)}
                    p="sm"
                    style={{
                      border: '1px solid var(--app-border)',
                      borderRadius: 12,
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <Avatar size={32} radius="xl" color="brand" variant="light">
                      {initials(s.fullName)}
                    </Avatar>
                    <Stack gap={0}>
                      <Text fz={13} fw={600}>
                        {s.fullName}
                      </Text>
                      <Text fz={11} c="dimmed">
                        {s.phone}
                      </Text>
                    </Stack>
                  </Group>
                ))}
              </SimpleGrid>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="schedule">
            <Stack gap="xs">
              <Title order={5}>Cohort {formatDate(group.startDate)} → {formatDate(group.endDate)}</Title>
              <Text c="dimmed" size="sm">
                {group.schedule.days.join(', ')} · {group.schedule.time}
              </Text>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="financials">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              <Stack gap={2}>
                <Text fz={11} c="dimmed" tt="uppercase" fw={600}>Expected revenue</Text>
                <Text fz={22} fw={800}>
                  {formatUZS(group.priceUZS * studentsInGroup.length, { compact: true })}
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text fz={11} c="dimmed" tt="uppercase" fw={600}>Collected</Text>
                <Text fz={22} fw={800} c="teal.5">
                  {formatUZS(group.priceUZS * Math.round(studentsInGroup.length * 0.78), { compact: true })}
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text fz={11} c="dimmed" tt="uppercase" fw={600}>Outstanding</Text>
                <Text fz={22} fw={800} c="red.5">
                  {formatUZS(group.priceUZS * Math.round(studentsInGroup.length * 0.22), { compact: true })}
                </Text>
              </Stack>
            </SimpleGrid>
          </Tabs.Panel>
        </Tabs>
      </SurfaceCard>
    </Stack>
  );
}
