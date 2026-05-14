import { jsx as _jsx } from "react/jsx-runtime";
import { Loader, Center } from '@mantine/core';
import { Suspense } from 'react';
export function LazyPage({ children }) {
    return (_jsx(Suspense, { fallback: _jsx(Center, { mih: "60vh", children: _jsx(Loader, { type: "bars", size: "md", color: "brand.5" }) }), children: children }));
}
