import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Anchor, Button, Checkbox, Divider, Group, PasswordInput, Stack, Text, TextInput, Title, } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconBrandGoogle, IconBrandTelegram } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { mockAuth } from '@shared/api';
import { useAuthStore } from '@shared/store/authStore';
import { loginSchema } from '@features/auth/model/schemas';
export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const setSession = useAuthStore((s) => s.setSession);
    const form = useForm({
        initialValues: { email: 'aziza@edura.uz', password: 'demo12345', remember: true },
        validate: zodResolver(loginSchema),
    });
    const mutation = useMutation({
        mutationFn: mockAuth.login,
        onSuccess: ({ user, token }) => {
            setSession({ user, token });
            notifications.show({
                title: 'Welcome back',
                message: `Signed in as ${user.fullName}`,
                color: 'teal',
            });
            const from = location.state?.from?.pathname;
            navigate(from ?? ROUTES.dashboard, { replace: true });
        },
        onError: (e) => {
            notifications.show({ title: 'Sign in failed', message: e.message, color: 'red' });
        },
    });
    return (_jsxs(Stack, { gap: "lg", children: [_jsxs(Stack, { gap: 6, children: [_jsx(Title, { order: 2, style: { letterSpacing: '-0.02em' }, children: "Welcome back" }), _jsx(Text, { c: "dimmed", size: "sm", children: "Sign in to your Edura workspace." })] }), _jsx("form", { onSubmit: form.onSubmit((values) => mutation.mutate({ email: values.email, password: values.password })), children: _jsxs(Stack, { gap: "md", children: [_jsx(TextInput, { label: "Email", placeholder: "you@center.uz", autoComplete: "email", ...form.getInputProps('email') }), _jsx(PasswordInput, { label: "Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", autoComplete: "current-password", ...form.getInputProps('password') }), _jsxs(Group, { justify: "space-between", children: [_jsx(Checkbox, { label: "Keep me signed in", ...form.getInputProps('remember', { type: 'checkbox' }) }), _jsx(Anchor, { component: Link, to: ROUTES.auth.forgotPassword, size: "sm", children: "Forgot password?" })] }), _jsx(Button, { size: "md", type: "submit", loading: mutation.isPending, fullWidth: true, variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "Sign in" }), _jsx(Divider, { label: "or continue with", labelPosition: "center" }), _jsxs(Group, { grow: true, children: [_jsx(Button, { variant: "default", leftSection: _jsx(IconBrandGoogle, { size: 16 }), children: "Google" }), _jsx(Button, { variant: "default", leftSection: _jsx(IconBrandTelegram, { size: 16 }), children: "Telegram" })] }), _jsxs(Text, { size: "sm", c: "dimmed", ta: "center", children: ["New to Edura?", ' ', _jsx(Anchor, { component: Link, to: ROUTES.auth.register, children: "Create a workspace" })] })] }) })] }));
}
