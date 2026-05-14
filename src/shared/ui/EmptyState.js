import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Center, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';
import { motion } from 'framer-motion';
export function EmptyState({ title, description, icon, action, height = 280, }) {
    return (_jsx(Center, { mih: height, py: "xl", children: _jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: _jsxs(Stack, { align: "center", gap: "md", maw: 420, ta: "center", children: [_jsx(ThemeIcon, { size: 64, radius: "xl", variant: "light", color: "brand", children: icon ?? _jsx(IconInbox, { size: 28 }) }), _jsxs(Stack, { gap: 4, children: [_jsx(Title, { order: 4, children: title }), description && (_jsx(Text, { c: "dimmed", size: "sm", children: description }))] }), action && (_jsx(Button, { onClick: action.onClick, leftSection: action.icon, variant: "light", mt: "xs", children: action.label }))] }) }) }));
}
