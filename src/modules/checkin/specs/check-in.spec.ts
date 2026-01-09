import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-check-in-repository'
import { CheckinUseCase } from '../use-cases/check-in'
import { InMemoryGymRepository } from '../../gym/repositories/in-memory/in-memory-gym-repository'
import { ResourceNotFoundError } from '@/modules/user/errors/resource-not-found'
import { MaxNumberCheckInsError } from '../errors/max-number-check-ins'
import { MaxDistanceError } from '../errors/max-distance'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut: CheckinUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        gymRepository = new InMemoryGymRepository()
        sut = new CheckinUseCase(checkInRepository, gymRepository)

        gymRepository.create({
            id: 'gym-01',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: -23.947202,
            longitude: -46.3336866,
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const checkIn = await sut.execute({
            gym_id: 'gym-01',
            user_id: 'user-01',
            user_latitude: -23.947202,
            user_longitude: -46.3336866,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gym_id: 'gym-01',
            user_id: 'user-01',
            user_latitude: -23.947202,
            user_longitude: -46.3336866,
        })

        await expect(() =>
            sut.execute({
                gym_id: 'gym-01',
                user_id: 'user-01',
                user_latitude: -23.947202,
                user_longitude: -46.3336866,
            }),
        ).rejects.toBeInstanceOf(MaxNumberCheckInsError)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gym_id: 'gym-01',
            user_id: 'user-01',
            user_latitude: -23.947202,
            user_longitude: -46.3336866,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const checkIn = await sut.execute({
            gym_id: 'gym-01',
            user_id: 'user-01',
            user_latitude: -23.947202,
            user_longitude: -46.3336866,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in to a non-existent gym', async () => {
        await expect(() =>
            sut.execute({
                gym_id: 'non-existent-gym-id',
                user_id: 'user-01',
                user_latitude: -23.947202,
                user_longitude: -46.3336866,
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })


    it('should not be able to check in if gym is too far', async () => {
        await expect(() =>
            sut.execute({
                gym_id: 'gym-01',
                user_id: 'user-01',
                user_latitude: 0,
                user_longitude: 0,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })
})
