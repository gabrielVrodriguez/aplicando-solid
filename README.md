#APP

Gympass style app 

## RFs ( Requisitos funcionais)
- [x] Deve ser possível cadastrar um usuário
- [ ] Deve ser possível se autenticar
- [x] Deve ser possível listar os usuários
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados por um user
- [ ] Deve ser possível obter o histórico de check-in do user
- [ ] Deve ser possível ver as academias próximas
- [ ] Deve ser possível buscar academias pelo nome
- [ ] Deve ser possível realizar um check-in em uma academia
- [ ] Deve ser possivel validar o check-in de um usuário 
- [ ] Deve ser possível atualizar um usuário
- [ ] Deve ser possível deletar um usuário
- [ ] Deve ser possível listar as academias
- [ ] Deve ser possível cadastrar uma academia
- [ ] Deve ser possível atualizar uma academia
- [ ] Deve ser possível deletar uma academia

## RNs ( Regras de negócio)

- [ ] O usuário nao deve poder se cadastrar com um e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario nao pode fazer check-in se não estiver perto de uma academia
- [ ] O check-in só pode ser validado até 20 minutos após ser criado
- [ ] O check-in só pode ser validado por um admin
- [ ] A academia só pode ser cadastrada por um admin
- [ ]


## RNFs ( Requisitos não funcionais)

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco de dados  (PostgreeSQL)
- [ ]  Todas listas de dados precisam estar paginadas com 20 items por página
- [ ] O usuário deve ser identificado por JWT
- [ ] 



## Exemplo de arquitetura

src/modules/auth/
├── repositories/
│   ├── IUsersRepository.ts          <-- Interface única (contrato)
│   └── prisma-users-repository.ts   <-- Implementação real (Prisma)
├── use-cases/
│   ├── register/
│   │   ├── register-use-case.ts
│   │   ├── register-controller.ts
│   │   └── register-use-case.spec.ts
│   ├── login/
│   │   ├── login-use-case.ts
│   │   └── login-controller.ts
│   ├── forget-password/
│   │   ├── forget-password-use-case.ts
│   │   └── ...
│   └── verify-email/
│       └── ...
├── errors/
│   ├── invalid-credentials-error.ts
│   └── user-already-exists-error.ts
└── auth.routes.ts                   <-- Centraliza as rotas do módulo