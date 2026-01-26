





import { z } from "zod";


export const FetchNearbyGymsDto = z.object({
    latitude: z.number(),
    longitude: z.number(),
})

export type FetchNearbyGymsSchema = z.infer<typeof FetchNearbyGymsDto>