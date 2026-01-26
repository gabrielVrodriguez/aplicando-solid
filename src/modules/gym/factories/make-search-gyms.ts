import { PrismaGymRepository } from "../repositories/prisma/prisma-gym-repository"
import { SearchGymsController } from "../controllers/search-gyms"
import { SearchGymsUseCase } from "../use-cases/search-gyms"



export function makeSearchGymsUseCase() {
    const prismaGymRepository = new PrismaGymRepository()
    const searchGymsUseCase = new SearchGymsUseCase(prismaGymRepository)
    return searchGymsUseCase
}

export function makeSearchGymsController() {
    const searchGymsUseCase = makeSearchGymsUseCase()
    const searchGymsController = new SearchGymsController(searchGymsUseCase)

    return searchGymsController
}