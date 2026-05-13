import { Anchor, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { mockAuth } from '@shared/api';
import { forgotSchema, type ForgotInput } from '@features/auth/model/schemas';

export default function ForgotPasswordPage() {
  const form = useForm<ForgotInput>({
    initialValues: { email: '' },
    validate: zodResolver(forgotSchema),
  });

  const mutation = useMutation({
    mutationFn: mockAuth.forgotPassword,
    onSuccess: () =>
      notifications.show({
        title: 'Check your inbox',
        message: 'We sent a password reset link.',
        color: 'teal',
      }),
  });

  return (
    <Stack gap="lg">
      <Stack gap={6}>
        <Title order={2} style={{ letterSpacing: '-0.02em' }}>
          Reset your password
        </Title>
        <Text c="dimmed" size="sm">
          Enter your email and we&apos;ll send you a reset link.
        </Text>
      </Stack>
      <form onSubmit={form.onSubmit((v) => mutation.mutate(v))}>
        <Stack gap="md">
          <TextInput label="Email" placeholder="you@center.uz" {...form.getInputProps('email')} />
          <Button
            type="submit"
            size="md"
            loading={mutation.isPending}
            fullWidth
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            Send reset link
          </Button>
          <Text size="sm" c="dimmed" ta="center">
            Remember your password?{' '}
            <Anchor component={Link} to={ROUTES.auth.login}>
              Sign in
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Stack>
  );
}
