import { FetchNearbyGymsController } from "../controllers/fetch-nearby-gyms"
import { PrismaGymRepository } from "../repositories/prisma-gym-repository.ts/prisma-gym-repository"
import { FetchNearByGymsUseCase } from "../use-cases/fetch-nearby-gyms"



export function makeFetchNearbyGymsUseCase() {
    const prismaGymRepository = new PrismaGymRepository()
    const fetchNearbyGymsUseCase = new FetchNearByGymsUseCase(prismaGymRepository)
    return fetchNearbyGymsUseCase
}

export function makeFetchNearbyGymsController() {
    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
    const fetchNearbyGymsController = new FetchNearbyGymsController(fetchNearbyGymsUseCase)
    
    return fetchNearbyGymsController
}