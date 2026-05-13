import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Group,
  Menu,
  SegmentedControl,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconArchive,
  IconDots,
  IconDownload,
  IconEye,
  IconPencil,
  IconTrash,
  IconUserPlus,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { studentApi, type Student, type StudentStatus } from '@entities/student';
import { queryKeys } from '@shared/api';
import { formatPhone, formatUZS, fromNow, initials } from '@shared/lib/format';
import { DataTable } from '@shared/ui/DataTable';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { StudentFormModal } from '@features/students/ui/StudentFormModal';

const STATUS_FILTERS: { value: StudentStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'trial', label: 'Trial' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'archived', label: 'Archived' },
];

export default function StudentsPage() {
  const [search] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<StudentStatus | 'all'>('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    if (search.get('new') === '1') setCreateOpen(true);
  }, [search]);

  const query = useQuery({
    queryKey: queryKeys.students.list({ status: statusFilter }),
    queryFn: () =>
      studentApi.list({
        status: statusFilter,
        page: 1,
        pageSize: 50,
        sortBy: 'joinedAt',
        sortDir: 'desc',
      }),
  });

  const remove = useMutation({
    mutationFn: (ids: string[]) => studentApi.remove(ids),
    onSuccess: (_, ids) => {
      qc.invalidateQueries({ queryKey: queryKeys.students.all });
      notifications.show({
        title: 'Removed',
        message: `${ids.length} ${ids.length === 1 ? 'student' : 'students'} archived`,
        color: 'red',
      });
    },
  });

  const columns = useMemo<MRT_ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: 'fullName',
        header: 'Student',
        size: 280,
        Cell: ({ row }) => {
          const s = row.original;
          return (
            <Group gap="sm" wrap="nowrap">
              <Avatar src={s.avatarUrl} radius="xl" size={36} color="brand">
                {initials(s.fullName)}
              </Avatar>
              <Stack gap={0}>
                <Text fw={600} fz={14}>
                  {s.fullName}
                </Text>
                <Text fz={12} c="dimmed">
                  {s.id} · {s.gender}
                </Text>
              </Stack>
            </Group>
          );
        },
      },
      {
        accessorKey: 'phone',
        header: 'Contact',
        Cell: ({ row }) => (
          <Stack gap={2}>
            <Text fz={13}>{formatPhone(row.original.phone)}</Text>
            <Text fz={12} c="dimmed" lineClamp={1}>
              {row.original.email || '—'}
            </Text>
          </Stack>
        ),
      },
      {
        accessorKey: 'branch',
        header: 'Branch',
        Cell: ({ cell }) => (
          <Text fz={13} c="dimmed">
            {cell.getValue<string>()}
          </Text>
        ),
      },
      {
        accessorKey: 'groupIds',
        header: 'Groups',
        Cell: ({ cell }) => {
          const groups = cell.getValue<string[]>();
          return (
            <Badge variant="light" radius="sm" color="brand">
              {groups.length} {groups.length === 1 ? 'group' : 'groups'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
      },
      {
        accessorKey: 'balanceUZS',
        header: 'Balance',
        Cell: ({ cell }) => {
          const v = cell.getValue<number>();
          return (
            <Text fz={13} fw={600} c={v < 0 ? 'red.5' : v > 0 ? 'teal.5' : undefined}>
              {formatUZS(v, { compact: true })}
            </Text>
          );
        },
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
        title="Students"
        description="Manage all student profiles, placements and history."
        actions={
          <Group gap="xs">
            <Button leftSection={<IconDownload size={14} />} variant="light" size="sm">
              Export
            </Button>
            <Button
              leftSection={<IconUserPlus size={14} />}
              size="sm"
              variant="gradient"
              gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
              onClick={() => setCreateOpen(true)}
            >
              Add student
            </Button>
          </Group>
        }
      />

      <Group justify="space-between">
        <SegmentedControl
          size="xs"
          data={STATUS_FILTERS}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as StudentStatus | 'all')}
        />
        <Group gap={6}>
          <Text fz={12} c="dimmed">
            Showing
          </Text>
          <Badge variant="light" color="brand" radius="sm">
            {query.data?.total ?? 0} records
          </Badge>
        </Group>
      </Group>

      <DataTable<Student>
        data={query.data?.data ?? []}
        columns={columns}
        loading={query.isLoading}
        total={query.data?.total}
        onRefresh={() => query.refetch()}
        onExport={() =>
          notifications.show({ title: 'Export started', message: 'CSV will be ready shortly', color: 'brand' })
        }
        emptyTitle="No students yet"
        emptyDescription="Add your first student to begin tracking attendance and payments."
        rowActions={(row) => (
          <Menu position="bottom-end" shadow="md" radius="md" width={180}>
            <Menu.Target>
              <Tooltip label="Actions">
                <ActionIcon variant="subtle" color="gray">
                  <IconDots size={16} />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEye size={14} />}
                onClick={() => navigate(ROUTES.studentDetails(row.id))}
              >
                View profile
              </Menu.Item>
              <Menu.Item leftSection={<IconPencil size={14} />} onClick={() => setEditing(row)}>
                Edit
              </Menu.Item>
              <Menu.Item leftSection={<IconArchive size={14} />}>Archive</Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() =>
                  modals.openConfirmModal({
                    title: 'Remove student?',
                    centered: true,
                    children: (
                      <Text size="sm">
                        Are you sure you want to remove <b>{row.fullName}</b>? This action can be
                        reverted within 30 days.
                      </Text>
                    ),
                    labels: { confirm: 'Remove', cancel: 'Cancel' },
                    confirmProps: { color: 'red' },
                    onConfirm: () => remove.mutate([row.id]),
                  })
                }
              >
                Remove
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      />

      <StudentFormModal opened={createOpen} onClose={() => setCreateOpen(false)} />
      <StudentFormModal
        opened={Boolean(editing)}
        onClose={() => setEditing(null)}
        initial={editing ?? undefined}
      />
    </Stack>
  );
}
