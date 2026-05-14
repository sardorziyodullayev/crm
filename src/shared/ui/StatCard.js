import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { SurfaceCard } from './SurfaceCard';
const accentBg = {
    brand: 'linear-gradient(135deg, rgba(99,102,241,.18), rgba(99,102,241,.04))',
    accent: 'linear-gradient(135deg, rgba(168,85,247,.18), rgba(168,85,247,.04))',
    success: 'linear-gradient(135deg, rgba(52,211,153,.18), rgba(52,211,153,.04))',
    warning: 'linear-gradient(135deg, rgba(255,172,26,.18), rgba(255,172,26,.04))',
    danger: 'linear-gradient(135deg, rgba(241,38,72,.18), rgba(241,38,72,.04))',
};
export function StatCard({ label, value, delta, hint, icon, accent = 'brand', loading, }) {
    const positive = (delta ?? 0) >= 0;
    return (_jsxs(SurfaceCard, { hover: true, style: { overflow: 'hidden', position: 'relative' }, children: [_jsx(Box, { "aria-hidden": true, style: {
                    position: 'absolute',
                    inset: 0,
                    background: accentBg[accent],
                    opacity: 0.55,
                    pointerEvents: 'none',
                } }), _jsxs(Stack, { gap: "xs", style: { position: 'relative' }, children: [_jsxs(Group, { justify: "space-between", align: "flex-start", children: [_jsx(Text, { size: "xs", tt: "uppercase", fw: 600, c: "dimmed", style: { letterSpacing: 0.6 }, children: label }), icon && (_jsx(ThemeIcon, { variant: "light", color: accent === 'danger' ? 'red' : accent === 'warning' ? 'yellow' : accent, size: 36, radius: "md", children: icon }))] }), _jsx(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: _jsx(Text, { fz: 28, fw: 800, style: { letterSpacing: '-0.02em' }, children: loading ? '—' : value }) }), _jsxs(Group, { gap: 6, align: "center", children: [typeof delta === 'number' && (_jsxs(Group, { gap: 4, align: "center", c: positive ? 'teal.5' : 'red.5', style: { fontWeight: 600, fontSize: 12 }, children: [positive ? (_jsx(IconArrowUpRight, { size: 14, stroke: 2.5 })) : (_jsx(IconArrowDownRight, { size: 14, stroke: 2.5 })), Math.abs(delta), "%"] })), hint && (_jsx(Text, { size: "xs", c: "dimmed", children: hint }))] })] })] }));
}
