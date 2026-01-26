import { PrismaCheckInsRepository } from "../repositories/prisma/prisma-check-ins-repository"
import { CheckInUseCase } from "../use-cases/check-in"
import { RegisterCheckInController } from "../controllers/register-check-in"
import { PrismaGymRepository } from "@/modules/gym/repositories/prisma/prisma-gym-repository"



export function makeRegisterCheckInUseCase() {

    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const prismaGymRepository = new PrismaGymRepository()
    const checkInUseCase = new CheckInUseCase(prismaCheckInsRepository, prismaGymRepository)
    return checkInUseCase
}



export function makeRegisterCheckInController() {
    const checkInUseCase = makeRegisterCheckInUseCase()
    const checkInController = new RegisterCheckInController(checkInUseCase)
    return checkInController
}
