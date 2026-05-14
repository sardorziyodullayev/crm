import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Box, Group, Skeleton, Stack, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { initials } from '@shared/lib/format';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const KIND_DOT = {
    create: '#34d399',
    update: '#60a5fa',
    delete: '#f12648',
    login: '#a78bfa',
    export: '#ffac1a',
};
export function LiveActivityFeed({ items, loading, }) {
    return (_jsxs(SurfaceCard, { h: "100%", children: [_jsx(Group, { justify: "space-between", mb: "md", children: _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "Activity feed" }), _jsx(Text, { fz: 16, fw: 700, children: "Latest events across your workspace" })] }) }), _jsx(Stack, { gap: "md", children: loading
                    ? Array.from({ length: 6 }).map((_, i) => (_jsxs(Group, { gap: "sm", children: [_jsx(Skeleton, { h: 36, w: 36, radius: "xl" }), _jsxs(Stack, { gap: 4, style: { flex: 1 }, children: [_jsx(Skeleton, { h: 10, w: "40%" }), _jsx(Skeleton, { h: 10, w: "65%" })] })] }, i)))
                    : items.map((it, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25, delay: i * 0.04 }, children: _jsxs(Group, { gap: "sm", wrap: "nowrap", align: "flex-start", children: [_jsxs(Box, { pos: "relative", children: [_jsx(Avatar, { size: 36, radius: "xl", color: "brand", variant: "light", children: initials(it.actor) }), _jsx(Box, { style: {
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                width: 10,
                                                height: 10,
                                                borderRadius: 999,
                                                background: KIND_DOT[it.kind],
                                                border: '2px solid var(--app-surface)',
                                            } })] }), _jsxs(Stack, { gap: 2, style: { flex: 1, minWidth: 0 }, children: [_jsxs(Text, { fz: 14, children: [_jsx(Text, { span: true, fw: 600, children: it.actor }), ' ', _jsx(Text, { span: true, c: "dimmed", children: it.action }), ' ', _jsx(Text, { span: true, fw: 600, children: it.target })] }), _jsx(Text, { fz: 11, c: "dimmed", children: it.when })] })] }) }, it.id))) })] }));
}
