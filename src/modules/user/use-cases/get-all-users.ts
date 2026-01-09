import { IUserRepository } from "../repositories/IUserRepository";
import { User } from '@/shared/entities/user'

export class GetAllUsersUseCase{

    constructor (private userRepository: IUserRepository){}

    async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll()
        return users
    }

}