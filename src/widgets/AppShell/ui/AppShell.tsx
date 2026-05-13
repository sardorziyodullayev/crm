import { AppShell as MantineShell, Box, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import { useUIStore } from '@shared/store/uiStore';
import { PageTransition } from '@shared/ui/PageTransition';

import { CommandPalette } from '../../CommandPalette/ui/CommandPalette';
import { Topbar } from '../../Topbar/ui/Topbar';
import { Sidebar } from '../../Sidebar/ui/Sidebar';

export function AppShell() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const isMobile = useMediaQuery('(max-width: 62em)');
  const [mobileOpen, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);

  const sidebarWidth = collapsed && !isMobile ? 72 : 264;

  return (
    <MantineShell
      header={{ height: 64 }}
      navbar={{
        width: sidebarWidth,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpen },
      }}
      padding={0}
      styles={{
        main: {
          background: 'var(--app-bg)',
          backgroundImage: 'var(--app-hero-gradient)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        header: {
          background: 'var(--app-glass-bg)',
          backdropFilter: 'saturate(180%) blur(14px)',
          WebkitBackdropFilter: 'saturate(180%) blur(14px)',
          borderBottom: '1px solid var(--app-border)',
        },
        navbar: {
          background: 'var(--app-sidebar-bg)',
          borderRight: '1px solid var(--app-sidebar-border)',
        },
      }}
    >
      <MantineShell.Header>
        <Topbar onBurgerClick={toggleMobile} mobileOpen={mobileOpen} />
      </MantineShell.Header>

      <MantineShell.Navbar p={0}>
        <ScrollArea style={{ height: '100%' }} scrollbarSize={6}>
          <Sidebar onNavigate={closeMobile} />
        </ScrollArea>
      </MantineShell.Navbar>

      <MantineShell.Main>
        <Box
          px={{ base: 'md', md: 'xl' }}
          py={{ base: 'md', md: 'xl' }}
          mx="auto"
          style={{ maxWidth: 'var(--app-content-max-width)' }}
        >
          <PageTransition>
            <Outlet />
          </PageTransition>
        </Box>
      </MantineShell.Main>

      <CommandPalette />
    </MantineShell>
  );
}
