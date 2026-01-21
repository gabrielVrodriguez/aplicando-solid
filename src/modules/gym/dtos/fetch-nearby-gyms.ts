





import { z } from "zod";


export const fetchNearbyGymsDto = z.object({
    latitude: z.number(),
    longitude: z.number(),
})

export type fetchNearbyGymsSchema = z.infer<typeof fetchNearbyGymsDto>