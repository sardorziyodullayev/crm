import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Group, Menu, Text, Tooltip } from '@mantine/core';
import { IconColumns3, IconDots, IconDownload, IconRefresh, } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable, } from 'mantine-react-table';
import { useState } from 'react';
import { EmptyState } from '../EmptyState';
export function DataTable({ data, columns, loading, total, enableSelection = true, enableSearch = true, enablePagination = true, onRefresh, onExport, toolbar, rowActions, emptyTitle = 'Nothing to show yet', emptyDescription, density = 'md', }) {
    const [rowSelection, setRowSelection] = useState({});
    const cols = rowActions
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
    const table = useMantineReactTable({
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
        renderEmptyRowsFallback: () => (_jsx(EmptyState, { title: emptyTitle, description: emptyDescription, height: 220 })),
        renderTopToolbarCustomActions: () => (_jsxs(Group, { gap: "xs", wrap: "nowrap", children: [toolbar, typeof total === 'number' && (_jsxs(Text, { size: "xs", c: "dimmed", ml: 6, children: [total.toLocaleString(), " ", total === 1 ? 'record' : 'records'] }))] })),
        renderToolbarInternalActions: ({ table: t }) => (_jsxs(Group, { gap: 6, wrap: "nowrap", children: [onRefresh && (_jsx(Tooltip, { label: "Refresh", children: _jsx(ActionIcon, { variant: "subtle", color: "gray", onClick: onRefresh, children: _jsx(IconRefresh, { size: 16 }) }) })), _jsxs(Menu, { position: "bottom-end", shadow: "md", radius: "md", width: 200, children: [_jsx(Menu.Target, { children: _jsx(Tooltip, { label: "Columns", children: _jsx(ActionIcon, { variant: "subtle", color: "gray", children: _jsx(IconColumns3, { size: 16 }) }) }) }), _jsx(Menu.Dropdown, { children: t.getAllLeafColumns().map((col) => {
                                if (col.id === 'mrt-row-select' || col.id === '__actions')
                                    return null;
                                return (_jsx(Menu.Item, { onClick: (e) => {
                                        e.preventDefault();
                                        col.toggleVisibility();
                                    }, children: _jsxs(Group, { justify: "space-between", gap: "xs", children: [_jsx(Text, { size: "sm", children: col.columnDef.header || col.id }), _jsx(Text, { size: "xs", c: "dimmed", children: col.getIsVisible() ? '✓' : '—' })] }) }, col.id));
                            }) })] }), onExport && (_jsx(Tooltip, { label: "Export CSV", children: _jsx(ActionIcon, { variant: "subtle", color: "gray", onClick: onExport, children: _jsx(IconDownload, { size: 16 }) }) })), _jsxs(Menu, { position: "bottom-end", shadow: "md", radius: "md", width: 180, children: [_jsx(Menu.Target, { children: _jsx(ActionIcon, { variant: "subtle", color: "gray", children: _jsx(IconDots, { size: 16 }) }) }), _jsxs(Menu.Dropdown, { children: [_jsx(Menu.Item, { children: "Print" }), _jsx(Menu.Item, { children: "Save view" }), _jsx(Menu.Divider, {}), _jsx(Menu.Item, { color: "red", children: "Reset filters" })] })] })] })),
    });
    return _jsx(MantineReactTable, { table: table });
}
