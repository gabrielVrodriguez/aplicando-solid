import { RegisterUserSchema } from "../../dtos/register-user";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../../../shared/entities/user"



export class InMemoryUserRepository implements IUserRepository {

    public items: User[] = []

    async create(data: RegisterUserSchema): Promise<User> {

        const user = {
            name: data.name,
            email: data.email,
            password_hash: data.password,
            id: crypto.randomUUID(),
            created_at: new Date()
        }

        this.items.push(user)

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        return user || null
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find(item => item.id === id)

        return user || null
    }

    async findAll(): Promise<User[]> {
        const users = this.items

        return users
    }

}