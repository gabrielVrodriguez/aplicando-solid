
import { z } from "zod"
import { CheckIn } from "@/shared/entities/check-in"


export interface validateCheckInResponse {
    check_in: CheckIn
}

export const validateCheckInDto = z.object({
    // user_id: z.string(),
    check_in_id: z.string()
})

export type ValidateCheckInSchema = z.infer<typeof validateCheckInDto>
