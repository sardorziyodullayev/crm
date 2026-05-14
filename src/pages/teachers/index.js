import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Badge, Button, Group, Rating, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { teacherApi } from '@entities/teacher';
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
    const columns = useMemo(() => [
        {
            accessorKey: 'fullName',
            header: 'Teacher',
            size: 280,
            Cell: ({ row }) => (_jsxs(Group, { gap: "sm", wrap: "nowrap", children: [_jsx(Avatar, { src: row.original.avatarUrl, radius: "xl", size: 36, color: "accent", children: initials(row.original.fullName) }), _jsxs(Stack, { gap: 0, children: [_jsx(Text, { fw: 600, fz: 14, children: row.original.fullName }), _jsx(Text, { fz: 12, c: "dimmed", children: row.original.email })] })] })),
        },
        {
            accessorKey: 'specialty',
            header: 'Specialty',
            Cell: ({ cell }) => (_jsx(Badge, { variant: "light", radius: "sm", color: "brand", children: cell.getValue() })),
        },
        { accessorKey: 'branch', header: 'Branch' },
        {
            accessorKey: 'groupIds',
            header: 'Groups',
            Cell: ({ cell }) => (_jsx(Text, { fz: 13, children: (cell.getValue() || []).length })),
        },
        {
            accessorKey: 'rating',
            header: 'Rating',
            Cell: ({ cell }) => (_jsxs(Group, { gap: 6, children: [_jsx(Rating, { value: cell.getValue(), fractions: 2, readOnly: true, size: "xs" }), _jsx(Text, { fz: 12, c: "dimmed", children: cell.getValue() })] })),
        },
        {
            accessorKey: 'monthlySalaryUZS',
            header: 'Salary',
            Cell: ({ cell }) => (_jsx(Text, { fz: 13, fw: 600, children: formatUZS(cell.getValue(), { compact: true }) })),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ cell }) => _jsx(StatusBadge, { status: cell.getValue() }),
        },
        {
            accessorKey: 'joinedAt',
            header: 'Joined',
            Cell: ({ cell }) => (_jsx(Text, { fz: 12, c: "dimmed", children: fromNow(cell.getValue()) })),
        },
    ], []);
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Teachers", description: "Roster, salary and performance overview.", actions: _jsx(Button, { leftSection: _jsx(IconPlus, { size: 14 }), size: "sm", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "Invite teacher" }) }), _jsx(DataTable, { data: query.data?.data ?? [], columns: columns, loading: query.isLoading, total: query.data?.total, onRefresh: () => query.refetch() })] }));
}
