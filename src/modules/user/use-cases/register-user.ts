
import { IUserRepository } from "../repositories/IUserRepository";
import { RegisterUserSchema } from "../dtos/register-user";
import bcrypt from 'bcrypt'
import { UserAlreadyExistsError } from "../errors/user-already-exists";
import { User } from '@/shared/entities/user'

export class RegisterUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: RegisterUserSchema): Promise<User> {

        const { name, email, password } = data

        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if (userAlreadyExists) {
            throw new UserAlreadyExistsError()
        }

        const password_hash = await bcrypt.hash(password, 6)

        const user = await this.userRepository.create({ name, email, password: password_hash })

        return user

    }
}