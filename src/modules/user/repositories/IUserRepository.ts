

import { RegisterUserSchema } from "../dtos/register-user";
import { User } from '@/shared/entities/user'


export interface IUserRepository {
    create(data: RegisterUserSchema): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    findAll(): Promise<User[]>
}