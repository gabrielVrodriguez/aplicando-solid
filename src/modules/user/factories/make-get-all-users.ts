import { GetAllUsersUseCase } from "../use-cases/get-all-users";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { GetAllUsersController } from "../controllers/get-all-users";




export function makeGetAllUsersUseCase() {
    const userRepository = new PrismaUserRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
    return getAllUsersUseCase
}

export function makeGetAllUsersController() {
    const getAllUsersUseCase = makeGetAllUsersUseCase()
    const getAllUsersController = new GetAllUsersController(getAllUsersUseCase)

    return getAllUsersController
}