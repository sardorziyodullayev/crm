import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Anchor, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { mockAuth } from '@shared/api';
import { forgotSchema } from '@features/auth/model/schemas';
export default function ForgotPasswordPage() {
    const form = useForm({
        initialValues: { email: '' },
        validate: zodResolver(forgotSchema),
    });
    const mutation = useMutation({
        mutationFn: mockAuth.forgotPassword,
        onSuccess: () => notifications.show({
            title: 'Check your inbox',
            message: 'We sent a password reset link.',
            color: 'teal',
        }),
    });
    return (_jsxs(Stack, { gap: "lg", children: [_jsxs(Stack, { gap: 6, children: [_jsx(Title, { order: 2, style: { letterSpacing: '-0.02em' }, children: "Reset your password" }), _jsx(Text, { c: "dimmed", size: "sm", children: "Enter your email and we'll send you a reset link." })] }), _jsx("form", { onSubmit: form.onSubmit((v) => mutation.mutate(v)), children: _jsxs(Stack, { gap: "md", children: [_jsx(TextInput, { label: "Email", placeholder: "you@center.uz", ...form.getInputProps('email') }), _jsx(Button, { type: "submit", size: "md", loading: mutation.isPending, fullWidth: true, variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "Send reset link" }), _jsxs(Text, { size: "sm", c: "dimmed", ta: "center", children: ["Remember your password?", ' ', _jsx(Anchor, { component: Link, to: ROUTES.auth.login, children: "Sign in" })] })] }) })] }));
}
