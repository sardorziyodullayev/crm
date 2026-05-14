import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Avatar, Badge, Box, Button, Group, Select, SimpleGrid, Stack, Text, Tooltip, } from '@mantine/core';
import { IconCheck, IconClock, IconNote, IconX } from '@tabler/icons-react';
import { useQueries, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { groupApi } from '@entities/group';
import { studentApi } from '@entities/student';
import { mockAttendance, queryKeys } from '@shared/api';
import { initials } from '@shared/lib/format';
import { EmptyState } from '@shared/ui/EmptyState';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const STATUS_OPTIONS = [
    'present',
    'late',
    'absent',
    'excused',
];
const STATUS_COLORS = {
    present: 'teal',
    late: 'yellow',
    absent: 'red',
    excused: 'gray',
};
export default function AttendancePage() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupsQ, studentsQ] = useQueries({
        queries: [
            { queryKey: queryKeys.groups.all, queryFn: () => groupApi.list({ pageSize: 100 }) },
            { queryKey: queryKeys.students.all, queryFn: () => studentApi.list({ pageSize: 300 }) },
        ],
    });
    useEffect(() => {
        if (!selectedGroup && groupsQ.data?.data[0]) {
            setSelectedGroup(groupsQ.data.data[0].id);
        }
    }, [groupsQ.data, selectedGroup]);
    const attendanceQ = useQuery({
        queryKey: queryKeys.attendance.byGroup(selectedGroup ?? '', dayjs().format('YYYY-MM')),
        queryFn: () => mockAttendance.byGroup(selectedGroup),
        enabled: Boolean(selectedGroup),
    });
    const sheets = attendanceQ.data ?? [];
    const studentMap = useMemo(() => {
        const m = new Map();
        studentsQ.data?.data.forEach((s) => m.set(s.id, { name: s.fullName, avatar: s.avatarUrl }));
        return m;
    }, [studentsQ.data]);
    const today = sheets.find((s) => s.date === dayjs().format('YYYY-MM-DD')) ?? sheets[0];
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Attendance", description: "Mark and review attendance per cohort.", actions: _jsx(Button, { size: "sm", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "Save changes" }) }), _jsxs(Group, { gap: "md", wrap: "wrap", children: [_jsx(Select, { label: "Group", placeholder: "Pick a group", data: (groupsQ.data?.data ?? []).map((g) => ({ value: g.id, label: g.name })), value: selectedGroup, onChange: setSelectedGroup, searchable: true, maw: 360 }), _jsx(Select, { label: "Month", data: ['September', 'October', 'November', 'December'], defaultValue: "October", maw: 200 })] }), !today ? (_jsx(EmptyState, { title: "No attendance data for this group yet", description: "Pick another group or create a session in the schedule.", icon: _jsx(IconClock, { size: 28 }) })) : (_jsxs(SimpleGrid, { cols: { base: 1, lg: 3 }, spacing: "md", children: [_jsx(Box, { style: { gridColumn: 'span 2' }, children: _jsxs(SurfaceCard, { children: [_jsxs(Group, { justify: "space-between", mb: "md", children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 700, style: { letterSpacing: 0.6 }, children: "Today's roster" }), _jsx(Text, { fz: 16, fw: 700, children: dayjs(today.date).format('dddd · MMM D, YYYY') })] }), _jsxs(Group, { gap: "xs", children: [_jsxs(Badge, { color: "teal", variant: "light", children: [today.records.filter((r) => r.status === 'present').length, " present"] }), _jsxs(Badge, { color: "red", variant: "light", children: [today.records.filter((r) => r.status === 'absent').length, " absent"] }), _jsxs(Badge, { color: "yellow", variant: "light", children: [today.records.filter((r) => r.status === 'late').length, " late"] })] })] }), _jsx(Stack, { gap: "xs", children: today.records.map((r, i) => {
                                        const s = studentMap.get(r.studentId);
                                        return (_jsx(motion.div, { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, delay: i * 0.02 }, children: _jsxs(Group, { justify: "space-between", p: "sm", style: {
                                                    border: '1px solid var(--app-border)',
                                                    borderRadius: 12,
                                                }, children: [_jsxs(Group, { gap: "sm", children: [_jsx(Avatar, { size: 32, radius: "xl", color: "brand", variant: "light", children: initials(s?.name ?? '?') }), _jsx(Text, { fz: 14, fw: 600, children: s?.name ?? r.studentId })] }), _jsx(Group, { gap: 6, children: STATUS_OPTIONS.map((opt) => (_jsx(Tooltip, { label: opt, children: _jsxs(ActionIcon, { size: "lg", radius: "md", variant: r.status === opt ? 'filled' : 'subtle', color: STATUS_COLORS[opt], children: [opt === 'present' && _jsx(IconCheck, { size: 14 }), opt === 'late' && _jsx(IconClock, { size: 14 }), opt === 'absent' && _jsx(IconX, { size: 14 }), opt === 'excused' && _jsx(IconNote, { size: 14 })] }) }, opt))) })] }) }, r.studentId));
                                    }) })] }) }), _jsx(SurfaceCard, { children: _jsxs(Stack, { gap: "md", children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 700, style: { letterSpacing: 0.6 }, children: "Calendar" }), _jsx(Text, { fz: 16, fw: 700, children: "Recent sessions" })] }), _jsx(Stack, { gap: "xs", children: sheets.slice(0, 8).map((s) => {
                                        const present = s.records.filter((r) => r.status === 'present').length;
                                        const pct = Math.round((present / Math.max(1, s.records.length)) * 100);
                                        return (_jsxs(Group, { justify: "space-between", gap: "md", children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 13, fw: 600, children: dayjs(s.date).format('ddd · MMM D') }), _jsxs(Text, { fz: 11, c: "dimmed", children: [present, " / ", s.records.length, " present"] })] }), _jsxs(Badge, { variant: "light", color: pct >= 90 ? 'teal' : pct >= 70 ? 'yellow' : 'red', children: [pct, "%"] })] }, s.date));
                                    }) })] }) })] }))] }));
}
