import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@mantine/core';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
export function GrowthChart({ data, loading }) {
    if (loading)
        return _jsx(Skeleton, { h: 260, radius: "md" });
    return (_jsx(ResponsiveContainer, { width: "100%", height: 260, children: _jsxs(BarChart, { data: data, barCategoryGap: 18, margin: { top: 12, right: 8 }, children: [_jsx(CartesianGrid, { stroke: "rgba(140,150,180,.18)", strokeDasharray: "3 6", vertical: false }), _jsx(XAxis, { dataKey: "month", tick: { fill: 'var(--app-text-muted)', fontSize: 11 }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fill: 'var(--app-text-muted)', fontSize: 11 }, axisLine: false, tickLine: false }), _jsx(Tooltip, { cursor: { fill: 'rgba(99,102,241,.06)' }, contentStyle: {
                        background: 'var(--app-bg-elevated)',
                        border: '1px solid var(--app-border)',
                        borderRadius: 12,
                        fontSize: 12,
                    } }), _jsx(Legend, { wrapperStyle: { paddingTop: 4 }, iconType: "circle", formatter: (v) => _jsx("span", { style: { color: 'var(--app-text-muted)', fontSize: 12 }, children: v }) }), _jsx(Bar, { dataKey: "students", name: "Students", fill: "#7944ff", radius: [6, 6, 0, 0] }), _jsx(Bar, { dataKey: "leads", name: "Leads", fill: "#34d399", radius: [6, 6, 0, 0] })] }) }));
}
