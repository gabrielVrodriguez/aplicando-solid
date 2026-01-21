import { Gym } from "@/shared/entities/gym";
import { IGymRepository } from "../IGymRepository";
import { CreateGymSchema } from "../../dtos/create-gym";
import { fetchNearbyGymsSchema } from "../../dtos/fetch-nearby-gyms";
import { getDistanceBetweenCoordinates } from "@/shared/utils/get-distance-between-coordinate";

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

    async searchMany(query: string, page: number): Promise<Gym[]> {
        return this.items.filter((item) => item.title.includes(query))
            .slice((page - 1) * 20, page * 20)
    }

    async fetchNearbyGyms(params: fetchNearbyGymsSchema): Promise<Gym[]> {
        const gyms = this.items.filter((item) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                { latitude: item.latitude, longitude: item.longitude }
            )

            return distance < 10
        })

        return gyms
    }



}
