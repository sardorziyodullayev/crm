import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('App ErrorBoundary captured:', error, info);
    }
  }

  reset = () => this.setState({ hasError: false, error: undefined });

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <Container size="sm" py={80}>
          <Stack gap="md" align="center" ta="center">
            <Title order={2}>Something went wrong</Title>
            <Text c="dimmed">{this.state.error?.message ?? 'Unknown error'}</Text>
            <Button onClick={this.reset} variant="light">
              Try again
            </Button>
          </Stack>
        </Container>
      );
    }
    return this.props.children;
  }
}
