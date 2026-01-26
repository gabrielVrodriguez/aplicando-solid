import { expect, describe, it, beforeEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-check-in-repository'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found'
import { ValidateCheckInUseCase } from '../use-cases/validate-check-in'
import { LateCheckInValidationError } from '../errors/late-check-in-validation'


let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckInUseCase(checkInRepository)

    })

    vi.useFakeTimers()

    it('should be able to validate check in', async () => {

        vi.setSystemTime(new Date(2022, 0, 1, 8, 0, 0))
        const checkIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
            user_latitude: -23.947202,
            user_longitude: -46.3336866,
        })

        await sut.execute({
            check_in_id: checkIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkIn.validated_at).toEqual(new Date(2022, 0, 1, 8, 0, 0))
        expect(checkInRepository.items[0]?.validated_at).toEqual(expect.any(Date))

    })

    it('should not be able to validate an inexistent check-in ', async () => {

        await expect(() =>
            sut.execute({
                check_in_id: 'inexistent-check-in-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

    it( 'should not be able to validate the check-in after 20 minutes of its creation', async () => {

        vi.setSystemTime(new Date(2022, 0, 1, 14, 50))

        const checkIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
            user_latitude: -23.947202,
            user_longitude: -46.3336866,
        })

        const twentyOneMinutesInMs = 21 * 60 * 1000

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() =>
            sut.execute({
                check_in_id: checkIn.id
            })
        ).rejects.toBeInstanceOf(LateCheckInValidationError)
    })

})