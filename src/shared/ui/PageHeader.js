import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Group, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
export function PageHeader({ title, description, badge, actions, breadcrumbs }) {
    return (_jsxs(Box, { mb: "lg", children: [breadcrumbs && _jsx(Box, { mb: "xs", children: breadcrumbs }), _jsxs(Group, { justify: "space-between", align: "flex-end", wrap: "nowrap", gap: "md", children: [_jsxs(Stack, { gap: 6, style: { minWidth: 0 }, children: [_jsxs(Group, { gap: "xs", align: "center", wrap: "nowrap", children: [_jsx(motion.div, { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25 }, children: _jsx(Title, { order: 2, style: { letterSpacing: '-0.02em' }, children: title }) }), badge] }), description && (_jsx(Text, { c: "dimmed", size: "sm", style: { maxWidth: 720 }, children: description }))] }), actions && (_jsx(Group, { gap: "xs", wrap: "nowrap", children: actions }))] })] }));
}
