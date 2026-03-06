import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/shared/utils/test/create-and-authenticate-user'

describe('Profile (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        const { token } = await createAndAuthenticateUser()

        const response = await request(app.server)
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(
            expect.objectContaining({ email: 'john.doe@example.com' })
        )
    })

    it('should include role in user profile', async () => {
        const { token } = await createAndAuthenticateUser('ADMIN')

        const response = await request(app.server)
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(
            expect.objectContaining({ role: 'ADMIN' })
        )
    })
})
