import { expect, describe, it, beforeEach } from 'vitest'
import bcrypt from 'bcrypt'

import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { RegisterUseCase } from './register-user'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

describe('Register use case', () => {

    let userRepository: InMemoryUserRepository
    let sut: RegisterUseCase

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it(' should hash user password upon registration', async () => {


        const user = await sut.execute({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456'
        })

        const isCorrectlyHashed = await bcrypt.compare('123456', user.password_hash)

        expect(isCorrectlyHashed).toBe(true)
    })


    it('should not be able to register with the same email', async () => {
        const userRepository = new InMemoryUserRepository()
        const sut = new RegisterUseCase(userRepository)

        await sut.execute({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456'
        })

        expect(async () => {
            await sut.execute({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})