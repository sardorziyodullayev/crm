import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Badge, Box, Button, Group, Progress, SegmentedControl, SimpleGrid, Stack, Text, TextInput, Tooltip, } from '@mantine/core';
import { IconPlus, IconSearch, IconUsers } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { groupApi } from '@entities/group';
import { teacherApi } from '@entities/teacher';
import { queryKeys } from '@shared/api';
import { formatDate, formatUZS, initials } from '@shared/lib/format';
import { EmptyState } from '@shared/ui/EmptyState';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const STATUSES = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'planned', label: 'Planned' },
    { value: 'completed', label: 'Completed' },
];
export default function GroupsPage() {
    const [status, setStatus] = useState('all');
    const [search, setSearch] = useState('');
    const [groupsQ, teachersQ] = useQueries({
        queries: [
            { queryKey: queryKeys.groups.all, queryFn: () => groupApi.list({ pageSize: 100 }) },
            { queryKey: queryKeys.teachers.all, queryFn: () => teacherApi.list({ pageSize: 100 }) },
        ],
    });
    const teachersById = useMemo(() => {
        const map = new Map();
        teachersQ.data?.data.forEach((t) => map.set(t.id, { fullName: t.fullName, avatarUrl: t.avatarUrl }));
        return map;
    }, [teachersQ.data]);
    const filtered = useMemo(() => {
        let items = groupsQ.data?.data ?? [];
        if (status !== 'all')
            items = items.filter((g) => g.status === status);
        if (search) {
            const s = search.toLowerCase();
            items = items.filter((g) => g.name.toLowerCase().includes(s) ||
                g.course.toLowerCase().includes(s) ||
                g.branch.toLowerCase().includes(s));
        }
        return items;
    }, [groupsQ.data, status, search]);
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Groups", description: "Cohorts running across your branches.", actions: _jsx(Button, { leftSection: _jsx(IconPlus, { size: 14 }), size: "sm", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "New group" }) }), _jsxs(Group, { justify: "space-between", wrap: "wrap", children: [_jsx(SegmentedControl, { size: "xs", data: STATUSES, value: status, onChange: (v) => setStatus(v) }), _jsx(TextInput, { leftSection: _jsx(IconSearch, { size: 14 }), placeholder: "Search groups\u2026", size: "xs", value: search, onChange: (e) => setSearch(e.currentTarget.value), w: 260 })] }), groupsQ.isLoading ? (_jsx(SimpleGrid, { cols: { base: 1, sm: 2, lg: 3 }, spacing: "md", children: Array.from({ length: 6 }).map((_, i) => (_jsx(SurfaceCard, { children: _jsxs(Stack, { gap: "xs", children: [_jsx(Box, { h: 18, style: { background: 'var(--app-surface-2)', borderRadius: 6 } }), _jsx(Box, { h: 12, style: { background: 'var(--app-surface-2)', borderRadius: 6, width: '60%' } }), _jsx(Box, { h: 120, style: { background: 'var(--app-surface-2)', borderRadius: 8 } })] }) }, i))) })) : filtered.length === 0 ? (_jsx(EmptyState, { title: "No groups found", description: "Try adjusting your search or open a new cohort.", icon: _jsx(IconUsers, { size: 28 }) })) : (_jsx(SimpleGrid, { cols: { base: 1, sm: 2, lg: 3 }, spacing: "md", children: filtered.map((g, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, delay: i * 0.03 }, children: _jsx(GroupCard, { group: g, teacher: teachersById.get(g.teacherId) }) }, g.id))) }))] }));
}
function GroupCard({ group, teacher, }) {
    const fillPercent = Math.min(100, Math.round((group.studentIds.length / group.capacity) * 100));
    return (_jsxs(SurfaceCard, { hover: true, style: { overflow: 'hidden', position: 'relative' }, children: [_jsx(Box, { "aria-hidden": true, style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(99,102,241,.10), rgba(168,85,247,.05))',
                    opacity: 0.4,
                    pointerEvents: 'none',
                } }), _jsxs(Stack, { gap: "md", pos: "relative", children: [_jsxs(Group, { justify: "space-between", wrap: "nowrap", children: [_jsxs(Stack, { gap: 2, style: { minWidth: 0 }, children: [_jsx(Text, { fz: 11, c: "dimmed", tt: "uppercase", fw: 700, style: { letterSpacing: 0.6 }, children: group.course }), _jsx(Text, { component: Link, to: ROUTES.groupDetails(group.id), fz: 16, fw: 700, lineClamp: 1, style: { textDecoration: 'none', color: 'inherit' }, children: group.name })] }), _jsx(StatusBadge, { status: group.status })] }), _jsxs(Group, { gap: "xs", wrap: "wrap", children: [_jsx(Badge, { variant: "light", color: "brand", radius: "sm", children: group.level }), _jsx(Badge, { variant: "light", color: "gray", radius: "sm", children: group.branch }), _jsx(Badge, { variant: "light", color: "accent", radius: "sm", children: group.room })] }), _jsxs(Stack, { gap: 6, children: [_jsx(Group, { justify: "space-between", children: _jsxs(Text, { fz: 12, c: "dimmed", children: [group.schedule.days.join(' · '), " \u00B7 ", group.schedule.time] }) }), _jsxs(Stack, { gap: 4, children: [_jsxs(Group, { justify: "space-between", children: [_jsx(Text, { fz: 12, c: "dimmed", children: "Enrolled" }), _jsxs(Text, { fz: 12, fw: 600, children: [group.studentIds.length, " / ", group.capacity] })] }), _jsx(Progress, { value: fillPercent, radius: "xl", color: fillPercent > 90 ? 'red' : 'brand', size: "sm" })] })] }), _jsxs(Group, { justify: "space-between", mt: "xs", children: [_jsxs(Group, { gap: "sm", wrap: "nowrap", children: [_jsx(Avatar, { size: 28, radius: "xl", src: teacher?.avatarUrl, color: "accent", variant: "light", children: initials(teacher?.fullName ?? 'T') }), _jsxs(Stack, { gap: 0, children: [_jsx(Text, { fz: 12, fw: 600, lineClamp: 1, children: teacher?.fullName ?? 'Unassigned' }), _jsx(Text, { fz: 11, c: "dimmed", children: "Mentor" })] })] }), _jsx(Tooltip, { label: "Course price", children: _jsx(Text, { fz: 13, fw: 700, children: formatUZS(group.priceUZS, { compact: true }) }) })] }), _jsxs(Text, { fz: 11, c: "dimmed", children: ["Cohort ", formatDate(group.startDate), " \u2192 ", formatDate(group.endDate)] })] })] }));
}
