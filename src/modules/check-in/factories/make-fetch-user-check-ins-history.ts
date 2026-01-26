import { PrismaCheckInsRepository } from "../repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "../use-cases/fetch-user-check-ins-history"
import { FetchUserCheckInsHistoryController } from "../controllers/fetch-user-check-ins-history"



export function makeFetchUserCheckInsHistoryUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository)
    return fetchUserCheckInsHistoryUseCase
}

export function makeFetchUserCheckInsHistoryController() {
    const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()
    const fetchUserCheckInsHistoryController = new FetchUserCheckInsHistoryController(fetchUserCheckInsHistoryUseCase)
    return fetchUserCheckInsHistoryController
}