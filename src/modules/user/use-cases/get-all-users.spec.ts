import { expect, it, describe, beforeEach } from 'vitest'
import { GetAllUsersUseCase } from './get-all-users'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'


describe('Get all users case', () => {

    let userRepository: InMemoryUserRepository
    let sut: GetAllUsersUseCase

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetAllUsersUseCase(userRepository)
    })

    it('should return all users', async () => {
        const user = await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456'
        })

        const users = await sut.execute()

        expect(users).toEqual([user])
    })
})