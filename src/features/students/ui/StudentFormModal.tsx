import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { groupApi } from '@entities/group';
import { studentApi, type Student } from '@entities/student';
import { queryKeys } from '@shared/api';

import { studentSchema, type StudentInput } from '../model/schemas';

const BRANCHES = [
  'Tashkent · Yunusobod',
  'Tashkent · Chilonzor',
  "Tashkent · Mirzo Ulug'bek",
  'Samarqand · Markaz',
  'Buxoro · Markaz',
];

interface Props {
  opened: boolean;
  onClose: () => void;
  initial?: Partial<Student>;
}

export function StudentFormModal({ opened, onClose, initial }: Props) {
  const qc = useQueryClient();
  const isEdit = Boolean(initial?.id);

  const form = useForm<StudentInput>({
    initialValues: {
      firstName: initial?.firstName ?? '',
      lastName: initial?.lastName ?? '',
      phone: initial?.phone ?? '',
      email: initial?.email ?? '',
      gender: initial?.gender ?? 'male',
      birthDate: initial?.birthDate ?? dayjs().subtract(18, 'year').format('YYYY-MM-DD'),
      parentName: initial?.parentName ?? '',
      parentPhone: initial?.parentPhone ?? '',
      branch: initial?.branch ?? BRANCHES[0]!,
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
    mutationFn: (values: StudentInput) =>
      isEdit && initial?.id
        ? studentApi.update(initial.id, values as Partial<Student>)
        : studentApi.create(values as Partial<Student>),
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
    onError: (e: Error) =>
      notifications.show({ title: 'Failed to save', message: e.message, color: 'red' }),
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? 'Edit student' : 'New student'}
      size="lg"
    >
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
        <Tabs defaultValue="profile" keepMounted={false}>
          <Tabs.List mb="md">
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="parent">Parent</Tabs.Tab>
            <Tabs.Tab value="placement">Placement</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="profile">
            <Stack>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label="First name" {...form.getInputProps('firstName')} />
                <TextInput label="Last name" {...form.getInputProps('lastName')} />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label="Phone" {...form.getInputProps('phone')} placeholder="+998 ..." />
                <TextInput label="Email (optional)" {...form.getInputProps('email')} />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Select
                  label="Gender"
                  data={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                  ]}
                  {...form.getInputProps('gender')}
                />
                <DateInput
                  label="Birth date"
                  valueFormat="YYYY-MM-DD"
                  value={form.values.birthDate ? new Date(form.values.birthDate) : null}
                  onChange={(d) =>
                    form.setFieldValue(
                      'birthDate',
                      d ? dayjs(d).format('YYYY-MM-DD') : '',
                    )
                  }
                />
              </SimpleGrid>
              <Textarea label="Internal notes" autosize minRows={2} {...form.getInputProps('notes')} />
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="parent">
            <Stack>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label="Parent name" {...form.getInputProps('parentName')} />
                <TextInput label="Parent phone" {...form.getInputProps('parentPhone')} />
              </SimpleGrid>
              <Select label="Branch" data={BRANCHES} {...form.getInputProps('branch')} />
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="placement">
            <Stack>
              <Select
                label="Status"
                data={[
                  { value: 'active', label: 'Active' },
                  { value: 'trial', label: 'Trial' },
                  { value: 'frozen', label: 'Frozen' },
                  { value: 'archived', label: 'Archived' },
                ]}
                {...form.getInputProps('status')}
              />
              <MultiSelect
                label="Groups"
                placeholder="Assign to groups"
                searchable
                data={(groupsQ.data?.data ?? []).map((g) => ({ value: g.id, label: g.name }))}
                {...form.getInputProps('groupIds')}
              />
              <TagsInput
                label="Tags"
                placeholder="Add tags…"
                acceptValueOnBlur
                clearable
                {...form.getInputProps('tags')}
              />
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Group justify="space-between" mt="xl">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={mutation.isPending}
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            {isEdit ? 'Save changes' : 'Create student'}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
