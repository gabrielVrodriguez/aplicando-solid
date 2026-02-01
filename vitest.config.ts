import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({

    test: {
        exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**'],
        projects: [
            {
                plugins: [tsConfigPaths()],
                test: {
                    name: 'unit',
                    include: ['src/modules/**/use-cases/*.spec.ts'], 
                    environment: 'node',
                }
            },
            {
                plugins: [tsConfigPaths()],
                test: {
                    name: 'e2e',
                    // Certifique-se de que seus testes de controller terminem em .test.ts ou ajuste aqui
                    include: ['src/modules/**/controllers/*.test.ts'],
                    // AQUI está o segredo: aponta para o seu ambiente customizado do Prisma
                    environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
                }
            }
        ]
    }
});