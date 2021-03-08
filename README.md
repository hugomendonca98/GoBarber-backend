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
``POST /profile``

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


