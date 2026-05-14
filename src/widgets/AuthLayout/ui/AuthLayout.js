import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Center, Group, Stack, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { BrandLogo } from '@shared/ui/BrandLogo';
export function AuthLayout() {
    return (_jsx(Box, { style: {
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            background: 'var(--app-bg)',
        }, children: _jsxs(Box, { style: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }, children: [_jsxs(Box, { visibleFrom: "md", style: {
                        position: 'relative',
                        background: 'radial-gradient(800px 500px at 0% 0%, rgba(99,102,241,.45), transparent 60%), radial-gradient(800px 600px at 100% 100%, rgba(168,85,247,.35), transparent 60%), #0a0d1c',
                        color: '#e6e9f2',
                        padding: 48,
                        display: 'flex',
                        flexDirection: 'column',
                    }, children: [_jsx(BrandLogo, {}), _jsxs(Stack, { mt: "auto", gap: "lg", maw: 480, children: [_jsx(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 }, children: _jsxs(Text, { fz: 36, fw: 800, style: { letterSpacing: '-0.02em', lineHeight: 1.15 }, children: ["Run a modern ", _jsx("br", {}), "educational center \u2014", ' ', _jsx("span", { className: "app-gradient-text", children: "in one workspace." })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.1 }, children: _jsx(Text, { c: "dimmed", fz: 15, style: { lineHeight: 1.55 }, children: "Edura unifies students, groups, attendance, payments and a lead funnel \u2014 with Telegram bot integration trusted by 800+ centers across Uzbekistan." }) }), _jsxs(Group, { gap: "xl", mt: "md", children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 28, fw: 800, className: "app-gradient-text", children: "98%" }), _jsx(Text, { fz: 12, c: "dimmed", children: "Retention after Q1" })] }), _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 28, fw: 800, className: "app-gradient-text", children: "4.9/5" }), _jsx(Text, { fz: 12, c: "dimmed", children: "Center owner rating" })] }), _jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 28, fw: 800, className: "app-gradient-text", children: "60+" }), _jsx(Text, { fz: 12, c: "dimmed", children: "Cities, UZ + KZ" })] })] })] })] }), _jsx(Center, { p: "md", children: _jsxs(Box, { w: "100%", maw: 420, children: [_jsx(Box, { hiddenFrom: "md", mb: "lg", children: _jsx(BrandLogo, {}) }), _jsx(Outlet, {})] }) })] }) }));
}
