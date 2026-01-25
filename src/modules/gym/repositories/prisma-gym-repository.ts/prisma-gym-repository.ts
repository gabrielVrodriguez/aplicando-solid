import { Gym } from "@/shared/entities/gym";
import { CreateGymSchema } from "../../dtos/create-gym";
import { fetchNearbyGymsSchema } from "../../dtos/fetch-nearby-gyms";
import { IGymRepository } from "../IGymRepository";
import { prisma } from "@/../database/prisma"


export class PrismaGymRepository implements IGymRepository {
    async findById(id: string): Promise<Gym | null> {
        const gym = await prisma.gym.findUnique({
            where: { id }
        })

        if (!gym) return null

        return {
            ...gym,
            longitude: Number(gym.longitude),
            latitude: Number(gym.latitude)
        }
    }
    async create(data: CreateGymSchema): Promise<Gym> {
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }
    async searchMany(query: string, page: number): Promise<Gym[]> {
        throw new Error("Method not implemented.");
    }
    async fetchNearbyGyms(params: fetchNearbyGymsSchema): Promise<Gym[]> {
        throw new Error("Method not implemented.");
    }

}