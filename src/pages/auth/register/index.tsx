import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { mockAuth } from '@shared/api';
import { registerSchema, type RegisterInput } from '@features/auth/model/schemas';

export default function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm<RegisterInput>({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      centerName: '',
      acceptTerms: false as unknown as true,
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

  return (
    <Stack gap="lg">
      <Stack gap={6}>
        <Title order={2} style={{ letterSpacing: '-0.02em' }}>
          Start your workspace
        </Title>
        <Text c="dimmed" size="sm">
          14-day free trial. No card required.
        </Text>
      </Stack>
      <form
        onSubmit={form.onSubmit((values) =>
          mutation.mutate({
            fullName: values.fullName,
            email: values.email,
            password: values.password,
          }),
        )}
      >
        <Stack gap="md">
          <TextInput
            label="Your name"
            placeholder="Aziza Karimova"
            {...form.getInputProps('fullName')}
          />
          <TextInput
            label="Center name"
            placeholder="e.g., Bright Minds Academy"
            {...form.getInputProps('centerName')}
          />
          <TextInput
            label="Work email"
            placeholder="you@center.uz"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="At least 8 characters"
            {...form.getInputProps('password')}
          />
          <Checkbox
            label={
              <Text size="sm">
                I agree to the{' '}
                <Anchor component="a" href="#" inherit>
                  Terms
                </Anchor>{' '}
                and{' '}
                <Anchor component="a" href="#" inherit>
                  Privacy Policy
                </Anchor>
              </Text>
            }
            {...form.getInputProps('acceptTerms', { type: 'checkbox' })}
          />
          <Button
            type="submit"
            size="md"
            loading={mutation.isPending}
            fullWidth
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            Create workspace
          </Button>
          <Text size="sm" c="dimmed" ta="center">
            Already have an account?{' '}
            <Anchor component={Link} to={ROUTES.auth.login}>
              Sign in
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Stack>
  );
}
