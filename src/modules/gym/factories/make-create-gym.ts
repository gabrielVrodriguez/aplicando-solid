import { PrismaGymRepository } from "../repositories/prisma/prisma-gym-repository"
import { CreateGymUseCase } from "../use-cases/create-gym"
import { CreateGymController } from "../controllers/create-gym"



export function makeCreateGymUseCase() {
    const prismaGymRepository = new PrismaGymRepository()
    const createGymUseCase = new CreateGymUseCase(prismaGymRepository)
    return createGymUseCase
}

export function makeCreateGymController() {
    const createGymUseCase = makeCreateGymUseCase()
    const createGymController = new CreateGymController(createGymUseCase)

    return createGymController
}