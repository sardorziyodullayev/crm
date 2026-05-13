import {
  Avatar,
  Badge,
  Box,
  Button,
  ColorSwatch,
  FileButton,
  Group,
  PasswordInput,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconBrandTelegram,
  IconBuilding,
  IconKey,
  IconMoonStars,
  IconPalette,
  IconUpload,
  IconWebhook,
} from '@tabler/icons-react';

import { useAuthStore } from '@shared/store/authStore';
import { useThemeStore } from '@shared/store/themeStore';
import { initials } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const colorScheme = useThemeStore((s) => s.colorScheme);
  const language = useThemeStore((s) => s.language);
  const density = useThemeStore((s) => s.density);
  const setScheme = useThemeStore((s) => s.setScheme);
  const setLanguage = useThemeStore((s) => s.setLanguage);
  const setDensity = useThemeStore((s) => s.setDensity);

  return (
    <Stack gap="lg">
      <PageHeader
        title="Settings"
        description="Workspace preferences, security, integrations and branding."
      />
      <Tabs defaultValue="profile">
        <Tabs.List mb="md">
          <Tabs.Tab value="profile" leftSection={<IconBuilding size={14} />}>
            Workspace
          </Tabs.Tab>
          <Tabs.Tab value="appearance" leftSection={<IconPalette size={14} />}>
            Appearance
          </Tabs.Tab>
          <Tabs.Tab value="security" leftSection={<IconKey size={14} />}>
            Security
          </Tabs.Tab>
          <Tabs.Tab value="integrations" leftSection={<IconWebhook size={14} />}>
            Integrations
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
            <SurfaceCard>
              <Stack align="center" gap="md">
                <Avatar size={88} radius={88} color="brand" variant="light">
                  {initials(user?.fullName ?? 'A')}
                </Avatar>
                <FileButton onChange={() => undefined} accept="image/*">
                  {(props) => (
                    <Button leftSection={<IconUpload size={14} />} variant="light" size="xs" {...props}>
                      Upload logo
                    </Button>
                  )}
                </FileButton>
              </Stack>
            </SurfaceCard>
            <Box style={{ gridColumn: 'span 2' }}>
              <SurfaceCard>
                <Stack gap="md">
                  <Title order={5}>Center information</Title>
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput label="Center name" defaultValue="Edura Demo Center" />
                    <TextInput label="Display URL" defaultValue="edura.uz/demo" />
                  </SimpleGrid>
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput label="Contact email" defaultValue="hello@edura.uz" />
                    <TextInput label="Contact phone" defaultValue="+998 71 234 56 78" />
                  </SimpleGrid>
                  <Group justify="flex-end">
                    <Button variant="subtle">Cancel</Button>
                    <Button variant="gradient" gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}>
                      Save changes
                    </Button>
                  </Group>
                </Stack>
              </SurfaceCard>
            </Box>
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="appearance">
          <SurfaceCard>
            <Stack gap="md">
              <Group gap="lg" wrap="wrap">
                <Stack gap={4}>
                  <Text fz={12} c="dimmed" tt="uppercase" fw={600}>Theme</Text>
                  <Group gap="xs">
                    <Button
                      leftSection={<IconMoonStars size={14} />}
                      variant={colorScheme === 'dark' ? 'filled' : 'default'}
                      onClick={() => setScheme('dark')}
                    >
                      Dark
                    </Button>
                    <Button
                      leftSection={<IconPalette size={14} />}
                      variant={colorScheme === 'light' ? 'filled' : 'default'}
                      onClick={() => setScheme('light')}
                    >
                      Light
                    </Button>
                  </Group>
                </Stack>
                <Stack gap={4}>
                  <Text fz={12} c="dimmed" tt="uppercase" fw={600}>Brand color</Text>
                  <Group gap="xs">
                    {['#7944ff', '#4d62e6', '#34d399', '#22d3ee', '#f12648', '#ffac1a'].map(
                      (c) => (
                        <ColorSwatch key={c} color={c} radius="sm" size={28} />
                      ),
                    )}
                  </Group>
                </Stack>
                <Stack gap={4}>
                  <Text fz={12} c="dimmed" tt="uppercase" fw={600}>Density</Text>
                  <Select
                    data={[
                      { value: 'comfortable', label: 'Comfortable' },
                      { value: 'compact', label: 'Compact' },
                    ]}
                    value={density}
                    onChange={(v) => v && setDensity(v as 'comfortable' | 'compact')}
                    w={200}
                  />
                </Stack>
                <Stack gap={4}>
                  <Text fz={12} c="dimmed" tt="uppercase" fw={600}>Language</Text>
                  <Select
                    data={[
                      { value: 'en', label: 'English' },
                      { value: 'uz', label: "O'zbek" },
                      { value: 'ru', label: 'Русский' },
                    ]}
                    value={language}
                    onChange={(v) => v && setLanguage(v as 'en' | 'uz' | 'ru')}
                    w={200}
                  />
                </Stack>
              </Group>
            </Stack>
          </SurfaceCard>
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
            <SurfaceCard>
              <Stack gap="md">
                <Title order={5}>Change password</Title>
                <PasswordInput label="Current password" />
                <PasswordInput label="New password" />
                <PasswordInput label="Confirm new password" />
                <Group justify="flex-end">
                  <Button variant="gradient" gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}>
                    Update password
                  </Button>
                </Group>
              </Stack>
            </SurfaceCard>
            <SurfaceCard>
              <Stack gap="md">
                <Title order={5}>Two-factor authentication</Title>
                <Group justify="space-between">
                  <Stack gap={2}>
                    <Text fz={14} fw={600}>Authenticator app</Text>
                    <Text fz={12} c="dimmed">Use Google Authenticator or 1Password</Text>
                  </Stack>
                  <Switch defaultChecked />
                </Group>
                <Group justify="space-between">
                  <Stack gap={2}>
                    <Text fz={14} fw={600}>SMS recovery codes</Text>
                    <Text fz={12} c="dimmed">Sent to +998 90 ··· ·· 67</Text>
                  </Stack>
                  <Switch />
                </Group>
              </Stack>
            </SurfaceCard>
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="integrations">
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
            <SurfaceCard>
              <Group justify="space-between" align="flex-start">
                <Stack gap={4}>
                  <Group gap="xs">
                    <IconBrandTelegram size={18} />
                    <Title order={5}>Telegram bot</Title>
                  </Group>
                  <Text fz={12} c="dimmed">
                    Send automatic reminders, attendance notifications and payment receipts.
                  </Text>
                </Stack>
                <Badge color="success" variant="light">Connected</Badge>
              </Group>
              <Stack gap="sm" mt="md">
                <TextInput label="Bot token" defaultValue="••••••••··········" />
                <TextInput label="Channel" defaultValue="@edura_uz_bot" />
                <Group gap="xs">
                  <Switch defaultChecked label="Notify parents on absence" />
                  <Switch defaultChecked label="Send weekly report" />
                </Group>
              </Stack>
            </SurfaceCard>
            <SurfaceCard>
              <Group justify="space-between" align="flex-start">
                <Stack gap={4}>
                  <Group gap="xs">
                    <IconWebhook size={18} />
                    <Title order={5}>Payme & Click</Title>
                  </Group>
                  <Text fz={12} c="dimmed">
                    Process student payments via Uzbekistan&apos;s primary acquirers.
                  </Text>
                </Stack>
                <Badge color="warning" variant="light">Pending</Badge>
              </Group>
              <Stack gap="sm" mt="md">
                <TextInput label="Merchant ID" placeholder="EDURA-1234" />
                <TextInput label="Webhook URL" defaultValue="https://api.edura.uz/webhooks/payme" />
              </Stack>
            </SurfaceCard>
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
