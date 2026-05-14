import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { Component } from 'react';
export class ErrorBoundary extends Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        if (import.meta.env.DEV) {
            console.error('App ErrorBoundary captured:', error, info);
        }
    }
    reset = () => this.setState({ hasError: false, error: undefined });
    render() {
        if (this.state.hasError) {
            if (this.props.fallback)
                return this.props.fallback;
            return (_jsx(Container, { size: "sm", py: 80, children: _jsxs(Stack, { gap: "md", align: "center", ta: "center", children: [_jsx(Title, { order: 2, children: "Something went wrong" }), _jsx(Text, { c: "dimmed", children: this.state.error?.message ?? 'Unknown error' }), _jsx(Button, { onClick: this.reset, variant: "light", children: "Try again" })] }) }));
        }
        return this.props.children;
    }
}
