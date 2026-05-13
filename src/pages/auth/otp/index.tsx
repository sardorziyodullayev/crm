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
    onError: (e: Error) =>
      notifications.show({ title: 'Invalid code', message: e.message, color: 'red' }),
  });

  return (
    <Stack gap="lg" align="center">
      <Stack gap={6} ta="center">
        <Title order={2} style={{ letterSpacing: '-0.02em' }}>
          Verify your email
        </Title>
        <Text c="dimmed" size="sm" maw={320}>
          We&apos;ve sent a 6-digit code to your inbox. Enter it below to continue.
        </Text>
      </Stack>
      <PinInput
        length={6}
        size="lg"
        oneTimeCode
        value={code}
        onChange={setCode}
        type="number"
      />
      <Group justify="center" gap="xs">
        <Text size="xs" c="dimmed">
          Didn&apos;t get a code?
        </Text>
        <Button variant="subtle" size="xs">
          Resend (24s)
        </Button>
      </Group>
      <Button
        size="md"
        w={240}
        variant="gradient"
        gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
        loading={mutation.isPending}
        onClick={() => mutation.mutate({ code })}
        disabled={code.length !== 6}
      >
        Verify
      </Button>
    </Stack>
  );
}
