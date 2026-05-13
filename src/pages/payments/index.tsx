import {
  Badge,
  Button,
  Group,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { IconCash, IconClockHour4, IconPlus, IconTrendingUp } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import type { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';

import { paymentApi, type Payment, type PaymentStatus } from '@entities/payment';
import { studentApi } from '@entities/student';
import { queryKeys } from '@shared/api';
import { formatDate, formatNumber, formatUZS } from '@shared/lib/format';
import { DataTable } from '@shared/ui/DataTable';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatCard } from '@shared/ui/StatCard';
import { StatusBadge } from '@shared/ui/StatusBadge';

const FILTERS: { label: string; value: PaymentStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Refunded', value: 'refunded' },
];

export default function PaymentsPage() {
  const [status, setStatus] = useState<PaymentStatus | 'all'>('all');

  const [list, stats, students] = useQueries({
    queries: [
      {
        queryKey: queryKeys.payments.list({ status }),
        queryFn: () =>
          paymentApi.list({
            filters: { status },
            pageSize: 50,
            sortBy: 'dueAt',
            sortDir: 'desc',
          }),
      },
      { queryKey: queryKeys.payments.stats, queryFn: () => paymentApi.stats() },
      { queryKey: queryKeys.students.all, queryFn: () => studentApi.list({ pageSize: 300 }) },
    ],
  });

  const studentMap = useMemo(() => {
    const m = new Map<string, string>();
    students.data?.data.forEach((s) => m.set(s.id, s.fullName));
    return m;
  }, [students.data]);

  const columns = useMemo<MRT_ColumnDef<Payment>[]>(
    () => [
      {
        accessorKey: 'studentId',
        header: 'Student',
        Cell: ({ cell }) => (
          <Text fz={14} fw={600}>
            {studentMap.get(cell.getValue<string>()) ?? cell.getValue<string>()}
          </Text>
        ),
      },
      {
        accessorKey: 'amountUZS',
        header: 'Amount',
        Cell: ({ cell }) => (
          <Text fz={14} fw={700}>
            {formatUZS(cell.getValue<number>(), { compact: true })}
          </Text>
        ),
      },
      {
        accessorKey: 'method',
        header: 'Method',
        Cell: ({ cell }) => (
          <Badge variant="light" radius="sm" color="gray" tt="capitalize">
            {cell.getValue<string>()}
          </Badge>
        ),
      },
      {
        accessorKey: 'dueAt',
        header: 'Due',
        Cell: ({ cell }) => (
          <Text fz={13}>{formatDate(cell.getValue<string>())}</Text>
        ),
      },
      {
        accessorKey: 'paidAt',
        header: 'Paid',
        Cell: ({ cell }) => {
          const v = cell.getValue<string>();
          return v ? <Text fz={13}>{formatDate(v)}</Text> : <Text fz={13} c="dimmed">—</Text>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
      },
    ],
    [studentMap],
  );

  return (
    <Stack gap="lg">
      <PageHeader
        title="Payments"
        description="Track invoices, debt and reconciliations."
        actions={
          <Button
            leftSection={<IconPlus size={14} />}
            size="sm"
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            Record payment
          </Button>
        }
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        <StatCard
          label="Total revenue"
          value={formatUZS(stats.data?.totalRevenue ?? 0, { compact: true })}
          delta={9}
          icon={<IconCash size={18} />}
          accent="success"
          loading={stats.isLoading}
        />
        <StatCard
          label="Outstanding"
          value={formatUZS(stats.data?.totalOverdue ?? 0, { compact: true })}
          delta={-4}
          icon={<IconClockHour4 size={18} />}
          accent="danger"
          loading={stats.isLoading}
        />
        <StatCard
          label="Paid invoices"
          value={formatNumber(stats.data?.paidCount ?? 0)}
          delta={12}
          accent="brand"
          icon={<IconTrendingUp size={18} />}
          loading={stats.isLoading}
        />
        <StatCard
          label="Pending invoices"
          value={formatNumber(stats.data?.pendingCount ?? 0)}
          delta={2}
          accent="warning"
          icon={<IconClockHour4 size={18} />}
          loading={stats.isLoading}
        />
      </SimpleGrid>

      <Group justify="space-between">
        <SegmentedControl
          size="xs"
          data={FILTERS}
          value={status}
          onChange={(v) => setStatus(v as PaymentStatus | 'all')}
        />
      </Group>

      <DataTable<Payment>
        data={list.data?.data ?? []}
        columns={columns}
        loading={list.isLoading}
        total={list.data?.total}
        onRefresh={() => list.refetch()}
        onExport={() => undefined}
      />
    </Stack>
  );
}
