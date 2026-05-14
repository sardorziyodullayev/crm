import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Button, Group, SegmentedControl, SimpleGrid, Stack, Text, } from '@mantine/core';
import { IconCash, IconClockHour4, IconPlus, IconTrendingUp } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { paymentApi } from '@entities/payment';
import { studentApi } from '@entities/student';
import { queryKeys } from '@shared/api';
import { formatDate, formatNumber, formatUZS } from '@shared/lib/format';
import { DataTable } from '@shared/ui/DataTable';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatCard } from '@shared/ui/StatCard';
import { StatusBadge } from '@shared/ui/StatusBadge';
const FILTERS = [
    { label: 'All', value: 'all' },
    { label: 'Paid', value: 'paid' },
    { label: 'Pending', value: 'pending' },
    { label: 'Overdue', value: 'overdue' },
    { label: 'Refunded', value: 'refunded' },
];
export default function PaymentsPage() {
    const [status, setStatus] = useState('all');
    const [list, stats, students] = useQueries({
        queries: [
            {
                queryKey: queryKeys.payments.list({ status }),
                queryFn: () => paymentApi.list({
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
        const m = new Map();
        students.data?.data.forEach((s) => m.set(s.id, s.fullName));
        return m;
    }, [students.data]);
    const columns = useMemo(() => [
        {
            accessorKey: 'studentId',
            header: 'Student',
            Cell: ({ cell }) => (_jsx(Text, { fz: 14, fw: 600, children: studentMap.get(cell.getValue()) ?? cell.getValue() })),
        },
        {
            accessorKey: 'amountUZS',
            header: 'Amount',
            Cell: ({ cell }) => (_jsx(Text, { fz: 14, fw: 700, children: formatUZS(cell.getValue(), { compact: true }) })),
        },
        {
            accessorKey: 'method',
            header: 'Method',
            Cell: ({ cell }) => (_jsx(Badge, { variant: "light", radius: "sm", color: "gray", tt: "capitalize", children: cell.getValue() })),
        },
        {
            accessorKey: 'dueAt',
            header: 'Due',
            Cell: ({ cell }) => (_jsx(Text, { fz: 13, children: formatDate(cell.getValue()) })),
        },
        {
            accessorKey: 'paidAt',
            header: 'Paid',
            Cell: ({ cell }) => {
                const v = cell.getValue();
                return v ? _jsx(Text, { fz: 13, children: formatDate(v) }) : _jsx(Text, { fz: 13, c: "dimmed", children: "\u2014" });
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ cell }) => _jsx(StatusBadge, { status: cell.getValue() }),
        },
    ], [studentMap]);
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Payments", description: "Track invoices, debt and reconciliations.", actions: _jsx(Button, { leftSection: _jsx(IconPlus, { size: 14 }), size: "sm", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "Record payment" }) }), _jsxs(SimpleGrid, { cols: { base: 1, sm: 2, lg: 4 }, spacing: "md", children: [_jsx(StatCard, { label: "Total revenue", value: formatUZS(stats.data?.totalRevenue ?? 0, { compact: true }), delta: 9, icon: _jsx(IconCash, { size: 18 }), accent: "success", loading: stats.isLoading }), _jsx(StatCard, { label: "Outstanding", value: formatUZS(stats.data?.totalOverdue ?? 0, { compact: true }), delta: -4, icon: _jsx(IconClockHour4, { size: 18 }), accent: "danger", loading: stats.isLoading }), _jsx(StatCard, { label: "Paid invoices", value: formatNumber(stats.data?.paidCount ?? 0), delta: 12, accent: "brand", icon: _jsx(IconTrendingUp, { size: 18 }), loading: stats.isLoading }), _jsx(StatCard, { label: "Pending invoices", value: formatNumber(stats.data?.pendingCount ?? 0), delta: 2, accent: "warning", icon: _jsx(IconClockHour4, { size: 18 }), loading: stats.isLoading })] }), _jsx(Group, { justify: "space-between", children: _jsx(SegmentedControl, { size: "xs", data: FILTERS, value: status, onChange: (v) => setStatus(v) }) }), _jsx(DataTable, { data: list.data?.data ?? [], columns: columns, loading: list.isLoading, total: list.data?.total, onRefresh: () => list.refetch(), onExport: () => undefined })] }));
}
