import { ICheckInRepository } from "../repositories/ICheckInRepository";

import { CheckIn } from "@/shared/entities/check-in"
import { ValidateCheckInSchema } from "../dtos/validate-check-in";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found";
import { LateCheckInValidationError } from "../errors/late-check-in-validation";

import dayjs from "dayjs";

export class ValidateCheckInUseCase {

    constructor(
        private checkinRepository: ICheckInRepository,
    ) { }

    async execute({ check_in_id }: ValidateCheckInSchema): Promise<CheckIn> {
        const checkin = await this.checkinRepository.findById(check_in_id)

        if (!checkin) {
            throw new ResourceNotFoundError()
        }

        checkin.validated_at = new Date()

        const distanceInMinutesOfCheckinCreation = dayjs(new Date()).diff(checkin.created_at, 'minute')

        if (distanceInMinutesOfCheckinCreation > 20) {
            throw new LateCheckInValidationError()
        }

        await this.checkinRepository.save(checkin)

        return checkin
    }
}