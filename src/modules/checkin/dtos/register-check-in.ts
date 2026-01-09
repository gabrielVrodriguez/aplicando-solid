

import { z } from 'zod'

export const registerCheckinDto = z.object({
    user_id: z.string().uuid(),
    gym_id: z.string().uuid(),
    user_latitude: z.number(),
    user_longitude: z.number()
})

export type registerCheckinSchema = z.infer<typeof registerCheckinDto>