
import { z } from "zod"

export const createGymDto = z.object({
    id: z.string(),
    title: z.string().min(3),
    description: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    latitude: z.number(),
    longitude: z.number(),
  })

export type CreateGymSchema = z.infer<typeof createGymDto>