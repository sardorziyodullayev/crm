import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
export function RouterErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();
    let title = 'Unexpected error';
    let description = 'Something went wrong while loading this page.';
    if (isRouteErrorResponse(error)) {
        title = `${error.status} — ${error.statusText}`;
        description = error.data || description;
    }
    else if (error instanceof Error) {
        description = error.message;
    }
    return (_jsx(Container, { size: "sm", py: 100, children: _jsxs(Stack, { gap: "md", align: "center", ta: "center", children: [_jsx(Title, { order: 2, children: title }), _jsx(Text, { c: "dimmed", children: description }), _jsx(Button, { onClick: () => navigate('/'), variant: "light", children: "Go home" })] }) }));
}
