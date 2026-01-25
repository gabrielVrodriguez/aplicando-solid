import { CheckIn } from "@/shared/entities/check-in";
import { registerCheckinSchema } from "../../dtos/register-check-in";
import { ICheckInRepository } from "../ICheckInRepository";
import { prisma } from "@/../database/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckInRepository {
    async create(data: registerCheckinSchema): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('day').toDate()
        const endOfTheDay = dayjs(date).endOf('day').toDate()

        const checkInOnDate = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay,
                    lte: endOfTheDay
                }
            }
        })

        return checkInOnDate
    }


    async findManyByUserId(userId: string, page: number): Promise<CheckIn[] | null> {
       const checkIns = await prisma.checkIn.findMany({
        where: { user_id : userId},
        take: 20,
        skip: (page - 1) * 20
       })

       return checkIns
    }

    async findById(id: string): Promise<CheckIn | null> {
        const checkIn = await prisma.checkIn.findUnique({
            where: { id }
        })

        return checkIn
    }

    async countByUserId(userId: string): Promise<number> {
       const count = await prisma.checkIn.count({
        where: { user_id: userId}
       })

       return count
    }

    async save(checkIn: CheckIn): Promise<CheckIn> {

        const checkInUpdated = await prisma.checkIn.update({
            where: { id:  checkIn.id},
            data: checkIn
        })

        return checkInUpdated
    }

}