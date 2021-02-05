# Recuperação de senha

**Requisitos Funcionais (RF)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais (RNF)**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (Background job);

**Regras de Negocio (RN)**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização do perfil

**Requisitos Funcionais (RF)**

- O usuário deve poder atualizar o seu nome, email, senha;

**Requisitos Não Funcionais (RNF)**

- undefined

**Regras de Negocio (RN)**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha precisa confirmar a sua nova senha;


# Painel do prestador

**Requisitos Funcionais (RF)**

- O usuário deve poder listar o seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais (RNF)**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no mongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de Negocio (RN)**

- A notificação deve ter um status de lida ou não-lida, para que o prestador possa controlar;


# Agendamento de serviços

**Requisitos Funcionais (RF)**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- Ao escolher o prestador, o usuário deve poder listar os dias de um mês com pelo menos um horário disponível;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos Não Funcionais (RNF)**

- A listagem de prestadores deve ser armazenada em cache;


**Regras de Negocio (RN)**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8hrs ás 18h (Primeiro as 8h, último as 17h);
- O usário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;




