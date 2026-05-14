import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Group, SegmentedControl, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { mockDashboard, queryKeys } from '@shared/api';
import { formatNumber, formatUZS } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatCard } from '@shared/ui/StatCard';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
import { RevenueChart } from '../dashboard/ui/RevenueChart';
import { GrowthChart } from '../dashboard/ui/GrowthChart';
import { LeadSources } from '../dashboard/ui/LeadSources';
export default function ReportsPage() {
    const [range, setRange] = useState('12m');
    const queries = useQueries({
        queries: [
            { queryKey: queryKeys.dashboard.summary, queryFn: () => mockDashboard.summary() },
            { queryKey: queryKeys.dashboard.revenue, queryFn: () => mockDashboard.revenueSeries() },
            { queryKey: queryKeys.dashboard.growth, queryFn: () => mockDashboard.growthSeries() },
            { queryKey: queryKeys.dashboard.sources, queryFn: () => mockDashboard.sources() },
        ],
    });
    const [s, r, g, src] = queries;
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Reports", description: "Aggregated insights across academic and financial data.", actions: _jsxs(Group, { gap: "xs", children: [_jsx(SegmentedControl, { size: "xs", data: [
                                { label: '30 days', value: '30d' },
                                { label: '90 days', value: '90d' },
                                { label: '12 months', value: '12m' },
                            ], value: range, onChange: (v) => setRange(v) }), _jsx(Button, { leftSection: _jsx(IconDownload, { size: 14 }), size: "sm", variant: "light", children: "Export PDF" })] }) }), _jsxs(SimpleGrid, { cols: { base: 1, sm: 2, lg: 4 }, spacing: "md", children: [_jsx(StatCard, { label: "Revenue this month", value: formatUZS(s.data?.revenueThisMonth ?? 0, { compact: true }), delta: s.data?.revenueGrowth ?? 0, accent: "success" }), _jsx(StatCard, { label: "Active students", value: formatNumber(s.data?.activeStudents ?? 0), delta: 6, accent: "brand" }), _jsx(StatCard, { label: "Active groups", value: formatNumber(s.data?.activeGroups ?? 0), delta: 3, accent: "accent" }), _jsx(StatCard, { label: "Leads (7d)", value: formatNumber(s.data?.newLeads ?? 0), delta: -2, accent: "warning" })] }), _jsxs(SimpleGrid, { cols: { base: 1, lg: 3 }, spacing: "md", children: [_jsx(Box, { style: { gridColumn: 'span 2' }, children: _jsxs(SurfaceCard, { children: [_jsx(Group, { justify: "space-between", mb: "md", children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "Revenue trend" }), _jsx(Text, { fz: 16, fw: 700, children: "Last 12 months" })] }) }), _jsx(RevenueChart, { data: r.data ?? [], loading: r.isLoading })] }) }), _jsx(LeadSources, { data: src.data ?? [], loading: src.isLoading })] }), _jsxs(SurfaceCard, { children: [_jsx(Group, { justify: "space-between", mb: "md", children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "Acquisition vs. growth" }), _jsx(Text, { fz: 16, fw: 700, children: "Last 12 months" })] }) }), _jsx(GrowthChart, { data: g.data ?? [], loading: g.isLoading })] })] }));
}
