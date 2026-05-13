import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

export function RouterErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = 'Unexpected error';
  let description = 'Something went wrong while loading this page.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} — ${error.statusText}`;
    description = (error.data as string) || description;
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <Container size="sm" py={100}>
      <Stack gap="md" align="center" ta="center">
        <Title order={2}>{title}</Title>
        <Text c="dimmed">{description}</Text>
        <Button onClick={() => navigate('/')} variant="light">
          Go home
        </Button>
      </Stack>
    </Container>
  );
}
