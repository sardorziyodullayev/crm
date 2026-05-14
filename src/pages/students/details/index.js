import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Anchor, Avatar, Badge, Box, Button, Group, SimpleGrid, Stack, Tabs, Text, Timeline, Title, } from '@mantine/core';
import { IconArrowLeft, IconCalendarStats, IconCash, IconMail, IconMapPin, IconMessage, IconPencil, IconPhone, IconStar, IconUserCheck, } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { studentApi } from '@entities/student';
import { paymentApi } from '@entities/payment';
import { queryKeys } from '@shared/api';
import { formatDate, formatUZS, fromNow, initials } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
import { EmptyState } from '@shared/ui/EmptyState';
export default function StudentDetailsPage() {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const studentQ = useQuery({
        queryKey: queryKeys.students.byId(id),
        queryFn: () => studentApi.byId(id),
        enabled: Boolean(id),
    });
    const paymentsQ = useQuery({
        queryKey: queryKeys.payments.list({ studentId: id }),
        queryFn: () => paymentApi.list({ pageSize: 100 }),
    });
    const student = studentQ.data;
    if (studentQ.isLoading) {
        return _jsx(Box, { h: "60vh" });
    }
    if (!student) {
        return (_jsx(EmptyState, { title: "Student not found", description: "The profile you're looking for may have been removed.", action: { label: 'Back to students', onClick: () => navigate(ROUTES.students) } }));
    }
    const studentPayments = (paymentsQ.data?.data ?? []).filter((p) => p.studentId === id);
    const totalPaid = studentPayments
        .filter((p) => p.status === 'paid')
        .reduce((s, p) => s + p.amountUZS, 0);
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(Group, { children: _jsx(Button, { component: Link, to: ROUTES.students, leftSection: _jsx(IconArrowLeft, { size: 14 }), variant: "subtle", size: "xs", children: "Back to students" }) }), _jsx(PageHeader, { title: student.fullName, description: `Joined ${formatDate(student.joinedAt)} · ${student.branch}`, badge: _jsx(StatusBadge, { status: student.status }), actions: _jsxs(Group, { gap: "xs", children: [_jsx(Button, { leftSection: _jsx(IconMessage, { size: 14 }), variant: "light", size: "sm", children: "Message" }), _jsx(Button, { leftSection: _jsx(IconPencil, { size: 14 }), size: "sm", children: "Edit profile" })] }) }), _jsxs(SimpleGrid, { cols: { base: 1, lg: 3 }, spacing: "md", children: [_jsxs(SurfaceCard, { children: [_jsxs(Stack, { align: "center", gap: "md", py: "md", children: [_jsx(Avatar, { size: 88, radius: 88, color: "brand", variant: "light", children: initials(student.fullName) }), _jsxs(Stack, { gap: 2, ta: "center", children: [_jsx(Title, { order: 4, children: student.fullName }), _jsx(Text, { fz: 13, c: "dimmed", children: student.id })] }), _jsx(Group, { gap: "xs", wrap: "wrap", justify: "center", children: student.tags.map((t) => (_jsx(Badge, { variant: "light", color: "accent", radius: "sm", children: t }, t))) })] }), _jsxs(Stack, { gap: 6, mt: "md", children: [_jsxs(Group, { gap: "sm", align: "center", children: [_jsx(IconPhone, { size: 14, stroke: 1.6 }), _jsx(Anchor, { href: `tel:${student.phone}`, size: "sm", children: student.phone })] }), student.email && (_jsxs(Group, { gap: "sm", align: "center", children: [_jsx(IconMail, { size: 14, stroke: 1.6 }), _jsx(Anchor, { href: `mailto:${student.email}`, size: "sm", children: student.email })] })), _jsxs(Group, { gap: "sm", align: "center", children: [_jsx(IconMapPin, { size: 14, stroke: 1.6 }), _jsx(Text, { size: "sm", children: student.branch })] }), _jsxs(Group, { gap: "sm", align: "center", children: [_jsx(IconCalendarStats, { size: 14, stroke: 1.6 }), _jsxs(Text, { size: "sm", children: ["Born ", formatDate(student.birthDate)] })] })] })] }), _jsx(Box, { style: { gridColumn: 'span 2' }, children: _jsx(SurfaceCard, { children: _jsxs(Tabs, { defaultValue: "overview", keepMounted: false, children: [_jsxs(Tabs.List, { mb: "md", children: [_jsx(Tabs.Tab, { value: "overview", leftSection: _jsx(IconStar, { size: 14 }), children: "Overview" }), _jsx(Tabs.Tab, { value: "attendance", leftSection: _jsx(IconUserCheck, { size: 14 }), children: "Attendance" }), _jsx(Tabs.Tab, { value: "payments", leftSection: _jsx(IconCash, { size: 14 }), children: "Payments" })] }), _jsxs(Tabs.Panel, { value: "overview", children: [_jsxs(SimpleGrid, { cols: { base: 1, sm: 3 }, mb: "md", children: [_jsx(Stat, { label: "Active groups", value: student.groupIds.length }), _jsx(Stat, { label: "Total paid", value: formatUZS(totalPaid, { compact: true }) }), _jsx(Stat, { label: "Balance", value: formatUZS(student.balanceUZS, { compact: true }), accent: student.balanceUZS < 0 ? 'red.5' : 'teal.5' })] }), _jsxs(Stack, { gap: 4, mt: "lg", children: [_jsx(Text, { fz: 12, tt: "uppercase", c: "dimmed", fw: 600, children: "Parent" }), _jsx(Text, { fz: 14, children: student.parentName }), _jsx(Anchor, { href: `tel:${student.parentPhone}`, size: "sm", children: student.parentPhone })] })] }), _jsx(Tabs.Panel, { value: "attendance", children: _jsxs(Timeline, { active: 2, bulletSize: 20, lineWidth: 2, children: [_jsx(Timeline.Item, { title: "Mon \u00B7 IELTS Intensive", children: _jsx(Text, { c: "dimmed", size: "sm", children: "Present \u00B7 18:00 \u2014 20:00" }) }), _jsx(Timeline.Item, { title: "Wed \u00B7 IELTS Intensive", children: _jsx(Text, { c: "dimmed", size: "sm", children: "Late \u00B7 arrived 18:12" }) }), _jsx(Timeline.Item, { title: "Fri \u00B7 IELTS Intensive", color: "red", children: _jsx(Text, { c: "dimmed", size: "sm", children: "Absent \u00B7 no reason" }) })] }) }), _jsx(Tabs.Panel, { value: "payments", children: _jsx(Stack, { gap: "xs", children: studentPayments.length === 0 ? (_jsx(EmptyState, { title: "No payments yet" })) : (studentPayments.slice(0, 6).map((p) => (_jsxs(Group, { justify: "space-between", p: "md", style: {
                                                    border: '1px solid var(--app-border)',
                                                    borderRadius: 12,
                                                }, children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fw: 600, fz: 14, children: formatUZS(p.amountUZS, { compact: true }) }), _jsxs(Text, { fz: 12, c: "dimmed", children: [p.method, " \u00B7 due ", formatDate(p.dueAt)] })] }), _jsx(StatusBadge, { status: p.status })] }, p.id)))) }) })] }) }) })] }), _jsxs(SurfaceCard, { children: [_jsx(Group, { justify: "space-between", mb: "md", children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "Activity" }), _jsx(Text, { fz: 16, fw: 700, children: "Recent profile events" })] }) }), _jsxs(Timeline, { active: 4, bulletSize: 20, lineWidth: 2, children: [_jsx(Timeline.Item, { title: "Profile created", children: _jsx(Text, { c: "dimmed", size: "sm", children: fromNow(student.joinedAt) }) }), _jsx(Timeline.Item, { title: "Joined IELTS Intensive \u00B7 G-2A", children: _jsx(Text, { c: "dimmed", size: "sm", children: "5 days ago \u00B7 by Aziza Karimova" }) }), _jsx(Timeline.Item, { title: "Payment recorded", children: _jsx(Text, { c: "dimmed", size: "sm", children: "3 days ago \u00B7 1.4 mln UZS via Payme" }) }), _jsx(Timeline.Item, { title: "Telegram bot subscribed", children: _jsx(Text, { c: "dimmed", size: "sm", children: "2 days ago \u00B7 @edura_uz_bot" }) })] })] })] }));
}
function Stat({ label, value, accent }) {
    return (_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 11, tt: "uppercase", c: "dimmed", fw: 600, style: { letterSpacing: 0.6 }, children: label }), _jsx(Text, { fz: 22, fw: 800, c: accent, style: { letterSpacing: '-0.02em' }, children: value })] }));
}
