import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Box, Button, Group, SegmentedControl, Stack, Text, } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { groupApi } from '@entities/group';
import { queryKeys } from '@shared/api';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const DAY_MAP = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};
export default function CalendarPage() {
    const [cursor, setCursor] = useState(dayjs().startOf('week'));
    const [view, setView] = useState('week');
    const days = Array.from({ length: 7 }).map((_, i) => cursor.add(i, 'day'));
    const groupsQ = useQuery({
        queryKey: queryKeys.groups.all,
        queryFn: () => groupApi.list({ pageSize: 100 }),
    });
    const sessions = useMemo(() => {
        const list = (groupsQ.data?.data ?? []).filter((g) => g.status === 'active');
        return list.flatMap((g) => g.schedule.days.map((d) => ({
            groupId: g.id,
            groupName: g.name,
            course: g.course,
            room: g.room,
            day: DAY_MAP[d] ?? 0,
            time: g.schedule.time,
        })));
    }, [groupsQ.data]);
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Calendar", description: "Plan classes and operational events.", actions: _jsxs(Group, { gap: "xs", children: [_jsx(SegmentedControl, { size: "xs", data: [
                                { label: 'Week', value: 'week' },
                                { label: 'Day', value: 'day' },
                            ], value: view, onChange: (v) => setView(v) }), _jsx(Button, { leftSection: _jsx(IconPlus, { size: 14 }), size: "sm", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "New event" })] }) }), _jsxs(SurfaceCard, { children: [_jsxs(Group, { justify: "space-between", mb: "md", children: [_jsxs(Group, { gap: "xs", children: [_jsx(Button, { size: "xs", variant: "default", leftSection: _jsx(IconChevronLeft, { size: 14 }), onClick: () => setCursor((c) => c.subtract(1, 'week')), children: "Prev" }), _jsx(Button, { size: "xs", variant: "default", onClick: () => setCursor(dayjs().startOf('week')), children: "Today" }), _jsx(Button, { size: "xs", variant: "default", rightSection: _jsx(IconChevronRight, { size: 14 }), onClick: () => setCursor((c) => c.add(1, 'week')), children: "Next" })] }), _jsxs(Text, { fw: 700, fz: 16, children: [cursor.format('MMM D'), " \u2192 ", cursor.add(6, 'day').format('MMM D, YYYY')] })] }), _jsx(Box, { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }, children: days.map((d, i) => (_jsxs(Stack, { gap: 6, children: [_jsxs(Stack, { gap: 0, p: "sm", style: {
                                        background: 'var(--app-surface-2)',
                                        borderRadius: 10,
                                        border: '1px solid var(--app-border)',
                                    }, children: [_jsx(Text, { fz: 10, c: "dimmed", tt: "uppercase", fw: 700, style: { letterSpacing: 0.6 }, children: d.format('ddd') }), _jsxs(Group, { justify: "space-between", children: [_jsx(Text, { fz: 20, fw: 800, children: d.format('D') }), d.isSame(dayjs(), 'day') && (_jsx(Badge, { size: "xs", variant: "filled", color: "brand", children: "Today" }))] })] }), _jsx(Stack, { gap: 6, children: sessions
                                        .filter((s) => s.day === d.day())
                                        .map((s, idx) => (_jsx(motion.div, { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.18, delay: idx * 0.02 }, children: _jsxs(Stack, { gap: 2, p: "xs", style: {
                                                borderLeft: '3px solid var(--mantine-color-brand-5)',
                                                background: 'linear-gradient(180deg, rgba(99,102,241,.08), rgba(99,102,241,.02))',
                                                borderRadius: 8,
                                            }, children: [_jsx(Text, { fz: 11, fw: 700, lineClamp: 1, children: s.groupName }), _jsxs(Text, { fz: 10, c: "dimmed", children: [s.time, " \u00B7 ", s.room] })] }) }, s.groupId + idx))) })] }, i))) })] })] }));
}
