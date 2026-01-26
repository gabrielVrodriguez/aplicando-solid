import { PrismaCheckInsRepository } from "../repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInUseCase } from "../use-cases/validate-check-in"
import { ValidateCheckInController } from "../controllers/validate-check-in"



export function makeValidateCheckInUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const validateCheckInUseCase = new ValidateCheckInUseCase(prismaCheckInsRepository)
    return validateCheckInUseCase
}

export function makeValidateCheckInController() {
    const validateCheckInUseCase = makeValidateCheckInUseCase()
    const validateCheckInController = new ValidateCheckInController(validateCheckInUseCase)
    return validateCheckInController
}