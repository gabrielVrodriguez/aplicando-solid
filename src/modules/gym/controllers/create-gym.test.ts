import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/shared/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a gym as ADMIN', async () => {
        const { token } = await createAndAuthenticateUser('ADMIN')

        const response = await request(app.server)
            .post('/gyms/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 'gym-01',
                title: 'Javascript Gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -23.947202,
                longitude: -46.3336866,
            })

        expect(response.statusCode).toEqual(201)
    })

    it('should not be able to create a gym as MEMBER', async () => {
        const { token } = await createAndAuthenticateUser()

        const response = await request(app.server)
            .post('/gyms/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 'gym-02',
                title: 'Javascript Gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -23.947202,
                longitude: -46.3336866,
            })

        expect(response.statusCode).toEqual(403)
    })
})
