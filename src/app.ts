import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { appRoutes } from '@/http/routes'
import { ZodError } from 'zod';
// import { env } from '@/env'

export const app = fastify({
    logger: true
});

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.format()
        })
    }

    if(error instanceof Error) {
        return reply.status(500).send({
            message: error.message
        })
    }

    // return reply.status(500).send({
    //     message: 'Inter nal server error'
    // })
})

app.register(appRoutes)