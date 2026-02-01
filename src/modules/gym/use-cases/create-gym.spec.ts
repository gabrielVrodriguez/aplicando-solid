
import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymRepository } from '../repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

describe('Gym use case', () => {

    let gymRepository: InMemoryGymRepository
    let sut: CreateGymUseCase

    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new CreateGymUseCase(gymRepository)
    })

    it('should be able to create a gym', async () => {

        await expect(
            sut.execute({
                id: 'gym-01',
                title: 'smartfit gym',
                description: 'description',
                phone: '123456',
                latitude: 1,
                longitude: 1
            })).resolves.toBeTruthy()
    })


})