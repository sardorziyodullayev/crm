import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Group, PinInput, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { mockAuth, queryClient } from '@shared/api';
import { useAuthStore, DEMO_AUTH_USER } from '@shared/store/authStore';
export default function OtpPage() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const setSession = useAuthStore((s) => s.setSession);
    const mutation = useMutation({
        mutationFn: mockAuth.verifyOtp,
        onSuccess: () => {
            setSession({
                user: DEMO_AUTH_USER,
                token: 'mock.demo.token.' + Date.now().toString(36),
            });
            queryClient.clear();
            notifications.show({
                title: 'Workspace ready',
                message: 'Welcome to Edura',
                color: 'teal',
            });
            navigate(ROUTES.dashboard, { replace: true });
        },
        onError: (e) => notifications.show({ title: 'Invalid code', message: e.message, color: 'red' }),
    });
    return (_jsxs(Stack, { gap: "lg", align: "center", children: [_jsxs(Stack, { gap: 6, ta: "center", children: [_jsx(Title, { order: 2, style: { letterSpacing: '-0.02em' }, children: "Verify your email" }), _jsx(Text, { c: "dimmed", size: "sm", maw: 320, children: "We've sent a 6-digit code to your inbox. Enter it below to continue." })] }), _jsx(PinInput, { length: 6, size: "lg", oneTimeCode: true, value: code, onChange: setCode, type: "number" }), _jsxs(Group, { justify: "center", gap: "xs", children: [_jsx(Text, { size: "xs", c: "dimmed", children: "Didn't get a code?" }), _jsx(Button, { variant: "subtle", size: "xs", children: "Resend (24s)" })] }), _jsx(Button, { size: "md", w: 240, variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, loading: mutation.isPending, onClick: () => mutation.mutate({ code }), disabled: code.length !== 6, children: "Verify" })] }));
}
