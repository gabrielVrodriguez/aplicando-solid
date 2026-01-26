
import { ICheckInRepository } from "../repositories/ICheckInRepository";
import { GetMetricsByUserIdSchema } from "../dtos/get-metrics-by-user-id";
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'

export class GetMetricsByUserIdUseCase {

    constructor(
        private checkinRepository: ICheckInRepository,
    ) { }

    async execute({ user_id }: GetMetricsByUserIdSchema) {


        const checkInsCount = await this.checkinRepository.countByUserId(user_id)

        if (!checkInsCount) {
            throw new ResourceNotFoundError()
        }

        return checkInsCount 
    }
}