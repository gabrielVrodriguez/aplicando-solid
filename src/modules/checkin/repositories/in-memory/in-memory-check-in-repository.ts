import { registerCheckinSchema } from "../../dtos/register-check-in";
import { ICheckInRepository } from "../ICheckInRepository";
import { CheckIn } from "@/shared/entities/check-in";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found";
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)


export class InMemoryCheckInRepository implements ICheckInRepository {

    public items: CheckIn[] = []

    async create(data: registerCheckinSchema): Promise<CheckIn> {
        const checkIn = {
            id: crypto.randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: null,
            created_at: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const starOfDay = dayjs(date).startOf('day')
        const endOfDay = dayjs(date).endOf('day')
        const checkIn = this.items.find((item) => {
            const checkInDate = dayjs(item.created_at)
            const isOnSameDate = checkInDate.isBetween(starOfDay, endOfDay)

            return item.user_id === userId && isOnSameDate
        })
        return checkIn || null
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[] | null> {
        const checkIns = this.items.filter((item) => item.user_id === userId)
            .slice((page - 1) * 20, page * 20)

        return checkIns || null
    }

    async countByUserId(userId: string): Promise<number> {

        const countCheckIns = this.items.filter((item) => item.user_id === userId).length

        return countCheckIns
    }

    async findById(checkInId: string): Promise<CheckIn | null> {
        const checkin = this.items.find((item) => item.id === checkInId)

        return checkin || null
    }

    async save(checkIn: CheckIn): Promise<CheckIn> {
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

        if (checkInIndex === -1) {
            throw new ResourceNotFoundError()
        }

        this.items[checkInIndex] = checkIn

        return checkIn
    }




}