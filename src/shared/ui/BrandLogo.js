import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from '@mantine/core';
export function BrandLogo({ size = 'md', collapsed = false }) {
    const dim = size === 'sm' ? 22 : size === 'lg' ? 36 : 28;
    const font = size === 'sm' ? 16 : size === 'lg' ? 24 : 19;
    return (_jsxs(Box, { style: { display: 'flex', alignItems: 'center', gap: 10, userSelect: 'none' }, "aria-label": "Edura", children: [_jsx(Box, { style: {
                    width: dim,
                    height: dim,
                    borderRadius: dim / 4,
                    background: 'linear-gradient(135deg, #7944ff 0%, #4d62e6 50%, #34d399 100%)',
                    boxShadow: '0 4px 14px rgba(99,102,241,.45)',
                    position: 'relative',
                }, children: _jsx(Box, { style: {
                        position: 'absolute',
                        inset: 4,
                        borderRadius: dim / 5,
                        background: 'linear-gradient(135deg, rgba(255,255,255,.18), rgba(255,255,255,0))',
                    } }) }), !collapsed && (_jsx(Text, { fw: 800, style: {
                    letterSpacing: '-0.02em',
                    fontSize: font,
                    background: 'linear-gradient(135deg, #fff 30%, #cbd1ff)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                }, children: "Edura" }))] }));
}
