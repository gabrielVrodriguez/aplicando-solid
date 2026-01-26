import { Gym } from "@/shared/entities/gym";
import { CreateGymSchema } from "../../dtos/create-gym";
import { FetchNearbyGymsSchema } from "../../dtos/fetch-nearby-gyms";
import { IGymRepository } from "../IGymRepository";
import { prisma } from "@/../database/prisma"


export class PrismaGymRepository implements IGymRepository {
    async findById(id: string): Promise<Gym | null> {
        const gym = await prisma.gym.findUnique({
            where: { id }
        })

        if (!gym) return null

        return gym
    }

    async create(data: CreateGymSchema): Promise<Gym> {
        const gym = await prisma.gym.create({
            data: {
                title: data.title,
                description: data.description ?? null,
                phone: data.phone ?? null,
                latitude: data.latitude,
                longitude: data.longitude,
                id: data.id,
            }
        })

        return gym
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                },
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return gyms
    }

    async fetchNearbyGyms({ latitude, longitude }: FetchNearbyGymsSchema): Promise<Gym[]> {
        const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude )
         - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }
    

}