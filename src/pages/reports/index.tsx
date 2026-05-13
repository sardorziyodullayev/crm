import { Box, Button, Group, SegmentedControl, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

import { mockDashboard, queryKeys } from '@shared/api';
import { formatNumber, formatUZS } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatCard } from '@shared/ui/StatCard';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

import { RevenueChart } from '../dashboard/ui/RevenueChart';
import { GrowthChart } from '../dashboard/ui/GrowthChart';
import { LeadSources } from '../dashboard/ui/LeadSources';

export default function ReportsPage() {
  const [range, setRange] = useState<'30d' | '90d' | '12m'>('12m');

  const queries = useQueries({
    queries: [
      { queryKey: queryKeys.dashboard.summary, queryFn: () => mockDashboard.summary() },
      { queryKey: queryKeys.dashboard.revenue, queryFn: () => mockDashboard.revenueSeries() },
      { queryKey: queryKeys.dashboard.growth, queryFn: () => mockDashboard.growthSeries() },
      { queryKey: queryKeys.dashboard.sources, queryFn: () => mockDashboard.sources() },
    ],
  });
  const [s, r, g, src] = queries;

  return (
    <Stack gap="lg">
      <PageHeader
        title="Reports"
        description="Aggregated insights across academic and financial data."
        actions={
          <Group gap="xs">
            <SegmentedControl
              size="xs"
              data={[
                { label: '30 days', value: '30d' },
                { label: '90 days', value: '90d' },
                { label: '12 months', value: '12m' },
              ]}
              value={range}
              onChange={(v) => setRange(v as typeof range)}
            />
            <Button leftSection={<IconDownload size={14} />} size="sm" variant="light">
              Export PDF
            </Button>
          </Group>
        }
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        <StatCard
          label="Revenue this month"
          value={formatUZS(s.data?.revenueThisMonth ?? 0, { compact: true })}
          delta={s.data?.revenueGrowth ?? 0}
          accent="success"
        />
        <StatCard
          label="Active students"
          value={formatNumber(s.data?.activeStudents ?? 0)}
          delta={6}
          accent="brand"
        />
        <StatCard
          label="Active groups"
          value={formatNumber(s.data?.activeGroups ?? 0)}
          delta={3}
          accent="accent"
        />
        <StatCard
          label="Leads (7d)"
          value={formatNumber(s.data?.newLeads ?? 0)}
          delta={-2}
          accent="warning"
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
        <Box style={{ gridColumn: 'span 2' }}>
          <SurfaceCard>
            <Group justify="space-between" mb="md">
              <Stack gap={2}>
                <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
                  Revenue trend
                </Text>
                <Text fz={16} fw={700}>
                  Last 12 months
                </Text>
              </Stack>
            </Group>
            <RevenueChart data={r.data ?? []} loading={r.isLoading} />
          </SurfaceCard>
        </Box>
        <LeadSources data={src.data ?? []} loading={src.isLoading} />
      </SimpleGrid>

      <SurfaceCard>
        <Group justify="space-between" mb="md">
          <Stack gap={2}>
            <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
              Acquisition vs. growth
            </Text>
            <Text fz={16} fw={700}>
              Last 12 months
            </Text>
          </Stack>
        </Group>
        <GrowthChart data={g.data ?? []} loading={g.isLoading} />
      </SurfaceCard>
    </Stack>
  );
}
