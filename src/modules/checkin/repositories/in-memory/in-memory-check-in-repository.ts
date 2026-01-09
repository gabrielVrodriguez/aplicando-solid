import { registerCheckinSchema } from "../../dtos/register-check-in";
import { ICheckInRepository } from "../ICheckInRepository";
import { CheckIn } from "@/shared/entities/check-in";
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

    async findByUserId(userId: string): Promise<CheckIn[] | null> {
        const checkIns = this.items.filter((item) => item.user_id === userId)

        return checkIns || null
    }




}