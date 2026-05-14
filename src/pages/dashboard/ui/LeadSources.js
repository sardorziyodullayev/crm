import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Group, Skeleton, Stack, Text } from '@mantine/core';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const COLORS = ['#7944ff', '#60a5fa', '#34d399', '#ffac1a', '#f12648', '#22d3ee'];
export function LeadSources({ data, loading }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    return (_jsx(SurfaceCard, { h: "100%", children: _jsxs(Stack, { gap: "md", children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "Lead sources" }), _jsx(Text, { fz: 16, fw: 700, children: "Where prospects are coming from" })] }), _jsx(Box, { pos: "relative", h: 180, children: loading ? (_jsx(Skeleton, { h: 180, circle: true })) : (_jsxs(_Fragment, { children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Tooltip, { contentStyle: {
                                                background: 'var(--app-bg-elevated)',
                                                border: '1px solid var(--app-border)',
                                                borderRadius: 10,
                                                fontSize: 12,
                                            } }), _jsx(Pie, { data: data, dataKey: "value", nameKey: "source", innerRadius: 56, outerRadius: 84, paddingAngle: 3, stroke: "none", isAnimationActive: true, animationDuration: 700, children: data.map((_, i) => (_jsx(Cell, { fill: COLORS[i % COLORS.length] }, i))) })] }) }), _jsxs(Stack, { pos: "absolute", top: "50%", left: "50%", gap: 0, ta: "center", style: { transform: 'translate(-50%, -50%)' }, children: [_jsx(Text, { fz: 22, fw: 800, style: { letterSpacing: '-0.02em' }, children: total }), _jsx(Text, { fz: 11, c: "dimmed", children: "total leads" })] })] })) }), _jsx(Stack, { gap: 6, children: data.map((d, i) => (_jsxs(Group, { justify: "space-between", children: [_jsxs(Group, { gap: "xs", children: [_jsx(Box, { w: 10, h: 10, style: { background: COLORS[i % COLORS.length], borderRadius: 999 } }), _jsx(Text, { fz: 13, children: d.source })] }), _jsxs(Text, { fz: 13, c: "dimmed", children: [d.value, " (", total ? Math.round((d.value / total) * 100) : 0, "%)"] })] }, d.source))) })] }) }));
}
