import { jsx as _jsx } from "react/jsx-runtime";
import { Card } from '@mantine/core';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
export const SurfaceCard = forwardRef(function SurfaceCard({ children, hover = false, glass = false, motionProps, style, ...rest }, ref) {
    return (_jsx(motion.div, { ref: ref, initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25, ease: 'easeOut' }, whileHover: hover ? { y: -2 } : undefined, ...motionProps, children: _jsx(Card, { withBorder: false, radius: "lg", shadow: "sm", padding: "lg", style: {
                background: glass ? 'var(--app-glass-bg)' : 'var(--app-surface)',
                backdropFilter: glass ? 'saturate(180%) blur(14px)' : undefined,
                WebkitBackdropFilter: glass ? 'saturate(180%) blur(14px)' : undefined,
                border: '1px solid var(--app-border)',
                boxShadow: 'var(--app-shadow-card)',
                ...style,
            }, ...rest, children: children }) }));
});
