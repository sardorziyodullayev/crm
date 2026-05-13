import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconBrandGoogle, IconBrandTelegram } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { mockAuth } from '@shared/api';
import { useAuthStore } from '@shared/store/authStore';
import { loginSchema, type LoginInput } from '@features/auth/model/schemas';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);

  const form = useForm<LoginInput>({
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
      const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;
      navigate(from ?? ROUTES.dashboard, { replace: true });
    },
    onError: (e: Error) => {
      notifications.show({ title: 'Sign in failed', message: e.message, color: 'red' });
    },
  });

  return (
    <Stack gap="lg">
      <Stack gap={6}>
        <Title order={2} style={{ letterSpacing: '-0.02em' }}>
          Welcome back
        </Title>
        <Text c="dimmed" size="sm">
          Sign in to your Edura workspace.
        </Text>
      </Stack>
      <form onSubmit={form.onSubmit((values) => mutation.mutate({ email: values.email, password: values.password }))}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="you@center.uz"
            autoComplete="email"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...form.getInputProps('password')}
          />
          <Group justify="space-between">
            <Checkbox
              label="Keep me signed in"
              {...form.getInputProps('remember', { type: 'checkbox' })}
            />
            <Anchor component={Link} to={ROUTES.auth.forgotPassword} size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            size="md"
            type="submit"
            loading={mutation.isPending}
            fullWidth
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            Sign in
          </Button>
          <Divider label="or continue with" labelPosition="center" />
          <Group grow>
            <Button variant="default" leftSection={<IconBrandGoogle size={16} />}>
              Google
            </Button>
            <Button variant="default" leftSection={<IconBrandTelegram size={16} />}>
              Telegram
            </Button>
          </Group>
          <Text size="sm" c="dimmed" ta="center">
            New to Edura?{' '}
            <Anchor component={Link} to={ROUTES.auth.register}>
              Create a workspace
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Stack>
  );
}
