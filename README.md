# GoBarber-backend - NodeJs & Typeorm

Back-end incluindo as últimas funcionalidades do app e também aprendendo conceitos como MongoDB, variáveis ambiente, validação, cache, segurança, etc.

# Rotas da aplicação.
**Rotas de usuários**

# Criando um novo usuário
``POST /users``

**Exemplo de entrada de dados (JSON):**
```
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password":  "teste"
}
```

**Exemplo de saida de dados esperada (JSON):**
```
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "id": "6598ec03-9c47-463c-bf3e-18eb79e79325",
  "created_at": "2021-03-08T23:17:24.762Z",
  "updated_at": "2021-03-08T23:17:24.762Z",
  "avatar_url": null
}
```

# Authenticando um usuário
``POST /sessions``

**Exemplo de entrada de dados (JSON):**
```
{
  "email": "johndoe@gmail.com",
  "password":  "teste"
}
```

**Exemplo de saida de dados esperada (JSON):**
```
{
  "user": {
    "id": "b6324b63-b98e-41c3-8c4b-56cf63421a24",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "avatar": "2f242784d46de41ad479-unnamed.png",
    "created_at": "2021-03-01T03:03:07.343Z",
    "updated_at": "2021-03-01T03:04:40.655Z",
    "avatar_url": null
  },
  "token": "TOKEN_EXAMPLE"
}
```

# Solicitação de recuperação de senha
``POST /password/forgot``

**Exemplo de entrada de dados (JSON):**
```
{
  "email": "johndoe@gmail.com"
}
```

**Exemplo de saida de dados esperada (JSON):**

```no response body```

# Resetando a senha do usuário
``POST /password/forgot``

**Exemplo de entrada de dados (JSON):**
```
{
   "password": "novasenha",
   "password_confirmation": "novasenha",
   "token": "bf793eb2-61f8-434a-8465-fdd489548eab"
}
```

**Exemplo de saida de dados esperada (JSON):**

```no response body```

# Mostrando o perfil do usuário
``GET /profile``

**Exemplo de entrada de dados (JSON):**

```no request body```

**Exemplo de saida de dados esperada (JSON):**

```
{
  "id": "b6324b63-b98e-41c3-8c4b-56cf63421a24",
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "avatar": "2f242784d46de41ad479-unnamed.png",
  "created_at": "2021-03-01T03:03:07.343Z",
  "updated_at": "2021-03-08T23:41:50.200Z",
  "avatar_url": null
}
```

# Atualizando o avatar do usuário
``PATCH /users/avatar``

**Exemplo de entrada de dados (multpart Form):**

```
avatar: avatar.jpeg
```

**Exemplo de saida de dados esperada (JSON):**

```
{
  "id": "b6324b63-b98e-41c3-8c4b-56cf63421a24",
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "avatar": "2f242784d46de41ad479-unnamed.png",
  "created_at": "2021-03-01T03:03:07.343Z",
  "updated_at": "2021-03-01T03:04:40.655Z",
  "avatar_url": "http://localhost:3333/files/2f242784d46de41ad479-avatar.jpeg"
}
```

# Editando as informações do usuário
``PUT /profile``

**Exemplo de entrada de dados (JSON):**

```
}
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "old_password": "old-teste",
  "password": "teste",
  "password_confirmation": "teste"
}
```

**Exemplo de saida de dados esperada (JSON):**

```
{
  "id": "dfec4a31-2dbb-4aa1-85e8-f710cb4064b6",
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "avatar": "8f1dad8a5f072a89c068-dfec4a31-2dbb-4aa1-85e8-f710cb4064b6.jpg",
  "created_at": "2021-02-04T08:16:47.561Z",
  "updated_at": "2021-03-01T04:06:57.326Z",
  "avatar_url": "http://localhost/files/8f1dad8a5f072a89c068-dfec4a31-2dbb-4aa1-85e8-f710cb4064b6.jpg"
}
```

# Rotas de Agendamentos

# Criando um agendamento
``POST /appointments``

**Exemplo de entrada de dados (JSON):**

```
{
   "provider_id": "dfec4a31-2dbb-4aa1-85e8-f710cb4064b6",
   "date": "2021-03-25 11:00:00"
}
```

**Exemplo de saida de dados esperada (JSON):**

```
{
  "provider_id": "dfec4a31-2dbb-4aa1-85e8-f710cb4064b6",
  "user_id": "b6324b63-b98e-41c3-8c4b-56cf63421a24",
  "date": "2021-03-25T14:00:00.000Z",
  "id": "7dca12d8-4959-492b-b788-a5e2f675c075",
  "created_at": "2021-03-08T22:45:35.217Z",
  "updated_at": "2021-03-08T22:45:35.217Z"
}
```

# Mostrando os dias disponíveis para agendamentos do prestador de serviços
``GET /providers/dfec4a31-2dbb-4aa1-85e8-f710cb4064b6/month-availability``

**Exemplo de entrada de dados (JSON):**

```
no request body
```

**Exemplo de saida de dados esperada (JSON):**

```
[
  {
    "day": 1,
    "avaliable": false
  },
  {
    "day": 2,
    "avaliable": false
  },
  {
    "day": 3,
    "avaliable": false
  }
    moreday...
  ]
```

# Mostrando as horas disponíveis em determinado dia disponíveis para agendamentos do prestador de serviços
``GET /providers/dfec4a31-2dbb-4aa1-85e8-f710cb4064b6/day-availability``

**Exemplo de entrada de dados (JSON):**

```
no request body
```

**Exemplo de saida de dados esperada (JSON):**

```
[
  {
    "hour": 900,
    "avaliable": false
  },
  {
    "hour": 920,
    "avaliable": false
  },
  {
    "hour": 940,
    "avaliable": false
  },
    morehour...
  ]
```

# Mostrando as horas disponíveis em determinado dia para agendamentos do prestador de serviços
``GET /providers``

**Exemplo de entrada de dados (JSON):**

```
no request body
```

**Exemplo de saida de dados esperada (JSON):**

```
[
  {
    "id": "4ccd8f99-5510-4e86-af37-8f7c361a7d33",
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "phone": "99999999",
    "avatar": null,
    "created_at": "2021-03-02T02:20:41.627Z",
    "updated_at": "2021-03-02T02:20:41.627Z",
    "avatar_url": null
  }
]
```




