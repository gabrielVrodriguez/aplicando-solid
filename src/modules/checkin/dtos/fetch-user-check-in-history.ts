

import { z } from "zod"

export const fetchUserCheckInHistoryDto = z.object({
    user_id: z.string(),
})

export type FetchUserCheckInHistorySchema = z.infer<typeof fetchUserCheckInHistoryDto>