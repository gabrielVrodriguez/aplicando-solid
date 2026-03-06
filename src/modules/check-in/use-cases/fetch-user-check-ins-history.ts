
import { ICheckInRepository } from "../repositories/ICheckInRepository";
import { FetchUserCheckInsHistorySchema } from "../dtos/fetch-user-check-ins-history";
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'

export class FetchUserCheckInsHistoryUseCase {

    constructor(
        private checkinRepository: ICheckInRepository,
    ) { }

    async execute({ user_id, page = 1 }: FetchUserCheckInsHistorySchema) {


        const checkIns = await this.checkinRepository.findManyByUserId(user_id, page)

        if (!checkIns) {
            throw new ResourceNotFoundError()
        }

        return checkIns
    }
}