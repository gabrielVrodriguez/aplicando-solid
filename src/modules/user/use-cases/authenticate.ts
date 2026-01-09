import { IUserRepository } from "../repositories/IUserRepository";
import { InvalidCredentialError } from "../errors/invalid-credentials";
import bcrypt from 'bcrypt'
import { AuthenticateSchema, AuthenticateUseCaseResponse } from "../dtos/authenticate";

export class AuthenticateUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute({email, password} : AuthenticateSchema): Promise<AuthenticateUseCaseResponse> {

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialError()
        }

        const doesPasswordMatches = await bcrypt.compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialError()
        }

        return {
            user,
        }

    }
}