

import z from 'zod'


export const getUserByIdDto = z.object({
    id: z.string().uuid()
})

export type GetUserByIdSchema = z.infer<typeof getUserByIdDto>