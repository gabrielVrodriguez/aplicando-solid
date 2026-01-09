import { Gym } from "@/shared/entities/gym";
import { IGymRepository } from "../IGymRepository";
import { CreateGymSchema } from "../../dtos/create-gym";

export class InMemoryGymRepository implements IGymRepository {

    public items: Gym[] = []

    async findById(id: string): Promise<Gym | null> {

        const gym = this.items.find(item => item.id === id)

        return gym || null
    }

    async create(data: CreateGymSchema): Promise<Gym> {
        const gym = {
            id: data.id ?? crypto.randomUUID(),
            title: data.title,
            description: data.description ?? '',
            phone: data.phone ?? '',
            latitude: data.latitude,
            longitude: data.longitude,
            created_at: new Date()
        }

        this.items.push(gym)

        return gym
    }



}
