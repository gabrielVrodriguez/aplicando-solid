
import { ICheckInRepository } from "../repositories/ICheckInRepository";
import { FetchUserCheckInHistorySchema } from "../dtos/fetch-user-check-in-history";
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'

export class FetchUserCheckInsHistoryUseCase {

    constructor(
        private checkinRepository: ICheckInRepository,
    ) { }

    async execute({ user_id, page = 1 }: FetchUserCheckInHistorySchema) {


        const checkIns = await this.checkinRepository.findManyByUserId(user_id, page)

        if (!checkIns) {
            throw new ResourceNotFoundError()
        }

        return checkIns
    }
}