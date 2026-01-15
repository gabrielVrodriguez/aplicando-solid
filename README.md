# API GymPass (Aplicando SOLID)

Uma API RESTful desenvolvida em Node.js para gerenciamento de check-ins em academias (estilo Gympass). O objetivo principal deste projeto é aplicar os princípios SOLID, Design Patterns e testes automatizados de forma prática.

## 🚀 Tecnologias

Utilizamos um conjunto moderno de ferramentas para garantir performance, segurança e qualidade de código:

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Fastify](https://www.fastify.io/)** - Framework web rápido e eficiente
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Docker](https://www.docker.com/)** - Containerização
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários e de integração
- **[Zod](https://zod.dev/)** - Validação de esquemas
- **[ESLint](https://eslint.org/)** - Linter de código

## 🧩 Funcionalidades

- **Autenticação**: Cadastro e autenticação de usuários (usuários comuns e administradores).
- **Academias**:
  - Cadastro de academias.
  - Busca de academias pelo nome.
  - Busca de academias próximas (até 10km).
- **Check-ins**:
  - Realizar check-in em uma academia.
  - Validar check-in (regras de tempo e distância).
    - O check-in só pode ser validado até 20 minutos após ser criado.
    - O usuário deve estar dentro de um raio de 100m da academia.
  - Listar histórico de check-ins de um usuário.
  - Obter métricas de check-ins do usuário.

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js instalado (versão 18+)
- Docker e Docker Compose (para o banco de dados)

### Passo a passo

1. **Clone o repositório**

```bash
git clone https://github.com/gabrielVrodriguez/aplicando-solid.git
cd aplicando-solid
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com base no exmplo abaixo ou no arquivo `.env.example`:

```env
NODE_ENV=development
PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
```

4. **Suba o banco de dados com Docker**

```bash
docker-compose up -d
```

5. **Execute as migrações do Prisma**

```bash
npx prisma migrate dev
```

6. **Inicie o servidor de desenvolvimento**

```bash
npm run start:dev
```

O servidor estará rodando em `http://localhost:3333`.

## 🧪 Testes

O projeto conta com uma suíte de testes unitários e e2e (ponta a ponta).

- **Executar testes unitários:**
```bash
npm run test
```

- **Executar testes em modo watch:**
```bash
npm run test:watch
```

- **Ver cobertura de testes:**
```bash
npm run test:coverage
```

- **Interface gráfica dos testes:**
```bash
npm run test:ui
```

## 📐 Padrões e Princípios

- **S.O.L.I.D**: Princípios aplicados na estrutura dos casos de uso e repositórios.
- **Repository Pattern**: Abstração da camada de dados para facilitar testes e troca de banco de dados.
- **Factory Pattern**: Criação de instâncias complexas de casos de uso e controladores.
- **TDD (Test Driven Development)**: Desenvolvimento guiado por testes.
- **In-Memory Database**: Utilizado para testes unitários rápidos sem depender do banco de dados real.

## 📝 Licença

Este projeto está sob a licença ISC.
