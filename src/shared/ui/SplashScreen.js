import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader, Stack, Text } from '@mantine/core';
import { motion } from 'framer-motion';
export function SplashScreen({ label = 'Loading workspace…' }) {
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, style: {
            height: '100vh',
            width: '100vw',
            display: 'grid',
            placeItems: 'center',
            background: 'var(--app-bg)',
            backgroundImage: 'var(--app-hero-gradient)',
        }, children: _jsxs(Stack, { align: "center", gap: "md", children: [_jsx(Loader, { size: "lg", type: "dots", color: "brand.5" }), _jsx(Text, { c: "dimmed", size: "sm", children: label })] }) }));
}
