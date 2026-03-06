import { z } from 'zod';


export const registerUserDto = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['ADMIN', 'MEMBER']).default('MEMBER').optional(),
})

export type RegisterUserSchema = z.infer<typeof registerUserDto>