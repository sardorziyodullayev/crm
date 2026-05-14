import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Anchor, Button, Checkbox, PasswordInput, Stack, Text, TextInput, Title, } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { mockAuth } from '@shared/api';
import { registerSchema } from '@features/auth/model/schemas';
export default function RegisterPage() {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            centerName: '',
            acceptTerms: false,
        },
        validate: zodResolver(registerSchema),
    });
    const mutation = useMutation({
        mutationFn: mockAuth.register,
        onSuccess: () => {
            notifications.show({
                title: 'Almost done',
                message: 'We sent a 6-digit code to your email',
                color: 'teal',
            });
            navigate(ROUTES.auth.otp);
        },
    });
    return (_jsxs(Stack, { gap: "lg", children: [_jsxs(Stack, { gap: 6, children: [_jsx(Title, { order: 2, style: { letterSpacing: '-0.02em' }, children: "Start your workspace" }), _jsx(Text, { c: "dimmed", size: "sm", children: "14-day free trial. No card required." })] }), _jsx("form", { onSubmit: form.onSubmit((values) => mutation.mutate({
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password,
                })), children: _jsxs(Stack, { gap: "md", children: [_jsx(TextInput, { label: "Your name", placeholder: "Aziza Karimova", ...form.getInputProps('fullName') }), _jsx(TextInput, { label: "Center name", placeholder: "e.g., Bright Minds Academy", ...form.getInputProps('centerName') }), _jsx(TextInput, { label: "Work email", placeholder: "you@center.uz", ...form.getInputProps('email') }), _jsx(PasswordInput, { label: "Password", placeholder: "At least 8 characters", ...form.getInputProps('password') }), _jsx(Checkbox, { label: _jsxs(Text, { size: "sm", children: ["I agree to the", ' ', _jsx(Anchor, { component: "a", href: "#", inherit: true, children: "Terms" }), ' ', "and", ' ', _jsx(Anchor, { component: "a", href: "#", inherit: true, children: "Privacy Policy" })] }), ...form.getInputProps('acceptTerms', { type: 'checkbox' }) }), _jsx(Button, { type: "submit", size: "md", loading: mutation.isPending, fullWidth: true, variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "Create workspace" }), _jsxs(Text, { size: "sm", c: "dimmed", ta: "center", children: ["Already have an account?", ' ', _jsx(Anchor, { component: Link, to: ROUTES.auth.login, children: "Sign in" })] })] }) })] }));
}
