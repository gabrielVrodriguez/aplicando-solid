
import { ICheckInRepository } from "../repositories/ICheckInRepository";
import { FetchUserCheckInHistorySchema } from "../dtos/fetch-user-check-in-history";
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'

export class FetchUserCheckInsHistoryUseCase {

    constructor(
        private checkinRepository: ICheckInRepository,
    ) { }

    async execute({ user_id }: FetchUserCheckInHistorySchema) {


        const checkIns = await this.checkinRepository.findByUserId(user_id)
        if (!checkIns) {
            throw new ResourceNotFoundError()
        }

        return checkIns
    }
}