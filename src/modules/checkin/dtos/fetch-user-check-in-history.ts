

import { z } from "zod"

export const fetchUserCheckInHistoryDto = z.object({
    user_id: z.string(),
    page: z.number().min(1).default(1).optional()
})

export type FetchUserCheckInHistorySchema = z.infer<typeof fetchUserCheckInHistoryDto>