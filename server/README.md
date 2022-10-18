
# Módulo Acadêmico - Server

API Rest desenvolvida para gerenciar alunos do módulo acadêmico.


## Stack utilizada

Node, Express, Sequelize


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/bruno-bergamaschi/challenge-full-stack-web.git
```

Entre no diretório do projeto

```bash
  cd challenge-full-stack-web
```

Entre no diretório do servidor

```bash
  cd server
```

Instale as dependências

```bash
  yarn
```

Inicie o servidor

```bash
  yarn dev
```

Obs.: Preferencialmente use YARN.
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu diretório `server`:

Na raiz do projeto crie um arquivo `.env` e adicione o conteúdo abaixo:

`DATABASE_HOST=localhost`

`DATABASE_DB="nome do database criado em seu MySQL"`

`DATABASE_USER="nome do usuário criado em seu MySQL"`

`DATABASE_PASSWORD="nome do usuário criado em seu MySQL"`

`DATABASE_DIALECT=mysql`

`SERVER_PORT=3307`

Na raiz do projeto crie um arquivo `.env.test` e adicione o conteúdo abaixo:

`DATABASE_DIALECT=sqlite`
## Documentação da API

### Endpoint para buscar todos os registros de alunos:

```http
  GET /students/get-all
```

#### Retorna uma lista
#### * Se houver registros, retornará uma lista com objetos

| Propriedade   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `integer` | O ID do registro |
| `name` | `string` | O NOME do aluno |
| `email` | `string` | O EMAIL do aluno |
| `ra` | `string` | O RA do aluno |
| `cpf` | `string` | O CPF do aluno |
| `createdAt` | `timestamp` | Data de criação do registro |
| `updatedAt` | `timestamp` | Data da última atualização do registro |

Status:

![image](https://user-images.githubusercontent.com/52868587/194363317-ae3153a3-b2a7-448a-ba32-b7f555dfa622.png)


#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194357022-7e5e4050-28d1-4547-beb5-7137db768027.png)


### Endpoint para registrar um aluno:

```http
  POST /students/create
```
#### Parâmetros necessários por BODY no formato JSON:

| Propriedade   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Campo obrigatório** O NOME do aluno |
| `email` | `string` | **Campo obrigatório** O EMAIL do aluno |
| `ra` | `string` | **Campo obrigatório e único** O RA do aluno |
| `cpf` | `string` | **Campo obrigatório** O CPF do aluno |

#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194357539-014ffde2-6492-4f16-b404-2737816fcd47.png)


##### Retorna um objeto

### Caso de sucesso

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `msg`      | `string` | Retornará uma mensagem de sucesso |
| `student`      | `object` | Dados do registro criado |

##### Dados de `student`:

| Propriedade   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `integer` | O ID do registro |
| `name` | `string` | O NOME do aluno |
| `email` | `string` | O EMAIL do aluno |
| `ra` | `string` | O RA do aluno |
| `cpf` | `string` | O CPF do aluno |
| `createdAt` | `timestamp` | Data de criação do registro |
| `updatedAt` | `timestamp` | Data da última atualização do registro |

Status:

![image](https://user-images.githubusercontent.com/52868587/194363296-1e76be10-359f-4070-b6b6-27a3696a63b1.png)


#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194357407-8020d560-6c23-4453-8cd2-f1aa8a643f26.png)

### Caso de erro

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `msg`      | `string` | Retornará uma mensagem de sucesso ou erro |
| `error`      | `string` | Retornará uma mensagem com o motivo do erro |

Status:

![image](https://user-images.githubusercontent.com/52868587/194362973-16a2d106-631a-4490-937a-e24100da4319.png)

#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194357812-2f8fc2c7-218f-4897-b76d-d151e332929f.png)
![image](https://user-images.githubusercontent.com/52868587/194359471-d9a785fa-6109-4dee-b725-f80a1007b605.png)


### Endpoint para editar um aluno:

```http
  PATCH /students/update/${id}
```
#### Parâmetros necessários por BODY no formato JSON:

| Propriedade   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Campo obrigatório** O NOME do aluno |
| `email` | `string` | **Campo obrigatório** O EMAIL do aluno |

#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194359966-0b33588d-4056-457a-978a-cfb6da5c613b.png)

##### Retorna um objeto

### Caso de sucesso

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `msg`      | `string` | Retornará uma mensagem de sucesso |

Status:

![image](https://user-images.githubusercontent.com/52868587/194363347-c52e3795-2a95-468d-8a82-3fc0afd85355.png)

#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194359667-955c29f2-7b92-4f6a-a333-0bfb3ebba0dd.png)

### Caso de erro

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `msg`      | `string` | Retornará uma mensagem de sucesso ou erro |
| `error`      | `string` | Retornará uma mensagem com o motivo do erro |

Status:

![image](https://user-images.githubusercontent.com/52868587/194362956-7f08de0d-0f90-4de6-85c1-746281c509c4.png)

#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194360115-8aceaf81-b0db-47d6-a4d3-12610c093248.png)
![image](https://user-images.githubusercontent.com/52868587/194360225-626d3fdb-7729-48e8-9a31-b6eeee21cb60.png)


### Endpoint para deletar um aluno:

```http
  DELETE /students/delete/${id}
```

##### Retorna um objeto

### Caso de sucesso

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `msg`      | `string` | Retornará uma mensagem de sucesso |

Status:

![image](https://user-images.githubusercontent.com/52868587/194363369-5ec5d9ce-ff41-4cba-ad38-661aa90dd69c.png)

#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194360342-fb786567-2659-4d95-aace-7342839542f6.png)

### Caso de erro

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `msg`      | `string` | Retornará uma mensagem de sucesso ou erro |
| `error`      | `string` | Retornará uma mensagem com o motivo do erro |

Status:

![image](https://user-images.githubusercontent.com/52868587/194362938-d3d65d1d-32e2-4e66-81b4-a309ef51b90a.png)

#### Exemplo:

![image](https://user-images.githubusercontent.com/52868587/194360417-3de77981-974e-4417-ac3a-2b800e6c5abd.png)


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  yarn test
```

