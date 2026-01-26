

import { z } from "zod"

export const fetchUserCheckInsHistoryDto = z.object({
    user_id: z.string(),
    page: z.number().min(1).default(1).optional()
})

export type FetchUserCheckInsHistorySchema = z.infer<typeof fetchUserCheckInsHistoryDto>