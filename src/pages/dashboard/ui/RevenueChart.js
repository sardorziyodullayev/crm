import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@mantine/core';
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';
import { formatUZS } from '@shared/lib/format';
export function RevenueChart({ data, loading }) {
    if (loading)
        return _jsx(Skeleton, { h: 280, radius: "md" });
    return (_jsx(ResponsiveContainer, { width: "100%", height: 280, children: _jsxs(AreaChart, { data: data, margin: { top: 10, left: 0, right: 8, bottom: 0 }, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "revenueGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#7944ff", stopOpacity: 0.6 }), _jsx("stop", { offset: "100%", stopColor: "#7944ff", stopOpacity: 0 })] }), _jsxs("linearGradient", { id: "revenueStroke", x1: "0", y1: "0", x2: "1", y2: "0", children: [_jsx("stop", { offset: "0%", stopColor: "#a78bfa" }), _jsx("stop", { offset: "100%", stopColor: "#60a5fa" })] })] }), _jsx(CartesianGrid, { stroke: "rgba(140,150,180,.18)", strokeDasharray: "3 6", vertical: false }), _jsx(XAxis, { dataKey: "month", tick: { fill: 'var(--app-text-muted)', fontSize: 11 }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fill: 'var(--app-text-muted)', fontSize: 11 }, axisLine: false, tickLine: false, tickFormatter: (v) => formatUZS(v, { compact: true }).replace(' UZS', '') }), _jsx(Tooltip, { contentStyle: {
                        background: 'var(--app-bg-elevated)',
                        border: '1px solid var(--app-border)',
                        borderRadius: 12,
                        boxShadow: 'var(--app-shadow-card)',
                        fontSize: 12,
                    }, formatter: (v) => formatUZS(v, { compact: true }), labelStyle: { color: 'var(--app-text-muted)', marginBottom: 4 } }), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "url(#revenueStroke)", strokeWidth: 2.5, fill: "url(#revenueGradient)", activeDot: { r: 4 }, isAnimationActive: true, animationDuration: 700 }), _jsx(Line, { type: "monotone", dataKey: "target", stroke: "#34d399", strokeWidth: 1.5, strokeDasharray: "4 4", dot: false, isAnimationActive: true, animationDuration: 700 })] }) }));
}
