import { RegisterUseCase } from "../use-cases/register-user";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import { RegisterController } from "../controllers/register-user";


export function makeRegisterUserUseCase() {
    const userRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)
    return registerUseCase
}

export function makeRegisterUserController() {
    const registerUseCase = makeRegisterUserUseCase()
    const registerController = new RegisterController(registerUseCase)

    return registerController
}