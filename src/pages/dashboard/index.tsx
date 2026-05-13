import {
  Badge,
  Box,
  Button,
  Group,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconArrowUpRight,
  IconCash,
  IconChartHistogram,
  IconDownload,
  IconUserCheck,
  IconUserPlus,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { mockActivity, mockDashboard, queryKeys } from '@shared/api';
import { formatNumber, formatUZS, fromNow } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatCard } from '@shared/ui/StatCard';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

import { RevenueChart } from './ui/RevenueChart';
import { GrowthChart } from './ui/GrowthChart';
import { LeadSources } from './ui/LeadSources';
import { LiveActivityFeed } from './ui/LiveActivityFeed';
import { QuickActions } from './ui/QuickActions';

export default function DashboardPage() {
  const [range, setRange] = useState<'7d' | '30d' | '12m'>('30d');
  const navigate = useNavigate();

  const queries = useQueries({
    queries: [
      { queryKey: queryKeys.dashboard.summary, queryFn: () => mockDashboard.summary() },
      { queryKey: queryKeys.dashboard.revenue, queryFn: () => mockDashboard.revenueSeries() },
      { queryKey: queryKeys.dashboard.growth, queryFn: () => mockDashboard.growthSeries() },
      { queryKey: queryKeys.dashboard.sources, queryFn: () => mockDashboard.sources() },
      { queryKey: queryKeys.dashboard.activity, queryFn: () => mockActivity.list() },
    ],
  });

  const [summaryQ, revenueQ, growthQ, sourcesQ, activityQ] = queries;
  const s = summaryQ.data;

  return (
    <Stack gap="xl">
      <PageHeader
        title="Dashboard"
        description="At-a-glance health of your educational center."
        badge={
          <Badge variant="dot" color="success" radius="sm">
            Live
          </Badge>
        }
        actions={
          <Group gap="xs">
            <SegmentedControl
              size="xs"
              data={[
                { label: '7 days', value: '7d' },
                { label: '30 days', value: '30d' },
                { label: '12 mo', value: '12m' },
              ]}
              value={range}
              onChange={(v) => setRange(v as typeof range)}
            />
            <Button leftSection={<IconDownload size={14} />} variant="light" size="xs">
              Export
            </Button>
            <Button
              leftSection={<IconUserPlus size={14} />}
              size="xs"
              variant="gradient"
              gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
              onClick={() => navigate(ROUTES.students + '?new=1')}
            >
              Add student
            </Button>
          </Group>
        }
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        <StatCard
          label="Active students"
          value={formatNumber(s?.activeStudents ?? 0)}
          delta={12}
          hint={`+${s?.trialStudents ?? 0} on trial`}
          icon={<IconUserCheck size={18} />}
          accent="brand"
          loading={summaryQ.isLoading}
        />
        <StatCard
          label="Revenue this month"
          value={formatUZS(s?.revenueThisMonth ?? 0, { compact: true })}
          delta={s?.revenueGrowth ?? 0}
          hint="vs. previous month"
          icon={<IconCash size={18} />}
          accent="success"
          loading={summaryQ.isLoading}
        />
        <StatCard
          label="Active groups"
          value={formatNumber(s?.activeGroups ?? 0)}
          delta={4}
          hint={`${s?.teachers ?? 0} active teachers`}
          icon={<IconUsersGroup size={18} />}
          accent="accent"
          loading={summaryQ.isLoading}
        />
        <StatCard
          label="New leads (7d)"
          value={formatNumber(s?.newLeads ?? 0)}
          delta={-3}
          hint={`Overdue: ${formatUZS(s?.overdueAmount ?? 0, { compact: true })}`}
          icon={<IconChartHistogram size={18} />}
          accent="warning"
          loading={summaryQ.isLoading}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
        <Box style={{ gridColumn: 'span 2' }}>
          <SurfaceCard>
            <Group justify="space-between" align="flex-end" mb="md">
              <Stack gap={2}>
                <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
                  Revenue overview
                </Text>
                <Text fz={22} fw={800} style={{ letterSpacing: '-0.02em' }}>
                  {formatUZS(s?.revenueThisMonth ?? 0, { compact: true })}
                </Text>
              </Stack>
              <Group gap={6} c="teal.5" style={{ fontWeight: 600, fontSize: 12 }}>
                <IconArrowUpRight size={14} stroke={2.5} />
                {s?.revenueGrowth ?? 0}% vs. last month
              </Group>
            </Group>
            <RevenueChart data={revenueQ.data ?? []} loading={revenueQ.isLoading} />
          </SurfaceCard>
        </Box>
        <Box>
          <LeadSources data={sourcesQ.data ?? []} loading={sourcesQ.isLoading} />
        </Box>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
        <Box style={{ gridColumn: 'span 2' }}>
          <SurfaceCard>
            <Group justify="space-between" mb="md">
              <Stack gap={2}>
                <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
                  Growth — students vs. leads
                </Text>
                <Text fz={16} fw={700}>Last 12 months</Text>
              </Stack>
            </Group>
            <GrowthChart data={growthQ.data ?? []} loading={growthQ.isLoading} />
          </SurfaceCard>
        </Box>
        <QuickActions />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
        <Box style={{ gridColumn: 'span 2' }}>
          <LiveActivityFeed
            items={(activityQ.data ?? []).slice(0, 8).map((a) => ({
              id: a.id,
              actor: a.actor,
              action: a.action,
              target: a.target,
              when: fromNow(a.createdAt),
              kind: a.kind,
            }))}
            loading={activityQ.isLoading}
          />
        </Box>
        <SurfaceCard>
          <Stack gap="sm">
            <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
              This week
            </Text>
            {[
              { label: 'New enrollments', v: 24, c: 'success' },
              { label: 'Trial sessions', v: 12, c: 'brand' },
              { label: 'Cancellations', v: 3, c: 'danger' },
              { label: 'Teacher hours', v: 184, c: 'accent' },
            ].map((row) => (
              <Group key={row.label} justify="space-between">
                <Text fz={13} c="dimmed">
                  {row.label}
                </Text>
                <Badge
                  variant="light"
                  color={row.c === 'danger' ? 'red' : row.c}
                  radius="sm"
                >
                  {row.v}
                </Badge>
              </Group>
            ))}
          </Stack>
        </SurfaceCard>
      </SimpleGrid>
    </Stack>
  );
}
