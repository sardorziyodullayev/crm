import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Avatar, Badge, Button, Group, Menu, SegmentedControl, Stack, Text, Tooltip, } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconArchive, IconDots, IconDownload, IconEye, IconPencil, IconTrash, IconUserPlus, } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { studentApi } from '@entities/student';
import { queryKeys } from '@shared/api';
import { formatPhone, formatUZS, fromNow, initials } from '@shared/lib/format';
import { DataTable } from '@shared/ui/DataTable';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { StudentFormModal } from '@features/students/ui/StudentFormModal';
const STATUS_FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'trial', label: 'Trial' },
    { value: 'frozen', label: 'Frozen' },
    { value: 'archived', label: 'Archived' },
];
export default function StudentsPage() {
    const [search] = useSearchParams();
    const [statusFilter, setStatusFilter] = useState('all');
    const [createOpen, setCreateOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();
    const qc = useQueryClient();
    useEffect(() => {
        if (search.get('new') === '1')
            setCreateOpen(true);
    }, [search]);
    const query = useQuery({
        queryKey: queryKeys.students.list({ status: statusFilter }),
        queryFn: () => studentApi.list({
            status: statusFilter,
            page: 1,
            pageSize: 50,
            sortBy: 'joinedAt',
            sortDir: 'desc',
        }),
    });
    const remove = useMutation({
        mutationFn: (ids) => studentApi.remove(ids),
        onSuccess: (_, ids) => {
            qc.invalidateQueries({ queryKey: queryKeys.students.all });
            notifications.show({
                title: 'Removed',
                message: `${ids.length} ${ids.length === 1 ? 'student' : 'students'} archived`,
                color: 'red',
            });
        },
    });
    const columns = useMemo(() => [
        {
            accessorKey: 'fullName',
            header: 'Student',
            size: 280,
            Cell: ({ row }) => {
                const s = row.original;
                return (_jsxs(Group, { gap: "sm", wrap: "nowrap", children: [_jsx(Avatar, { src: s.avatarUrl, radius: "xl", size: 36, color: "brand", children: initials(s.fullName) }), _jsxs(Stack, { gap: 0, children: [_jsx(Text, { fw: 600, fz: 14, children: s.fullName }), _jsxs(Text, { fz: 12, c: "dimmed", children: [s.id, " \u00B7 ", s.gender] })] })] }));
            },
        },
        {
            accessorKey: 'phone',
            header: 'Contact',
            Cell: ({ row }) => (_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 13, children: formatPhone(row.original.phone) }), _jsx(Text, { fz: 12, c: "dimmed", lineClamp: 1, children: row.original.email || '—' })] })),
        },
        {
            accessorKey: 'branch',
            header: 'Branch',
            Cell: ({ cell }) => (_jsx(Text, { fz: 13, c: "dimmed", children: cell.getValue() })),
        },
        {
            accessorKey: 'groupIds',
            header: 'Groups',
            Cell: ({ cell }) => {
                const groups = cell.getValue();
                return (_jsxs(Badge, { variant: "light", radius: "sm", color: "brand", children: [groups.length, " ", groups.length === 1 ? 'group' : 'groups'] }));
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ cell }) => _jsx(StatusBadge, { status: cell.getValue() }),
        },
        {
            accessorKey: 'balanceUZS',
            header: 'Balance',
            Cell: ({ cell }) => {
                const v = cell.getValue();
                return (_jsx(Text, { fz: 13, fw: 600, c: v < 0 ? 'red.5' : v > 0 ? 'teal.5' : undefined, children: formatUZS(v, { compact: true }) }));
            },
        },
        {
            accessorKey: 'joinedAt',
            header: 'Joined',
            Cell: ({ cell }) => (_jsx(Text, { fz: 12, c: "dimmed", children: fromNow(cell.getValue()) })),
        },
    ], []);
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Students", description: "Manage all student profiles, placements and history.", actions: _jsxs(Group, { gap: "xs", children: [_jsx(Button, { leftSection: _jsx(IconDownload, { size: 14 }), variant: "light", size: "sm", children: "Export" }), _jsx(Button, { leftSection: _jsx(IconUserPlus, { size: 14 }), size: "sm", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, onClick: () => setCreateOpen(true), children: "Add student" })] }) }), _jsxs(Group, { justify: "space-between", children: [_jsx(SegmentedControl, { size: "xs", data: STATUS_FILTERS, value: statusFilter, onChange: (v) => setStatusFilter(v) }), _jsxs(Group, { gap: 6, children: [_jsx(Text, { fz: 12, c: "dimmed", children: "Showing" }), _jsxs(Badge, { variant: "light", color: "brand", radius: "sm", children: [query.data?.total ?? 0, " records"] })] })] }), _jsx(DataTable, { data: query.data?.data ?? [], columns: columns, loading: query.isLoading, total: query.data?.total, onRefresh: () => query.refetch(), onExport: () => notifications.show({ title: 'Export started', message: 'CSV will be ready shortly', color: 'brand' }), emptyTitle: "No students yet", emptyDescription: "Add your first student to begin tracking attendance and payments.", rowActions: (row) => (_jsxs(Menu, { position: "bottom-end", shadow: "md", radius: "md", width: 180, children: [_jsx(Menu.Target, { children: _jsx(Tooltip, { label: "Actions", children: _jsx(ActionIcon, { variant: "subtle", color: "gray", children: _jsx(IconDots, { size: 16 }) }) }) }), _jsxs(Menu.Dropdown, { children: [_jsx(Menu.Item, { leftSection: _jsx(IconEye, { size: 14 }), onClick: () => navigate(ROUTES.studentDetails(row.id)), children: "View profile" }), _jsx(Menu.Item, { leftSection: _jsx(IconPencil, { size: 14 }), onClick: () => setEditing(row), children: "Edit" }), _jsx(Menu.Item, { leftSection: _jsx(IconArchive, { size: 14 }), children: "Archive" }), _jsx(Menu.Divider, {}), _jsx(Menu.Item, { color: "red", leftSection: _jsx(IconTrash, { size: 14 }), onClick: () => modals.openConfirmModal({
                                        title: 'Remove student?',
                                        centered: true,
                                        children: (_jsxs(Text, { size: "sm", children: ["Are you sure you want to remove ", _jsx("b", { children: row.fullName }), "? This action can be reverted within 30 days."] })),
                                        labels: { confirm: 'Remove', cancel: 'Cancel' },
                                        confirmProps: { color: 'red' },
                                        onConfirm: () => remove.mutate([row.id]),
                                    }), children: "Remove" })] })] })) }), _jsx(StudentFormModal, { opened: createOpen, onClose: () => setCreateOpen(false) }), _jsx(StudentFormModal, { opened: Boolean(editing), onClose: () => setEditing(null), initial: editing ?? undefined })] }));
}
