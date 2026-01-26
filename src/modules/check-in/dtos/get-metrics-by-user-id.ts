

import { z } from "zod"

export const getMetricsByUserIdDto = z.object({
    user_id: z.string(),
})

export type GetMetricsByUserIdSchema = z.infer<typeof getMetricsByUserIdDto>