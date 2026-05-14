import { createTheme, rem, } from '@mantine/core';
const brand = [
    '#eef0ff',
    '#dadefa',
    '#b1baf3',
    '#8694ed',
    '#6275e8',
    '#4d62e6',
    '#4258e6',
    '#3349cc',
    '#2c41b6',
    '#2237a0',
];
const accent = [
    '#f3edff',
    '#e0d3ff',
    '#bda3ff',
    '#9870ff',
    '#7944ff',
    '#6928ff',
    '#601aff',
    '#500ee5',
    '#4707cd',
    '#3a00b5',
];
const success = [
    '#e6fbf3',
    '#d2f3e6',
    '#a8e4cb',
    '#7bd4ae',
    '#56c795',
    '#3fbf85',
    '#33bb7d',
    '#24a36a',
    '#17915d',
    '#007e4d',
];
const warning = [
    '#fff7e1',
    '#ffeec9',
    '#ffdb95',
    '#ffc75d',
    '#ffb633',
    '#ffac1a',
    '#ffa70c',
    '#e39200',
    '#ca8200',
    '#ae7000',
];
const danger = [
    '#ffe9ef',
    '#ffd1da',
    '#fba0b1',
    '#f76d85',
    '#f3415f',
    '#f12648',
    '#f0173c',
    '#d6062f',
    '#c00029',
    '#a90022',
];
const slate = [
    '#f4f6fb',
    '#e6e9f2',
    '#c8cee0',
    '#a8b1cd',
    '#8e98bd',
    '#7e8ab4',
    '#7683b1',
    '#65719c',
    '#58658c',
    '#48587d',
];
export const theme = createTheme({
    primaryColor: 'brand',
    primaryShade: { light: 6, dark: 5 },
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    fontFamilyMonospace: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    headings: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: '700',
        sizes: {
            h1: { fontSize: rem(34), lineHeight: '1.2', fontWeight: '800' },
            h2: { fontSize: rem(26), lineHeight: '1.25', fontWeight: '700' },
            h3: { fontSize: rem(20), lineHeight: '1.3', fontWeight: '700' },
            h4: { fontSize: rem(17), lineHeight: '1.35', fontWeight: '600' },
            h5: { fontSize: rem(15), lineHeight: '1.4', fontWeight: '600' },
            h6: { fontSize: rem(13), lineHeight: '1.4', fontWeight: '600' },
        },
    },
    defaultRadius: 'md',
    radius: {
        xs: rem(6),
        sm: rem(8),
        md: rem(10),
        lg: rem(14),
        xl: rem(20),
    },
    spacing: {
        xs: rem(8),
        sm: rem(12),
        md: rem(16),
        lg: rem(22),
        xl: rem(32),
    },
    shadows: {
        xs: '0 1px 2px rgba(15, 17, 33, 0.06)',
        sm: '0 2px 6px rgba(15, 17, 33, 0.08), 0 1px 2px rgba(15, 17, 33, 0.04)',
        md: '0 6px 18px rgba(15, 17, 33, 0.10), 0 2px 4px rgba(15, 17, 33, 0.04)',
        lg: '0 16px 40px rgba(15, 17, 33, 0.14), 0 4px 8px rgba(15, 17, 33, 0.06)',
        xl: '0 32px 80px rgba(15, 17, 33, 0.20), 0 8px 16px rgba(15, 17, 33, 0.08)',
    },
    colors: {
        brand,
        accent,
        success,
        warning,
        danger,
        slate,
    },
    components: {
        Button: {
            defaultProps: { radius: 'md' },
            styles: {
                root: {
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                    transition: 'transform 120ms ease, box-shadow 200ms ease, background 200ms ease',
                },
            },
        },
        Paper: {
            defaultProps: { radius: 'lg', withBorder: false },
        },
        Card: {
            defaultProps: { radius: 'lg', withBorder: false, shadow: 'sm' },
        },
        Modal: {
            defaultProps: { radius: 'lg', centered: true, overlayProps: { blur: 6, opacity: 0.55 } },
        },
        Drawer: {
            defaultProps: { overlayProps: { blur: 6, opacity: 0.55 } },
        },
        Tooltip: {
            defaultProps: { radius: 'sm', withArrow: true, openDelay: 250, transitionProps: { duration: 120 } },
        },
        TextInput: {
            defaultProps: { radius: 'md', size: 'md' },
        },
        PasswordInput: {
            defaultProps: { radius: 'md', size: 'md' },
        },
        Select: {
            defaultProps: { radius: 'md', size: 'md', checkIconPosition: 'right' },
        },
        NumberInput: {
            defaultProps: { radius: 'md', size: 'md' },
        },
        Textarea: {
            defaultProps: { radius: 'md', size: 'md' },
        },
        Badge: {
            defaultProps: { radius: 'sm', variant: 'light' },
        },
        Menu: {
            defaultProps: { radius: 'md', shadow: 'md', transitionProps: { duration: 120, transition: 'pop' } },
        },
    },
    other: {
        surface: {
            glass: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            glassBorder: 'rgba(255,255,255,0.08)',
        },
    },
});
export const cssVariablesResolver = (t) => ({
    variables: {
        '--app-header-height': rem(64),
        '--app-sidebar-width': rem(264),
        '--app-sidebar-width-collapsed': rem(72),
        '--app-content-max-width': rem(1440),
    },
    light: {
        '--app-bg': '#f6f8fc',
        '--app-bg-elevated': '#ffffff',
        '--app-surface': '#ffffff',
        '--app-surface-2': '#f1f4fb',
        '--app-border': 'rgba(15, 17, 33, 0.08)',
        '--app-border-strong': 'rgba(15, 17, 33, 0.14)',
        '--app-text-muted': '#64708a',
        '--app-text-subtle': '#8b94a8',
        '--app-glass-bg': 'rgba(255,255,255,0.65)',
        '--app-glass-border': 'rgba(15, 17, 33, 0.06)',
        '--app-shadow-card': '0 1px 0 rgba(15,17,33,.04), 0 6px 24px -8px rgba(15,17,33,.12)',
        '--app-hero-gradient': 'radial-gradient(1200px 600px at 0% 0%, rgba(99,102,241,.10), transparent 60%), radial-gradient(800px 400px at 100% 100%, rgba(52,211,153,.10), transparent 60%)',
        '--app-sidebar-bg': '#ffffff',
        '--app-sidebar-border': 'rgba(15,17,33,.06)',
        '--mantine-color-body': '#f6f8fc',
    },
    dark: {
        '--app-bg': '#0a0d1c',
        '--app-bg-elevated': '#10142a',
        '--app-surface': '#11162c',
        '--app-surface-2': '#161b35',
        '--app-border': 'rgba(255,255,255,0.06)',
        '--app-border-strong': 'rgba(255,255,255,0.12)',
        '--app-text-muted': '#a1a9c0',
        '--app-text-subtle': '#7a8197',
        '--app-glass-bg': 'rgba(20,24,46,0.7)',
        '--app-glass-border': 'rgba(255,255,255,0.06)',
        '--app-shadow-card': '0 1px 0 rgba(255,255,255,.03), 0 12px 32px -12px rgba(0,0,0,.5)',
        '--app-hero-gradient': 'radial-gradient(1200px 600px at 0% -10%, rgba(99,102,241,.22), transparent 60%), radial-gradient(800px 400px at 110% 110%, rgba(168,85,247,.18), transparent 60%)',
        '--app-sidebar-bg': '#0c1024',
        '--app-sidebar-border': 'rgba(255,255,255,.06)',
        '--mantine-color-body': '#0a0d1c',
        '--mantine-color-text': t.colors.slate[1],
    },
});
