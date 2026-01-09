

import { z } from 'zod'
import { User } from '@/shared/entities/user'


export interface AuthenticateUseCaseResponse {
    user: User
}

export const authenticateDto = z.object({
    email:z.string().email(), 
    password:z.string()
})

export type AuthenticateSchema = z.infer<typeof authenticateDto>
