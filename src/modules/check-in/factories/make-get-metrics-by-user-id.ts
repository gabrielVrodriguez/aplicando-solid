import { PrismaCheckInsRepository } from "../repositories/prisma/prisma-check-ins-repository"
import { GetMetricsByUserIdUseCase } from "../use-cases/get-metrics-by-user-id"
import { GetMetricsByUserIdController } from "../controllers/get-metrics-by-user-id"



export function makeGetMetricsByUserIdUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const getMetricsByUserIdUseCase = new GetMetricsByUserIdUseCase(prismaCheckInsRepository)
    return getMetricsByUserIdUseCase
}

export function makeGetMetricsByUserIdController() {
    const getMetricsByUserIdUseCase = makeGetMetricsByUserIdUseCase()
    const getMetricsByUserIdController = new GetMetricsByUserIdController(getMetricsByUserIdUseCase)
    return getMetricsByUserIdController
}