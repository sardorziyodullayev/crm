import { Button, Center, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';

export default function NotFoundPage() {
  return (
    <Center mih="100vh" p="md" style={{ backgroundImage: 'var(--app-hero-gradient)' }}>
      <Stack align="center" gap="md" maw={420} ta="center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Text fz={88} fw={900} className="app-gradient-text" style={{ letterSpacing: '-0.04em' }}>
            404
          </Text>
        </motion.div>
        <Title order={3}>This page wandered off</Title>
        <Text c="dimmed">
          The page you&apos;re looking for is missing — or maybe it just took a sick day.
        </Text>
        <Button
          component={Link}
          to={ROUTES.dashboard}
          variant="gradient"
          gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
        >
          Back to dashboard
        </Button>
      </Stack>
    </Center>
  );
}
