import { z } from 'zod';


export const registerUserDto = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export type RegisterUserSchema = z.infer<typeof registerUserDto>