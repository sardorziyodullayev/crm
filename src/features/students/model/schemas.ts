import { z } from 'zod';

export const studentSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(7, 'Phone is required'),
  email: z.string().email('Enter a valid email').or(z.literal('')),
  gender: z.enum(['male', 'female']),
  birthDate: z.string().min(1, 'Birth date required'),
  parentName: z.string().min(2, 'Parent name required'),
  parentPhone: z.string().min(7, 'Parent phone required'),
  branch: z.string().min(2),
  status: z.enum(['active', 'trial', 'frozen', 'archived']),
  groupIds: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  notes: z.string().default(''),
});

export type StudentInput = z.infer<typeof studentSchema>;
