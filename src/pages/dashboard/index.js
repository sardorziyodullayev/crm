import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Box, Button, Group, SegmentedControl, SimpleGrid, Stack, Text, } from '@mantine/core';
import { IconArrowUpRight, IconCash, IconChartHistogram, IconDownload, IconUserCheck, IconUserPlus, IconUsersGroup, } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { mockActivity, mockDashboard, queryKeys } from '@shared/api';
import { formatNumber, formatUZS, fromNow } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatCard } from '@shared/ui/StatCard';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
import { RevenueChart } from './ui/RevenueChart';
import { GrowthChart } from './ui/GrowthChart';
import { LeadSources } from './ui/LeadSources';
import { LiveActivityFeed } from './ui/LiveActivityFeed';
import { QuickActions } from './ui/QuickActions';
export default function DashboardPage() {
    const [range, setRange] = useState('30d');
    const navigate = useNavigate();
    const queries = useQueries({
        queries: [
            { queryKey: queryKeys.dashboard.summary, queryFn: () => mockDashboard.summary() },
            { queryKey: queryKeys.dashboard.revenue, queryFn: () => mockDashboard.revenueSeries() },
            { queryKey: queryKeys.dashboard.growth, queryFn: () => mockDashboard.growthSeries() },
            { queryKey: queryKeys.dashboard.sources, queryFn: () => mockDashboard.sources() },
            { queryKey: queryKeys.dashboard.activity, queryFn: () => mockActivity.list() },
        ],
    });
    const [summaryQ, revenueQ, growthQ, sourcesQ, activityQ] = queries;
    const s = summaryQ.data;
    return (_jsxs(Stack, { gap: "xl", children: [_jsx(PageHeader, { title: "Dashboard", description: "At-a-glance health of your educational center.", badge: _jsx(Badge, { variant: "dot", color: "success", radius: "sm", children: "Live" }), actions: _jsxs(Group, { gap: "xs", children: [_jsx(SegmentedControl, { size: "xs", data: [
                                { label: '7 days', value: '7d' },
                                { label: '30 days', value: '30d' },
                                { label: '12 mo', value: '12m' },
                            ], value: range, onChange: (v) => setRange(v) }), _jsx(Button, { leftSection: _jsx(IconDownload, { size: 14 }), variant: "light", size: "xs", children: "Export" }), _jsx(Button, { leftSection: _jsx(IconUserPlus, { size: 14 }), size: "xs", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, onClick: () => navigate(ROUTES.students + '?new=1'), children: "Add student" })] }) }), _jsxs(SimpleGrid, { cols: { base: 1, sm: 2, lg: 4 }, spacing: "md", children: [_jsx(StatCard, { label: "Active students", value: formatNumber(s?.activeStudents ?? 0), delta: 12, hint: `+${s?.trialStudents ?? 0} on trial`, icon: _jsx(IconUserCheck, { size: 18 }), accent: "brand", loading: summaryQ.isLoading }), _jsx(StatCard, { label: "Revenue this month", value: formatUZS(s?.revenueThisMonth ?? 0, { compact: true }), delta: s?.revenueGrowth ?? 0, hint: "vs. previous month", icon: _jsx(IconCash, { size: 18 }), accent: "success", loading: summaryQ.isLoading }), _jsx(StatCard, { label: "Active groups", value: formatNumber(s?.activeGroups ?? 0), delta: 4, hint: `${s?.teachers ?? 0} active teachers`, icon: _jsx(IconUsersGroup, { size: 18 }), accent: "accent", loading: summaryQ.isLoading }), _jsx(StatCard, { label: "New leads (7d)", value: formatNumber(s?.newLeads ?? 0), delta: -3, hint: `Overdue: ${formatUZS(s?.overdueAmount ?? 0, { compact: true })}`, icon: _jsx(IconChartHistogram, { size: 18 }), accent: "warning", loading: summaryQ.isLoading })] }), _jsxs(SimpleGrid, { cols: { base: 1, lg: 3 }, spacing: "md", children: [_jsx(Box, { style: { gridColumn: 'span 2' }, children: _jsxs(SurfaceCard, { children: [_jsxs(Group, { justify: "space-between", align: "flex-end", mb: "md", children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "Revenue overview" }), _jsx(Text, { fz: 22, fw: 800, style: { letterSpacing: '-0.02em' }, children: formatUZS(s?.revenueThisMonth ?? 0, { compact: true }) })] }), _jsxs(Group, { gap: 6, c: "teal.5", style: { fontWeight: 600, fontSize: 12 }, children: [_jsx(IconArrowUpRight, { size: 14, stroke: 2.5 }), s?.revenueGrowth ?? 0, "% vs. last month"] })] }), _jsx(RevenueChart, { data: revenueQ.data ?? [], loading: revenueQ.isLoading })] }) }), _jsx(Box, { children: _jsx(LeadSources, { data: sourcesQ.data ?? [], loading: sourcesQ.isLoading }) })] }), _jsxs(SimpleGrid, { cols: { base: 1, lg: 3 }, spacing: "md", children: [_jsx(Box, { style: { gridColumn: 'span 2' }, children: _jsxs(SurfaceCard, { children: [_jsx(Group, { justify: "space-between", mb: "md", children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "Growth \u2014 students vs. leads" }), _jsx(Text, { fz: 16, fw: 700, children: "Last 12 months" })] }) }), _jsx(GrowthChart, { data: growthQ.data ?? [], loading: growthQ.isLoading })] }) }), _jsx(QuickActions, {})] }), _jsxs(SimpleGrid, { cols: { base: 1, lg: 3 }, spacing: "md", children: [_jsx(Box, { style: { gridColumn: 'span 2' }, children: _jsx(LiveActivityFeed, { items: (activityQ.data ?? []).slice(0, 8).map((a) => ({
                                id: a.id,
                                actor: a.actor,
                                action: a.action,
                                target: a.target,
                                when: fromNow(a.createdAt),
                                kind: a.kind,
                            })), loading: activityQ.isLoading }) }), _jsx(SurfaceCard, { children: _jsxs(Stack, { gap: "sm", children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "This week" }), [
                                    { label: 'New enrollments', v: 24, c: 'success' },
                                    { label: 'Trial sessions', v: 12, c: 'brand' },
                                    { label: 'Cancellations', v: 3, c: 'danger' },
                                    { label: 'Teacher hours', v: 184, c: 'accent' },
                                ].map((row) => (_jsxs(Group, { justify: "space-between", children: [_jsx(Text, { fz: 13, c: "dimmed", children: row.label }), _jsx(Badge, { variant: "light", color: row.c === 'danger' ? 'red' : row.c, radius: "sm", children: row.v })] }, row.label)))] }) })] })] }));
}
