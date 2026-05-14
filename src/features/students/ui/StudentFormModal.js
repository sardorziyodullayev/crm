import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Group, Modal, MultiSelect, Select, SimpleGrid, Stack, Tabs, TagsInput, Textarea, TextInput, } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { groupApi } from '@entities/group';
import { studentApi } from '@entities/student';
import { queryKeys } from '@shared/api';
import { studentSchema } from '../model/schemas';
const BRANCHES = [
    'Tashkent · Yunusobod',
    'Tashkent · Chilonzor',
    "Tashkent · Mirzo Ulug'bek",
    'Samarqand · Markaz',
    'Buxoro · Markaz',
];
export function StudentFormModal({ opened, onClose, initial }) {
    const qc = useQueryClient();
    const isEdit = Boolean(initial?.id);
    const form = useForm({
        initialValues: {
            firstName: initial?.firstName ?? '',
            lastName: initial?.lastName ?? '',
            phone: initial?.phone ?? '',
            email: initial?.email ?? '',
            gender: initial?.gender ?? 'male',
            birthDate: initial?.birthDate ?? dayjs().subtract(18, 'year').format('YYYY-MM-DD'),
            parentName: initial?.parentName ?? '',
            parentPhone: initial?.parentPhone ?? '',
            branch: initial?.branch ?? BRANCHES[0],
            status: initial?.status ?? 'trial',
            groupIds: initial?.groupIds ?? [],
            tags: initial?.tags ?? [],
            notes: initial?.notes ?? '',
        },
        validate: zodResolver(studentSchema),
    });
    const groupsQ = useQuery({
        queryKey: queryKeys.groups.all,
        queryFn: () => groupApi.list({ pageSize: 100 }),
    });
    const mutation = useMutation({
        mutationFn: (values) => isEdit && initial?.id
            ? studentApi.update(initial.id, values)
            : studentApi.create(values),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: queryKeys.students.all });
            qc.invalidateQueries({ queryKey: queryKeys.dashboard.summary });
            notifications.show({
                title: isEdit ? 'Student updated' : 'Student created',
                message: `${form.values.firstName} ${form.values.lastName}`,
                color: 'teal',
            });
            onClose();
        },
        onError: (e) => notifications.show({ title: 'Failed to save', message: e.message, color: 'red' }),
    });
    return (_jsx(Modal, { opened: opened, onClose: onClose, title: isEdit ? 'Edit student' : 'New student', size: "lg", children: _jsxs("form", { onSubmit: form.onSubmit((values) => mutation.mutate(values)), children: [_jsxs(Tabs, { defaultValue: "profile", keepMounted: false, children: [_jsxs(Tabs.List, { mb: "md", children: [_jsx(Tabs.Tab, { value: "profile", children: "Profile" }), _jsx(Tabs.Tab, { value: "parent", children: "Parent" }), _jsx(Tabs.Tab, { value: "placement", children: "Placement" })] }), _jsx(Tabs.Panel, { value: "profile", children: _jsxs(Stack, { children: [_jsxs(SimpleGrid, { cols: { base: 1, sm: 2 }, children: [_jsx(TextInput, { label: "First name", ...form.getInputProps('firstName') }), _jsx(TextInput, { label: "Last name", ...form.getInputProps('lastName') })] }), _jsxs(SimpleGrid, { cols: { base: 1, sm: 2 }, children: [_jsx(TextInput, { label: "Phone", ...form.getInputProps('phone'), placeholder: "+998 ..." }), _jsx(TextInput, { label: "Email (optional)", ...form.getInputProps('email') })] }), _jsxs(SimpleGrid, { cols: { base: 1, sm: 2 }, children: [_jsx(Select, { label: "Gender", data: [
                                                    { value: 'male', label: 'Male' },
                                                    { value: 'female', label: 'Female' },
                                                ], ...form.getInputProps('gender') }), _jsx(DateInput, { label: "Birth date", valueFormat: "YYYY-MM-DD", value: form.values.birthDate ? new Date(form.values.birthDate) : null, onChange: (d) => form.setFieldValue('birthDate', d ? dayjs(d).format('YYYY-MM-DD') : '') })] }), _jsx(Textarea, { label: "Internal notes", autosize: true, minRows: 2, ...form.getInputProps('notes') })] }) }), _jsx(Tabs.Panel, { value: "parent", children: _jsxs(Stack, { children: [_jsxs(SimpleGrid, { cols: { base: 1, sm: 2 }, children: [_jsx(TextInput, { label: "Parent name", ...form.getInputProps('parentName') }), _jsx(TextInput, { label: "Parent phone", ...form.getInputProps('parentPhone') })] }), _jsx(Select, { label: "Branch", data: BRANCHES, ...form.getInputProps('branch') })] }) }), _jsx(Tabs.Panel, { value: "placement", children: _jsxs(Stack, { children: [_jsx(Select, { label: "Status", data: [
                                            { value: 'active', label: 'Active' },
                                            { value: 'trial', label: 'Trial' },
                                            { value: 'frozen', label: 'Frozen' },
                                            { value: 'archived', label: 'Archived' },
                                        ], ...form.getInputProps('status') }), _jsx(MultiSelect, { label: "Groups", placeholder: "Assign to groups", searchable: true, data: (groupsQ.data?.data ?? []).map((g) => ({ value: g.id, label: g.name })), ...form.getInputProps('groupIds') }), _jsx(TagsInput, { label: "Tags", placeholder: "Add tags\u2026", acceptValueOnBlur: true, clearable: true, ...form.getInputProps('tags') })] }) })] }), _jsxs(Group, { justify: "space-between", mt: "xl", children: [_jsx(Button, { variant: "subtle", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", loading: mutation.isPending, variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: isEdit ? 'Save changes' : 'Create student' })] })] }) }));
}
