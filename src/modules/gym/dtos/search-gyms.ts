
import { z } from "zod";


export const searchGymDto = z.object({
    query: z.string(),
    page: z.number().optional().default(1),
})

export type SearchGymSchema = z.infer<typeof searchGymDto>