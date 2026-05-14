import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Center, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
export default function NotFoundPage() {
    return (_jsx(Center, { mih: "100vh", p: "md", style: { backgroundImage: 'var(--app-hero-gradient)' }, children: _jsxs(Stack, { align: "center", gap: "md", maw: 420, ta: "center", children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4 }, children: _jsx(Text, { fz: 88, fw: 900, className: "app-gradient-text", style: { letterSpacing: '-0.04em' }, children: "404" }) }), _jsx(Title, { order: 3, children: "This page wandered off" }), _jsx(Text, { c: "dimmed", children: "The page you're looking for is missing \u2014 or maybe it just took a sick day." }), _jsx(Button, { component: Link, to: ROUTES.dashboard, variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "Back to dashboard" })] }) }));
}
