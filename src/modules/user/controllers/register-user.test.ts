import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'


describe('Register user end 2 end', () => {



    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register a user', async () => {
        const response = await request(app.server).post('users/').send({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(201)


    })


})