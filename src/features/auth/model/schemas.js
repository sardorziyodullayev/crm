import { z } from 'zod';
export const loginSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'At least 8 characters'),
    remember: z.boolean().optional(),
});
export const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'At least 8 characters'),
    centerName: z.string().min(2, 'Center name is required'),
    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms' }),
    }),
});
export const forgotSchema = z.object({
    email: z.string().email('Enter a valid email'),
});
export const otpSchema = z.object({
    code: z.string().regex(/^[0-9]{6}$/, '6-digit code'),
});
