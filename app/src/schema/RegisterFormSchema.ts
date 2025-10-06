import z from 'zod';
import { messages } from '../../constants/messages';

export const RegisterFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(12, {
      message: messages.password.length,
    })
    .refine(val => /[A-Z]/.test(val), {
      message: messages.password.uppercase,
    })
    .refine(val => /[0-9]/.test(val), {
      message: messages.password.digit,
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: messages.password.special,
    }),
  confirmPassword: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;
