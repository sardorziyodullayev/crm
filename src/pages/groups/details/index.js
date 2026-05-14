import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Badge, Box, Button, Group, Progress, SimpleGrid, Stack, Tabs, Text, Title, } from '@mantine/core';
import { IconArrowLeft, IconCalendar, IconCash, IconUserCheck, IconUsers, } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { groupApi } from '@entities/group';
import { studentApi } from '@entities/student';
import { teacherApi } from '@entities/teacher';
import { queryKeys } from '@shared/api';
import { formatDate, formatUZS, initials } from '@shared/lib/format';
import { EmptyState } from '@shared/ui/EmptyState';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
export default function GroupDetailsPage() {
    const { id = '' } = useParams();
    const [groupQ, studentsQ, teachersQ] = useQueries({
        queries: [
            { queryKey: queryKeys.groups.byId(id), queryFn: () => groupApi.byId(id), enabled: Boolean(id) },
            { queryKey: queryKeys.students.list({ pageSize: 200 }), queryFn: () => studentApi.list({ pageSize: 200 }) },
            { queryKey: queryKeys.teachers.all, queryFn: () => teacherApi.list({ pageSize: 100 }) },
        ],
    });
    const group = groupQ.data;
    if (!group)
        return _jsx(Box, { h: "60vh" });
    const teacher = teachersQ.data?.data.find((t) => t.id === group.teacherId);
    const studentsInGroup = (studentsQ.data?.data ?? []).filter((s) => group.studentIds.includes(s.id));
    const fillPercent = Math.min(100, Math.round((studentsInGroup.length / group.capacity) * 100));
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(Group, { children: _jsx(Button, { component: Link, to: ROUTES.groups, leftSection: _jsx(IconArrowLeft, { size: 14 }), variant: "subtle", size: "xs", children: "Back to groups" }) }), _jsx(PageHeader, { title: group.name, description: `${group.course} · ${group.level} · ${group.branch}`, badge: _jsx(StatusBadge, { status: group.status }), actions: _jsxs(Group, { gap: "xs", children: [_jsx(Button, { leftSection: _jsx(IconUserCheck, { size: 14 }), variant: "light", size: "sm", children: "Take attendance" }), _jsx(Button, { leftSection: _jsx(IconCash, { size: 14 }), size: "sm", children: "Record payment" })] }) }), _jsxs(SimpleGrid, { cols: { base: 1, lg: 4 }, spacing: "md", children: [_jsx(SurfaceCard, { children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 11, c: "dimmed", tt: "uppercase", fw: 700, style: { letterSpacing: 0.6 }, children: "Enrolled" }), _jsxs(Group, { justify: "space-between", children: [_jsx(Text, { fz: 26, fw: 800, style: { letterSpacing: '-0.02em' }, children: studentsInGroup.length }), _jsxs(Badge, { variant: "light", color: "brand", children: ["of ", group.capacity] })] }), _jsx(Progress, { value: fillPercent, mt: "xs", radius: "xl" })] }) }), _jsx(SurfaceCard, { children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 11, c: "dimmed", tt: "uppercase", fw: 700, style: { letterSpacing: 0.6 }, children: "Schedule" }), _jsx(Text, { fz: 16, fw: 700, children: group.schedule.days.join(' · ') }), _jsx(Text, { fz: 13, c: "dimmed", children: group.schedule.time })] }) }), _jsx(SurfaceCard, { children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 11, c: "dimmed", tt: "uppercase", fw: 700, style: { letterSpacing: 0.6 }, children: "Course price" }), _jsx(Text, { fz: 22, fw: 800, style: { letterSpacing: '-0.02em' }, children: formatUZS(group.priceUZS, { compact: true }) }), _jsx(Text, { fz: 12, c: "dimmed", children: "monthly" })] }) }), _jsx(SurfaceCard, { children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 11, c: "dimmed", tt: "uppercase", fw: 700, style: { letterSpacing: 0.6 }, children: "Mentor" }), _jsxs(Group, { gap: "xs", children: [_jsx(Avatar, { size: 32, radius: "xl", color: "accent", variant: "light", children: initials(teacher?.fullName ?? 'T') }), _jsxs(Stack, { gap: 0, children: [_jsx(Text, { fz: 14, fw: 600, children: teacher?.fullName ?? 'Unassigned' }), _jsx(Text, { fz: 12, c: "dimmed", children: teacher?.specialty })] })] })] }) })] }), _jsx(SurfaceCard, { children: _jsxs(Tabs, { defaultValue: "roster", children: [_jsxs(Tabs.List, { mb: "md", children: [_jsx(Tabs.Tab, { value: "roster", leftSection: _jsx(IconUsers, { size: 14 }), children: "Roster" }), _jsx(Tabs.Tab, { value: "schedule", leftSection: _jsx(IconCalendar, { size: 14 }), children: "Schedule" }), _jsx(Tabs.Tab, { value: "financials", leftSection: _jsx(IconCash, { size: 14 }), children: "Financials" })] }), _jsx(Tabs.Panel, { value: "roster", children: studentsInGroup.length === 0 ? (_jsx(EmptyState, { title: "No students enrolled", description: "Add students from the Students page." })) : (_jsx(SimpleGrid, { cols: { base: 1, sm: 2, md: 3 }, spacing: "xs", children: studentsInGroup.map((s) => (_jsx(Link, { to: ROUTES.studentDetails(s.id), style: { textDecoration: 'none', color: 'inherit' }, children: _jsxs(Group, { p: "sm", style: {
                                            border: '1px solid var(--app-border)',
                                            borderRadius: 12,
                                        }, children: [_jsx(Avatar, { size: 32, radius: "xl", color: "brand", variant: "light", children: initials(s.fullName) }), _jsxs(Stack, { gap: 0, children: [_jsx(Text, { fz: 13, fw: 600, children: s.fullName }), _jsx(Text, { fz: 11, c: "dimmed", children: s.phone })] })] }) }, s.id))) })) }), _jsx(Tabs.Panel, { value: "schedule", children: _jsxs(Stack, { gap: "xs", children: [_jsxs(Title, { order: 5, children: ["Cohort ", formatDate(group.startDate), " \u2192 ", formatDate(group.endDate)] }), _jsxs(Text, { c: "dimmed", size: "sm", children: [group.schedule.days.join(', '), " \u00B7 ", group.schedule.time] })] }) }), _jsx(Tabs.Panel, { value: "financials", children: _jsxs(SimpleGrid, { cols: { base: 1, sm: 2, md: 3 }, spacing: "md", children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 11, c: "dimmed", tt: "uppercase", fw: 600, children: "Expected revenue" }), _jsx(Text, { fz: 22, fw: 800, children: formatUZS(group.priceUZS * studentsInGroup.length, { compact: true }) })] }), _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 11, c: "dimmed", tt: "uppercase", fw: 600, children: "Collected" }), _jsx(Text, { fz: 22, fw: 800, c: "teal.5", children: formatUZS(group.priceUZS * Math.round(studentsInGroup.length * 0.78), { compact: true }) })] }), _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 11, c: "dimmed", tt: "uppercase", fw: 600, children: "Outstanding" }), _jsx(Text, { fz: 22, fw: 800, c: "red.5", children: formatUZS(group.priceUZS * Math.round(studentsInGroup.length * 0.22), { compact: true }) })] })] }) })] }) })] }));
}
