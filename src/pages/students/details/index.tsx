import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Timeline,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconCalendarStats,
  IconCash,
  IconMail,
  IconMapPin,
  IconMessage,
  IconPencil,
  IconPhone,
  IconStar,
  IconUserCheck,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { studentApi } from '@entities/student';
import { paymentApi } from '@entities/payment';
import { queryKeys } from '@shared/api';
import { formatDate, formatUZS, fromNow, initials } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
import { EmptyState } from '@shared/ui/EmptyState';

export default function StudentDetailsPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const studentQ = useQuery({
    queryKey: queryKeys.students.byId(id),
    queryFn: () => studentApi.byId(id),
    enabled: Boolean(id),
  });

  const paymentsQ = useQuery({
    queryKey: queryKeys.payments.list({ studentId: id }),
    queryFn: () => paymentApi.list({ pageSize: 100 }),
  });

  const student = studentQ.data;

  if (studentQ.isLoading) {
    return <Box h="60vh" />;
  }
  if (!student) {
    return (
      <EmptyState
        title="Student not found"
        description="The profile you're looking for may have been removed."
        action={{ label: 'Back to students', onClick: () => navigate(ROUTES.students) }}
      />
    );
  }

  const studentPayments = (paymentsQ.data?.data ?? []).filter((p) => p.studentId === id);
  const totalPaid = studentPayments
    .filter((p) => p.status === 'paid')
    .reduce((s, p) => s + p.amountUZS, 0);

  return (
    <Stack gap="lg">
      <Group>
        <Button
          component={Link}
          to={ROUTES.students}
          leftSection={<IconArrowLeft size={14} />}
          variant="subtle"
          size="xs"
        >
          Back to students
        </Button>
      </Group>

      <PageHeader
        title={student.fullName}
        description={`Joined ${formatDate(student.joinedAt)} · ${student.branch}`}
        badge={<StatusBadge status={student.status} />}
        actions={
          <Group gap="xs">
            <Button leftSection={<IconMessage size={14} />} variant="light" size="sm">
              Message
            </Button>
            <Button leftSection={<IconPencil size={14} />} size="sm">
              Edit profile
            </Button>
          </Group>
        }
      />

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
        <SurfaceCard>
          <Stack align="center" gap="md" py="md">
            <Avatar size={88} radius={88} color="brand" variant="light">
              {initials(student.fullName)}
            </Avatar>
            <Stack gap={2} ta="center">
              <Title order={4}>{student.fullName}</Title>
              <Text fz={13} c="dimmed">
                {student.id}
              </Text>
            </Stack>
            <Group gap="xs" wrap="wrap" justify="center">
              {student.tags.map((t) => (
                <Badge key={t} variant="light" color="accent" radius="sm">
                  {t}
                </Badge>
              ))}
            </Group>
          </Stack>
          <Stack gap={6} mt="md">
            <Group gap="sm" align="center">
              <IconPhone size={14} stroke={1.6} />
              <Anchor href={`tel:${student.phone}`} size="sm">
                {student.phone}
              </Anchor>
            </Group>
            {student.email && (
              <Group gap="sm" align="center">
                <IconMail size={14} stroke={1.6} />
                <Anchor href={`mailto:${student.email}`} size="sm">
                  {student.email}
                </Anchor>
              </Group>
            )}
            <Group gap="sm" align="center">
              <IconMapPin size={14} stroke={1.6} />
              <Text size="sm">{student.branch}</Text>
            </Group>
            <Group gap="sm" align="center">
              <IconCalendarStats size={14} stroke={1.6} />
              <Text size="sm">Born {formatDate(student.birthDate)}</Text>
            </Group>
          </Stack>
        </SurfaceCard>

        <Box style={{ gridColumn: 'span 2' }}>
          <SurfaceCard>
            <Tabs defaultValue="overview" keepMounted={false}>
              <Tabs.List mb="md">
                <Tabs.Tab value="overview" leftSection={<IconStar size={14} />}>
                  Overview
                </Tabs.Tab>
                <Tabs.Tab value="attendance" leftSection={<IconUserCheck size={14} />}>
                  Attendance
                </Tabs.Tab>
                <Tabs.Tab value="payments" leftSection={<IconCash size={14} />}>
                  Payments
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview">
                <SimpleGrid cols={{ base: 1, sm: 3 }} mb="md">
                  <Stat label="Active groups" value={student.groupIds.length} />
                  <Stat label="Total paid" value={formatUZS(totalPaid, { compact: true })} />
                  <Stat
                    label="Balance"
                    value={formatUZS(student.balanceUZS, { compact: true })}
                    accent={student.balanceUZS < 0 ? 'red.5' : 'teal.5'}
                  />
                </SimpleGrid>
                <Stack gap={4} mt="lg">
                  <Text fz={12} tt="uppercase" c="dimmed" fw={600}>
                    Parent
                  </Text>
                  <Text fz={14}>{student.parentName}</Text>
                  <Anchor href={`tel:${student.parentPhone}`} size="sm">
                    {student.parentPhone}
                  </Anchor>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="attendance">
                <Timeline active={2} bulletSize={20} lineWidth={2}>
                  <Timeline.Item title="Mon · IELTS Intensive">
                    <Text c="dimmed" size="sm">
                      Present · 18:00 — 20:00
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Wed · IELTS Intensive">
                    <Text c="dimmed" size="sm">
                      Late · arrived 18:12
                    </Text>
                  </Timeline.Item>
                  <Timeline.Item title="Fri · IELTS Intensive" color="red">
                    <Text c="dimmed" size="sm">
                      Absent · no reason
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Tabs.Panel>

              <Tabs.Panel value="payments">
                <Stack gap="xs">
                  {studentPayments.length === 0 ? (
                    <EmptyState title="No payments yet" />
                  ) : (
                    studentPayments.slice(0, 6).map((p) => (
                      <Group
                        key={p.id}
                        justify="space-between"
                        p="md"
                        style={{
                          border: '1px solid var(--app-border)',
                          borderRadius: 12,
                        }}
                      >
                        <Stack gap={2}>
                          <Text fw={600} fz={14}>
                            {formatUZS(p.amountUZS, { compact: true })}
                          </Text>
                          <Text fz={12} c="dimmed">
                            {p.method} · due {formatDate(p.dueAt)}
                          </Text>
                        </Stack>
                        <StatusBadge status={p.status} />
                      </Group>
                    ))
                  )}
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </SurfaceCard>
        </Box>
      </SimpleGrid>

      <SurfaceCard>
        <Group justify="space-between" mb="md">
          <Stack gap={2}>
            <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
              Activity
            </Text>
            <Text fz={16} fw={700}>
              Recent profile events
            </Text>
          </Stack>
        </Group>
        <Timeline active={4} bulletSize={20} lineWidth={2}>
          <Timeline.Item title="Profile created">
            <Text c="dimmed" size="sm">
              {fromNow(student.joinedAt)}
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Joined IELTS Intensive · G-2A">
            <Text c="dimmed" size="sm">
              5 days ago · by Aziza Karimova
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Payment recorded">
            <Text c="dimmed" size="sm">
              3 days ago · 1.4 mln UZS via Payme
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Telegram bot subscribed">
            <Text c="dimmed" size="sm">
              2 days ago · @edura_uz_bot
            </Text>
          </Timeline.Item>
        </Timeline>
      </SurfaceCard>
    </Stack>
  );
}

function Stat({ label, value, accent }: { label: string; value: React.ReactNode; accent?: string }) {
  return (
    <Stack gap={2}>
      <Text fz={11} tt="uppercase" c="dimmed" fw={600} style={{ letterSpacing: 0.6 }}>
        {label}
      </Text>
      <Text fz={22} fw={800} c={accent} style={{ letterSpacing: '-0.02em' }}>
        {value}
      </Text>
    </Stack>
  );
}
