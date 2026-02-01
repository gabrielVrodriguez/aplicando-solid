import 'dotenv/config'
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { prisma } from '@/../database/prisma'
import { Environment } from "vitest/environments";


function generateDatabaseURL(schema: string) {

    if (!schema) throw new Error('please provide a schema')

    const url = new URL(process.env.DATABASE_URL!)

    url.searchParams.set('schema', schema)

    return url.toString()

}

export default <Environment>{
    name: 'prisma',
    async setup() {

        const schema = randomUUID()
        const databaseURL = generateDatabaseURL(schema)

        process.env.DATABASE_URL = databaseURL


        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                // Código executado DEPOIS de cada arquivo de teste
                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
                )
                await prisma.$disconnect()
            },
        }
    }
}