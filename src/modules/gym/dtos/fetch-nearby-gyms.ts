





import { z } from "zod";


export const FetchNearbyGymsDto = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
})

export type FetchNearbyGymsSchema = z.infer<typeof FetchNearbyGymsDto>