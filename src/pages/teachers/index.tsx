import { Avatar, Badge, Button, Group, Rating, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import type { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

import { teacherApi, type Teacher } from '@entities/teacher';
import { queryKeys } from '@shared/api';
import { formatUZS, fromNow, initials } from '@shared/lib/format';
import { DataTable } from '@shared/ui/DataTable';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';

export default function TeachersPage() {
  const query = useQuery({
    queryKey: queryKeys.teachers.all,
    queryFn: () => teacherApi.list({ pageSize: 100 }),
  });

  const columns = useMemo<MRT_ColumnDef<Teacher>[]>(
    () => [
      {
        accessorKey: 'fullName',
        header: 'Teacher',
        size: 280,
        Cell: ({ row }) => (
          <Group gap="sm" wrap="nowrap">
            <Avatar src={row.original.avatarUrl} radius="xl" size={36} color="accent">
              {initials(row.original.fullName)}
            </Avatar>
            <Stack gap={0}>
              <Text fw={600} fz={14}>
                {row.original.fullName}
              </Text>
              <Text fz={12} c="dimmed">
                {row.original.email}
              </Text>
            </Stack>
          </Group>
        ),
      },
      {
        accessorKey: 'specialty',
        header: 'Specialty',
        Cell: ({ cell }) => (
          <Badge variant="light" radius="sm" color="brand">
            {cell.getValue<string>()}
          </Badge>
        ),
      },
      { accessorKey: 'branch', header: 'Branch' },
      {
        accessorKey: 'groupIds',
        header: 'Groups',
        Cell: ({ cell }) => (
          <Text fz={13}>{(cell.getValue<string[]>() || []).length}</Text>
        ),
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        Cell: ({ cell }) => (
          <Group gap={6}>
            <Rating value={cell.getValue<number>()} fractions={2} readOnly size="xs" />
            <Text fz={12} c="dimmed">
              {cell.getValue<number>()}
            </Text>
          </Group>
        ),
      },
      {
        accessorKey: 'monthlySalaryUZS',
        header: 'Salary',
        Cell: ({ cell }) => (
          <Text fz={13} fw={600}>
            {formatUZS(cell.getValue<number>(), { compact: true })}
          </Text>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
      },
      {
        accessorKey: 'joinedAt',
        header: 'Joined',
        Cell: ({ cell }) => (
          <Text fz={12} c="dimmed">
            {fromNow(cell.getValue<string>())}
          </Text>
        ),
      },
    ],
    [],
  );

  return (
    <Stack gap="lg">
      <PageHeader
        title="Teachers"
        description="Roster, salary and performance overview."
        actions={
          <Button
            leftSection={<IconPlus size={14} />}
            size="sm"
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            Invite teacher
          </Button>
        }
      />
      <DataTable<Teacher>
        data={query.data?.data ?? []}
        columns={columns}
        loading={query.isLoading}
        total={query.data?.total}
        onRefresh={() => query.refetch()}
      />
    </Stack>
  );
}
