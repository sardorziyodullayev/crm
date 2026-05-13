import { ActionIcon, Group, Menu, Text, Tooltip } from '@mantine/core';
import {
  IconColumns3,
  IconDots,
  IconDownload,
  IconRefresh,
} from '@tabler/icons-react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
  type MRT_TableOptions,
  useMantineReactTable,
} from 'mantine-react-table';
import { useState, type ReactNode } from 'react';

import { EmptyState } from '../EmptyState';

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  loading?: boolean;
  total?: number;
  enableSelection?: boolean;
  enableSearch?: boolean;
  enablePagination?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  toolbar?: ReactNode;
  rowActions?: (row: T) => ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  initialSorting?: MRT_TableOptions<T>['state'] extends infer _ ? unknown : unknown;
  density?: 'xs' | 'md' | 'xl';
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading,
  total,
  enableSelection = true,
  enableSearch = true,
  enablePagination = true,
  onRefresh,
  onExport,
  toolbar,
  rowActions,
  emptyTitle = 'Nothing to show yet',
  emptyDescription,
  density = 'md',
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const cols: MRT_ColumnDef<T>[] = rowActions
    ? [
        ...columns,
        {
          id: '__actions',
          header: '',
          size: 56,
          enableSorting: false,
          enableColumnActions: false,
          enableHiding: false,
          enableColumnFilter: false,
          mantineTableHeadCellProps: { align: 'right' },
          mantineTableBodyCellProps: { align: 'right' },
          Cell: ({ row }) => rowActions(row.original),
        },
      ]
    : columns;

  const table = useMantineReactTable<T>({
    data,
    columns: cols,
    state: { rowSelection, isLoading: loading },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: enableSelection,
    enableGlobalFilter: enableSearch,
    enablePagination,
    enableColumnActions: false,
    enableColumnDragging: false,
    enableColumnResizing: true,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: true,
    enableTopToolbar: true,
    enableBottomToolbar: enablePagination,
    enableStickyHeader: true,
    initialState: {
      density: density === 'xs' ? 'xs' : density === 'xl' ? 'xl' : 'md',
      showGlobalFilter: enableSearch,
    },
    mantinePaperProps: {
      shadow: 'none',
      withBorder: false,
      radius: 'lg',
      style: {
        background: 'transparent',
        border: 'none',
      },
    },
    mantineTableProps: {
      withTableBorder: false,
      striped: false,
      highlightOnHover: true,
    },
    mantineTableContainerProps: {
      style: {
        background: 'var(--app-surface)',
        border: '1px solid var(--app-border)',
        borderRadius: 14,
        boxShadow: 'var(--app-shadow-card)',
        overflow: 'hidden',
      },
    },
    mantineTableHeadCellProps: {
      style: {
        background: 'var(--app-surface-2)',
        borderBottom: '1px solid var(--app-border)',
        color: 'var(--app-text-muted)',
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
      },
    },
    mantineTableBodyCellProps: {
      style: {
        borderBottom: '1px solid var(--app-border)',
      },
    },
    mantineSearchTextInputProps: {
      placeholder: 'Search…',
      radius: 'md',
      style: { minWidth: 260 },
    },
    rowCount: total,
    renderEmptyRowsFallback: () => (
      <EmptyState title={emptyTitle} description={emptyDescription} height={220} />
    ),
    renderTopToolbarCustomActions: () => (
      <Group gap="xs" wrap="nowrap">
        {toolbar}
        {typeof total === 'number' && (
          <Text size="xs" c="dimmed" ml={6}>
            {total.toLocaleString()} {total === 1 ? 'record' : 'records'}
          </Text>
        )}
      </Group>
    ),
    renderToolbarInternalActions: ({ table: t }) => (
      <Group gap={6} wrap="nowrap">
        {onRefresh && (
          <Tooltip label="Refresh">
            <ActionIcon variant="subtle" color="gray" onClick={onRefresh}>
              <IconRefresh size={16} />
            </ActionIcon>
          </Tooltip>
        )}
        <Menu position="bottom-end" shadow="md" radius="md" width={200}>
          <Menu.Target>
            <Tooltip label="Columns">
              <ActionIcon variant="subtle" color="gray">
                <IconColumns3 size={16} />
              </ActionIcon>
            </Tooltip>
          </Menu.Target>
          <Menu.Dropdown>
            {t.getAllLeafColumns().map((col) => {
              if (col.id === 'mrt-row-select' || col.id === '__actions') return null;
              return (
                <Menu.Item
                  key={col.id}
                  onClick={(e) => {
                    e.preventDefault();
                    col.toggleVisibility();
                  }}
                >
                  <Group justify="space-between" gap="xs">
                    <Text size="sm">{(col.columnDef.header as string) || col.id}</Text>
                    <Text size="xs" c="dimmed">
                      {col.getIsVisible() ? '✓' : '—'}
                    </Text>
                  </Group>
                </Menu.Item>
              );
            })}
          </Menu.Dropdown>
        </Menu>
        {onExport && (
          <Tooltip label="Export CSV">
            <ActionIcon variant="subtle" color="gray" onClick={onExport}>
              <IconDownload size={16} />
            </ActionIcon>
          </Tooltip>
        )}
        <Menu position="bottom-end" shadow="md" radius="md" width={180}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Print</Menu.Item>
            <Menu.Item>Save view</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red">Reset filters</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    ),
  });

  return <MantineReactTable table={table} />;
}
